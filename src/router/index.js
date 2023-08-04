/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index';
import { Message, MessageBox} from 'element-ui'
// 使用loading
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
let EXPIRESTIME = 1800000

Vue.use(Router)

const router = new Router({
  mode:'history',
  base:'/vehivoice/',
  routes: [
    {
      path: '/login',
      name:'login',
      component: () => import('@/pages/login'),
      meta: {title: '登录'}
    },
    {
      path: '/register',
      name:'register',
      component: () => import('@/pages/register')
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/home',
      component: () => import('@/pages/home'),
      children: [
        {
          path: '/home/index',
          name:'index',
          component: () => import('@/pages/index'),
          meta: {title: '语音服务管理系统',needLogin:true}
        },
        {
          path: '/app/list',
          name:'applist',
          component: () => import('@/pages/app/list'),
          meta: {title: '应用列表',needLogin:true}
        },
        {
          path: '/app/keyWord',
          name:'appkeyword',
          component: () => import('@/pages/app/keyWord'),
          meta: {title: '应用关键词',needLogin:true}
        },
        {
          path: '/app/aliReg',
          name:'appaliReg',
          component: () => import('@/pages/app/aliReg'),
          meta: {title: '应用别名规则',needLogin:true}
        },
        {
          path: '/app/cache',
          name:'appcache',
          component: () => import('@/pages/app/cache'),
          meta: {title: '应用缓存',needLogin:true}
        },
        {
          path: '/app/applist',
          name:'appapplist',
          component: () => import('@/pages/app/appName'),
          meta: {title: '应用名称',needLogin:true}
        },
        {
          path: '/was/weblist',
          name:'weblist',
          component: () => import('@/pages/chat/was'),
          meta: {title: '网站导航',needLogin:true}
        },
        {
          path: '/dict/list',
          name:'dictlist',
          component: () => import('@/pages/chat/dict'),
          meta: {title: '热词列表',needLogin:true}
        },
        {
          path: '/engineDict/list',
          name:'engineDict',
          component: () => import('@/pages/chat/engineDict'),
          meta: {title: '引擎表热词',needLogin:true}
        },
        {
          path: '/csc/csc',
          name:'csc',
          component: () => import('@/pages/chat/csc'),
          meta: {title: '常用服务电话',needLogin:true}
        },
        {
          path: '/chat/list',
          name:'chatlist',
          component: () => import('@/pages/chat/chat'),
          meta: {title: '闲聊数据上报',needLogin:true}
        },
        {
          path: '/joke/list',
          name:'jokelist',
          component: () => import('@/pages/chat/joke'),
          meta: {title: '笑话库',needLogin:true}
        },
        {
          path: '/joke/speakList',
          name:'jokespeak',
          component: () => import('@/pages/statement/qa'),
          meta: {title: '笑话领域说法',needLogin:true}
        },
        {
          path: '/unit/list',
          name:'unitlist',
          component: () => import('@/pages/statement/unit'),
          meta: {title: '单位换算领域说法',needLogin:true}
        },
        {
          path: '/sen/list',
          name:'senlist',
          component: () => import('@/pages/chat/sen'),
          meta: {title: '敏感词',needLogin:true}
        },
        {
          path: '/trigger/list',
          name:'triggerlist',
          component: () => import('@/pages/chat/trigger'),
          meta: {title: '语音唤醒',needLogin:true}
        },
        {
          path: '/movie/list',
          name:'movielist',
          component: () => import('@/pages/statement/movie'),
          meta: {title: '电影管理',needLogin:true}
        },
        {
          path: '/ask/list',
          name:'asklist',
          component: () => import('@/pages/statement/ask'),
          meta: {title: '要求管理',needLogin:true}
        },
        {
          path: '/qa/list',
          name:'qalist',
          component: () => import('@/pages/rule/qa'),
          meta: {title: '闲聊问答',needLogin:true}
        },
        {
          path: '/qa/channelList',
          name:'channellist',
          component: () => import('@/pages/rule/channel'),
          meta: {title: '个性化词语管理',needLogin:true}
        },
        {
          path: '/rule/list',
          name:'rulelist',
          component: () => import('@/pages/rule/rule'),
          meta: {title: '小不点规则查看',needLogin:true}
        },
        {
          path: '/grey/funlist',
          name:'funlist',
          component: () => import('@/pages/rule/grey'),
          meta: {title: '灰度发布-功能列表',needLogin:true}
        },
        {
          path: '/rule/devlist',
          name:'devlist',
          component: () => import('@/pages/rule/devlist'),
          meta: {title: '灰度发布-机型列表',needLogin:true}
        },
        {
          path: '/goods/list',
          name:'goodlist',
          component: () => import('@/pages/rule/goods'),
          meta: {title: '商品管理',needLogin:true}
        },
        {
          path: '/ttsgrey/devlist',
          name:'ttsgreydevlist',
          component: () => import('@/pages/rule/ttsGrey'),
          meta: {title: 'TTS灰度',needLogin:true}
        },
        {
          path: '/showmode/conf',
          name:'showmodeconf',
          component: () => import('@/pages/rule/config'),
          meta: {title: '资源发布',needLogin:true}
        },
        {
          path: '/showmode/list',
          name:'showmodelist',
          component: () => import('@/pages/rule/list'),
          meta: {title: '资源管理',needLogin:true}
        },
        {
          path: '/showmode/add',
          name:'showmodeadd',
          component: () => import('@/pages/rule/addChannel'),
          meta: {title: '创建资源',needLogin:true}
        },
        {
          path: '/showmode/edit',
          name:'showmodeedit',
          component: () => import('@/pages/rule/editChannel'),
          meta: {title: '编辑资源',needLogin:true}
        },
        {
          path: '/showmode/history',
          name:'showmodehistory',
          component: () => import('@/pages/rule/history'),
          meta: {title: '历史版本',needLogin:true}
        },
        {
          path: '/showmode/gray',
          name:'showmodegray',
          component: () => import('@/pages/rule/gray'),
          meta: {title: '灰度配置',needLogin:true}
        },
        {
          path: '/nlpgrey/list',
          name:'nlpgrey',
          component: () => import('@/pages/rule/nlpgrey'),
          meta: {title: 'nlp灰度',needLogin:true}
        },
        {
          path: '/kv/list',
          name:'kvlist',
          component: () => import('@/pages/lasf-kv/kv'),
          meta: {title: '通用参数',needLogin:true}
        },
        {
          path: '/kv/engine/view',
          name:'kvengine',
          component: () => import('@/pages/lasf-kv/engine'),
          meta: {title: 'asr引擎规则',needLogin:true}
        },
        {
          path: '/outer/list',
          name:'outerlist',
          component: () => import('@/pages/skillment/outer'),
          meta: {title: '三方错误信息',needLogin:true}
        },
        {
          path: '/skill/applist',
          name:'skill',
          component: () => import('@/pages/skillment/skill'),
          meta: {title: '三方APP调用',needLogin:true}
        },
        {
          path: '/lasf-kv/skill/detail',
          name:'skilldetail',
          component: () => import('@/pages/skillment/detail'),
          meta: {title: '应用详情',needLogin:true}
        },
        {
          path: '/lasf-kv/skill/detail/speak',
          name:'speak',
          component: () => import('@/pages/skillment/speak'),
          meta: {title: '技能说法列表',needLogin:true}
        },
        {
          path: '/lasf-kv/skill/detail/sersion',
          name:'sersion',
          component: () => import('@/pages/skillment/sersion'),
          meta: {title: '技能答案列表',needLogin:true}
        },
        {
          path: '/skill/videolist',
          name:'videolist',
          component: () => import('@/pages/skillment/video'),
          meta: {title: '技能视频管理',needLogin:true}
        },
        {
          path: '/skill/music/singerlist',
          name:'singerlist',
          component: () => import('@/pages/skillment/singer'),
          meta: {title: '音乐歌手管理',needLogin:true}
        },
        {
          path: '/lasf-kv/album',
          name:'album',
          component: () => import('@/pages/skillment/album'),
          meta: {title: '音乐歌手管理',needLogin:true}
        },
        {
          path: '/lasf-kv/song',
          name:'song',
          component: () => import('@/pages/skillment/song'),
          meta: {title: '音乐歌手管理',needLogin:true}
        },
        {
          path: '/permission/role',
          name:'perrole',
          component: () => import('@/pages/permission/role'),
          meta: {title: '用户角色',needLogin:true}
        },
        {
          path: '/permission/auth',
          name:'perauth',
          component: () => import('@/pages/permission/user'),
          meta: {title: '系统用户',needLogin:true}
        },
        {
          path: '/userinfo/list',
          name:'webinfo',
          component: () => import('@/pages/permission/aksk'),
          meta: {title: '开发者账号',needLogin:true}
        },
        {
          path: '/rule/fetch',
          name:'perrule',
          component: () => import('@/pages/permission/rule'),
          meta: {title: '用户权限',needLogin:true}
        },
        {
          path: '/rule/detail',
          name:'perruled',
          component: () => import('@/pages/permission/ruleDetail'),
          meta: {title: '权限管理',needLogin:true}
        },
        {
          path: '/license/list',
          name:'liclist',
          component: () => import('@/pages/permission/license'),
          meta: {title: '授权管理',needLogin:true}
        },
        {
          path: '/home/userinfo',
          name:'homeinfo',
          component: () => import('@/pages/user/userInfo'),
          meta: {title: '详细信息',needLogin:true}
        },
        {
          path: '/command/list',
          name:'commandlist',
          component: () => import('@/pages/skillment/command'),
          meta: {title: '系统命令',needLogin:true}
        },
        {
          path: '/command/norun/list',
          name:'commandnorun',
          component: () => import('@/pages/skillment/norun'),
          meta: {title: '指令忽略管理',needLogin:true}
        },
        {
          path: '/command/mainlist',
          name:'commandmain',
          component: () => import('@/pages/skillment/original'),
          meta: {title: '指令忽略管理',needLogin:true}
        },
        {
          path: '/asr/log/client',
          name:'logclient',
          component: () => import('@/pages/log/client'),
          meta: {title: '客户端上报数据分析',needLogin:true}
        },
        {
          path: '/log/client/chart',
          name:'clientchart',
          component: () => import('@/pages/log/clientChart'),
          meta: {title: '客户端上报日志',needLogin:true}
        },
        {
          path: '/asr/log/rawlog',
          name:'rawlog',
          component: () => import('@/pages/log/rawlog'),
          meta: {title: '客户端原始日志',needLogin:true}
        },
        {
          path: '/asr/log/oprlog',
          name:'oprlog',
          component: () => import('@/pages/log/oprlog'),
          meta: {title: '客户端操作日志',needLogin:true}
        },
        {
          path: '/asr/log/rvdlog',
          name:'rvdlog',
          component: () => import('@/pages/log/rvdlog'),
          meta: {title: '客户端原始音频',needLogin:true}
        },
        {
          path: '/servlog/loglist',
          name:'servlog',
          component: () => import('@/pages/log/main'),
          meta: {title: '服务明细报表',needLogin:true}
        },
        {
          path: '/asr/log/asrf',
          name:'asrf',
          component: () => import('@/pages/log/asrf'),
          meta: {title: '服务端错误日志',needLogin:true}
        },
        {
          path: '/vse/log/serv',
          name:'vseserv',
          component: () => import('@/pages/log/serv'),
          meta: {title: '服务端日志',needLogin:true}
        },
        {
          path: '/paydaily/list',
          name:'paydaily',
          component: () => import('@/pages/log/pay'),
          meta: {title: '支付记录',needLogin:true}
        },
        {
          path: '/source/list',
          name:'source',
          component: () => import('@/pages/log/source'),
          meta: {title: 'NLP日志分析',needLogin:true}
        },
        {
          path: '/colud/uselog/list',
          name:'uselog',
          component: () => import('@/pages/log/uselog'),
          meta: {title: '官网调用日志',needLogin:true}
        },
        {
          path: '/visit/list',
          name:'visit',
          component: () => import('@/pages/log/visit'),
          meta: {title: '官网访问统计',needLogin:true}
        },
        {
          path: '/census/list',
          name:'census',
          component: () => import('@/pages/graph/census'),
          meta: {title: '访问量统计',needLogin:true}
        },
        {
          path: '/servlog/list',
          name:'servlogchart',
          component: () => import('@/pages/graph/servlog'),
          meta: {title: 'NLP领域统计',needLogin:true}
        },
        {
          path: '/sysLog/list',
          name:'syslog',
          component: () => import('@/pages/log/syslog'),
          meta: {title: '管理系统操作日志',needLogin:true}
        },
        // {
        //   path: '/avater/uv',
        //   component: () => import('@/pages/avater/uvStat'),
        //   meta: {title: '用户统计',needLogin:true}
        // },
        // {
        //   path: '/avater/list',
        //   component: () => import('@/pages/avater/pvStat'),
        //   meta: {title: '事件统计',needLogin:true}
        // },
        {
          path: '/lenovokey/list',
          name:'lenovokeylist',
          component: () => import('@/pages/avater/brain'),
          meta: {title: '联想大脑统计',needLogin:true}
        },
        {
          path: '/gift/add',
          name:'giftadd',
          component: () => import('@/pages/statcon/state'),
          meta: {title: '报表配置',needLogin:true}
        },
        {
          path: '/gift/querySql',
          name:'giftquery',
          component: () => import('@/pages/statcon/common'),
          meta: {title: '用户报表',needLogin:true}
        },
        {
          path: '/item/list',
          name:'itemlist',
          component: () => import('@/pages/statement/item'),
          meta: {title: '用户自定义',needLogin:true}
        },
        {
          path: '/forum/list',
          name:'forumlist',
          component: () => import('@/pages/statement/forum'),
          meta: {title: '论坛管理',needLogin:true}
        },
        {
          path: '/forum/detail',
          name:'forumdetail',
          component: () => import('@/pages/statement/forumDetail'),
          meta: {title: '论坛详情',needLogin:true}
        },
        {
          path: '/allDur/list',
          name:'alldur',
          component: () => import('@/pages/log/allDur'),
          meta: {title: '时间相应统计',needLogin:true}
        },
        {
          path: '/error/chart',
          name:'errorchart',
          component: () => import('@/pages/log/errChart'),
          meta: {title: '异常率统计',needLogin:true}
        },
        {
          path: '/ttsregular/list',
          name:'ttsregular',
          component: () => import('@/pages/statement/ttsregular'),
          meta: {title: 'TTS规则',needLogin:true}
        },
        {
          path: '/news/list',
          name:'newslist',
          component: () => import('@/pages/statement/news'),
          meta: {title: '官网新闻资讯',needLogin:true}
        },
        {
          path: '/audiokeeper/list',
          name:'audiokeeperlist',
          component: () => import('@/pages/serviceManagement/audiokeeper'),
          meta: {title: 'audiokeeper',needLogin:true}
        },
        {
          path: '/audiokeeperMigrate/socketTotal',
          name:'sockettotal',
          component: () => import('@/pages/serviceManagement/audiokeeperMigrate'),
          meta: {title: '服务迁移',needLogin:true}
        },
        {
          path: '/engine/client/total',
          name:'clienttotal',
          component: () => import('@/pages/serviceManagement/clientTotal'),
          meta: {title: '引擎下线',needLogin:true}
        },
        {
          path: '/audiokeeper/statistics/voicebytes',
          name:'voicebytes',
          component: () => import('@/pages/serviceManagement/voicebytes'),
          meta: {title: '语音字节数统计',needLogin:true}
        },
        {
          path: '/iot/list',
          name:'iotlist',
          component: () => import('@/pages/iot/list'),
          meta: {title: '设备列表',needLogin:true}
        },
        {
          path: '/scene/list',
          name:'scenelist',
          component: () => import('@/pages/iot/scene'),
          meta: {title: '场景列表',needLogin:true}
        },
        {
          path: '/iot/log/list',
          name:'iotloglist',
          component: () => import('@/pages/iot/log'),
          meta: {title: '设备日志',needLogin:true}
        },
        {
          path: '/nlulog/list',
          name:'nluloglist',
          component: () => import('@/pages/nlu/nlulog'),
          meta: {title: '运营日志分析',needLogin:true}
        },
        {
          path: '/nlulog/statistic',
          name:'nlustatistic',
          component: () => import('@/pages/nlu/nluStatistics'),
          meta: {title: '运营日志统计',needLogin:true}
        },
        {
          path: '/nlu/word/list',
          name:'nluword',
          component: () => import('@/pages/nlu/word'),
          meta: {title: '词元管理',needLogin:true}
        },
        {
          path: '/nlu/sentence/list',
          name:'nlusentence',
          component: () => import('@/pages/nlu/sentence'),
          meta: {title: '句式管理',needLogin:true}
        },
        {
          path: '/nlu/stengen/list',
          name:'nlustengen',
          component: () => import('@/pages/nlu/stengen'),
          meta: {title: '数据生成',needLogin:true}
        },
        {
          path: '/nlu/expression/list',
          name:'nluexpression',
          component: () => import('@/pages/nlu/expression'),
          meta: {title: '表达式管理',needLogin:true}
        },
        {
          path: '/nlu/transword/list',
          name:'nlutransword',
          component: () => import('@/pages/nlu/transword'),
          meta: {title: '词转换列表',needLogin:true}
        },
        {
          path: '/ttslog/list',
          name:'ttslog',
          component: () => import('@/pages/log/ttslog'),
          meta: {title: '语音合成日报表',needLogin:true}
        },
        {
          path: '/asrlog/list',
          name:'asrloglist',
          component: () => import('@/pages/log/asrlog'),
          meta: {title: '语音识别日报表',needLogin:true}
        },
        {
          path: '/asrlog/detail',
          name:'asrlogdetail',
          component: () => import('@/pages/log/asrlogInfo'),
          meta: {title: '明细',needLogin:true}
        },
        {
          path: '/user/checkpass',
          name:'usercheckpass',
          component: () => import('@/pages/checkpass'),
          meta: {title: '修改密码',needLogin:true}
        },
        {
          path: '/user/userinfo',
          name:'userinfo',
          component: () => import('@/pages/userinfo'),
          meta: {title: '用户信息'}
        },
        {
          path: '/401',
          component: () => import('@/pages/401'),
          meta: {title: '401'}
        },
        {
          path: '/404',
          component: () => import('@/pages/404'),
          meta: {title: '404'}
        },
        {
          path: '/home',
          redirect: '/home/index'
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  NProgress.start()
  if(to.meta.needLogin){
    let item = sessionStorage.getItem("token");
    try {
      item = JSON.parse(item);
    } catch (error) {
        item = item;
    }
    if (item) {
      let date = new Date().getTime();
      // 如果大于就是过期了，如果小于或等于就还没过期
      if (date - item.startTime > EXPIRESTIME) {
        // console.log(date - item.startTime)
        // MessageBox.alert('登录超时，请重新登录', '', {
        //   confirmButtonText: '确定',
        //   showClose:false,
        //   center: true,
        //   callback: action => {
          store.commit('set_userinfo','1')
            sessionStorage.clear();
            next('/login')
            NProgress.done()
        //   }
        // });
          
      } else {
        next();
        NProgress.done()
      }
    } else {
      // MessageBox.alert('登录超时，请重新登录', '', {
      //   confirmButtonText: '确定',
      //   showClose:false,
      //   center: true,
      //   callback: action => {
        store.commit('set_userinfo','1')
          sessionStorage.clear();
          next('/login')
          NProgress.done()
      //   }
      // });
    }
  }else{
    next()
    NProgress.done()
  }
  
//   NProgress.start()
  // if (username) {
  //   next()
  // } else {
  //   if (to.path == '/login') {
  //     next()
  //   } else {
  //     next('/login')
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  window.scrollTo(0, 0)
  NProgress.done()
})

// eslint-disable-next-line semi
export default router;
