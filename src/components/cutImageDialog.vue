<template>
  <div id="demo">
    <div v-show="panel" class="father">
      <div class="container">
        <div
          id="cropper"
          style="margin-top:1%;margin-left: 1%;margin-right: 1%;height: 85%;margin-bottom: 1%"
        >
          <img id="image" :src="url" alt="Picture">
        </div>
        <div>
          <div style="float: right;margin-right: 1%">
            <!-- <el-button icon="el-icon-zoom-out" size="mini" circle @click="zoom(-1)" />
            <el-button icon="el-icon-zoom-in" size="mini" circle @click="zoom(1)" />
            <el-button icon="el-icon-refresh" size="mini" circle @click="rotate" /> -->
            <el-button type="danger" @click="panel=false" >取消</el-button>
            <el-button type="success" @click="crop" >确定</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div style="margin-top:20px;">
        <input id="change" type="file" accept="image" style="display:none;" @change="change">
        <div
          class="show"
          :style="'backgroundImage:url('+headerImage+');border: 1px dashed '+color"
          @mouseover="addClassload"
          @mouseout="removeClassload"
          @click="upload"
        >
          <i class="el-icon-plus i" :style="'color: '+color" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
// import api from '@/api/conf.js'
export default {
  components: {},
  data() {
    return {
      headerImage: '',
      picValue: '',
      cropper: '',
      croppable: false,
      panel: false,
      url: '',
      color: '#d9d9d9',
      current: 0
    }
  },
  mounted() {
    // 初始化这个裁剪框
    var self = this
    var image = document.getElementById('image')
    this.cropper = new Cropper(image, {
      aspectRatio: NaN, // 裁剪比例
      viewMode: 1,
      zoomOnWheel: false, // 是否允许通过鼠标滚轮来缩放图片
      background: true, // 是否在容器上显示网格背景
      rotatable: false, // 是否允许旋转图片
      ready: function() {
        self.croppable = true
      }
    })
  },
  methods: {
    addClassload() {
      this.color = '#1b95e0'
    },
    removeClassload() {
      this.color = '#d9d9d9'
    },
    // 点击按钮自动执行选择文件事件
    upload() {
      this.url = ''
      this.current = 0
      document.getElementById('change').value = null
      document.getElementById('change').click()
    },
    // 旋转
    rotate() {
      // alert(this.cropper.image)
      this.current = (this.current + 90) % 360
      this.cropper.rotate(this.current)
    },
    // 缩放
    zoom(num) {
      num = num || 1
      this.cropper.zoom(num)
    },

    getObjectURL(file) {
      var url = null
      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    change(e) {
      console.log(e.target.files[0].size, '图片大小')
      // if (e.target.files[0].size > 500000) {
      //   this.$message.error('图片过大，请重新选择图片')
      //   return
      // } else {
      //   const files = e.target.files || e.dataTransfer.files
      //   if (!files.length) return
      //   this.panel = true
      //   this.picValue = files[0]
      //   this.url = this.getObjectURL(this.picValue)
      //   // 每次替换图片要重新得到新的url
      //   if (this.cropper) {
      //     this.cropper.replace(this.url)
      //   }
      //   // console.log(this.url)
      //   this.panel = true
      // }
      const files = e.target.files || e.dataTransfer.files
      console.log(files)
      if (!files.length) return
      this.panel = true
      this.picValue = files[0]
      this.url = this.getObjectURL(this.picValue)
      // 每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url)
      }
      this.panel = true
    },
    crop() {
      this.panel = false
      var croppedCanvas
      if (!this.croppable) {
        return
      }
      // Crop
      croppedCanvas = this.cropper.getCroppedCanvas()
      // console.log(this.cropper.url, '图片路径')// 图片路径
      // Round
      /* 截取圆形
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);
        this.headerImage = roundedCanvas.toDataURL();
        */
      // 方形
      // croppedCanvas canvas的宽高
      this.headerImage = croppedCanvas.toDataURL('image/jpeg')
      // console.log(this.headerImage, 'this.headerImage')
      // var gettype = Object.prototype.toString
      this.postImg()
    },
    dataURLtoFile(dataurl, filename = 'file') {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const suffix = mime.split('/')[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, { type: mime })
    },
    /* // 截取圆形
      getRoundedCanvas (sourceCanvas) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();
        return canvas;
      },*/
    postImg() {
      // 图片的上传
      // var formData = new FormData()
      // formData.append('file', this.dataURLtoFile(this.headerImage))
      // this.$emit('fileMsg','this.dataURLtoFile(this.headerImage)')
      // console.log(this.headerImage, 'this.headerImage')
      //上传到服务器接口
    //   api.upload(formData).then(res => {
    //     if (res.data.meta.code === 200) {
    //       this.$message.success('上传成功')
    //       console.log(res.data.data.url)
    //       this.resurl = res.data.data.url
          this.$emit('resurl', this.dataURLtoFile(this.headerImage))//因为我的信息提交在父组件，所以事件发射给父
    //     } else {
    //       this.$message.error('请重新选择图片')
    //     }
    //   })
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.father {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 999999;
}
.i {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
#demo .show {
  border: 1px dashed #d9d9d9;
  border-radius: 10%;
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: inline-block;
  text-align: center;
  outline: none;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
#demo .container {
  z-index: 99;
  height: 400px;
  width: 600px;
  position: fixed;
  /*padding-top: 60px;*/
  left: 30%;
  top: 20%;

  background-color: white;
}
#demo #image {
  max-width: 100%;
}
/* .cropper-view-box,.cropper-face {
    border-radius: 100%; 圆形截图设置
  }*/
/*!
   * Cropper.js v1.0.0-rc
   * https://github.com/fengyuanchen/cropperjs
   *
   * Copyright (c) 2017 Fengyuan Chen
   * Released under the MIT license
   *
   * Date: 2017-03-25T12:02:21.062Z
   */
.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}

.cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}
.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.cropper-wrap-box {
  overflow: hidden;
}
.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}
.cropper-modal {
  opacity: 0.5;
  background-color: #000;
}
.cropper-view-box {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}

.cropper-dashed {
  position: absolute;
  display: block;
  opacity: 0.5;
  border: 0 dashed #eee;
}
.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}
.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}
.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0;
  height: 0;
  opacity: 0.75;
}
.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: " ";
  background-color: #eee;
}
.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}
.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}
.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}
.cropper-face {
  top: 0;
  left: 0;
  background-color: #fff;
}
.cropper-line {
  background-color: #39f;
}
.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}
.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}
.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}
.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}
.cropper-point {
  width: 5px;
  height: 5px;

  opacity: 0.75;
  background-color: #39f;
}
.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}
.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}
.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}
.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}
.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}
.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}
.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}
.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1;
}
@media (min-width: 768px) {
  .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}
@media (min-width: 992px) {
  .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}
@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}
.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: " ";
  opacity: 0;
  background-color: #39f;
}
.cropper-invisible {
  opacity: 0;
}
.cropper-bg {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMzTjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}
.cropper-hide {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
}
.cropper-hidden {
  display: none !important;
}
.cropper-move {
  cursor: move;
}
.cropper-crop {
  cursor: crosshair;
}
.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>

