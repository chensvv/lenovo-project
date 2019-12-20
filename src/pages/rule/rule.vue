<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>规则定义</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
        <el-form-item label="规则名称" prop="ruleName">
            <el-input v-model.trim="searchItem.ruleName" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
            <el-button @click="resetForm('searchItem')">重置</el-button>
        </el-form-item>
        <el-button class="success" size="mini" @click="buildAIML()" :loading="AIMLBtnLoading" v-has="'rule:pub'">生成AIML</el-button>
        <el-button class="success" size="mini" @click="handleAdd()" v-has="'rule:save'">添加</el-button>
    </el-form>
    <div class="table-box">
        <el-table
            :data="list"
            style="width: 100%"
            v-loading="listLoading">
            <el-table-column type="index" align="center">
            </el-table-column>
            <el-table-column
                label="规则名称"
                prop="ruleName"
                align="center">
            </el-table-column>
            <el-table-column
                label="规则配置"
                prop="ruleResult"
                align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    v-has="'rule:update'">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDel(scope.$index, scope.row)"
                    v-has="'rule:delete'">删除</el-button>
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
        <el-form :label-position="'left'" label-width="80px" :rules="editRules" :model="currentItem" ref="currentItem">
            <el-form-item label="规则名称" prop="ruleName">
                <el-input type="text" v-model.trim="currentItem.ruleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="sogou" prop="sogou">
                <el-input type="text" v-model.trim="currentItem.sogou" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="duer" prop="duer">
                <el-input type="text" v-model.trim="currentItem.duer" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="wenwen" prop="wenwen">
                <el-input type="text" v-model.trim="currentItem.wenwen" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="naturali" prop="naturali">
                <el-input type="text" v-model.trim="currentItem.naturali" auto-complete="off"></el-input>
            </el-form-item>
            <div style="font-size:12px; padding-left:80px">
                0:代表不使用此引擎. <br>
                2~4:可以使用，但需要等待其他优先级更高的引擎，相同优先级的不需要等待.<br>
                7：	优先 ，可以直接使用，不必等待其他引擎
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editHandleClose">取 消</el-button>
            <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'left'" label-width="80px" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="规则名称" prop="ruleName">
                    <el-input type="text" v-model.trim="addList.ruleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="sogou" prop="sogou">
                    <el-input type="text" v-model.trim="addList.sogou" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="duer" prop="duer">
                    <el-input type="text" v-model.trim="addList.duer" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="wenwen" prop="wenwen">
                    <el-input type="text" v-model.trim="addList.wenwen" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="naturali" prop="naturali">
                    <el-input type="text" v-model.trim="addList.naturali" auto-complete="off"></el-input>
                </el-form-item>
                <div style="font-size:12px; padding-left:80px">
                    0:代表不使用此引擎. <br>
                    2~4:可以使用，但需要等待其他优先级更高的引擎，相同优先级的不需要等待.<br>
                    7：	优先 ，可以直接使用，不必等待其他引擎
                </div>
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
import {ruleList, ruleAdd, ruleUpd, ruleDel, rulePub} from '@/config/api'
export default {
  data() {
    return {
      list: [],
      currentItem: {//编辑数据组
        id:"",
        ruleName: "",
        sogou: "",
        duer:"",
        wenwen:"",
        naturali:""
      },
      addList: {//添加数据组
        ruleName: "",
        sogou: "",
        duer:"",
        wenwen:"",
        naturali:""
      },
      searchItem:{//搜索数据组
        ruleName:""
      },
      addRules:{
        ruleName:[{ required: true, message: '请输入规则名称', trigger: 'change' }],
        sogou:[{ required: true, message: '请输入sogou引擎优先级', trigger: 'change' }],
        duer:[{ required: true, message: '请输入duer引擎优先级', trigger: 'change' }],
        wenwen:[{ required: true, message: '请输入wenwen引擎优先级', trigger: 'change' }],
        naturali:[{ required: true, message: '请输入naturali引擎优先级', trigger: 'change' }]  
      },
      editRules:{
        ruleName:[{ required: true, message: '请输入规则名称', trigger: 'blur' }],
        sogou:[{ required: true, message: '请输入sogou引擎优先级', trigger: 'blur' }],
        duer:[{ required: true, message: '请输入duer引擎优先级', trigger: 'blur' }],
        wenwen:[{ required: true, message: '请输入wenwen引擎优先级', trigger: 'blur' }],
        naturali:[{ required: true, message: '请输入naturali引擎优先级', trigger: 'blur' }]  
      },
      editVisible: false,
      addVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      pageSizes:[10, 20, 30],
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      addBtnLoading:false,
      editBtnLoading:false,
      AIMLBtnLoading:false,
      listLoading:true
    };
  },
  created() {
    this.getList();
  },
  methods: {
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
      let updData = JSON.parse(row.ruleResult);
      this.currentItem = {
        id:row.id,
        ruleName: row.ruleName,
        sogou: updData.sogou,
        duer: updData.duer,
        wenwen: updData.wenwen,
        naturali: updData.naturali
      };
      this.editVisible = true
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
          ruleDel(delParams).then(res=>{
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
        ruleName:this.currentItem.ruleName,
        sogou:this.currentItem.sogou,
        wenwen:this.currentItem.wenwen,
        duer:this.currentItem.duer,
        naturali:this.currentItem.naturali
      }
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          ruleUpd(updParams).then(res=>{
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
        ruleName:this.addList.ruleName,
        sogou:this.addList.sogou,
        wenwen:this.addList.wenwen,
        duer:this.addList.duer,
        naturali:this.addList.naturali
      }
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          ruleAdd(addParams).then(res=>{
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
          })
        } else {
          return false;
        }
      });
    },
    buildAIML(){
      this.AIMLBtnLoading = true
      rulePub().then(res=>{
            this.AIMLBtnLoading = false
        if(res.data.code == 200){
            this.$message({
                message:res.data.msg,
                type:"success",
                duration:1000
            });
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:"error",
                duration:1000
            });
        }
      })
    },
    getList() {
      let params = {
        pgstr:this.pageSize,
        pcstr:this.currentPage,
        condition:this.searchItem.ruleName
      }
      ruleList(params).then(res => {
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
