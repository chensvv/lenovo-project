<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="a_alert">
          <i class="el-icon-info"></i>
          <span class="alert_main">上报日志今天更新了<countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo> 条</span>
      </div>
    <el-form
      :inline="true"
      ref="searchItem"
      :model="searchItem"
      class="demo-form-inline search_box"
      size="mini"
    >
      <el-form-item label="Uid" prop="uid">
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
          style="width: 100%;"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="putTime">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="searchItem.putTime"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="客户端信息" name="client">
          <el-table :data="clientList" style="width: 100%">
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column label="UID" prop="uid" align="center"></el-table-column>
            <el-table-column label="客户端类型" prop="dtp" align="center"></el-table-column>
            <el-table-column label="客户端ip" prop="uip" align="center"></el-table-column>
            <el-table-column label="客户端位置" prop="upos" align="center"></el-table-column>
            <el-table-column label="客户端版本" prop="ver" align="center"></el-table-column>
            <el-table-column label="服务端地址" prop="svr" align="center"></el-table-column>
            <el-table-column label="执行状态" prop="stat" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.stat === 'success' ? 'success' : scope.row.stat === 'failed' ? 'danger' :'info'"
                  disable-transitions
                >{{scope.row.stat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="延时" prop="cltd" align="center">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="从结束录音到返回结果" placement="top">
                  <span>延时</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="内容" prop="rcn" align="center"></el-table-column>
            <el-table-column label="插入时间" prop="it" align="center" :formatter="formTime"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangeC"
            @current-change="handleCurrentChangeC"
            :current-page.sync="CcurrentPage"
            :page-sizes="CpageSizes"
            :page-size="CpageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="CtotalCount"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="服务器信息" name="server">
          <i-table
            :list="serverList"
            :options="options"
            :columns="serverColumns"
            :operates="operates"
          ></i-table>
          <el-pagination
            @size-change="handleSizeChangeS"
            @current-change="handleCurrentChangeS"
            :current-page.sync="ScurrentPage"
            :page-sizes="SpageSizes"
            :page-size="SpageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="StotalCount"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import iTable from "@/components/table";
import { checkTime } from "@/utils/timer.js";
import { clientList } from "@/config/api.js";
import countTo from 'vue-count-to';
export default {
  name: "applicationlist",
  components: { iTable,countTo },
  data() {
    return {
      clientList: [],
      serverList: [],
      searchItem: {
        //搜索数据组
        uid: "",
        dtp: "",
        refreshTime: "",
        putTime: ""
      },
      activeName: "client",
      serverColumns: [
        {
          prop: "ixcd",
          label: "客户端总耗时",
          align: "center"
        },
        {
          prop: "ixsd",
          label: "服务端总耗时",
          align: "center"
        },
        {
          prop: "ixnd",
          label: "网络总延时",
          align: "center"
        },
        {
          prop: "ixad",
          label: "服务端语音识别耗时",
          align: "center"
        },
        {
          prop: "ixod",
          label: "服务端其他总延时",
          align: "center"
        },
        {
          prop: "lpcd",
          label: "最后一个包的客户端耗时",
          align: "center"
        },
        {
          prop: "lpsd",
          label: "最后一个包的服务端耗时",
          align: "center"
        },
        {
          prop: "lpnd",
          label: "最后一个包的网络延时",
          align: "center"
        },
        {
          prop: "lpad",
          label: "最后一个包的服务端语音识别耗时",
          align: "center"
        },
        {
          prop: "lpod",
          label: "最后一个包的服务端其他总延时",
          align: "center"
        }
      ],
      options: {
        stripe: false, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: false, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        border: false //是否显示纵向边框
      },
      operates: {
        width: 120,
        show: false,
        list: []
      }, // 列操作按钮
      // 分页
      CcurrentPage: 1, //默认显示第几页
      CpageSize: 30, //默认每页条数
      CpageSizes: [10, 20, 30],
      CtotalCount: 1, // 总条数

      ScurrentPage: 1, //默认显示第几页
      SpageSize: 30, //默认每页条数
      SpageSizes: [10, 20, 30],
      StotalCount: 1, // 总条数
      seaBtnLoading: false,
      fileBtnLoading: false,
      startVal:0,
      endVal:0
    };
  },
  created() {
    this.getList();
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
        checkTime(date.getMinutes()) +
        ":" +
        checkTime(date.getSeconds())
      );
    },
    onSubmit() {
      this.seaBtnLoading = true;
      this.currentPage = 1
      this.getList();
      this.seaBtnLoading = false;
    },
    handleSizeChangeC(val) {
      this.CpageSize = val;
      this.CcurrentPage = 1;
      this.getList();
    },
    handleSizeChangeS(val) {
      this.SpageSize = val;
      this.ScurrentPage = 1;
      this.getList();
    },
    handleCurrentChangeC(val) {
      this.CcurrentPage = val;
      console.log(`当前页: ${val}`);
      this.getList();
    },
    handleCurrentChangeS(val) {
      this.ScurrentPage = val;
      console.log(`当前页: ${val}`);
      this.getList();
    },
    getList() {
      let Cparams = {
        pgstr: this.CcurrentPage,
        pcstr: this.CpageSize,
        startStr: this.searchItem.refreshTime,
        endStr: this.searchItem.putTime,
        uid: this.searchItem.uid,
        dtp: this.searchItem.dtp
      };
      let Sparams = {
        pgstr: this.ScurrentPage,
        pcstr: this.SpageSize
      };
      clientList(Cparams).then(res => {
        this.clientList = res.data.data.data;

        this.CtotalCount = res.data.data.total;
      });
      clientList(Sparams).then(res => {
        this.serverList = res.data.data.data;
        this.StotalCount = res.data.data.total;
        this.endVal = res.data.count
      });
    }
  }
};
</script>

<style scoped>
</style>
