<template>
    <div class="table audio">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>服务管理</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" class="demo-form-inline cache height50" size="mini">
            <el-form-item class="sub-btn">
                <el-button size="mini" @click="handleAdd()" v-has="'audiokeeper:add'">添加</el-button>
            </el-form-item>
            
        </el-form>
        <div class="table-box">
             <el-table
            :data="list"
            :class="this.totalClass <= '9' ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading">
            <el-table-column type="index" align="left" >
            </el-table-column>
            <el-table-column
                label="ip"
                prop="ipAddress"
                align="left"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="端口"
                prop="port"
                align="left"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="权重"
                prop="weight"
                align="left"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="场景"
                prop="scene"
                align="left"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="语言"
                prop="language"
                 align="left"
                 :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="比率"
                prop="rate"
                align="left"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="来源"
                prop="channel"
                align="left"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="操作" align="center"  v-if="isshow">
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
        <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="totalCount"
        ></el-pagination> -->
        </div>
         
        
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
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
    </div>
</template>

<script>
import {audiokeeperList, audiokeeperExpire, audiokeeperAdd} from '@/config/api'
export default {
    data(){
        return{
            addList: {//添加数据组
                ipAddress:"",
                port:"",
                weight:"",
                scene:"",
                language:"",
                rate:"",
                channel:""
            },
            list:[],
            perList:[],
            totalClass:'',
            addRules:{
                ipAddress:[{ required: true, message: '请输入ip地址', trigger: 'change' }],
                port:[{ required: true, message: '请输入端口', trigger: 'change' }],
                weight:[{ required: true, message: '请输入权重', trigger: 'change' }],
                scene:[{ required: true, message: '请输入场景', trigger: 'change' }],
                language:[{ required: true, message: '请输入语言', trigger: 'change' }],
                rate:[{ required: true, message: '请输入比率', trigger: 'change' }],
                channel:[{ required: true, message: '请输入来源', trigger: 'change' }],
            },
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            btnLoading:false,
            addVisible:false,
            addBtnLoading:false,
            listLoading:true,
            isshow:true
        }
    },
    created() {
        let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
        perArr.map(t=>{
            this.perList.push(Object.values(t).join())
        })
        this.getList();
    },
    mounted(){
        if(this.perList.indexOf('app:cachedel') == -1){
            this.isshow = false
        }
    },
    methods:{
        getList() {
            this.listLoading = true
            let params = {
            }
            audiokeeperList(params).then(res => {
                this.listLoading = false
                this.list = JSON.parse(res.data.data)
                this.totalClass = JSON.parse(res.data.data).length
            });
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
            audiokeeperExpire(delParams).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                            message:'操作成功',
                            type:"success",
                            duration:1000
                        });
                        this.getList();
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
        this.$refs[addList].validate((valid) => {
            if (valid) {
                this.addBtnLoading = true
                audiokeeperAdd(addParams).then(res => {
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
}
}
</script>

<style scoped>

</style>
