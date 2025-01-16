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
function closeDatabaseConnect() {
  return new Promise((resolve) => {
    connection.end((err) => {
      if (err) throw err;
      console.log("数据库连接已关闭");
      resolve("数据库连接已关闭");
    });
  });
}
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

async function getTableDate() {
  await connectDatabase();
  const res = await getMessage();
  await closeDatabaseConnect();
  return res;
}

module.exports = getTableDate;
