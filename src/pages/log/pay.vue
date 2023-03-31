<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
      <div class="form-input height50">
        <el-form-item label="用户ID" prop="lenovoid">
          <el-input v-model.trim="searchItem.lenovoid" clearable></el-input>
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
        <el-tooltip class="item" effect="dark" content="默认导出全部数据，如需自定义请根据左侧查询条件导出" placement="top-end">
          <el-button size="mini" icon="el-icon-download" @click="exportFile()" :loading="fileBtnLoading">导出数据</el-button>
        </el-tooltip>
        
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
                label="lenovoid"
                prop="lenovoid"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.lenovoid" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.lenovoid }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.lenovoid }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="时长"
                prop="duration"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.duration" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.duration }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.duration }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
                prop="status"
                align="center">
                    <template slot-scope="scope">
                    <span>{{scope.row.status == '1' ? '创建订单' : scope.row.status == '2' ? '同步CUI失败' : '订单同步成功'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="总金额"
                prop="totalMoney"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.totalMoney" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.totalMoney }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.totalMoney }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="参数"
                prop="paramJson"
                align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.paramJson" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.paramJson }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.paramJson }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="描述"
                prop="description"
                align="left">
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
            <el-table-column label="添加时间" prop="createTime" align="center"  :formatter="formTime" width="130">
            </el-table-column>
            <el-table-column label="修改时间" prop="updateTime" align="center"  :formatter="formTime2" width="130">
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
  </div>
</template>

<script>
import {payList, payExport} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {checkTime} from '@/utils/timer.js';
export default {
  data() {
    let vue = this
    return {
      pickerOptions: {
        disabledDate(time) {
            let times = Date.now();
            let timeOptionRange = vue.timeOptionRange;
            let secondNum = 3600 * 1000 * 24 * 30;
            if (timeOptionRange) {
              return time.getTime() > timeOptionRange.getTime() + (Date.now() - timeOptionRange.getTime() < secondNum ? Date.now() - timeOptionRange.getTime() : secondNum) || time.getTime() < timeOptionRange.getTime() - secondNum;
            }else{
              return time.getTime() > times;
            }
            // return time.getTime() > Date.now();
        },
        onPick(time) {
            //当第一时间选中才设置禁用
            if (time.minDate && !time.maxDate) {
                vue.timeOptionRange = time.minDate;
            }
            if (time.maxDate) {
                vue.timeOptionRange = null;
            }
        }
      },
      list: [],
      perList:[],
      totalClass:'8',
      pickerVal: [],
      searchItem:{//搜索数据组
        lenovoid:"",
        pickerVal:[]
      },
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      addBtnLoading:false,
      listLoading:true,
      fileBtnLoading:false,
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
    if(this.perList.indexOf('csc:delete') == -1){
      this.isshow = false
    }
  },
  methods: {
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1
      this.getList();
    },
    onSubmit(){
      this.seaBtnLoading = true
      this.currentPage = 1
      this.getList();
      this.seaBtnLoading = false
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.listLoading = true
      // console.log(`当前页: ${val}`);
      this.getList();
    },
    dateChangebirthday(val) {
      if (val == null) val = []
        this.searchItem.startTime = val[0]
        this.searchItem.endTime = val[1]
    },
    exportFile(){
      let exprotParams = {
        startStr:this.searchItem.startTime,
        endStr:this.searchItem.endTime,
        lenovoid:this.searchItem.lenovoid
      }
      exprotParams.sign = deleteParams(exprotParams)
      this.fileBtnLoading = true
      payExport(exprotParams).then(res=>{
        // let bom = '\uFEFF'
        let blobUrl = new Blob([res.data], {type: 'text/csv,charset=UTF-8'})
        // let blobUrl = new Blob('\uFEFF' +[res.data], {type: 'text/csv,charset=UTF-8'})
        let a = document.createElement('a');
        let url = window.URL.createObjectURL(blobUrl);
        let filename = this.searchItem.startTime == '' && this.searchItem.endTime == '' && this.searchItem.lenovoid == '' ? '支付信息.csv' 
        : this.searchItem.startTime == '' && this.searchItem.endTime == '' && this.searchItem.lenovoid !='' ? `${this.searchItem.lenovoid}.csv` : this.searchItem.startTime+'-'+this.searchItem.endTime+'.csv'
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        this.fileBtnLoading = false
      }).catch(err => {
          this.fileBtnLoading = false
      })
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        lenovoid:this.searchItem.lenovoid,
        startStr:this.searchItem.pickerVal[0],
        endStr:this.searchItem.pickerVal[1],
      }
      params.sign = deleteParams(params)
      payList(params).then(res => {
        console.log(res)
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
