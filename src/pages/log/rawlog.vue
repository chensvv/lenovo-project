<template>
  <div class="table rawlog">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :inline="true"
      ref="searchItem"
      :model="searchItem"
      class="demo-form-inline search_box"
      size="mini"
    >
      <el-form-item label="UID" prop="uid">
        <el-input v-model.trim="searchItem.uid" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户端类型" prop="dtp">
        <el-input v-model.trim="searchItem.dtp" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户端ip" prop="uip">
        <el-input v-model.trim="searchItem.uip" clearable></el-input>
      </el-form-item>
      <el-form-item label="起始时间" prop="refreshTime">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="searchItem.refreshTime"
          :picker-options="pickerOptions"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="putTime">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="searchItem.putTime"
          :picker-options="pickerOptions"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="sub-btn">
        <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="list" :class="this.totalClass <= '5' ? 'limitWidth' :''" style="width: 100%" v-loading="listLoading">
        <el-table-column type="index" align="left" ></el-table-column>
        <el-table-column label="UID" prop="uid" align="left"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="客户端设备类型" prop="dtp" align="left"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="客户端IP" prop="uip" align="left"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="客户端ID" prop="did" align="left"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="客户端版本" prop="ver" align="left"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="插入时间" prop="it" align="left"  :formatter="formTime" min-width="120"></el-table-column>
        <el-table-column label="原始日志" align="center"  v-if="isshow">
          <template slot-scope="scope">
            <span slot @click="handleInfo(scope.$index, scope.row)" class="cur-info" v-has="'asr:rawview'">
              <i class="el-icon-search icon"></i>
            </span>
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
    <el-dialog title="详情" :visible.sync="editVisible" width="300" :before-close="handleClose">
        {{infoList}}
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="edithandleConfirm()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {rawList,rawView} from '@/config/api'
import countTo from 'vue-count-to';
export default {
  components: {countTo },
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
      infoList:[],
      totalClass:'',
      searchItem:{//搜索数据组
        uid:"",
        dtp:"",
        uip:"",
        refreshTime:"",
        putTime:""
      },
      columns: [
      ],
      options: {
        stripe: false, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: false, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        border:false     //是否显示纵向边框
      },
      operates: {
        width: 120,
        show: false,
        list: [
        ]
      }, // 列操作按钮
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      editVisible:false,
      listLoading:true,
      isshow:true,
      // bigId:1
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
      if(this.perList.indexOf('asr:rawview') == -1){
          this.isshow = false
      }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1
      this.getList()
    },
    formTime(row, column) {
      var timer = row.it;
      var date = new Date(timer);
      return (
        date.getFullYear() +
        "-" +
        checkTime(date.getMonth() + 1) +
        "-" +
        checkTime(date.getDate()) +
        " " +
        checkTime(date.getHours()) +
        ":" +
        checkTime(date.getMinutes())
      );
    },
    onSubmit(){
      this.seaBtnLoading = true
      this.currentPage = 1
      this.getList()
      this.seaBtnLoading = false
    },
    handleClose() {
      this.editVisible = false;
    },
    edithandleConfirm(){
      this.editVisible = false;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`);
      // this.bigId = this.comId.id
      this.getList();
    },
    handleInfo(index,row){
      let params = {
        id:row.id
      }
      rawView(params).then(res=>{
        this.infoList = res
        this.editVisible = true;
      })
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        startStr:this.searchItem.refreshTime,
        endStr:this.searchItem.putTime, 
        uid:this.searchItem.uid,
        dtp:this.searchItem.dtp,
        uip:this.searchItem.uip,
        // id:this.bigId
      }
      rawList(params).then(res=>{
        this.listLoading = false
        this.list = res.data.data.data
        // this.comId = this.list.pop()
        this.totalCount = res.data.data.total
        // this.endVal = res.data.count
        this.totalClass = res.data.data.data.length
      })
    }
  }
};
</script>

<style scoped>
</style>
