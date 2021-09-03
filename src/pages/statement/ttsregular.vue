<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>说法配置</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline width130 height50" size="mini" style="padding-left:10px;">
      <div class="form-btn">
        <el-button size="mini" @click="handleAdd()" v-has="'ttsregular:add'">添加</el-button>
      </div>
      
    </el-form>
    <div class="table-box">
      <el-table
          :data="list"
          :class="this.totalClass <= '7' ? 'limitWidth' :''"
          style="width: 100%"
          v-loading="listLoading">
          <el-table-column type="index" align="left" >
          </el-table-column>
          <el-table-column
              label="匹配规则"
              prop="regular"
              align="left" 
              >
          </el-table-column>
          <el-table-column
              label="替换后内容"
              prop="replaceResult"
              align="left" >
          </el-table-column>
          <el-table-column
              label="是否生效"
              prop="isFlag"
              align="left"
              :formatter="formState">
          </el-table-column>
          <el-table-column
              label="创建时间"
              prop="createTime"
              align="left" 
              :formatter="formTime2"
              min-wdth="140">
          </el-table-column>
          <el-table-column
              label="更新时间"
              prop="updateTime"
              align="left" 
              :formatter="formTime"
              min-width="120">
          </el-table-column>
          <el-table-column label="操作" align="center"  v-if="isshow">
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

    <el-dialog title="编辑" :visible.sync="editVisible" width="300" :before-close="editHandleClose" @close="closeFun('currentItem')">
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
    <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
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
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {ttsregularList, selRegular, ttsAddAndUpdate, delRegular} from '@/config/api'
export default {
  data() {
    return {
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
      searchItem:{//搜索数据组
        
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
      editVisible: false,
      addVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
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
    // loadAll(){
    //     this.list
    // },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
      }
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
