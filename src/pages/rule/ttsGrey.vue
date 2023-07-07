<template>
  <div class="table height-105">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/qa/list'}">规则定义</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" size="mini" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130">
      <div class="form-input height70">
        <el-form-item label="机型名称" prop="name">
          <el-input v-model="searchItem.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="机型" prop="inc">
          <el-input v-model="searchItem.inc" clearable></el-input>
        </el-form-item>
      </div>
      
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="handleAdd()" v-has="'ttsgrey:add'">添加</el-button>
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
              label="机型名称"
              prop="name"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.name" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.name }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.name }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="机型代码"
              prop="code"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.code" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.code }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.code }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="更新/入库时间"
              prop="it"
              align="center"
              :formatter="formTime">
          </el-table-column>
          <el-table-column label="操作" align="center" width="130" v-if="isshow">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'ttsgrey:update'">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'ttsgrey:del'">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
      <div class="pagination-wrap" v-cloak>
          <ul class="pagination">
              <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
              <li v-if="currentPage == this.getpageNum(totalCount) && currentPage !=1 && currentPage - 2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
              <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
              <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
              <li v-if="currentPage != this.getpageNum(totalCount)" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
              <li v-if="currentPage+1 < 3 && currentPage != this.getpageNum(totalCount) && this.getpageNum(totalCount) >=3" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
              <li><button :disabled="currentPage == this.getpageNum(totalCount)? true: false" @click="turnToPage(this.getpageNum(totalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
          </ul>
      </div>
    </div>

    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
      <el-form :label-position="'right'" label-width="120px" :rules="editRules" :model="currentItem" ref="currentItem">
        <el-form-item label="机型名称" prop="name">
          <el-input type="textarea" v-model="currentItem.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机型UA" prop="code">
          <el-input type="textarea" v-model="currentItem.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="时效" prop="et">
          <el-input type="text" v-model="currentItem.et" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'right'" label-width="100px" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="机型名称" prop="name">
          <el-input type="textarea" v-model="addList.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机型UA" prop="code">
          <el-input type="textarea" v-model="addList.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="时效" prop="et">
          <el-input type="text" v-model="addList.et" auto-complete="off"></el-input>
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
import {ttsGreyList,devAddUpd, ttsGreyDel} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {getpageNum} from '@/utils/pagination.js'
export default {
  data() {
    return {
      getpageNum:getpageNum,
      list: [],
      perList:[],
      totalClass:'8',
      currentItem: {//编辑数据组
        id:"",
        code: "",
        name: "",
        et:""
      },
      addList: {//添加数据组
        name:"",
        code:"",
        et:""
      },
      searchItem:{//搜索数据组
        inc:"",
        name:"",
      },
      multipleSelection:[],
      selectId:"",
      addRules:{
        name:[{ required: true, message: '请输入机型名称', trigger: 'change' }],
        code:[{ required: true, message: '请输入机型UA', trigger: 'change' }],
        et:[{ required: true, message: '请输入过期天数', trigger: 'change' }]  
      },
      editRules:{
        name:[{ required: true, message: '请输入机型名称', trigger: 'blur' }],
        code:[{ required: true, message: '请输入机型UA', trigger: 'blur' }],
        et:[{ required: true, message: '请输入过期天数', trigger: 'blur' }]
      },
      editVisible: false,
      addVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      addBtnLoading:false,
      editBtnLoading:false,
      listLoading:true,
      isshow:true
    };
  },
  created() {
      let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
      perArr.map(t=>{
          this.perList.push(Object.values(t).join())
      })
      this.getList();
  },
  mounted(){
      if(this.perList.indexOf('grey:devupdate') == -1 && this.perList.indexOf('grey:devdel') == -1 && this.perList.indexOf('grey:dev') == -1){
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
    formTime(row, column){
      var timer = row.it
      var date = new Date(timer)
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())
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
    handleEdit(index, row) {
      this.editVisible = true;
      this.currentItem = {
        id:row.id,
        code: row.code,
        name: row.name,
        et:row.expireTime
      };
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
          ttsGreyDel(delParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'删除成功',
                    type:"success",
                    duration:1500
                });
                this.getList();
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1500
                });
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
        id:this.currentItem.id,
        n:this.currentItem.name,
        c:this.currentItem.code,
        et:this.currentItem.et
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          // console.log(this.currentItem)
          this.editBtnLoading = true
          devAddUpd(updParams).then(res=>{
            this.editBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'编辑成功',
                    type:"success",
                    duration:1500
                });
                this.getList()
                
                this.editVisible = false
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1500
                });
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
        n:this.addList.name,
        c:this.addList.code,
        et:this.addList.et
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          devAddUpd(addParams).then(res=>{
            this.addBtnLoading = false
            if(res.data.code == 200){
                  this.$message({
                      message:'添加成功',
                      type:"success",
                      duration:1500
                  });
                  this.getList()
                  this.addVisible = false
              }else{
                  
                  this.$message({
                      message:res.data.errorMessage,
                      type:"error",
                      duration:1500
                  });
              }
          }).catch(err => {
            this.addBtnLoading = false
          })
        } else {
          return false;
        }
      });
    },
    handleSelectionChange(val) {
      val = val.map(item=>item.code)
      this.multipleSelection = val;
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
        q:this.searchItem.name,
        ex:this.searchItem.inc
      }
      params.sign = deleteParams(params)
      ttsGreyList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data
          this.totalCount = res.data.count
          this.totalClass = res.data.data.length
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
