webpackJsonp([2],{Luci:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("mvHQ"),o=r.n(i),g=r("woOf"),s=r.n(g),a=r("iGF/"),n=r("krqS"),M=r("PXCl").Base64,l={data:function(){var e=this;return{limgCode:"",uuid:"",loginUserErr:"",loginPsdErr:"",loginImgCodeErr:"",regUserErr:"",regCodeErr:"",loginStatus:this.$store.getters.get_userinfo,loginForm:{username:"",password:"",imgCode:""},regForm:{username:"",password:"",regCode:""},loginShow:!0,loginLoading:!1,regLoading:!1,loginRules:{username:[{required:!0,message:"请输入用户名",trigger:"change"}],password:[{required:!0,validator:function(t,r,i){""===r?i(new Error("请输入密码")):(e.loginPsdErr="",i())},trigger:"change"}],imgCode:[{required:!0,validator:function(t,r,i){""===r?i(new Error("请输入验证码")):(e.loginImgCodeErr="",i())},trigger:"change"}]},regRules:{username:[{required:!0,validator:function(t,r,i){""===r?i(new Error("请输入用户名")):(e.regUserErr="",i())},trigger:"change"}],password:[{required:!0,validator:function(e,t,r){""===t?r(new Error("请输入密码")):r()},trigger:"change"},{pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,message:"密码限制8-16字符且必须包含大小写英文及数字",trigger:"blur"}],regCode:[{required:!0,validator:function(t,r,i){""===r?i(new Error("请输入验证码")):(e.regCodeErr="",i())},trigger:"change"}]},menu:[]}},created:function(){this.getImgCode()},mounted:function(){console.log(this.$store.getters.get_userinfo)},methods:{loginSubmit:function(e){var t=this,r={userName:this.loginForm.username,password:this.loginForm.password,imgCode:this.loginForm.imgCode,ucode:this.uuid},i={userName:this.loginForm.username};r.sign=Object(n.a)(r),i.sign=Object(n.a)(i),this.$refs[e].validate(function(e){if(!e)return!1;t.loginLoading=!0,Object(a.i)(r).then(function(e){if(t.loginLoading=!1,200==e.data.code){sessionStorage.setItem("username",M.encode(t.loginForm.username));var r={t:M.encode(e.data.data)},g=s()(r,{startTime:(new Date).getTime()});sessionStorage.setItem("token",o()(g)),t.$store.commit("set_userinfo","0"),Object(a.x)(i).then(function(e){sessionStorage.setItem("menuData",o()(e.data.data)),t.$router.push("/")})}else 803==e.data.code?(t.getImgCode(),t.loginPsdErr=e.data.msg):(t.getImgCode(),t.loginImgCodeErr=e.data.msg+"，请联系管理员")}).catch(function(e){t.getImgCode()})})},regSubmit:function(e){var t=this,r={userName:this.regForm.username,password:this.regForm.password,imgCode:this.regForm.regCode,ucode:this.uuid};r.sign=Object(n.a)(r),this.$refs[e].validate(function(e){if(!e)return!1;t.regLoading=!0,Object(a.y)(r).then(function(e){t.regLoading=!1,200==e.data.code?(t.$message({message:"注册成功，请登录",type:"success",duration:2e3}),t.getImgCode(),t.loginShow=!t.loginShow):400==e.data.code?(t.getImgCode(),t.regUserErr=e.data.msg):(t.getImgCode(),t.regCodeErr=e.data.msg)}).catch(function(e){t.getImgCode(),t.$message({message:"服务器错误，请稍后重试！",type:"error",duration:2e3})})})},getImgCode:function(){var e=this;Object(a.h)().then(function(t){200==t.data.code?(e.limgCode="data:image/png;base64,"+t.data.data.imgage,e.uuid=t.data.data.uuid):e.$message({message:t.data.msg,type:"error",duration:2e3})})},register:function(){this.getImgCode(),this.loginShow=!this.loginShow}}},c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"login"},[e._m(0),e._v(" "),i("div",{staticClass:"login-box"},[e._m(1),e._v(" "),i("div",{staticClass:"login-content"},[i("span",{staticClass:"form-title"},[e._v("联想车载语音管理系统")]),e._v(" "),e.loginShow?i("div",{staticClass:"loginn"},[i("el-form",{ref:"loginForm",attrs:{"label-position":"left",model:e.loginForm,rules:e.loginRules},nativeOn:{submit:function(e){e.preventDefault()}}},[i("el-form-item",{attrs:{prop:"username",error:e.loginUserErr}},[i("el-input",{attrs:{type:"text",placeholder:"用户名","prefix-icon":"el-icon-user","auto-complete":"off",clearable:""},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username","string"==typeof t?t.trim():t)},expression:"loginForm.username"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"password",error:e.loginPsdErr}},[i("el-input",{attrs:{type:"password",placeholder:"密码","prefix-icon":"el-icon-lock","auto-complete":"off",clearable:""},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password","string"==typeof t?t.trim():t)},expression:"loginForm.password"}})],1),e._v(" "),i("el-form-item",{staticClass:"imgcode-item",attrs:{prop:"imgCode",error:e.loginImgCodeErr}},[i("el-input",{attrs:{type:"text",placeholder:"验证码","auto-complete":"off",clearable:""},model:{value:e.loginForm.imgCode,callback:function(t){e.$set(e.loginForm,"imgCode","string"==typeof t?t.trim():t)},expression:"loginForm.imgCode"}},[i("i",{staticClass:"el-input__icon codeimg",attrs:{slot:"prefix"},slot:"prefix"},[i("img",{attrs:{src:r("Yt3j")}})])]),e._v(" "),i("img",{staticClass:"img",attrs:{src:e.limgCode},on:{click:function(t){return e.getImgCode()}}}),e._v(" "),"1"==e.loginStatus?i("div",{staticClass:"tooltiptext"},[e._v("\n                                登录超时\n                            ")]):e._e()],1),e._v(" "),i("el-form-item",{staticClass:"btn_item lr-btn"},[i("el-button",{attrs:{type:"primary","native-type":"submit",loading:e.loginLoading},on:{click:function(t){return e.loginSubmit("loginForm")}}},[e._v("登录")]),e._v(" "),i("span",{staticClass:"register_btn",attrs:{"native-type":"submit"},on:{click:function(t){return e.register()}}},[e._v("注册")])],1)],1)],1):i("div",{key:"register",staticClass:"register"},[i("el-form",{ref:"regForm",attrs:{"label-position":"left",model:e.regForm,rules:e.regRules},nativeOn:{submit:function(e){e.preventDefault()}}},[i("el-form-item",{attrs:{prop:"username",error:e.regUserErr}},[i("el-input",{staticStyle:{position:"fixed",bottom:"-9999px"}}),e._v(" "),i("el-input",{attrs:{type:"text",placeholder:"请输入用户名","prefix-icon":"el-icon-user","auto-complete":"off",clearable:""},model:{value:e.regForm.username,callback:function(t){e.$set(e.regForm,"username","string"==typeof t?t.trim():t)},expression:"regForm.username"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"password"}},[i("el-input",{staticStyle:{position:"fixed",bottom:"-9999px"}}),e._v(" "),i("el-input",{attrs:{placeholder:"请输入密码","prefix-icon":"el-icon-lock","auto-complete":"off",clearable:""},model:{value:e.regForm.password,callback:function(t){e.$set(e.regForm,"password","string"==typeof t?t.trim():t)},expression:"regForm.password"}})],1),e._v(" "),i("el-form-item",{staticClass:"imgcode-item",attrs:{prop:"regCode",error:e.regCodeErr}},[i("el-input",{attrs:{type:"text",placeholder:"验证码","auto-complete":"off",clearable:""},model:{value:e.regForm.regCode,callback:function(t){e.$set(e.regForm,"regCode","string"==typeof t?t.trim():t)},expression:"regForm.regCode"}},[i("i",{staticClass:"el-input__icon codeimg",attrs:{slot:"prefix"},slot:"prefix"},[i("img",{attrs:{src:r("Yt3j")}})])]),e._v(" "),i("img",{staticClass:"img",attrs:{src:e.limgCode},on:{click:function(t){return e.getImgCode()}}})],1),e._v(" "),i("el-form-item",{staticClass:"btn_item lr-btn"},[i("el-button",{attrs:{type:"primary","native-type":"submit",loading:e.regLoading},on:{click:function(t){return e.regSubmit("regForm")}}},[e._v("注册")]),e._v(" "),i("span",{staticClass:"register_btn",attrs:{"native-type":"submit"},on:{click:function(t){return e.register()}}},[e._v("登录")])],1)],1)],1)])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"head"},[t("div",{staticClass:"head_logo"},[t("img",{staticClass:"logo_img",attrs:{src:r("v/Iv"),alt:""}})]),this._v(" "),t("span",{staticClass:"logo_txt"},[this._v("联想车载语音管理系统")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"login_background"},[t("img",{attrs:{src:r("ZB5k"),alt:""}})])}]};var u=r("VU/8")(l,c,!1,function(e){r("jEfY")},"data-v-4ca0e1f6",null);t.default=u.exports},Yt3j:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyB0PSIxNjc4NDEzNzQ3MTkzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjY4MzciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSI+DQogICAgPHBhdGggZD0iTTg2NS4wNTU0NzYgMTczLjg4MDE4OSA1MzkuMzUzNDg2IDY4LjUyNDY3NmMtMTcuNzYzNTcyLTUuNjU2ODM3LTM3LjAzMjQyOC01LjY1NjgzNy01NC43OTkwNyAwTDE1OC44NTM0NDkgDQogICAgMTczLjg4MDE4OWMtMjcuNjYzMDM2IDguOTI3MzIzLTQ2LjIyNDc4OCAzNC40NzAwNjktNDYuMjI0Nzg4IDYzLjU0OTM2MmwwIDIzMS4zMDYwODZjMCAxMzMuNjM1NjAzIDY0LjI1NTQ0MyAyNjAuNjQ2MzIyDQogICAgICAgIDE3MS45OTgzMjkgMzM5LjkzMDAzOUw0NzIuMzU3NjMgOTQ2LjcyNTAzMmMxMS41Nzc2ODYgOC41NzMyNTkgMjUuMjc4NzMzIDEyLjk5MTg5NSAzOS41OTY4MzMgMTIuOTkxODk1IDE0LjMyMDE0NyAwIA0KICAgICAgICAyOC4wMTkxNDctNC41MDc2NjQgMzkuNTk0Nzg3LTEyLjk5MTg5NWwxODcuODIwNjktMTM4LjA2MDM3OWMxMDcuNzQyODg2LTc5LjE5NjczNyANCiAgICAgICAgMTcxLjk5OTM1Mi0yMDYuMjk0NDM2IDE3MS45OTkzNTItMzM5LjkzMDAzOUw5MTEuMzY5MjkyIDIzNy40Mjk1NTFDOTExLjI3OTI0MSAyMDguMzUwMjU5IDg5Mi43MjA1NTkgDQogICAgICAgIDE4Mi44MDc1MTMgODY1LjA1NTQ3NiAxNzMuODgwMTg5TDg2NS4wNTU0NzYgMTczLjg4MDE4OXpNODU0LjM1OTg4IDQ3MC4yMzc4NTFjMCAxMTUuMzQyOTgxLTU1LjUwNjE3NSANCiAgICAgICAgMjI1LjAzMTE3My0xNDguMzk5ODY1IDI5My4zNDkxNDFMNTI0Ljc3MTM3MyA4OTYuNzg1NjQzYy03LjUxNTE2MSA1LjQ3ODc4MS0xOC4xMTk2ODMgNS41Njk4NTYtMjUuNzIwODAxIA0KICAgICAgICAwTDMxNy45NDg5MTEgNzYzLjU4Njk5MmMtOTIuOTgyNzE4LTY4LjMxNzk2OC0xNDguMzk5ODY1LTE3OC4wMDYxNi0xNDguMzk5ODY1LTI5My4zNDkxNDFMMTY5LjU0OTA0NiAyNDcuMTUwOTZjMC05LjM2ODM2OCANCiAgICAgICAgNi4wMDk4NzctMTcuNjc2NTkxIDE0LjkzNzIwMS0yMC41MDM5ODZsMzE0LjIwOTIzOC0xMDEuNjQ1MDA1YzQuMzMwNjMyLTEuNDE0MjA5IDguNzUyMzM4LTIuMTIwMjkgMTMuMjU4OTc4LTIuMTIwMjkgNC41MTI3OCANCiAgICAgICAgMCA4LjkyODM0NyAwLjcwNjA4MSAxMy4yNjMwNzIgMi4xMjAyOWwzMTQuMTIzMjggMTAxLjY0NTAwNWM4LjkyNjMgMi44MjczOTUgMTQuOTM4MjI0IDExLjEzNTYxOCAxNC45MzgyMjQgMjAuNTAzOTg2bDAuMDg4MDA0IA0KICAgICAgICAyMjMuMDg2ODkxTDg1NC4zNTk4OCA0NzAuMjM3ODUxek03MTEuNjE4ODk4IDMxNS44MjgxMDkgMzEyLjI5MjA3NCAzMTUuODI4MTA5Yy0xMi4yODU4MTQgMC0yMi4xODQyNTUgOS44OTg0NDEtMjIuMTg0MjU1IA0KICAgICAgICAyMi4xODIyMDggMCAxMi4yODc4NjEgOS44OTg0NDEgMzIuNzkwODI0IDIyLjE4NDI1NSAzMi43OTA4MjRMNDg0LjQ2NzQzNSAzNzAuODAxMTQxbDAgMzIwLjM5NzE3MWMwIDEyLjI4OTkwNyAxNS4yMDEyMTQgDQogICAgICAgIDIyLjE4ODM0OCAyNy40ODcwMjggMjIuMTg4MzQ4czI4LjM3MzIxMS05Ljg5ODQ0MSAyOC4zNzMyMTEtMjIuMTg4MzQ4bDAtMzIwLjM5NzE3MSAxNzEuMjkyMjQ4IDBjMTIuMjgzNzY4IDAgMjIuMTgzMjMyLTIwLjUwMjk2MyANCiAgICAgICAgMjIuMTgzMjMyLTMyLjc5MDgyNEM3MzMuODAyMTMgMzI1LjcyNjU0OSA3MjMuOTAyNjY2IDMxNS44MjgxMDkgNzExLjYxODg5OCAzMTUuODI4MTA5TDcxMS42MTg4OTggMzE1LjgyODEwOXpNNzExLjYxODg5OCAzMTUuODI4MTA5IiBmaWxsPSIjYzBjNGNjIiBwLWlkPSI2ODM4Ij4NCiAgICA8L3BhdGg+DQo8L3N2Zz4="},ZB5k:function(e,t,r){e.exports=r.p+"static/img/vehi.0d07dd6.svg"},jEfY:function(e,t){},"v/Iv":function(e,t,r){e.exports=r.p+"static/img/logo_img.13d2e6f.png"}});