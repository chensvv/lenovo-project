<template>
  <div class="table height-105">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
      <div class="form-input height70">
        <el-form-item label="UID" prop="uid">
          <el-input v-model.trim="searchItem.uid" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户端类型" prop="dtp">
          <el-input v-model.trim="searchItem.dtp" clearable></el-input>
        </el-form-item>
        <el-form-item label="起始时间" prop="refreshTime">
            <el-date-picker 
            type="date" 
            placeholder="选择日期" 
            v-model="searchItem.refreshTime" 
            :picker-options="pickerOptions"
            style="width: 100%;"
            value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="putTime">
            <el-date-picker 
            type="date" 
            placeholder="选择日期" 
            v-model="searchItem.putTime" 
            :picker-options="pickerOptions"
            style="width: 100%;"
            value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </div>
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
      </div>
    </el-form>
    <div class="table-box">
      <el-table :data="list" stripe :class="this.totalClass <= '7' ? 'limitWidth' :''" style="width: 100%" v-loading="listLoading" @sort-change="sortChange">
        <el-table-column type="index" align="center" label="#"></el-table-column>
        <el-table-column label="客户端设备类型" prop="dtp" align="center" sortable="custom">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.dtp" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.dtp }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.dtp }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="客户端设备ID" prop="did" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.did" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.did }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.did }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="dsc" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.dsc" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.dsc }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.dsc }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="插入时间" prop="it" align="center" :formatter="formTime" min-width="140"></el-table-column>
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
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {asrfList} from '@/config/api'
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
      totalClass:'',
      searchItem:{//搜索数据组
        uid:"",
        dtp:"",
        refreshTime:"",
        putTime:""
      },
      column:{
          prop:'',
          order:''
      },
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      fileBtnLoading:false,
      listLoading:true
    };
  },
  created() {
    this.getList();
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
    sortChange(column){
        this.column = {
            prop:column.prop,
            order:column.order
        }
        console.log(this.column)
        this.getList()
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        startStr:this.searchItem.refreshTime,
        endStr:this.searchItem.putTime,
        dtp:this.searchItem.dtp,
        uid:this.searchItem.uid,
        fieldName: this.column.prop,
        order:this.column.order == 'ascending' ? '0' : ''
      }
      params.sign = deleteParams(params)
      asrfList(params).then(res=>{
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data.data
          this.totalCount = res.data.data.total
          this.totalClass = res.data.data.data.length
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
