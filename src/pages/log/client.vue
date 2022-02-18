<template>
  <div class="table height-105">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
      <div class="form-input height70">
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
      </div>
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
      </div>
    </el-form>
    <div class="table-box">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="客户端信息" name="client" class="flex-align">
          <el-table :data="clientList" :class="this.ctotalClass <= '7' ? 'limitWidth' :''" style="width: 100%" v-loading="ClistLoading" @sort-change="sortChange">
            <el-table-column type="index" align="left"  ></el-table-column>
            <el-table-column label="UID" prop="uid" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.uid" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.uid }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.uid }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="客户端类型" prop="dtp" align="center" sortable="custom">
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
            <!-- <el-table-column label="客户端ip" prop="uip" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.uip" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.uip }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.uip }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="客户端位置" prop="upos" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.upos" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.upos }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.upos }}
                  </div>
              </template>
            </el-table-column> -->
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
            <el-table-column label="服务端地址" prop="svr" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.svr" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.svr }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.svr }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="执行状态" prop="stat" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.stat === 'success' ? 'tag-s' : scope.row.stat === 'failed' ? 'tag-d' :'tag-i'"
                >{{scope.row.stat}}</span>
              </template>
            </el-table-column>
            <el-table-column label="延时" prop="cltd" align="center" min-width="90">
              <template slot="header">
                <el-tooltip effect="dark" content="从结束录音到返回结果" placement="top">
                  <span slot>延时</span>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.cltd" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.cltd }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.cltd }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="内容" prop="rcn" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.rcn" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.rcn }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.rcn }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="插入时间" prop="it" align="center"  :formatter="formTime" min-width="140"></el-table-column>
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
          <el-table :data="serverList" :class="this.totalClass <= '7' ? 'limitWidth' :''" style="width: 100%" v-loading="SlistLoading">
            <el-table-column type="index" align="center" label="#"></el-table-column>
            <el-table-column label="客户端总耗时" prop="ixcd" align="center">
            </el-table-column>
            <el-table-column label="服务端总耗时" prop="ixsd" align="center">
            </el-table-column>
            <el-table-column label="网络总延时" prop="ixnd" align="center">
            </el-table-column>
            <el-table-column label="服务端识别耗时" prop="ixad" align="center">
            </el-table-column>
            <!-- <el-table-column label="服务端其他总延时" prop="ixod" align="center">
              <template slot="header">
                <el-tooltip effect="dark" content="服务端其他总延时" placement="top">
                  <span slot class="headlips">服务端其他总延时</span>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.ixod" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.ixod }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.ixod }}
                  </div>
              </template>
            </el-table-column> -->
            <!-- <el-table-column label="最后一个包的客户端耗时" prop="lpcd" align="center">
              <template slot="header">
                <el-tooltip effect="dark" content="最后一个包的客户端耗时" placement="top">
                  <span slot class="headlips">最后一个包的客户端耗时</span>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.lpcd" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.lpcd }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.lpcd }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="最后一个包的服务端耗时" prop="lpsd" align="center">
              <template slot="header">
                <el-tooltip effect="dark" content="最后一个包的服务端耗时" placement="top">
                  <span slot class="headlips">最后一个包的服务端耗时</span>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.lpsd" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.lpsd }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.lpsd }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="最后一个包的网络延时" prop="lpnd" align="center">
              <template slot="header">
                <el-tooltip effect="dark" content="最后一个包的网络延时" placement="top">
                  <span slot class="headlips">最后一个包的网络延时</span>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.lpnd" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.lpnd }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.lpnd }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="最后一个包的服务端语音识别耗时" prop="lpad" align="center">
              <template slot="header">
                <el-tooltip effect="dark" content="最后一个包的服务端语音识别耗时" placement="top">
                  <span slot class="headlips">最后一个包的服务端语音识别耗时</span>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.lpad" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.lpad }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.lpad }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="最后一个包的服务端其他总延时" prop="lpod" align="center">
              <template slot="header">
                <el-tooltip effect="dark" content="最后一个包的服务端其他总延时" placement="top">
                  <span slot class="headlips">最后一个包的服务端其他总延时</span>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.lpod" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.lpod }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.lpod }}
                  </div>
              </template>
            </el-table-column> -->
            <el-table-column label="执行状态" prop="stat" align="center" min-width="90">
              <template slot-scope="scope">
                <span
                  :class="scope.row.stat === 'success' ? 'tag-s' : scope.row.stat === 'failed' ? 'tag-d' :'tag-i'"
                >{{scope.row.stat}}</span>
              </template>
            </el-table-column>
            <el-table-column label="延时" prop="cltd" align="center">
              <template slot="header">
                <el-tooltip effect="dark" content="从结束录音到返回结果" placement="top">
                  <span slot>延时</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="内容" prop="rcn" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.rcn" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.rcn }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.rcn }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="插入时间" prop="it" align="center"  :formatter="formTime" min-width="140"></el-table-column>
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
      ctotalClass:'',
      totalClass:'',
      // 分页
      CcurrentPage: 1, //默认显示第几页
      CpageSize: 10, //默认每页条数
      CtotalCount: 1, // 总条数
      
      ScurrentPage: 1, //默认显示第几页
      SpageSize: 10, //默认每页条数
      StotalCount: 1, // 总条数
      showTitle:true,
      seaBtnLoading: false,
      ClistLoading:true,
      SlistLoading:true,
      column:{
        prop:'',
        order:''
      }
    }
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
    sortChange(column){
      this.column = {
        prop:column.prop,
        order:column.order
      }
      console.log(this.column)
      this.getList()
    },
    getList() {
      let Cparams = {
        pgstr: this.CcurrentPage,
        pcstr: this.CpageSize,
        startStr: this.searchItem.refreshTime,
        endStr: this.searchItem.putTime,
        uid: this.searchItem.uid,
        dtp: this.searchItem.dtp,
        fieldName: this.column.prop,
        order:this.column.order == 'ascending' ? '0' : ''
      };
      let Sparams = {
        pgstr: this.ScurrentPage,
        pcstr: this.SpageSize
      };
      clientList(Cparams).then(res => {
        this.ClistLoading = false
        if(res.data.code == 200){
          this.clientList = res.data.data.data;
          this.CtotalCount = res.data.data.total;
          this.ctotalClass = res.data.data.data.length
        }
      }).catch(()=>{
        this.ClistLoading = false
      })
      clientList(Sparams).then(res => {
        this.SlistLoading = false
        if(res.data.code == 200){
          this.serverList = res.data.data.data;
          this.StotalCount = res.data.data.total;
          this.totalClass = res.data.data.data.length
        }
      }).catch(()=>{
        this.SlistLoading = false
      })
    }
  }
};
</script>

<style scoped>
</style>
