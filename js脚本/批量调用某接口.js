const axios = require('axios');
const Qs = require('qs');

const getApiResult = name => {
  var data = { user: name, role: 1 };
  return axios({
    url: 'http://www.xxx.com',
    method: 'put',
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7,zh-TW;q=0.6',
      'cache-control': 'no-cache',
      'content-type': 'application/json;charset=UTF-8',
      pragma: 'no-cache',
      'x-requested-with': 'XMLHttpRequest',
      cookie: ''
    },
    data: data
  });
};

const sleep = time => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('');
    }, time);
  });
};

const Namelist = ['1', '2'];

const batchQuery = async numList => {
  let result = [];
  for (let i = 0; i < numList.length; i++) {
    try {
      const res = await getApiResult(numList[i]);
      result.push('查询结果是' + res.status);
      await sleep(500);
    } catch (e) {
      result.push(e);
    }
  }
  return result;
};

// batchQuery(Namelist);
