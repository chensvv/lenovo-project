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
      component: () => import('@/pages/login'),
      meta: {title: '登录'}
    },
    {
      path: '/register',
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
          component: () => import('@/pages/index'),
          meta: {title: '语音服务管理系统',needLogin:true}
        },
        {
          path: '/app/list',
          component: () => import('@/pages/app/list'),
          meta: {title: '应用列表',needLogin:true}
        },
        {
          path: '/app/keyWord',
          component: () => import('@/pages/app/keyWord'),
          meta: {title: '应用关键词',needLogin:true}
        },
        {
          path: '/app/aliReg',
          component: () => import('@/pages/app/aliReg'),
          meta: {title: '应用别名规则',needLogin:true}
        },
        {
          path: '/app/cache',
          component: () => import('@/pages/app/cache'),
          meta: {title: '应用缓存',needLogin:true}
        },
        {
          path: '/app/applist',
          component: () => import('@/pages/app/appName'),
          meta: {title: '应用名称管理',needLogin:true}
        },
        {
          path: '/was/weblist',
          component: () => import('@/pages/chat/was'),
          meta: {title: '网站导航',needLogin:true}
        },
        {
          path: '/dict/list',
          component: () => import('@/pages/chat/dict'),
          meta: {title: '热词列表',needLogin:true}
        },
        {
          path: '/engineDict/list',
          component: () => import('@/pages/chat/engineDict'),
          meta: {title: '引擎表热词',needLogin:true}
        },
        {
          path: '/csc/csc',
          component: () => import('@/pages/chat/csc'),
          meta: {title: '常用服务电话',needLogin:true}
        },
        {
          path: '/chat/list',
          component: () => import('@/pages/chat/chat'),
          meta: {title: '闲聊数据上报',needLogin:true}
        },
        {
          path: '/joke/list',
          component: () => import('@/pages/chat/joke'),
          meta: {title: '笑话列表',needLogin:true}
        },
        {
          path: '/joke/speakList',
          component: () => import('@/pages/statement/qa'),
          meta: {title: '笑话领域说法',needLogin:true}
        },
        {
          path: '/unit/list',
          component: () => import('@/pages/statement/unit'),
          meta: {title: '单位换算领域说法',needLogin:true}
        },
        {
          path: '/sen/list',
          component: () => import('@/pages/chat/sen'),
          meta: {title: '敏感词',needLogin:true}
        },
        {
          path: '/trigger/list',
          component: () => import('@/pages/chat/trigger'),
          meta: {title: '语音唤醒',needLogin:true}
        },
        {
          path: '/movie/list',
          component: () => import('@/pages/statement/movie'),
          meta: {title: '电影管理',needLogin:true}
        },
        {
          path: '/ask/list',
          component: () => import('@/pages/statement/ask'),
          meta: {title: '要求管理',needLogin:true}
        },
        {
          path: '/qa/list',
          component: () => import('@/pages/rule/qa'),
          meta: {title: '定制问答查看',needLogin:true}
        },
        {
          path: '/qa/channelList',
          component: () => import('@/pages/rule/channel'),
          meta: {title: '个性化词语管理',needLogin:true}
        },
        {
          path: '/rule/list',
          component: () => import('@/pages/rule/rule'),
          meta: {title: '小不点规则查看',needLogin:true}
        },
        {
          path: '/grey/funlist',
          component: () => import('@/pages/rule/grey'),
          meta: {title: '灰度发布-功能列表',needLogin:true}
        },
        {
          path: '/rule/devlist',
          component: () => import('@/pages/rule/devlist'),
          meta: {title: '灰度发布-机型列表',needLogin:true}
        },
        {
          path: '/goods/list',
          component: () => import('@/pages/rule/goods'),
          meta: {title: '商品管理',needLogin:true}
        },
        {
          path: '/ttsgrey/devlist',
          component: () => import('@/pages/rule/ttsGrey'),
          meta: {title: 'TTS灰度',needLogin:true}
        },
        {
          path: '/showmode/conf',
          component: () => import('@/pages/rule/config'),
          meta: {title: '资源发布',needLogin:true}
        },
        {
          path: '/showmode/list',
          component: () => import('@/pages/rule/list'),
          meta: {title: '资源管理',needLogin:true}
        },
        {
          path: '/showmode/add',
          component: () => import('@/pages/rule/addChannel'),
          meta: {title: '创建资源',needLogin:true}
        },
        {
          path: '/showmode/edit',
          component: () => import('@/pages/rule/editChannel'),
          meta: {title: '编辑资源',needLogin:true}
        },
        {
          path: '/showmode/history',
          component: () => import('@/pages/rule/history'),
          meta: {title: '历史版本',needLogin:true}
        },
        {
          path: '/showmode/gray',
          component: () => import('@/pages/rule/gray'),
          meta: {title: '灰度配置',needLogin:true}
        },
        {
          path: '/kv/list',
          component: () => import('@/pages/lasf-kv/kv'),
          meta: {title: 'KV列表',needLogin:true}
        },
        {
          path: '/kv/engine/view',
          component: () => import('@/pages/lasf-kv/engine'),
          meta: {title: 'asr引擎规则',needLogin:true}
        },
        {
          path: '/outer/list',
          component: () => import('@/pages/skillment/outer'),
          meta: {title: '三方错误信息',needLogin:true}
        },
        {
          path: '/skill/applist',
          component: () => import('@/pages/skillment/skill'),
          meta: {title: '应用列表',needLogin:true}
        },
        {
          path: '/lasf-kv/skill/detail',
          component: () => import('@/pages/skillment/detail'),
          meta: {title: '应用详情',needLogin:true}
        },
        {
          path: '/lasf-kv/skill/detail/speak',
          component: () => import('@/pages/skillment/speak'),
          meta: {title: '技能说法列表',needLogin:true}
        },
        {
          path: '/lasf-kv/skill/detail/sersion',
          component: () => import('@/pages/skillment/sersion'),
          meta: {title: '技能答案列表',needLogin:true}
        },
        {
          path: '/skill/videolist',
          component: () => import('@/pages/skillment/video'),
          meta: {title: '技能视频管理',needLogin:true}
        },
        {
          path: '/skill/music/singerlist',
          component: () => import('@/pages/skillment/singer'),
          meta: {title: '音乐歌手管理',needLogin:true}
        },
        {
          path: '/lasf-kv/album',
          component: () => import('@/pages/skillment/album'),
          meta: {title: '音乐歌手管理',needLogin:true}
        },
        {
          path: '/lasf-kv/song',
          component: () => import('@/pages/skillment/song'),
          meta: {title: '音乐歌手管理',needLogin:true}
        },
        {
          path: '/permission/role',
          component: () => import('@/pages/permission/role'),
          meta: {title: '角色管理',needLogin:true}
        },
        {
          path: '/permission/auth',
          component: () => import('@/pages/permission/auth'),
          meta: {title: '用户管理',needLogin:true}
        },
        {
          path: '/userinfo/list',
          component: () => import('@/pages/permission/aksk'),
          meta: {title: '官网用户',needLogin:true}
        },
        {
          path: '/rule/fetch',
          component: () => import('@/pages/permission/rule'),
          meta: {title: '权限管理',needLogin:true}
        },
        {
          path: '/rule/detail',
          component: () => import('@/pages/permission/ruleDetail'),
          meta: {title: '权限管理',needLogin:true}
        },
        {
          path: '/license/list',
          component: () => import('@/pages/permission/license'),
          meta: {title: '授权管理',needLogin:true}
        },
        {
          path: '/home/userinfo',
          component: () => import('@/pages/user/userInfo'),
          meta: {title: '详细信息',needLogin:true}
        },
        {
          path: '/command/list',
          component: () => import('@/pages/skillment/command'),
          meta: {title: '相似度命令管理',needLogin:true}
        },
        {
          path: '/command/norun/list',
          component: () => import('@/pages/skillment/norun'),
          meta: {title: '指令忽略管理',needLogin:true}
        },
        {
          path: '/command/mainlist',
          component: () => import('@/pages/skillment/original'),
          meta: {title: '指令忽略管理',needLogin:true}
        },
        {
          path: '/asr/log/client',
          component: () => import('@/pages/log/client'),
          meta: {title: '客户端上报日志',needLogin:true}
        },
        {
          path: '/log/client/chart',
          component: () => import('@/pages/log/clientChart'),
          meta: {title: '客户端上报日志',needLogin:true}
        },
        {
          path: '/asr/log/rawlog',
          component: () => import('@/pages/log/rawlog'),
          meta: {title: '客户端原始日志',needLogin:true}
        },
        {
          path: '/asr/log/oprlog',
          component: () => import('@/pages/log/oprlog'),
          meta: {title: '客户端操作日志',needLogin:true}
        },
        {
          path: '/asr/log/rvdlog',
          component: () => import('@/pages/log/rvdlog'),
          meta: {title: '客户端原始音频',needLogin:true}
        },
        {
          path: '/servlog/loglist',
          component: () => import('@/pages/log/main'),
          meta: {title: '明细日志',needLogin:true}
        },
        {
          path: '/asr/log/asrf',
          component: () => import('@/pages/log/asrf'),
          meta: {title: '服务端错误日志',needLogin:true}
        },
        {
          path: '/vse/log/serv',
          component: () => import('@/pages/log/serv'),
          meta: {title: '服务端日志',needLogin:true}
        },
        {
          path: '/paydaily/list',
          component: () => import('@/pages/log/pay'),
          meta: {title: '支付记录',needLogin:true}
        },
        {
          path: '/source/list',
          component: () => import('@/pages/log/source'),
          meta: {title: 'NLP日志分析',needLogin:true}
        },
        {
          path: '/colud/uselog/list',
          component: () => import('@/pages/log/uselog'),
          meta: {title: '官网调用日志',needLogin:true}
        },
        {
          path: '/visit/list',
          component: () => import('@/pages/log/visit'),
          meta: {title: '官网访问统计',needLogin:true}
        },
        {
          path: '/census/list',
          component: () => import('@/pages/graph/census'),
          meta: {title: '访问量统计',needLogin:true}
        },
        {
          path: '/servlog/list',
          component: () => import('@/pages/graph/servloglist'),
          meta: {title: 'NLP领域统计',needLogin:true}
        },
        {
          path: '/sysLog/list',
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
          component: () => import('@/pages/avater/brain'),
          meta: {title: '联想大脑统计',needLogin:true}
        },
        {
          path: '/gift/add',
          component: () => import('@/pages/statcon/state'),
          meta: {title: '报表配置',needLogin:true}
        },
        {
          path: '/gift/querySql',
          component: () => import('@/pages/statcon/common'),
          meta: {title: '用户报表',needLogin:true}
        },
        {
          path: '/item/list',
          component: () => import('@/pages/statement/item'),
          meta: {title: '用户自定义',needLogin:true}
        },
        {
          path: '/forum/list',
          component: () => import('@/pages/statement/forum'),
          meta: {title: '论坛管理',needLogin:true}
        },
        {
          path: '/forum/detail',
          component: () => import('@/pages/statement/forumDetail'),
          meta: {title: '论坛详情',needLogin:true}
        },
        {
          path: '/allDur/list',
          component: () => import('@/pages/log/allDur'),
          meta: {title: '时间相应统计',needLogin:true}
        },
        {
          path: '/error/chart',
          component: () => import('@/pages/log/errChart'),
          meta: {title: '异常率统计',needLogin:true}
        },
        {
          path: '/ttsregular/list',
          component: () => import('@/pages/statement/ttsregular'),
          meta: {title: 'TTS规则配置',needLogin:true}
        },
        {
          path: '/news/list',
          component: () => import('@/pages/statement/news'),
          meta: {title: '官网新闻资讯',needLogin:true}
        },
        {
          path: '/audiokeeper/list',
          component: () => import('@/pages/serviceManagement/audiokeeper'),
          meta: {title: 'audiokeeper',needLogin:true}
        },
        {
          path: '/audiokeeperMigrate/socketTotal',
          component: () => import('@/pages/serviceManagement/audiokeeperMigrate'),
          meta: {title: '服务迁移',needLogin:true}
        },
        {
          path: '/engine/client/total',
          component: () => import('@/pages/serviceManagement/clientTotal'),
          meta: {title: '引擎下线',needLogin:true}
        },
        {
          path: '/audiokeeper/statistics/voicebytes',
          component: () => import('@/pages/serviceManagement/voicebytes'),
          meta: {title: '语音字节数统计',needLogin:true}
        },
        {
          path: '/iot/list',
          component: () => import('@/pages/iot/list'),
          meta: {title: '设备列表',needLogin:true}
        },
        {
          path: '/scene/list',
          component: () => import('@/pages/iot/scene'),
          meta: {title: '场景列表',needLogin:true}
        },
        {
          path: '/iot/log/list',
          component: () => import('@/pages/iot/log'),
          meta: {title: '设备日志',needLogin:true}
        },
        {
          path: '/nlulog/list',
          component: () => import('@/pages/nlu/nlulog'),
          meta: {title: '运营日志分析',needLogin:true}
        },
        {
          path: '/user/checkpass',
          component: () => import('@/pages/checkpass'),
          meta: {title: '修改密码',needLogin:true}
        },
        {
          path: '/user/userinfo',
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
