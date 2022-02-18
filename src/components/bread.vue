<template>
  <!-- 面包屑 -->
  <div class="bread">
 <el-breadcrumb>
 <el-breadcrumb-item v-for="(item, index) in fromFather" :key='index' :to="{ path: + item.path }">{{item.name}}</el-breadcrumb-item>

</el-breadcrumb>
</div>
</template>

<script>
export default {
   name: 'bread',
   props: ['fromFather']
}
</script>

<style lang="less">
.bread {
    background-color: #fff;
    width: 100%;
    height: 50px;
    padding: 0 16px;
    border: 1px #EFEFEF solid;
    box-sizing: border-box;
    box-shadow: 1px 2px 4px #BABABA;
    margin-bottom: 36px;
    .el-icon-arrow-right:before {
        color: #000;
    }
    .el-breadcrumb__item {
        font-size: 20px;
        line-height: 50px;
    }
    .el-breadcrumb__inner {
        cursor: pointer !important;
    }
}
</style>
