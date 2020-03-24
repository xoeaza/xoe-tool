// 子组件传出单个参数
// 子组件
this.$emit('test',this.param)
// 父组件
@test='test($event,newArg)'  // newArg为父组件的附加对象/参数

// 子组件传出多个参数
// 子组件
this.$emit('test',this.param1，this.param2, this.param3)
// 父组件 arguments 是以数组的形式传入
@test='test(arguments,newArg)'