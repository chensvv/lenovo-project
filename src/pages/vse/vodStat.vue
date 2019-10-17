<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
      <el-button size="mini" @click="beforeDate">前一天</el-button>
      <el-form-item label="日期选择" prop="refreshTime">
          <el-date-picker 
          type="date" 
          placeholder="选择日期" 
          v-model="searchItem.refreshTime" 
          style="width: 100%;"
          value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
        <el-divider content-position="left"  v-for="(item,index) in $route.meta" :key="index">{{item}}</el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "applicationlist",
  data() {
    return {
      list: [],
      searchItem:{//搜索数据组
        refreshTime:"",
      },
      seaBtnLoading:false,
      fileBtnLoading:false
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.searchItem.refreshTime = new Date()
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1
      this.getList()
    },
    onSubmit(){
      this.seaBtnLoading = true
      this.currentPage = 1
      this.seaBtnLoading = false
    },
    beforeDate () {
        this.searchItem.refreshTime = new Date(this.searchItem.refreshTime.setDate(this.searchItem.refreshTime.getDate() - 1))
    },

    getList() {
      let params = {
      }
    }
  }
};
</script>

<style scoped>
</style>
