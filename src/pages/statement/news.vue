<template>
  <div class="table news height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/forum/list'}">说法配置</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline height50 width130" size="mini" style="padding-left:10px;">
      <div class="form-btn">
        <el-button size="mini" @click="handleAdd()" v-has="'news:add'">添加</el-button>
      </div>
    </el-form>
    <div class="table-box">
      <el-table
          :data="list"
          stripe
          :class="this.totalClass <= '5' ? 'limitWidth' :''"
          style="width: 100%"
          v-loading="listLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading">
          <el-table-column type="index" align="center" label="#">
          </el-table-column>
          <el-table-column
              label="标题"
              prop="newsTitle"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.newsTitle" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.newsTitle }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.newsTitle }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
            label="图片"
            align="left" 
            >
            <template slot-scope="scope">
                <img :src="scope.row.newsImg" class="thum" />
            </template>
            </el-table-column>
          <el-table-column
              label="描述"
              prop="newsDetails"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.newsDetails" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.newsDetails }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.newsDetails }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="路径"
              prop="detailsUrl"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.detailsUrl" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.detailsUrl }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.detailsUrl }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="创建时间"
              prop="createTime"
              align="center"
              :formatter="formTime"
              min-width="120">
          </el-table-column>
          <el-table-column
              label="更新时间"
              prop="updateTime"
              align="center"
              :formatter="formTime2"
              min-width="120">
          </el-table-column>
          <el-table-column label="操作" min-width="130" align="center"  v-if="isshow">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'news:add'">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'news:delete'">删除</el-button>
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
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="添加" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="标题" prop="newsTitle">
          <el-input type="text" v-model.trim="addList.newsTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" >
          <el-upload
            class="avatar-uploader"
            :before-upload="beforeAddUpload"
            :show-file-list="false"
            :http-request="uploadAddFile"
            :on-change="handleAddAvatarChange"
            ref="upload"
            action
          >
            <img v-if="addImageUrl" :src="addImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述" prop="newsDetails">
          <el-input type="text" v-model.trim="addList.newsDetails" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="detailsUrl">
          <el-input type="text" v-model.trim="addList.detailsUrl" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addHandleClose">取 消</el-button>
        <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" excel="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
      <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
        <el-form-item label="标题" prop="newsTitle">
          <el-input type="text" v-model.trim="currentItem.newsTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" >
          <el-upload
            class="avatar-uploader"
            :before-upload="beforeEditUpload"
            :show-file-list="false"
            :http-request="uploadEditFile"
            :on-change="handleEditAvatarChange"
            ref="upload"
            action
          >
            <img v-if="editImageUrl" :src="editImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述" prop="newsDetails">
          <el-input type="text" v-model.trim="currentItem.newsDetails" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="detailsUrl">
          <el-input type="text" v-model.trim="currentItem.detailsUrl" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import Cropper from "@/components/cropper";
import {newsList, newsAddUpd, newsDel} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
  data() {
    return {
      list: [],
      perList:[],
      totalClass:'6',
      addImageUrl:'',
      editImageUrl:'',
      totalCount:'',
      addList: {
        newsTitle:"",
        newsImg:[],
        newsDetails:"",
        detailsUrl:''
      },
      currentItem:{//搜索数据组
        id:'',
        newsTitle:"",
        newsImg:[],
        newsDetails:"",
        detailsUrl:''
      },
      addRules:{
        newsTitle:[{ required: true, message: '请输入标题', trigger: 'blur' }],
        newsDetails:[{ required: true, message: '请输入描述', trigger: 'blur' }],
        newsImg:[{ required: true, message: '请输入选择图片', trigger: 'blur' }],
        detailsUrl:[{ required: true, message: '请输入路径', trigger: 'blur' }],
      },
      editRules:{
        newsTitle:[{ required: true, message: '请输入标题', trigger: 'blur' }],
        newsDetails:[{ required: true, message: '请输入描述', trigger: 'blur' }],
        newsImg:[{ required: true, message: '请输入选择图片', trigger: 'blur' }],
        detailsUrl:[{ required: true, message: '请输入路径', trigger: 'blur' }],
      },
      addVisible: false,
      editVisible:false,
      editBtnLoading:false,
      addBtnLoading:false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 7,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      listLoading:true,
      isshow:true,
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
    if(this.perList.indexOf('news:add') == -1 && this.perList.indexOf('news:delete') == -1){
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
      var timer = row.createTime
      var date = new Date(timer)
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())
    },
    formTime2(row, column){
      var timer = row.updateTime
      var date = new Date(timer)
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList();
    },
    handleAddAvatarChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
        this.addImageUrl = URL.createObjectURL(file.raw);
    },
    handleEditAvatarChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
        this.editImageUrl = URL.createObjectURL(file.raw);
    },
    beforeAddUpload(file) {
        const extension = file.name.split('.')[1] === 'jpg' || 'jpeg' || 'png'
        if (!extension) {
            this.$message.warning('上传文件必须是图片格式!')
            return false
        }
        return extension;
    },
    beforeEditUpload(file) {
        const extension = file.name.split('.')[1] === 'jpg' || 'jpeg' || 'png'
        if (!extension) {
            this.$message.warning('上传文件必须是图片格式!')
            return false
        }
        return extension;
    },
    uploadAddFile(item) {
        this.addList.newsImg = item.file;
    },
    uploadEditFile(item) {
        this.currentItem.newsImg = item.file;
    },
    handleEdit(index, row) {
        this.editVisible = true
        this.editImageUrl = row.newsImg
        this.currentItem = {
            id:row.id,
            newsTitle:row.newsTitle,
            newsDetails:row.newsDetails,
            newsImg:row.newsImg,
            detailsUrl:row.detailsUrl
        }
    },
    editHandleConfirm(currentItem){
        if(this.currentItem.newsImg == ''){
            this.$message.warning('请选择要上传的文件！')
            return false
        }else{
            const fileObj = this.currentItem.newsImg;
            var fileData = new FormData();
            fileData.append('id',this.currentItem.id)
            fileData.append('newsTitle',this.currentItem.newsTitle)
            fileData.append("newsImg", fileObj)
            fileData.append('newsDetails',this.currentItem.newsDetails)
            fileData.append('detailsUrl',this.currentItem.detailsUrl)
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    newsAddUpd(fileData).then(res=>{
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
            })
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
          newsDel(delParams).then(res=>{
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
      this.addImageUrl = ''
    },
    closeFun(currentItem){
      this.$nextTick(() => {
        if(this.$refs[currentItem]){
          this.$refs[currentItem].clearValidate();
        }
      })
      this.editImageUrl = ''
    },
    editHandleClose(){
      this.editVisible = false
    },
    addHandleClose(){
      this.addVisible = false
    },
    handleAdd(){
      this.addVisible = true
    },
    addHandleConfirm(addList){
        if(this.addList.newsImg == ''){
            this.$message.warning('请选择要上传的文件！')
            return false
        }else{
            const fileObj = this.addList.newsImg;
            var fileData = new FormData();
            fileData.append('newsTitle',this.addList.newsTitle)
            fileData.append("newsImg", fileObj)
            fileData.append('newsDetails',this.addList.newsDetails)
            fileData.append('detailsUrl',this.addList.detailsUrl)
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    newsAddUpd(fileData).then(res=>{
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
            })
        }
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
      }
      params.sign = deleteParams(params)
      newsList(params).then(res => {
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
    },
  },
};
</script>

<style scoped>

</style>
