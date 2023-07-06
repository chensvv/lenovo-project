export function getpageNum(s){
    var strs = parseInt(s / 10)  //
    if(s%10 >0){
        return strs+1
    }else{
        return strs
    }
}