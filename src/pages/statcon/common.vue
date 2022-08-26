<template>
  <div class="table height-35">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/gift/add'}">报表系统</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="table-box">
        <el-table
            :data="list"
            stripe
            :class="this.totalClass <= '7' ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
            <el-table-column :label="head" v-for="(head, key) in header" :key="head" align="left">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="list[scope.$index][key]" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{list[scope.$index][key]}}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{list[scope.$index][key]}}
                  </div>
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
import {deleteParams} from '@/utils/deleteParams.js'
export default {
  data() {
    return {
      list: [],
      header:[],
      totalClass:'8',
      editVisible: false,
      addVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
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
    onShowNameTipsMouseenter(e) {
        var target = e.target;
        let textLength = target.clientWidth;
        let containerLength = target.scrollWidth;
        if (textLength < containerLength) {
            // 溢出了
            this.showTitle = false;
        } else {
            this.showTitle = true;
        }
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
        params.sign = deleteParams(params)
        querySql(params).then(res => {
            this.listLoading = false
            if(res.data.code == 200){
              this.totalCount = res.data.data.total
              this.totalClass = res.data.data.data.length
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
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:'error',
                    duration:1500
                });
            }
        }).catch(()=>{
          this.listLoading = false
        })
    }
  }
};
</script>

<style scoped>
</style>
