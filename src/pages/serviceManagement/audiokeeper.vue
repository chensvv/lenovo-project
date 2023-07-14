<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/audiokeeper/list'}">服务管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" label-width="90px" class="demo-form-inline height70 width130" size="mini" style="padding-left:10px;">
            <div class="form-btn">
                <el-button size="mini" @click="handleAdd()" v-has="'audiokeeper:add'">添加</el-button>
                <el-button size="mini" @click="handleRecovery()" v-has="'audiokeeper:add'">恢复</el-button>
            </div>
            
        </el-form>
        <div class="table-box">
             <el-table
            :data="list"
            stripe
            :class="this.totalClass <= '9' ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
            <el-table-column type="index" align="center" label="#">
            </el-table-column>
            <el-table-column
                label="ip"
                prop="ipAddress"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.ipAddress" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.ipAddress }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.ipAddress }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="端口"
                prop="port"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.port" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.port }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.port }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="权重"
                prop="weight"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.weight" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.weight }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.weight }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="场景"
                prop="scene"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.scene" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.scene }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.scene }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="语言"
                prop="language"
                 align="center">
                 <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.language" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.language }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.language }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="比率"
                prop="rate"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.rate" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.rate }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.rate }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="来源"
                prop="channel"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.channel" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.channel }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.channel }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="80" v-if="isshow">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="warning"
                     v-has="'audiokeeper:expire'"
                    @click="handleBtn(scope.$index, scope.row)"
                    >过期</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-wrap" v-cloak>
            <ul class="pagination">
                <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                <li v-if="currentPage == getpageNum(totalCount) && currentPage !=1 && currentPage - 2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
                <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
                <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
                <li v-if="currentPage != getpageNum(totalCount) && getpageNum(totalCount) !=0" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
                <li v-if="currentPage+1 < 3 && currentPage != getpageNum(totalCount) && getpageNum(totalCount) >=3" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
                <li><button :disabled="currentPage == getpageNum(totalCount) || getpageNum(totalCount) == 0 ? true : false" @click="turnToPage(getpageNum(totalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
            </ul>
        </div>
        </div>
         
        
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="ip" prop="ipAddress">
                    <el-input type="text" v-model.trim="addList.ipAddress"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="端口" prop="port">
                    <el-input type="text" v-model.trim="addList.port" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="权重" prop="weight">
                    <el-input type="text" v-model.trim="addList.weight" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="场景" prop="scene">
                    <el-input type="text" v-model.trim="addList.scene" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="语言" prop="language">
                    <el-input type="text" v-model.trim="addList.language" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="比率" prop="rate">
                    <el-input type="text" v-model.trim="addList.rate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="来源" prop="channel">
                    <el-input type="text" v-model.trim="addList.channel" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="恢复" :visible.sync="recoveryVisible" width="40%" top="10vh" :before-close="recoveryHandleClose" @open="openFun('recoveryList')">
            <el-form :label-position="'right'" label-width="100px" size="small" :rules="recoveryRules" :model="recoveryList" ref="recoveryList">
                <el-form-item label="ip" prop="ipAddress">
                    <el-input type="text" v-model.trim="recoveryList.ipAddress"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="端口" prop="port">
                    <el-input type="text" v-model.trim="recoveryList.port" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="recoveryHandleClose">取 消</el-button>
                <el-button type="primary" @click="recoveryHandleConfirm('recoveryList')" :loading="recoveryBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {audiokeeperList, audiokeeperExpire, audiokeeperAdd, audiokeeperRecovery} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {getpageNum} from '@/utils/pagination.js'
export default {
    data(){
        return{
            getpageNum:getpageNum,
            addList: {//添加数据组
                ipAddress:"",
                port:"",
                weight:"",
                scene:"",
                language:"",
                rate:"",
                channel:""
            },
            recoveryList: {
                ipAddress:"",
                port:""
            },
            list:[],
            data:[],
            perList:[],
            totalClass:'8',
            addRules:{
                ipAddress:[{ required: true, message: '请输入ip地址', trigger: 'change' }],
                port:[{ required: true, message: '请输入端口', trigger: 'change' }],
                weight:[{ required: true, message: '请输入权重', trigger: 'change' }],
                scene:[{ required: true, message: '请输入场景', trigger: 'change' }],
                language:[{ required: true, message: '请输入语言', trigger: 'change' }],
                rate:[{ required: true, message: '请输入比率', trigger: 'change' }],
                channel:[{ required: true, message: '请输入来源', trigger: 'change' }],
            },
            recoveryRules:{
                ipAddress:[{ required: true, message: '请输入ip地址', trigger: 'change' }],
                port:[{ required: true, message: '请输入端口', trigger: 'change' }],
            },
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            btnLoading:false,
            addVisible:false,
            recoveryVisible:false,
            addBtnLoading:false,
            recoveryBtnLoading:false,
            listLoading:true,
            isshow:true
        }
    },
    created() {
        let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
        perArr.map(t=>{
            this.perList.push(Object.values(t).join())
        })
        this.pageList();
    },
    mounted(){
        if(this.perList.indexOf('app:cachedel') == -1){
            this.isshow = false
        }
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
        pageList() {
            this.listLoading = true
            let params = {}
            audiokeeperList(params).then(res => {
                this.listLoading = false
                if(res.data.code == 200){
                    this.data = JSON.parse(res.data.data)
                    this.getList()
                }else{
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
            }).catch(()=>{
                this.listLoading = false
            })
        },
        turnToPage(pageNum){
            var ts = this;
            var pageNum = parseInt(pageNum);
            if(pageNum == -1){
                ts.getList(pageNum)
            }else{
                ts.currentPage = pageNum
                if (!pageNum || pageNum < 1) {
                    console.log('页码输入有误！');
                    return false;
                }else{
                    ts.getList(pageNum)
                }
            }
        },
        getList() {
            this.listLoading = false
            this.list = this.data.filter((item, index) =>
                index < this.currentPage * this.pageSize && index >= this.pageSize * (this.currentPage - 1)
            )
            this.totalCount = this.data.length
            this.totalClass = this.list.length
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1
            this.listLoading = true
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.listLoading = true
            // console.log(`当前页: ${val}`);
            this.getList();
        },
        handleBtn(index, row){
            let delParams = {
                ipAddress:row.ipAddress,
                port:row.port
            }
            delParams.sign = deleteParams(delParams)
            audiokeeperExpire(delParams).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message:'操作成功',
                        type:"success",
                        duration:2000
                    });
                        this.pageList();
                }else{
                    this.$message.error('错误')
                }
            })
    },
    openFun(addList){
        this.$nextTick(() => {
            if(this.$refs[addList]){
                this.$refs[addList].resetFields();
            }
        })
    },
    addHandleClose(){
        this.addVisible = false
    },
    handleAdd(){
        this.addVisible = true
    },
    recoveryHandleClose(){
        this.recoveryVisible = false
    },
    handleRecovery(){
        this.recoveryVisible = true
    },
    addHandleConfirm(addList) {
        let addParams = {
            ipAddress:this.addList.ipAddress,
            port:this.addList.port,
            weight:this.addList.weight,
            scene:this.addList.scene,
            language:this.addList.language,
            rate:this.addList.rate,
            channel:this.addList.channel
        }
        addParams.sign = deleteParams(addParams)
        this.$refs[addList].validate((valid) => {
            if (valid) {
                this.addBtnLoading = true
                audiokeeperAdd(addParams).then(res => {
                        this.addBtnLoading = false
                    if(res.data.code == 200){
                        this.$message({
                            message:'添加成功',
                            type:"success",
                            duration:2000
                        });
                        this.pageList()
                        this.addVisible = false
                    }else{
                        this.$message({
                            message:res.data.code+'：'+res.data.msg,
                            type:"error",
                            duration:2000
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
    recoveryHandleConfirm(recoveryList) {
        let recoveryParams = {
            ipAddress:this.recoveryList.ipAddress,
            port:this.recoveryList.port,
        }
        recoveryParams.sign = deleteParams(recoveryParams)
        this.$refs[recoveryList].validate((valid) => {
            if (valid) {
                this.recoveryBtnLoading = true
                audiokeeperRecovery(recoveryParams).then(res => {
                        this.recoveryBtnLoading = false
                    if(res.data.code == 200){
                        this.$message({
                            message:'恢复成功',
                            type:"success",
                            duration:2000
                        });
                        this.pageList()
                        this.recoveryVisible = false
                    }else{
                        this.$message({
                            message:res.data.code+'：'+res.data.msg,
                            type:"error",
                            duration:2000
                        });
                    }
                    
                }).catch(err => {
                    this.recoveryBtnLoading = false
                })
            } else {
                return false;
            }
        });
    },
}
}
</script>

<style scoped>

</style>
