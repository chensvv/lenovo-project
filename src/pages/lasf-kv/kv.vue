<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>LASF KV</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    
    <el-form :inline="true" class="demo-form-inline search_box" size="mini">
        <el-form-item>
            <el-button class="success" size="mini" @click="handleState()">报表配置</el-button>
            <el-button class="success" size="mini" @click="handleAdd()" v-has="'kv:editsave'">添加</el-button>
        </el-form-item>
        
    </el-form>
    <div class="table-box">
        <el-table
                :data="list"
                style="width: 100%"
                v-loading="listLoading">
                <el-table-column type="index" align="center">
                </el-table-column>
                <el-table-column
                    label="KEY"
                    prop="key"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="VAL"
                    prop="val"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="操作" align="center" width="200" v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'kv:update'">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table> 
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
        ></el-pagination>
    </div>
        <el-dialog title="编辑" :visible.sync="editVisible" width="300" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'left'" label-width="120px" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="修改密码" prop="lasfpsd">
                    <el-input type="text" v-model.trim="currentItem.lasfpsd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="LASF KEY" prop="lasfkey">
                    <el-input type="text" v-model.trim="currentItem.lasfkey" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="LASF VAL" prop="lasfval">
                    <el-input type="textarea" v-model.trim="currentItem.lasfval" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'left'" label-width="100px" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="修改密码" prop="lasfpsd">
                    <el-input type="text" v-model.trim="addList.lasfpsd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="LASF KEY" prop="lasfkey">
                    <el-input type="text" v-model.trim="addList.lasfkey" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="LASF VAL" prop="lasfval">
                    <el-input type="textarea" v-model.trim="addList.lasfval" auto-complete="off"></el-input>
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
import {kvList,kvAdd,kvUpd} from '@/config/api'
export default {
    data() {
        return {
            list: [],
            perList:[],
            addList: {//添加数据组
                lasfpsd:"",
                lasfkey:"",
                lasfval:""
            },
            currentItem:{
                lasfpsd:"",
                lasfkey:"",
                lasfval:""
            },
            columns: [
                {
                prop: "key",
                label: "KEY",
                hasSort:true
                },
                {
                prop: "val",
                label: "VAL",
                hasSort:true,
                className: 'reg'
                }
            ],
            addRules:{
                lasfpsd:[{ required: true, message: '请输入修改密码', trigger: 'change' }],
                lasfkey:[{ required: true, message: '请输入LASF KEY', trigger: 'change' }],
                lasfval:[{ required: true, message: '请输入LASF VAL', trigger: 'change' }],
            },
            editRules:{
                lasfpsd:[{ required: true, message: '请输入修改密码', trigger: 'change' }],
                lasfkey:[{ required: true, message: '请输入LASF KEY', trigger: 'change' }],
                lasfval:[{ required: true, message: '请输入LASF VAL', trigger: 'change' }],
            },
            addVisible: false,
            editVisible:false,
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            pageSizes:[10, 20, 30],
            totalCount:1,     // 总条数
            addBtnLoading:false,
            editBtnLoading:false,
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
        if(this.perList.indexOf('kv:update') == -1){
        this.isshow = false
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val
            console.log(`当前页: ${val}`);
            this.getList();
        },
        addHandleClose(){
            this.addVisible = false
        },
        handleAdd(){
            this.addVisible = true
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.editVisible = true;
            this.currentItem = {
                id:row.id,
                lasfkey: row.key,
                lasfval: row.val
            };
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
        editHandleConfirm(currentItem) {
            let updParams = {
                key:this.currentItem.lasfkey,
                pwd:this.currentItem.lasfpsd,
                val:this.currentItem.lasfval
            }
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    kvUpd(updParams).then(res=>{
                        this.editBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'修改成功',
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
                pwd:this.addList.lasfpsd,
                key:this.addList.lasfkey,
                val:this.addList.lasfval
            }
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    kvAdd(addParams).then(res=>{
                        this.addBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:1000
                            });
                            this.getList();
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
        getList() {
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            kvList(params).then(res => {
                this.listLoading = false
                this.list = res.data.data;
                this.totalCount = res.data.count
            });
        },
        handleState(){
            this.$router.push({
                path:'/gift/add'
            })
        }
    }
};
</script>

<style scoped>
</style>
