<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规则定义</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
      <el-form-item label="机型名称" prop="name">
        <el-input v-model="searchItem.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="机型" prop="inc">
        <el-input v-model="searchItem.inc" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button @click="resetForm('searchItem')">重置</el-button>
      </el-form-item>
      <el-button class="success" size="mini"  @click="handleAdd()" v-has="'grey:funadd'">添加</el-button>
      <router-link :to="{ path: '/rule/devlist'}">
          <el-button class="success" size="mini" v-has="'grey:devlist'">机型列表</el-button>
      </router-link>
      
    </el-form>
    <div class="table-box">
      <el-table
          :data="list"
          style="width: 100%"
          v-loading="listLoading">
          <el-table-column type="index" align="center">
          </el-table-column>
          <el-table-column
              label="功能名称"
              prop="name"
              align="center"
              :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
              label="功能代码"
              prop="code"
              align="center"
              :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
              label="更新/入库时间"
              prop="it"
              align="center"
              :formatter="formTime"
              min-width="120">
          </el-table-column>
          <el-table-column label="操作" align="center" v-if="isshow">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'grey:funupdate'">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'grey:fundel'">删除</el-button>
                <el-button
                  size="mini"
                  @click="handleOpt(scope.$index, scope.row)"
                  v-has="'grey:fun'">配置</el-button>
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
        <el-form-item label="功能名称" prop="name">
          <el-input type="textarea" v-model="currentItem.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能代码" prop="code">
          <el-input type="textarea" v-model="currentItem.code" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'left'" label-width="100px" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="功能名称" prop="name">
          <el-input type="textarea" v-model="addList.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能代码" prop="code">
          <el-input type="textarea" v-model="addList.code" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addHandleClose">取 消</el-button>
        <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="配置" :visible.sync="optVisible" width="300" :before-close="optHandleClose" @open="optShow()">
      <el-form :label-position="'left'" label-width="100px">
        <el-form-item label="功能名称">
          <el-input type="text" v-model="optList.name" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="功能代码">
          <el-input type="text" v-model="optList.code" auto-complete="off" readonly></el-input>
          <el-table :show-header="false" :data="optList.pageDate" border ref="table" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column
              prop="name">
            </el-table-column>
            <el-table-column
              prop="code">
            </el-table-column>
          </el-table>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="optVisible = false">取 消</el-button>
        <el-button type="primary" @click="optHandleConfirm" :loading="optBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {greyList, greyAddUpd, greyDel, greyOpt, greyOptSave} from '@/config/api'
export default {
  data() {
    return {
      list: [],
      perList:[],
      currentItem: {//编辑数据组
        id:"",
        code: "",
        name: "",
      },
      addList: {//添加数据组
        code: "",
        name: "",
      },
      searchItem:{//搜索数据组
        inc:"",
        name:"",
      },
      optList:{
          code:"",
          name:"",
          pageDate:[]
      },
      multipleSelection:[],
      selectId:"",
      addRules:{
        name:[{ required: true, message: '请输入功能名称', trigger: 'change' }],
        code:[{ required: true, message: '请输入功能代码', trigger: 'change' }]  
      },
      editRules:{
        name:[{ required: true, message: '请输入功能名称', trigger: 'blur' }],
        code:[{ required: true, message: '请输入功能代码', trigger: 'blur' }]  
      },
      editVisible: false,
      addVisible: false,
      optVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      pageSizes:[10, 20, 30],
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      addBtnLoading:false,
      editBtnLoading:false,
      optBtnLoading:false,
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
      if(this.perList.indexOf('grey:funupdate') == -1 && this.perList.indexOf('grey:fundel') == -1 && this.perList.indexOf('grey:fun') == -1){
          this.isshow = false
      }
  },
  methods: {
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
      console.log(`当前页: ${val}`);
      this.getList();
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.editVisible = true;
      this.currentItem = {
        id:row.id,
        code: row.code,
        name: row.name,
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
          greyDel(delParams).then(res=>{
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
        c:this.currentItem.code
      }
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          greyAddUpd(updParams).then(res=>{
                this.editBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'编辑成功',
                    type:"success",
                    duration:1000
                });
                this.getList()
                this.editVisible = false
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
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
        c:this.addList.code
      }
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          greyAddUpd(addParams).then(res=>{
                this.addBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'添加成功',
                    type:"success",
                    duration:1000
                });
                this.getList()
                this.addVisible = false
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
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
    optShow(){
      this.$nextTick(() => {
        this.optList.pageDate.forEach(item => {
          if (item.check === 'checked') {
            this.$refs.table.toggleRowSelection(item, true)
          }
        })
      })
    },
    handleOpt(index,row){
    this.selectId = row.id
    let optId = {
      id:row.id
    }
    greyOpt(optId).then(res=>{
      this.optList.name = res.data.devName
      this.optList.code = res.data.devCode
      this.optList.pageDate = res.data.page.data
      this.optShow()
    })
    this.optVisible = true
    },
    handleSelectionChange(val) {
      val = val.map(item=>item.code)
      this.multipleSelection = val
    },
    optHandleClose(){
      this.$refs.table.clearSelection()
      this.optVisible = false
    },
    optHandleConfirm(){
      let optParams = {
        id:this.selectId,
        chk:this.multipleSelection
      }
      this.optBtnLoading = true
      greyOptSave(optParams).then(res=>{
            this.optBtnLoading = false
        if(res.data.code == 200){
            this.$message({
                message:'配置成功',
                type:"success",
                duration:1000
            });
            this.getList()
            this.optVisible = false
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:"error",
                duration:1000
            });
        }
      }).catch(err => {
            this.optBtnLoading = false
          })
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        n:this.searchItem.name,
        c:this.searchItem.code,
      }
      greyList(params).then(res => {
        this.listLoading = false
        this.list = res.data.data;
        this.totalCount = res.data.count
      });
    }
  }
};
</script>

<style scoped>
</style>
