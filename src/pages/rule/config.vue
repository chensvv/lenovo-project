<template>
  <div class="carousel">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规则定义</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search_box add-widths">
      <el-button class="success" size="mini" v-has="'gray:add'" @click="handleAddGray()">新增灰度</el-button>
      <el-button class="success" size="mini" @click="handleHistory()">历史版本</el-button>
    </div>
    
    <div class="table-box">
      <el-carousel :autoplay="false"  height="250px">
        <el-carousel-item v-for="item in newData" :key="item">
          <img :src="item.padImg" class="carousel-img">
        </el-carousel-item>
      </el-carousel>
      <div class="transfer">
        <el-transfer 
        filterable
        v-model="value" 
        :data="data" 
        :titles="['待发布资源', '预发布资源']" 
        target-order="push"
        @left-check-change="leftCheckChange($event)"
        @change="handleChange">
        </el-transfer>
      </div>
      <div class="btn-box">
        <!-- <el-button type="primary" @click="onSubmit">保存</el-button> -->
        <el-button @click="preview()">预览</el-button>
      </div>
      <div class="add-widths">
        <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" class="add-width" ref="addList">
          <el-form-item label="版本号" prop="version">
            <el-input type="text" v-model.trim="addList.version" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="选择灰度" prop="gray">
            <el-select v-model="addList.gray" multiple placeholder="不选为不灰度">
                <el-option
                v-for="item in grayList"
                :key="item.grayId"
                :label="item.name"
                :value="item.grayId">
                </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-con-footer">
          <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading" v-has="'showmode:savePublish'">发 布</el-button>
        </span>
      </div>
    </div>
    <el-dialog title="新增灰度" :visible.sync="editVisible" width="300" :before-close="editHandleClose" @close="openFun('currentItem')">
      <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model.trim="currentItem.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="context">
          <el-input type="text" v-model.trim="currentItem.context" auto-complete="off"></el-input>
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
import { showModeAll, showModeSave, carouselListEnable, grayList, grayAdd} from '@/config/api'
export default {
  data() {
    return {
      value: [],
      data:[],
      allData:[],
      newData:[],
      grayList:[],
      addList:{
        version:'',
        gray:[]
      },
      currentItem: {//编辑数据组
        name:"",
        context:""
      },
      addRules:{
        version:[{ required: true, message: '请输入版本号', trigger: 'change' }],
      },
      editRules:{
        name:[{ required: true, message: '请输入名称', trigger: 'blur' }], 
        context:[{ required: true, message: '请输入内容', trigger: 'blur' }], 
      },
      addBtnLoading:false,
      editVisible:false,
      editBtnLoading:false
    };
  },
  created() {
      this.getList();
      this.getGrayList()
  },
  methods: {
    openFun(currentItem){
      this.$nextTick(() => {
        if(this.$refs[currentItem]){
          this.$refs[currentItem].resetFields();
        }
      })
    },
    leftCheckChange(e){
        if(e.length >1){
          e.pop()
          this.$message({
            message: '单次只能选择一个',
            type: 'warning',
            duration: 1000
          })
        }
    },
    handleChange(value, direction, movedKeys){
      if(value.length>10){
          value.pop()
          this.$message({
            message: '最多可选10个',
            type: 'warning',
            duration: 1000
          })
        }
    },
    // onSubmit(){
    //   showModeSave(this.value).then(res=>{
    //     if(res.data.code == 200){
    //         this.$message({
    //             message:'保存成功',
    //             type:"success",
    //             duration:1000
    //         });
    //     }else{
    //         this.$message({
    //             message:res.data.errorMessage,
    //             type:"error",
    //             duration:1000
    //         });
    //     }
    //   })
    // },
    preview(){
      this.newData = []
      for(var i = 0;i<this.value.length;i++){
        var obj = this.allData.find((j)=>{
          return j.id === this.value[i]
        })
        this.newData.push(obj)
        // console.log(this.newData)
      }
    },
    addHandleConfirm(addList){
      if(this.value.length == 0){
          this.$message({
              message:'请选择发布资源',
              type:"warning",
              duration:1000
          });
      }else{
        let addParams = {
          version:this.addList.version,
          resources:this.value.join(),
          grayId:this.addList.gray.join()
        }
        this.$refs[addList].validate((valid) => {
          if (valid) {
            this.addBtnLoading = true
            showModeSave(addParams).then(res=>{
              this.addBtnLoading = false
              if(res.data.code == 200){
                this.$message({
                      message:'发布成功',
                      type:"success",
                      duration:1000
                  });
                  this.$refs[addList].resetFields();
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
          }else{
            return false;
          }
        })
      }
    },
    handleAddGray(){
      this.editVisible = true
    },
    editHandleClose(){
      this.editVisible = false
    },
    editHandleConfirm(currentItem) {
      let updParams = {
        name:this.currentItem.name,
        currentContext:this.currentItem.context
      }
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          grayAdd(updParams).then(res=>{
                this.editBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'新增成功',
                    type:"success",
                    duration:1000
                });
                this.getGrayList()
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
    handleHistory(){
      this.$router.push({
        path:'/showmode/history'
      })
    },
    getList() {
      showModeAll().then(res => {
        this.allData = res.data.data;
        for(let i = 0; i < this.allData.length; i++) {
					this.data.push({
						key: this.allData[i].id,
            label: this.allData[i].name,
            disabled: false
					});
				}
      });
      
      // carouselListEnable().then(res=>{
      //   this.value = res.data.data.map(function (item) {
      //     return item['id']; 
      //   }); 
      //   this.newData = res.data.data
      // })
    },
    getGrayList(){
      let grayParams = {

      }
      grayList(grayParams).then(res=>{
        this.grayList = res.data.data
      })
    }
  }
};
</script>

<style scoped>
.btn-box{
    text-align: center;
    padding-top: 10px;
}
.transfer{
  margin-top: 15px;
}
.carousel-img{
  width: 100%;
  height: 100%;
}
.add-widths{
  width: 800px;
  margin: 15px auto;
}
</style>
