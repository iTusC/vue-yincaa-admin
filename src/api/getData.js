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

//车辆查询综合统计列表
export const alarmCompsStatDeriver = (companyCode,vehicleCode,startDate,endDate) => fetch('/api/alarmCompsStat',{
    companyCode,vehicleCode,startDate,endDate
})