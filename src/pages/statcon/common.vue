<template>
  <div class="table height-35">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
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
      <div class="pagination-wrap" v-cloak>
          <ul class="pagination">
              <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
              <li v-if="currentPage == getpageNum(totalCount) && currentPage !=1 && currentPage - 2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
              <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
              <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
              <li v-if="currentPage != getpageNum(totalCount) && getpageNum(totalCount) !=0" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
              <li v-if="currentPage+1 < 3 && currentPage != getpageNum(totalCount) && getpageNum(totalCount) >=3" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
              <li><button :disabled="currentPage == getpageNum(totalCount) || getpageNum(totalCount) == 0 ? true : false" @click="turnToPage(getpageNum(totalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {querySql} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {getpageNum} from '@/utils/pagination.js'
export default {
  data() {
    return {
      getpageNum:getpageNum,
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
    turnToPage(pageNum){
        var ts = this;
        var pageNum = parseInt(pageNum);
        if(pageNum == -1){
            ts.getList(pageNum)
        }else{
            ts.currentPage = pageNum
            if (!pageNum || pageNum < 1) {
                console.log('页码输入有误！');
                return false;
            }else{
                ts.getList(pageNum)
            }
        }
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
                if(res.data.code != undefined){
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
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
