
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

export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
 
function padLeftZero (str) {
    return ('00' + str).substr(str.length);
};
 // 格式化时间   let start = new Date(val)   let y = start.getFullYear()   let m = (start.getMonth() + 1) > 10 ? (start.getMonth() + 1) : '0' + (start.getMonth() + 1)   let d = start.getDate() > 10 ? start.getDate() : '0' + start.getDate()   return y + '-' + m + '-' + d } 
 function mistiming (sDate1, sDate2) {
   // 计算开始和结束的时间差
   let aDate, oDate1, oDate2, iDays
   aDate = sDate1.split('-')
   oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
   aDate = sDate2.split('-')
   oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
   iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
   return iDays + 1
 }
 
 function countDate (start, end) {
   // 判断开始和结束之间的时间差是否在90天内
   let days = mistiming(start, end)
   let stateT = days > 90 ? Boolean(0) : Boolean(1)
   return {
     state: stateT,
     day: days
   }
 }
 function timeForMat (count) {
   // 拼接时间
   let time1 = new Date()
   time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000))
   let Y1 = time1.getFullYear()
   let M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
   let D1 = (time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate())
   let timer1 = Y1 + '-' + M1 + '-' + (D1+1) // 当前时间
   let time2 = new Date()
   time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
   let Y2 = time2.getFullYear()
   let M2 = ((time2.getMonth() + 1) > 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
   let D2 = (time2.getDate() > 10 ? time2.getDate() : '0' + time2.getDate())
   let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
   return {
     t1: timer1,
     t2: timer2
   }
 }
 
 function yesterday (start, end) {
   // 校验是不是选择的昨天
   let timer = timeForMat(1)
   return timer
 }
 
 function sevenDays () {
   // 获取最近7天
   let timer = timeForMat(7)
   return timer
 }

 function thirtyDays () {
   // 获取最近30天
   let timer = timeForMat(30)
   return timer
 }
 
 export {
   formatDates,
   countDate,
   yesterday,
   sevenDays,
   thirtyDays
 }

 export function week(val){
  let now = new Date(val); 
  let nowTime = now.getTime() ; 
  let day = now.getDay();
  let oneDayLong = 24*60*60*1000 ; 
  let MondayTime = nowTime - (day)*oneDayLong; 
  let SundayTime =  nowTime + (7-day)*oneDayLong;
  let monday = new Date(MondayTime);
  let sunday = new Date(SundayTime);
  let dataMonday = monday.getFullYear() + '-' + (monday.getMonth() + 1<10 && (monday.getMonth() + 1!=10) ?'0'+ (monday.getMonth() + 1):(monday.getDate()+1)) + '-' +(monday.getDate()<10?'0'+(monday.getDate()+1):(monday.getDate()+1))+' 00:00:00'; 
  let dataSunday = sunday.getFullYear() + '-' + (sunday.getMonth() + 1<10 && (monday.getMonth() + 1!=10) ?'0'+ (sunday.getMonth() + 1):sunday.getDate()) + '-' +(sunday.getDate()<10?'0'+(sunday.getDate()):sunday.getDate())+ ' 23:59:59'; 
  return {
    M:dataMonday,S:dataSunday
  }
 } 