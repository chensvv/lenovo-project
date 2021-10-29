<template>
  <div class="table editchannel">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规则定义</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/showmode/list'}">资源管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
        <el-form :label-position="'right'" label-width="100px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
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
          <el-input type="text" v-model.trim="currentItem.resPadLink" auto-complete="off"></el-input>
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
        <el-form-item label="说法配置" prop="recommends">
          <el-input type="text" placeholder="多个语句用英文 , 隔开" v-model.trim="currentItem.recommends" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-add-footer">
        <el-button @click="addHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </div>

  </div>
</template>

<script>
  import Cropper from 'cropperjs'
import { showModeUpd, configList} from '@/config/api'
export default {
  data() {
    return {
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
            resLabel:'',
            recommends:''
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
        editBtnLoading:false,
        singerShow:false,
        labelShow:false,
        padE:[],
        phoneE:[],
        padBtnShow:false,
        phoneBtnShow:false,
        padRemoveBtn:false,
        phoneRemoveBtn:false
        };
  },
  created() {
      this.datas = JSON.parse(this.$route.query.data)
      this.padHeaderImage = this.datas.padImg
      this.phoneHeaderImage = this.datas.phoneImg
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
        resLabel:this.datas.label,
        recommends:this.datas.recommends
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
    if(this.padHeaderImage !=''){
      this.padRemoveBtn = true
    }
    if(this.phoneHeaderImage !=''){
      this.phoneRemoveBtn = true
    }
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
      phoneRemoveUpload(){
        this.phoneHeaderImage = ''
        this.phoneRemoveBtn = false
        this.phoneBtnShow = false
        this.phoneDelReClassload()
      },
      padRemoveUpload(){
          this.padHeaderImage = ''
          this.padRemoveBtn = false
          this.padBtnShow = false
          this.padDelReClassload()
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
        this.currentItem.resPadFile = e.target.files[0]
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
        this.currentItem.resPhoneFile = e.target.files[0]
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
        this.currentItem.resPadFile = this.padDataURLtoFile(this.padHeaderImage)
      },
      phonePostImg () {
        this.currentItem.resPhoneFile = this.phoneDataURLtoFile(this.phoneHeaderImage)
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
          updParams.append('label',this.currentItem.resLabel)
          // console.log(this.currentItem.recommends)
          // console.log(typeof(this.currentItem.recommends))
          if(this.currentItem.recommends == null){
            updParams.append('recommends', '')
          }else{
            updParams.append('recommends', this.currentItem.recommends)
          }
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
