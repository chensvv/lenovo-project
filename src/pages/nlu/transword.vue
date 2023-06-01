<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/nlu/word/list'}">nlu数据管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline height50 width130" label-width="90px" size="mini">
      <div class="form-input height50">
        <el-form-item label="表达式" prop="expression">
            <el-select v-model="searchItem.expression" placeholder="--">
                <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
      </div>
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
        <el-button size="mini" @click="handleAdd()" v-has="'nlu:transWord:add'">添加</el-button>
        <el-button size="mini" @click="handleLabel()" v-has="'nlu:transWord:genTranWord'" :loading="labelLoading">生成词转换文件</el-button>
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
              label="表达式"
              prop="expression"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.expression" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.expression }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.expression }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="值"
              prop="value"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.value" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.value }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.value }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="创建时间"
              prop="createTime"
              align="center"
              :formatter="formTime"
              min-width="130">
          </el-table-column>
          <el-table-column label="操作" min-width="130" align="center"  v-if="isshow">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'nlu:transWord:update'">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'nlu:transWord:delete'">删除</el-button>
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
        <el-form-item label="表达式" prop="expression">
          <el-input type="text" v-model.trim="currentItem.expression" auto-complete="off"></el-input>
          <!-- <el-select v-model="currentItem.type" placeholder="--">
              <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input type="text" v-model.trim="currentItem.value" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="表达式" prop="expression">
          <el-input type="text" v-model.trim="addList.expression" auto-complete="off"></el-input>
          <!-- <el-select v-model="addList.type" placeholder="--">
              <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input type="text" v-model.trim="addList.value" auto-complete="off"></el-input>
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
import {deleteParams} from '@/utils/deleteParams.js'
import {nluTranswordList, nluTranswordAdd, nluTranswordUpdate, nluTranswordDelete, nluTranswordTypes, nluTranswordGen} from '@/config/api'
export default {
  data() {
    return {
      list: [],
      perList:[],
      typeList:[],
      totalClass:'8',
      currentItem: {//编辑数据组
        id:"",
        value:"",
        expression:""
      },
      addList: {//添加数据组
        value:"",
        expression:""
      },
      searchItem:{//搜索数据组
        expression:""
      },
      addRules:{
        expression:[{ required: true, message: '请输入表达式', trigger: 'change' }],
        value:[{ required: true, message: '请输入值', trigger: 'change' }],
        
      },
      editRules:{
        expression:[{ required: true, message: '请输入表达式', trigger: 'blur' }], 
        value:[{ required: true, message: '请输入值', trigger: 'blur' }], 
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
      labelLoading:false,
      isshow:true
    };
  },
  created() {
        let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
        perArr.map(t=>{
            this.perList.push(Object.values(t).join())
        })
        this.getList();
        this.getTypeList()
    },
    mounted(){
        if(this.perList.indexOf('nlu:transWord:update') == -1 && this.perList.indexOf('nlu:transWord:delete') == -1){
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
        expression: row.expression,
        value:row.value
      };
    },
    getTypeList(){
      let p = {}
      nluTranswordTypes(p).then(res=>{
        if(res.data.code == 200){
          this.typeList = res.data.data
        }
      })
    },
    handleLabel(){
      if(this.searchItem.expression ==""){
        this.$message({
            message:'请选择表达式',
            type:"error",
            duration:1500
        });
      }else{
        this.labelLoading = true
        let labelParams = {
          expression:this.searchItem.expression
        }
        nluTranswordGen(labelParams).then(res=>{
            this.labelLoading = false
          if(res.data.code == 200){
              this.$message({
                  message:'已生成',
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
        }).catch(err=>{
            this.labelLoading = false
        })
      }
      
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
          nluTranswordDelete(delParams).then(res=>{
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
        expression:this.currentItem.expression,
        value:this.currentItem.value
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          nluTranswordUpdate(updParams).then(res=>{
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
        value:this.addList.value,
        expression:this.addList.expression,
        sign:this.$md5(`appName=${this.addList.appName}`)
      }
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          nluTranswordAdd(addParams).then(res=>{
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
    closeFile() {
        this.$refs.upload.clearFiles()
        this.uploadVisible = false;
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        expression:this.searchItem.expression
      }
      params.sign = deleteParams(params)
      nluTranswordList(params).then(res => {
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
