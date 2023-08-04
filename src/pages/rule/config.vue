<template>
  <div class="table carousel">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search_box add-widths">
      <el-button class="success" size="mini"  @click="handleGray()">灰度配置</el-button>
      <el-button class="success" size="mini" @click="handleHistory()">历史版本</el-button>
    </div>
    
    <div class="table-box">
      <el-carousel :autoplay="false"  height="250px">
        <el-carousel-item v-for="(item, index) in newData" :key="index">
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
          @right-check-change="rightCheckChange"
          @change="handleChange">
            <el-button class="transfer-footer" slot="right-footer" size="mini" type="primary" icon="el-icon-top" @click="handleUp(index)">上移</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="mini" type="primary" icon="el-icon-bottom" @click="handleDown(index)">下移</el-button>
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
      <div class="perch-box"></div>
    </div>
    
  </div>
</template>

<script>
import { showModeAll, showModeSave, carouselListEnable, grayList,} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
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
      sort:'',
      item:'',
      index:''
    };
  },
  created() {
      this.getList();
      this.getGrayList()
  },
  methods: {
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
    rightCheckChange(value){
      let that = this
      that.item = value
    },
    handleUp(item, index) {
      //   item为选中的项    index为对应的index
      let self = this;
      item = self.item; //选中值
      if (item.length == 1) { //  因为右侧的选项是可以多选，但这里的上下移动事件，我做的是单项上移，每次上移一个空间，所以判断，当我的选中值只有一个选项时，进行上移操作
      //选中值的下标 
      self.value.find((val, indexs, arr) => { // find()方法 val-项，indexs-下标，arr数组
          if (val == item) { //  value数组的项val等于我选中的项item
            index = indexs; // 数组项的下标就是我当前选中项的下标
          }
        });
        if (index == 0) { //当选择的项的下标为0，即第一个，则提醒没有上移的空间，选择其他项进行上移
          self.$message.warning("没有上移的空间了");
          return;
        }
        // 上移-改变的数组（项和下标同时改变）
        let changeItem = JSON.parse(JSON.stringify(self.value[index - 1]));
        self.value.splice(index - 1, 1);
        self.value.splice(index, 0, changeItem);
      } else {
        self.$message.warning("只能选择一条数据进行上下移动");
        return;
      }
    },
    handleDown(item, index) {
      let self = this;
      item = self.item;
      if (item.length == 1) {
          //选中值的下标
        self.value.find((val, indexs, arr) => {
          if (val == item) {
            index = indexs;
          }
        });
        if (index == self.value.length-1) {  // 这里是length-1,因为下标值从0开始
          self.$message.warning("没有下移的空间了");
          return;
        }
        let changeItem = JSON.parse(JSON.stringify(self.value[index]));
        self.value.splice(index,1);
        self.value.splice(index + 1, 0, changeItem);
      } else {
        self.$message.warning("只能选择一条数据进行上下移动");
        return;
      }
    },
    // onSubmit(){
    //   showModeSave(this.value).then(res=>{
    //     if(res.data.code == 200){
    //         this.$message({
    //             message:'保存成功',
    //             type:"success",
    //             duration:1500
    //         });
    //     }else{
    //         this.$message({
    //             message:res.data.errorMessage,
    //             type:"error",
    //             duration:1500
    //         });
    //     }
    //   })
    // },
    preview(){
      this.newData.splice(0, this.newData.length)
      for(let i = 0;i<this.value.length;i++){
        let obj = this.allData.find((j)=>{
          return j.id === this.value[i]
        })
        this.newData.push(obj)
      }
    },
    addHandleConfirm(addList){
      if(this.value.length == 0){
          this.$message({
              message:'请选择发布资源',
              type:"warning",
              duration:1500
          });
      }else{
        let addParams = {
          version:this.addList.version,
          resources:this.value.join(),
          grayId:this.addList.gray.join()
        }
        addParams.sign = deleteParams(addParams)
        this.$refs[addList].validate((valid) => {
          if (valid) {
            this.addBtnLoading = true
            showModeSave(addParams).then(res=>{
              this.addBtnLoading = false
              if(res.data.code == 200){
                this.$message({
                      message:'发布成功',
                      type:"success",
                      duration:1500
                  });
                  this.$refs[addList].resetFields();
              }else{
                this.$message({
                      message:res.data.errorMessage,
                      type:"error",
                      duration:1500
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
    handleGray(){
      this.$router.push({
        path:'/showmode/gray'
      })
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
  margin: 0 auto;
}
</style>
