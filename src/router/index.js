/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import Vue from 'vue'
import Router from 'vue-router'
// 使用loading
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      component: () => import('@/pages/home'),
      children: [
        {
          path: '/home/index',
          component: () => import('@/pages/index'),
          meta: {title: '语音服务管理系统'}
        },
        {
          path: '/app/list',
          component: () => import('@/pages/app/list'),
          meta: {title: '应用列表'}
        },
        {
          path: '/app/keyWord',
          component: () => import('@/pages/app/keyWord'),
          meta: {title: '应用关键词'}
        },
        {
          path: '/app/aliReg',
          component: () => import('@/pages/app/aliReg'),
          meta: {title: '应用别名规则'}
        },
        {
          path: '/app/cache',
          component: () => import('@/pages/app/cache'),
          meta: {title: '应用缓存'}
        },
        {
          path: '/was/weblist',
          component: () => import('@/pages/chat/was'),
          meta: {title: '网站导航'}
        },
        {
          path: '/dict/list',
          component: () => import('@/pages/chat/dict'),
          meta: {title: '热词列表'}
        },
        {
          path: '/csc/csc',
          component: () => import('@/pages/chat/csc'),
          meta: {title: '常用服务电话'}
        },
        {
          path: '/chat/list',
          component: () => import('@/pages/chat/chat'),
          meta: {title: '闲聊数据上报'}
        },
        {
          path: '/joke/list',
          component: () => import('@/pages/chat/joke'),
          meta: {title: '笑话列表'}
        },
        {
          path: '/sen/list',
          component: () => import('@/pages/chat/sen'),
          meta: {title: '敏感词'}
        },
        {
          path: '/trigger/list',
          component: () => import('@/pages/chat/trigger'),
          meta: {title: '语音唤醒'}
        },
        {
          path: '/qa/list',
          component: () => import('@/pages/rule/qa'),
          meta: {title: '定制问答查看'}
        },
        {
          path: '/rule/list',
          component: () => import('@/pages/rule/rule'),
          meta: {title: '小不点规则查看'}
        },
        {
          path: '/grey/funlist',
          component: () => import('@/pages/rule/grey'),
          meta: {title: '灰度发布-功能列表'}
        },
        {
          path: '/rule/devlist',
          component: () => import('@/pages/rule/devlist'),
          meta: {title: '灰度发布-机型列表'}
        },
        {
          path: '/kv/list',
          component: () => import('@/pages/lasf-kv/kv'),
          meta: {title: 'KV列表'}
        },
        {
          path: '/kv/engine/view',
          component: () => import('@/pages/lasf-kv/engine'),
          meta: {title: 'asr引擎规则'}
        },
        {
          path: '/outer/list',
          component: () => import('@/pages/lasf-kv/outer'),
          meta: {title: '三方错误信息'}
        },
        {
          path: '/skill/applist',
          component: () => import('@/pages/lasf-kv/skill'),
          meta: {title: '应用列表'}
        },
        {
          path: '/lasf-kv/skill/detail',
          component: () => import('@/pages/lasf-kv/detail'),
          meta: {title: '应用详情'}
        },
        {
          path: '/lasf-kv/skill/detail/speak',
          component: () => import('@/pages/lasf-kv/speak'),
          meta: {title: '技能说法列表'}
        },
        {
          path: '/lasf-kv/skill/detail/sersion',
          component: () => import('@/pages/lasf-kv/sersion'),
          meta: {title: '技能答案列表'}
        },
        {
          path: '/skill/videolist',
          component: () => import('@/pages/lasf-kv/video'),
          meta: {title: '技能视频管理'}
        },
        {
          path: '/skill/music/singerlist',
          component: () => import('@/pages/lasf-kv/singer'),
          meta: {title: '音乐歌手管理'}
        },
        {
          path: '/lasf-kv/album',
          component: () => import('@/pages/lasf-kv/album'),
          meta: {title: '音乐歌手管理'}
        },
        {
          path: '/lasf-kv/song',
          component: () => import('@/pages/lasf-kv/song'),
          meta: {title: '音乐歌手管理'}
        },
        {
          path: '/permission/role',
          component: () => import('@/pages/permission/role'),
          meta: {title: '角色管理'}
        },
        {
          path: '/permission/auth',
          component: () => import('@/pages/permission/auth'),
          meta: {title: '用户管理'}
        },
        {
          path: '/home/userinfo',
          component: () => import('@/pages/user/userInfo'),
          meta: {title: '详细信息'}
        },
        {
          path: '/command/list',
          component: () => import('@/pages/lasf-kv/command'),
          meta: {title: '相似度命令管理'}
        },
        {
          path: '/command/norun/list',
          component: () => import('@/pages/lasf-kv/norun'),
          meta: {title: '相似度命令管理'}
        },
        {
          path: '/home/setting',
          component: () => import('@/pages/setting'),
          meta: {title: '设置'}
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
    },
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  var username = localStorage.getItem('username')
  NProgress.start()
  if (username) {
    next()
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

// eslint-disable-next-line semi
export default router;
