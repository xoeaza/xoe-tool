掘金文章介绍：[https://juejin.cn/post/7437006854122815497](https://juejin.cn/post/7437006854122815497)

---

## 说在前面

> 😶‍🌫️ 国庆过后，金价就大跳水，一直往下跌，看样子暂时是停不下来了，女朋友之前也入手了一点黄金，因此对黄金价格的变化比较关心，为了让她不用整天盯着实时金价，所以就搞了一个金价监控工具，超出设置的阈值就会发送邮件提醒 ✉。

![](https://files.mdnice.com/user/42027/e06f95b2-7e99-4921-a505-18edb85d2b18.jpg)

## 一、金价信息获取方案

金价实时信息有两种方案可以获取到：

### 1、网页信息爬取

我们可以先找到一些官方的金价信息网站，然后直接利用爬虫直接爬取，比如：[https://quote.cngold.org/gjs/jjs.html](https://quote.cngold.org/gjs/jjs.html)

![](https://files.mdnice.com/user/42027/0b01df96-cf42-4c6b-a4c3-87fb17f7c406.png)

### 2、通过接口获取

例如`nowapi`中就有黄金数据信息接口，我们可以直接通过接口来获取：

![](https://files.mdnice.com/user/42027/a3179363-b9cc-493b-bf4b-638dfc753c8e.png)

## 二、提醒阈值设置

### 1、创建数据库

![](https://files.mdnice.com/user/42027/ee815d28-163c-48ec-9ec8-f2ae932d6b2d.png)

### 2、监控页面编写

简单编写一个页面用于添加和调整提醒内容。

![](https://files.mdnice.com/user/42027/7840f9d4-9ff6-48de-a02b-c546ac317817.png)

## 三、修改配置信息

### 1、邮箱配置

这里我使用的 qq 邮箱作为发件账号，需要开启邮箱授权，获取授权码。

```javascript
{
  host: "smtp.qq.com", // 主机
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: "jyeontu@qq.com", // 自己用于发送邮件的账号
    pass: "jyeontu", // 授权码(这个是假的,改成自己账号对应即可,获取方法: QQ邮箱-->设置-->账户-->POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务-->IMAP/SMTP开启 复制授权码)
  }
}
```

- **（1）打开 pc 端 qq 邮箱，点击设置，再点击帐户**

![](https://files.mdnice.com/user/42027/594fcb78-73d8-4ab2-a078-18297e60c2ad.png)

- **（2）往下拉 可开启 POP3/SMTP 服务 根据提示即可获取 qq 邮箱授权码**

![](https://files.mdnice.com/user/42027/dce42e27-7577-4b0a-9347-d4c0d8fc3245.png)

- **（3）将获取到的授权码复制到配置信息里即可**

![](https://files.mdnice.com/user/42027/aedac3bf-6801-495b-979f-51d4ad32bc0f.png)

### 2、数据库配置

填写数据库对应的配置信息。

```javascript
{
  host: "localhost",
  user: "root", //数据库账号
  password: "jyeontu", //数据库密码
  database: "test", //数据库名称
}
```

### 3、nowapi 配置

免费开通后将`AppKey`和`Sign`替换成自己的就可以了。

![](https://files.mdnice.com/user/42027/45aa26bb-61c6-46d3-bd6b-0c623e6156aa.png)

```javascript
{
  AppKey: AppKey,
  Sign: "Sign",
}
```

## 四、脚本功能编写

### 1、获取金价信息

我直接使用`nowapi`的免费试用套餐，配额是`10 次/小时`。

![](https://files.mdnice.com/user/42027/b46e41a3-6047-4c86-8e77-34958f9ebe97.png)

```javascript
const { nowapiConfig } = require("./config.js");
async function getGoldPrice() {
  const result = await axios.get(
    `https://sapi.k780.com/?app=finance.gold_price&goldid=1053&appkey=${nowapiConfig.AppKey}&sign=${nowapiConfig.Sign}&format=json`
  );
  return result.data.result.dtList["1053"];
}
```

获取到的数据如下：

![](https://files.mdnice.com/user/42027/953df25c-5a0c-4f8c-a5d6-9a6095217f7a.png)

### 2、获取消息提醒阈值

#### （1）连接数据库

使用填写好的数据库配置信息连接数据库

```javascript
const mysql = require("mysql");
const { dbConfig } = require("./config.js");

const connection = mysql.createConnection(dbConfig);

function connectDatabase() {
  return new Promise((resolve) => {
    connection.connect((error) => {
      if (error) throw error;
      console.log("成功连接数据库！");
      resolve("成功连接数据库！");
    });
  });
}
```

#### （2）查询数据

```javascript
function mysqlQuery(sqlStr) {
  return new Promise((resolve) => {
    connection.query(sqlStr, (error, results) => {
      if (error) throw error;
      resolve(results);
    });
  });
}

async function getMessage() {
  const sqlStr =
    "select * from t_message where isShow = 1 and isActive = 1 and type = '金价监控';";
  const res = await mysqlQuery(sqlStr);
  return { ...res[0] };
}
```

获取到的数据如下：

![](https://files.mdnice.com/user/42027/ecec4037-a8bd-4ed7-a77f-2092897660a5.png)

### 3、发送提醒邮件

#### （1）创建邮件传输对象

使用填写好的邮箱配置信息，创建邮件传输对象

```javascript
const nodemailer = require("nodemailer");
const { mail } = require("./config.js");

const smtpTransport = nodemailer.createTransport(mail);
const sendMail = (options) => {
  return new Promise((resolve) => {
    const mailOptions = {
      from: mail.auth.user,
      ...options,
    };
    // 发送邮件
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.error("发送邮件失败：", error);
      } else {
        console.log("邮件发送成功");
      }
      smtpTransport.close(); // 发送完成关闭连接池
      resolve(true);
    });
  });
};
module.exports = sendMail;
```

#### （2）阈值判断

判断获取到的金价信息是否超出阈值范围来决定是否发送邮件提醒

```javascript
async function mail(messageInfo, goldInfo) {
  let { minVal = -Infinity, maxVal = Infinity } = messageInfo;
  let { buy_price } = goldInfo;
  minVal = parseFloat(minVal);
  maxVal = parseFloat(maxVal);
  buy_price = parseFloat(buy_price);
  if (minVal < buy_price && maxVal > buy_price) {
    return;
  }
  const mailOptions = {
    to: messageInfo.mail.replaceAll("、", ","), // 接收人列表,多人用','隔开
    subject: "金价监控",
    text: `当前金价为${buy_price.toFixed(2)}`,
  };
  await sendMail(mailOptions);
}
```

## 五、定时执行脚本

可以使用`corn`编写一个定时任务来定时执行脚本即可。

- `* * * * * *`分别对应：秒、分钟、小时、日、月、星期。
- 每个字段可以是具体的值、范围、通配符（\*表示每一个）或一些特殊的表达式。

例如：

```shell
0 0 * * *：每天午夜 0 点执行。
0 30 9 * * 1-5：周一到周五上午 9:30 执行。
```

你可以根据自己的需求设置合适的 cron 表达式来定时执行特定的任务。

## 六、效果展示

如果金价不在我们设置的阈值内时，我们就会收到邮件告知当前金价：

![](https://files.mdnice.com/user/42027/5cf97f3c-9cf4-4c16-a206-8cc69cfde75e.png)

![](https://files.mdnice.com/user/42027/4e8c6eec-9180-4f5c-a404-db0cc7571b71.png)

![](https://files.mdnice.com/user/42027/e722c849-df65-422d-8ba1-88d06f98585a.jpg)

## 七、脚本使用

### 1、源码下载

```shell
git clone https://gitee.com/zheng_yongtao/node-scripting-tool.git
```

- 源码已经上传到 gitee 仓库

[https://gitee.com/zheng_yongtao/node-scripting-tool](https://gitee.com/zheng_yongtao/node-scripting-tool)

- 具体目录如下：

![](https://files.mdnice.com/user/42027/0ce0c441-0f26-4d0d-9b05-814e7ee31e2b.png)

### 2、依赖下载

```shell
npm install
```

### 3、配置数据填写

![](https://files.mdnice.com/user/42027/e2edb80f-5330-4913-a7b5-158506693bd3.png)

这里的配置信息需要修改为你自己的信息，数据库、gitee 仓库、nowapi 配置。

### 4、脚本运行

```shell
node index.js
```

## 更多脚本

该脚本仓库里还有很多有趣的脚本工具，有兴趣的也可以看看其他的：[https://gitee.com/zheng_yongtao/node-scripting-tool](https://gitee.com/zheng_yongtao/node-scripting-tool)

---

**🌟 觉得有帮助的可以点个 star\~**

**🖊 有什么问题或错误可以指出，欢迎 pr\~**

**📬 有什么想要实现的工具或想法可以联系我\~**

---

## 公众号

关注公众号『前端也能这么有趣』，获取更多有趣内容。

## 说在后面

> 🎉 这里是 JYeontu，现在是一名前端工程师，有空会刷刷算法题，平时喜欢打羽毛球 🏸 ，平时也喜欢写些东西，既为自己记录 📋，也希望可以对大家有那么一丢丢的帮助，写的不好望多多谅解 🙇，写错的地方望指出，定会认真改进 😊，偶尔也会在自己的公众号『`前端也能这么有趣`』发一些比较有趣的文章，有兴趣的也可以关注下。在此谢谢大家的支持，我们下文再见 🙌。
