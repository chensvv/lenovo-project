<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/skill/applist'}">技能管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form v-if="commandForm" :inline="true" ref="commandSearchItem" :model="commandSearchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="用户query" prop="command">
                    <el-input v-model.trim="commandSearchItem.command" clearable></el-input>
                </el-form-item>
            </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="commandOnSubmit" :loading="commandSeaBtnLoading">查询</el-button>
                <el-button size="mini" @click="commandHandleAdd()" v-has="'command:add'">添加</el-button>
                <!-- <el-button size="mini" @click="handleSong()" v-has="'command:norun:list'">指令忽略管理</el-button>
                <el-button size="mini" @click="handleOriginal()" v-has="'command:mainlist'">原始指令管理</el-button> -->
            </div>
            
        </el-form>
        <el-form v-if="norunForm" :inline="true" ref="norunSearchItem" :model="norunSearchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="用户query" prop="command">
                    <el-input v-model.trim="norunSearchItem.command" clearable></el-input>
                </el-form-item>
            </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="norunOnSubmit" :loading="norunSeaBtnLoading">查询</el-button>
                <el-button size="mini" @click="norunHandleAdd()" v-has="'command:norun:add'">添加</el-button>
            </div>
            
        </el-form>
        <el-form v-if="originaForm" :inline="true" ref="originaSearchItem" :model="originaSearchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="用户query" prop="command">
                    <el-input v-model.trim="originaSearchItem.command" clearable></el-input>
                </el-form-item>
            </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="originaOnSubmit" :loading="originaSeaBtnLoading">查询</el-button>
                <el-button size="mini" @click="originaHandleAdd()" v-has="'command:mainadd'">添加</el-button>
            </div>
            
        </el-form>
        <div class="table-box">
             <el-tabs type="card" v-model="activeName" @tab-click="handleClickTabs">
                <el-tab-pane label="相似度命令关联" name="command" class="flex-align">
                    <el-table
                        :data="commandList"
                        stripe
                        :class="this.commandTotalClass <= '7' ? 'limitWidth' :''"
                        style="width: 100%"
                        v-loading="commandListLoading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        :key="activeName">
                        <el-table-column type="index" align="center" label="#">
                        </el-table-column>
                        <el-table-column
                            label="用户query"
                            prop="command"
                            align="left">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.command" placement="top">
                                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                    {{ scope.row.command }}
                                    </div>
                                </el-tooltip>
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                    {{ scope.row.command }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="预设指令"
                            prop="commandSeged"
                            align="left">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.commandSeged" placement="top">
                                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                    {{ scope.row.commandSeged }}
                                    </div>
                                </el-tooltip>
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                    {{ scope.row.commandSeged }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="功能描述"
                            prop="commandSegedDelStop"
                            align="left">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.commandSegedDelStop" placement="top">
                                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                    {{ scope.row.commandSegedDelStop }}
                                    </div>
                                </el-tooltip>
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                    {{ scope.row.commandSegedDelStop }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="修改时间"
                            prop="updateTime"
                            align="center" 
                            :formatter="formTime2"
                            with="130">
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="80" v-if="commandIsshow">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="danger"
                                v-has="'command:delete'"
                                @click="commandHandleDel(scope.$index, scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-wrap" v-cloak>
                        <ul class="pagination">
                            <li><button :disabled="commandCurrentPage==1? true : false" @click="commandTurnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                            <li v-if="commandCurrentPage == getpageNum(commandTotalCount) && commandCurrentPage !=1 && commandCurrentPage - 2 > 0" class="unum" @click="commandTurnToPage(commandCurrentPage-2)" v-text="commandCurrentPage-2"></li>
                            <li v-if="commandCurrentPage-1>0"  class="unum" @click="commandTurnToPage(commandCurrentPage-1)" v-text="commandCurrentPage-1"></li>
                            <li class="active" @click="commandTurnToPage(commandCurrentPage)" v-text="commandCurrentPage"></li>
                            <li v-if="commandCurrentPage != getpageNum(commandTotalCount) && getpageNum(commandTotalCount) !=0 " class="unum" @click="commandTurnToPage(commandCurrentPage+1)" v-text="commandCurrentPage+1"></li>
                            <li v-if="commandCurrentPage+1 < 3 && commandCurrentPage != getpageNum(commandTotalCount) && getpageNum(commandTotalCount) >=3" class="unum" @click="commandTurnToPage(commandCurrentPage+2)" v-text="commandCurrentPage+2"></li>
                            <li><button :disabled="commandCurrentPage == getpageNum(commandTotalCount) || getpageNum(commandTotalCount) == 0 ? true: false" @click="commandTurnToPage(getpageNum(commandTotalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="指令忽略管理" name="norun">
                    <el-table
                        :data="norunList"
                        stripe
                        :class="this.norunTotalClass <= '7' ? 'limitWidth' :''"
                        style="width: 100%"
                        v-loading="norunListLoading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        :key="activeName">
                        <el-table-column type="index" align="center" label="#">
                        </el-table-column>
                        <el-table-column
                            label="用户query"
                            prop="command"
                            align="left">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.command" placement="top">
                                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                    {{ scope.row.command }}
                                    </div>
                                </el-tooltip>
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                    {{ scope.row.command }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="修改时间"
                            prop="updateTime"
                            align="center"
                            :formatter="formTime2"
                            width="130">
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="80" v-if="norunIsshow">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="danger"
                                v-has="'command:norun:delete'"
                                @click="norunHandleDel(scope.$index, scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-wrap" v-cloak>
                        <ul class="pagination">
                            <li><button :disabled="norunCurrentPage==1? true : false" @click="norunTurnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                            <li v-if="norunCurrentPage == getpageNum(norunTotalCount) && norunCurrentPage !=1 && norunCurrentPage - 2 > 0" class="unum" @click="norunTurnToPage(norunCurrentPage-2)" v-text="norunCurrentPage-2"></li>
                            <li v-if="norunCurrentPage-1>0"  class="unum" @click="norunTurnToPage(norunCurrentPage-1)" v-text="norunCurrentPage-1"></li>
                            <li class="active" @click="norunTurnToPage(norunCurrentPage)" v-text="norunCurrentPage"></li>
                            <li v-if="norunCurrentPage != getpageNum(norunTotalCount) && getpageNum(norunTotalCount) !=0" class="unum" @click="norunTurnToPage(norunCurrentPage+1)" v-text="norunCurrentPage+1"></li>
                            <li v-if="norunCurrentPage+1 < 3 && norunCurrentPage != getpageNum(norunTotalCount) && getpageNum(norunTotalCount) >=3" class="unum" @click="norunTurnToPage(norunCurrentPage+2)" v-text="norunCurrentPage+2"></li>
                            <li><button :disabled="norunCurrentPage == getpageNum(norunTotalCount) || getpageNum(norunTotalCount) == 0 ? true: false" @click="norunTurnToPage(getpageNum(norunTotalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="原始指令管理" name="origina">
                    <el-table
                        :data="originaList"
                        stripe
                        :class="this.originaTotalClass <= '7' ? 'limitWidth' :''"
                        style="width: 100%"
                        v-loading="originaListLoading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        :key="activeName">
                        <el-table-column type="index" align="center" label="#">
                        </el-table-column>
                        <el-table-column
                            label="用户query"
                            prop="command"
                            align="left">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.command" placement="top">
                                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                    {{ scope.row.command }}
                                    </div>
                                </el-tooltip>
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                    {{ scope.row.command }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="预设指令"
                            prop="commandInterface"
                            align="left">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.commandInterface" placement="top">
                                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                    {{ scope.row.commandInterface }}
                                    </div>
                                </el-tooltip>
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                    {{ scope.row.commandInterface }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="添加时间"
                            prop="createTime"
                            align="center"
                            :formatter="formTime"
                            with="130">
                        </el-table-column>
                        <el-table-column
                            label="修改时间"
                            prop="updateTime"
                            align="center"
                            :formatter="formTime2"
                            width="130">
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="130" v-if="originaIsshow">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)"
                                v-has="'command:mainupdate'">编辑</el-button>
                                <el-button
                                size="mini"
                                type="danger"
                                @click="originaHandleDel(scope.$index, scope.row)"
                                v-has="'command:maindelete'">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-wrap" v-cloak>
                        <ul class="pagination">
                            <li><button :disabled="originaCurrentPage==1? true : false" @click="originaTurnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                            <li v-if="originaCurrentPage == getpageNum(originaTotalCount) && originaCurrentPage !=1 && originaCurrentPage - 2 > 0" class="unum" @click="originaTurnToPage(originaCurrentPage-2)" v-text="originaCurrentPage-2"></li>
                            <li v-if="originaCurrentPage-1>0"  class="unum" @click="originaTurnToPage(originaCurrentPage-1)" v-text="originaCurrentPage-1"></li>
                            <li class="active" @click="originaTurnToPage(originaCurrentPage)" v-text="originaCurrentPage"></li>
                            <li v-if="originaCurrentPage != getpageNum(originaTotalCount) && getpageNum(originaTotalCount) !=0" class="unum" @click="originaTurnToPage(originaCurrentPage+1)" v-text="originaCurrentPage+1"></li>
                            <li v-if="originaCurrentPage+1 < 3 && originaCurrentPage != getpageNum(originaTotalCount) && getpageNum(originaTotalCount) >=3" class="unum" @click="originaTurnToPage(originaCurrentPage+2)" v-text="originaCurrentPage+2"></li>
                            <li><button :disabled="originaCurrentPage == getpageNum(originaTotalCount) || getpageNum(originaTotalCount) == 0? true: false" @click="originaTurnToPage(getpageNum(originaTotalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="commandAddVisible" width="40%" top="10vh" :before-close="commandAddHandleClose" @open="commandOpenFun('commandAddList')">
            <el-form :label-position="'right'" label-width="130px" size="small" :rules="commandAddRules" :model="commandAddList" ref="commandAddList">
                <el-form-item label="用户query" prop="command">
                    <el-input type="text" v-model.trim="commandAddList.command" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="预设指令" prop="interFaceId" class="el__select">
                    <el-select v-model="commandAddList.interFaceId" placeholder="--" clearable filterable>
                        <el-option v-for="(item,index) in sourceList" :key="index" :label="item.command" :value="item.id">
                            <span style="float: left">{{ item.command }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.commandInterface }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="commandAddHandleClose">取 消</el-button>
                <el-button type="primary" @click="commandAddHandleConfirm('commandAddList')" :loading="commandAddBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="norunAddVisible" width="40%" top="10vh" :before-close="norunAddHandleClose" @open="norunOpenFun('norunAddList')">
            <el-form :label-position="'right'" label-width="130px" size="small" :rules="norunAddRules" :model="norunAddList" ref="norunAddList">
                <el-form-item label="用户query" prop="command">
                    <el-input type="text" v-model.trim="norunAddList.command" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="norunAddHandleClose">取 消</el-button>
                <el-button type="primary" @click="norunAddHandleConfirm('norunAddList')" :loading="norunAddBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="originaAddVisible" width="40%" top="10vh" :before-close="originaAddHandleClose" @open="originaOpenFun('originaAddList')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="originaAddRules" :model="originaAddList" ref="originaAddList">
                <el-form-item label="用户query" prop="command">
                    <el-input type="text" v-model.trim="originaAddList.command" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="预设指令" prop="interface">
                    <el-input type="text" v-model.trim="originaAddList.interface" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="originaAddHandleClose">取 消</el-button>
                <el-button type="primary" @click="originaAddHandleConfirm('originaAddList')" :loading="originaAddBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="用户query" prop="command">
                    <el-input type="text" v-model.trim="currentItem.command" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="预设指令" prop="interface">
                    <el-input type="text" v-model.trim="currentItem.interface" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {commandList, commandDel, commandEcho, commandAdd, norunList, norunDel, norunAdd,originalList,originalAdd,originalUpd,originalDel} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {getpageNum} from '@/utils/pagination.js'
export default {
    data() {
        return {
            getpageNum:getpageNum,
            commandList: [],
            norunList: [],
            originaList: [],
            perList:[],
            sourceList:[],
            commandTotalClass:'8',
            norunTotalClass:'8',
            originaTotalClass:'8',
            activeName:'command',
            commandAddList: {//添加数据组
                command:"",
                interFaceId:""
            },
            norunAddList: {//添加数据组
                command:"",
                interFaceId:""
            },
            originaAddList:{
                command:"",
                interface:""
            },
            currentItem:{
                command:"",
                interface:""
            },
            commandSearchItem:{//搜索数据组
                command:"",
            },
            norunSearchItem:{//搜索数据组
                command:"",
            },
            originaSearchItem:{//搜索数据组
                command:"",
            },
            norunAddRules:{
                command: [{ required: true, message: '请输入用户query', trigger: 'change' }],
            },
            commandAddRules:{
                command: [{ required: true, message: '请输入用户query', trigger: 'change' }],
                interFaceId: [{ required: true, message: '请选择预设指令', trigger: 'change' }],
            },
            originaAddRules:{
                command:[{ required: true, message: '请输入用户query', trigger: 'change' }],
                interface:[{ required: true, message: '请输入预设指令', trigger: 'change' }],
            },
            editRules:{
                command:[{ required: true, message: '请输入关键字', trigger: 'change' }],
                interface:[{ required: true, message: '请输入预设指令', trigger: 'change' }],
            },
            commandAddVisible: false,
            norunAddVisible: false,
            originaAddVisible: false,
            // 分页
            commandCurrentPage: 1, //默认显示第几页
            norunCurrentPage: 1, //默认显示第几页
            originaCurrentPage: 1, //默认显示第几页
            commandPageSize: 10,   //默认每页条数
            norunPageSize: 10,   //默认每页条数
            originaPageSize: 10,   //默认每页条数
            commandTotalCount:1,     // 总条数
            norunTotalCount:1,     // 总条数
            originaTotalCount:1,     // 总条数
            showTitle:true,
            commandSeaBtnLoading:false,
            norunSeaBtnLoading:false,
            originaSeaBtnLoading:false,
            commandAddBtnLoading:false,
            norunAddBtnLoading:false,
            originaAddBtnLoading:false,
            editVisible: false,
            editBtnLoading:false,
            commandListLoading:true,
            norunListLoading:true,
            originaListLoading:true,
            commandIsshow:true,
            norunIsshow:true,
            originaIsshow:true,
            commandForm:true,
            norunForm:false,
            originaForm:false
        };
    },
    created() {
        let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
        perArr.map(t=>{
            this.perList.push(Object.values(t).join())
        })
        this.getCommandList();
        this.getNorunList()
        this.getOriginaList();
    },
    mounted(){
        if(this.perList.indexOf('command:delete') == -1){
            this.commandIsshow = false
        }
        if(this.perList.indexOf('command:norun:delete') == -1){
            this.norunIsshow = false
        }
        if(this.perList.indexOf('command:mainupdate') == -1 && this.perList.indexOf('command:maindelete') == -1){
            this.originaIsshow = false
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
        formTime2(row, column){
            var timer = row.updateTime
            var date = new Date(timer)
                return date.getFullYear()+'-'+
                    checkTime(date.getMonth()+1)+'-'+
                    checkTime(date.getDate())+' '+
                    checkTime(date.getHours())+':'+
                    checkTime(date.getMinutes())
        },
        commandOnSubmit(){
            this.commandSeaBtnLoading = true
            this.commandCurrentPage = 1
            this.getCommandList()
            this.commandSeaBtnLoading = false
        },
        norunOnSubmit(){
            this.norunSeaBtnLoading = true
            this.norunCurrentPage = 1
            this.getNorunList()
            this.norunSeaBtnLoading = false
        },
        originaOnSubmit(){
            this.originaSeabtnLoading = true
            this.originaCurrentPage = 1
            this.getOriginaList();
            this.originaSeabtnLoading = false
        },
        commandHandleSizeChange(val) {
            this.commandPageSize = val;
            this.commandCurrentPage = 1
            this.getCommandList();
        },
        norunHandleSizeChange(val) {
            this.norunPageSize = val;
            this.norunCurrentPage = 1
            this.getNorunList();
        },
        originaHandleSizeChange(val) {
            this.originaPageSize = val;
            this.originaCurrentPage = 1
            this.getOriginaList();
        },
        commandHandleCurrentChange(val) {
            this.currentPage = val
            // console.log(`当前页: ${val}`);
            this.getCommandList();
        },
        norunHandleCurrentChange(val) {
            this.norunCurrentPage = val
            // console.log(`当前页: ${val}`);
            this.getNorunList();
        },
        originaHandleCurrentChange(val) {
            this.originaCurrentPage = val
            //   console.log(`当前页: ${val}`);
            this.getOriginaList();
        },
        commandHandleDel(index, row) {
            let delParams = {
                id:row.id
            }
            delParams.sign = deleteParams(delParams)
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                commandDel(delParams).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message:'删除成功',
                            type:"success",
                            duration:2000
                        });
                        this.getCommandList();
                    }else{
                        if(res.data.code != undefined){
                            this.$message({
                                message:res.data.code+'：'+res.data.msg,
                                type:'error',
                                duration:2000
                            });
                        }
                    }
                    
                })
            }).catch(err => {
                console.log(err);
            });
        },
        norunHandleDel(index, row) {
            let delsParams = {
                id:row.id
            }
            delsParams.sign = deleteParams(delsParams)
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                norunDel(delsParams).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message:'删除成功',
                            type:"success",
                            duration:2000
                        });
                        this.getNorunList();
                    }else{
                        if(res.data.code != undefined){
                            this.$message({
                                message:res.data.code+'：'+res.data.msg,
                                type:'error',
                                duration:2000
                            });
                        }
                    }
                    
                })
            }).catch(err => {
                console.log(err);
            });
        },
        originaHandleDel(index, row) {
            let delParams = {
                id:row.id
            }
            delParams.sign = deleteParams(delParams)
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                originalDel(delParams).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message:'删除成功',
                            type:"success",
                            duration:2000
                        });
                        this.getOriginaList();
                    }else{
                        if(res.data.code != undefined){
                            this.$message({
                                message:res.data.code+'：'+res.data.msg,
                                type:'error',
                                duration:2000
                            });
                        }
                    }
                    
                })
            }).catch(err => {
                console.log(err);
            });
        },
        commandOpenFun(commandAddList){
            this.$nextTick(() => {
                if(this.$refs[commandAddList]){
                    this.$refs[commandAddList].resetFields();
                }
            })
        },
        norunOpenFun(norunAddList){
            this.$nextTick(() => {
                if(this.$refs[norunAddList]){
                    this.$refs[norunAddList].resetFields();
                }
            })
        },
        originaOpenFun(originaAddList){
            this.$nextTick(() => {
                if(this.$refs[originaAddList]){
                    this.$refs[originaAddList].resetFields();
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
        handleEdit(index, row) {
            this.editVisible = true;
            this.currentItem = {
                id:row.id,
                command: row.command,
                interface: row.commandInterface
            };
        },
        editHandleClose() {
            this.editVisible = false;
        },
        commandAddHandleClose(){
            this.commandAddVisible = false
        },
        norunAddHandleClose(){
            this.norunAddVisible = false
        },
        originaAddHandleClose(){
            this.originaAddVisible = false
        },
        commandHandleAdd(){
            commandEcho().then(res=>{
                this.sourceList = res.data
            })
            this.commandAddVisible = true
        },
        norunHandleAdd(){
            this.norunAddVisible = true
        },
        originaHandleAdd(){
            this.originaAddVisible = true
        },
        editHandleConfirm(currentItem) {
            let updParams = {
                id:this.currentItem.id,
                command:this.currentItem.command,
                commandInterface:this.currentItem.interface
            }
            updParams.sign = deleteParams(updParams)
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    originalUpd(updParams).then(res=>{
                        this.editBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'编辑成功',
                                type:"success",
                                duration:2000
                            });
                            this.getOriginaList()
                            this.editVisible = false
                        }else{
                            if(res.data.code != undefined){
                                this.$message({
                                    message:res.data.code+'：'+res.data.msg,
                                    type:'error',
                                    duration:2000
                                });
                            }
                        }
                        
                    }).catch(err => {
                        this.editBtnLoading = false
                    })
                } else {
                    return false;
                }
            });
        },
        commandAddHandleConfirm(commandAddList) {
            let addParams={
                command:this.commandAddList.command,
                interfaceId:this.commandAddList.interFaceId
            }
            addParams.sign = deleteParams(addParams)
            this.$refs[commandAddList].validate((valid) => {
                if (valid) {
                    this.commandAddBtnLoading = true
                    commandAdd(addParams).then(res=>{
                        this.commandAddBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:2000
                            });
                            this.getCommandList();
                            this.commandAddVisible = false
                        }else{
                            if(res.data.code != undefined){
                                this.$message({
                                    message:res.data.code+'：'+res.data.msg,
                                    type:'error',
                                    duration:2000
                                });
                            }
                        }
                        
                    }).catch(err => {
                        this.commandAddBtnLoading = false
                    })
                } else {
                    return false;
                }
            });
        },
        norunAddHandleConfirm(norunAddList) {
            let addParams={
                command:this.norunAddList.command
            }
            addParams.sign = deleteParams(addParams)
            this.$refs[norunAddList].validate((valid) => {
                if (valid) {
                    this.norunAddBtnLoading = true
                    norunAdd(addParams).then(res=>{
                        this.norunAddBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:2000
                            });
                            this.getNorunList();
                            this.norunAddVisible = false
                        }else{
                            if(res.data.code != undefined){
                                this.$message({
                                    message:res.data.code+'：'+res.data.msg,
                                    type:'error',
                                    duration:2000
                                });
                            }
                        }
                        
                    })
                    .catch(err => {
                        this.norunAddBtnLoading = false
                    })
                } else {
                    return false;
                }
            });
        },
        originaAddHandleConfirm(originaAddList) {
            let addParams={
                command:this.originaAddList.command,
                interfaceId:this.originaAddList.interface,
            }
            addParams.sign = deleteParams(addParams)
            this.$refs[originaAddList].validate((valid) => {
                if (valid) {
                    this.originaAddBtnLoading = true
                    originalAdd(addParams).then(res=>{
                        this.originaAddBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:2000
                            });
                            this.getOriginaList();
                            this.originaAddVisible = false
                        }else{
                            if(res.data.code != undefined){
                                this.$message({
                                    message:res.data.code+'：'+res.data.msg,
                                    type:'error',
                                    duration:2000
                                });
                            }
                        }
                        
                    }).catch(err => {
                        this.originaAddBtnLoading = false
                    })
                } else {
                    return false;
                }
            });
        },
        handleClickTabs(tab, event){
            if(tab.name == "norun"){
                this.commandForm = false
                this.originaForm = false
                this.norunForm = true
            }else if(tab.name == "origina"){
                this.commandForm = false
                this.norunForm = false
                this.originaForm = true
            }else{
                this.originaForm = false
                this.norunForm = false
                this.commandForm = true
            }
        },
        commandTurnToPage(pageNum){
            var ts = this;
            var pageNum = parseInt(pageNum);
            if(pageNum == -1){
                ts.getCommandList(pageNum)
            }else{
                ts.commandCurrentPage = pageNum
                if (!pageNum || pageNum < 1) {
                    console.log('页码输入有误！');
                    return false;
                }else{
                    ts.getCommandList(pageNum)
                }
            }
        },
        norunTurnToPage(pageNum){
            var ts = this;
            var pageNum = parseInt(pageNum);
            if(pageNum == -1){
                ts.getNorunList(pageNum)
            }else{
                ts.norunCurrentPage = pageNum
                if (!pageNum || pageNum < 1) {
                    console.log('页码输入有误！');
                    return false;
                }else{
                    ts.getNorunList(pageNum)
                }
            }
        },
        originaTurnToPage(pageNum){
            var ts = this;
            var pageNum = parseInt(pageNum);
            if(pageNum == -1){
                ts.getOriginaList(pageNum)
            }else{
                ts.originaCurrentPage = pageNum
                if (!pageNum || pageNum < 1) {
                    console.log('页码输入有误！');
                    return false;
                }else{
                    ts.getOriginaList(pageNum)
                }
            }
        },
        getCommandList() {
            this.commandListLoading = true
            let params = {
                command:this.commandSearchItem.command,
                pgstr:this.commandCurrentPage,
                pcstr:this.commandPageSize
            }
            params.sign = deleteParams(params)
            commandList(params).then(res => {
                this.commandListLoading = false
                if(res.data.code == 200){
                    this.commandList = res.data.data;
                    this.commandTotalCount = res.data.count
                    this.commandTotalClass = res.data.data.length
                }else{
                    Message.closeAll()
                    if(res.data.code != undefined){
                        this.$message({
                            message:res.data.code+'：'+res.data.msg,
                            type:'error',
                            duration:2000
                        });
                    }
                }
            }).catch(()=>{
                this.commandListLoading = false
            })
        },
        getNorunList() {
            this.norunListLoading = true
            let params = {
                command:this.norunSearchItem.command,
                pgstr:this.norunCurrentPage,
                pcstr:this.norunPageSize
            }
            params.sign = deleteParams(params)
            norunList(params).then(res => {
                this.norunListLoading = false
                if(res.data.code == 200){
                    this.norunList = res.data.data;
                    this.norunTotalCount = res.data.count
                    this.norunTotalClass = res.data.data.length
                }else{
                    Message.closeAll()
                    if(res.data.code != undefined){
                        this.$message({
                            message:res.data.code+'：'+res.data.msg,
                            type:'error',
                            duration:2000
                        });
                    }
                }
            }).catch(()=>{
                this.norunListLoading = false
            })
        },
        getOriginaList() {
        this.originaListLoading = true
            let params = {
                pgstr:this.originaCurrentPage,
                pcstr:this.originaPageSize,
                command:this.originaSearchItem.command,
            }
            params.sign = deleteParams(params)
            originalList(params).then(res => {
                this.originaListLoading = false
                if(res.data.code == 200){
                    this.originaList = res.data.data;
                    this.originaTotalCount = res.data.count
                    this.originaTotalClass = res.data.data.length
                }else{
                    Message.closeAll()
                    if(res.data.code != undefined){
                        this.$message({
                            message:res.data.code+'：'+res.data.msg,
                            type:'error',
                            duration:2000
                        });
                    }
                }
            }).catch(()=>{
                this.originaListLoading = false
            })
        },
        handleSong(){
            this.$router.push({
                path:'/command/norun/list'
            })
        },
        handleOriginal(){
            this.$router.push({
                path:'/command/mainlist'
            })
        }
    },
};
</script>

<style scoped>
</style>
