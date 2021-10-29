<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规则定义</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/showmode/conf'}">资源发布</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="table-box">
      <el-table
          :data="list"
          :class="this.totalClass <= '7' ? 'limitWidth' :''"
          style="width: 100%"
          v-loading="listLoading">
          <el-table-column type="index" align="left" >
          </el-table-column>
          <el-table-column
              label="版本号"
              prop="version"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.version" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.version }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.version }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="发布时间"
              prop="createTime"
              align="center"
              :formatter="formTime"
              min-width="120">
          </el-table-column>
          <el-table-column label="灰度" align="center"  v-if="isshow">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'history:updateGray'">编辑</el-button>
              </template>
          </el-table-column>
          <el-table-column label="是否灰度" prop="isGray" align="center" min-width="80" :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <span>{{scope.row.isGray == '0' ? '不灰度' : '灰度'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="130" v-if="issueshow">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  @click="handleInfo(scope.$index, scope.row)"
                  v-has="'history:details'">详情</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'history:delete'">删除</el-button>
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
        <el-form-item label="版本号">
          <el-input type="text" v-model.trim="currentItem.version" readonly auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新灰度内容" prop="gray">
          <el-select v-model="currentItem.gray" multiple placeholder="请选择">
                <el-option
                v-for="item in grayList"
                :key="item.grayId"
                :label="item.name"
                :value="item.grayId">
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="infoVisible" width="70%" :before-close="infoHandleClose">
       <el-table
          :data="infoList"
          :class="this.totalCount <= 5 ? 'limitWidth' :''"
          style="width: 100%"
          height="400"
          v-loading="infoListLoading">
          <el-table-column type="index" align="left" >
          </el-table-column>
          <el-table-column
              label="渠道"
              prop="channelStr"
              align="left" 
              
              :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="资源图片"
            align="left" 
            >
            <template slot-scope="scope">
                <img :src="scope.row.phoneImg" class="thum" />
            </template>
            </el-table-column>
            <el-table-column
              label="资源说明"
              prop="description"
              align="left" 
              
              :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
              label="名称"
              prop="name"
              align="left" 
              
              :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
              label="类型"
              prop="typeStr"
              align="left" 
              
              :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="VIP" prop="vip" align="left"  :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <span>{{scope.row.vip == '0' ? '否' : '是'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付费" prop="paid" align="left"  :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <span>{{scope.row.paid == '0' ? '否' : '是'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="机型"
            align="left" 
            
            width="180">
            <template slot-scope="scope">
                <el-select v-model="scope.row.modelConfigList" multiple disabled placeholder="请选择">
                    <el-option
                    v-for="item in phoneList"
                    :key="item.id"
                    :label="item.context"
                    :value="item.id">
                    </el-option>
                </el-select>
            </template>
            </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="infoHandleClose">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {historyList, historyDetails, configList, grayList, grayUpd, historyDel} from '@/config/api'
export default {
  data() {
    return {
      list: [],
      perList:[],
      infoList:[],
      phoneList:[],
      grayList:[],
      totalClass:'',
      currentItem: {//编辑数据组
        id:"",
        gray:"",
        version:''
      },
      editRules:{
        
      },
      editVisible: false,
      infoVisible:false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      editBtnLoading:false,
      listLoading:true,
      infoListLoading:true,
      isshow:true,
      issueshow:true
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
      if(this.perList.indexOf('history:updateGray') == -1){
          this.isshow = false
      }
      if(this.perList.indexOf('history:details') == -1){
          this.issueshow = false
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
        this.getGrayList()
      this.editVisible = true;
      this.currentItem = {
        id:row.id,
        version: row.version,
        gray:JSON.parse("[" + row.grayId + "]")
      };
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
    infoHandleClose(){
      this.infoList = []
      this.infoVisible = false
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
          historyDel(delParams).then(res=>{
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
        }).catch((err) => {
          console.log(err);
        });
    },
    editHandleConfirm(currentItem) {
      let updParams = {
        id:this.currentItem.id,
        grayId:this.currentItem.gray.join()
      }
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          grayUpd(updParams).then(res=>{
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
    handleInfo(index,row){
      this.getPhoneTypeList()
      
      let addParams = {
        resources:row.resources
      }
      this.infoListLoading =true
        historyDetails(addParams).then(res=>{
        if(res.data.code == 200){
            this.infoVisible = true
            this.infoListLoading = false
            this.infoList = res.data.data
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:"error",
                duration:1000
            });
        }
        }).catch(err => {
        
        })
    },
    getList() {
      this.listLoading = true
      let listParams = {

      }
      historyList(listParams).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data;
          this.totalCount = res.data.count
          this.totalClass = res.data.data.length
        }
      }).catch(()=>{
        this.listLoading = false
      })
    },
    getPhoneTypeList(){
        let configParams = {
          parentCode:3
      }
      configList(configParams).then(res=>{
          this.phoneList = res.data.data
      })
    },
    getGrayList(){
        let grayParams = {
          pgstr:this.pageSize,
          pcstr:this.currentPage,
        }
      grayList(grayParams).then(res=>{
        this.grayList = res.data.data
      })
    }
  }
};
</script>

<style scoped>
</style>
