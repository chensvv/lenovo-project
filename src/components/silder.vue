<template>
  <div class="navMenu">
 
    <label v-for="navMenu in navMenus">
      <el-menu-item v-if="navMenu.children==null" :data="navMenu" :index="String(navMenu.id)" :route="navMenu.url">
        <i :class="navMenu.icon"></i>
        <span slot="title">{{navMenu.ruleName}}</span>
      </el-menu-item>
 
      <el-submenu v-if="navMenu.children" :data="navMenu" :index="String(navMenu.id)">
        <template slot="title">
          <i :class="navMenu.icon"></i>
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
      return {}
    },
    methods: {}
  }
</script>
 
<style scoped>
 
</style>