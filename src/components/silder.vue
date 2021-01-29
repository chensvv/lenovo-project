<template>
  <div class="navMenu">
    <label v-for="navMenu in navMenus">
      <el-menu-item v-if="navMenu.children==null" :data="navMenu" :index="navMenu.url" :route="navMenu.url">
        <i class="el-icon-date"></i>
        <span slot="title">{{navMenu.ruleName}}</span>
      </el-menu-item>
 
      <el-submenu v-if="navMenu.children" :data="navMenu" :index="navMenu.id">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span> {{navMenu.ruleName}}</span>
        </template>
        <NavMenu :navMenus="navMenu.children"></NavMenu>
      </el-submenu>
    </label>
 
  </div>
</template>
 
<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {
      }
    },
  }
</script>
 
<style scoped>
 
</style>