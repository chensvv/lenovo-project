<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/app/list'}">应用搜索</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="应用名" prop="appName">
                    <el-input v-model.trim="searchItem.appName" clearable></el-input>
                </el-form-item>
                <el-form-item label="来自于" prop="source">
                    <el-select v-model.trim="searchItem.source" placeholder="--" clearable>
                        <el-option label="联想" value="lenovo"></el-option>
                        <el-option label="百度" value="baidu"></el-option>
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
                <el-button size="mini" type="primary" @click="onSubmit" :loading="btnLoading">查询</el-button>
                <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'app:add'">添加</el-button>
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
                <el-table-column label="应用名" prop="name" align="left">
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
                <el-table-column label="类别" prop="cat" align="center" sortable="custom">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.cat" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.cat }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.cat }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="平台" prop="platform" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.platform" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.platform }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.platform }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="费用" prop="fee" align="center"></el-table-column>
                <el-table-column label="评分" prop="score" align="center"></el-table-column>
                <el-table-column label="下载次数" prop="dnum" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.dnum" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.dnum }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.dnum }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="来自" prop="source" align="center"></el-table-column>
                <el-table-column label="更新时间" prop="updateTime" align="center" min-width="120"></el-table-column>
                <el-table-column label="入库时间" prop="createTime" align="center" :formatter="formTime" min-width="120"></el-table-column>
                <el-table-column label="操作" min-width="130" align="center"  v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'app:update'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'app:del'">删除</el-button>
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="应用名" prop="name">
                    <el-input type="text" v-model.trim="currentItem.name"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="url" prop="url">
                    <el-input type="text" v-model.trim="currentItem.url"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户评分" prop="score">
                    <el-input type="text" v-model.trim="currentItem.score"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="参与评分人数" prop="participants">
                    <el-input type="text" v-model.trim="currentItem.participants"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="费用类型" prop="fee">
                    <el-input type="text" v-model.trim="currentItem.fee"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="app类型" prop="cat">
                    <el-input type="text" v-model.trim="currentItem.cat"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="版本相关信息" prop="version">
                    <el-input type="text" v-model.trim="currentItem.version"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="下载次数" prop="dnum">
                    <el-input type="text" v-model.trim="currentItem.dnum"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="平台" prop="platform">
                    <el-input type="text" v-model.trim="currentItem.platform"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="info">
                    <el-input type="text" v-model.trim="currentItem.info"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="应用描述" prop="caption">
                    <el-input type="text" v-model.trim="currentItem.caption"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="数据来源" prop="original">
                    <el-input type="text" v-model.trim="currentItem.original"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="来源抓取网站" prop="source">
                    <el-select v-model="currentItem.source" placeholder="--">
                        <el-option v-for="(item,index) in sourceArr" :key="index" :label="item.typeLabel" :value="item.typeVal"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="大小" prop="size">
                    <el-input type="text" v-model.trim="currentItem.size"  auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="应用名" prop="name">
                    <el-input type="text" v-model.trim="addList.name"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="url" prop="url">
                    <el-input type="text" v-model.trim="addList.url"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户评分" prop="score">
                    <el-input type="text" v-model.trim="addList.score"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="参与评分人数" prop="participants">
                    <el-input type="text" v-model.trim="addList.participants"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="费用类型" prop="fee">
                    <el-input type="text" v-model.trim="addList.fee"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="app类型" prop="cat">
                    <el-input type="text" v-model.trim="addList.cat"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="版本相关信息" prop="version">
                    <el-input type="text" v-model.trim="addList.version"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="下载次数" prop="dnum">
                    <el-input type="text" v-model.trim="addList.dnum"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="平台" prop="platform">
                    <el-input type="text" v-model.trim="addList.platform"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="info">
                    <el-input type="text" v-model.trim="addList.info"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="应用描述" prop="caption">
                    <el-input type="text" v-model.trim="addList.caption"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="数据来源" prop="original">
                    <el-input type="text" v-model.trim="addList.original"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="来源抓取网站" prop="source">
                    <el-select v-model="addList.source" placeholder="--">
                        <el-option label="百度" value="baidu"></el-option>
                        <el-option label="联想" value="lenovo"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="大小" prop="size">
                    <el-input type="text" v-model.trim="addList.size"  auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {deleteParams} from '@/utils/deleteParams.js'
import {appList,appAdd,appUpd,appDel} from '@/config/api'
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
            totalClass:'8',
            searchItem:{//搜索数据组
                appName:"",
                source:"",
                refreshTime:"",
                putTime:""
            },
            addRules:{
                name:[{ required: true, message: '请输入应用名', trigger: 'change' }],
            },
            editRules:{
                name:[{ required: true, message: '请输入应用名', trigger: 'change' }], 
            },
            addList:{
                name:"",
                url:"",
                score:"",
                participants:"",
                fee:"",
                cat:"",
                version:"",
                dnum:"",
                platform:"",
                info:"",
                caption:"",
                original:"",
                source:"",
                size:""
            },
            currentItem:{
                id:"",
                name:"",
                url:"",
                score:"",
                participants:"",
                fee:"",
                cat:"",
                version:"",
                dnum:"",
                platform:"",
                info:"",
                caption:"",
                original:"",
                source:"",
                size:""
            },
            sourceArr:[
                {typeLabel:"百度",typeVal:"baidu"},
                {typeLabel:"联想",typeVal:"lenovo"}
            ],
            column:{
                prop:'',
                order:''
            },
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            btnLoading:false,
            listLoading:true,
            addVisible:false,
            editVisible:false,
            isshow:true,
            tableHeight: 50,
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
        if(this.perList.indexOf('app:update') == -1 && this.perList.indexOf('app:del') == -1){
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
            this.getList();
        },
        onSubmit(){
            this.currentPage = 1
            this.btnLoading = true
            this.getList();
            this.btnLoading = false
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
        handleEdit(index, row) {
            this.editVisible = true;
            this.currentItem = {
                id:row.id,
                name:row.name,
                url:row.url,
                score:row.score,
                participants:row.participants,
                fee:row.fee,
                cat:row.cat,
                version:row.version,
                dnum:row.dnum,
                platform:row.platform,
                info:row.info,
                caption:row.caption,
                original:row.original,
                source:row.source,
                size:row.asize
            };
        },
        addHandleClose(){
            this.addVisible = false
        },
        handleAdd(){
            this.addVisible = true
        },
        editHandleConfirm(currentItem) {
            let updParams = {
                id:this.currentItem.id,
                name:this.currentItem.name,
                url:this.currentItem.url,
                score:this.currentItem.score,
                participants:this.currentItem.participants,
                fee:this.currentItem.fee,
                cat:this.currentItem.cat,
                version:this.currentItem.version,
                dnum:this.currentItem.dnum,
                platform:this.currentItem.platform,
                info:this.currentItem.info,
                caption:this.currentItem.caption,
                original:this.currentItem.original,
                source:this.currentItem.source,
                asize:this.currentItem.size
            }
            updParams.sign = deleteParams(updParams)
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    appUpd(updParams).then(res=>{
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
        addHandleConfirm(addList) {
            let addParams = {
                name:this.addList.name,
                url:this.addList.url,
                score:this.addList.score,
                participants:this.addList.participants,
                fee:this.addList.fee,
                cat:this.addList.cat,
                version:this.addList.version,
                dnum:this.addList.dnum,
                platform:this.addList.platform,
                info:this.addList.info,
                caption:this.addList.caption,
                original:this.addList.original,
                source:this.addList.source,
                asize:this.addList.size
            }
            addParams.sign = deleteParams(addParams)
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    appAdd(addParams).then(res => {
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
                appDel(delParams).then(res=>{
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
                console.log(err)
            })
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
                appname:this.searchItem.appName,
                source:this.searchItem.source,
                fieldName: this.column.prop,
                order:this.column.order == 'ascending' ? '0' : ''
            }
            params.sign = deleteParams(params)
            appList(params).then(res => {
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data;
                    this.totalCount = res.data.count
                    this.totalClass = res.data.data.length
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
