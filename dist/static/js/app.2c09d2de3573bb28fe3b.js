webpackJsonp([70],{0:function(e,t,n){n("j1ja"),e.exports=n("NHnr")},N8z9:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=n("7+uW"),i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[this.isRouterAlive?t("router-view"):this._e()],1)},staticRenderFns:[]};var o=n("VU/8")({name:"App",provide:function(){return{reload:this.reload}},data:function(){return{isRouterAlive:!0}},methods:{reload:function(){this.isRouterAlive=!1,this.$nextTick(function(){this.isRouterAlive=!0})}}},i,!1,function(e){n("V3Mj")},null,null).exports,r=n("YaEn"),a=(n("j1ja"),n("EOXk"),n("zL8q")),u=n.n(a),m=(n("tvR6"),n("OxAK"),n("mtWM")),s=n.n(m),c=(n("N8z9"),n("NYxO"));l.default.use(c.a);var p=new c.a.Store({modules:{user:{state:{perms:[]},getters:{},mutations:{setPerms:function(e,t){e.perms=t}},actions:{}}}});n.d(t,"has",function(){return h}),l.default.config.productionTip=!1,l.default.use(u.a),l.default.prototype.$http=s.a,n("GbHy"),n("Vb+l"),n("Oq2I"),n("miEh"),n("wQkr");var h=l.default.directive("has",{inserted:function(e,t){l.default.prototype.$_has(t.value)||e.parentNode.removeChild(e)}});l.default.prototype.$_has=function(e){var t=!1,n=JSON.parse(sessionStorage.getItem("btnpermission"));if(void 0===n||null===n)return!1;for(var l=0;l<n.length;l++)if(e===n[l].ruleCode){t=!0;break}return t},new l.default({el:"#app",router:r.a,store:p,components:{App:o},template:"<App/>"})},OxAK:function(e,t){},UVIz:function(e,t){},V3Mj:function(e,t){},YaEn:function(e,t,n){"use strict";var l=n("7+uW"),i=n("/ocq"),o=n("Y81h"),r=n.n(o),a=n("UVIz");n.n(a);l.default.use(i.a);var u=new i.a({routes:[{path:"/login",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"Luci"))},meta:{title:"登录"}},{path:"/register",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"1cHr"))}},{path:"/",redirect:"/home"},{path:"*",redirect:"/404"},{path:"/home",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"vkyI"))},children:[{path:"/home/index",component:function(){return Promise.all([n.e(0),n.e(28)]).then(n.bind(null,"2NXm"))},meta:{title:"语音服务管理系统"}},{path:"/app/list",component:function(){return Promise.all([n.e(0),n.e(17)]).then(n.bind(null,"B9Pa"))},meta:{title:"应用列表"}},{path:"/app/keyWord",component:function(){return Promise.all([n.e(0),n.e(33)]).then(n.bind(null,"ORaj"))},meta:{title:"应用关键词"}},{path:"/app/aliReg",component:function(){return Promise.all([n.e(0),n.e(43)]).then(n.bind(null,"xnEe"))},meta:{title:"应用别名规则"}},{path:"/app/cache",component:function(){return Promise.all([n.e(0),n.e(23)]).then(n.bind(null,"kkQr"))},meta:{title:"应用缓存"}},{path:"/app/applist",component:function(){return Promise.all([n.e(0),n.e(40)]).then(n.bind(null,"XCgB"))},meta:{title:"应用名称管理"}},{path:"/was/weblist",component:function(){return Promise.all([n.e(0),n.e(14)]).then(n.bind(null,"v3Rh"))},meta:{title:"网站导航"}},{path:"/dict/list",component:function(){return Promise.all([n.e(0),n.e(51)]).then(n.bind(null,"zMg6"))},meta:{title:"热词列表"}},{path:"/csc/csc",component:function(){return Promise.all([n.e(0),n.e(32)]).then(n.bind(null,"MwPh"))},meta:{title:"常用服务电话"}},{path:"/chat/list",component:function(){return Promise.all([n.e(0),n.e(20)]).then(n.bind(null,"FX4T"))},meta:{title:"闲聊数据上报"}},{path:"/joke/list",component:function(){return Promise.all([n.e(0),n.e(58)]).then(n.bind(null,"IMQM"))},meta:{title:"笑话列表"}},{path:"/joke/speakList",component:function(){return Promise.all([n.e(0),n.e(24)]).then(n.bind(null,"Hr9W"))},meta:{title:"笑话领域说法"}},{path:"/unit/list",component:function(){return Promise.all([n.e(0),n.e(15)]).then(n.bind(null,"5aPv"))},meta:{title:"单位换算领域说法"}},{path:"/sen/list",component:function(){return Promise.all([n.e(0),n.e(61)]).then(n.bind(null,"ygwS"))},meta:{title:"敏感词"}},{path:"/trigger/list",component:function(){return Promise.all([n.e(0),n.e(56)]).then(n.bind(null,"YFle"))},meta:{title:"语音唤醒"}},{path:"/movie/list",component:function(){return Promise.all([n.e(0),n.e(44)]).then(n.bind(null,"z4qE"))},meta:{title:"电影管理"}},{path:"/ask/list",component:function(){return Promise.all([n.e(0),n.e(38)]).then(n.bind(null,"BPbJ"))},meta:{title:"要求管理"}},{path:"/qa/list",component:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"6QGq"))},meta:{title:"定制问答查看"}},{path:"/qa/channelList",component:function(){return Promise.all([n.e(0),n.e(59)]).then(n.bind(null,"i5cX"))},meta:{title:"个性化词语管理"}},{path:"/rule/list",component:function(){return Promise.all([n.e(0),n.e(65)]).then(n.bind(null,"Ij2A"))},meta:{title:"小不点规则查看"}},{path:"/grey/funlist",component:function(){return Promise.all([n.e(0),n.e(42)]).then(n.bind(null,"xnvG"))},meta:{title:"灰度发布-功能列表"}},{path:"/rule/devlist",component:function(){return Promise.all([n.e(0),n.e(46)]).then(n.bind(null,"ybBp"))},meta:{title:"灰度发布-机型列表"}},{path:"/showmode/conf",component:function(){return Promise.all([n.e(0),n.e(67)]).then(n.bind(null,"ZPXn"))},meta:{title:"资源发布"}},{path:"/showmode/list",component:function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"LroN"))},meta:{title:"资源管理"}},{path:"/showmode/add",component:function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,"Shg7"))},meta:{title:"创建资源"}},{path:"/showmode/edit",component:function(){return Promise.all([n.e(0),n.e(12)]).then(n.bind(null,"p9Ch"))},meta:{title:"编辑资源"}},{path:"/showmode/history",component:function(){return Promise.all([n.e(0),n.e(30)]).then(n.bind(null,"qoUw"))},meta:{title:"历史版本"}},{path:"/kv/list",component:function(){return Promise.all([n.e(0),n.e(34)]).then(n.bind(null,"R6EK"))},meta:{title:"KV列表"}},{path:"/kv/engine/view",component:function(){return Promise.all([n.e(0),n.e(52)]).then(n.bind(null,"943s"))},meta:{title:"asr引擎规则"}},{path:"/outer/list",component:function(){return Promise.all([n.e(0),n.e(35)]).then(n.bind(null,"etgG"))},meta:{title:"三方错误信息"}},{path:"/skill/applist",component:function(){return Promise.all([n.e(0),n.e(19)]).then(n.bind(null,"mJjX"))},meta:{title:"应用列表"}},{path:"/lasf-kv/skill/detail",component:function(){return Promise.all([n.e(0),n.e(27)]).then(n.bind(null,"y8iu"))},meta:{title:"应用详情"}},{path:"/lasf-kv/skill/detail/speak",component:function(){return Promise.all([n.e(0),n.e(31)]).then(n.bind(null,"O/mt"))},meta:{title:"技能说法列表"}},{path:"/lasf-kv/skill/detail/sersion",component:function(){return Promise.all([n.e(0),n.e(49)]).then(n.bind(null,"2W2a"))},meta:{title:"技能答案列表"}},{path:"/skill/videolist",component:function(){return Promise.all([n.e(0),n.e(25)]).then(n.bind(null,"Jcxy"))},meta:{title:"技能视频管理"}},{path:"/skill/music/singerlist",component:function(){return Promise.all([n.e(0),n.e(47)]).then(n.bind(null,"Yb8w"))},meta:{title:"音乐歌手管理"}},{path:"/lasf-kv/album",component:function(){return Promise.all([n.e(0),n.e(55)]).then(n.bind(null,"D7th"))},meta:{title:"音乐歌手管理"}},{path:"/lasf-kv/song",component:function(){return Promise.all([n.e(0),n.e(29)]).then(n.bind(null,"gl4B"))},meta:{title:"音乐歌手管理"}},{path:"/permission/role",component:function(){return Promise.all([n.e(0),n.e(54)]).then(n.bind(null,"utgc"))},meta:{title:"角色管理"}},{path:"/permission/auth",component:function(){return Promise.all([n.e(0),n.e(50)]).then(n.bind(null,"ppPz"))},meta:{title:"用户管理"}},{path:"/userinfo/list",component:function(){return Promise.all([n.e(0),n.e(39)]).then(n.bind(null,"tJ41"))},meta:{title:"用户管理"}},{path:"/home/userinfo",component:function(){return n.e(68).then(n.bind(null,"aJHb"))},meta:{title:"详细信息"}},{path:"/command/list",component:function(){return Promise.all([n.e(0),n.e(62)]).then(n.bind(null,"YSeL"))},meta:{title:"相似度命令管理"}},{path:"/command/norun/list",component:function(){return Promise.all([n.e(0),n.e(26)]).then(n.bind(null,"Da7z"))},meta:{title:"指令忽略管理"}},{path:"/command/mainlist",component:function(){return Promise.all([n.e(0),n.e(22)]).then(n.bind(null,"DgCU"))},meta:{title:"指令忽略管理"}},{path:"/asr/log/client",component:function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"9bGk"))},meta:{title:"客户端上报日志"}},{path:"/asr/log/rawlog",component:function(){return Promise.all([n.e(0),n.e(13)]).then(n.bind(null,"zE/n"))},meta:{title:"客户端原始日志"}},{path:"/asr/log/oprlog",component:function(){return Promise.all([n.e(0),n.e(37)]).then(n.bind(null,"zDsE"))},meta:{title:"客户端操作日志"}},{path:"/asr/log/rvdlog",component:function(){return Promise.all([n.e(0),n.e(41)]).then(n.bind(null,"aV5e"))},meta:{title:"客户端原始音频"}},{path:"/servlog/loglist",component:function(){return Promise.all([n.e(0),n.e(45)]).then(n.bind(null,"c914"))},meta:{title:"明细日志"}},{path:"/asr/log/asrf",component:function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,"F+lX"))},meta:{title:"服务端错误日志"}},{path:"/vse/log/serv",component:function(){return Promise.all([n.e(0),n.e(64)]).then(n.bind(null,"Kngn"))},meta:{title:"服务端日志"}},{path:"/source/list",component:function(){return Promise.all([n.e(0),n.e(18)]).then(n.bind(null,"WVmJ"))},meta:{title:"NLP日志分析"}},{path:"/census/list",component:function(){return Promise.all([n.e(0),n.e(36)]).then(n.bind(null,"VBc3"))},meta:{title:"访问量统计"}},{path:"/servlog/list",component:function(){return Promise.all([n.e(0),n.e(66)]).then(n.bind(null,"2ajk"))},meta:{title:"NL领域统计"}},{path:"/avater/uv",component:function(){return Promise.all([n.e(0),n.e(63)]).then(n.bind(null,"8HgV"))},meta:{title:"用户统计"}},{path:"/avater/list",component:function(){return Promise.all([n.e(0),n.e(16)]).then(n.bind(null,"e+cG"))},meta:{title:"事件统计"}},{path:"/lenovokey/list",component:function(){return Promise.all([n.e(0),n.e(21)]).then(n.bind(null,"j+L8"))},meta:{title:"联想大脑统计"}},{path:"/gift/add",component:function(){return Promise.all([n.e(0),n.e(60)]).then(n.bind(null,"O3g1"))},meta:{title:"报表配置"}},{path:"/gift/querySql",component:function(){return Promise.all([n.e(0),n.e(57)]).then(n.bind(null,"J90v"))},meta:{title:"报表配置"}},{path:"/item/list",component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"Xi1I"))},meta:{title:"用户自定义"}},{path:"/allDur/list",component:function(){return Promise.all([n.e(0),n.e(53)]).then(n.bind(null,"U6sc"))},meta:{title:"时间相应统计"}},{path:"/error/chart",component:function(){return Promise.all([n.e(0),n.e(48)]).then(n.bind(null,"bvja"))},meta:{title:"异常率统计"}},{path:"/401",component:function(){return n.e(9).then(n.bind(null,"wEzC"))},meta:{title:"401"}},{path:"/404",component:function(){return n.e(10).then(n.bind(null,"c5Mg"))},meta:{title:"404"}},{path:"/home",redirect:"/home/index"}]}]});u.beforeEach(function(e,t,n){window.document.title=e.meta.title;var l=sessionStorage.getItem("username");r.a.start(),l?n():"/login"==e.path?n():(n("/login"),r.a.done())}),u.afterEach(function(){window.scrollTo(0,0),r.a.done()}),t.a=u},tvR6:function(e,t){}},[0]);