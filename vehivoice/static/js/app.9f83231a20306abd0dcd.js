webpackJsonp([94],{0:function(e,n,t){t("j1ja"),e.exports=t("NHnr")},"5hJP":function(e,n){},IcnI:function(e,n,t){"use strict";var i=t("7+uW"),o=t("NYxO");i.default.use(o.a);n.a=new o.a.Store({getters:{get_userinfo:function(e){return e.userinfo}},state:{userinfo:"0"},mutations:{set_userinfo:function(e,n){e.userinfo=n}}})},N8z9:function(e,n){},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t("7+uW"),o={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[this.isRouterAlive?n("router-view"):this._e()],1)},staticRenderFns:[]};var l=t("VU/8")({name:"App",provide:function(){return{reload:this.reload}},data:function(){return{isRouterAlive:!0}},created:function(){},methods:{reload:function(){this.isRouterAlive=!1,this.$nextTick(function(){this.isRouterAlive=!0})}}},o,!1,function(e){t("5hJP")},null,null).exports,r=t("YaEn"),a=(t("j1ja"),t("NC6I")),u=t.n(a),m=t("zL8q"),s=t.n(m),c=(t("tvR6"),t("OxAK"),t("mtWM")),d=t.n(c),p=(t("N8z9"),t("IcnI"));t.d(n,"has",function(){return h}),i.default.config.productionTip=!1,i.default.config.devtools=!0,i.default.prototype.$md5=u.a,i.default.use(s.a),i.default.prototype.$http=d.a,t("GbHy"),t("4UDB"),t("Vb+l"),t("Oq2I"),t("miEh"),t("wQkr");var h=i.default.directive("has",{inserted:function(e,n){i.default.prototype.$_has(n.value)||e.parentNode.removeChild(e)}});i.default.prototype.$_has=function(e){var n=!1,t=JSON.parse(sessionStorage.getItem("btnpermission"));if(void 0===t||null===t)return!1;for(var i=0;i<t.length;i++)if(e===t[i].ruleCode){n=!0;break}return n},new i.default({el:"#app",router:r.a,store:p.a,components:{App:l},template:"<App/>"})},OxAK:function(e,n){},UVIz:function(e,n){},YaEn:function(e,n,t){"use strict";var i=t("7+uW"),o=t("/ocq"),l=t("IcnI"),r=t("zL8q"),a=(t.n(r),t("Y81h")),u=t.n(a),m=t("UVIz");t.n(m);i.default.use(o.a);var s=new o.a({mode:"history",routes:[{path:"/login",component:function(){return Promise.all([t.e(0),t.e(4)]).then(t.bind(null,"Luci"))},meta:{title:"登录"}},{path:"/register",component:function(){return t.e(33).then(t.bind(null,"1cHr"))}},{path:"/",redirect:"/home"},{path:"*",redirect:"/404"},{path:"/home",component:function(){return Promise.all([t.e(0),t.e(3)]).then(t.bind(null,"vkyI"))},children:[{path:"/home/index",component:function(){return Promise.all([t.e(0),t.e(13)]).then(t.bind(null,"2NXm"))},meta:{title:"语音服务管理系统",needLogin:!0}},{path:"/app/list",component:function(){return Promise.all([t.e(0),t.e(85)]).then(t.bind(null,"B9Pa"))},meta:{title:"应用列表",needLogin:!0}},{path:"/app/keyWord",component:function(){return Promise.all([t.e(0),t.e(39)]).then(t.bind(null,"ORaj"))},meta:{title:"应用关键词",needLogin:!0}},{path:"/app/aliReg",component:function(){return Promise.all([t.e(0),t.e(58)]).then(t.bind(null,"xnEe"))},meta:{title:"应用别名规则",needLogin:!0}},{path:"/app/cache",component:function(){return Promise.all([t.e(0),t.e(87)]).then(t.bind(null,"kkQr"))},meta:{title:"应用缓存",needLogin:!0}},{path:"/app/applist",component:function(){return Promise.all([t.e(0),t.e(73)]).then(t.bind(null,"XCgB"))},meta:{title:"应用名称管理",needLogin:!0}},{path:"/was/weblist",component:function(){return Promise.all([t.e(0),t.e(79)]).then(t.bind(null,"v3Rh"))},meta:{title:"网站导航",needLogin:!0}},{path:"/dict/list",component:function(){return Promise.all([t.e(0),t.e(22)]).then(t.bind(null,"zMg6"))},meta:{title:"热词列表",needLogin:!0}},{path:"/engineDict/list",component:function(){return Promise.all([t.e(0),t.e(31)]).then(t.bind(null,"vyH1"))},meta:{title:"引擎表热词",needLogin:!0}},{path:"/csc/csc",component:function(){return Promise.all([t.e(0),t.e(89)]).then(t.bind(null,"MwPh"))},meta:{title:"常用服务电话",needLogin:!0}},{path:"/chat/list",component:function(){return Promise.all([t.e(0),t.e(77)]).then(t.bind(null,"FX4T"))},meta:{title:"闲聊数据上报",needLogin:!0}},{path:"/joke/list",component:function(){return Promise.all([t.e(0),t.e(74)]).then(t.bind(null,"IMQM"))},meta:{title:"笑话列表",needLogin:!0}},{path:"/joke/speakList",component:function(){return Promise.all([t.e(0),t.e(28)]).then(t.bind(null,"Hr9W"))},meta:{title:"笑话领域说法",needLogin:!0}},{path:"/unit/list",component:function(){return Promise.all([t.e(0),t.e(29)]).then(t.bind(null,"5aPv"))},meta:{title:"单位换算领域说法",needLogin:!0}},{path:"/sen/list",component:function(){return Promise.all([t.e(0),t.e(35)]).then(t.bind(null,"ygwS"))},meta:{title:"敏感词",needLogin:!0}},{path:"/trigger/list",component:function(){return Promise.all([t.e(0),t.e(32)]).then(t.bind(null,"YFle"))},meta:{title:"语音唤醒",needLogin:!0}},{path:"/movie/list",component:function(){return Promise.all([t.e(0),t.e(81)]).then(t.bind(null,"z4qE"))},meta:{title:"电影管理",needLogin:!0}},{path:"/ask/list",component:function(){return Promise.all([t.e(0),t.e(63)]).then(t.bind(null,"BPbJ"))},meta:{title:"要求管理",needLogin:!0}},{path:"/qa/list",component:function(){return Promise.all([t.e(0),t.e(52)]).then(t.bind(null,"6QGq"))},meta:{title:"定制问答查看",needLogin:!0}},{path:"/qa/channelList",component:function(){return Promise.all([t.e(0),t.e(66)]).then(t.bind(null,"i5cX"))},meta:{title:"个性化词语管理",needLogin:!0}},{path:"/rule/list",component:function(){return Promise.all([t.e(0),t.e(67)]).then(t.bind(null,"Ij2A"))},meta:{title:"小不点规则查看",needLogin:!0}},{path:"/grey/funlist",component:function(){return Promise.all([t.e(0),t.e(25)]).then(t.bind(null,"xnvG"))},meta:{title:"灰度发布-功能列表",needLogin:!0}},{path:"/rule/devlist",component:function(){return Promise.all([t.e(0),t.e(42)]).then(t.bind(null,"ybBp"))},meta:{title:"灰度发布-机型列表",needLogin:!0}},{path:"/goods/list",component:function(){return Promise.all([t.e(0),t.e(16)]).then(t.bind(null,"ZPSw"))},meta:{title:"商品管理",needLogin:!0}},{path:"/ttsgrey/devlist",component:function(){return Promise.all([t.e(0),t.e(78)]).then(t.bind(null,"HXpn"))},meta:{title:"TTS灰度",needLogin:!0}},{path:"/showmode/conf",component:function(){return Promise.all([t.e(0),t.e(12)]).then(t.bind(null,"ZPXn"))},meta:{title:"资源发布",needLogin:!0}},{path:"/showmode/list",component:function(){return Promise.all([t.e(0),t.e(2)]).then(t.bind(null,"LroN"))},meta:{title:"资源管理",needLogin:!0}},{path:"/showmode/add",component:function(){return Promise.all([t.e(0),t.e(9)]).then(t.bind(null,"Shg7"))},meta:{title:"创建资源",needLogin:!0}},{path:"/showmode/edit",component:function(){return Promise.all([t.e(0),t.e(10)]).then(t.bind(null,"p9Ch"))},meta:{title:"编辑资源",needLogin:!0}},{path:"/showmode/history",component:function(){return Promise.all([t.e(0),t.e(53)]).then(t.bind(null,"qoUw"))},meta:{title:"历史版本",needLogin:!0}},{path:"/showmode/gray",component:function(){return Promise.all([t.e(0),t.e(48)]).then(t.bind(null,"FDUa"))},meta:{title:"灰度配置",needLogin:!0}},{path:"/kv/list",component:function(){return Promise.all([t.e(0),t.e(26)]).then(t.bind(null,"R6EK"))},meta:{title:"KV列表",needLogin:!0}},{path:"/kv/engine/view",component:function(){return Promise.all([t.e(0),t.e(49)]).then(t.bind(null,"943s"))},meta:{title:"asr引擎规则",needLogin:!0}},{path:"/outer/list",component:function(){return Promise.all([t.e(0),t.e(37)]).then(t.bind(null,"etgG"))},meta:{title:"三方错误信息",needLogin:!0}},{path:"/skill/applist",component:function(){return Promise.all([t.e(0),t.e(11)]).then(t.bind(null,"mJjX"))},meta:{title:"应用列表",needLogin:!0}},{path:"/lasf-kv/skill/detail",component:function(){return Promise.all([t.e(0),t.e(47)]).then(t.bind(null,"y8iu"))},meta:{title:"应用详情",needLogin:!0}},{path:"/lasf-kv/skill/detail/speak",component:function(){return Promise.all([t.e(0),t.e(45)]).then(t.bind(null,"O/mt"))},meta:{title:"技能说法列表",needLogin:!0}},{path:"/lasf-kv/skill/detail/sersion",component:function(){return Promise.all([t.e(0),t.e(17)]).then(t.bind(null,"2W2a"))},meta:{title:"技能答案列表",needLogin:!0}},{path:"/skill/videolist",component:function(){return Promise.all([t.e(0),t.e(71)]).then(t.bind(null,"Jcxy"))},meta:{title:"技能视频管理",needLogin:!0}},{path:"/skill/music/singerlist",component:function(){return Promise.all([t.e(0),t.e(21)]).then(t.bind(null,"Yb8w"))},meta:{title:"音乐歌手管理",needLogin:!0}},{path:"/lasf-kv/album",component:function(){return Promise.all([t.e(0),t.e(15)]).then(t.bind(null,"D7th"))},meta:{title:"音乐歌手管理",needLogin:!0}},{path:"/lasf-kv/song",component:function(){return Promise.all([t.e(0),t.e(72)]).then(t.bind(null,"gl4B"))},meta:{title:"音乐歌手管理",needLogin:!0}},{path:"/permission/role",component:function(){return Promise.all([t.e(0),t.e(82)]).then(t.bind(null,"utgc"))},meta:{title:"角色管理",needLogin:!0}},{path:"/permission/auth",component:function(){return Promise.all([t.e(0),t.e(38)]).then(t.bind(null,"ppPz"))},meta:{title:"用户管理",needLogin:!0}},{path:"/userinfo/list",component:function(){return Promise.all([t.e(0),t.e(61)]).then(t.bind(null,"tJ41"))},meta:{title:"官网用户",needLogin:!0}},{path:"/rule/fetch",component:function(){return Promise.all([t.e(0),t.e(27)]).then(t.bind(null,"lGRM"))},meta:{title:"权限管理",needLogin:!0}},{path:"/rule/detail",component:function(){return Promise.all([t.e(0),t.e(44)]).then(t.bind(null,"ZQP9"))},meta:{title:"权限管理",needLogin:!0}},{path:"/license/list",component:function(){return Promise.all([t.e(0),t.e(62)]).then(t.bind(null,"iOMR"))},meta:{title:"授权管理",needLogin:!0}},{path:"/home/userinfo",component:function(){return t.e(64).then(t.bind(null,"aJHb"))},meta:{title:"详细信息",needLogin:!0}},{path:"/command/list",component:function(){return Promise.all([t.e(0),t.e(23)]).then(t.bind(null,"YSeL"))},meta:{title:"相似度命令管理",needLogin:!0}},{path:"/command/norun/list",component:function(){return Promise.all([t.e(0),t.e(84)]).then(t.bind(null,"Da7z"))},meta:{title:"指令忽略管理",needLogin:!0}},{path:"/command/mainlist",component:function(){return Promise.all([t.e(0),t.e(43)]).then(t.bind(null,"DgCU"))},meta:{title:"指令忽略管理",needLogin:!0}},{path:"/asr/log/client",component:function(){return Promise.all([t.e(0),t.e(24)]).then(t.bind(null,"9bGk"))},meta:{title:"客户端上报日志",needLogin:!0}},{path:"/log/client/chart",component:function(){return Promise.all([t.e(0),t.e(18)]).then(t.bind(null,"GeyN"))},meta:{title:"客户端上报日志",needLogin:!0}},{path:"/asr/log/rawlog",component:function(){return Promise.all([t.e(0),t.e(5)]).then(t.bind(null,"zE/n"))},meta:{title:"客户端原始日志",needLogin:!0}},{path:"/asr/log/oprlog",component:function(){return Promise.all([t.e(0),t.e(80)]).then(t.bind(null,"zDsE"))},meta:{title:"客户端操作日志",needLogin:!0}},{path:"/asr/log/rvdlog",component:function(){return Promise.all([t.e(0),t.e(6)]).then(t.bind(null,"aV5e"))},meta:{title:"客户端原始音频",needLogin:!0}},{path:"/servlog/loglist",component:function(){return Promise.all([t.e(0),t.e(88)]).then(t.bind(null,"c914"))},meta:{title:"明细日志",needLogin:!0}},{path:"/asr/log/asrf",component:function(){return Promise.all([t.e(0),t.e(14)]).then(t.bind(null,"F+lX"))},meta:{title:"服务端错误日志",needLogin:!0}},{path:"/vse/log/serv",component:function(){return Promise.all([t.e(0),t.e(30)]).then(t.bind(null,"Kngn"))},meta:{title:"服务端日志",needLogin:!0}},{path:"/paydaily/list",component:function(){return Promise.all([t.e(0),t.e(34)]).then(t.bind(null,"TV7j"))},meta:{title:"支付记录",needLogin:!0}},{path:"/source/list",component:function(){return Promise.all([t.e(0),t.e(59)]).then(t.bind(null,"WVmJ"))},meta:{title:"NLP日志分析",needLogin:!0}},{path:"/colud/uselog/list",component:function(){return Promise.all([t.e(0),t.e(60)]).then(t.bind(null,"3qOn"))},meta:{title:"官网调用日志",needLogin:!0}},{path:"/visit/list",component:function(){return Promise.all([t.e(0),t.e(68)]).then(t.bind(null,"eW8j"))},meta:{title:"官网访问统计",needLogin:!0}},{path:"/census/list",component:function(){return Promise.all([t.e(0),t.e(69)]).then(t.bind(null,"VBc3"))},meta:{title:"访问量统计",needLogin:!0}},{path:"/servlog/list",component:function(){return Promise.all([t.e(0),t.e(65)]).then(t.bind(null,"2ajk"))},meta:{title:"NLP领域统计",needLogin:!0}},{path:"/sysLog/list",component:function(){return Promise.all([t.e(0),t.e(70)]).then(t.bind(null,"g9N/"))},meta:{title:"管理系统操作日志",needLogin:!0}},{path:"/lenovokey/list",component:function(){return Promise.all([t.e(0),t.e(40)]).then(t.bind(null,"j+L8"))},meta:{title:"联想大脑统计",needLogin:!0}},{path:"/gift/add",component:function(){return Promise.all([t.e(0),t.e(55)]).then(t.bind(null,"O3g1"))},meta:{title:"报表配置",needLogin:!0}},{path:"/gift/querySql",component:function(){return Promise.all([t.e(0),t.e(90)]).then(t.bind(null,"J90v"))},meta:{title:"用户报表",needLogin:!0}},{path:"/item/list",component:function(){return Promise.all([t.e(0),t.e(19)]).then(t.bind(null,"Xi1I"))},meta:{title:"用户自定义",needLogin:!0}},{path:"/forum/list",component:function(){return Promise.all([t.e(0),t.e(54)]).then(t.bind(null,"SDfq"))},meta:{title:"论坛管理",needLogin:!0}},{path:"/forum/detail",component:function(){return Promise.all([t.e(0),t.e(86)]).then(t.bind(null,"GohJ"))},meta:{title:"论坛详情",needLogin:!0}},{path:"/allDur/list",component:function(){return Promise.all([t.e(0),t.e(51)]).then(t.bind(null,"U6sc"))},meta:{title:"时间相应统计",needLogin:!0}},{path:"/error/chart",component:function(){return Promise.all([t.e(0),t.e(41)]).then(t.bind(null,"bvja"))},meta:{title:"异常率统计",needLogin:!0}},{path:"/ttsregular/list",component:function(){return Promise.all([t.e(0),t.e(83)]).then(t.bind(null,"Pwyu"))},meta:{title:"TTS规则配置",needLogin:!0}},{path:"/news/list",component:function(){return Promise.all([t.e(0),t.e(1)]).then(t.bind(null,"X1M1"))},meta:{title:"官网新闻资讯",needLogin:!0}},{path:"/audiokeeper/list",component:function(){return Promise.all([t.e(0),t.e(50)]).then(t.bind(null,"FAu/"))},meta:{title:"audiokeeper",needLogin:!0}},{path:"/audiokeeperMigrate/socketTotal",component:function(){return Promise.all([t.e(0),t.e(57)]).then(t.bind(null,"znMq"))},meta:{title:"服务迁移",needLogin:!0}},{path:"/engine/client/total",component:function(){return Promise.all([t.e(0),t.e(75)]).then(t.bind(null,"mwpC"))},meta:{title:"引擎下线",needLogin:!0}},{path:"/audiokeeper/statistics/voicebytes",component:function(){return Promise.all([t.e(0),t.e(56)]).then(t.bind(null,"JD8y"))},meta:{title:"语音字节数统计",needLogin:!0}},{path:"/iot/list",component:function(){return Promise.all([t.e(0),t.e(36)]).then(t.bind(null,"33yN"))},meta:{title:"设备列表",needLogin:!0}},{path:"/scene/list",component:function(){return Promise.all([t.e(0),t.e(46)]).then(t.bind(null,"1m6a"))},meta:{title:"场景列表",needLogin:!0}},{path:"/iot/log/list",component:function(){return Promise.all([t.e(0),t.e(20)]).then(t.bind(null,"xA/G"))},meta:{title:"设备日志",needLogin:!0}},{path:"/nlulog/list",component:function(){return Promise.all([t.e(0),t.e(76)]).then(t.bind(null,"r7jg"))},meta:{title:"运营日志分析",needLogin:!0}},{path:"/user/checkpass",component:function(){return Promise.all([t.e(0),t.e(92)]).then(t.bind(null,"86P0"))},meta:{title:"修改密码",needLogin:!0}},{path:"/user/userinfo",component:function(){return Promise.all([t.e(0),t.e(91)]).then(t.bind(null,"6a4T"))},meta:{title:"用户信息"}},{path:"/401",component:function(){return t.e(8).then(t.bind(null,"wEzC"))},meta:{title:"401"}},{path:"/404",component:function(){return t.e(7).then(t.bind(null,"c5Mg"))},meta:{title:"404"}},{path:"/home",redirect:"/home/index"}]}]});s.beforeEach(function(e,n,t){if(window.document.title=e.meta.title,u.a.start(),e.meta.needLogin){var i=sessionStorage.getItem("token");try{i=JSON.parse(i)}catch(e){i=i}if(i)(new Date).getTime()-i.startTime>18e5?(l.a.commit("set_userinfo","1"),sessionStorage.clear(),t("/login"),u.a.done()):(t(),u.a.done());else l.a.commit("set_userinfo","1"),sessionStorage.clear(),t("/login"),u.a.done()}else t(),u.a.done()}),s.afterEach(function(){window.scrollTo(0,0),u.a.done()}),n.a=s},tvR6:function(e,n){}},[0]);