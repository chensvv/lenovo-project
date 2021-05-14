<template>
  <div class="table client">
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
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="客户端信息" name="client">
          <el-table :data="clientList" :class="this.totalCount <= 5 ? 'limitWidth' :''" style="width: 100%" v-loading="ClistLoading">
            <el-table-column type="index" align="left"  ></el-table-column>
            <el-table-column label="UID" prop="uid" align="left"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="客户端类型" prop="dtp" align="left"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="客户端ip" prop="uip" align="left"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="客户端位置" prop="upos" align="left"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="客户端版本" prop="ver" align="left"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="服务端地址" prop="svr" align="left"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="执行状态" prop="stat" align="left"  :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.stat === 'success' ? 'success' : scope.row.stat === 'failed' ? 'danger' :'info'"
                  disable-transitions
                >{{scope.row.stat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="延时" prop="cltd" align="left"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="从结束录音到返回结果" placement="top">
                  <span slot>延时</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="内容" prop="rcn" align="left"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="插入时间" prop="it" align="left"  :formatter="formTime" min-width="140"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangeC"
            @current-change="handleCurrentChangeC"
            :current-page.sync="CcurrentPage"
            :page-size="CpageSize"
            layout="total, prev, pager, next, jumper"
            :total="CtotalCount"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="服务器信息" name="server">
          <el-table :data="serverList" :class="this.totalCount <= 5 ? 'limitWidth' :''" style="width: 100%" v-loading="SlistLoading">
            <el-table-column type="index" align="left" ></el-table-column>
            <el-table-column label="总耗时..." prop="ixcd" align="left"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="客户端总耗时" placement="top">
                  <span slot>总耗时...</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="总耗时..." prop="ixsd" align="left"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="服务端总耗时" placement="top">
                  <span slot>总耗时...</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="总延时..." prop="ixnd" align="left"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="网络总延时" placement="top">
                  <span slot>总延时...</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="识别耗时..." prop="ixad" align="left"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="服务端语音识别耗时" placement="top">
                  <span slot>识别耗时...</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="总延时..." prop="ixod" align="left"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="服务端其他总延时" placement="top">
                  <span slot>总延时...</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="耗时..." prop="lpcd" align="left"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="最后一个包的客户端耗时" placement="top">
                  <span slot>耗时...</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="耗时..." prop="lpsd" align="left"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="最后一个包的服务端耗时" placement="top">
                  <span slot>耗时...</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="网络延时..." prop="lpnd" align="left"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="最后一个包的网络延时" placement="top">
                  <span slot>网络延时...</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="识别耗时..." prop="lpad" align="left"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="最后一个包的服务端语音识别耗时" placement="top">
                  <span slot>识别耗时...</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="其他总延时..." prop="lpod" align="left"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="最后一个包的服务端其他总延时" placement="top">
                  <span slot>总延时...</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="执行状态" prop="stat" align="left"  :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.stat === 'success' ? 'success' : scope.row.stat === 'failed' ? 'danger' :'info'"
                  disable-transitions
                >{{scope.row.stat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="延时" prop="cltd" align="left"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <el-tooltip effect="dark" content="从结束录音到返回结果" placement="top">
                  <span slot>延时</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="内容" prop="rcn" align="left"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="插入时间" prop="it" align="left"  :formatter="formTime" min-width="140"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangeS"
            @current-change="handleCurrentChangeS"
            :current-page.sync="ScurrentPage"
            :page-size="SpageSize"
            layout="total, prev, pager, next, jumper"
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
  components: { iTable,countTo },
  data() {
    return {
      pickerOptions: {
          disabledDate(time) {
            let times = Date.now() - 24 * 60 * 60 * 1000;
            return time.getTime() > times;
          },
      },
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
      // 分页
      CcurrentPage: 1, //默认显示第几页
      CpageSize: 10, //默认每页条数
      CtotalCount: 1, // 总条数

      ScurrentPage: 1, //默认显示第几页
      SpageSize: 10, //默认每页条数
      StotalCount: 1, // 总条数
      seaBtnLoading: false,
      ClistLoading:true,
      SlistLoading:true,
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
        checkTime(date.getMinutes())
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
      // console.log(`当前页: ${val}`);
      this.getList();
    },
    handleCurrentChangeS(val) {
      this.ScurrentPage = val;
      // console.log(`当前页: ${val}`);
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
        this.ClistLoading = false
        this.clientList = res.data.data.data;
        this.CtotalCount = res.data.data.total;
      });
      clientList(Sparams).then(res => {
        this.SlistLoading = false
        this.serverList = res.data.data.data;
        this.StotalCount = res.data.data.total;
      });
    }
  }
};
</script>

<style scoped>
</style>
