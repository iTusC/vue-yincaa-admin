import fetch from '../config/fetch'


//**************************** 综合统计获取数据api **************************/
// 综合获取车辆列表
export const teamTree = param => {
    return fetch.post('/alarm/teamTree',param);
}
//综合车辆查询列表树
export const searchByName = param => {
    return fetch.post('/alarm/dropDownList',param);
}
//综合车辆在线率
export const onlineRateAll = param => {
    return fetch.post('/alarm/onlineRate',param);
}
//综合图表数据
export const composAlarmCount = param => {
    return fetch.post('/alarm/composAlarmCount',param);
}
//综合列表数据
export const alarmCompsStat = param => {
    return fetch.post('/alarm/alarmCompsList',param);
}
//综合列表详细数据
export const alarmCompsDetails = param => {
    return fetch.post('/alarm/alarmCompsDetail',param);
}
//综合列表报警类型value
export const ByGategory = param =>{
    return fetch.post('/alarm/alarmType',param);
}


/************************************** 驾驶员获取数据api ********************************/

//驾驶员echarts统计数据
export const deriverAlarmCount = param => {
    return fetch.post('/alarm/driverAlarmCount',param);
}
//驾驶员表格数据
export const alarmStatAll = param =>{
    return fetch.post('/alarm/alarmDetailOfVD',param);
}
//统计三个驾驶员echarts
export const deriverVehicleAlarmCount = param =>{
    return fetch.post('/alarm/driverDetailAlarmCount',param);
}

/************************************** 车辆获取数据api ********************************/
export const vehicleAlarmCount = param =>{
    return fetch.post('/alarm/vehicleAlarmCount',param)
}

/************************************** 获取详细页数据api ********************************/
export const alarmDetail = param =>{
    return fetch.post('/alarm/alarmDetail',param)
}



export const echartsMap =  param =>{
    return fetch.post('/api/lines-bus.json',param)
}

//登录接口
export const login = param =>{
    return fetch.post('/login',param)
}

//获取账户信息
export const getCompanyName = param =>{
    return fetch.post('/user/searchInfo',param)
}


//demo页饼图详情数据
export const getDomeVertical = param =>{
    return fetch.post('/alarm/alarmTypeMonthCount',param)
}

//demo页面报警30天统计
export const alarmTypeDayCount = param =>{
    return fetch.post('/alarm/alarmTypeDayCount',param)
}

//demo最新报警信息
export const getLatestAlarms = param =>{
    return fetch.post('/alarm/getLatestAlarms',param)
}