<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规则定义</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
      <el-form-item label="问题" prop="question">
        <el-input v-model.trim="searchItem.question" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属excel文件" prop="excel">
        <el-input v-model.trim="searchItem.excel" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button @click="resetForm('searchItem')">重置</el-button>
      </el-form-item>
      <el-button class="success" size="mini" @click="buildAIML()" :loading="AIMLBtnLoading" v-has="'qa:pub'">生成AIML</el-button>
      <el-button class="success" size="mini" @click="handleAdd()" v-has="'qa:save'">添加</el-button>
      <el-button icon="el-icon-upload" class="success" size="mini" @click="importExcel()" v-has="'qa:excel'">导入Excel文件</el-button>
      <el-button icon="el-icon-upload" class="success" size="mini" @click="customExcel()" v-has="'qa:excel'">导入自定义Excel文件</el-button>
    </el-form>
    <div class="table-box">
      <el-table
          :data="list"
          style="width: 100%">
          <el-table-column type="index" align="center">
          </el-table-column>
          <el-table-column
              label="问题"
              prop="question"
              align="center">
          </el-table-column>
          <el-table-column
              label="答案"
              prop="answer"
              align="center">
          </el-table-column>
          <el-table-column
              label="所属excel文件"
              prop="excel"
              align="center">
          </el-table-column>
          <el-table-column
              label="更新时间"
              prop="it"
                align="center"
              :formatter="formTime">
          </el-table-column>
          <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'qa:update'">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'qa:del'">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>

    <el-dialog title="编辑" :visible.sync="editVisible" width="300" :before-close="editHandleClose" @close="closeFun('currentItem')">
      <el-form :label-position="'left'" label-width="120px" :rules="editRules" :model="currentItem" ref="currentItem">
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
    <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'left'" label-width="100px" :rules="addRules" :model="addList" ref="addList">
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
    <el-dialog title="上传文件" :visible.sync="uploadVisible" width="200" class="eldialog" :before-close="closeFile">
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
            <div class="el-upload__tip" slot="tip">1、只能上传Excel文件，且不超过500kb</div>
            <div class="el-upload__tip" slot="tip">2、由于需要生成AIML，所以excle文件请使用全英文</div>
            <div class="el-upload__tip" slot="tip">3、请编辑excel文件时，‘设置单元格格式’->‘文本’</div>
            <div class="el-upload__tip" slot="tip">4、第一列为‘问题’，第二列为'答案'</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFile()">取 消</el-button>
        <el-button type="primary" @click="postFile()" :loading="fileBtnLoading">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="上传文件" :visible.sync="uploadVisible2" width="200" class="eldialog" :before-close="closeFile2">
      <el-form class="eldialogForm">
        <el-form-item label >
          <el-upload
            class="upload-demo"
            drag
            :before-upload="beforeUpload2"
            :on-exceed="handleExceed2"
            :limit="1"
            :http-request="uploadFile2"
            multiple
            ref="upload2"
            action
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">1、只能上传Excel文件，且不超过500kb</div>
            <div class="el-upload__tip" slot="tip">2、由于需要生成AIML，所以excle文件请使用全英文</div>
            <div class="el-upload__tip" slot="tip">3、请编辑excel文件时，‘设置单元格格式’->‘文本’</div>
            <div class="el-upload__tip" slot="tip">4、第一列为‘问题’，第二列为'答案'</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFile2()">取 消</el-button>
        <el-button type="primary" @click="postFile2()" :loading="fileBtnLoading2">确 定</el-button>
      </div>
    </el-dialog>
    
      <el-dialog title="AIML" :visible.sync="AIMLVisible" width="300" class="eldialog">
      <el-form :label-position="'left'" label-width="50px">
        <el-form-item label="AIML:" class="aiml_text">
          <el-input type="textarea" v-model="aimlInfo" auto-complete="off" readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="AIMLBtn()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {qaList, qaSave, qaDel, qaUpFile, qaPub, qaFile} from '@/config/api'
export default {
  data() {
    return {
      aimlInfo:"",
      list: [],
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
      uploadVisible2: false,
      fileBtnLoading2: false,
      file: [],//文件上传
      file2: [],
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 30,   //默认每页条数
      pageSizes:[10, 20, 30],
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      addBtnLoading:false,
      editBtnLoading:false,
      fileBtnLoading:false,
      AIMLBtnLoading:false,
      AIMLVisible:false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    formTime(row, column){
      var timer = row.it
      var date = new Date(timer)
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())+':'+
        checkTime(date.getSeconds())
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
      console.log(`当前页: ${val}`);
      this.getList();
    },
    handleEdit(index, row) {
      console.log(index, row);
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
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          qaDel(delParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'删除成功',
                    type:"success",
                    duration:1000
                });
                this.getList();
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                });
            }
          })
        }).catch(() => {
          console.log("no");
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
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          qaSave(updParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'编辑成功',
                    type:"success",
                    duration:1000
                });
                this.getList()
                this.editBtnLoading = false
                this.editVisible = false
            }else{
                this.editBtnLoading = false
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                });
            }
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
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          qaSave(addParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'添加成功',
                    type:"success",
                    duration:1000
                });
                this.getList()
                this.addBtnLoading = false
                this.addVisible = false
            }else{
                this.addBtnLoading = false
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                });
            }
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
      const isText = file.type === "application/vnd.ms-excel";
      const isTextComputer =
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isText && !isTextComputer) {
        this.$message.error("上传文件必须是Excel格式!");
      }
      return isText || isTextComputer;
    },
    beforeUpload2(file) {
      const isText = file.type === "application/vnd.ms-excel";
      const isTextComputer =
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isText && !isTextComputer) {
        this.$message.error("上传文件必须是Excel格式!");
      }
      return isText || isTextComputer;
    },
    // 上传文件个数超过定义的数量
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
    },
    handleExceed2(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
    },
    uploadFile(item) {
      this.file = item.file;
    },
    uploadFile2(item) {
      this.file2 = item.file;
    },
    postFile() {
      const fileObj = this.file;
      var fileData = new FormData();
      fileData.append("ex", fileObj);
      this.fileBtnLoading = true;
      qaUpFile(fileData).then(res => {
            if(res.data.code == 200){
                this.$message({
                    message:'上传成功',
                    type:"success",
                    duration:1000
                });
                this.$refs.upload.clearFiles()
                this.fileBtnLoading = false
                this.uploadVisible = false
                this.getList()
            }else{
                this.fileBtnLoading = false
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                });
            }

      });
    },
    postFile2() {
      const fileObj = this.file2;
      var fileData = new FormData();
      fileData.append("ex", fileObj);
      this.fileBtnLoading2 = true;
      qaFile(fileData).then(res => {
            if(res.data.code == 200){
                this.$message({
                    message:'上传成功',
                    type:"success",
                    duration:1000
                });
                this.$refs.upload2.clearFiles()
                this.fileBtnLoading2 = false
                this.uploadVisible2 = false
                this.getList()
            }else{
                this.fileBtnLoading2 = false
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                });
            }

      });
    },
    closeFile() {
        this.$refs.upload.clearFiles()
        this.uploadVisible = false;
    },
    closeFile2() {
        this.$refs.upload2.clearFiles()
        this.uploadVisible2 = false;
    },
    buildAIML(){
      qaPub().then(res=>{
        this.aimlInfo = res.data.data.aiml
        if(res.data.code == 200){
            this.$message({
                message:res.data.msg,
                type:"success",
                duration:1000
            });
            this.AIMLBtnLoading = false
            setTimeout(()=>{
              this.AIMLVisible = true
            },1000)
        }else{
            this.AIMLBtnLoading = false
            this.$message({
                message:res.data.errorMessage,
                type:"error",
                duration:1000
            });
        }
      })
    },
    AIMLBtn(){
      this.AIMLVisible = false
    },
    getList() {
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        q:this.searchItem.question,
        ex:this.searchItem.excel
      }
      qaList(params).then(res => {
        this.list = res.data.data;
        this.totalCount = res.data.count
      });
    }
  }
};
</script>

<style scoped>
</style>
