---
title: Remote Unlocking of LUKS rootfs on Arch Linux
date: 2025-05-31
tags: [networking, tailscale, luks, initrd, archlinux]
published: true
---

LUKS for rootfs works great until I want to use the machine remotely(with Wake-On-LAN to power on the machine as needed).
So this weekend I decided to tinker with the initramfs to enable remote unlocking of LUKS encrypted rootfs.

# Network during Initramfs

In order to remotely unlock the rootfs, we first need to reach the machine over network.
So the first step is to setup network for initramfs.
I am using [tailscale](https://tailscale.com/) for my private network so this blog post will focus on that.

The great Arch Wiki alreay has [a dedicated section for remote unlocking of dm-crypt partitions](https://wiki.archlinux.org/title/Dm-crypt/Specialties#Remote_unlocking_of_root_(or_other)_partition).
This blog post will develop upon the beaten path described in Arch Wiki.

I am using a [systemd](https://syste.md)-based initramfs so here I will use `mkinitcpio-systemd-extras` to setup networking in initramfs.

First, install `mkinitcpio-systemd-extras`:

```bash
paru -S mkinitcpio-systemd-extras
```

Then add `sd-network` to `HOOKS` array in `/etc/mkinitcpio.conf`(After `autodetect` and `systemd` hooks).

Here I will use a separate systemd-networkd config for initramfs
even though I don't use systemd-networkd at all.
(Just in case I need to enable it in the future and I don't want potential trouble for future)

Append `SD_NETWORK_CONFIG=/etc/systemd/network-initramfs` to `/etc/mkinitcpio.conf`
so that mkinitcpio will use `/etc/systemd/network-initramfs` for sd-networkd in initramfs.

Then create `/etc/systemd/network-initramfs` directory and edit `/etc/systemd/network-initramfs/10-wired.network`

Here I just use a simple DHCP setup.

```ini
[Match]
MACAddress=MAC_ADDRESS_OF_YOUR_NIC

[Network]
DHCP=yes
```

:::warning

Predictable network interface names are not available in initramfs.

So here I am using MAC address in the configuration. See the Wiki page of mkinitcpio-systemd-extras
for more details:

https://github.com/wolegis/mkinitcpio-systemd-extras/wiki/Networking#predictable-network-interface-names

:::



# Tailscale in Initramfs

I will use [`mkinitcpio-tailscale`](https://github.com/dangra/mkinitcpio-tailscale) package here. First install it:

```bash
paru -S mkinitcpio-tailscale
```

Then run `setup-initcpio-tailscale --ssh` to set it up.
This command will register a node called `${MACHINE}-initrd` in your tailnet.
Mind the `--ssh` parameter that enables the builtin ssh server in tailscale so that we don't need
another hook for ssh.

The command output will suggest you to disable key expiry in your tailscale dashboard.

:::warning

As mentioned in https://github.com/dangra/mkinitcpio-tailscale?tab=readme-ov-file#security-considerations ,

The Tailscale node key is stored in plain text inside the initramfs, which means that with only the rootfs encrypted,
an attacker could extract the key in the initramfs and impersonate the node.

So it is recommended to set up [tailscale ACLs](https://tailscale.com/kb/1018/acls) to minimize the attack surface.

:::

Then add `tailscale` hook to `hooks` array in `/etc/mkinitcpio.conf` (After `systemd` and `autodetect`, before `sd-encrypt`).

Finally run `mkinitcpio -P` to update the initrds.

And don't forget to setup ACL for tailscale ssh. For example, I am allowing ssh into `initrd` from my `personal` devices:

```json
"ssh": [
    {
        "action": "accept",
        "src":    ["tag:personal"],
        "dst":    ["tag:initrd"],
        "users":  ["autogroup:nonroot", "root"],
    },
],
```

# Remote Unlocking

Now it is time to reboot and try it out.

To my surprise, it worked very well on first try.

```bash
tailscale ssh root@ryzen-initrd
~ # systemd-tty-ask-password-agent
🔐 Please enter passphrase for disk XXXXXX (cryptroot): ••••••••••••••••••••••••••••••••••••••••
~ # Connection to ryzen-initrd.dropbear-cirius.ts.net. closed by remote host.
Connection to ryzen-initrd.dropbear-cirius.ts.net. closed.
client_loop: send disconnect: Broken pipe
```

But on the second try, I got a `REMOTE HOST IDENTIFICATION HAS CHANGED` error when running `tailscale ssh`.
This is probably because the initrd does not store the ssh server host key and thus
tailscale will generate it on every boot.

Tailscale stores ssh server host key in `/var/lib/tailscale/ssh`.
I manually copied the generated host keys from initramfs to host system.
Since I won't use tailscale ssh in normal system, I solved it by copying this directory into initramfs:

Add `/var/lib/tailscale/ssh/ssh_host_{ecdsa,ed25519,rsa}_key` to `FILES` array in `/etc/mkinitcpio.conf`.

:::warning

In case you do use tailscale ssh for both initrd and normal system, sharing the host key might have
security implications as it will be stored CLEARTEXT in the initramfs.

:::

Problem solved.