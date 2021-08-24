<template>
    <div>

    <el-container>
      <el-header class="el-header">
        <Header></Header>
      </el-header>

      <el-container>
        <el-aside width="200px" class="el-aside">
          <Aside></Aside>
        </el-aside>

        <el-main class="el-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './Header'
import Aside from './Aside'


export default {
  name: 'Home',
  components:{
    Header,
    Aside

  },
  data(){
    return {
      zxz: '测试'
    }
  },
  created(){

  }
}
</script>

<style scoped>

.el-header{
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 750px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
   text-align: center;
  line-height: 20px !important;
}



body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
