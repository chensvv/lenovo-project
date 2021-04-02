<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报表系统</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="table-box">
        <el-table
            :data="list"
            :class="this.totalCount <= 5 ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading">
            <el-table-column :label="head" v-for="(head, key) in header" :key="head" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{list[scope.$index][key]}}
                </template>
            </el-table-column>
        </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {querySql} from '@/config/api'
export default {
  data() {
    return {
      list: [],
      header:[],
      editVisible: false,
      addVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      fileBtnLoading:false,
      listLoading:true
    };
  },
  created() {
    this.getList()
  },
  watch: {
    '$route'(to, from) {
        this.getList()
    }
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
      this.getList()
      this.seaBtnLoading = false
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`);
      this.getList();
    },
    getCaption(obj){
        let index=obj.lastIndexOf("\?");
        obj=obj.substring(index+1,obj.length);
        return obj;
    },
    getList() {
      this.listLoading = true
        this.list = []
        this.header = []
        let params = {
            start:this.currentPage,
            page:this.pageSize,
            name:this.getCaption(window.location.href)
        }
        querySql(params).then(res => {
            this.listLoading = false
            this.totalCount = res.data.data.total
            for(let i in res.data.data.data[0]) {
                this.header.push(i)
            }
            for(let i in res.data.data.data) {
                let arr = [];
                for(let j in res.data.data.data[i]) {
                    arr.push(res.data.data.data[i][j])
                }
                this.list.push(arr)
            }
        });
    }
  }
};
</script>

<style scoped>
</style>
