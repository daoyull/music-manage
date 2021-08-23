<template>
  <div>
    <el-row>
      <el-col :span="1">
        <i class="el-icon-monitor"></i>
      </el-col>
      <el-col :span="6" style="">
        <h1>音乐管理系统</h1>
      </el-col>
      <el-col :span="6" :offset="9">


      </el-col>
      <el-col :span="2">

      </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
  data(){
    return{


    }
  },
  computed:{
    userName(){
      return localStorage.getItem('userName');
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
