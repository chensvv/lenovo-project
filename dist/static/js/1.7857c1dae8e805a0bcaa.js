webpackJsonp([1],{"7DzA":function(e,t){},"CuQ+":function(e,t,r){e.exports=r.p+"static/img/login1.bffddf7.png"},CwSZ:function(e,t,r){"use strict";var o=r("p8xL"),n=r("XgCd"),i=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},s=Array.isArray,l=Array.prototype.push,c=function(e,t){l.apply(e,s(t)?t:[t])},u=Date.prototype.toISOString,f={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:o.encode,encodeValuesOnly:!1,formatter:n.formatters[n.default],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},p=function e(t,r,n,i,a,l,u,p,d,m,g,y,h){var v=t;if("function"==typeof u?v=u(r,v):v instanceof Date?v=m(v):"comma"===n&&s(v)&&(v=v.join(",")),null===v){if(i)return l&&!y?l(r,f.encoder,h):r;v=""}if("string"==typeof v||"number"==typeof v||"boolean"==typeof v||o.isBuffer(v))return l?[g(y?r:l(r,f.encoder,h))+"="+g(l(v,f.encoder,h))]:[g(r)+"="+g(String(v))];var b,w=[];if(void 0===v)return w;if(s(u))b=u;else{var O=Object.keys(v);b=p?O.sort(p):O}for(var j=0;j<b.length;++j){var x=b[j];a&&null===v[x]||(s(v)?c(w,e(v[x],"function"==typeof n?n(r,x):r,n,i,a,l,u,p,d,m,g,y,h)):c(w,e(v[x],r+(d?"."+x:"["+x+"]"),n,i,a,l,u,p,d,m,g,y,h)))}return w};e.exports=function(e,t){var r,o=e,l=function(e){if(!e)return f;if(null!==e.encoder&&void 0!==e.encoder&&"function"!=typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||f.charset;if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=n.default;if(void 0!==e.format){if(!i.call(n.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var o=n.formatters[r],a=f.filter;return("function"==typeof e.filter||s(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"==typeof e.addQueryPrefix?e.addQueryPrefix:f.addQueryPrefix,allowDots:void 0===e.allowDots?f.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:f.charsetSentinel,delimiter:void 0===e.delimiter?f.delimiter:e.delimiter,encode:"boolean"==typeof e.encode?e.encode:f.encode,encoder:"function"==typeof e.encoder?e.encoder:f.encoder,encodeValuesOnly:"boolean"==typeof e.encodeValuesOnly?e.encodeValuesOnly:f.encodeValuesOnly,filter:a,formatter:o,serializeDate:"function"==typeof e.serializeDate?e.serializeDate:f.serializeDate,skipNulls:"boolean"==typeof e.skipNulls?e.skipNulls:f.skipNulls,sort:"function"==typeof e.sort?e.sort:null,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:f.strictNullHandling}}(t);"function"==typeof l.filter?o=(0,l.filter)("",o):s(l.filter)&&(r=l.filter);var u,d=[];if("object"!=typeof o||null===o)return"";u=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var m=a[u];r||(r=Object.keys(o)),l.sort&&r.sort(l.sort);for(var g=0;g<r.length;++g){var y=r[g];l.skipNulls&&null===o[y]||c(d,p(o[y],y,m,l.strictNullHandling,l.skipNulls,l.encode?l.encoder:null,l.filter,l.sort,l.allowDots,l.serializeDate,l.formatter,l.encodeValuesOnly,l.charset))}var h=d.join(l.delimiter),v=!0===l.addQueryPrefix?"?":"";return l.charsetSentinel&&("iso-8859-1"===l.charset?v+="utf8=%26%2310003%3B&":v+="utf8=%E2%9C%93&"),h.length>0?v+h:""}},DDCP:function(e,t,r){"use strict";var o=r("p8xL"),n=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:o.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},a=function(e){return e.replace(/&#(\d+);/g,function(e,t){return String.fromCharCode(parseInt(t,10))})},s=function(e,t,r){if(e){var o=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/g,a=/(\[[^[\]]*])/.exec(o),s=a?o.slice(0,a.index):o,l=[];if(s){if(!r.plainObjects&&n.call(Object.prototype,s)&&!r.allowPrototypes)return;l.push(s)}for(var c=0;null!==(a=i.exec(o))&&c<r.depth;){if(c+=1,!r.plainObjects&&n.call(Object.prototype,a[1].slice(1,-1))&&!r.allowPrototypes)return;l.push(a[1])}return a&&l.push("["+o.slice(a.index)+"]"),function(e,t,r){for(var o=t,n=e.length-1;n>=0;--n){var i,a=e[n];if("[]"===a&&r.parseArrays)i=[].concat(o);else{i=r.plainObjects?Object.create(null):{};var s="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,l=parseInt(s,10);r.parseArrays||""!==s?!isNaN(l)&&a!==s&&String(l)===s&&l>=0&&r.parseArrays&&l<=r.arrayLimit?(i=[])[l]=o:i[s]=o:i={0:o}}o=i}return o}(l,t,r)}};e.exports=function(e,t){var r=function(e){if(!e)return i;if(null!==e.decoder&&void 0!==e.decoder&&"function"!=typeof e.decoder)throw new TypeError("Decoder has to be a function.");if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");var t=void 0===e.charset?i.charset:e.charset;return{allowDots:void 0===e.allowDots?i.allowDots:!!e.allowDots,allowPrototypes:"boolean"==typeof e.allowPrototypes?e.allowPrototypes:i.allowPrototypes,arrayLimit:"number"==typeof e.arrayLimit?e.arrayLimit:i.arrayLimit,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:i.charsetSentinel,comma:"boolean"==typeof e.comma?e.comma:i.comma,decoder:"function"==typeof e.decoder?e.decoder:i.decoder,delimiter:"string"==typeof e.delimiter||o.isRegExp(e.delimiter)?e.delimiter:i.delimiter,depth:"number"==typeof e.depth?e.depth:i.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof e.interpretNumericEntities?e.interpretNumericEntities:i.interpretNumericEntities,parameterLimit:"number"==typeof e.parameterLimit?e.parameterLimit:i.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"==typeof e.plainObjects?e.plainObjects:i.plainObjects,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:i.strictNullHandling}}(t);if(""===e||null===e||void 0===e)return r.plainObjects?Object.create(null):{};for(var l="string"==typeof e?function(e,t){var r,s={},l=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,c=t.parameterLimit===1/0?void 0:t.parameterLimit,u=l.split(t.delimiter,c),f=-1,p=t.charset;if(t.charsetSentinel)for(r=0;r<u.length;++r)0===u[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===u[r]?p="utf-8":"utf8=%26%2310003%3B"===u[r]&&(p="iso-8859-1"),f=r,r=u.length);for(r=0;r<u.length;++r)if(r!==f){var d,m,g=u[r],y=g.indexOf("]="),h=-1===y?g.indexOf("="):y+1;-1===h?(d=t.decoder(g,i.decoder,p),m=t.strictNullHandling?null:""):(d=t.decoder(g.slice(0,h),i.decoder,p),m=t.decoder(g.slice(h+1),i.decoder,p)),m&&t.interpretNumericEntities&&"iso-8859-1"===p&&(m=a(m)),m&&t.comma&&m.indexOf(",")>-1&&(m=m.split(",")),n.call(s,d)?s[d]=o.combine(s[d],m):s[d]=m}return s}(e,r):e,c=r.plainObjects?Object.create(null):{},u=Object.keys(l),f=0;f<u.length;++f){var p=u[f],d=s(p,l[p],r);c=o.merge(c,d,r)}return o.compact(c)}},Luci:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("mvHQ"),n=r.n(o),i=r("iGF/"),a=(r("mw3O"),r("mtWM"),{data:function(){return{loginForm:{username:"",password:""},regForm:{username:"",password:""},loginShow:!0,loginLoading:!1,regLoading:!1,loginRules:{username:[{required:!0,message:"请输入用户名",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"}]},regRules:{username:[{required:!0,message:"请输入用户名",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"}]},menu:[]}},methods:{loginSubmit:function(e){var t=this,r={userName:this.loginForm.username,password:this.loginForm.password};this.$refs[e].validate(function(e){if(!e)return!1;t.loginLoading=!0,Object(i.f)(r).then(function(e){200==e.data.code?(sessionStorage.setItem("username",t.loginForm.username),sessionStorage.setItem("menuData",n()(e.data.data)),t.$router.push("/home"),t.loginLoading=!1):(t.$message({message:e.data.errorMessage,type:"error",duration:1e3}),t.loginLoading=!1)}).catch(function(e){t.loginLoading=!1})})},regSubmit:function(e){var t=this,r={userName:this.regForm.username,password:this.regForm.password};this.$refs[e].validate(function(e){if(!e)return!1;Object(i.m)(r).then(function(e){200==e.data.code?(t.$message({message:"注册成功，请登录",type:"success",duration:1e3}),t.loginShow=!t.loginShow):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})})})},register:function(){this.loginShow=!this.loginShow}}}),s={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login"},[e._m(0),e._v(" "),r("div",{staticClass:"login-box"},[r("transition",{key:"login",attrs:{name:"custom-classes-transition","enter-active-class":"animated flipInX","leave-active-class":"animated flipOutX",mode:"out-in"}},[e.loginShow?r("div",{staticClass:"loginn"},[r("span",{staticClass:"form-title"},[e._v("联想语音管理系统")]),e._v(" "),r("el-form",{ref:"loginForm",attrs:{"label-position":"left",model:e.loginForm,rules:e.loginRules},nativeOn:{submit:function(e){e.preventDefault()}}},[r("el-form-item",{attrs:{prop:"username"}},[r("el-input",{attrs:{type:"text",placeholder:"用户名","prefix-icon":"el-icon-user","auto-complete":"off",clearable:""},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username","string"==typeof t?t.trim():t)},expression:"loginForm.username"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"password"}},[r("el-input",{attrs:{type:"password",placeholder:"密码","prefix-icon":"el-icon-lock","auto-complete":"off",clearable:""},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password","string"==typeof t?t.trim():t)},expression:"loginForm.password"}})],1),e._v(" "),r("el-form-item",{staticClass:"btn_item"},[r("el-button",{attrs:{type:"primary","native-type":"submit",loading:e.loginLoading},on:{click:function(t){return e.loginSubmit("loginForm")}}},[e._v("登录")]),e._v(" "),r("span",{staticClass:"register_btn",attrs:{"native-type":"submit"},on:{click:function(t){return e.register()}}},[e._v("注册")])],1)],1)],1):r("div",{key:"register",staticClass:"register"},[r("span",{staticClass:"form-title"},[e._v("联想语音管理系统")]),e._v(" "),r("el-form",{ref:"regForm",attrs:{"label-position":"left",model:e.regForm,rules:e.regRules},nativeOn:{submit:function(e){e.preventDefault()}}},[r("el-form-item",{attrs:{prop:"username"}},[r("el-input",{staticStyle:{position:"fixed",bottom:"-9999px"}}),e._v(" "),r("el-input",{attrs:{type:"text",placeholder:"请输入用户名","prefix-icon":"el-icon-user","auto-complete":"off",clearable:""},model:{value:e.regForm.username,callback:function(t){e.$set(e.regForm,"username","string"==typeof t?t.trim():t)},expression:"regForm.username"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"password"}},[r("el-input",{staticStyle:{position:"fixed",bottom:"-9999px"}}),e._v(" "),r("el-input",{attrs:{placeholder:"请输入密码","prefix-icon":"el-icon-lock","auto-complete":"off",clearable:""},model:{value:e.regForm.password,callback:function(t){e.$set(e.regForm,"password","string"==typeof t?t.trim():t)},expression:"regForm.password"}})],1),e._v(" "),r("el-form-item",{staticClass:"btn_item"},[r("el-button",{attrs:{type:"primary","native-type":"submit",loading:e.regLoading},on:{click:function(t){return e.regSubmit("regForm")}}},[e._v("注册")]),e._v(" "),r("span",{staticClass:"register_btn",attrs:{"native-type":"submit"},on:{click:function(t){return e.register()}}},[e._v("登录")])],1)],1)],1)])],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"login_background"},[t("img",{attrs:{src:r("CuQ+"),alt:""}})])}]};var l=r("VU/8")(a,s,!1,function(e){r("7DzA")},"data-v-4683ab88",null);t.default=l.exports},XgCd:function(e,t,r){"use strict";var o=String.prototype.replace,n=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return o.call(e,n,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},mvHQ:function(e,t,r){e.exports={default:r("qkKv"),__esModule:!0}},mw3O:function(e,t,r){"use strict";var o=r("CwSZ"),n=r("DDCP"),i=r("XgCd");e.exports={formats:i,parse:n,stringify:o}},p8xL:function(e,t,r){"use strict";var o=Object.prototype.hasOwnProperty,n=Array.isArray,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},o=0;o<e.length;++o)void 0!==e[o]&&(r[o]=e[o]);return r};e.exports={arrayToObject:a,assign:function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],o=0;o<t.length;++o)for(var i=t[o],a=i.obj[i.prop],s=Object.keys(a),l=0;l<s.length;++l){var c=s[l],u=a[c];"object"==typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:a,prop:c}),r.push(u))}return function(e){for(;e.length>1;){var t=e.pop(),r=t.obj[t.prop];if(n(r)){for(var o=[],i=0;i<r.length;++i)void 0!==r[i]&&o.push(r[i]);t.obj[t.prop]=o}}}(t),e},decode:function(e,t,r){var o=e.replace(/\+/g," ");if("iso-8859-1"===r)return o.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(o)}catch(e){return o}},encode:function(e,t,r){if(0===e.length)return e;var o="string"==typeof e?e:String(e);if("iso-8859-1"===r)return escape(o).replace(/%u[0-9a-f]{4}/gi,function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"});for(var n="",a=0;a<o.length;++a){var s=o.charCodeAt(a);45===s||46===s||95===s||126===s||s>=48&&s<=57||s>=65&&s<=90||s>=97&&s<=122?n+=o.charAt(a):s<128?n+=i[s]:s<2048?n+=i[192|s>>6]+i[128|63&s]:s<55296||s>=57344?n+=i[224|s>>12]+i[128|s>>6&63]+i[128|63&s]:(a+=1,s=65536+((1023&s)<<10|1023&o.charCodeAt(a)),n+=i[240|s>>18]+i[128|s>>12&63]+i[128|s>>6&63]+i[128|63&s])}return n},isBuffer:function(e){return!(!e||"object"!=typeof e||!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e)))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function e(t,r,i){if(!r)return t;if("object"!=typeof r){if(n(t))t.push(r);else{if(!t||"object"!=typeof t)return[t,r];(i&&(i.plainObjects||i.allowPrototypes)||!o.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!=typeof t)return[t].concat(r);var s=t;return n(t)&&!n(r)&&(s=a(t,i)),n(t)&&n(r)?(r.forEach(function(r,n){if(o.call(t,n)){var a=t[n];a&&"object"==typeof a&&r&&"object"==typeof r?t[n]=e(a,r,i):t.push(r)}else t[n]=r}),t):Object.keys(r).reduce(function(t,n){var a=r[n];return o.call(t,n)?t[n]=e(t[n],a,i):t[n]=a,t},s)}}},qkKv:function(e,t,r){var o=r("FeBl"),n=o.JSON||(o.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}}});