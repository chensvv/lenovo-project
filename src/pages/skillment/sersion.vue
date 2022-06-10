<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/outer/list'}">技能管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/skill/applist'}">应用列表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/lasf-kv/skill/detail',query:{functionId:this.functionId, appId:this.appId}}">应用详情</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    
    <el-form :inline="true" class="demo-form-inline height50 width130" size="mini">
        <div class="d_t">
            <span class="d_title">{{skillDetail.appName}}  >></span><span>{{skillDetail.functionName}}</span>
        </div>
        <div class="form-btn">
            <el-button size="mini" @click="handleAdd()" v-has="'skill:versionadd'">添加</el-button>
            <router-link :to="{ path: '/lasf-kv/skill/detail/speak',query:{functionId:this.functionId, appId:this.appId}}">
                <el-button size="mini">说法列表</el-button>
            </router-link>
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
                label="说明"
                prop="versionIllustration"
                align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.versionIllustration" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.versionIllustration }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.versionIllustration }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="启用"
                prop="state"
                align="center"
                :formatter="formVal"
                >
            </el-table-column>
            <el-table-column
                label="调用次数"
                prop="versionCallCount"
                align="center" 
                >
            </el-table-column>
            <el-table-column
                label="更新时间"
                prop="displayUpdateTime"
                align="center"
                min-width="120">
            </el-table-column>
            <el-table-column label="操作" align="center" width="200" v-if="isshow">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    v-has="'skill:versionupdate'">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDel(scope.$index, scope.row)"
                    v-has="'skill:versiondelete'">删除</el-button>
                    <el-button
                    size="mini"
                    @click="handleStr(scope.$index, scope.row)"
                    v-has="'skill:versiondetail'">策略</el-button>
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
        <el-form :label-position="'right'" label-width="80px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
            <el-form-item label="说明" prop="version">
                <el-input type="text" v-model.trim="currentItem.version" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="答案" prop="answer" class="ser_t">
                <el-input type="textarea" v-model.trim="currentItem.answer" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editHandleClose">取 消</el-button>
            <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog title="添加答案" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="0px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item prop="version">
                    <el-input type="text" v-model.trim="addList.version" placeholder="在此处添加说明" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="answer"  class="ser_text">
                    <el-input type="textarea" v-model.trim="addList.answer" placeholder="在此处添加答案" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="发布策略" :visible.sync="strVisible" width="40%" top="10vh" :before-close="strHandleClose">
            <el-form :label-position="'right'" label-width="80px" size="small" ref="strList">
                <el-form-item label="软件版本" class="ver_text1">
                    <el-input type="text" v-model.trim="strList.minVer" placeholder="最小版本" auto-complete="off"></el-input> - 
                    <el-input type="text" v-model.trim="strList.maxVer" placeholder="最大版本" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="型号"  class="ver_text2">
                    <el-input type="text" v-model.trim="strList.serCon" placeholder="contains" auto-complete="off"></el-input>
                    <el-input type="text" v-model.trim="strList.serNot" placeholder="not" auto-complete="off"></el-input>
                    <span style="font-size:12px; display:block;">多个字段请用英文 , 隔开</span>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="strHandleClose">取 消</el-button>
                <el-button type="primary" @click="strHandleConfirm" :loading="strBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {skillInfo, versionList, versionAdd, versionUpd, versionDel, versionStr} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
  data() {
    return {
      list: [],
      perList:[],
      appId:"",
      functionId:"",
      totalClass:"",
      skillDetail:{
        appName:"",
        functionName:""
      },
      currentItem: {//编辑数据组
        id:"",
        version: "",
        state:""
      },
      addList: {//添加数据组
        version:"",
        answer:""
      },
      strList:{
        minVer:"",
        maxVer:"",
        serCon:"",
        serNot:""
      },
      addRules:{
        version: [{ required: true, message: '请输入答案说明', trigger: 'change' }],
        answer: [{ required: true, message: '请输入答案', trigger: 'change' }],
      },
      editRules:{
        version: [{ required: true, message: '请输入答案说明', trigger: 'blur' }],
        answer: [{ required: true, message: '请输入答案', trigger: 'blur' }],
      },
      editVisible: false,
      addVisible: false,
      strVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      addBtnLoading:false,
      editBtnLoading:false,
      relBtnLoading:false,
      strBtnLoading:false,
      listLoading:true,
      isshow:true
    };
  },
  created() {
      this.appId = this.$route.query.appId
      this.functionId = this.$route.query.functionId
      let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
      perArr.map(t=>{
          this.perList.push(Object.values(t).join())
      })
      this.getList();
    },
    mounted(){
        if(this.perList.indexOf('skill:versionupdate') == -1 && this.perList.indexOf('skill:versiondelete') == -1 && this.perList.indexOf('skill:versiondetail') == -1){
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
    formVal(row,column){
        return row.state === true ? 'true' : 'false'
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
      // console.log(row)
      this.editVisible = true;
      this.currentItem = {
        id:row.id,
        version: row.versionIllustration,
        answer: row.versionAnswer
      };
    },
    handleStr(index, row){
      // console.log(row)
        this.strVisible = true
        this.strList = {
          id:row.id,
          minVer:row.versionMinCode,
          maxVer:row.versionMaxCode,
          serCon:row.containsModel,
          serNot:row.notModel
        }
    },
    handleDel(index, row) {
      let delParams = {
        versionId:row.id
      }
      delParams.sign = deleteParams(delParams)
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          versionDel(delParams).then(res=>{
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
        versionId:this.currentItem.id,
        versionAnswer:this.currentItem.answer,
        versionIllustration:this.currentItem.version
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          versionUpd(updParams).then(res=>{
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
        versionAnswer:this.addList.answer,
        versionIllustration:this.addList.version,
        functionId:this.functionId
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          versionAdd(addParams).then(res=>{
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
          }).catch(err => {
            this.addBtnLoading = false
          })
        } else {
          return false;
        }
      });
    },
    strHandleClose(){
        this.strVisible = false
    },
    strHandleConfirm(){
        let strParams = {
          versionId:this.strList.id,
          minVersion:this.strList.minVer,
          maxVersion:this.strList.maxVer,
          containsModel:this.strList.serCon,
          notModel:this.strList.serNot
        }
        strParams.sign = deleteParams(strParams)
        this.strBtnLoading = true
        versionStr(strParams).then(res=>{
          this.strBtnLoading = false
          if(res.data.code == 200){
                this.$message({
                    message:'发布成功',
                    type:"success",
                    duration:1000
                });
                this.getList();
                this.strVisible = false
                
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                });
            }
        }).catch(err => {
            this.strBtnLoading = false
          })
    },
    getList() {
      this.listLoading = true
      let params = {
        functionId:this.functionId,
        appId:this.appId,
        pgstr:this.currentPage,
        pcstr:this.pageSize
      }
      params.sign = deleteParams(params)
      versionList(params).then(res => {
          this.listLoading = false
          this.skillDetail.functionName = res.data.lasfControlFunction.functionName
          this.list = res.data.lasfControlVersionPage.data;
          this.totalCount = res.data.lasfControlVersionPage.total
          this.totalClass = res.data.lasfControlVersionPage.data.length
      }).catch(()=>{
          this.listLoading = false
      });
      let lastParams = {
          id:this.appId
      }
      lastParams.sign = deleteParams(lastParams)
      skillInfo(lastParams).then(res => {
          this.skillDetail.appName = res.data.data.appName
      });
    }
  }
};
</script>

<style scoped>
.d_t{
    display: inline-block; 
    float: left; 
    font-size:12px;
}
.d_title{
    font-size: 16px;
}
</style>
