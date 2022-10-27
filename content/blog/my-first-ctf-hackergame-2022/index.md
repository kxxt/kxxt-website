---
title: "记我的第一次 CTF: Hackergame 2022"
date: 2022-10-29
description: "参加了第一场 CTF：Hackergame 2022 之后，我学到了很多新知识，便写下此文。内容包括但不限于 WriteUp, 比赛体验, 个人心得"
tags: [ctf, Hackergame, security]
published: false
---

import AsciinemaPlayer from "../../../src/components/mdx/asciinema-player.tsx"

# Test

<AsciinemaPlayer src={"./test.cast"} rows={10}/>
[](test.cast)

# Write Up

## 签到

打开签到题，就看到了经典的（对于我这种人工智能相关专业的人而言）手写数字识别。嗯。。。最后一个框倒计时 0 秒，很显然是不可能让你直接手签 2022 过掉的。

为了观察浏览器与服务器数据交流的格式，我手签了一个，点击提交按钮，发现直接跳转到了 http://202.38.93.111:12022/?result=2?5?

那么，我们就可以合理的怀疑 http://202.38.93.111:12022/?result=2022 这个网址能把我们心心念念的 flag 送给我们。果然，flag 就这样到手了。（然鹅一血已经被手快的人拿走了）

![签到](checkin.png)

## 猫咪问答喵

参加猫咪问答喵，参加喵咪问答谢谢喵。

### 中国科学技术大学 NEBULA 战队（USTC NEBULA）是于何时成立的喵？

:::question

1. 中国科学技术大学 NEBULA 战队（USTC NEBULA）是于何时成立的喵？

提示：格式为 YYYY-MM，例如 2038 年 1 月即为 2038-01。
:::

Google 搜索 `中国科学技术大学 NEBULA 战队（USTC NEBULA）` 喵， 发现[第一个结果](https://cybersec.ustc.edu.cn/2022/0826/c23847a565848/page.htm)中提到喵

> 中国科学技术大学“星云战队（Nebula）”成立于 2017 年 3 月，“星云”一词来自中国科学技术大学 BBS“瀚海星云”，代表同学们对科学技术的无限向往和追求。战队现领队为网络空间安全学院吴文涛老师，现任队长为网络空间安全学院李蔚林、童蒙和武汉。战队核心成员包括了来自网络空间安全学院、少年班学院、物理学院、计算机学院等各个院系的同学，充分体现了我校多学院共建网络空间安全一级学科的特点。战队以赛代练，以赛促学，在诸多赛事中获得佳绩。

所以喵可以确定此题答案为 `2017-03` 喵.

### 请问这个 KDE 程序的名字是什么？

:::question 2. 2022 年 9 月，中国科学技术大学学生 Linux 用户协会（LUG @ USTC）在科大校内承办了软件自由日活动。除了专注于自由撸猫的主会场之外，还有一些和技术相关的分会场（如闪电演讲 Lightning Talk）。其中在第一个闪电演讲主题里，主讲人于 slides 中展示了一张在 GNOME Wayland 下使用 Wayland 后端会出现显示问题的 KDE 程序截图，请问这个 KDE 程序的名字是什么？

提示：英文单词，首字母大写，其他字母小写。
:::

Google 搜索 `中国科学技术大学 软件自由日 LUG@USTC` 喵，[一个来自 Google Groups 网站的搜索结果](https://groups.google.com/g/ustc_lug/c/aNRxC5ydY7A?pli=1) 中提到喵

> 往届活动和详细介绍见：https://lug.ustc.edu.cn/wiki/lug/events/sfd

打开此链接可以看到 2022 年 SFD 活动的详细信息喵，表格中有一行

> | 讲者   | 主题                                                     | 资料                                                                                                                                                       |
> | ------ | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | 陶柯宇 | 闪电演讲：《GNOME Wayland 使用体验：一个普通用户的视角》 | [Slides](https://ftp.lug.ustc.edu.cn/%E6%B4%BB%E5%8A%A8/2022.9.20_%E8%BD%AF%E4%BB%B6%E8%87%AA%E7%94%B1%E6%97%A5/slides/gnome-wayland-user-perspective.pdf) |

打开 Slides 喵, 在第 15 页可以找到题目所述截图喵。

图片里菜单项里 `Configure Kdenlive` 很显然写明喵应用程序的名称。

![slide](slide.png)

### Firefox 浏览器能在 Windows 2000 下运行的最后一个大版本号是多少？

:::question

3. 22 年坚持，小 C 仍然使用着一台他从小用到大的 Windows 2000 计算机。那么，在不变更系统配置和程序代码的前提下，Firefox 浏览器能在 Windows 2000 下运行的最后一个大版本号是多少？

提示：格式为 2 位数字的整数。

:::

Google 搜索 `Firefox 浏览器能在 Windows 2000 下运行的最后一个大版本号是多少` 喵。然而第一页上没什么有效信息喵。自然而然想到用英文搜索喵。

![firefox windows 2000](ff-win2000.png)

谷歌直接把结果加粗丢给咱喵，好耶！

### 首个变动此行为的 commit 的 hash

:::question

4. 你知道 PwnKit（CVE-2021-4034）喵？据可靠谣传，出题组的某位同学本来想出这样一道类似的题，但是发现 Linux  内核更新之后居然不再允许 argc 为 0 了喵！那么，请找出在 Linux 内核 master  分支（torvalds/linux.git）下，首个变动此行为的 commit 的 hash 吧喵！


提示：格式为 40 个字符长的 commit 的 SHA1 哈希值，字母小写，注意不是 merge commit。

:::

首先当然要 Clone Linux 的代码仓库喵(这仓库好大喵。。。需要一段时间才能克隆下来喵)：

```bash
git clone https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git
```

然后在执行了 n 多次 Google 搜索之后喵，kxxt 发现加上搜索条件 `site:kernel.org ` 之后再搜索 `CVE-2021-4034` 就能在[第一个搜索结果](https://lore.kernel.org/lkml/20220126043947.10058-1-ariadne@dereferenced.org/T/)中看到相关的 PATCH 喵。

这个 PATCH 改动了 `fs/exec.c` 这个文件喵。咱喵可以合理的推测对于 `CVE-2021-4034` 的修复应该发生在这个文件喵（懒的管这个 PATCH 是否被合并了）。

用 VSCode 打开 Linux 仓库喵，等它加载完成喵（等待 Activating Extensions），打开  `fs/exec.c` 然后在 `TIMELINE` 面板（应该是 Git Lens 插件的功能）下面用肉眼搜索相关改动喵。

![image-20221027215512265](linux.png)

很快就找到了喵。右键复制 Commit ID, 此题就结束了喵。

### 你知道猫咪在连接什么域名吗？

:::question

> 5. 通过监视猫咪在键盘上看似乱踩的故意行为，不出所料发现其秘密连上了一个 ssh 服务器，终端显示 `ED25519 key fingerprint is MD5:e4:ff:65:d7:be:5d:c8:44:1d:89:6b:50:f5:50:a0:ce.`，你知道猫咪在连接什么域名吗？
>
> 提示：填写形如 example.com 的二级域名，答案中不同的字母有 6 个。

:::

这道题 kxxt 一开始真的没搜到喵。想要暴搜却发现状态空间太大了，搜不完喵。后来 Google 搜索 `public ssh server` 点进[第一个结果](https://serverfault.com/questions/185153/free-public-ssh-server-for-testing-purposes)找到了答案。

:::caution

其实我一开始搜索的时候就找到了这个帖子，不过我当时并没有耐心看完所有的回答喵。当时我看了 Accepted Answer 里没有我想找的东西就把这个 tab 杀掉了。现在想来看看其他回答也是很有必要的喵，毕竟 Accepted Answer 是提问者采纳的回答，并不是最适合所有人的回答。而且我第一次访问到这个链接的时候甚至都没有注意到第二个回答的 Up Vote 比 Accepted Answer 更多

:::

![image-20221027220635685](ssh.png)