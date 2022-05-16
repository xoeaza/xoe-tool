V8 执行一段 JavaScript 代码所经历的主要流程包括：
初始化基础环境；
解析器解析源码生成 AST 和作用域；
依据 AST 和作用域生成字节码；
解释器解释执行字节码；
监听器监听热点代码；
优化热点代码为二进制的机器代码；
反优化生成的二进制机器代码。
这里你需要注意的是，JavaScript 是一门动态语言，在运行过程中，某些被优化的结构可能会被 V8 动态修改了，这会导致之前被优化的代码失效，如果某块优化之后的代码失效了，那么编译器需要执行反优化操作。

<!-- 安装v8参考 -->
https://gist.github.com/kevincennis/0cd2138c78a07412ef21
可以使用 jsvu 来安装 js 引擎
1. 全局安装 jsvu： npm install jsvu -g
2. 将~/.jsvu路径添加到系统环境变量中：export PATH="${HOME}/.jsvu:${PATH}"
3. 可以直接通过命令参数指定： jsvu --os=mac64 --engines=v8-debug,v8
4. 设置alias: alias d8='~/.jsvu/v8-debug'
5. 调用: d8 --print-ast test.js