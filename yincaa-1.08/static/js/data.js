
export function getDay(day){    
       var today = new Date();    
           
       var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;            
    
       today.setTime(targetday_milliseconds); //注意，这行是关键代码  
           
       var tYear = today.getFullYear();    
       var tMonth = today.getMonth();    
       var tDate = today.getDate();    
       tMonth = doHandleMonth(tMonth + 1);    
       tDate = doHandleMonth(tDate);    
       return tYear+"-"+tMonth+"-"+tDate;    
}    
function doHandleMonth(month){    
       var m = month;    
       if(month.toString().length == 1){    
          m = "0" + month;    
       }    
       return m;    
}  

export function getCascaderObj(val, opt){
    return val.map(function (value, index, array) {
        for (var itm of opt) {
            if (itm.value == value) { opt = itm.children; return itm; }
        }
        return null;
    });
}

export function getToken() {
    if (document.cookie.length>0) {
    var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
    for(var i=0;i<arr.length;i++){
      var arr2=arr[i].split('=');//再次切割
      //判断查找相对应的值
      if(arr2[0]=='JSESSIONID'){
        return true
      }else{
          return false
      }
    }
  }
}