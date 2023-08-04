<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini"  @submit.native.prevent>
      <div class="form-input height70">
        <el-form-item label="敏感词" prop="word">
            <el-input v-model.trim="searchItem.word" clearable @keydown.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        </el-form-item>
      </div>
      <div class="form-btn">
          <el-button size="mini" @click="handleAdd('addList')" v-has="'sen:add'">添加</el-button>
          <el-button size="mini" @click="handlePub" :loading="PubBtnLoading" v-has="'sen:pub'">发布</el-button>
          <el-button size="mini" icon="el-icon-upload" @click="importExcel()" v-has="'sen:excel'">导入数据</el-button>
          <el-button size="mini" icon="el-icon-download" @click="exportFile()" v-has="'source:export'" :loading="downloading">导出数据</el-button>
      </div >
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
                    label="敏感词"
                    prop="word"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.word" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.word }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.word }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="例外"
                    prop="except"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.except" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.except }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.except }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="更新/入库时间"
                    prop="it"
                    align="center"
                    :formatter="formTime"
                    width="130">
                </el-table-column>
                <el-table-column label="操作" align="center" width="180" v-if="isshow">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleExcept(scope.$index, scope.row)"
                        v-has="'sen:except'">例外</el-button>
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'sen:update'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'sen:del'">删除</el-button>
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
                <li><button :disabled="currentPage == getpageNum(totalCount)? true: false" @click="turnToPage(getpageNum(totalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
            </ul>
        </div>
    </div>

        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
          <el-form :label-position="'right'" label-width="80px" size="small" :rules="editRules" :model="currentItem" ref="currentItem" @submit.native.prevent>
              <el-form-item label="敏感词" prop="word">
                  <el-input type="textarea" v-model.trim="currentItem.word" auto-complete="off"></el-input>
                  <span style="font-size:12px;">编辑时不能带有换行</span>
              </el-form-item>
          </el-form>
          
          <span slot="footer" class="dialog-footer">
              <el-button @click="editHandleClose">取 消</el-button>
              <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="例外" :visible.sync="exceptVisible" width="40%" top="10vh" :before-close="exceptHandleClose" @close="closeFun('exceptItem')">
          <el-form :label-position="'right'" label-width="80px" size="small" :rules="exceptRules" :model="exceptItem" ref="exceptItem" @submit.native.prevent>
              <el-form-item label="敏感词" prop="except">
                  <el-input type="textarea" v-model.trim="exceptItem.except" auto-complete="off"></el-input>
                  <span style="font-size:12px;">多个请用逗号隔开</span>
              </el-form-item>
          </el-form>
          
          <span slot="footer" class="dialog-footer">
              <el-button @click="exceptHandleClose">取 消</el-button>
              <el-button type="primary" @click="exceptHandleConfirm('exceptItem')" :loading="exceptBtnLoading">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="80px" size="small" :rules="addRules" :model="addList" ref="addList" @submit.native.prevent>
                <el-form-item label="敏感词" prop="word">
                    <el-input type="textarea" v-model="addList.word" placeholder="可以一次增加多个，用换行分隔。" auto-complete="off"></el-input>
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
import {senList, senAddUpd, senDel, senPub, senExcel, downExcel, senExcept} from '@/config/api'
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
        word: "",
      },
      addList: {//添加数据组
        word:""
      },
      searchItem:{//搜索数据组
        word:""
      },
      exceptItem:{
        id:"",
        except:""
      },
      addRules:{
        word:[{ required: true, message: '请输入敏感词名称', trigger: 'change' }]
      },
      editRules:{
        word:[{ required: true, message: '请输入敏感词名称', trigger: 'blur' }]
      },
      exceptRules:{
        except:[{ required: true, message: '请输入敏感词名称', trigger: 'blur' }]
      },
      editVisible: false,
      addVisible: false,
      exceptVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      addBtnLoading:false,
      editBtnLoading:false,
      exceptBtnLoading:false,
      PubBtnLoading:false,
      listLoading:true,
      uploadVisible: false,
      fileBtnLoading: false,
      downloading:false,
      file: [],//文件上传
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
        if(this.perList.indexOf('sen:update') == -1 && this.perList.indexOf('sen:del') == -1 && this.perList.indexOf('sen:except') == -1){
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
          checkTime(date.getMonth())+':'+
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
      this.listLoading = true
      // console.log(`当前页: ${val}`);
      this.getList();
    },
    handleExcept(index, row){
      this.exceptVisible = true
      this.exceptItem = {
        id:row.id,
        except:row.except
      }
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.editVisible = true;
      this.currentItem = {
        id:row.id,
        word: row.word,
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
          senDel(delParams).then(res=>{
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
    exceptHandleClose() {
      this.exceptVisible = false;
      
    },
    addHandleClose(){
      this.addVisible = false
    },
    editHandleConfirm(currentItem) {
      let updParams = {
        id:this.currentItem.id,
        word:this.currentItem.word
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          senAddUpd(updParams).then(res=>{
                this.editBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'编辑成功',
                    type:"success",
                    duration:2000
                });
                this.getList()
                this.editVisible = false
            }else{
                if(res.data.code != undefined){
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
            } 
          }).catch(err=>{
            this.editBtnLoading = false
          })
        } else {
          return false;
        }
      });
    },
    exceptHandleConfirm(exceptItem) {
      let exceptParams = {
        id:this.exceptItem.id,
        except:this.exceptItem.except
      }
      exceptParams.sign = deleteParams(exceptParams)
      this.$refs[exceptItem].validate((valid) => {
        if (valid) {
          this.exceptBtnLoading = true
          senExcept(exceptParams).then(res=>{
                this.exceptBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'编辑成功',
                    type:"success",
                    duration:2000
                });
                this.getList()
                this.exceptVisible = false
            }else{
                if(res.data.code != undefined){
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
            } 
          }).catch(err=>{
            this.exceptBtnLoading = false
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
        word:this.addList.word
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          senAddUpd(addParams).then(res=>{
                  this.addBtnLoading = false
            if(res.data.code == 200){
                  this.$message({
                    message:'添加成功',
                    type:"success",
                    duration:2000
                  });
                  this.getList();
                  this.addVisible = false
              }else{
                  if(res.data.code != undefined){
                      this.$message({
                          message:res.data.code+'：'+res.data.msg,
                          type:'error',
                          duration:2000
                      });
                  }
                  
              } 
          }).catch(err=>{
            this.addBtnLoading = false
          })
        } else {
          return false;
        }
      });
    },
    handlePub(){
      this.PubBtnLoading = true
      senPub().then(res=>{
        this.PubBtnLoading = false
        if(res.data.code == 200){
              this.$message({
                message:'发布成功',
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
      }).catch(err=>{
        this.PubBtnLoading = false
      })
    },
    exportFile(){
      this.downloading = true
        downExcel().then(res=>{
          this.downloading = false
          let blobUrl = new Blob([res.data])
          let a = document.createElement('a');
          let url = window.URL.createObjectURL(blobUrl);
          let filename = 'sen.xlsx'
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
        })
    },
    importExcel(){
        this.uploadVisible = true
    },
    beforeUpload(file) {
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
            fileData.append("file", fileObj);
            this.fileBtnLoading = true;
            senExcel(fileData).then(res => {
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
                    if(res.data.code != undefined){
                        this.$message({
                            message:res.data.code+'：'+res.data.msg,
                            type:'error',
                            duration:2000
                        });
                    }
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
        pcstr:this.pageSize,
        pgstr:this.currentPage,
        q:this.searchItem.word
      }
      params.sign = deleteParams(params)
      senList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data;
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
