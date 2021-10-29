<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>技能管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="用户ID" prop="userId">
                    <el-input v-model.trim="searchItem.userId" clearable></el-input>
                </el-form-item>
                <el-form-item label="用户指令" prop="asrres">
                    <el-input v-model.trim="searchItem.asrres" clearable></el-input>
                </el-form-item>
                <el-form-item label="解析领域" prop="domain">
                    <el-input v-model.trim="searchItem.domain" clearable></el-input>
                </el-form-item>
                <el-form-item label="响应状态" prop="respstatus">
                    <el-input v-model.trim="searchItem.respstatus" clearable></el-input>
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
            <el-table
                :data="list"
                :class="this.totalClass <= '7' ? 'limitWidth' :''"
                style="width: 100%"
                v-loading="listLoading"
                @sort-change="sortChange">
                <el-table-column type="index" align="left" >
                </el-table-column>
                <el-table-column
                    label="用户ID"
                    prop="uid"
                    align="left">
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
                <el-table-column
                    label="用户指令"
                    prop="userText"
                    align="center"
                    sortable="custom">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.userText" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.userText }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.userText }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="解析领域"
                    prop="nlpDomain"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.nlpDomain" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.nlpDomain }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.nlpDomain }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="响应状态"
                    prop="responseStatus"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.responseStatus" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.responseStatus }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.responseStatus }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="三方名称"
                    prop="outerType"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.outerType" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.outerType }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.outerType }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="接口名称"
                    prop="interfaceUrl"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.interfaceUrl" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.interfaceUrl }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.interfaceUrl }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="时间"
                    prop="displayTime"
                    align="center"
                    min-width="120">
                </el-table-column>
                <el-table-column label="操作" align="center" v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        v-has="'outer:detail'"
                        @click="handleInfo(scope.$index, scope.row)"
                        >详情</el-button>
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
        <el-dialog title="详情" :visible.sync="infoVisible" width="300" :before-close="infoHandleClose">
            <el-form :label-position="'right'" size="small" label-width="100px">
                <el-form-item label="用户ID">
                <el-input type="text" v-model="infoList.uid" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="设备类型">
                <el-input type="text" v-model="infoList.dtp" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="会话ID">
                <el-input type="text" v-model="infoList.ixid" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="来源类型">
                <el-input type="text" v-model="infoList.sourceType" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="请求内容">
                <el-input type="textarea" v-model="infoList.content" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="响应头部信息">
                <el-input type="textarea" v-model="infoList.responseHeader" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="响应内容">
                <el-input type="textarea" v-model="infoList.responseContent" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="请求消耗时间">
                <el-input type="text" v-model="infoList.costTime" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="接口名称">
                <el-input type="text" v-model="infoList.interfaceName" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="接口路径">
                <el-input type="text" v-model="infoList.interfaceUrl" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="响应状态">
                <el-input type="text" v-model="infoList.responseStatus" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="错误信息">
                <el-input type="text" v-model="infoList.errorMsg" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="三方名称">
                <el-input type="text" v-model="infoList.outerType" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="入库时间">
                <el-input type="text" v-model="infoList.displayTime" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="解析领域">
                <el-input type="text" v-model="infoList.nlpDomain" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="用户指令">
                <el-input type="text" v-model="infoList.userText" auto-complete="off" readonly></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="infoHandleConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {outerList, outerInfo} from '@/config/api'
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
            searchItem:{
                userId:"",
                domain:"",
                asrres:"",
                respstatus:"",
                refreshTime:"",
                putTime:""
            },
            column:{
                prop:'',
                order:''
            },
            infoList:[],
            infoVisible: false,
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            seaBtnLoading:false,
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
        if(this.perList.indexOf('outer:detail') == -1){
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
        handleInfo(index, row) {
            
            this.infoVisible = true;
            let infoParams = {
                id:row.id
            }
            outerInfo(infoParams).then(res=>{
                this.infoList = res.data
                // console.log(this.infoList)
            })
        },
        infoHandleConfirm() {
            this.infoVisible = false;
        },
        infoHandleClose(){
            this.infoVisible = false;
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
                userId:this.searchItem.userId,
                asrres:this.searchItem.asrres,
                domain:this.searchItem.domain,
                respstatus:this.searchItem.respstatus,
                startStr:this.searchItem.refreshTime,
                endStr:this.searchItem.putTime,
                fieldName: this.column.prop,
                order:this.column.order == 'ascending' ? '0' : ''
            }
            outerList(params).then(res => {
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data;
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
