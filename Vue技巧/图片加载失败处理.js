// page 代码
<img :src="imgUrl" @error="handleError" alt="">
<script>
export default{
  data(){
    return{
      imgUrl:  
    }
  },
  methods:{
    handleError(e){
      e.target.src=reqiure( 图片路径 ) //当然如果项目配置了transformToRequire,参考上面 27.2
    }
  }
}
</script>