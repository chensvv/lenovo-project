<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="101px" class="demo-form-inline height50 width130" size="mini">
      <div class="form-input height50">
        <el-form-item label="问题" prop="question">
          <el-input v-model.trim="searchItem.question" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属excel文件" prop="excel">
          <el-input v-model.trim="searchItem.excel" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        </el-form-item>
      </div>
      
      <div class="form-btn">
        <el-button size="mini" @click="buildAIML()" :loading="AIMLBtnLoading" v-has="'item:pub'">生成AIML</el-button>
        <el-button size="mini" @click="handleAdd()" v-has="'item:save'">添加</el-button>
        <el-button size="mini" icon="el-icon-upload" @click="importExcel()" v-has="'item:excel'">导入Excel文件</el-button>
      </div>
      
    </el-form>
    <div class="table-box">
      <el-table
          :data="list"
          stripe
          style="width: 100%"
          :class="this.totalClass <= '7' ? 'limitWidth' :''"
          v-loading="listLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading">
          <el-table-column type="index" align="center" label="#">
          </el-table-column>
          <el-table-column
              label="问题"
              prop="question"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.question" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.question }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.question }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="答案"
              prop="answer"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.answer" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.answer }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.answer }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="所属excel文件"
              prop="excel"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.excel" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.excel }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.excel }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="状态"
              prop="status"
              align="center"
              v-if="isshow">
              <template slot-scope="scope">
                  <span  v-has="'user:data'">{{scope.row.status == 0 ? '已审批' : 
                            scope.row.status == 1 ? '未审批' : 
                            scope.row.status == 2 ? '申请拒绝' : ''}}</span>
              </template>
          </el-table-column>
          <el-table-column
              label="添加时间"
              prop="it"
              align="center"
              :formatter="formTime"
              width="130">
          </el-table-column>
          <el-table-column label="操作" align="center" width="130" v-if="btnshow">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'item:save'">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'item:del'">删除</el-button>
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
        <el-form-item label="问题" prop="question">
          <el-input type="textarea" v-model.trim="currentItem.question" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer">
          <el-input type="text" v-model.trim="currentItem.answer" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="问题" prop="question">
          <el-input type="text" v-model.trim="addList.question" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer">
          <el-input type="textarea" v-model.trim="addList.answer" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addHandleClose">取 消</el-button>
        <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="上传文件" :visible.sync="uploadVisible" width="200" class="eldialog" :before-close="closeFile">
      <el-form class="eldialogForm">
        <el-form-item label >
          <el-upload
            class="upload-demo"
            drag
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :limit="1"
            :http-request="uploadFile"
            multiple
            ref="upload"
            action
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <!-- <div class="el-upload__tip" slot="tip">1、只能上传Excel文件，且不超过500kb</div> -->
            <!-- <div class="el-upload__tip" slot="tip">2、由于需要生成AIML，所以excle文件请使用全英文</div> -->
            <div class="el-upload__tip" slot="tip">1、请编辑excel文件时，‘设置单元格格式’->‘文本’</div>
            <div class="el-upload__tip" slot="tip">2、第一列为‘问题’，第二列为'答案'</div>
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
import {itemList, itemSave, itemDel, itemUpFile, itemPub} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
  data() {
    return {
      list: [],
      perList:[],
      totalClass:'8',
      currentItem: {//编辑数据组
        id:"",
        answer: "",
        question: "",
      },
      addList: {//添加数据组
        question: "",
        answer: ""
      },
      searchItem:{//搜索数据组
        excel:"",
        question:"",
      },
      addRules:{
        question:[{ required: true, message: '请输入问题', trigger: 'change' }],
        answer:[{ required: true, message: '请输入答案', trigger: 'change' }]  
      },
      editRules:{
        question:[{ required: true, message: '请输入问题', trigger: 'blur' }],
        answer:[{ required: true, message: '请输入答案', trigger: 'blur' }]  
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
      fileBtnLoading:false,
      AIMLBtnLoading:false,
      listLoading:true,
      isshow:true,
      btnshow:true
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
    if(this.perList.indexOf('user:data') == -1){
      this.isshow = false
    }
    if(this.perList.indexOf('item:save') == -1 && this.perList.indexOf('item:del') == -1){
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
      var timer = row.it
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
      // console.log(index, row);
      this.editVisible = true;
      this.currentItem = {
        id:row.id,
        answer: row.answer,
        question: row.question,
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
          itemDel(delParams).then(res=>{
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
        q:this.currentItem.question,
        a:this.currentItem.answer
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          itemSave(updParams).then(res=>{
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
        q:this.addList.question,
        a:this.addList.answer
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          itemSave(addParams).then(res=>{
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
    customExcel(){
        this.uploadVisible2 = true
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
        itemUpFile(fileData).then(res => {
          this.fileBtnLoading = false
              if(res.data.code == 200){
                  this.$message({
                      message:res.data.msg,
                      type:"success",
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
    buildAIML(){
      this.AIMLBtnLoading = true
      itemPub().then(res=>{
        this.AIMLBtnLoading = false
        if(res.data.code == 200){
            this.$message({
                message:res.data.msg,
                type:"success",
                duration:1500
            });
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:"error",
                duration:1500
            });
        }
      }).catch(err => {
            this.AIMLBtnLoading = false
          })
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        q:this.searchItem.question,
        ex:this.searchItem.excel
      }
      params.sign = deleteParams(params)
      itemList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data;
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
