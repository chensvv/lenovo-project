<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/app/list'}">应用搜索</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline height50 width130" label-width="90px" size="mini">
      <div class="form-input height50">
        <el-form-item label="应用名称" prop="appName">
        <el-input v-model.trim="searchItem.appName" clearable></el-input>
      </el-form-item>
      </div>
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
        <el-button size="mini" @click="handleAdd()" v-has="'app:appadd'">添加</el-button>
        <el-button size="mini" icon="el-icon-upload" @click="importExcel()" v-has="'app:excel'">导入Excel文件</el-button>
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
              label="应用名称"
              prop="appName"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.appName" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.appName }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.appName }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="创建时间"
              prop="createTime"
              align="center"
              :formatter="formTime2"
              min-width="130">
          </el-table-column>
          <el-table-column
              label="更新时间"
              prop="updateTime"
              align="center"
              :formatter="formTime"
              min-width="130">
          </el-table-column>
          <el-table-column label="操作" min-width="130" align="center"  v-if="isshow">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'app:appupdate'">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'app:appdel'">删除</el-button>
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

    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
      <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
        <el-form-item label="应用名称" prop="appName">
          <el-input type="text" v-model.trim="currentItem.appName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="应用名称" prop="appName">
          <el-input type="text" v-model.trim="addList.appName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addHandleClose">取 消</el-button>
        <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="上传文件" :visible.sync="uploadVisible" width="40%" top="10vh" class="eldialog" :before-close="closeFile">
      <el-form class="eldialogForm">
        <el-form-item label >
          <el-upload
            class="upload-demo"
            drag
            :before-upload="beforeUpload"
            :http-request="uploadFile"
            :on-exceed="handleExceed2"
            :limit="1"
            multiple
            ref="upload"
            action
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传Excel文件，且每次只能上传一个文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFile()">取 消</el-button>
        <el-button type="primary" @click="postFile()" :loading="fileBtnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {deleteParams} from '@/utils/deleteParams.js'
import {appNameList, appNameAdd, appNameUpd, appNameDel, appNameUpFile, qaFile} from '@/config/api'
export default {
  data() {
    return {
      list: [],
      perList:[],
      totalClass:'8',
      currentItem: {//编辑数据组
        id:"",
        appName:""
      },
      addList: {//添加数据组
        appName:""
      },
      searchItem:{//搜索数据组
        appName:""
      },
      addRules:{
        appName:[{ required: true, message: '请输入应用名称', trigger: 'change' }],
        
      },
      editRules:{
        appName:[{ required: true, message: '请输入应用名称', trigger: 'blur' }], 
      },
      editVisible: false,
      addVisible: false,
      uploadVisible: false,
      fileBtnLoading: false,
      file: [],//文件上传
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
        if(this.perList.indexOf('app:appupdate') == -1 && this.perList.indexOf('app:appdel') == -1){
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
      var timer = row.updateTime
      var date = new Date(timer)
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())
    },
    formTime2(row, column){
      var timer = row.createTime
      var date = new Date(timer)
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())
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
    handleEdit(index, row) {
      this.editVisible = true;
      this.currentItem = {
        id:row.id,
        appName: row.appName,
      };
    },
    handleDel(index, row) {
      let delParams = {
        id:row.id,
        sign:this.$md5(`id=${row.id}`)
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          appNameDel(delParams).then(res=>{
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
        }).catch(err => {
          console.log(err)
        })
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
        appName:this.currentItem.appName
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          appNameUpd(updParams).then(res=>{
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
        appName:this.addList.appName,
        sign:this.$md5(`appName=${this.addList.appName}`)
      }
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          appNameAdd(addParams).then(res=>{
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
    importExcel(){
        this.uploadVisible = true
    },
    //上传excel表格
    beforeUpload(file) {
      // const isText = file.type === "application/vnd.ms-excel";
      // const isTextComputer =
      //   file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      // if (!isText && !isTextComputer) {
      //   this.$message.error("上传文件必须是Excel格式!");
      // }
      // return isText || isTextComputer;
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      // const isText = file.type === "application/vnd.ms-excel";
      // const isTextComputer = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      // if (!isText && !isTextComputer) {
      //   this.$message.error("上传文件必须是Excel格式!");
      // }
      if (!extension && !extension2) {
          this.$message.warning('上传文件必须是Excel格式!')
          return false
      }
      return extension || extension2;
    },
    // 上传文件个数超过定义的数量
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
    },
    uploadFile(item) {
      this.file = item.file;
    },
    postFile() {
      if(this.file == ''){
        this.$message.warning('请选择要上传的文件！')
        return false
      }else{
        const fileObj = this.file;
        var fileData = new FormData();
        fileData.append("ex", fileObj);
        this.fileBtnLoading = true;
        appNameUpFile(fileData).then(res => {
                  this.fileBtnLoading = false
              if(res.data.code == 200){
                  this.$message({
                      message:res.data.msg,
                      type:"success",
                      duration:1500
                  });
                  this.$refs.upload.clearFiles()
                  this.uploadVisible = false
                  this.getList()
              }else{
                  this.$message({
                      message:res.data.errorMessage,
                      type:"error",
                      duration:1500
                  });
              }

        }).catch(err => {
          this.fileBtnLoading = false
        })
      }
      
    },
    closeFile() {
        this.$refs.upload.clearFiles()
        this.uploadVisible = false;
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        appname:this.searchItem.appName
      }
      params.sign = deleteParams(params)
      appNameList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data;
          this.totalCount = res.data.count
          this.totalClass = res.data.data.length
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:'error',
                duration:1000
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
