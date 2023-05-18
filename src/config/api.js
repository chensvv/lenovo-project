/* eslint-disable no-undef */
import fetch from './http'
import {Base64} from 'js-base64'
// console.log(fetch.service_head)
// const INTERFACE = process.env.API_ROOT
// console.log(INTERFACE)

// const INTERCHILD = {
//   // 'GETCODE': INTERFACE + '/active/getValidateCode.do',
// }
// export default {
//   INTERCHILD,
//   INTERFACE
// }
export function appList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function appAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/add',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function appUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/update',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function appDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/del',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function wordList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/keyword',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function keyAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/keywordadd',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function keyUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/keywordupdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function keyDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/keyworddel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function regList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/alireg',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function cacheList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/cache',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function cacheDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/cachedel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function cacheAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/cacheadd',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function appNameList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/applist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function appNameAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/appadd',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function appNameUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/appupdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function appNameDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/app/appdel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function appNameUpFile (data) {
  return fetch.UPFile({
    url: '/velicle-mgr/app/excel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function movieList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/movie/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function movieAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/movie/save',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function movieUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/movie/update',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function movieDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/movie/del',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function moviePub (data) {
  return fetch.service_head({
    url: '/velicle-mgr/movie/pub',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function askList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/ask/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function askAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/ask/save',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function askUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/ask/update',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function askDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/ask/del',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function askPub (data) {
  return fetch.service_head({
    url: '/velicle-mgr/ask/pub',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function wasList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/was/weblist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function wasAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/was/add',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function wasUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/was/update',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function wasDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/was/delete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function dictList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/dict/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function dictAddUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/dict/addandUpdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function dictDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/dict/del',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function cscList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/csc/csc',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function cscAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/csc/add',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function cscDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/csc/delete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 个性化
export function channelList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/qa/channelList',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function channelAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/qa/channelAdd',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function channelUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/qa/channelUpdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function channelDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/qa/channelDel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 定制问答
export function qaList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/qa/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function qaSave (data) {
  return fetch.service_head({
    url: '/velicle-mgr/qa/save',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function qaDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/qa/del',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function qaUpFile (data) {
  return fetch.UPFile({
    url: '/velicle-mgr/qa/excel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function qaFile (data) {
  return fetch.UPFile({
    url: '/velicle-mgr/qa/hand',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function qaPub (data) {
  return fetch.UPFile({
    url: '/velicle-mgr/qa/pub',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 规则
export function ruleList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/rule/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function ruleAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/rule/save',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function ruleUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/rule/updatedata',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function ruleDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/rule/delete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function rulePub (data) {
  return fetch.service_head({
    url: '/velicle-mgr/rule/pub',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 灰度发布功能列表
export function greyList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/grey/funlist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 灰度发布功能列表添加、修改
export function greyAddUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/grey/funaddandUpdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 灰度发布功能列表删除
export function greyDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/grey/fundel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 灰度发布功能列表配置回显
export function greyOpt (data) {
  return fetch.service_head({
    url: '/velicle-mgr/grey/opt',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 灰度发布功能列表配置保存
export function greyOptSave (data) {
  return fetch.service_head({
    url: '/velicle-mgr/grey/optsave',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 灰度发布机型列表
export function devList (data) {
  return fetch.service_head({
    url: 'velicle-mgr/grey/devlist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function ttsGreyList (data) {
  return fetch.service_head({
    url: 'velicle-mgr/ttsgrey/devlist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function ttsGreyDel (data) {
  return fetch.service_head({
    url: 'velicle-mgr/ttsgrey/ttsdel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 灰度发布机型列表添加、删除
export function devAddUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/grey/devaddandUpdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 灰度发布机型列表删除
export function devDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/grey/devdel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 灰度发布机型列表配置回显
export function devOpt (data) {
  return fetch.service_head({
    url: '/velicle-mgr/grey/optd',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 灰度发布机型列表配置保存
export function devOptSave (data) {
  return fetch.service_head({
    url: '/velicle-mgr/grey/optdsave',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 闲聊
export function chatList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/chat/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function chatExport (data) {
  return fetch.ExcelDownload({
    url: '/velicle-mgr/chat/export',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 笑话列表
export function jokeList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/joke/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function jokeAddUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/joke/save',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function jokeDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/joke/del',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function jokeVeri (data) {
  return fetch.service_head({
    url: '/velicle-mgr/joke/veri',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function jokeDelBatch (data) {
  return fetch.service_head({
    url: '/velicle-mgr/joke/delBatch',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function jokeVeriBatch (data) {
  return fetch.service_head({
    url: '/velicle-mgr/joke/veriBatch',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 笑话领域说法
export function jokePList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/joke/speakList',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function jokePAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/joke/speakAdd',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function jokePUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/joke/speakUpdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function jokePDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/joke/speakDel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function jokePAIML (data) {
  return fetch.service_head({
    url: '/velicle-mgr/joke/speakAiml',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function unitList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/unit/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function unitAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/unit/add',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function unitUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/unit/update',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function unitDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/unit/del',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function unitPub (data) {
  return fetch.service_head({
    url: '/velicle-mgr/unit/pub',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 敏感词
export function senList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/sen/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function senAddUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/sen/save',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function senDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/sen/del',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 敏感词发布
export function senPub (data) {
  return fetch.service_head({
    url: '/velicle-mgr/sen/pub',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function senExcept (data) {
  return fetch.service_head({
    url: '/velicle-mgr/sen/update/except',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function triggerList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/trigger/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function triggerZip (data) {
  return fetch.service_head({
    url: '/velicle-mgr/trigger/zip',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function zipList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/trigger/zip/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function zipDownload (data) {
  return fetch.FileDownload({
    url: '/velicle-mgr/trigger/download?fileName='+data+'&fileType=zip&userName='+sessionStorage.getItem('username'),
    method: 'get',
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function pcmDownload (data) {
  return fetch.FileDownload({
    url: '/velicle-mgr/trigger/download?fileName='+data,
    method: 'get',
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function topKeyWord (data) {
  return fetch.service_head({
    url: '/velicle-mgr/trigger/topKeyWord',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function kvList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/kv/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function kvAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/kv/editsave',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function kvUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/kv/update',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function kvDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/kv/delete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function giftDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/gift/status',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function engineView (data) {
  return fetch.service_head({
    url: '/velicle-mgr/kv/engine/view',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function engineUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/kv/engine/edit',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function outerList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/outer/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function outerInfo (data) {
  return fetch.service_head({
    url: '/velicle-mgr/outer/detail',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function skillList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/applist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function skillAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/appadd',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function skillUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/appupdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function skillDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/appdelete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function skillInfo (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/appdetail',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function skillDetailAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/functionadd',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function skillDetailDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/functiondelete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function skillDetailUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/functionupdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 说法列表
export function speakList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/speaklist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function speakAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/speakadd',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function speakUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/speakupdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function speakDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/speakdelete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function speakPub (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/speakpublish',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 答案列表
export function versionList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/versionlist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function versionAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/versionadd',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function versionUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/versionupdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function versionDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/versiondelete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function versionStr (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/versionstrategy',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 技能视频管理
export function videoList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/videolist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function videoSelect (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/videoaddpage',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function videoAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/videoadd',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function videoUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/videoupdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function videoDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/videodelete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function videoDelBatch (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/videoDelBatch',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 音乐列表
export function singerList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/singerlist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function singerAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/addsinger',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function singerUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/updatesinger',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function singerDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/deletesinger',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function singerPub (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/singerpublish',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 专辑
export function albumList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/albumlist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function albumAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/addalbum',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function albumUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/updatealbum',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function albumDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/deletealbum',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 歌曲
export function songList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/songlist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function songSelect (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/songaddpage',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function songAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/addsong',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function songUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/updatesong',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function songDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/skill/music/deletesong',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function commandList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/command/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function commandDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/command/delete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function commandEcho (data) {
  return fetch.service_head({
    url: '/velicle-mgr/command/main/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function commandAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/command/add',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function norunList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/command/norun/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function norunAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/command/norun/add',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function norunDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/command/norun/delete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function originalList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/command/mainlist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function originalAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/command/mainadd',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function originalUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/command/mainupdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function originalDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/command/maindelete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function clientList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/asr/log/client',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function rawList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/asr/log/rawlog',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function rawView (data) {
  return fetch.service_head({
    url: '/velicle-mgr/asr/dialog/rawview',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function oprList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/asr/log/oprlog',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function rvdList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/asr/log/rvdlog',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function logList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/servlog/loglist',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function logInfo (data) {
  return fetch.service_head({
    url: '/velicle-mgr/servlog/detail',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function asrfList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/asr/log/asrf',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function asrChat (data) {
  return fetch.service_head({
    url: '/velicle-mgr/asr/log/asrcharts',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function servList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/vse/log/serv',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function durChat (data) {
  return fetch.service_head({
    url: '/velicle-mgr/stat/duration',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

// 访问量统计
export function censusList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/census/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function censusUserList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/census/userList',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function servlogList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/servlog/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function avaterList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/avater/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function lenKeyList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/lenovokey/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function stateAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/gift/add',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function querySql (data) {
  return fetch.service_head({
    url: '/velicle-mgr/gift/querySql',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function itemList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/item/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function itemSave (data) {
  return fetch.service_head({
    url: '/velicle-mgr/item/save',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function itemDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/item/del',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function itemUpFile (data) {
  return fetch.service_head({
    url: '/velicle-mgr/item/excel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function itemPub (data) {
  return fetch.service_head({
    url: '/velicle-mgr/item/pub',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function avaterChannel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/avater/channelList',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function sourceList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/source/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function sourceExport (data) {
  return fetch.ExcelDownload({
    url: '/velicle-mgr/source/export',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function usernameList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/lenovokey/userNameList',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function sourceUserNameList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/source/userNameList',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function showModeList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function showModeAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/add',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function showModeUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/update',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function showModeDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/delete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function showModeRele (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/toBeReleased',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function configList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/resources/config/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function configAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/resources/config/add',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function showModeAll (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/queryRelease',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function showModeSave (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/savePublish',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function showModeImport (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/xmlyImport',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function carouselListEnable (data) {
  return fetch.service_head({
    url: '/velicle-mgr/carousel/listEnable',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function grayList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/listGray',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function updGray (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/updGray',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function deleteGray (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/deleteGray',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function grayAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/addGray',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function grayUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/updateGray',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function historyList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/history',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function historyDetails (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/versionDetails',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function historyDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/deleteHistory',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function listGrays (data) {
  return fetch.service_head({
    url: '/velicle-mgr/showmode/listGrays',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function allDurList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/allDur/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function errChart (data) {
  return fetch.service_head({
    url: '/velicle-mgr/error/chart',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function dictExcel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/dict/excel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function dictDownload () {
  return fetch.FileDownload({
    url: '/velicle-mgr/dict/download',
    method: 'post',
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function senExcel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/sen/excel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function downExcel () {
  return fetch.ExcelDownload({
    url: '/velicle-mgr/sen/export',
    method: 'post',
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function forumList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/forum/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function forumDetele (data) {
  return fetch.service_head({
    url: '/velicle-mgr/forum/delete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function forumAutoAudit (data) {
  return fetch.service_head({
    url: '/velicle-mgr/forum/review/status',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function forumDetails (data) {
  return fetch.service_head({
    url: '/velicle-mgr/forum/details',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function forumDelbatch (data) {
  return fetch.service_head({
    url: '/velicle-mgr/forum/delbatch',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function forumReview (data) {
  return fetch.service_head({
    url: '/velicle-mgr/forum/update/review',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function forumUpdate (data) {
  return fetch.service_head({
    url: '/velicle-mgr/forum/update',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function engineDictList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/engineDict/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function engineDictAddUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/engineDict/addandUpdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function engineDictDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/engineDict/del',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function engineDictExcel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/engineDict/excel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function ttsregularList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/ttsregular/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function selRegular (data) {
  return fetch.service_head({
    url: '/velicle-mgr/ttsregular/selRegular',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function ttsAddAndUpdate (data) {
  return fetch.service_head({
    url: '/velicle-mgr/ttsregular/addAndUpdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function delRegular (data) {
  return fetch.service_head({
    url: '/velicle-mgr/ttsregular/delRegular',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function delText (data) {
  return fetch.service_head({
    url: '/velicle-mgr/ttsregular/delText',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function newsList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/news/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function newsAddUpd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/news/addAndUpdate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function newsDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/news/delNews',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function audiokeeperList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/audiokeeper/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function audiokeeperAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/audiokeeper/add',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function audiokeeperExpire (data) {
  return fetch.service_head({
    url: '/velicle-mgr/audiokeeper/expire',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function socketTotal (data) {
  return fetch.service_head({
    url: '/velicle-mgr/audiokeeperMigrate/socketTotal',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function clientTotal (data) {
  return fetch.service_head({
    url: '/velicle-mgr/engine/client/total',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function engineOffline (data) {
  return fetch.service_head({
    url: '/velicle-mgr/engine/offline',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function engineOnline (data) {
  return fetch.service_head({
    url: '/velicle-mgr/engine/online',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function migrate (data) {
  return fetch.service_head({
    url: '/velicle-mgr/audiokeeperMigrate/migrate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function voicebytes (data) {
  return fetch.service_head({
    url: '/velicle-mgr/audiokeeper/statistics/voicebytes',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function useLog (data) {
  return fetch.service_head({
    url: '/velicle-mgr/colud/uselog/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function syslogList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/sysLog/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function videoUpFile (data) {
  return fetch.UPFile({
    url: '/velicle-mgr/skill/videoexcel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function albumUpFile (data) {
  return fetch.UPFile({
    url: '/velicle-mgr/skill/music/albumexcel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function singerUpFile (data) {
  return fetch.UPFile({
    url: '/velicle-mgr/skill/music/singerexcel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function songUpFile (data) {
  return fetch.UPFile({
    url: '/velicle-mgr/skill/music/songexcel',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function payList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/paydaily/list ',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function payExport (data) {
  return fetch.ExcelDownload({
    url: '/velicle-mgr/paydaily/export',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function iotList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/iot/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function iotDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/iot/delete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function iotPull (data) {
  return fetch.service_head({
    url: '/velicle-mgr/iot/pull',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function triggerBatchDownload (data) {
  return fetch.FileDownload({
    url: '/velicle-mgr/trigger/batchDownload',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function sceneList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/scene/list ',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function sceneControl (data) {
  return fetch.service_head({
    url: '/velicle-mgr/scene/control ',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function audiokeeperRecovery (data) {
  return fetch.service_head({
    url: '/velicle-mgr/audiokeeper/recovery ',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function iotLogList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/iot/log/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function iotUpdate (data) {
  return fetch.service_head({
    url: '/velicle-mgr/iot/update',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function clientChart (data) {
  return fetch.service_head({
    url: '/velicle-mgr/log/client/chart',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function goodsList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/goods/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function goodsUpdate (data) {
  return fetch.service_head({
    url: '/velicle-mgr/goods/update',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function goodsDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/goods/delete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function goodsAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/goods/add',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function visitList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/visit/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function visitPages (data) {
  return fetch.service_head({
    url: '/velicle-mgr/visit/pages',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function licenseList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/license/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function licenseAdd (data) {
  return fetch.service_head({
    url: '/velicle-mgr/license/add',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function licenseUpdate (data) {
  return fetch.service_head({
    url: '/velicle-mgr/license/update',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function licenseDel (data) {
  return fetch.service_head({
    url: '/velicle-mgr/license/delete',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function licenseGen (data) {
  return fetch.service_head({
    url: '/velicle-mgr/license/generate',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function licenseDown (data) {
  return fetch.FileDownload({
    url: '/velicle-mgr/license/download',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function activitiNotice (data) {
  return fetch.service_head({
    url: '/velicle-mgr/activiti/notice',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function activitiRead (data) {
  return fetch.service_head({
    url: '/velicle-mgr/activiti/read',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function nlulogList (data) {
  return fetch.service_head({
    url: '/velicle-mgr/nlulog/list',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function nlulogDict (data) {
  return fetch.service_head({
    url: '/velicle-mgr/nlulog/dict',
    method: 'post',
    data: data,
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}

export function servDownload (ixid,svr,time) {
  return fetch.FileDownload({
    url: '/velicle-mgr/servlog/downLoad?ixid='+ixid+'&svr='+svr+'&uip='+time,
    method: 'get',
    headers: {
      't': Base64.decode(JSON.parse(sessionStorage.getItem('token')).t),
      'u':sessionStorage.getItem('username')
    }
  })
}