// 生成随机HEX色值
const RandomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
const color = RandomColor();
// color => "#f03665"

// 操作URL查询参数
const params = new URLSearchParams(location.search.replace(/\?/ig, "")); // location.search = "?name=dd&sex=female"
params.has("dd"); // true
params.get("sex"); // "female"

// 补零
const FillZero = (num, len) => num.toString().padStart(len, "0");
const num = FillZero(169, 5);
// num => "00169"
j
// 精确小数
const RoundNum = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal;
const num = RoundNum(1.69, 1);
// num => 1.7

// 判断奇偶
const OddEven = num => !!(num & 1) ? "odd" : "even";
const num = OddEven(2);
// num => "even"

// 生成范围随机数
const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const num = RandomNum(1, 10);

// 判断数据类型：undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
function DataType(tgt, type) {
  const dataType = Object.prototype.toString.call(tgt).replace(/\[object /g, "").replace(/\]/g, "").toLowerCase();
  return type ? dataType === type : dataType;
}

// 是否为空数组
const arr = [];
const flag = Array.isArray(arr) && !arr.length;
// flag => true

// 是否为空对象
const obj = {};
const flag = DataType(obj, "object") && !Object.keys(obj).length;
// flag => true

// 混淆数组
const arr = [0, 1, 2, 3, 4, 5].slice().sort(() => Math.random() - .5);
// arr => [3, 4, 0, 5, 1, 2]

// 过滤空值：undefined、null、""、0、false、NaN
const arr = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean);
// arr => [1, 2]

// 异步累计
async function Func(deps) {
  return deps.reduce(async (t, v) => {
    const dep = await t;
    const version = await Todo(v);
    dep[v] = version;
    return dep;
  }, Promise.resolve({}));
}
const result = await Func();

// 统计数组成员个数
const arr = [0, 1, 1, 2, 2, 2];
const count = arr.reduce((t, c) => {
  t[c] = t[c] ? ++t[c] : 1;
  return t;
}, {});
// count => { 0: 1, 1: 2, 2: 3 }

// 获取随机数组成员
const arr = [0, 1, 2, 3, 4, 5];
const randomItem = arr[Math.floor(Math.random() * arr.length)];
// randomItem => 1

// 创建指定长度数组
const arr = [...new Array(3).keys()];
// arr => [0, 1, 2]

// 创建指定长度且值相等的数组
const arr = new Array(3).fill(0);
// arr => [0, 0, 0]

// 检测非空参数
function IsRequired() {
  throw new Error("param is required");
}
function Func(name = IsRequired()) {
  console.log(name);
}
Func(); // "param is required"
Func("Lee"); // "Lee"

// 优雅处理Async/Await参数
function AsyncTo(promise) {
  return promise.then(data => [null, data]).catch(err => [err]);
}
const [err, res] = await AsyncTo(Func());

// 优雅处理多个函数返回值

function Func() {
  return Promise.all([
    fetch("/user"),
    fetch("/comment")
  ]);
}
const [user, comment] = await Func(); // 需在async包围下使用

// 显示全部DOM边框：调试页面元素边界时使用
[].forEach.call($$("*"), dom => {
  dom.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});

// 过滤XSS
function FilterXss(content) {
  let elem = document.createElement("div");
  elem.innerText = content;
  const result = elem.innerHTML;
  elem = null;
  return result;
}