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
//预警详情分页列表(优化后新接口)
export const getAlarmListByFilter = param =>{
    return fetch.post('/alarm/getAlarmListByFilter',param);
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


/************************************** 档案库api ********************************/

//首页-日志信息
export const getLogs = param =>{
    return fetch.post('/archives/getLogs',param)
}
//首页-主页统计指标
export const getStatisticData = param =>{
    return fetch.post('/archives/getStatisticData',param)
}
//终端机-批量添加终端
export const addTerminals = param =>{
    return fetch.post('/archives/terminal/addTerminals',param)
}
//终端机-批量删除终端
export const deleteTerminals = param =>{
    return fetch.post('/archives/terminal/deleteTerminals',param)
}
//终端机-获取终端所有品牌
export const getAllTerminalBrand = param =>{
    return fetch.post('/archives/terminal/getAllTerminalBrand',param)
}
//终端机-获取终端信息列表
export const getTerminalInfoList = param =>{
    return fetch.post('/archives/terminal/getTerminalInfoList',param)
}
//终端机-获取指定品牌终端下所有机型
export const getTerminalType = param =>{
    return fetch.post('/archives/terminal/getTerminalType',param)
}

