<template>
  <div class="table height-105">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
      <div class="form-input height70">
        <el-form-item label="应用包名" prop="app">
          <el-input v-model.trim="searchItem.app" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model.trim="searchItem.desc" clearable></el-input>
        </el-form-item>
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
      </div>
    </el-form>
    <div class="table-box">
      <el-table 
        :data="list" 
        stripe 
        :class="this.totalClass <= '7' ? 'limitWidth' :''"
        style="width: 100%" 
        v-loading="listLoading" 
        @sort-change="sortChange"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading">
        <el-table-column type="index" align="center" label="#"></el-table-column>
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
        <el-table-column label="客户端版本" prop="ver" align="center" sortable="custom">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.ver" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.ver }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.ver }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" prop="opts" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.opts" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.opts }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.opts }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="应用包名" prop="app" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.app" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.app }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.app }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="oper" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.oper" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.oper }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.oper }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="desc" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.desc" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.desc }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.desc }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="插入时间" prop="it" align="center"  :formatter="formTime" width="130"></el-table-column>
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
import {checkTime} from '@/utils/timer.js';
import {oprList} from '@/config/api';
import {deleteParams} from '@/utils/deleteParams.js'
export default {
  data() {
    return {
      pickerOptions: {
          disabledDate(time) {
            let times = Date.now();
            return time.getTime() > times;
          },
      },
      list: [],
      totalClass:'8',
      searchItem:{//搜索数据组
        app:"",
        desc:"",
        pickerVal:[]
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
        startStr:this.searchItem.pickerVal[0],
        endStr:this.searchItem.pickerVal[1],
        app:this.searchItem.app,
        desc:this.searchItem.desc,
        fieldName: this.column.prop,
        order:this.column.order == 'ascending' ? '0' : ''
      }
      params.sign = deleteParams(params)
      oprList(params).then(res=>{
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data.data
          this.totalCount = res.data.data.total
          this.totalClass = res.data.data.data.length
        }else{
            if(res.data.code != undefined){
                this.$message({
                    message:res.data.code+'：'+res.data.msg,
                    type:'error',
                    duration:2000
                });
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
