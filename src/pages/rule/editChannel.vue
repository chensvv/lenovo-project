<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规则定义</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/showmode/list'}">资源管理</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
        <el-form :label-position="'right'" label-width="100px" :rules="editRules" :model="currentItem" ref="currentItem">
        <el-form-item label="资源类型" prop="resTypeVal">
            <el-select v-model="currentItem.resTypeVal" clearable placeholder="请选择" @change="handleType">
                <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.context"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="视频类型" prop="resVideoTypeVal" v-if="videoShow">
            <el-select v-model="currentItem.resVideoTypeVal" placeholder="请选择" clearable>
                <el-option
                v-for="item in videoTypeList"
                :key="item.id"
                :label="item.context"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="资源渠道" prop="resChannelVal">
            <el-select v-model="currentItem.resChannelVal" clearable placeholder="请选择">
                <el-option
                v-for="item in channelList"
                :key="item.id"
                :label="item.context"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="PAD" prop="resPadFile">
          <div v-if="padOfterImg" class="img-box" @mouseenter="padEnter" @mouseleave="padLeave">
            <div class="x-box" v-show="padSeen">
              <img src="../../../static/images/close.png" class="x" @click="padEmpty()">
            </div>
            <img  :src="padOfterImg" class="oftimg">
          </div>
          <el-upload
            v-else
            :http-request="addUploadPad"
            :multiple="true"
            list-type="picture-card"
            :file-list="addPadProductImageList"
            :on-remove="addPadRemoveImage"
            :limit="1"
            :before-upload="addPadBeforeAvatarUpload"
            ref="addPadFileUpload"
            :auto-upload="false"
            :on-change="addPadSelectChange"
            action=""
            class="cropper-upload-box"
            >
            <i class="el-icon-upload"></i>
            </el-upload>
            <cropper
            v-if="addPadShowCropper"
            :dialog-visible="addPadShowCropper"
            :cropper-img="addPadCropperImg"
            :zoomScale="addPadZoomScale"
            @update-cropper="addPadUpdateCropper"
            @colse-dialog="addPadCloseDialog"
            @upload-img="addPadUploadImg"
            />
        </el-form-item>
        <el-form-item label="资源URL" prop="resPadLink">
          <el-input type="text" v-model.trim="currentItem.resPadLink" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <div v-if="phoneOfterImg" class="img-box" @mouseenter="phoneEnter" @mouseleave="phoneLeave">
            <div class="x-box" v-show="phoneSeen">
              <img src="../../../static/images/close.png" class="x" @click="phoneEmpty()">
            </div>
            <img  :src="phoneOfterImg" class="oftimg">
          </div>
          <el-upload
            v-else
            :http-request="addUploadPhone"
            :multiple="true"
            list-type="picture-card"
            :file-list="addPhoneProductImageList"
            :on-remove="addPhoneRemoveImage"
            :limit="1"
            :before-upload="addPhoneBeforeAvatarUpload"
            ref="addPhoneFileUpload"
            :auto-upload="false"
            :on-change="addPhoneSelectChange"
            action=""
            class="cropper-upload-box"
            >
            <i class="el-icon-upload"></i>
            </el-upload>
            <cropper
            v-if="addPhoneShowCropper"
            :dialog-visible="addPhoneShowCropper"
            :cropper-img="addPhoneCropperImg"
            :zoomScale="addPhoneZoomScale"
            @update-cropper="addPhoneUpdateCropper"
            @colse-dialog="addPhoneCloseDialog"
            @upload-img="addPhoneUploadImg"
            />
        </el-form-item>
        <el-form-item label="资源URL" prop="resPhoneLink">
          <el-input type="text" v-model.trim="currentItem.resPhoneLink" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源说明" prop="resState">
          <el-input type="text" v-model.trim="currentItem.resState" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源名称" prop="resName">
          <el-input type="text" v-model.trim="currentItem.resName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌手" prop="resSinger" v-if="singerShow">
          <el-input type="text" v-model.trim="currentItem.resSinger" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="专辑" prop="resAlbum" v-if="singerShow">
          <el-input type="text" v-model.trim="currentItem.resAlbum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源标签" prop="resLabel" v-if="labelShow">
          <el-input type="text" v-model.trim="currentItem.resLabel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP" prop="resVip">
            <el-select v-model="currentItem.resVip" clearable placeholder="--">
                <el-option v-for="(item,index) in selectList" :key="index" :label="item.typeLabel" :value="item.typeVal"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="付费" prop="resPay">
            <el-select v-model="currentItem.resPay" clearable placeholder="--">
                <el-option v-for="(item,index) in selectList" :key="index" :label="item.typeLabel" :value="item.typeVal"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="播放链接" prop="resPlayLink">
          <el-input type="text" v-model.trim="currentItem.resPlayLink" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机型配置" prop="resTypeCon">
            <el-select v-model="currentItem.resTypeCon" multiple placeholder="请选择">
                <el-option
                v-for="item in phoneTypeList"
                :key="item.id"
                :label="item.context"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </div>

  </div>
</template>

<script>
import Cropper from "@/components/cropper";
import { showModeUpd, configList} from '@/config/api'
export default {
  data() {
    return {
        padOfterImg:'',
        phoneOfterImg:'',
        channelList:[],//渠道
        typeList:[],//类型
        phoneTypeList:[],//机型
        videoTypeList:[],//视频类型
        datas:[],
        currentItem: {//添加数据组
            resTypeVal:"",
            resVideoTypeVal:"",
            resChannelVal:"",
            resPadFile:null,
            resPhoneFile:null,
            resPadLink:"",
            resPhoneLink:"",
            resState:"",
            resName:"",
            resVip:"",
            resPay:"",
            resPlayLink:"",
            resTypeCon:[],
            resSinger:'',
            resAlbum:'',
            resLabel:''
        },
        selectList:[
            {typeLabel:"是",typeVal:1},
            {typeLabel:"否",typeVal:0}
        ],
        editRules:{
            resTypeVal:[{ required: true, message: '请选择资源类型', trigger: 'change' }],
            resVideoTypeVal:[{ required: true, message: '请选择视频类型', trigger: 'change' }],
            resChannelVal:[{ required: true, message: '请选择资源渠道', trigger: 'change' }],
            resState:[{ required: true, message: '请输入资源说明', trigger: 'change' }],
            resName:[{ required: true, message: '请输入资源名称', trigger: 'change' }],
            resVip:[{ required: true, message: '请选择是否VIP', trigger: 'change' }],
            resPay:[{ required: true, message: '请选择是否付费', trigger: 'change' }],
            resPlayLink:[{ required: true, message: '请输入播放链接', trigger: 'change' }],
            resTypeCon:[{ required: true, message: '请选择机型配置', trigger: 'change' }],
            resSinger:[{ required: true, message: '请输入歌手', trigger: 'change' }],
            resAlbum:[{ required: true, message: '请输入专辑', trigger: 'change' }],
            resLabel:[{ required: true, message: '请输入资源标签', trigger: 'change' }]
        },
        addPadProductImageList: [],
        addPhoneProductImageList: [],
        addPadDefaultImgList:[],
        addPhoneDefaultImgList:[],
        addPadZoomScale:[1,1],
        addPhoneZoomScale:[1,1],
        addPadShowCropper: false, // 是否显示裁剪框
        addPhoneShowCropper: false, // 是否显示裁剪框
        addPadCropperImg: "", // 需要裁剪的图片
        addPhoneCropperImg: "", // 需要裁剪的图片
        editBtnLoading:false,
        singerShow:false,
        labelShow:false,
        padSeen:false,
        phoneSeen:false
        };
  },
  components: {
    Cropper
  },
  watch: {
    addPadDefaultImgList: {
      handler: function(newVal, oldVal){
        this.addPadProductImageList = newVal   // 赋值
      },
      deep: true
    },
    addPhoneDefaultImgList: {
      handler: function(newVal, oldVal){
        this.addPhoneProductImageList = newVal   // 赋值
      },
      deep: true
    }
  },
  created() {
      this.datas = JSON.parse(this.$route.query.data)
      this.padOfterImg = this.datas.padImg
      this.phoneOfterImg = this.datas.phoneImg
      this.currentItem = {
        id:this.datas.id,
        resTypeVal:this.datas.type,
        resVideoTypeVal:this.datas.subtype,
        resChannelVal:this.datas.channel,
        resPadLink:this.datas.padImg,
        resPhoneLink:this.datas.phoneImg,
        resState:this.datas.description,
        resName:this.datas.name,
        resVip:this.datas.vip,
        resPay:this.datas.paid,
        resPlayLink:this.datas.playUrl,
        resTypeCon:JSON.parse("[" + this.datas.modelConfig + "]"),
        resSinger:this.datas.singer,
        resAlbum:this.datas.album,
        resLabel:this.datas.label
      }
      if(this.datas.type == 9){
            this.singerShow = true
            this.labelShow = false
            this.videoShow = false
            this.currentItem.resVideoTypeVal = ''
            this.currentItem.resLabel = ''
        }else if(this.datas.type == 10){
            this.labelShow = true
            this.singerShow = false
            this.videoShow = false
            this.currentItem.resVideoTypeVal = ''
            this.currentItem.resSinger = ''
            this.currentItem.resAlbum = ''
        }else{
            this.labelShow = false
            this.singerShow = false
            this.videoShow = true
            this.currentItem.resSinger = ''
            this.currentItem.resAlbum = ''
            this.currentItem.resLabel = ''
            this.getVideoTypeList()
        }
    this.getChannelList()
    this.getTypeList()
    this.getPhoneTypeList()
  },
  methods: {
    padEnter(){
      this.padSeen = true
    },
    padLeave(){
      this.padSeen = false
    },
    padEmpty(){
      this.padOfterImg = ''
      this.currentItem.resPadFile = null
    },
    phoneEnter(){
      this.phoneSeen = true
    },
    phoneLeave(){
      this.phoneSeen = false
    },
    phoneEmpty(){
      this.phoneOfterImg = ''
      this.currentItem.resPhoneFile = null
    },
      // 图片上传裁剪函数
    addPadBeforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;     // 原图片
      // const isLt2M = this.uploadFile.size / 1024 / 1024 < 1;     //裁剪后的图片（会比原图片大很多，应该是转成Blob的原因导致）
      // if (!isLt2M) {
      //   this.$message.error("上传图片大小不能超过 2MB!");
      //   this.noCanUpload = true     // 如果这里被拦截，将自动删除不能上传的图片
      //   return false
      // }
    },
    addPadRemoveImage(file, fileList) {
      const index = this.addPadProductImageList.findIndex(item => {
        return item.uid == file.uid;
      });
      if (index > -1) {
        this.addPadProductImageList.splice(index, 1);
      }
      this.$emit('getUploadImg', this.addPadProductImageList)   // 把最新上传的图片列表返回
    },
    // 更新图片
    addPadUpdateCropper() {
      if(!this.noCanUpload){
        let fileList = this.$refs.addPadFileUpload.uploadFiles        // 获取文件列表
        let index02 = fileList.findIndex(item => {        // 把取消裁剪的图片删除
          return item.uid == this.currentFile.uid;
        });
        fileList.splice(index02, 1)
      }
 
      let index = this.$refs.addPadFileUpload.$children.length - 1;
      this.$refs.addPadFileUpload.$children[index].$el.click();
    },
    // 关闭窗口
    addPadCloseDialog() {
      this.addPadShowCropper = false;
      if(!this.noCanUpload){
        let fileList = this.$refs.addPadFileUpload.uploadFiles        // 获取文件列表
        let index = fileList.findIndex(item => {        // 把取消裁剪的图片删除
          return item.uid == this.currentFile.uid;
        });
        fileList.splice(index, 1)
      }
    },
    addPadUploadImg(file) {
      this.uploadFile = file;
      this.currentItem.resPadFile = file
      // this.$refs.fileUpload.submit();
      // 判断裁剪后图片的宽高
      let img =  new Image()
      img.src = window.URL.createObjectURL(file);     // Blob转成url 才能给img显示
      this.padOfterImg = img.src
      img.onload = () => {
        let minProp = Math.min(img.width, img.height)  //裁剪后的图片宽，高  ==> 取最小值
        // if( minProp < 500){     // 如果最小值比设置的最小值（默认为500）小
        //   this.$message.error(`请保证图片短边最小为500`);
        //   return false
        // }
        // console.log(this.$refs.fileUpload.uploadFiles[0].raw)
        // this.$refs.fileUpload.submit();
        this.addPadShowCropper = false;
      }
    },
    addPadSelectChange(file) {
        // console.log(file)
      this.noCanUpload = false
      let files = file.raw;
      console.log('files:'+files)
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.addPadCropperImg = data;
 
        // 图片图片尺寸，如果是正方形，则直接上传；否则调用裁剪
        // let img =  new Image()
        // img.src = this.addPadCropperImg;
        // img.onload = () => {
        //   if(img.width == img.height){    // 本来就是正方形 => 直接上传
        //     this.uploadFile = files;
        //     this.$refs.addPadFileUpload.submit();   // 调用上传方法
        //   }else{
            this.addPadShowCropper = true;      // 不是正方形的图片才开启裁剪
            this.currentFile = file       // 保存当前操作裁剪的图片
        //   }
        // }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(files);
      
      // this.showCropper = true;     // 默认开启裁剪
    },

      // 图片上传裁剪函数
    addPhoneBeforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;     // 原图片
      // const isLt2M = this.uploadFile.size / 1024 / 1024 < 1;     //裁剪后的图片（会比原图片大很多，应该是转成Blob的原因导致）
      // if (!isLt2M) {
      //   this.$message.error("上传图片大小不能超过 2MB!");
      //   this.noCanUpload = true     // 如果这里被拦截，将自动删除不能上传的图片
      //   return false
      // }
    },
    addPhoneRemoveImage(file, fileList) {
      const index = this.addPhoneProductImageList.findIndex(item => {
        return item.uid == file.uid;
      });
      if (index > -1) {
        this.addPhoneProductImageList.splice(index, 1);
      }
      this.$emit('getUploadImg', this.addPhoneProductImageList)   // 把最新上传的图片列表返回
    },
    // 更新图片
    addPhoneUpdateCropper() {
      if(!this.noCanUpload){
        let fileList = this.$refs.addPhoneFileUpload.uploadFiles        // 获取文件列表
        let index02 = fileList.findIndex(item => {        // 把取消裁剪的图片删除
          return item.uid == this.currentFile.uid;
        });
        fileList.splice(index02, 1)
      }
 
      let index = this.$refs.addPhoneFileUpload.$children.length - 1;
      this.$refs.addPhoneFileUpload.$children[index].$el.click();
    },
    // 关闭窗口
    addPhoneCloseDialog() {
      this.addPhoneShowCropper = false;
      if(!this.noCanUpload){
        let fileList = this.$refs.addPhoneFileUpload.uploadFiles        // 获取文件列表
        let index = fileList.findIndex(item => {        // 把取消裁剪的图片删除
          return item.uid == this.currentFile.uid;
        });
        fileList.splice(index, 1)
      }
    },
    addPhoneUploadImg(file) {
      this.uploadFile = file;
      this.currentItem.resPhoneFile = file
      // this.$refs.fileUpload.submit();
      // 判断裁剪后图片的宽高
      let img =  new Image()
      img.src = window.URL.createObjectURL(file);     // Blob转成url 才能给img显示
      this.phoneOfterImg = img.src
      img.onload = () => {
        let minProp = Math.min(img.width, img.height)  //裁剪后的图片宽，高  ==> 取最小值
        // if( minProp < 500){     // 如果最小值比设置的最小值（默认为500）小
        //   this.$message.error(`请保证图片短边最小为500`);
        //   return false
        // }
        // console.log(this.$refs.fileUpload.uploadFiles[0].raw)
        // this.$refs.fileUpload.submit();
        this.addPhoneShowCropper = false;
      }
    },
    addPhoneSelectChange(file) {
        // console.log(file)
      this.noCanUpload = false
      let files = file.raw;
      console.log('files:'+files)
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.addPhoneCropperImg = data;
 
        // 图片图片尺寸，如果是正方形，则直接上传；否则调用裁剪
        // let img =  new Image()
        // img.src = this.addPadCropperImg;
        // img.onload = () => {
        //   if(img.width == img.height){    // 本来就是正方形 => 直接上传
        //     this.uploadFile = files;
        //     this.$refs.addPadFileUpload.submit();   // 调用上传方法
        //   }else{
            this.addPhoneShowCropper = true;      // 不是正方形的图片才开启裁剪
            this.currentFile = file       // 保存当前操作裁剪的图片
        //   }
        // }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(files);
      
      // this.showCropper = true;     // 默认开启裁剪
    },
    handleType(value){
        if(value == 9){
            this.singerShow = true
            this.labelShow = false
            this.videoShow = false
            this.currentItem.resVideoTypeVal = ''
            this.currentItem.resLabel = ''
        }else if(value == 10){
            this.labelShow = true
            this.singerShow = false
            this.videoShow = false
            this.currentItem.resVideoTypeVal = ''
            this.currentItem.resSinger = ''
            this.currentItem.resAlbum = ''
        }else{
            this.labelShow = false
            this.singerShow = false
            this.videoShow = true
            this.currentItem.resSinger = ''
            this.currentItem.resAlbum = ''
            this.currentItem.resLabel = ''
            this.getVideoTypeList()
        }
    },
    editHandleConfirm(currentItem) {
        if(this.currentItem.resPadFile == null && this.currentItem.resPadLink == ''){
          this.$message({
              message:'请选择Pad资源图片或输入资源url',
              type:"warning",
              duration:2000
          });
        }else if(this.currentItem.resPhoneFile != null || this.currentItem.resPhoneLink != ''){
          let updParams = new FormData()
          updParams.append('id',this.currentItem.id)
          updParams.append('type',this.currentItem.resTypeVal)
          updParams.append('subType',this.currentItem.resVideoTypeVal)
          updParams.append('channel',this.currentItem.resChannelVal)
          updParams.append('padImg',this.currentItem.resPadLink)
          updParams.append('phoneImg',this.currentItem.resPhoneLink)
          updParams.append('padFile',this.currentItem.resPadFile)
          updParams.append('phoneFile',this.currentItem.resPhoneFile)
          updParams.append('description',this.currentItem.resState)
          updParams.append('name',this.currentItem.resName)
          updParams.append('vip',this.currentItem.resVip)
          updParams.append('paid',this.currentItem.resPay)
          updParams.append('playUrl',this.currentItem.resPlayLink)
          updParams.append('modelConfig',this.currentItem.resTypeCon)
          updParams.append('singer',this.currentItem.resSinger)
          updParams.append('album',this.currentItem.resAlbum)
          updParams.append('label',this.currentItem.resLabel)
          this.$refs[currentItem].validate((valid) => {
            if (valid) {
              this.editBtnLoading = true
              showModeUpd(updParams).then(res=>{
                this.editBtnLoading = false
                if(res.data.code == 200){
                    this.$message({
                        message:'编辑成功',
                        type:"success",
                        duration:1000
                    });
                    this.editVisible = false
                    this.$router.push({
                      path:'/showmode/list'
                    })
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
        }else{
          this.$message({
              message:'请选择Phone资源图片或输入资源url',
              type:"warning",
              duration:2000
          });
        }
    },
    addHandleClose(){
      this.$router.push({
          path:'/showmode/list'
      })
    },
    getChannelList(){
        let configParams = {
          parentCode:1
      }
      configList(configParams).then(res=>{
          this.channelList = res.data.data
      })
    },
    getTypeList(){
        let configParams = {
          parentCode:2
      }
      configList(configParams).then(res=>{
          this.typeList = res.data.data
      })
    },
    getPhoneTypeList(){
        let configParams = {
          parentCode:3
      }
      configList(configParams).then(res=>{
          this.phoneTypeList = res.data.data
      })
    },
    getVideoTypeList(){
        let configParams = {
          parentCode:this.currentItem.resTypeVal
      }
      configList(configParams).then(res=>{
          this.videoTypeList = res.data.data
      })
    }
  }
};
</script>

<style scoped>
.img-box{
  position: relative;
  width: 500px;
}
.x-box{
    position: absolute;
    color: #fff;
    width: 100%;
    height: 20%;
    text-align: right;
    background-image: -webkit-gradient(linear,left top, left bottom,from(rgba(255,255,255,0)),color-stop(100%, #000));
    background-image: linear-gradient(0deg,rgba(255,255,255,0) 0%,#000 100%);
}
.x{
  width: 15px;
  height: 15px;
  cursor: pointer;
  padding-right: 15px;
  padding-top: 10px;
}
.img-box .oftimg{
  width: 100%;
}
</style>
