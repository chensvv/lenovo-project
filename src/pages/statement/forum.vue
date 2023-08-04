<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
      <div class="form-input height50">
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="searchItem.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="自动审批">
          <el-switch
            v-model="autoAudit"
            active-value="1"
            inactive-value="2"
            :disabled="isdisabled"
            @change="handleChange">
          </el-switch>
        </el-form-item>
        <el-form-item>
            <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        </el-form-item>
      </div>
      
      <div class="form-btn">
        
        <!-- <el-radio-group v-model="autoAudit" size="mini" @change="handleChange">
          <el-radio label="1" border>开启自动审批</el-radio>
          <el-radio label="2" border>关闭自动审批</el-radio>
        </el-radio-group> -->
        <el-button size="mini" @click="handleBatchDel()" v-has="'forum:delbatch'">批量删除</el-button>
      </div>
      
    </el-form>
    <div class="table-box">
      <el-table
          :data="list"
          stripe
          :class="this.totalClass <= '7' ? 'limitWidth' :''"
          style="width: 100%"
          v-loading="listLoading"
          @selection-change="handleSelectionChange"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading">
          <el-table-column
              type="selection"
              width="55"
              align="center">
          </el-table-column>
          <el-table-column type="index" align="center" label="#">
          </el-table-column>
          <el-table-column
              label="标题"
              prop="title"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.title" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.title }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.title }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
                label="状态"
                prop="invalidate"
                align="center"
                :formatter="formState">
            </el-table-column>
          <el-table-column
              label="创建时间"
              prop="createTime"
              align="center"
              :formatter="formTime"
              width="130">
          </el-table-column>
          <el-table-column label="操作" align="center" width="240" v-if="btnshow">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.invalidate == 1 || scope.row.invalidate == 0"
                  size="mini"
                  type="danger"
                  @click="handleOff(scope.$index, scope.row)"
                  v-has="'forum:details'">否决</el-button>
                <el-button
                  v-if="scope.row.invalidate == 2 || scope.row.invalidate == 0"
                  size="mini"
                  type="danger"
                  @click="handleUpdate(scope.$index, scope.row)"
                  v-has="'forum:details'">审批</el-button>
                  <el-button
                  size="mini"
                  @click="handleInfo(scope.$index, scope.row)"
                  v-has="'forum:details'">详情</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'forum:delete'">删除</el-button>
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
import {checkTime} from '@/utils/timer.js'
import {forumList, forumDetele, forumDelbatch, forumReview, forumUpdate, forumAutoAudit} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {getpageNum} from '@/utils/pagination.js'
export default {
  data() {
    return {
      getpageNum:getpageNum,
      list: [],
      perList:[],
      sels:[],
      totalClass:'8',
      autoAudit:'2',
      currentItem: {//编辑数据组
        id:"",
        speak: "",
        answer:""
      },
      searchItem:{//搜索数据组
        title:"",
      },
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      isdisabled:false,
      showTitle:true,
      seaBtnLoading:false,
      listLoading:true,
      btnshow:true
    };
  },
  created() {
    let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
    perArr.map(t=>{
      this.perList.push(Object.values(t).join())
    })
    this.getList();
    this.getStatus()
  },
  mounted(){
    if(this.perList.indexOf('forum:details') == -1 && this.perList.indexOf('forum:delete') == -1){
            this.btnshow = false
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
    formTime(row, column){
      var timer = Number(row.createTime + '000')
      var date = new Date(timer)
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())
    },
    formState(row, column){
      return row.invalidate == 1 ? "已审核" : row.invalidate == 0 ? '未审核' : "审核拒绝"
    },
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
    handleSelectionChange(val){
      this.sels = val
    },
    handleChange(val){
      this.isdisabled = true
      let reviewParams = {
        invalidate:val
      }
      forumReview(reviewParams).then(res=>{
        this.isdisabled = false
        if(res.data.code == 200){
          this.$message({
            message:`已${this.autoAudit == '1' ? '开启' : '关闭'}自动审批`,
            type:"success",
            duration:2000
          });
        }else{
          if(res.data.code != undefined){
              this.$message({
                  message:res.data.code+'：'+res.data.msg,
                  type:'error',
                  duration:2000
              });
          }
        }
      }).catch(error=>{
        this.isdisabled = false
      })
    },
    getStatus(){
      forumAutoAudit().then(res=>{
        this.autoAudit = res.data.data
      })
    },
    handleInfo(index, row) {
      this.$router.push({
            path:'/forum/detail',
            query:{
                articleId:row.articleId
            }
        })
    },
    handleUpdate(index,row){
      let updateParams = {
        id:row.id,
        invalidate:1
      }
      forumUpdate(updateParams).then(res=>{
        if(res.data.code == 200){
          this.$message({
            message:'审批成功',
            type:"success",
            duration:2000
          });
          this.getList();
        }else{
          if(res.data.code != undefined){
              this.$message({
                  message:res.data.code+'：'+res.data.msg,
                  type:'error',
                  duration:2000
              });
          }
        }
      })
    },
    handleOff(index,row){
      let updateParams = {
        id:row.id,
        invalidate:2
      }
      forumUpdate(updateParams).then(res=>{
        if(res.data.code == 200){
          this.$message({
            message:'已否决',
            type:"success",
            duration:2000
          });
          this.getList();
        }else{
          if(res.data.code != undefined){
              this.$message({
                  message:res.data.code+'：'+res.data.msg,
                  type:'error',
                  duration:2000
              });
          }
        }
      })
    },
    handleBatchDel(){
      let ids = this.sels.map(item => item.id)
      if(ids.length == 0 || ids == [] || ids == null){
        this.$message({
            message:'请选择要删除的数据',
            type:"warning",
            duration:2000
        });
      }else{
        let delsParams = {
          ids:ids
        }
        delsParams.sign = deleteParams(delsParams)
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            forumDelbatch(delsParams).then(res=>{
              if(res.data.code == 200){
                this.$message({
                  message:'删除成功',
                  type:"success",
                  duration:2000
                });
                this.getList();
              }else{
                if(res.data.code != undefined){
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
              }
            })
        }).catch(err => {
            console.log(err);
        });
      }
    },
    handleDel(index, row) {
      let delParams = {
        id:row.id
      }
      delParams.sign = deleteParams(delParams)
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          forumDetele(delParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'删除成功',
                    type:"success",
                    duration:2000
                });
                this.getList();
            }else{
                if(res.data.code != undefined){
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
            }
          })
        }).catch(err => {
          console.log(err);
        });
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
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        title:this.searchItem.title,
      }
      params.sign = deleteParams(params)
      forumList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data
          this.totalCount = res.data.count
          this.totalClass = res.data.data.length
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
