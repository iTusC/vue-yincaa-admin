import fetch from '../config/fetch'


//**************************** 综合统计获取数据api **************************/
// 综合获取车辆列表
export const teamTree = param => {
    return fetch.get('/gateway/alarm/teamTree',param);
}
//综合车辆查询列表树
export const searchByName = param => {
    return fetch.get('/gateway/alarm/searchByName',param);
}
//综合车辆在线率
export const onlineRateAll = param => {
    return fetch.get('/gateway/alarm/onlineRate',param);
}
//综合图表数据
export const composAlarmCount = param => {
    return fetch.get('/gateway/alarm/composAlarmCount',param);
}
//综合列表数据
export const alarmCompsStat = param => {
    return fetch.get('/gateway/alarm/alarmCompsList',param);
}
//综合列表详细数据
export const alarmCompsDetails = param => {
    return fetch.get('/gateway/alarm/alarmCompsDetail',param);
}
//综合列表报警类型value
export const ByGategory = param =>{
    return fetch.get('/gateway/alarm/getByAdas',param);
}


/************************************** 驾驶员获取数据api ********************************/

//驾驶员echarts统计数据
export const deriverAlarmCount = param => {
    return fetch.get('/gateway/alarm/deriverAlarmCount',param);
}
//驾驶员表格数据
export const alarmStatAll = param =>{
    return fetch.get('/gateway/alarm/alarmStat',param);
}
//统计三个驾驶员echarts
export const deriverVehicleAlarmCount = param =>{
    return fetch.get('/gateway/alarm/deriverVehicleAlarmCount',param);
}

/************************************** 车辆获取数据api ********************************/
export const vehicleAlarmCount = param =>{
    return fetch.get('/gateway/alarm/vehicleAlarmCount',param)
}

/************************************** 获取详细页数据api ********************************/
export const alarmDetail = param =>{
    return fetch.get('/gateway/alarm/alarmDetail',param)
}



export const echartsMap =  param =>{
    return fetch.get('/gateway/api/lines-bus.json',param)
}

//登录接口
export const login = param =>{
    return fetch.post('/login',param)
}

//获取账户信息
export const getCompanyName = param =>{
    return fetch.get('/gateway/user/searchInfo',param)
}
