webpackJsonp([1],{"0wFs":function(e,t){},CwSZ:function(e,t,r){"use strict";var o=r("p8xL"),n=r("XgCd"),i=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},l=Array.isArray,c=Array.prototype.push,s=function(e,t){c.apply(e,l(t)?t:[t])},u=Date.prototype.toISOString,f={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:o.encode,encodeValuesOnly:!1,formatter:n.formatters[n.default],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},p=function e(t,r,n,i,a,c,u,p,d,m,y,h,b){var v=t;if("function"==typeof u?v=u(r,v):v instanceof Date?v=m(v):"comma"===n&&l(v)&&(v=v.join(",")),null===v){if(i)return c&&!h?c(r,f.encoder,b):r;v=""}if("string"==typeof v||"number"==typeof v||"boolean"==typeof v||o.isBuffer(v))return c?[y(h?r:c(r,f.encoder,b))+"="+y(c(v,f.encoder,b))]:[y(r)+"="+y(String(v))];var g,w=[];if(void 0===v)return w;if(l(u))g=u;else{var O=Object.keys(v);g=p?O.sort(p):O}for(var j=0;j<g.length;++j){var x=g[j];a&&null===v[x]||(l(v)?s(w,e(v[x],"function"==typeof n?n(r,x):r,n,i,a,c,u,p,d,m,y,h,b)):s(w,e(v[x],r+(d?"."+x:"["+x+"]"),n,i,a,c,u,p,d,m,y,h,b)))}return w};e.exports=function(e,t){var r,o=e,c=function(e){if(!e)return f;if(null!==e.encoder&&void 0!==e.encoder&&"function"!=typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||f.charset;if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=n.default;if(void 0!==e.format){if(!i.call(n.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var o=n.formatters[r],a=f.filter;return("function"==typeof e.filter||l(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"==typeof e.addQueryPrefix?e.addQueryPrefix:f.addQueryPrefix,allowDots:void 0===e.allowDots?f.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:f.charsetSentinel,delimiter:void 0===e.delimiter?f.delimiter:e.delimiter,encode:"boolean"==typeof e.encode?e.encode:f.encode,encoder:"function"==typeof e.encoder?e.encoder:f.encoder,encodeValuesOnly:"boolean"==typeof e.encodeValuesOnly?e.encodeValuesOnly:f.encodeValuesOnly,filter:a,formatter:o,serializeDate:"function"==typeof e.serializeDate?e.serializeDate:f.serializeDate,skipNulls:"boolean"==typeof e.skipNulls?e.skipNulls:f.skipNulls,sort:"function"==typeof e.sort?e.sort:null,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:f.strictNullHandling}}(t);"function"==typeof c.filter?o=(0,c.filter)("",o):l(c.filter)&&(r=c.filter);var u,d=[];if("object"!=typeof o||null===o)return"";u=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var m=a[u];r||(r=Object.keys(o)),c.sort&&r.sort(c.sort);for(var y=0;y<r.length;++y){var h=r[y];c.skipNulls&&null===o[h]||s(d,p(o[h],h,m,c.strictNullHandling,c.skipNulls,c.encode?c.encoder:null,c.filter,c.sort,c.allowDots,c.serializeDate,c.formatter,c.encodeValuesOnly,c.charset))}var b=d.join(c.delimiter),v=!0===c.addQueryPrefix?"?":"";return c.charsetSentinel&&("iso-8859-1"===c.charset?v+="utf8=%26%2310003%3B&":v+="utf8=%E2%9C%93&"),b.length>0?v+b:""}},DDCP:function(e,t,r){"use strict";var o=r("p8xL"),n=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:o.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},a=function(e){return e.replace(/&#(\d+);/g,function(e,t){return String.fromCharCode(parseInt(t,10))})},l=function(e,t,r){if(e){var o=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/g,a=/(\[[^[\]]*])/.exec(o),l=a?o.slice(0,a.index):o,c=[];if(l){if(!r.plainObjects&&n.call(Object.prototype,l)&&!r.allowPrototypes)return;c.push(l)}for(var s=0;null!==(a=i.exec(o))&&s<r.depth;){if(s+=1,!r.plainObjects&&n.call(Object.prototype,a[1].slice(1,-1))&&!r.allowPrototypes)return;c.push(a[1])}return a&&c.push("["+o.slice(a.index)+"]"),function(e,t,r){for(var o=t,n=e.length-1;n>=0;--n){var i,a=e[n];if("[]"===a&&r.parseArrays)i=[].concat(o);else{i=r.plainObjects?Object.create(null):{};var l="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,c=parseInt(l,10);r.parseArrays||""!==l?!isNaN(c)&&a!==l&&String(c)===l&&c>=0&&r.parseArrays&&c<=r.arrayLimit?(i=[])[c]=o:i[l]=o:i={0:o}}o=i}return o}(c,t,r)}};e.exports=function(e,t){var r=function(e){if(!e)return i;if(null!==e.decoder&&void 0!==e.decoder&&"function"!=typeof e.decoder)throw new TypeError("Decoder has to be a function.");if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");var t=void 0===e.charset?i.charset:e.charset;return{allowDots:void 0===e.allowDots?i.allowDots:!!e.allowDots,allowPrototypes:"boolean"==typeof e.allowPrototypes?e.allowPrototypes:i.allowPrototypes,arrayLimit:"number"==typeof e.arrayLimit?e.arrayLimit:i.arrayLimit,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:i.charsetSentinel,comma:"boolean"==typeof e.comma?e.comma:i.comma,decoder:"function"==typeof e.decoder?e.decoder:i.decoder,delimiter:"string"==typeof e.delimiter||o.isRegExp(e.delimiter)?e.delimiter:i.delimiter,depth:"number"==typeof e.depth?e.depth:i.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof e.interpretNumericEntities?e.interpretNumericEntities:i.interpretNumericEntities,parameterLimit:"number"==typeof e.parameterLimit?e.parameterLimit:i.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"==typeof e.plainObjects?e.plainObjects:i.plainObjects,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:i.strictNullHandling}}(t);if(""===e||null===e||void 0===e)return r.plainObjects?Object.create(null):{};for(var c="string"==typeof e?function(e,t){var r,l={},c=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,s=t.parameterLimit===1/0?void 0:t.parameterLimit,u=c.split(t.delimiter,s),f=-1,p=t.charset;if(t.charsetSentinel)for(r=0;r<u.length;++r)0===u[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===u[r]?p="utf-8":"utf8=%26%2310003%3B"===u[r]&&(p="iso-8859-1"),f=r,r=u.length);for(r=0;r<u.length;++r)if(r!==f){var d,m,y=u[r],h=y.indexOf("]="),b=-1===h?y.indexOf("="):h+1;-1===b?(d=t.decoder(y,i.decoder,p),m=t.strictNullHandling?null:""):(d=t.decoder(y.slice(0,b),i.decoder,p),m=t.decoder(y.slice(b+1),i.decoder,p)),m&&t.interpretNumericEntities&&"iso-8859-1"===p&&(m=a(m)),m&&t.comma&&m.indexOf(",")>-1&&(m=m.split(",")),n.call(l,d)?l[d]=o.combine(l[d],m):l[d]=m}return l}(e,r):e,s=r.plainObjects?Object.create(null):{},u=Object.keys(c),f=0;f<u.length;++f){var p=u[f],d=l(p,c[p],r);s=o.merge(s,d,r)}return o.compact(s)}},Luci:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("mw3O"),n=r.n(o),i={data:function(){return{username:"zhang",password:"123"}},methods:{onSubmit:function(){var e=this,t={username:this.username,pwd:this.password};t=n.a.stringify(t),this.$http.post("http://api.baxiaobu.com/index.php/home/v1/login",t).then(function(t){200==t.data.status&&(localStorage.setItem("user_id",t.data.data.user_id),localStorage.setItem("username",e.username),e.$router.push("/home"))})}}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login"},[r("div",{staticClass:"login-box"},[r("el-form",{attrs:{"label-position":"left","label-width":"60px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"name"}},[r("el-input",{attrs:{"auto-complete":"off"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密  码",prop:"pass"}},[r("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("登录")])],1)],1)],1)])},staticRenderFns:[]};var l=r("VU/8")(i,a,!1,function(e){r("0wFs")},null,null);t.default=l.exports},XgCd:function(e,t,r){"use strict";var o=String.prototype.replace,n=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return o.call(e,n,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},mw3O:function(e,t,r){"use strict";var o=r("CwSZ"),n=r("DDCP"),i=r("XgCd");e.exports={formats:i,parse:n,stringify:o}},p8xL:function(e,t,r){"use strict";var o=Object.prototype.hasOwnProperty,n=Array.isArray,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},o=0;o<e.length;++o)void 0!==e[o]&&(r[o]=e[o]);return r};e.exports={arrayToObject:a,assign:function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],o=0;o<t.length;++o)for(var i=t[o],a=i.obj[i.prop],l=Object.keys(a),c=0;c<l.length;++c){var s=l[c],u=a[s];"object"==typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:a,prop:s}),r.push(u))}return function(e){for(;e.length>1;){var t=e.pop(),r=t.obj[t.prop];if(n(r)){for(var o=[],i=0;i<r.length;++i)void 0!==r[i]&&o.push(r[i]);t.obj[t.prop]=o}}}(t),e},decode:function(e,t,r){var o=e.replace(/\+/g," ");if("iso-8859-1"===r)return o.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(o)}catch(e){return o}},encode:function(e,t,r){if(0===e.length)return e;var o="string"==typeof e?e:String(e);if("iso-8859-1"===r)return escape(o).replace(/%u[0-9a-f]{4}/gi,function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"});for(var n="",a=0;a<o.length;++a){var l=o.charCodeAt(a);45===l||46===l||95===l||126===l||l>=48&&l<=57||l>=65&&l<=90||l>=97&&l<=122?n+=o.charAt(a):l<128?n+=i[l]:l<2048?n+=i[192|l>>6]+i[128|63&l]:l<55296||l>=57344?n+=i[224|l>>12]+i[128|l>>6&63]+i[128|63&l]:(a+=1,l=65536+((1023&l)<<10|1023&o.charCodeAt(a)),n+=i[240|l>>18]+i[128|l>>12&63]+i[128|l>>6&63]+i[128|63&l])}return n},isBuffer:function(e){return!(!e||"object"!=typeof e||!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e)))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function e(t,r,i){if(!r)return t;if("object"!=typeof r){if(n(t))t.push(r);else{if(!t||"object"!=typeof t)return[t,r];(i&&(i.plainObjects||i.allowPrototypes)||!o.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!=typeof t)return[t].concat(r);var l=t;return n(t)&&!n(r)&&(l=a(t,i)),n(t)&&n(r)?(r.forEach(function(r,n){if(o.call(t,n)){var a=t[n];a&&"object"==typeof a&&r&&"object"==typeof r?t[n]=e(a,r,i):t.push(r)}else t[n]=r}),t):Object.keys(r).reduce(function(t,n){var a=r[n];return o.call(t,n)?t[n]=e(t[n],a,i):t[n]=a,t},l)}}}});