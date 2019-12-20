<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>闲聊数据</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
        <el-form-item label="敏感词" prop="word">
            <el-input v-model.trim="searchItem.word" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
            <el-button @click="resetForm('searchItem')">重置</el-button>
        </el-form-item>
        <el-button class="success" size="mini" @click="handleAdd('addList')" v-has="'sen:add'">添加</el-button>
        <el-button class="success" size="mini" @click="handlePub" :loading="PubBtnLoading" v-has="'sen:pub'">发布</el-button>
    </el-form>
    <div class="table-box">
         <el-table
                :data="list"
                style="width: 100%"
                v-loading="listLoading">
                <el-table-column type="index" align="center">
                </el-table-column>
                <el-table-column
                    label="敏感词"
                    prop="word"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="更新/入库时间"
                    prop="it"
                    align="center"
                    :formatter="formTime">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
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
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'left'" label-width="80px" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="敏感词" prop="word">
                    <el-input type="textarea" v-model.trim="addList.word" placeholder="可以一次增加多个，用换行分隔。" auto-complete="off"></el-input>
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
import {senList, senAddUpd, senDel, senPub} from '@/config/api'
export default {
  data() {
    return {
      list: [],
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
      columns: [
        {
          prop: "word",
          label: "敏感词",
          align: "center",
          hasSort:true
        },
        {
          prop:"it",
          label: "更新/入库时间",
          align: "center",
          hasSort:true,
          render: (h, params)=>{
            // console.log(params.row.createTime)
            var timer = params.row.it
            var date = new Date(timer)
            return h('span',
              date.getFullYear()+'-'+
              checkTime(date.getMonth()+1)+'-'+
              checkTime(date.getDate())+' '+
              checkTime(date.getHours())+':'+
              checkTime(date.getMinutes())+':'+
              checkTime(date.getSeconds()))
          }
        },
      ],
      options: {
        stripe: false, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: false, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        border:false     //是否显示纵向边框
      },
      operates: {
        width: 150,
        show: false,
        list: [
          {
            id: "1",
            label: "编辑",
            show: true,
            plain: true,
            disabled: false,
            method: (index, row) => {
              this.handleEdit(index, row);
            }
          },
          {
            id: "2",
            label: "删除",
            type:"danger",
            show: true,
            plain: false,
            disabled: false,
            method: (index, row) => {
              this.handleDel(index, row);
            }
          }
        ]
      }, // 列操作按钮
      addRules:{
        word:[{ required: true, message: '请输入敏感词名称', trigger: 'change' }]
      },
      editRules:{
        word:[{ required: true, message: '请输入敏感词名称', trigger: 'blur' }]
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
      PubBtnLoading:false,
      listLoading:true
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
          checkTime(date.getMonth())+':'+
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
        word: row.word,
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
          senDel(delParams).then(res=>{
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
        word:this.currentItem.word
      }
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          senAddUpd(updParams).then(res=>{
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
        word:this.addList.word
      }
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          senAddUpd(addParams).then(res=>{
                  this.addBtnLoading = false
            if(res.data.code == 200){
                  this.$message({
                    message:'添加成功',
                    type:"success",
                    duration:1000
                  });
                  this.getList();
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
    handlePub(){
      this.PubBtnLoading = true
      senPub().then(res=>{
        this.PubBtnLoading = false
        if(res.data.code == 200){
              this.$message({
                message:'发布成功',
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
    },
    getList() {
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        q:this.searchItem.word
      }
      senList(params).then(res => {
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
