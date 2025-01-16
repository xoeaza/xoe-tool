const axios = require("axios");
const getTableDate = require("./mysql.js");
const sendMail = require("./mail.js");
const { nowapiConfig } = require("./config.js");

//获取黄金交易所今日金价
async function getGoldPrice() {
  const result = await axios.get(
    `https://sapi.k780.com/?app=finance.gold_price&goldid=1053&appkey=${nowapiConfig.AppKey}&sign=${nowapiConfig.Sign}&format=json`
  );
  return result.data.result.dtList["1053"];
}
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
const main = async () => {
  const reqList = [getGoldPrice(), getTableDate()];
  const [goldInfo, messageInfo] = await Promise.all(reqList);
  await mail(messageInfo, goldInfo);
  process.exit(0);
};

main();
