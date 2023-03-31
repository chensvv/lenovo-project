<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/qa/list'}">规则定义</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" size="mini" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130">
      <div class="form-input height50">
        <el-form-item label="日期" prop="pickerVal" class="date-form">
            <el-date-picker
                v-model="searchItem.pickerVal"
                type="daterange"
                align="center"
                size="mini"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                :default-value="new Date(new Date().setMonth(new Date().getMonth() - 1))">
            </el-date-picker>
        </el-form-item>
      </div>
      
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
        <el-button size="mini" @click="handleAdd()" v-has="'goods:add'">添加</el-button>
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
              label="时长"
              prop="duration"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.duration" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.duration }}毫秒
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.duration }}毫秒
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="单价"
              prop="price"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.price" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.price }}元
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.price }}元
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="折扣"
              prop="discount"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.discount" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.discount }}折
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.discount }}折
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="描述"
              prop="description"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.description" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.description }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.description }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="添加时间"
              prop="createTime"
              align="center"
              :formatter="formTime"
              width="120">
          </el-table-column>
          <el-table-column
              label="更新时间"
              prop="updateTime"
              align="center"
              :formatter="formTime2"
              width="130">
          </el-table-column>
          <el-table-column label="操作" align="center" width="130" v-if="isshow">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'goods:update'">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'goods:delete'">删除</el-button>
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
      <el-form :label-position="'right'" label-width="120px" :rules="editRules" :model="currentItem" ref="currentItem">
        <el-form-item label="时长" prop="duration">
          <el-input type="text" v-model="currentItem.duration" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input type="text" v-model="currentItem.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="折扣" prop="discount">
          <el-input type="text" v-model="currentItem.discount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="text" v-model="currentItem.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'right'" label-width="100px" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="时长" prop="duration">
          <el-input type="text" v-model="addList.duration" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input type="text" v-model="addList.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="折扣" prop="discount">
          <el-input type="text" v-model="addList.discount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="text" v-model="addList.description" auto-complete="off"></el-input>
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
import {goodsList, goodsUpdate, goodsDel, goodsAdd} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
  data() {
    return {
      list: [],
      perList:[],
      totalClass:'8',
      currentItem: {//编辑数据组
        id:"",
        duration:"",
        price:"",
        discount:"",
        description:""
      },
      addList: {//添加数据组
        duration:"",
        price:"",
        discount:"",
        description:""
      },
      searchItem:{//搜索数据组
        pickerVal:[]
      },
      addRules:{
        duration:[{ required: true, message: '请输入时长', trigger: 'change' }],
        price:[{ required: true, message: '请输入单价', trigger: 'change' }],
        discount:[{ required: true, message: '请输入折扣', trigger: 'change' }],
        description:[{ required: true, message: '请输入描述', trigger: 'change' }]
      },
      editRules:{
        duration:[{ required: true, message: '请输入时长', trigger: 'blur' }],
        price:[{ required: true, message: '请输入单价', trigger: 'blur' }], 
        discount:[{ required: true, message: '请输入折扣', trigger: 'blur' }], 
        description:[{ required: true, message: '请输入描述', trigger: 'blur' }] 
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
      if(this.perList.indexOf('goods:delete') == -1 && this.perList.indexOf('goods:update') == -1){
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
    handleEdit(index, row) {
      this.editVisible = true;
      this.currentItem = {
        id:row.id,
        duration:row.duration,
        price:row.price,
        discount:row.discount,
        description:row.description
      };
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
          goodsDel(delParams).then(res=>{
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
        duration:this.currentItem.duration,
        price:this.currentItem.price,
        discount:this.currentItem.discount,
        description:this.currentItem.description
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          // console.log(this.currentItem)
          this.editBtnLoading = true
          goodsUpdate(updParams).then(res=>{
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
        duration:this.addList.duration,
        price:this.addList.price,
        discount:this.addList.discount,
        description:this.addList.description
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          goodsAdd(addParams).then(res=>{
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
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        startStr:this.searchItem.pickerVal[0],
        endStr:this.searchItem.pickerVal[1],
      }
      params.sign = deleteParams(params)
      goodsList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data
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
