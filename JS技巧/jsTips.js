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
