<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/qa/list'}">规则定义</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
      <div class="form-input height50">
        <el-form-item label="规则名称" prop="speak">
            <el-input v-model.trim="searchItem.speak" clearable></el-input>
        </el-form-item>
      </div>
        <div class="form-btn">
            <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
            <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
            <el-button size="mini" @click="buildAIML()" :loading="AIMLBtnLoading" v-has="'rule:pub'">生成AIML</el-button>
            <el-button size="mini" @click="handleAdd()" v-has="'rule:save'">添加</el-button>
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
                label="规则名称"
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
                label="规则配置"
                prop="answer"
                align="left">
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
              label="状态"
              prop="otherstatus"
              align="center">
              <template slot-scope="scope">
                  <span>{{scope.row.otherstatus == 0 ? '未审批' : 
                            scope.row.otherstatus == 1 ? '审批通过' : 
                            scope.row.otherstatus == 2 ? '审批拒绝' : ''}}</span>
              </template>
          </el-table-column>
            <el-table-column
              label="添加时间"
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
            <el-table-column label="操作" align="center" min-width="130" v-if="btnshow">
                    <template slot-scope="scope">
                      <el-popconfirm
                      :hide-icon="true"
                      confirm-button-text='审批通过'
                      cancel-button-text='审批拒绝'
                      cancel-button-type="danger"
                      @confirm="handleAuditPass(scope.$index, scope.row)"
                      @cancel="handleAuditReject(scope.$index, scope.row)"
                    >
                      <el-button 
                      slot="reference" 
                      size="mini"
                      :disabled="scope.row.otherstatus == 0 ? false : true"
                      v-has="'activiti:pass'">{{scope.row.otherstatus == 0 ? '审批' : 
                                scope.row.otherstatus == 1 ? '审批通过' : 
                                scope.row.otherstatus == 2 ? '审批拒绝' : ''}}</el-button>
                    </el-popconfirm>
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
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="totalCount"
        ></el-pagination>
    </div>

        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
        <el-form :label-position="'right'" label-width="80px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
            <el-form-item label="规则名称" prop="speak">
                <el-input type="text" v-model.trim="currentItem.speak" auto-complete="off"></el-input>
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
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="80px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="规则名称" prop="speak">
                    <el-input type="text" v-model.trim="addList.speak" auto-complete="off"></el-input>
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
import {activitiPass} from '@/config/adminApi'
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
        sogou: "",
        duer:"",
        wenwen:"",
        naturali:""
      },
      addList: {//添加数据组
        speak: "",
        sogou: "",
        duer:"",
        wenwen:"",
        naturali:""
      },
      searchItem:{//搜索数据组
        speak:""
      },
      addRules:{
        speak:[{ required: true, message: '请输入规则名称', trigger: 'change' }],
        sogou:[{ required: true, message: '请输入sogou引擎优先级', trigger: 'change' }],
        duer:[{ required: true, message: '请输入duer引擎优先级', trigger: 'change' }],
        wenwen:[{ required: true, message: '请输入wenwen引擎优先级', trigger: 'change' }],
        naturali:[{ required: true, message: '请输入naturali引擎优先级', trigger: 'change' }]  
      },
      editRules:{
        speak:[{ required: true, message: '请输入规则名称', trigger: 'blur' }],
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
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      addBtnLoading:false,
      editBtnLoading:false,
      AIMLBtnLoading:false,
      listLoading:true,
      isshow:true,
      btnshow:true
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
    if(this.perList.indexOf('user:data') == -1){
      this.isshow = false
    }
    if(this.perList.indexOf('rule:update') == -1 && this.perList.indexOf('rule:delete') == -1){
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
    handleAuditPass(index, row){
      console.log(row)
      let auditParams = {
        id:row.otherid,
        status:1
      }
      activitiPass(auditParams).then(res=>{
        if(res.data.code == 200){
            this.$message({
                message:'审批已通过',
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
    },
    handleAuditReject(index, row){
      let auditParams = {
        id:row.otherid,
        status:2
      }
      activitiPass(auditParams).then(res=>{
        if(res.data.code == 200){
            this.$message({
                message:'审批已拒绝',
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
    },
    handleEdit(index, row) {
      let updData = JSON.parse(row.answer);
      this.currentItem = {
        id:row.id,
        speak: row.speak,
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
      delParams.sign = deleteParams(delParams)
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
        ruleName:this.currentItem.speak,
        sogou:this.currentItem.sogou,
        wenwen:this.currentItem.wenwen,
        duer:this.currentItem.duer,
        naturali:this.currentItem.naturali
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          ruleUpd(updParams).then(res=>{
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
        ruleName:this.addList.speak,
        sogou:this.addList.sogou,
        wenwen:this.addList.wenwen,
        duer:this.addList.duer,
        naturali:this.addList.naturali
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          ruleAdd(addParams).then(res=>{
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
    buildAIML(){
      this.AIMLBtnLoading = true
      rulePub().then(res=>{
            this.AIMLBtnLoading = false
        if(res.data.code == 200){
            this.$message({
                message:res.data.msg,
                type:"success",
                duration:1500
            });
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:"error",
                duration:1500
            });
        }
      }).catch(err => {
            this.AIMLBtnLoading = false
          })
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.pageSize,
        pcstr:this.currentPage,
        condition:this.searchItem.speak
      }
      params.sign = deleteParams(params)
      this.list = []
      ruleList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          res.data.data.map((item,index)=>{
            item.data.otherstatus = item.other.status
            item.data.otherid = item.other.id
            this.list.push(item.data)
          })
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
    }
  }
};
</script>

<style scoped>
</style>
