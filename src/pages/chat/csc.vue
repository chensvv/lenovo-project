<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/csc/csc'}">闲聊数据</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
      <div class="form-input height50">
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="searchItem.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model.trim="searchItem.tel" clearable></el-input>
        </el-form-item>
        <el-form-item label="扩展" prop="exts">
          <el-input v-model.trim="searchItem.exts" clearable></el-input>
        </el-form-item>
      </div>
      
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
        <el-button size="mini" @click="handleAdd()" v-has="'csc:add'">添加</el-button>
      </div>
      
    </el-form>
    <div class="table-box">
      <el-table
            :data="list"
            stripe
            :class="this.totalClass <= '7' ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading">
            <el-table-column type="index" align="center" label="#">
            </el-table-column>
            <el-table-column
                label="名称"
                prop="name"
                align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.name" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.name }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="电话"
                prop="tels"
                align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.tels" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.tels }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.tels }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="扩展"
                prop="exts"
                align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.exts" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.exts }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.exts }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center"  v-if="isshow">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                     v-has="'csc:delete'"
                    @click="handleDel(scope.$index, scope.row)"
                    >删除</el-button>
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
    <el-dialog title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model.trim="addList.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input type="text" v-model.trim="addList.tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="扩展" prop="exts">
          <el-input type="text" v-model.trim="addList.exts" auto-complete="off"></el-input>
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
import {cscList, cscAdd, cscDel} from '@/config/api'
export default {
  data() {
    return {
      list: [],
      perList:[],
      totalClass:'',
      addList: {//添加数据组
        name:"",
        tel:"",
        exts:""
      },
      searchItem:{//搜索数据组
        name:"",
        tel:"",
        exts:""
      },
      addRules:{
          name:[{ required: true, message: '请输入名称', trigger: 'change' }],
          tel:[{ required: true, message: '请输入电话号码', trigger: 'change' }],
          exts:[{ required: true, message: '请输入扩展', trigger: 'change' }],
      },
      addVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      addBtnLoading:false,
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
    if(this.perList.indexOf('csc:delete') == -1){
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1
      this.getList();
    },
    onSubmit(){
      this.seaBtnLoading = true
      this.currentPage = 1
      this.getList();
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
    handleDel(index, row) {
      let delParams = {
        id:row.id
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          cscDel(delParams).then(res=>{
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
        }).catch(err => {
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
    addHandleClose(){
      this.addVisible = false
    },
    handleAdd(){
      this.addVisible = true
    },
    addHandleConfirm(addList) {
      let addParams = {
        name:this.addList.name,
        exts:this.addList.exts,
        tels:this.addList.tel
      }
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          cscAdd(addParams).then(res=>{
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
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        name:this.searchItem.name,
        exts:this.searchItem.exts,
        tel:this.searchItem.tel
      }
      cscList(params).then(res => {
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
};
</script>

<style scoped>
</style>
