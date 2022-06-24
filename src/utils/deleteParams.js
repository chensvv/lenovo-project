import md5 from 'js-md5';

export function deleteParams(json_data){
  var newParams = {}
  let new_json = {...json_data}
    if(JSON.stringify(new_json) == '{}' || JSON.stringify(new_json) == ''){
      return
    }else{
      for(var key in json_data){
        if(JSON.stringify(new_json[key]) == '""' || JSON.stringify(new_json[key]) == '[]' || JSON.stringify(new_json[key]) == 'null'){
          delete new_json[key]
        }
      }
      delete new_json.order
      Object.keys(new_json).sort().map(item=>{
        newParams[item] = new_json[item]
      })
      // console.log(Object.entries(newParams).map(([ key, val ]) => `${key}=${JSON.stringify(val)}`).join('&').replace(/\"/g, "").replace(/\\/g, ""))
      let md5Json = md5(Object.entries(newParams).map(([ key, val ]) => `${key}=${JSON.stringify(val)}`).join('&').replace(/\"/g, ""))
      return md5Json
    }
    
}

    