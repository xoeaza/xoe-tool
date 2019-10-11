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
	ip: /(d+).(d+).(d+).(d+)/
}
