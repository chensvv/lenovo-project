<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/joke/speakList'}">说法配置</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline width130 height50" size="mini" style="padding-left:10px;">
      <div class="form-input height50">
        <el-form-item label="说法" prop="regular">
          <el-input v-model.trim="searchItem.regular" clearable></el-input>
        </el-form-item>
        <el-form-item label="起始时间" prop="startStr">
            <el-date-picker 
                type="date" 
                placeholder="选择日期" 
                v-model="searchItem.startStr" 
                :picker-options="pickerOptions"
                style="width: 100%;"
                value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endStr">
            <el-date-picker 
                type="date" 
                placeholder="选择日期" 
                v-model="searchItem.endStr"
                :picker-options="pickerOptions"
                style="width: 100%;"
                value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </div>
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
        <el-button size="mini" @click="handleAdd()" v-has="'ttsregular:add'">添加</el-button>
        <el-button size="mini" type="danger" @click="handleDelRedis()" v-has="'ttsregular:delete'">删除redis缓存</el-button>
      </div>
    </el-form>
    <div class="table-box">
      <el-table
          :data="list"
          stripe
          :class="this.totalClass <= '7' ? 'limitWidth' :''"
          style="width: 100%"
          v-loading="listLoading"
          @sort-change="sortChange">
          <el-table-column type="index" align="center" label="#">
          </el-table-column>
          <el-table-column
              label="匹配规则"
              prop="regular"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.regular" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.regular }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.regular }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="替换后内容"
              prop="replaceResult"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.replaceResult" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.replaceResult }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.replaceResult }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="是否生效"
              prop="isFlag"
              align="center"
              :formatter="formState">
          </el-table-column>
          <el-table-column
              label="创建时间"
              prop="createTime"
              align="center" 
              :formatter="formTime2"
              min-wdth="120"
              sortable="custom">
          </el-table-column>
          <el-table-column
              label="更新时间"
              prop="updateTime"
              align="center" 
              :formatter="formTime"
              min-width="120"
              sortable="custom">
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="130" v-if="isshow">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'ttsregular:add'">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'ttsregular:delete'">删除</el-button>
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
      <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
        <el-form-item label="匹配规则" prop="regular">
          <el-autocomplete
            class="inline-input"
            v-model="currentItem.regular"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            :debounce=0
            @select="handleSelect"
            ></el-autocomplete>
        </el-form-item>
        <el-form-item label="替换后内容" prop="replaceResult">
          <el-input type="text" v-model.trim="currentItem.replaceResult" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否生效" prop="isFlag">
            <el-checkbox-group v-model="currentItem.isFlag">
                <el-checkbox></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="匹配规则" prop="regular">
          <el-autocomplete
            class="inline-input"
            v-model="addList.regular"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            :debounce=0
            @select="handleSelect"
            ></el-autocomplete>
        </el-form-item>
        <el-form-item label="替换后内容" prop="replaceResult">
          <el-input type="text" v-model.trim="addList.replaceResult" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否生效" prop="isFlag">
            <el-checkbox-group v-model="addList.isFlag">
                <el-checkbox></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addHandleClose">取 消</el-button>
        <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="" :visible.sync="redisVisible" width="40%" top="35vh" @open="openFun('redisList')">
      <el-form :label-position="'right'" label-width="70px" size="small" :rules="redisRules" :model="redisList" ref="redisList">
        <el-form-item label="说法" prop="redisVal">
          <el-input v-model="redisList.redisVal" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="redisVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleRedis('redisList')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {ttsregularList, selRegular, ttsAddAndUpdate, delRegular, delText} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
  data() {
    return {
      pickerOptions: {
          disabledDate(time) {
              let times = Date.now() - 24 * 60 * 60 * 1000;
              return time.getTime() > times;
          },
      },
      list: [],
      perList:[],
      restaurants: [],
      totalClass:'',
      currentItem: {//编辑数据组
        id:"",
        regular: "",
        replaceResult:"",
        isFlag:null
      },
      addList: {//添加数据组
        regular: "",
        replaceResult:"",
        isFlag:false
      },
      redisList:{
        redisVal:''
      },
      searchItem:{//搜索数据组
        regular:"",
        startStr:"",
        endStr:""
      },
      addRules:{
        regular:[{ required: true, message: '请输入匹配规则', trigger: 'change' }],
        replaceResult:[{ required: true, message: '请输入替换后内容', trigger: 'change' }],
        isFlag:[{ required: true, message: '请选择是否生效', trigger: 'change' }],
      },
      editRules:{
        regular:[{ required: true, message: '请输入匹配规则', trigger: 'change' }],
        replaceResult:[{ required: true, message: '请输入替换后内容', trigger: 'change' }],
        isFlag:[{ required: true, message: '请选择是否生效', trigger: 'change' }],
      },
      redisRules:{
        redisVal:[{ required: true, message: '请输入要删除的说法', trigger: 'change' }],
      },
      column:{
          prop:'',
          order:''
      },
      editVisible: false,
      addVisible: false,
      redisVisible:false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      addBtnLoading:false,
      editBtnLoading:false,
      listLoading:true,
      AIMLBtnLoading:false,
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
        if(this.perList.indexOf('ttsregular:add') == -1 && this.perList.indexOf('ttsregular:delete') == -1){
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
    formState(row, column){
      return row.isFlag == 'true' ? "是" : "否"
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
        regular: row.regular,
        replaceResult:row.replaceResult,
        isFlag:row.isFlag == 'true' ? true : false
      };
    },
    handleDel(index, row) {
      let delParams = {
        id:row.id
      }
      delParams.sign = delParams
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          delRegular(delParams).then(res=>{
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
        regular:this.currentItem.regular,
        replaceResult:this.currentItem.replaceResult,
        isFlag:this.currentItem.isFlag
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          ttsAddAndUpdate(updParams).then(res=>{
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
        regular:this.addList.regular,
        replaceResult:this.addList.replaceResult,
        isFlag:this.addList.isFlag
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          ttsAddAndUpdate(addParams).then(res=>{
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
    handleDelRedis(){
      this.redisVisible = true
    },
    handleRedis(redisList){
      this.$refs[redisList].validate((valid) => {
        if (valid) {
          let delParams = {
            regular:this.redisList.redisVal
          }
          delParams.sign = deleteParams(delParams)
          this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            delText(delParams).then(res=>{
              if(res.data.code == 200){
                  this.$message({
                      message:'删除成功',
                      type:"success",
                      duration:1000
                  });
                  this.getList();
                  this.redisVisible = false
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
        }
      })
      
    },
    querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter(queryString) {
        return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
    },
    sortChange(column){
        this.column = {
            prop:column.prop,
            order:column.order
        }
        this.getList()
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        regular:this.searchItem.regular,
        startStr:this.searchItem.startStr,
        endStr:this.searchItem.endStr,
        fieldName: this.column.prop,
        order:this.column.order == 'ascending' ? '0' : ''
      }
      params.sign = deleteParams(params)
      ttsregularList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data
          this.totalCount = res.data.count
          this.totalClass = res.data.data.length
          this.restaurants = [];
          for (let item of this.list) {
              this.restaurants.push({"value": item.regular})
          }
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
