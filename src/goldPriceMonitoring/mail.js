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
