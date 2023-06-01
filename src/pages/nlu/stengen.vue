<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/nlu/word/list'}">nlu数据管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline height50 width130" label-width="90px" size="mini">
      <div class="form-input height50">
        <el-form-item label="intent" prop="type">
            <el-select v-model="searchItem.type" placeholder="--">
                <el-option v-for="(item,index) in intentList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
      </div>
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
        <el-button size="mini" @click="handleAdd()" v-has="'stenGen:generator'">生成数据</el-button>
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
              label="intent"
              prop="intent"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.intent" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.intent }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.intent }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="是否切割"
              prop="subNer"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.subNer == 1 ? '是' : '否'" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.subNer == 1 ? '是' : '否' }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.subNer == 1 ? '是' : '否' }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="分类标签"
              prop="tag"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.tag" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.tag }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.tag }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="词元数"
              prop="wordNum"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.wordNum" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.wordNum }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.wordNum }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="数据类型"
              prop="type"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" 
                  :content="scope.row.type == 1 ? '分类数据' : scope.row.type == 2 ? 'ner数据' : '全部数据'" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.type == 1 ? '分类数据' : scope.row.type == 2 ? 'ner数据' : "全部数据"}}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.type == 1 ? '分类数据' : scope.row.type == 2 ? 'ner数据' : "全部数据" }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="备注"
              prop="desc"
              align="center">
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
          <el-table-column
              label="创建时间"
              prop="createTime"
              align="center"
              :formatter="formTime"
              min-width="130">
          </el-table-column>
          <el-table-column label="操作" min-width="130" align="center"  v-if="isshow">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  :loading="downloading"
                  @click="handleDown(scope.$index, scope.row)"
                  v-has="'stenGen:download'">下载</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'stenGen:delete'">删除</el-button>
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
    <el-dialog custom-class="gendialog" :close-on-click-modal="false" :close-on-press-escape="false" title="生成分类" :visible.sync="addVisible" width="70%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
        <div class="main-box">
            <el-form :model="addList" class="demo-form-inline create-form" label-width="90px" size="mini" :rules="addRules" ref="addList">
                <el-form-item label="intent" prop="intent" class="intent-form">
                    <el-select v-model="addList.intent" placeholder="--" @change="intentChange">
                        <el-option v-for="(item,index) in intentList" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-button size="mini" @click="saveId">保存</el-button>
                </el-form-item>
                <el-form-item label="type" prop="type">
                    <el-select v-model="addList.type" placeholder="--" @change="typeChange">
                        <el-option v-for="(item,index) in typeList" :key="index" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类标签" prop="tag">
                    <el-input v-model.trim="addList.tag" clearable></el-input>
                </el-form-item>
                <el-form-item label="词元数" prop="wordNum">
                    <el-input v-model.trim="addList.wordNum" clearable></el-input>
                </el-form-item>
                <el-form-item label="是否切割" prop="subNer">
                    <el-select v-model="addList.subNer" placeholder="--">
                        <el-option v-for="(item,index) in subNerList" :key="index" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model.trim="addList.desc" clearable></el-input>
                </el-form-item>
            </el-form>
            <div class="table-box">
                <el-table
                    :data="dialogList"
                    :class="this.dialogListTotalClass <= '7' ? 'limitWidth' :''"
                    ref="dialogTable"
                    stripe
                    style="width: 100%"
                    v-loading="dialogListLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    @select-all="selectAll"
                    @selection-change="handleSelectionChange"
                    :row-key="getRowKeys">
                    <el-table-column
                    type="selection"
                    width="50"
                    align="center"
                    :reserve-selection="true">
                    </el-table-column>
                    <el-table-column
                        label="句式"
                        prop="sentence"
                        align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.sentence" placement="top">
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                {{ scope.row.sentence }}
                                </div>
                            </el-tooltip>
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                {{ scope.row.sentence }}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="dialogListHandleSizeChange"
                    @current-change="dialogListHandleCurrentChange"
                    :current-page.sync="dialogListCurrentPage"
                    :page-size="dialogListPageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="dialogListTotalCount"
                ></el-pagination>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addHandleClose">取 消</el-button>
            <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">生成数据</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {deleteParams} from '@/utils/deleteParams.js'
import {nluSentenceList, nluSentenceType, nluStengenGenerator, nluStengenList, stenGenDel, stenGenDown} from '@/config/api'
export default {
    data() {
        return {
            list:[],
            perList:[],
            dialogList: [],
            intentList:[],
            sels:[],
            selsAll:[],
            searchItem:{
                type:""
            },
            subNerList:[
                {id:0, value:'不切割'},
                {id:1, value:'切割'}
            ],
            typeList:[
                {id:1, value:'分类数据'},
                {id:2, value:'ner数据'},
                {id:3, value:'全部'}
            ],
            dialogListTotalClass:'8',
            totalClass:'8',
            addList:{//搜索数据组
                intent:"",
                type:"",
                tag:"",
                wordNum:"",
                subNer:"",
                desc:""
            },
            addRules:{
                intent:[{ required: true, message: '请选择intent', trigger: 'change' }],
                type:[{ required: true, message: '请选择类型', trigger: 'change' }],
                tag:[{ required: true, message: '请输入标签', trigger: 'change' }],
                wordNum:[{ required: true, message: '请输入词元数', trigger: 'change' }],
                subNer:[{ required: true, message: '请选择是否切割', trigger: 'change' }],
                desc:[{ required: true, message: '请输入描述', trigger: 'change' }],
                
            },
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            dialogListCurrentPage: 1, //默认显示第几页
            dialogListPageSize: 5,   //默认每页条数
            dialogListTotalCount:1,     // 总条数
            showTitle:true,
            seaBtnLoading:false,
            addBtnLoading:false,
            listLoading:false,
            dialogListLoading:false,
            downloading:false,
            addVisible:false,
            isshow:true
        };
    },
    created() {
        let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
        perArr.map(t=>{
            this.perList.push(Object.values(t).join())
        })
        this.getList();
        this.getIntentList()
    },
    mounted(){
        if(this.perList.indexOf('stenGen:download') == -1 && this.perList.indexOf('stenGen:delete') == -1){
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
            var timer = row.createTime
            var date = new Date(timer)
            return date.getFullYear()+'-'+
                checkTime(date.getMonth()+1)+'-'+
                checkTime(date.getDate())+' '+
                checkTime(date.getHours())+':'+
                checkTime(date.getMinutes())
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
        addHandleConfirm(addList){
            if(this.sels.length == 0){
                this.sels = this.$refs.dialogTable.selection
            }else{
                this.sels.concat(this.$refs.dialogTable.selection)
            }
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    if(this.sels.length == 0){
                        this.$message({
                                message:'请选择句式数据',
                                type:'error',
                                duration:2000
                            });
                    }else{
                        this.addBtnLoading = true
                        let genParams = {
                            type:this.addList.type,
                            // intent:this.addList.intent,
                            sentenceId:this.sels.map(item => item.id)+"",
                            tag:this.addList.tag,
                            subNer:this.addList.subNer,
                            wordNum:this.addList.wordNum,
                            desc:this.addList.desc
                        }
                        genParams.sign = deleteParams(genParams)
                        nluStengenGenerator(genParams).then(res=>{
                            this.addBtnLoading = false
                            if(res.data.code == 200){
                                this.$message({
                                    message:'已生成分类',
                                    type:'success',
                                    duration:2000
                                });
                                this.addVisible = false
                                this.sels = []
                                this.dialogList = []
                                this.$refs.dialogTable.clearSelection()
                                this.getList()
                            }else{
                                this.$message({
                                    message:res.data.msg,
                                    type:'error',
                                    duration:2000
                                });
                            }
                        }).catch(err=>{
                            this.addBtnLoading = false
                        })
                    }
                } else {
                    return false;
                }
            })
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
        dialogListHandleSizeChange(val) {
            this.dialogListPageSize = val;
            this.dialogListCurrentPage = 1
            this.getIntentChangeList();
        },
        dialogListHandleCurrentChange(val) {
            this.dialogListCurrentPage = val
            // console.log(`当前页: ${val}`);
            this.getIntentChangeList();
        },
        openFun(addList){
            this.$nextTick(() => {
                if(this.$refs[addList]){
                this.$refs[addList].resetFields();
                }
            })
        },
        typeChange(val){
            if(val == 1){
                this.addRules.subNer[0].required = false
                this.addRules.desc[0].required = false
                this.addRules.tag[0].required = true
            }else if(val == 2){
                this.addRules.tag[0].required = false
                this.addRules.subNer[0].required = true
                this.addRules.desc[0].required = true
            }else{
                this.addRules.subNer[0].required = true
                this.addRules.desc[0].required = true
                this.addRules.tag[0].required = true
            }           
        },
        // selectAll(selection){
        //     this.sels.push(...selection)
        //     this.sels =  Array.from(new Set(this.sels.map(JSON.stringify))).map(JSON.parse)
        //     console.log(this.sles)
        // },
        // handleSelectionChange(val){
        //     this.sels.push(...val)
        //     this.sels =  Array.from(new Set(this.sels.map(JSON.stringify))).map(JSON.parse)
        //     console.log(this.sels)
        // },
        saveId(){
            if(this.sels.length == 0){
                this.sels = this.$refs.dialogTable.selection
            }else{
                this.sels.concat(this.$refs.dialogTable.selection)
            }
            
        },
        getRowKeys(row){
            return row.id
        },
        getIntentList(){
            let p = {}
            nluSentenceType(p).then(res=>{
                if(res.data.code == 200){
                    this.intentList = res.data.data
                }
            })
        },
        handleAdd(){
            this.addVisible = true
        },
        addHandleClose(){
            this.addVisible = false
            this.sels = []
            this.dialogList = []
            this.$refs.dialogTable.clearSelection()
        },
        intentChange() {
            this.dialogListCurrentPage = 1
            this.getIntentChangeList()
        },
        getIntentChangeList(){
            this.dialogListLoading = true
            let params = {
                pgstr:this.dialogListCurrentPage,
                pcstr:this.dialogListPageSize,
                type:this.addList.intent
            }
            params.sign = deleteParams(params)
            nluSentenceList(params).then(res => {
                this.dialogListLoading = false
                if(res.data.code == 200){
                    this.dialogList = res.data.data;
                    this.dialogListTotalCount = res.data.count
                    this.dialogListTotalClass = res.data.data.length
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:'error',
                        duration:2000
                    });
                }
            }).catch(()=>{
                this.dialogListLoading = false
            })
        },
        handleDel(index, row) {
            let delParams = {
                id:row.id,
                sign:this.$md5(`id=${row.id}`)
            }
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                stenGenDel(delParams).then(res=>{
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
                console.log(err)
            })
        },
        handleDown(index, row) {
            let downParams = {
                id:row.id,
                sign:this.$md5(`id=${row.id}`)
            }
            stenGenDown(downParams).then(res=>{
                this.downloading = false
                let blobUrl = new Blob([res.data])
                let a = document.createElement('a');
                let url = window.URL.createObjectURL(blobUrl);
                a.href = url;
                a.download = row.intent+'-'+new Date().toLocaleString().replace(/[:/\s]/g,"")+'.zip';
                a.click();
                window.URL.revokeObjectURL(url);
            })
        },
        getList(){
            this.listLoading = true
            let listParams = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                intent:this.searchItem.type
            }
            listParams.sign = deleteParams(listParams)
            nluStengenList(listParams).then(res=>{
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data;
                    this.totalCount = res.data.count
                    this.totalClass = res.data.data.length
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:'error',
                        duration:2000
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
