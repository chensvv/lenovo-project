<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/forum/list'}">说法配置</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline width130 height50" size="mini" style="padding-left:10px;">
      <div class="form-input height50">
        <el-form-item label="说法" prop="regular">
          <el-input v-model.trim="searchItem.regular" clearable></el-input>
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
          @sort-change="sortChange"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading">
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
              width="130"
              sortable="custom">
          </el-table-column>
          <el-table-column
              label="更新时间"
              prop="updateTime"
              align="center" 
              :formatter="formTime"
              width="130"
              sortable="custom">
          </el-table-column>
          <el-table-column label="操作" align="center" width="130" v-if="isshow">
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

    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
      <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
        <el-form-item label="例句" prop="liju" >
          <el-input type="text" v-model.trim="currentItem.liju" auto-complete="off" class="tts-input"></el-input>
          <span @click="playVoice('adit')"><i :class="voiceStatus" style="font-size:18px;cursor: pointer;"></i></span>
        </el-form-item>
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
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="例句" prop="liju" >
          <el-input type="text" v-model.trim="addList.liju" auto-complete="off" class="tts-input"></el-input>
          <span @click="playVoice('add')"><i :class="voiceStatus" style="font-size:18px;cursor: pointer;"></i></span>
        </el-form-item>
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
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="" :visible.sync="redisVisible" width="40%" top="35vh" @open="openFun('redisList')">
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
import proURL from '@/config/http'
export default {
  data() {
    let ValidatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入替换后内容'));
            } else {
              if(value.split('<').length - 1 !== value.split('>').length - 1){
                callback(new Error('请确认内容输入是否正确'));
              }else{
                callback();
              }
                
            }
        }
    return {
      pickerOptions: {
          disabledDate(time) {
              let times = Date.now();
              return time.getTime() > times;
          },
      },
      list: [],
      perList:[],
      restaurants: [],
      totalClass:'8',
      voiceStatus:'el-icon-microphone',
      currentItem: {//编辑数据组
        id:"",
        liju:"",
        regular: "",
        replaceResult:"",
        isFlag:null
      },
      addList: {//添加数据组
        liju:"",
        regular: "",
        replaceResult:"",
        isFlag:false
      },
      redisList:{
        redisVal:''
      },
      searchItem:{//搜索数据组
        regular:"",
        pickerVal:[]
      },
      addRules:{
        regular:[{ required: true, message: '请输入匹配规则', trigger: 'change' }],
        replaceResult:[{ required: true, validator: ValidatePass, trigger: 'blur' }],
        isFlag:[{ required: true, message: '请选择是否生效', trigger: 'change' }],
      },
      editRules:{
        regular:[{ required: true, message: '请输入匹配规则', trigger: 'change' }],
        replaceResult:[{ required: true, validator: ValidatePass, trigger: 'blur' }],
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
    playVoice(a){
      let that = this
      this.voiceStatus = 'el-icon-loading'
      var req = new XMLHttpRequest();
      var formData
      if(a == 'add'){
        // if(proURL.proURL.indexOf('8085') != '-1'){
        //   formData = 'text='+this.addList.liju+'&user=2'
        // }else{
          formData = 'text='+this.addList.liju+'&user=10140802691'
        // }
      }else{
        // if(proURL.proURL.indexOf('8085') != '-1'){
        //   formData = 'text='+this.currentItem.liju+'&user=2'
        // }else{
          formData = 'text='+this.currentItem.liju+'&user=10140802691'
        // }
      }
      // if(proURL.proURL.indexOf('8085') != '-1'){
      //   req.open("POST", proURL.proURL+'/lasf/cloudtts', true);
      //   req.setRequestHeader('channel', 'cloudasr')
      //   req.setRequestHeader('lenovokey','LENOVO-VOICE-2t6588161u3bcba')
      //   req.setRequestHeader('secretkey','28A5E16C525F2442E9DAA64CB5208AA7')
      // }else{
        req.open("POST", 'https://voice.lenovomm.com/website/cloudtts', true); // grab our audio file
        req.setRequestHeader('channel', 'cloudasr')
        req.setRequestHeader('lenovokey','LENOVO-VOICE-25c705e83m8865da1l7ac6d')
        req.setRequestHeader('secretkey','266AC5CAC135A2221A0D8D9CBC896F4F')
      // }
      req.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
      req.responseType = "arraybuffer";   // needs to be specific type to work
      req.overrideMimeType('text/xml; charset = utf-8')
      req.onload = function() {
        that.voiceStatus = 'el-icon-microphone'
          var blob = new Blob([req.response]);
          var reader = new FileReader();
          reader.readAsText(blob, 'utf-8');
          reader.onload = function (e) {
            let str = reader.result
            if(str.length < 200 && str.length > 1){
              that.$message({
                    message:str.split('error=')[1],
                    type:"error",
                    duration:1500
                });
            }else if(str.length == 0 || str == ''){
              that.$message({
                    message:'请稍后重试！',
                    type:"error",
                    duration:1500
                });
            }else{
              // console.log(blob)
              let audio = new Audio()
              audio.src = URL.createObjectURL(blob);
              audio.play();
            }
          }
      }
      req.onerror = function(){
        Swal.fire({
            text:$.i18n.prop('server_error'),
            confirmButtonText: $.i18n.prop('confirm'),
            confirmButtonColor: '#94cb82'
        })
      }
      req.send(formData);
    },
    handleDel(index, row) {
      let delsParams = {
        id:row.id
      }
      delsParams.sign = deleteParams(delsParams)
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          delRegular(delsParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'删除成功',
                    type:"success",
                    duration:1500
                });
                this.getList();
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1500
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
                    duration:1500
                });
                this.getList()
                this.editVisible = false
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1500
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
                    duration:1500
                });
                this.getList()
                this.addVisible = false
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1500
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
                      duration:1500
                  });
                  this.getList();
                  this.redisVisible = false
              }else{
                  this.$message({
                      message:res.data.errorMessage,
                      type:"error",
                      duration:1500
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
        startStr:this.searchItem.pickerVal[0],
        endStr:this.searchItem.pickerVal[1],
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
