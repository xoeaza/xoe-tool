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
// 使用async await 处理异步操作
let results = await Promise.all(arr.map(async (item) => {
	// 等待异步操作完成，返回执行结果
	return await asyncWorker(item);
}));