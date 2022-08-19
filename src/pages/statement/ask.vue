<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/joke/speakList'}">说法配置</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
      <div class="form-input height50">
        <el-form-item label="speak" prop="speak">
          <el-input v-model.trim="searchItem.speak" clearable></el-input>
        </el-form-item>
      </div>
      
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
        <el-button size="mini" @click="buildAIML()" :loading="AIMLBtnLoading" v-has="'ask:pub'">生成AIML</el-button>
        <el-button size="mini" @click="handleAdd()" v-has="'ask:save'">添加</el-button>
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
              label="speak"
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
              label="answer"
              prop="answer"
              align="center">
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
              label="excel"
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
              label="创建时间"
              prop="createTime"
              align="center"
              :formatter="formTime2"
              min-wdth="140">
          </el-table-column>
          <el-table-column
              label="更新时间"
              prop="updateTime"
              align="center"
              :formatter="formTime"
              min-width="120">
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="130" v-if="btnshow">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'ask:update'">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'ask:del'">删除</el-button>
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

    <el-dialog excel="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
      <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
        <el-form-item label="speak" prop="speak">
          <el-input type="text" v-model.trim="currentItem.speak" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="answer" prop="answer">
          <el-input type="text" v-model.trim="currentItem.answer" auto-complete="off"></el-input>
          <span>answer示例：ALL/SCH/1/</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog excel="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="speak" prop="speak">
          <el-input type="text" v-model.trim="addList.speak" auto-complete="off" placeholder="示例：关闭微信（关闭|退出|杀掉）<appname>"></el-input>
        </el-form-item>
        <el-form-item label="answer" prop="answer">
          <el-input type="text" v-model.trim="addList.answer" auto-complete="off" placeholder="answer示例：ALL/SCH/1/"></el-input>
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
import {askList, askDel, askUpd, askAdd, askPub} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
  data() {
    return {
      list: [],
      perList:[],
      totalClass:'8',
      currentItem: {//编辑数据组
        id:"",
        speak: "",
        answer:""
      },
      addList: {//添加数据组
        speak: "",
        answer:""
      },
      searchItem:{//搜索数据组
        speak:"",
      },
      addRules:{
        speak:[{ required: true, message: '请输入要求名称', trigger: 'change' }],
        answer:[
          { required: true, message: '请输入要求answer', trigger: 'change' },
          { pattern: /^[A-Z0-9/]+$/, message:'请输入正确格式的answer', trigger: 'blur'}
        ],
        
      },
      editRules:{
        speak:[{ required: true, message: '请输入要求名称', trigger: 'blur' }],
        answer:[
          { required: true, message: '请输入要求answer', trigger: 'blur' },
          { pattern: /^[A-Z0-9/]+$/, message:'请输入正确格式的answer', trigger: 'blur'}
        ]
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
      AIMLBtnLoading:false,
      listLoading:true,
      isshow:true,
      btnshow:true
    }
  },
  created() {
    let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
    perArr.map(t=>{
      this.perList.push(Object.values(t).join())
    })
    this.getList()
  },
  mounted(){
    if(this.perList.indexOf('user:data') == -1){
      this.isshow = false
    }
    if(this.perList.indexOf('ask:update') == -1 && this.perList.indexOf('ask:del') == -1){
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
      this.$refs[formName].resetFields()
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
      this.pageSize = val
      this.currentPage = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
      this.getList()
    },
    handleEdit(index, row) {
      this.editVisible = true
      this.currentItem = {
        id:row.id,
        speak: row.speak,
        answer:row.answer,
        excel:row.excel
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
          askDel(delParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'删除成功',
                    type:"success",
                    duration:1000
                })
                this.getList()
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                })
            }
          })
        }).catch(err => {
          console.log(err)
        })
    },
    openFun(addList){
      this.$nextTick(() => {
        if(this.$refs[addList]){
          this.$refs[addList].resetFields()
        }
      })
    },
    closeFun(currentItem){
      this.$nextTick(() => {
        if(this.$refs[currentItem]){
          this.$refs[currentItem].clearValidate()
        }
      })
    },
    editHandleClose() {
      this.editVisible = false
      
    },
    addHandleClose(){
      this.addVisible = false
    },
    editHandleConfirm(currentItem) {
      let updParams = {
        id:this.currentItem.id,
        speak:this.currentItem.speak,
        answer:this.currentItem.answer
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          askUpd(updParams).then(res=>{
                this.editBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'编辑成功',
                    type:"success",
                    duration:1000
                })
                this.getList()
                this.editVisible = false
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                })
            }
          }).catch(err => {
            this.editBtnLoading = false
          })
        } else {
          return false
        }
      })
    },
    handleAdd(){
      this.addVisible = true
    },
    addHandleConfirm(addList) {
      let addParams = {
        speak:this.addList.speak,
        answer:this.addList.answer
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          askAdd(addParams).then(res=>{
                this.addBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'添加成功',
                    type:"success",
                    duration:1000
                })
                this.getList()
                this.addVisible = false
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                })
            }
          }).catch(err => {
            this.addBtnLoading = false
          })
        } else {
          return false
        }
      })
    },
    buildAIML(){
      this.AIMLBtnLoading = true
      askPub().then(res=>{
        this.AIMLBtnLoading = false
        if(res.data.code == 200){
            this.$message({
                message:res.data.msg,
                type:"success",
                duration:1000
            })
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:"error",
                duration:1000
            })
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
        ask:this.searchItem.speak,
      }
      params.sign = deleteParams(params)
      askList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data
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
}
</script>

<style scoped>
</style>
