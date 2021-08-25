<template>
  <div>
    <el-menu router>

      <el-menu-item index="/Info">
        <i class="el-icon-menu"></i>
        <span slot="title">主页</span>
      </el-menu-item>

      <el-menu-item index="/Singer">
        <i class="el-icon-menu"></i>
        <span slot="title">歌手管理</span>
      </el-menu-item>

      <el-menu-item index="/Song">
        <i class="el-icon-menu"></i>
        <span slot="title">歌曲管理</span>
      </el-menu-item>

      <el-menu-item index="/SongList">
        <i class="el-icon-menu"></i>
        <span slot="title">歌单管理</span>
      </el-menu-item>

      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'Aside',

}
</script>

<style scoped>

</style>
