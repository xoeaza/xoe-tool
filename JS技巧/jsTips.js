// 1.多值条件判断语句
let selectType = '';
const disabledConfirm = (() => {
  switch (true) {
    case selectType === 1:
      return false;
    case selectType === 2:
      return false;
    default:
      return true;
  }
})();
console.log(disabledConfirm); // true

// map - Promise.all
//2. 使用async await 处理异步操作
let results = await Promise.all(
  arr.map(async item => {
    // 等待异步操作完成，返回执行结果
    return await asyncWorker(item);
  })
);

//3. 单一数据源的取值定义
export const DATA_TYPE = {
  NAME1: {
    id: 1,
    label: '111'
  },
  NAME2: {
    id: 2,
    label: '222'
  }
};

export const DATA_TYPE_LIST = Object.keys(DATA_TYPE).map(val => {
  return DATA_TYPE[val];
});

export const DATA_TYPE_MAP = {};
Object.keys(DATA_TYPE).forEach(val => {
  const { id, label } = DATA_TYPE[val];
  DATA_TYPE_MAP[id] = label;
});

// 复杂对象在query传参
// 设定一个复杂对象
const complexObject = {
  name: 'Vue.js',
  type: 'Framework',
  year: 2014
};

// 将对象转换为JSON字符串
const jsonString = JSON.stringify(complexObject);

// 将JSON字符串转换为blob对象
const blob = new Blob([jsonString], { type: 'application/json' });

// 创建URL指向blob对象
const url = URL.createObjectURL(blob);

// 使用vue-router进行导航，并附加blob对象作为query参数
this.$router.push({ path: '/destination', query: { data: url } });

// 在目标组件中，你可以通过以下方式获取并解析blob对象
created() {
  const blobUrl = this.$route.query.data;
  fetch(blobUrl).then(response => response.blob()).then(blob => {
    // 将blob对象转换为JSON字符串
    return blob.text();
  }).then(jsonString => {
    // 将JSON字符串解析回对象
    const complexObject = JSON.parse(jsonString);
    console.log(complexObject);
  });
}