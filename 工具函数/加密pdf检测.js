const checkEncryptPdf = (file, fileList) => {
  const { name } = file
  const isPdfFile = name.indexOf('.pdf') > -1
  if (!isPdfFile) return true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = evt => {
      const regex = new RegExp('/Encrypt')
      const res: any = evt?.target?.result || ''
      if (res.match(regex)) {
        reject('请勿上传加密pdf文件')
      }
      resolve(file)
    }
  })
}


// ES6模块依赖关系是确定的，和运行时的状态无关
// 无用的类引用，是无法消除的
// rollup只处理函数和顶层的import/export变量，不能把没用到的类的方法消除掉
// javascript动态语言的特性使得静态分析比较困难图7下部分的代码就是副作用的一个例子，如果静态分析的时候删除里run或者jump，程序运行时就可能报错，那就本末倒置了，我们的目的是优化，肯定不能影响执行
