// 生成随机HEX色值
const RandomColor = () =>
    '#' +
    Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, '0')
const color = RandomColor()
// color => "#f03665"

// 操作URL查询参数
const params = new URLSearchParams(location.search.replace(/\?/gi, '')) // location.search = "?name=dd&sex=female"
params.has('dd') // true
params.get('sex') // "female"

// 补零
const FillZero = (num, len) => num.toString().padStart(len, '0')
const num = FillZero(169, 5)
// num => "00169"

// 精确小数
const RoundNum = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal
const num = RoundNum(1.69, 1)
// num => 1.7

// 判断奇偶
const OddEven = num => (!!(num & 1) ? 'odd' : 'even')
const num = OddEven(2)
// num => "even"

// 生成范围随机数
const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const num = RandomNum(1, 10)

// 判断数据类型：undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
function DataType(tgt, type) {
    const dataType = Object.prototype.toString
        .call(tgt)
        .replace(/\[object /g, '')
        .replace(/\]/g, '')
        .toLowerCase()
    return type ? dataType === type : dataType
}

// 是否为空数组
const arr = []
const flag = Array.isArray(arr) && !arr.length
// flag => true

// 是否为空对象
const obj = {}
const flag = DataType(obj, 'object') && !Object.keys(obj).length
// flag => true

// 混淆数组
const arr = [0, 1, 2, 3, 4, 5].slice().sort(() => Math.random() - 0.5)
// arr => [3, 4, 0, 5, 1, 2]

// 过滤空值：undefined、null、""、0、false、NaN
const arr = [undefined, null, '', 0, false, NaN, 1, 2].filter(Boolean)
// arr => [1, 2]

// 异步累计
async function Func(deps) {
    return deps.reduce(async (t, v) => {
        const dep = await t
        const version = await Todo(v)
        dep[v] = version
        return dep
    }, Promise.resolve({}))
}
const result = await Func()

// 统计数组成员个数
const arr = [0, 1, 1, 2, 2, 2]
const count = arr.reduce((t, c) => {
    t[c] = t[c] ? ++t[c] : 1
    return t
}, {})
// count => { 0: 1, 1: 2, 2: 3 }

// 获取随机数组成员
const arr = [0, 1, 2, 3, 4, 5]
const randomItem = arr[Math.floor(Math.random() * arr.length)]
// randomItem => 1

// 创建指定长度数组
const arr = [...new Array(3).keys()]
// arr => [0, 1, 2]

// 创建指定长度且值相等的数组
const arr = new Array(3).fill(0)
// arr => [0, 0, 0]

// 检测非空参数
function IsRequired() {
    throw new Error('param is required')
}
function Func(name = IsRequired()) {
    console.log(name)
}
Func() // "param is required"
Func('Lee') // "Lee"

// 优雅处理Async/Await参数
function AsyncTo(promise) {
    return promise.then(data => [null, data]).catch(err => [err])
}
const [err, res] = await AsyncTo(Func())

// 优雅处理多个函数返回值
function Func() {
    return Promise.all([fetch('/user'), fetch('/comment')])
}
const [user, comment] = await Func() // 需在async包围下使用

    // 显示全部DOM边框：调试页面元素边界时使用
    ;[].forEach.call($$('*'), dom => {
        dom.style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16)
    })

// 过滤XSS
function FilterXss(content) {
    let elem = document.createElement('div')
    elem.innerText = content
    const result = elem.innerHTML
    elem = null
    return result
}

// 过滤 \uFEFF
function getFileData(file) {
    let data = readFileSync(file, 'utf-8')
    data = data.replace(/^\uFEFF/, '')
    return data
}

// js 驼峰转下划线  api_hook
'apiHook'.replace(/\B([A-Z])/g, '_$1').toLowerCase()

// js 下划线转驼峰 apiHookGet
'api_hook_get'.replace(/\_(\w)/g, (all, letter) => {
    return letter.toUpperCase()
})

// js 骚操作获取地址栏参数 ?name=zhangsan&age=11 => {name: "zhangsan", age: 11}
let q = {}
location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v))

/*DOM转字符串*/
domToStirng(htmlDOM){
    let div = document.createElement("div");
    div.appendChild(htmlDOM);
    return div.innerHTML
}

/*字符串转DOM*/
stringToDom(htmlString){
    let div = document.createElement("div");
    div.innerHTML = htmlString;
    return div.children[0];
}

/**
 * get/set attributes
 * @param {HTMLElement} el 
 * @param {String | Object} name 
 * @param {String} value 
 */
attr(el, name, value) {
    if (typeof el.getAttribute === "undefined") return utils.prop(el, name, value)
    if (value !== undefined) {
        if (value === null) utils.removeAttr(el, name)
        else el.setAttribute(name, value)
    } else if (({}).toString.call(name) === '[object Object]') {
        utils.each(name, (k, v) => {
            el.setAttribute(k, v)
        })
    } else return el.getAttribute(name)
}
/**
 * Create Element
 * @param {String} name ElementTagName
 * @param {Object} attrName 
 * @param {Object} attrVal 
 */
create(name, attrName, attrVal) {
    let el = document.createElement(name)
    utils.attr(el, attrName, attrVal)
    return el
}
/**
 * 动态加载资源库 
 * @param {String} sourceName 资源名 script/link
 * @param {Object} attrs 需要加载属性/值
 * @param {Function} callback 回调函数
 */
dynamicLoadSource(sourceName, attrs, callback) {
    let attrNameMap = { 'script': 'src', 'link': 'href' };
    let attr = attrNameMap[sourceName];
    if (utils.find(doc, `${sourceName}[${attr}="${attrs[attr]}"]`)) {
        typeof (callback) === 'function' && callback()
    } else {
        let s = utils.create(sourceName, attrs);
        let h = doc.getElementsByTagName("head")[0];
        h.appendChild(s);
        s.onload = s.onreadystatechange = function () {
            let vm = this;
            if (! /*@cc_on!@*/ 0 || vm.readyState === 'loaded' || vm.readyState === 'complete') {
                vm.onload = vm.onreadystatechange = null;
                typeof (callback) === 'function' && callback()
            }
        }
    }
},
// 点击目标区域外隐藏
function hideOnClickOutside(element) {
    const outsideClickListener = event => {
        if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
            element.style.display = 'none'
            removeClickListener()
        }
    }

    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
    }

    document.addEventListener('click', outsideClickListener)
}

const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length) 

// 输入是否是数字
function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
 * Set the style to the given popper
 * @method
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
export default function setStyles(element, styles) {
    Object.keys(styles).forEach(prop => {
      let unit = '';
      // add unit if the value is numeric and is one of the following
      if (
        ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !==
          -1 &&
        isNumeric(styles[prop])
      ) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
 * Set the attributes to the given popper
 * @method
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
export default function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function(prop) {
      const value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
export default function getOuterSizes(element) {
    const window = element.ownerDocument.defaultView;
    const styles = window.getComputedStyle(element);
    const x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    const y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    const result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x,
    };
    return result;
  }
  
/**
 * Remove an item from an array
 */
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}