import Mock from 'mockjs'

Mock.mock(/getNavList/,{
    'list|5':[
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