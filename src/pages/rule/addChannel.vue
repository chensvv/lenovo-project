<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规则定义</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/showmode/list'}">资源管理</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
        <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="资源类型" prop="resTypeVal">
            <el-select v-model="addList.resTypeVal" placeholder="请选择" clearable @change="handleType">
                <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.context"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="视频类型" prop="resVideoTypeVal" v-if="videoShow">
            <el-select v-model="addList.resVideoTypeVal" placeholder="请选择" clearable>
                <el-option
                v-for="item in videoTypeList"
                :key="item.id"
                :label="item.context"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="资源渠道" prop="resChannelVal">
            <el-select v-model="addList.resChannelVal" clearable placeholder="请选择">
                <el-option
                v-for="item in channelList"
                :key="item.id"
                :label="item.context"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="PAD" prop="resPadFile">
          <div id="demo">
              <!-- 遮罩层 -->
              <div class="father" v-show="padPanel">
                  <div class="container">
                      <div id="cropper" style="margin-top:1%;margin-left: 1%;margin-right: 1%;height: 85%;margin-bottom: 1%">
                          <img id="padImage" :src="padUrl" alt="Picture">
                      </div>
                      <div style="text-align: right; padding: 0 10px 5px;">
                          <div>
                          <!-- <el-button icon="el-icon-zoom-out" @click="zoom(-1)" size="mini" circle></el-button>
                          <el-button icon="el-icon-zoom-in" @click="zoom(1)" size="mini" circle></el-button>
                          <el-button icon="el-icon-refresh" @click="rotate" size="mini" circle></el-button> -->
                          <el-button type="danger" @click="padPanel=false" size="mini">取消</el-button>
                          <el-button type="success" @click="padCrop" size="mini">确定</el-button>
                          </div>
                      </div>
                  </div>
              </div>
              <div>
                  <div>
                      <input type="file" id="padChange" accept="image" @change="padChange" style="display:none;">
                      <div class="show" :style="'backgroundImage:url('+padHeaderImage+');'">
                      <i class="el-icon-plus i" :style="'color: '+padColor"
                          v-on:mouseover="padAddClassload"
                          v-on:mouseout="padRemoveClassload"
                          @click="padUpload"
                      ></i>
                      <i class="el-icon-delete i remove-btn" :style="'color: '+padDelColor"
                          v-if="padRemoveBtn"
                          v-on:mouseover="padDelClassload"
                          v-on:mouseout="padDelReClassload"
                          @click="padRemoveUpload"
                      ></i>
                      </div>
                  </div>
                  <el-button @click="padTailor" v-if="padBtnShow" size="mini">裁剪</el-button>
              </div>
          </div>
        </el-form-item>
        <el-form-item label="资源URL" prop="resPadLink">
          <el-input type="text" v-model.trim="addList.resPadLink" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <div id="demo">
              <!-- 遮罩层 -->
              <div class="father" v-show="phonePanel">
                  <div class="container">
                      <div id="cropper" style="margin-top:1%;margin-left: 1%;margin-right: 1%;height: 85%;margin-bottom: 1%">
                          <img id="phoneImage" :src="phoneUrl" alt="Picture">
                      </div>
                      <div style="text-align: right; padding: 0 10px 5px;">
                          <div>
                          <!-- <el-button icon="el-icon-zoom-out" @click="zoom(-1)" size="mini" circle></el-button>
                          <el-button icon="el-icon-zoom-in" @click="zoom(1)" size="mini" circle></el-button>
                          <el-button icon="el-icon-refresh" @click="rotate" size="mini" circle></el-button> -->
                          <el-button type="danger" @click="phonePanel=false" size="mini">取消</el-button>
                          <el-button type="success" @click="phoneCrop" size="mini">确定</el-button>
                          </div>
                      </div>
                  </div>
              </div>
              <div>
                  <div>
                      <input type="file" id="phoneChange" accept="image" @change="phoneChange" style="display:none;">
                      <div class="show" :style="'backgroundImage:url('+phoneHeaderImage+');'">
                      <i class="el-icon-plus i" :style="'color: '+phoneColor"
                          v-on:mouseover="phoneAddClassload"
                          v-on:mouseout="phoneRemoveClassload"
                          @click="phoneUpload"
                      ></i>
                      <i class="el-icon-delete i remove-btn" :style="'color: '+phoneDelColor"
                          v-if="phoneRemoveBtn"
                          v-on:mouseover="phoneDelClassload"
                          v-on:mouseout="phoneDelReClassload"
                          @click="phoneRemoveUpload"
                      ></i>
                      </div>
                  </div>
                  <el-button @click="phoneTailor" v-if="phoneBtnShow" size="mini">裁剪</el-button>
              </div>
          </div>
        </el-form-item>
        <el-form-item label="资源URL" prop="resPhoneLink">
          <el-input type="text" v-model.trim="addList.resPhoneLink" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源说明" prop="resState">
          <el-input type="text" v-model.trim="addList.resState" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源名称" prop="resName">
          <el-input type="text" v-model.trim="addList.resName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌手" prop="resSinger" v-if="singerShow">
          <el-input type="text" v-model.trim="addList.resSinger" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="专辑" prop="resAlbum" v-if="singerShow">
          <el-input type="text" v-model.trim="addList.resAlbum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源标签" prop="resLabel" v-if="labelShow">
          <el-input type="text" v-model.trim="addList.resLabel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP" prop="resVip">
            <el-select v-model="addList.resVip" clearable placeholder="--">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="付费" prop="resPay">
            <el-select v-model="addList.resPay" clearable placeholder="--">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="播放链接" prop="resPlayLink">
          <el-input type="text" v-model.trim="addList.resPlayLink" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机型配置" prop="resTypeCon">
            <el-select v-model="addList.resTypeCon" multiple placeholder="请选择">
                <el-option
                v-for="item in phoneTypeList"
                :key="item.id"
                :label="item.context"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-add-footer">
        <el-button @click="addHandleClose">取 消</el-button>
        <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
      </span>
    </div>

  </div>
</template>

<script>
  import Cropper from 'cropperjs'
import { showModeAdd, configList} from '@/config/api'
export default {
  data() {
    return {
        channelList:[],//渠道
        typeList:[],//类型
        phoneTypeList:[],//机型
        videoTypeList:[],//视频类型
        addList: {//添加数据组
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
            resTypeCon:[100],
            resSinger:'',
            resAlbum:'',
            resLabel:''
        },
        addRules:{
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
        padHeaderImage:'',
        padPicValue:'',
        padCropper:'',
        padCroppable:false,
        padPanel:false,
        padUrl:'',
        padColor:"#d9d9d9",
        padDelColor:"#d9d9d9",
        padCurrent:0,
        phoneHeaderImage:'',
        phonePicValue:'',
        phoneCropper:'',
        phoneCroppable:false,
        phonePanel:false,
        phoneUrl:'',
        phoneColor:"#d9d9d9",
        phoneDelColor:"#d9d9d9",
        phoneCurrent:0,
        addBtnLoading:false,
        singerShow:false,
        labelShow:false,
        padSeen:false,
        phoneSeen:false,
        videoShow:false,
        padE:[],
        phoneE:[],
        padBtnShow:false,
        phoneBtnShow:false,
        padRemoveBtn:false,
        phoneRemoveBtn:false
        };
  },
  created() {
    this.getChannelList()
    this.getTypeList()
    this.getPhoneTypeList()
  },
  mounted () {
      //初始化这个裁剪框
      var self = this;
      var padImage = document.getElementById('padImage');
      this.padCropper = new Cropper(padImage, {
        aspectRatio: NaN,
        viewMode: 1,
        zoomOnWheel:false,//是否允许通过鼠标滚轮来缩放图片
        background:true,//是否在容器上显示网格背景
        rotatable:false,//是否允许旋转图片
        ready: function () {
          self.padCroppable = true;
        }
      });

      var phoneImage = document.getElementById('phoneImage');
      this.phoneCropper = new Cropper(phoneImage, {
        aspectRatio: NaN,
        viewMode: 1,
        zoomOnWheel:false,//是否允许通过鼠标滚轮来缩放图片
        background:true,//是否在容器上显示网格背景
        rotatable:false,//是否允许旋转图片
        ready: function () {
          self.phoneCroppable = true;
        }
      });
    },
  methods: {
      padAddClassload(){
        this.padColor="#1b95e0"
      },
      padDelClassload(){
        this.padDelColor="#1b95e0"
      },
      phoneDelClassload(){
        this.phoneDelColor="#1b95e0"
      },
      phoneAddClassload(){
        this.phoneColor="#1b95e0"
      },
      padRemoveClassload(){
        this.padColor="#d9d9d9"
      },
      padDelReClassload(){
        this.padDelColor="#d9d9d9"
      },
      phoneRemoveClassload(){
        this.phoneColor="#d9d9d9"
      },
      phoneDelReClassload(){
        this.phoneDelColor="#d9d9d9"
      },
      //点击按钮自动执行选择文件事件
      padUpload(){
        this.padUrl='',
        this.padCurrent=0;
        document.getElementById("padChange").value=null;
        document.getElementById("padChange").click();
      },
      padRemoveUpload(){
          this.padHeaderImage = ''
          this.padRemoveBtn = false
          this.padBtnShow = false
          this.padDelReClassload()
      },
      phoneRemoveUpload(){
        this.phoneHeaderImage = ''
        this.phoneRemoveBtn = false
        this.phoneBtnShow = false
        this.phoneDelReClassload()
      },
      phoneUpload(){
        this.phoneUrl='',
        this.phoneCurrent=0;
        document.getElementById("phoneChange").value=null;
        document.getElementById("phoneChange").click();
      },
      padGetObjectURL (file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
      },
      phoneGetObjectURL (file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
      },
      padTailor(){
        let files = this.padE.target.files || this.padE.dataTransfer.files;
        if (!files.length) return;
        this.padPanel = true;
        this.padPicValue = files[0];
        this.padUrl = this.padGetObjectURL(this.padPicValue);
        //每次替换图片要重新得到新的url
        if(this.padCropper){
          this.padCropper.replace(this.padUrl);
        }
        this.padPanel = true;
      },
      padChange (e) {
        this.padE = e
        this.padHeaderImage = this.phoneGetObjectURL(e.target.files[0])
        this.addList.resPadFile = e.target.files[0]
        this.padBtnShow = true
        this.padRemoveBtn = true
      },
      phoneTailor(){
        let files = this.phoneE.target.files || this.phoneE.dataTransfer.files;
        if (!files.length) return;
        this.phonePanel = true;
        this.phonePicValue = files[0];
        this.phoneUrl = this.phoneGetObjectURL(this.phonePicValue);
        //每次替换图片要重新得到新的url
        if(this.phoneCropper){
          this.phoneCropper.replace(this.phoneUrl);
        }
        this.phonePanel = true;
      },
      phoneChange (e) {
        this.phoneE = e
        this.phoneHeaderImage = this.phoneGetObjectURL(e.target.files[0])
        this.addList.resPhoneFile = e.target.files[0]
        this.phoneBtnShow = true
        this.phoneRemoveBtn = true
      },
      padCrop () {
        this.padPanel = false;
        var croppedCanvas;
        var roundedCanvas;
 
        if (!this.padCroppable) {
          return;
        }
        // Crop
        croppedCanvas = this.padCropper.getCroppedCanvas();
        // console.log(this.padCropper)
        //方形
        this.padHeaderImage = croppedCanvas.toDataURL();
 
        var gettype=Object.prototype.toString
        this.padPostImg()
 
      },
      phoneCrop () {
        this.phonePanel = false;
        var croppedCanvas;
        var roundedCanvas;
 
        if (!this.phoneCroppable) {
          return;
        }
        // Crop
        croppedCanvas = this.phoneCropper.getCroppedCanvas();
        // console.log(this.padCropper)
        //方形
        this.phoneHeaderImage = croppedCanvas.toDataURL();
 
        var gettype=Object.prototype.toString
        this.phonePostImg()
 
      },
      padDataURLtoFile (dataurl, filename = 'file') {
        let arr = dataurl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let suffix = mime.split('/')[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], `${filename}.${suffix}`, {type: mime})
      },
      phoneDataURLtoFile (dataurl, filename = 'file') {
        let arr = dataurl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let suffix = mime.split('/')[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], `${filename}.${suffix}`, {type: mime})
      },
      padPostImg () {
        this.addList.resPadFile = this.padDataURLtoFile(this.padHeaderImage)
      },
      phonePostImg () {
        this.addList.resPhoneFile = this.phoneDataURLtoFile(this.phoneHeaderImage)
      },
    handleType(value){
        if(value == 9){
            this.singerShow = true
            this.labelShow = false
            this.videoShow = false
            this.addList.resVideoTypeVal = ''
            this.addList.resLabel = ''
        }else if(value == 10){
            this.labelShow = true
            this.singerShow = false
            this.videoShow = false
            this.addList.resVideoTypeVal = ''
            this.addList.resSinger = ''
            this.addList.resAlbum = ''
        }else{
            this.labelShow = false
            this.singerShow = false
            this.videoShow = true
            this.addList.resLabel = ''
            this.addList.resSinger = ''
            this.addList.resAlbum = ''
            this.getVideoTypeList()
        }
    },
    addHandleConfirm(addList) {
      if(this.addList.resPadFile == null && this.addList.resPadLink == ''){
        this.$message({
            message:'请选择Pad资源图片或输入资源url',
            type:"warning",
            duration:2000
        });
      }else if(this.addList.resPhoneFile != null || this.addList.resPhoneLink != ''){
        let addParams = new FormData()
        addParams.append('type',this.addList.resTypeVal)
        addParams.append('subType',this.addList.resVideoTypeVal)
        addParams.append('channel',this.addList.resChannelVal)
        addParams.append('padImg',this.addList.resPadLink)
        addParams.append('phoneImg',this.addList.resPhoneLink)
        addParams.append('padFile',this.addList.resPadFile)
        addParams.append('phoneFile',this.addList.resPhoneFile)
        addParams.append('description',this.addList.resState)
        addParams.append('name',this.addList.resName)
        addParams.append('vip',this.addList.resVip)
        addParams.append('paid',this.addList.resPay)
        addParams.append('playUrl',this.addList.resPlayLink)
        addParams.append('modelConfig',this.addList.resTypeCon)
        addParams.append('singer',this.addList.resSinger)
        addParams.append('album',this.addList.resAlbum)
        addParams.append('label',this.addList.resLabel)
        this.$refs[addList].validate((valid) => {
          if (valid) {
            this.addBtnLoading = true
            showModeAdd(addParams).then(res=>{
              this.addBtnLoading = false
              if(res.data.code == 200){
                  this.$message({
                      message:'添加成功',
                      type:"success",
                      duration:1000
                  });
                  this.getChannelList()
                  this.getTypeList()
                  this.getPhoneTypeList()
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
          parentCode:this.addList.resTypeVal
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
