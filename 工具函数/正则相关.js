module.exports = {
  /** 数字 */
  number: /^\d+(\.{1}\d+)?$/,
  /** 整数 */
  integer: /^-?\d+$/,
  /** 正整数 */
  positiveInteger: /^[0-9]*[1-9][0-9]*$/,
  /** 负整数 */
  negativeInteger: /^-[0-9]*[1-9][0-9]*$/,
  /** 浮点数 */
  floatingPointNumber: /^(-?\d+)(\.\d+)?$/,
  /** 大小写字母 */
  abc: /^[A-Za-z]+$/,
  /** 仅大写 */
  abcMax: /^[A-Z]+$/,
  /** 仅小写 */
  abcMin: /^[a-z]+$/,
  /** 字母 数字 */
  abcNumber: /^[A-Za-z0-9]+$/,
  /** 字母 数字 下划线 */
  abcNumberUnderline: /^\w+$/,
  /** 邮箱 */
  email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  /** 中文 */
  chinese: /[u4e00-u9fa5]/,
  /** ip 地址 */
  ip: /(d+).(d+).(d+).(d+)/,
}

// 匹配{{aadd}}里的'aadd'
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

// 匹配正整数
let isPositiveNum = val => {
  return /^[1-9]d*$/.test(val)
}

// 匹配负整数
let isNegativeNum = val => {
  return /^-[1-9]d*$/.test(val)
}

// 匹配整数
let isInteger = val => {
  return /^(-|\+)?\d+$/.test(val)
}

// 匹配非负浮点数
let isNotNegativeFloatNum = val => {
  return /^\d+(\.\d+)?$/.test(val)
}

// 验证中文/汉字
export const isChineseCharacter = value =>
  /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/g.test(
    value
  )

// 46.验证不能包含字母
export const isNoWord = value => /^[^A-Za-z]*$/g.test(value)

// 47.验证中文和数字
export const isCHNAndEN = value =>
  /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(
    value
  )

// 48.验证邮政编码(中国)
export const isPostcode = value => /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value)

// 49.验证微信号，6至20位，以字母开头，字母，数字，减号，下划线
export const isWeChatNum = value => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g.test(value)

// 50.验证16进制颜色
export const isColor16 = value => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(value)

// 51.验证火车车次
export const isTrainNum = value => /^[GCDZTSPKXLY1-9]\d{1,4}$/g.test(value)

// 52.验证手机机身码(IMEI)
export const isIMEI = value => /^\d{15,17}$/g.test(value)

// 53.验证必须带端口号的网址(或ip)
export const isHttpAndPort = value => /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/g.test(value)

// 54.验证网址(支持端口和"?+参数"和"#+参数)
export const isRightWebsite = value => /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(value)

// 55.验证统一社会信用代码
export const isCreditCode = value => /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g.test(value)

// 56.验证迅雷链接
export const isThunderLink = value => /^thunderx?:\/\/[a-zA-Z\d]+=$/g.test(value)

// 57.验证ed2k链接(宽松匹配)
export const ised2k = value => /^ed2k:\/\/\|file\|.+\|\/$/g.test(value)

// 58.验证磁力链接(宽松匹配)
export const isMagnet = value => /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/g.test(value)

// 59.验证子网掩码
export const isSubnetMask = value => /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/g.test(value)

// 60.验证linux"文件夹"路径
export const isLinuxFolderPath = value => /^(\/[^/]+)+\/?$/g.test(value)

// 61.验证linux"文件"路径
export const isLinuxFilePath = value => /^(\/[^/]+)+$/g.test(value)

// 62.验证window"文件夹"路径
export const isWindowsFolderPath = value => /^[a-zA-Z]:\\(?:\w+\\?)*$/g.test(value)

// 63.验证window下"文件"路径
export const isWindowsFilePath = value => /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/g.test(value)

// 64.验证股票代码(A股)
export const isAShare = value => /^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/g.test(value)

// 65.验证版本号格式必须为X.Y.Z
export const isVersion = value => /^\d+(?:\.\d+){2}$/g.test(value)

// 66.验证视频链接地址（视频格式可按需增删）
export const isVideoUrl = value => /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i.test(value)

// 67.验证图片链接地址（图片格式可按需增删）
export const isImageUrl = value => /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(value)

// 68.验证银行卡号（10到30位, 覆盖对公/私账户, 参考微信支付）
export const isAccountNumber = value => /^[1-9]\d{9,29}$/g.test(value)

// 69.验证中文姓名
export const isChineseName = value => /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value)

// 70.验证英文姓名
export const isEnglishName = value => /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value)

// 71.验证车牌号(新能源)
export const isLicensePlateNumberNER = value => /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g.test(value)

// 72.验证车牌号(非新能源)
export const isLicensePlateNumberNNER = value => /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g.test(value)

// 73.验证车牌号(新能源+非新能源)
export const isLicensePlateNumber = value =>
  /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/g.test(
    value
  )

// 74.验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段
export const isMPStrict = value => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(value)

// 75.验证手机号中国(宽松), 只要是13,14,15,16,17,18,19开头即可
export const isMPRelaxed = value => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value)

// 76.验证email(邮箱)
export const isEmail = value => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(value)

// 77.验证座机电话(国内),如: 0341-86091234
export const isLandlineTelephone = value => /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value)

// 78.验证身份证号(1代,15位数字)
export const isIDCardOld = value => /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/g.test(value)

// 79.验证身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
export const isIDCardNew = value => /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/g.test(value)

// 80.验证身份证号, 支持1/2代(15位/18位数字)
export const isIDCard = value => /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(value)

// 81.验证护照（包含香港、澳门）
export const isPassport = value => /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(value)

// 82.验证帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
export const isWebAccount = value => /^[a-zA-Z]\w{4,15}$/g.test(value)

// 83.验证中文/汉字
export const isChineseCharacter = value =>
  /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/g.test(
    value
  )

// 84.验证小数
export const isDecimal = value => /^\d+\.\d+$/g.test(value)

// 85.验证数字
export const isNumber = value => /^\d{1,}$/g.test(value)

// 86.验证qq号格式
export const isQQNum = value => /^[1-9][0-9]{4,10}$/g.test(value)

// 87.验证数字和字母组成
export const isNumAndStr = value => /^[A-Za-z0-9]+$/g.test(value)

// 88.验证英文字母
export const isEnglish = value => /^[a-zA-Z]+$/g.test(value)

// 89.验证大写英文字母
export const isCapital = value => /^[A-Z]+$/g.test(value)

// 90.验证小写英文字母
export const isLowercase = value => /^[a-z]+$/g.test(value)
