<template>
    <div class="table height-135">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/csc/csc'}">IOT领域</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height100 width130" size="mini">
            <div class="form-input height100">
                <el-form-item label="Lenovoid" prop="lenovoid">
                    <el-input v-model.trim="searchItem.lenovoid" clearable></el-input>
                </el-form-item>
                <el-form-item label="日志类型" prop="logType">
                    <el-select v-model="searchItem.logType" placeholder="--" clearable>
                        <el-option label="控制" value="1"></el-option>
                        <el-option label="拉取" value="2"></el-option>
                        <el-option label="设备属性查询" value="3"></el-option>
                        <el-option label="设备属性上报" value="5"></el-option>
                        <el-option label="场景上报" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="appId" prop="appId">
                    <el-input v-model.trim="searchItem.appId" clearable></el-input>
                </el-form-item>
                <el-form-item label="bodyName" prop="bodyName">
                    <el-input v-model.trim="searchItem.bodyName" clearable></el-input>
                </el-form-item>
                <el-form-item label="resultName" prop="resultName">
                    <el-input v-model.trim="searchItem.resultName" clearable></el-input>
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
                    label="Lenovoid"
                    prop="lenovoid"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.lenovoid" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.lenovoid }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.lenovoid }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="applianceid"
                    prop="applianceid"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.applianceid" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.applianceid }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.applianceid }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="bodyName"
                    prop="bodyName"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.bodyName" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.bodyName }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.bodyName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="body"
                    prop="body"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.body" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.body }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.body }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="result"
                    prop="result"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.result" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.result }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.result }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="resultName"
                    prop="resultName"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.resultName" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.resultName }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.resultName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="添加时间"
                    prop="createTime"
                    align="center"
                    :formatter="formTime">
                </el-table-column>
            </el-table>
            <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :class="lastNone ? 'lastNone':'lastBlock'"
            ></el-pagination> -->
            <div class="pagination-wrap" v-cloak>
                <ul class="pagination">
                    <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                    <!-- <li><button :disabled="currentPage==1? true : false" @click="turnToPage(currentPage-1)"><i class="el-icon-arrow-left"></i></button></li> -->
                    <li v-if="isLastPage != false && currentPage !=1 && currentPage-2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
                    <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
                    <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
                    <li v-if="isLastPage != true" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
                    <li v-if="currentPage+1 < 3 && isLastPage !=true" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
                    <!-- <li><button :disabled="lastPage!= 0 && isLastPage == true? true: false" @click="turnToPage(currentPage+1)" ><i class="el-icon-arrow-right"></i></button></li> -->
                    <li><button :disabled="lastPage!= 0 && isLastPage == true? true: false" @click="turnToPage(-1)"><i class="el-icon-d-arrow-right"></i></button></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {iotLogList } from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
    data() {
        return {
            list: [],
            perList:[],
            totalClass:'8',
            searchItem:{//搜索数据组
                lenovoid:"",
                logType:"",
                appId:"",
                bodyName:"",
                resultName:"",
                pickerVal:[]
            },
            lastNone:'',
            infoItem:[],
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            infoVisible:false,
            seaBtnLoading:false,
            listLoading:true,
            isshow:true,
            isPageNumberError:false,
            lastPage:0,
            MaxId:"",
            MinId:"",
            nextPage:"",
            isLastPage:false,
            lastCurrentPage:""
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
        if(this.perList.indexOf('iot:pull') == -1 && this.perList.indexOf('iot:delete') == -1 && this.perList.indexOf('iot:info') == -1){
            this.isshow = false
        }
    },
    filters:{
        timer(val){
            var date = new Date(val)
                return date.getFullYear()+'-'+
                    checkTime(date.getMonth()+1)+'-'+
                    checkTime(date.getDate())+' '+
                    checkTime(date.getHours())+':'+
                    checkTime(date.getMinutes())
        }
    },
    watch:{
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
        onSubmit(){
            this.seaBtnLoading = true
            // this.currentPage = 1
            this.getList()
            this.seaBtnLoading = false
        },
        turnToPage(pageNum){
            console.log(pageNum)
            var ts = this;
            var pageNum = parseInt(pageNum);
            if(pageNum == -1){
                ts.lastPage = -1
                ts.getList(pageNum)
            }else{
                // ts.currentPage = pageNum
                if (!pageNum || pageNum < 1) {
                    console.log('页码输入有误！');
                    ts.isPageNumberError = true;
                    return false;
                }else{
                    ts.lastPage = 0
                    ts.getList(pageNum)
                    ts.isPageNumberError = false;
                }
            }
        },
        getList(pageNum) {
            this.listLoading = true
            let params = {
                lenovoid:this.searchItem.lenovoid,
                logType:this.searchItem.logType,
                startStr:this.searchItem.pickerVal[0],
                endStr:this.searchItem.pickerVal[1],
                appId:this.searchItem.appId,
                bodyName:this.searchItem.bodyName,
                resultName:this.searchItem.resultName,
                pgstr:this.nextPage,
                pcstr:this.pageSize,
                maxId:this.MaxId,
                minId:this.MinId,
                nextPage:pageNum == 1 || pageNum == undefined ? '1' : pageNum,
                currentPage:this.lastCurrentPage
            }
            params.sign = deleteParams(params)
            iotLogList(params).then(res => {
                this.listLoading = false
                if(res.status == 200){
                    this.list = res.data.data;
                    // this.totalCount = res.data.count
                    this.totalClass = res.data.data.length
                    this.MaxId = Math.max.apply(Math, this.list.map(function(o) {return o.id}))
                    this.MinId = Math.min.apply(Math, this.list.map(function(o) {return o.id}))
                    this.isLastPage = res.data.lastPage
                    this.lastCurrentPage = res.data.currentPage
                    this.currentPage = res.data.currentPage
                    if(res.data.lastPage == true){
                        this.lastPage = -1
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
    },
};
</script>

<style scoped>
/* .lastNone .el-pagination .el-pager li:nth-last-child(1){	
    display: none;
}

.lastBlock .el-pagination .el-pager li:nth-last-child(1){
    display: inline-block;
} */

</style>
