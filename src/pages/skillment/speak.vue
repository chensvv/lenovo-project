<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            
            <el-breadcrumb-item :to="{ path: '/skill/applist'}">应用列表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'skilldetail',params:{functionId:this.functionId, appId:this.appId}}">应用详情</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    
    <el-form :inline="true" class="demo-form-inline height70 width130" size="mini">
        <div class="d_t">
            <span class="d_title">{{skillDetail.appName}}  >> </span><span>{{skillDetail.functionName}}</span>
        </div>
        <div class="form-btn">
            <el-button size="mini" @click="release()" :loading="relBtnLoading" v-has="'skill:speakpublish'">发布</el-button>
            <el-button size="mini" @click="handleAdd()" v-has="'skill:speakadd'">添加</el-button>
            <router-link :to="{ name: 'sersion',params:{functionId:this.functionId, appId:this.appId}}">
                <el-button size="mini" v-has="'skill:versionlist'">答案列表</el-button>
            </router-link>
        </div>
        
    </el-form>
    <div class="table-box">
        <el-table
            :data="list"
            stripe
            :class="this.totalClass <= '7' ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
            <el-table-column type="index" align="center" label="#">
            </el-table-column>
            <el-table-column
                label="说法"
                prop="speak"
                align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.speak" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.speak }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.speak }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="强制匹配"
                prop="state"
                align="center"
                :formatter="formVal">
            </el-table-column>
            <el-table-column
                label="调用次数"
                prop="speakCallCount"
                align="center">
            </el-table-column>
            <el-table-column
                label="更新时间"
                prop="displayUpdateTime"
                align="center"
                width="140">
            </el-table-column>
            <el-table-column label="操作" align="center" width="130" v-if="isshow">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    v-has="'skill:speakupdate'">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDel(scope.$index, scope.row)"
                    v-has="'skill:speakdelete'">删除</el-button>
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
                <li><button :disabled="currentPage == getpageNum(totalCount) || getpageNum(totalCount) == 0? true: false" @click="turnToPage(getpageNum(totalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
            </ul>
        </div>
    </div>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
        <el-form :label-position="'right'" label-width="80px" size="small" :rules="editRules" :model="currentItem" ref="currentItem" @submit.native.prevent>
            <el-form-item label="说法" prop="speak">
                <el-input type="text" v-model.trim="currentItem.speak" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="强制匹配" prop="state">
                <el-radio-group v-model="currentItem.state" size="medium">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="添加说法" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="80px" size="small" :rules="addRules" :model="addList" ref="addList" @submit.native.prevent>
                <el-form-item label="说法" prop="speak">
                    <el-input type="text" v-model.trim="addList.speak" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="强制匹配" prop="state">
                    <el-radio-group v-model="addList.state" size="medium">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {skillInfo, speakList, speakAdd, speakUpd, speakDel, speakPub} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {getpageNum} from '@/utils/pagination.js'
export default {
  data() {
    return {
      getpageNum:getpageNum,
      list: [],
      perList:[],
      appId:"",
      functionId:"",
      totalClass:'8',
      skillDetail:{
        appName:"",
        functionName:""
      },
      currentItem: {//编辑数据组
        id:"",
        speak: "",
        state:""
      },
      addList: {//添加数据组
        speak:"",
        state:""
      },
      addRules:{
        speak:[{ required: true, message: '请输入说法名称', trigger: 'change' }],
        state:[{ required: true, message: '请选择是否强制匹配', trigger: 'change' }]
      },
      editRules:{
        speak:[{ required: true, message: '请输入说法名称', trigger: 'blur' }],
        state:[{ required: true, message: '请选择是否强制匹配', trigger: 'blur' }]
      },
      editVisible: false,
      addVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      addBtnLoading:false,
      editBtnLoading:false,
      relBtnLoading:false,
      listLoading:true,
      isshow:true
    };
  },
  created() {
    this.appId = this.$route.params.appId
    this.functionId = this.$route.params.functionId
    let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
    perArr.map(t=>{
        this.perList.push(Object.values(t).join())
    })
    this.getList();
  },
  mounted(){
      if(this.perList.indexOf('skill:speakupdate') == -1 && this.perList.indexOf('skill:speakdelete') == -1){
          this.isshow = false
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
    formVal(row,column){
        return row.state === true ? 'true' : 'false'
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
    handleEdit(index, row) {
      this.editVisible = true;
      this.currentItem = {
        id:row.id,
        speak: row.speak,
        state: row.state
      };
    },
    handleDel(index, row) {
      let delParams = {
        functionId:this.functionId,
        speakId:row.id
      }
      delParams.sign = deleteParams(delParams)
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          speakDel(delParams).then(res=>{
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
        }).catch((err) => {
          console.log(err);
        });
    },
    openFun(addList){
      this.$nextTick(() => {
        if(this.$refs[addList]){
          this.$refs[addList].resetFields();
        }
      })
    },
    closeFun(currentItem){
      this.$nextTick(() => {
        if(this.$refs[currentItem]){
          this.$refs[currentItem].clearValidate();
        }
      })
    },
    editHandleClose() {
      this.editVisible = false;
    },
    addHandleClose(){
      this.addVisible = false
    },
    editHandleConfirm(currentItem) {
      let updParams = {
        speakId:this.currentItem.id,
        content:this.currentItem.speak
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          speakUpd(updParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'编辑成功',
                    type:"success",
                    duration:2000
                });
                this.getList()
                this.editBtnLoading = false
                this.editVisible = false
            }else{
              this.editBtnLoading = false
                if(res.data.code != undefined){
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
            }
          }).catch(err => {
            this.editBtnLoading = false
          })
        } else {
          return false;
        }
      });
    },
    handleAdd(){
      this.addVisible = true
    },
    addHandleConfirm(addList) {
      let addParams = {
        id:this.functionId,
        speak:this.addList.speak
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          speakAdd(addParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'添加成功',
                    type:"success",
                    duration:2000
                });
                this.getList();
                this.addVisible = false
                this.addBtnLoading = false
            }else{
                if(res.data.code != undefined){
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
                this.addBtnLoading = false
            }
          }).catch(err => {
            this.addBtnLoading = false
          })
        } else {
          return false;
        }
      });
    },
    release(){
      this.relBtnLoading = true
      speakPub().then(res=>{
        this.relBtnLoading = false
        if(res.data.code == 200){
              this.$message({
                message:'发布成功',
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
      }).catch(err => {
            this.relBtnLoading = false
          })
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
        appId:this.appId,
        functionId:this.functionId,
        pgstr:this.currentPage,
        pcstr:this.pageSize
      }
      params.sign = deleteParams(params)
      speakList(params).then(res => {
          this.listLoading = false
          this.skillDetail.functionName = res.data.lasfControlFunction.functionName
          this.list = res.data.lasfControlSpeakPage.data;
          this.totalCount = res.data.lasfControlSpeakPage.total
          this.totalClass = res.data.lasfControlSpeakPage.data.length
      }).catch(()=>{
          this.listLoading = false
      });
      let lastParams = {
          id:this.appId
      }
      lastParams.sign = deleteParams(lastParams)
      skillInfo(lastParams).then(res => {
          this.skillDetail.appName = res.data.data.appName
      });
    }
  }
};
</script>

<style scoped>
.d_t{
    display: inline-block; 
    float: left; 
    font-size:12px;
}
.d_title{
    font-size: 16px;
}
</style>
