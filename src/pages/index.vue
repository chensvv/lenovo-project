<template>
    <div class="index">
        <div class="workflow" v-has="'user:user'" v-if="infoShow">
            <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline" size="mini">
                <el-form-item label="内容" prop="con">
                    <el-input v-model.trim="searchItem.con" clearable></el-input>
                </el-form-item>
                <el-form-item label="发起人" prop="user">
                    <el-input v-model.trim="searchItem.user" clearable></el-input>
                </el-form-item>
                <el-form-item class="work">
                    <el-button type="primary" @click="onSubmit" size="mini" :loading="btnLoading">查询</el-button>
                    <el-button @click="resetForm('searchItem')" size="mini">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="list"
                stripe
                :class="this.totalClass <= '7' ? 'limitWidth' :''"
                style="width: 100%"
                v-loading="listLoading">
                <el-table-column
                    label="ID"
                    prop="id"
                    width='50'
                    align="center" 
                    >
                </el-table-column>
                <el-table-column
                    label="发起人"
                    prop="username"
                    align="center" 
                    >
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.username" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.username }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.username }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="简要内容"
                    prop="speak"
                    align="left" 
                    >
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.speak" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.speak }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.speak }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="createTime"
                    align="center"
                    min-width="110"
                    :formatter="formTime">
                </el-table-column>
                <el-table-column label="操作" align="center" >
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="rowClick(scope.$index, scope.row)">详情</el-button>
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
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="详情" :visible.sync="infoVisible" width="300" :before-close="handleClose">
            <el-form :label-position="'right'" size="small" label-width="120px">
                <el-form-item label="用户名称">
                    <el-input type="text" v-model="infoList.username" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="说法">
                    <el-input type="text" v-model="infoList.speak" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="答案">
                    <el-input type="text" v-model="infoList.answer" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="所属excel文件">
                    <el-input type="text" v-model="infoList.excel" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="result">
                    <el-input type="text" v-model="infoList.result" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="操作类型">
                    <el-input type="text" v-model="infoList.type" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-input type="text" v-model="infoList.createTime" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="修改时间">
                    <el-input type="text" v-model="infoList.updateTime" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="流程id">
                    <el-input type="text" v-model="infoList.taskid" auto-complete="off" readonly></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handlePass()">通过</el-button>
                <el-button type="primary" @click="handleBack()">退回</el-button>
                <el-button type="primary" @click="handleConfirm()">关闭</el-button>
            </span>
        </el-dialog>

        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="退回理由" :visible.sync="backVisible" width="300" :before-close="back_handleClose">
            <el-form :label-position="'right'" size="small" label-width="120px">
                <el-form-item label="退回理由">
                    <el-input type="textarea" v-model="infoList.backres" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleEnsure()">确定</el-button>
            </span>
        </el-dialog>
        
        <div class="workflow" v-has="'user:data'" v-if="n_infoShow">
            <el-form :inline="true" ref="n_searchItem"  :model="n_searchItem" class="demo-form-inline" size="small">
                <el-form-item label="内容" prop="con">
                    <el-input v-model.trim="n_searchItem.con" clearable></el-input>
                </el-form-item>
                <el-form-item class="work">
                    <el-button type="primary" @click="n_onSubmit" size="mini" :loading="n_btnLoading">查询</el-button>
                    <el-button @click="n_resetForm('searchItem')" size="mini">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="nlist"
                stripe
                style="width: 100%"
                :class="this.totalClass <= '7' ? 'limitWidth' :''"
                v-loading="n_listLoading">
                <el-table-column
                    label="ID"
                    prop="id"
                    width='50'
                    align="center" 
                    >
                </el-table-column>
                <el-table-column
                    label="类型"
                    prop="type"
                    align="left" 
                    >
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.type" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.type }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.type }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="简要内容"
                    prop="speak"
                    align="left" 
                    >
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.speak" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.speak }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.speak }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="ver"
                    align="center" 
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.ver == 1 ? '审核中' : '审核拒接'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="createTime"
                    align="center" 
                    min-width="110"
                    :formatter="formTime">
                </el-table-column>
                <el-table-column label="操作" align="center" >
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="n_rowClick(scope.$index, scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
            </el-table>
            <el-pagination
                @size-change="n_handleSizeChange"
                @current-change="n_handleCurrentChange"
                :current-page.sync="n_currentPage"
                :page-size="n_pageSize"
                layout="total, prev, pager, next, jumper"
                :total="n_totalCount"
            ></el-pagination>
        </div>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="详情" :visible.sync="n_infoVisible" width="300" :before-close="n_handleClose">
            <el-form :label-position="'right'" size="small" label-width="120px">
                <el-form-item label="ID">
                    <el-input type="text" v-model="n_infoList.id" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="说法">
                    <el-input type="text" v-model="n_infoList.speak" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="答案">
                    <el-input type="text" v-model="n_infoList.answer" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="result">
                    <el-input type="text" v-model="n_infoList.result" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="操作类型">
                    <el-input type="text" v-model="n_infoList.type" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="原因">
                    <el-input type="text" v-model="n_infoList.comm" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-input type="text" v-model="n_infoList.createTime" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="修改时间">
                    <el-input type="text" v-model="n_infoList.updateTime" auto-complete="off" readonly></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="n_handleConfirm()">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {checkTime} from '@/utils/timer.js'
import {deleteParams} from '@/utils/deleteParams.js'
import {activitiList,activitiPass,activitinList,activitiStatus, userMenu} from '@/config/adminApi'
export default {
    inject:['reload'],
    data(){
        return{
            startVal:0,
            endVal:0,
            list:[],
            nlist:[],
            perList:[],
            totalClass:'',
            searchItem:{
                user:'',
                con:''
            },
            n_searchItem:{
                con:''
            },
            infoList:{
                username:'',
                speak:'',
                answer:'',
                type:'',
                createTime:'',
                updateTime:'',
                taskid:'',
                result:'',
                backres:''
            },
            n_infoList:{
                id:'',
                speak:'',
                answer:'',
                type:'',
                comm:'',
                createTime:'',
                updateTime:'',
                result:''
            },
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            btnLoading:false,
            infoVisible:false,
            listLoading:true,
            backVisible:false,
            n_currentPage: 1, //默认显示第几页
            n_pageSize: 10,   //默认每页条数
            n_totalCount:1,     // 总条数
            n_btnLoading:false,
            n_infoVisible:false,
            n_listLoading:true,
            infoShow:false,
            n_infoShow:false,
            showTitle:true,
        }
    },
    created() {
        this.getMenu()
        let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
        perArr.map(t=>{
            this.perList.push(Object.values(t).join())
        })
        
    },
    mounted(){
       this.execution();
    },
    methods:{
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
        execution(){
            if(this.perList.indexOf('user:user') != -1){
                this.getList();
            }
            if(this.perList.indexOf('user:data') != -1){
                this.getNList();
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
        n_resetForm(formName) {
            this.$refs[formName].resetFields();
            this.currentPage = 1
            this.getNList()
        },
        onSubmit(){
            this.btnLoading = true
            this.currentPage = 1
            this.getList()
            this.btnLoading = false
        },
        n_onSubmit(){
            this.btnLoading = true
            this.currentPage = 1
            this.getNList()
            this.btnLoading = false
        },
        rowClick(index,row){
            this.infoVisible = true
            this.infoList = {
                username:row.username,
                speak:row.speak,
                answer:row.answer,
                type:row.type,
                createTime:new Date(row.createTime).getFullYear()+'-'+checkTime(new Date(row.createTime).getMonth()+1)+'-'+checkTime(new Date(row.createTime).getDate())+' '+checkTime(new Date(row.createTime).getHours())+':'+checkTime(new Date(row.createTime).getMinutes()),
                updateTime:new Date(row.updateTime).getFullYear()+'-'+checkTime(new Date(row.updateTime).getMonth()+1)+'-'+checkTime(new Date(row.updateTime).getDate())+' '+checkTime(new Date(row.updateTime).getHours())+':'+checkTime(new Date(row.updateTime).getMinutes()),
                taskid:row.taskid,
                result:row.result
            }
        },
        n_rowClick(index,row){
            this.n_infoVisible = true
            this.n_infoList = {
                id:row.id,
                speak:row.speak,
                answer:row.answer,
                type:row.type,
                comm:row.comm,
                createTime:new Date(row.createTime).getFullYear()+'-'+checkTime(new Date(row.createTime).getMonth()+1)+'-'+checkTime(new Date(row.createTime).getDate())+' '+checkTime(new Date(row.createTime).getHours())+':'+checkTime(new Date(row.createTime).getMinutes()),
                updateTime:new Date(row.updateTime).getFullYear()+'-'+checkTime(new Date(row.updateTime).getMonth()+1)+'-'+checkTime(new Date(row.updateTime).getDate())+' '+checkTime(new Date(row.updateTime).getHours())+':'+checkTime(new Date(row.updateTime).getMinutes()),
                result:row.result
            }
            let n_stauts = {
                id:row.id
            }
            activitiStatus(n_stauts).then(res=>{
                // console.log(res)
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
        handleClose(){
            this.infoVisible = false
        },
        back_handleClose(){
            this.backVisible = false
        },
        handleConfirm(){
            this.infoVisible = false
        },
        n_handleSizeChange(val) {
            this.n_pageSize = val;
            this.n_currentPage = 1
            this.getNList();
        },
        n_handleCurrentChange(val) {
            this.n_currentPage = val
            // console.log(`当前页: ${val}`);
            this.getNList();
        },
        n_handleClose(){
            this.n_infoVisible = false
        },
        n_handleConfirm(){
            this.n_infoVisible = false
        },
        handlePass(){
            let passParams = {
                id:this.infoList.taskid,
                status:0
            }
            passParams.sign = deleteParams(passParams)
            activitiPass(passParams).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message:'审核通过',
                        type:"success",
                        duration:1000
                    });
                    this.infoVisible = false
                    this.getList()
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:"error",
                        duration:1000
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        handleBack(){
            this.backVisible = true
        },
        handleEnsure(){
            let pass_Params = {
                id:this.infoList.taskid,
                status:2,
                speak:this.infoList.backres
            }
            pass_Params.sign = deleteParams(pass_Params)
            activitiPass(pass_Params).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message:'已退回',
                        type:"success",
                        duration:1000
                    });
                    this.infoVisible = false
                    this.backVisible = false
                    this.getList()
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:"error",
                        duration:1000
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getList() {
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                username:this.searchItem.user,
                speak:this.searchItem.con
            }
            params.sign = deleteParams(params)
            activitiList(params).then(res=>{
                this.listLoading = false
                this.list = res.data.rows
                this.totalCount = res.data.total
                this.totalClass = res.data.rows.length
                if(res.data.total >= 1){
                    this.infoShow = true
                }
            })
        },
        getNList() {
            let n_params = {
                pgstr:this.n_currentPage,
                pcstr:this.n_pageSize,
                speak:this.n_searchItem.con
            }
            n_params.sign = deleteParams(n_params)
            activitinList(n_params).then(res=>{
                this.n_listLoading = false
                this.nlist = res.data.data
                this.n_totalCount = res.data.count
                this.totalClass = res.data.data.length
                if(res.data.count >= 1){
                    this.n_infoShow = true
                }
            })
        },
        getMenu(){
            let u_params = {
                 userName:sessionStorage.getItem('username'),
            }
            u_params.sign = deleteParams(u_params)
            userMenu(u_params).then(res=>{
                
            })
        }
        
    }
}
</script>
<style scoped>
.img{
    width: 45%;
    display: block;
    margin: 10px auto 0;
}
.el-main{
    background: #e3e3e3 !important;
}
.workflow{
    max-width: 610px;
    min-width: 600px;
    padding: 14px 14px 14px 13px;
    border-radius: 8px;
    box-sizing: border-box;
    border: none;
    position: fixed;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    right: 16px;
    overflow: hidden;
    height: 85%;
    top: 70px;
}

</style>

