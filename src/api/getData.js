import fetch from '../config/fetch'

// 默认获取车辆列表
export const teamTree = (companyCode) => fetch('/api/teamTree',{
    companyCode
})

//查询车辆列表
export const teamTreeSelect = (companyCode,teamName) => fetch('/api/teamTree',{
    companyCode,teamName
})

//默认车辆列表
export const searchByName = (companyCode)=>fetch('/api/searchByName',{
    companyCode
})

//获取查询车辆列表
export const searchByNameChr = (companyCode,searchByName) => fetch('/api/searchByName',{
    companyCode,searchByName
})

// //综合车辆在线率
export const onlineRate = (companyCode,teamCode) => fetch('/api/onlineRate',{
    companyCode,teamCode
})

// //综合车辆在线率
export const onlineRateAll = (companyCode) => fetch('/api/onlineRate',{
    companyCode
})

// 图表默认数据
export const composAlarmCount = (companyCode,startDate,endDate) => fetch('/api/composAlarmCount',{
    companyCode,startDate,endDate
})

// 图表车辆数据
export const composAlarmCountVehicle = (companyCode,vehicleCode,startDate,endDate) => fetch('/api/composAlarmCount',{
    companyCode,vehicleCode,startDate,endDate
})

// 图表驾驶员数据
export const composAlarmCountDeriver = (companyCode,deriverCode,startDate,endDate) => fetch('/api/composAlarmCount',{
    companyCode,deriverCode,startDate,endDate
})

// 图表车队数据
export const composAlarmCountTeamCode = (companyCode,teamCode,startDate,endDate) => fetch('/api/composAlarmCount',{
    companyCode,teamCode,startDate,endDate
})

//默认综合统计列表
export const alarmCompsStat = (companyCode,startDate,endDate) => fetch('/api/alarmCompsStat',{
    companyCode,startDate,endDate
})

//车辆查询综合统计列表
export const alarmCompsStatVehicle = (companyCode,vehicleCode,startDate,endDate) => fetch('/api/alarmCompsStat',{
    companyCode,vehicleCode,startDate,endDate
})

//驾驶员查询综合统计列表
export const alarmCompsStatD = (companyCode,deriverCode,startDate,endDate) => fetch('/api/alarmCompsStat',{
    companyCode,deriverCode,startDate,endDate
})

//车辆报警类型查询综合统计列表
export const alarmCompsStatVehiclelPlice = (companyCode,deriverCode,startDate,endDate,alarmCode) => fetch('/api/alarmCompsStat',{
    companyCode,deriverCode,startDate,endDate,alarmCode
})

//车辆报警类型查询综合统计列表
export const alarmCompsStatVehiclelclass = (companyCode,teamCode,startDate,endDate,alarmCode) => fetch('/api/alarmCompsStat',{
    companyCode,teamCode,startDate,endDate,alarmCode
})

//查询报警类型
export const getByGategory = (gategory,alarmName) => fetch('/api/getByGategory',{
    gategory,alarmName
})

//车辆查询综合统计列表
export const alarmCompsStatDeriver = (companyCode,vehicleCode,startDate,endDate) => fetch('/api/alarmCompsStat',{
    companyCode,vehicleCode,startDate,endDate
})

//默认驾驶员列表统计
export const deriverAlarmCount = (companyCode,startDate,endDate) => fetch('/api/deriverAlarmCount',{
    companyCode,startDate,endDate
})

//查询驾驶员列表统计
export const deriverAlarmCountDeriverCode = (companyCode,deriverCode,startDate,endDate) => fetch('/api/deriverAlarmCount',{
    companyCode,deriverCode,startDate,endDate
})

//车辆查询驾驶员列表统计
export const deriverAlarmCountVehicleCode = (companyCode,vehicleCode,startDate,endDate) => fetch('/api/deriverAlarmCount',{
    companyCode,vehicleCode,startDate,endDate
})

//车队图表统计
export const deriverAlarmCountTeamCode = (companyCode,teamCode,startDate,endDate) => fetch('/api/deriverAlarmCount',{
    companyCode,teamCode,startDate,endDate
})

//树查询列表统计
export const deriverVehicleAlarmCount = (companyCode,teamCode,vehicleCode, startDate,endDate) => fetch('/api/deriverVehicleAlarmCount',{
    companyCode,teamCode,vehicleCode,startDate,endDate
})

//echarts车队查询查询列表统计
export const deriverVehicleAlarmCountVehicleCode = (companyCode,teamCode,vehicleCode,startDate,endDate) => fetch('/api/deriverVehicleAlarmCount',{
    companyCode,teamCode,vehicleCode,startDate,endDate
})

//车辆查询驾驶员默认统计列表
export const alarmStat = (pageNum,pageSize,companyCode,vehicleCode, startDate,endDate,gategory) => fetch('/api/alarmStat',{
    pageNum,pageSize,companyCode,vehicleCode,startDate,endDate,gategory
})

//车队查询默认统计列表
export const alarmStatTeamCode = (pageNum,pageSize,companyCode,teamCode, startDate,endDate,gategory) => fetch('/api/alarmStat',{
    pageNum,pageSize,companyCode,teamCode,startDate,endDate,gategory
})

//查询默认统计列表
export const alarmStatAll = (pageNum,pageSize,companyCode, startDate,endDate,gategory) => fetch('/api/alarmStat',{
    pageNum,pageSize,companyCode,startDate,endDate,gategory
})


//车辆预警统计
export const vehicleAlarmCount = (companyCode,startDate,endDate) => fetch('/api/vehicleAlarmCount',{
    companyCode,startDate,endDate
})


//车队预警车队查询
export const vehicleAlarmCountSum = (companyCode,teamCode,startDate,endDate) => fetch('/api/vehicleAlarmCount',{
    companyCode,teamCode,startDate,endDate
})

//车辆预警车队查询
export const vehicleAlarmCountV = (companyCode,vehicleCode,startDate,endDate) => fetch('/api/vehicleAlarmCount',{
    companyCode,vehicleCode,startDate,endDate
})


//车辆预警类型筛选
export const alarmStatAlarmCode = (pageNum,pageSize,companyCode, startDate,endDate,gategory,alarmCode) => fetch('/api/alarmStat',{
    pageNum,pageSize,companyCode, startDate,endDate,gategory,alarmCode
})