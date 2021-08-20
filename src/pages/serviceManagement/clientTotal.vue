<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>服务管理</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
          <el-form-item>
              
              <el-button size="mini" @click="refresh()" v-if="refsh">定时刷新</el-button>
              <el-button size="mini" @click="refreshNo()" v-else>关闭刷新</el-button>
              <el-button class="success" size="mini" @click="handleAdd('addList')">上线</el-button>
          </el-form-item>
        </el-form>
        <div class="table-box">
            <el-table
                    :data="list"
                    :class="this.totalClass <= '5' ? 'limitWidth' :''"
                    style="width: 100%"
                    v-loading="listLoading">
                    <el-table-column type="index" align="left" >
                    </el-table-column>
                    <el-table-column
                        label="地址"
                        prop="name"
                        align="left"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                        label="值"
                        prop="value"
                        align="left"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column label="操作" align="center"  v-if="isshow">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDel(scope.$index, scope.row)"
                            v-has="'engine:offline'">下线</el-button>
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
        <el-dialog title="上线" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="ip地址" prop="name">
                <el-input type="text" v-model.trim="addList.name" auto-complete="off" placeholder="输入多个ip地址请用英文,隔开"></el-input>
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
import {clientTotal,engineOffline,engineOnline} from '@/config/api'
let echarts = require('echarts/lib/echarts')
export default {
  data() {
    return {
        list:[],
        data:[],
        perList:[],
        totalClass:'',
        addList: {//添加数据组
            name:""
        },
        addRules:{
            name:[{ required: true, message: '请输入ip地址', trigger: 'change' }],
        },
        currentPage: 1, //默认显示第几页
        pageSize: 10,   //默认每页条数
        totalCount:1,     // 总条数
        addBtnLoading:false,
        listLoading:true,
        addVisible:false,
        isshow:true,
        refsh:true,
        intervalId:null,
    };
  },
  created() {
    let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
    perArr.map(t=>{
      this.perList.push(Object.values(t).join())
    })
    this.pageList()
  },
  mounted(){
    if(this.perList.indexOf('engine:offline') == -1){
      this.isshow = false
    }
  },
  methods: {
    openFun(addList){
      this.$nextTick(() => {
        if(this.$refs[addList]){
          this.$refs[addList].resetFields();
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.listLoading = true
      // console.log(`当前页: ${val}`);
      this.getList()
    },
    refresh(){
        this.refsh = !this.refsh
        if (this.intervalId != null) {
        return;
    }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        // console.log("刷新" + new Date());
        this.pageList(); //加载数据函数
      }, 10000);
    },
    refreshNo(){
        this.refsh = !this.refsh
        this.clear()
    },
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
    addHandleClose(){
      this.addVisible = false
    },
    handleAdd(){
      this.addVisible = true
    },
    addHandleConfirm(addList) {
      let addParams = {
        serverAddr:this.addList.name
      }
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          engineOnline(addParams).then(res=>{
                this.addBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'上线成功',
                    type:"success",
                    duration:1000
                });
                this.pageList()
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
    handleDel(index, row) {
        let delParams = {
            serverAddr:row.name
        }
        engineOffline(delParams).then(res=>{
        if(res.data.code == 200){
                this.$message({
                    message:'已下线',
                    type:"success",
                    duration:1000
                });
                this.pageList();
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                });
            }
        })
    },
    pageList() {
      this.listLoading = true
    //   let params = {
    //     pgstr:this.currentPage,
    //     pcstr:this.pageSize,
    //   }
      clientTotal().then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.data = res.data.data
          this.getList()
        }
        
      }).catch(()=>{
        this.listLoading = false
      })
    },
    getList() {
        this.listLoading = false
        this.list = this.data.filter((item, index) =>
            index < this.currentPage * this.pageSize && index >= this.pageSize * (this.currentPage - 1)
        )
        this.totalCount = this.data.length
        this.totalClass = this.list.length
    },
  },
  destroyed() {
        this.clear();
    }
};
</script>

<style scoped>
.table {
    width: 100%;
    height: 100%;
}
.chart .table-box {
    width: 90%;
    height: 80% !important;
    margin: 0 auto;
}
.label-time{
    color: #606266;
    font-size: 12px;
    padding: 0 2px 0 0;
}
</style>
