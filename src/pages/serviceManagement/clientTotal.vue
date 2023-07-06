<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/audiokeeper/list'}">服务管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline height70 width130" size="mini" style="padding-left:10px;">
          <div class="form-btn">
              
              <el-button size="mini" @click="refresh()" v-if="refsh">定时刷新</el-button>
              <el-button size="mini" @click="refreshNo()" v-else>关闭刷新</el-button>
              <el-button size="mini" @click="handleAdd('addList')">上线</el-button>
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
                    label="地址"
                    prop="name"
                    align="center">
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
                    label="sce"
                    prop="sce"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.sce" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.sce }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.sce }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="80" v-if="isshow">
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
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="上线" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="ip地址" prop="name">
                  <el-input type="text" v-model.trim="addList.name" auto-complete="off" placeholder="输入多个ip地址请用英文,隔开"></el-input>
                </el-form-item>
                <el-form-item label="长短语音" prop="sce">
                    <el-select v-model="addList.sce" placeholder="--">
                        <el-option v-for="(item,index) in sceList" :key="index" :label="item.typeLabel" :value="item.typeVal"></el-option>
                    </el-select>
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
import {deleteParams} from '@/utils/deleteParams.js'
export default {
  data() {
    return {
        list:[],
        data:[],
        perList:[],
        totalClass:'8',
        addList: {//添加数据组
            name:"",
            sce:''
        },
        addRules:{
            name:[{ required: true, message: '请输入ip地址', trigger: 'change' }],
            sce:[{ required: true, message: '请选择语音类型', trigger: 'change' }],
        },
        sceList:[
            {typeLabel:"短语音",typeVal:"cmd"},
            {typeLabel:"长语音",typeVal:"long"}
        ],
        currentPage: 1, //默认显示第几页
        pageSize: 10,   //默认每页条数
        totalCount:1,     // 总条数
        showTitle:true,
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
        serverAddr:this.addList.name,
        sce:this.addList.sce
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          engineOnline(addParams).then(res=>{
                this.addBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'上线成功',
                    type:"success",
                    duration:1500
                });
                this.pageList()
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
    handleDel(index, row) {
        let delParams = {
            serverAddr:row.name,
            sce:row.sce
        }
        delParams.sign = deleteParams(delParams)
        engineOffline(delParams).then(res=>{
        if(res.data.code == 200){
                this.$message({
                    message:'已下线',
                    type:"success",
                    duration:1500
                });
                this.pageList();
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1500
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
