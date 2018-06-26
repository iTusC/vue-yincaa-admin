import Mock from 'mockjs'


const getnaclist =Mock.mock(/getNavList/,{
    'getnaclist|5':[
        {
            name:'@ctitle(4)',
            path:'',
            cls:'icon',
            'children|5':[
                {
                    name:'@ctitle(4)',
                    path:'@url',
                    cls:'icon'
                }
            ]
        }
    ]
})

const getVehicleList = Mock.mock(/getVehicleList/,{
    'getVehicleList|5':[
        {
            teamName:'@ctitle(3,7)',
            'onlineSum|20-30':3,
            vehicleSum:40,
            'vehicleList|5':[
                {
                    vehicleCode:'@ctitle(3,7)',
                    deriverSum:'3',
                    'isOnline|1-2':true,
                    'deriverList|5':[
                        {
                            deriveName:'@cname',
                            workerDate:'@time',
                        }
                    ]
                }
            ]
        }
    ]
})

export default{
    getVehicleList,
    getnaclist
}