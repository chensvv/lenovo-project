<template>
  <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>闲聊数据</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="热词" prop="hotName">
                    <el-input v-model.trim="searchItem.hotName" clearable></el-input>
                </el-form-item>
                <el-form-item label="VDM" prop="vdm">
                    <el-select v-model="searchItem.vdm" placeholder="--" clearable>
                        <el-option label="all" value="all"></el-option>
                        <el-option label="les" value="les"></el-option>
                        <el-option label="app" value="app"></el-option>
                        <el-option label="vod" value="vod"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据类型" prop="dataType">
                        <el-select v-model.trim="searchItem.dataType" placeholder="--" clearable>
                            <el-option label="纠正数据" value="1"></el-option>
                            <el-option label="新增数据" value="2"></el-option>
                        </el-select>
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
                <el-button size="mini" @click="handleAdd()" v-has="'enginedict:add'">添加</el-button>
                <el-button size="mini" icon="el-icon-upload" @click="importExcel()" v-has="'enginedict:excel'">导入数据</el-button>
            </div>
        
        
        </el-form>
        <div class="table-box">
        <el-table
            :data="list"
            :class="this.totalClass <= '7' ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading">
            <el-table-column type="index" align="left" >
            </el-table-column>
            <el-table-column
                label="VDM"
                prop="vdm"
                align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.vdm" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.vdm }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.vdm }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="热词"
                prop="name"
                align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.name" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.name }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="发音"
                prop="pronounceName"
                align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.pronounceName" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.pronounceName }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.pronounceName }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="数据类型" prop="dataType" align="centr" min-width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.dataType == '1' ? '纠正数据' : '新增数据'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="匹配模式"
                prop="matcherPattern"
                align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.matcherPattern" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.matcherPattern }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.matcherPattern }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="更新时间"
                prop="upTime"
                 align="center"
                :formatter="formTime"
                min-width="120">
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="130" v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'enginedict:add'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'enginedict:del'">删除</el-button>
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
        <el-form :label-position="'right'" label-width="100px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
            <el-form-item label="热词" prop="hotName">
                <el-input type="text" v-model.trim="currentItem.hotName" auto-complete="off"></el-input>
                <!-- <el-button size="mini">获取推荐读音</el-button> -->
            </el-form-item>
            <el-form-item label="词语发音" prop="pronounceName">
                <el-input type="text" v-model.trim="currentItem.pronounceName" placeholder="(如热词为‘A180’，此处可填写‘诶裔巴绫’)" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="匹配模式" prop="matcherPattern">
                <el-input type="text" v-model.trim="currentItem.matcherPattern" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="VDM" prop="vdm">
                <el-select v-model="currentItem.vdm" placeholder="--">
                    <el-option label="all" value="all"></el-option>
                    <el-option label="les" value="les"></el-option>
                    <el-option label="app" value="app"></el-option>
                    <el-option label="vod" value="vod"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据类型" prop="dataType">
                <el-select v-model="currentItem.dataType" placeholder="--">
                    <el-option v-for="(item,index) in dataTypeArr" :key="index" :label="item.typeLabel" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editHandleClose">取 消</el-button>
            <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
        <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
            <el-form-item label="热词" prop="hotName">
                <el-input type="text" v-model.trim="addList.hotName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="词语发音" prop="pronounceName">
                <el-input type="text" v-model.trim="addList.pronounceName" placeholder="(如热词为‘A180’，此处可填写‘诶裔巴绫’)" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="匹配模式" prop="matcherPattern">
                <el-input type="text" v-model.trim="addList.matcherPattern" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="VDM" prop="vdm">
                <el-select v-model="addList.vdm" placeholder="--">
                    <el-option label="all" value="all"></el-option>
                    <el-option label="les" value="les"></el-option>
                    <el-option label="app" value="app"></el-option>
                    <el-option label="vod" value="vod"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据类型" prop="dataType">
                <el-select v-model="addList.dataType" placeholder="--">
                    <el-option label="纠正数据" value="1"></el-option>
                    <el-option label="新增数据" value="2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addHandleClose">取 消</el-button>
            <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="上传文件" :visible.sync="uploadVisible" width="200" class="eldialog" :before-close="closeFile">
      <el-form class="eldialogForm">
        <el-form-item label >
          <el-upload
            class="upload-demo"
            drag
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :limit="1"
            :http-request="uploadFile"
            multiple
            ref="upload"
            action
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传Excel文件，且每次只能上传一个文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFile()">取 消</el-button>
        <el-button type="primary" @click="postFile()" :loading="fileBtnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {engineDictList, engineDictDel, engineDictAddUpd, engineDictExcel} from '@/config/api'
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
            perList:[],
            totalClass:'',
            currentItem: {//编辑数据组
                hotName: "",
                pronounceName: "",
                vdm: "",
                dataType:''
            },
            addList: {//添加数据组
                hotName: "",
                pronounceName: "",
                vdm: "",
                matcherPattern:'',
                dataType:''
            },
            searchItem:{//搜索数据组
                hotName:"",
                vdm:"",
                refreshTime:"",
                putTime:"",
                dataType:''
            },
            addRules:{
                hotName:[{ required: true, message: '请输入热词名称', trigger: 'change' }],
                pronounceName:[{ required: true, message: '请输入说法', trigger: 'change' }],
                vdm:[{ required: true, message: '请选择VDM', trigger: 'change' }],
                dataType:[{ required: true, message: '请选择数据类型', trigger: 'change' }],
            },
            editRules:{
                hotName:[{ required: true, message: '请输入热词名称', trigger: 'change' }],
                pronounceName:[{ required: true, message: '请输入说法', trigger: 'change' }],
                vdm:[{ required: true, message: '请选择VDM', trigger: 'change' }],
                dataType:[{ required: true, message: '请选择数据类型', trigger: 'change' }],
            },
            dataTypeArr:[
                {id:1,typeLabel:"纠正数据",typeVal:"1"},
                {id:2,typeLabel:"新增数据",typeVal:"2"}
            ],
            editVisible: false,
            addVisible: false,
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            seaBtnLoading:false,
            addBtnLoading:false,
            editBtnLoading:false,
            uploadVisible: false,
            fileBtnLoading: false,
            file: [],//文件上传
            listLoading:true,
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
        if(this.perList.indexOf('dict:update') == -1 && this.perList.indexOf('dict:del') == -1){
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
            var timer = row.upTime
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
        handleEdit(index, row) {
            this.editVisible = true;
            this.currentItem = {
                id:row.id,
                hotName: row.name,
                pronounceName: row.pronounceName,
                matcherPattern:row.matcherPattern,
                vdm: row.vdm,
                dataType:row.dataType
            }

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
                engineDictDel(delParams).then(res=>{
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
                vdm:this.currentItem.vdm,
                name:this.currentItem.hotName,
                matcherPattern:this.currentItem.matcherPattern,
                pronounceName:this.currentItem.pronounceName,
                dataType:this.currentItem.dataType
            }
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    engineDictAddUpd(updParams).then(res=>{
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
        handleAdd(){
            this.addVisible = true
        },
        addHandleConfirm(addList) {
            let addParams = {
                name:this.addList.hotName,
                vdm:this.addList.vdm,
                pronounceName:this.addList.pronounceName,
                matcherPattern:this.addList.matcherPattern,
                dataType:this.addList.dataType
            }
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    engineDictAddUpd(addParams).then(res=>{
                            this.addBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:1000
                            });
                            this.getList()
                            this.addVisible = false
                        }else{
                            this.$message({
                                message:res.data.errorMessage,
                                type:"error",
                                duration:1000
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
        importExcel(){
            this.uploadVisible = true
        },
        beforeUpload(file) {
            const extension = file.name.split('.')[1] === 'xls'
            const extension2 = file.name.split('.')[1] === 'xlsx'
            if (!extension && !extension2) {
                this.$message.warning('上传文件必须是Excel格式!')
                return false
            }
            return extension || extension2;
        },
        // 上传文件个数超过定义的数量
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
        },
        uploadFile(item) {
            this.file = item.file;
        },
        postFile() {
            if(this.file == ''){
                this.$message.warning('请选择要上传的文件！')
                return false
            }else{
                const fileObj = this.file;
                var fileData = new FormData();
                fileData.append("file", fileObj);
                this.fileBtnLoading = true;
                engineDictExcel(fileData).then(res => {
                    this.fileBtnLoading = false
                    if(res.data.code == 200){
                        this.$message({
                            message:res.data.msg,
                            type:"success",
                        });
                        this.$refs.upload.clearFiles()
                        this.uploadVisible = false
                        this.getList()
                    }else{
                        this.$message({
                            message:res.data.errorMessage,
                            type:"error",
                            duration:1000
                        });
                    }
                }).catch(err => {
                    this.fileBtnLoading = false
                })
            }
        },
        closeFile() {
            this.$refs.upload.clearFiles()
            this.uploadVisible = false;
        },
        getList() {
            this.listLoading = true
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                startStr:this.searchItem.refreshTime,
                endStr:this.searchItem.putTime,
                name: this.searchItem.hotName,
                vdm:this.searchItem.vdm,
                dataType:this.searchItem.dataType
            }
            engineDictList(params).then(res => {
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data
                    this.totalCount = res.data.count
                    this.totalClass = res.data.data.length
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
