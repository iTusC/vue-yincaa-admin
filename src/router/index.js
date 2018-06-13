import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map'
import IndexPage from '@/pages/Index'
import EarlyIndex from '../pages/EarlyWarning/EarlyIndex'
import ComprenensiveD from '../pages/EarlyWarning/ComprenensiveD'
import DirverD from '../pages/EarlyWarning/DirverD'
import VehicleD from '../pages/EarlyWarning/VehicleD'
import AlarmIndex from '../pages/Alarm/AlarmIndex'
import AlarmS  from '../pages/Alarm/AlarmS'
import DriverAS  from '../pages/Alarm/DriverAS'
import FarltAS  from '../pages/Alarm/FarltAS'
import VehicleAS  from '../pages/Alarm/VehicleAS'
import BasicIndex from '../pages/BasicSkills/BasicIndex'
import BasicM  from '../pages/BasicSkills/BasicM'
import InstallatilM  from '../pages/BasicSkills/InstallatilM'
import RoadSafetyM  from '../pages/BasicSkills/RoadSafetyM'
import SeniorM  from '../pages/BasicSkills/SeniorM'
import GreenIndex  from '../pages/GreenDriving/GreenIndex'
import GDSParementerS  from '../pages/GreenDriving/GDSParementerS'
import KanBanS  from '../pages/GreenDriving/KanBanS'
import OBDcu  from '../pages/GreenDriving/OBDcu'
import OperationsIndex  from '../pages/Operations/OperationsIndex'
import ImageS  from '../pages/Operations/ImageS'
import OperationsS  from '../pages/Operations/OperationsS'
import StateS  from '../pages/Operations/StateS'
import UserS  from '../pages/Operations/UserS'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      redirect:'/IndexPage',
      component: IndexPage,
      meta:{
        breadcrumb:'首页'
      }
    },
    {
      path:'/IndexPage',
      component:IndexPage
    },
    {
      path:'/AlarmIndex',
      redirect:'/AlarmS',
      component:AlarmIndex,
      meta:{
        breadcrumb:'报警管理'
      },
      children:[
        {
          path:'/AlarmS',
          component:AlarmS,
          meta:{
            breadcrumb:'报警统计'
          }
        },
        {
          path:'/VehicleAS',
          component:VehicleAS,
          meta:{
            breadcrumb:'车辆报警'
          }
        },       
        {
          path:'/FarltAS',
          component:FarltAS,
          meta:{
            breadcrumb:'故障报警'
          }
        },
        {
          path:'/DriverAS',
          component:DriverAS,
          meta:{
            breadcrumb:'司机报警'
          }
        }
      ]
    },
    {
      path:'/BasicIndex',
      redirect:'/BasicM',
      component:BasicIndex,
      meta:{
        breadcrumb:'基础功能管理'
      },
      children:[
        {
          path:'/BasicM',
          component:BasicM,
          meta:{
            breadcrumb:'基础功能'
          }
        },
        {
          path:'/SeniorM',
          component:SeniorM,
          meta:{
            breadcrumb:'高级功能管理'
          }
        },
        {
          path:'/RoadSafetyM',
          component:RoadSafetyM,
          meta:{
            breadcrumb:'道路安全管理'
          }
        },
        {
          path:'/InstallatilM',
          component:InstallatilM,
          meta:{
            breadcrumb:'安装维修管理'
          }
        }
      ]
    },
    {
      path:'/EarlyIndex',
      redirect:'/ComprenensiveD',
      component:EarlyIndex,
      meta:{
        breadcrumb:'预警管理'
      },
      children:[
        {
          path:'/ComprenensiveD',
          component:ComprenensiveD,
          meta:{
            breadcrumb:'综合数据统计'
          }
        },
        {
          path:'/DirverD',
          component:DirverD,
          meta:{
            breadcrumb:'司机数据统计'
          }
        },
        {
          path:'/VehicleD',
          component:VehicleD,
          meta:{
            breadcrumb:'车辆数据统计'
          }
        }
      ]
    },
    {
      path:'/GreenIndex',
      redirect:'/GDSParementerS',
      component:GreenIndex,
      meta:{
        breadcrumb:'绿色安全驾驶'
      },
      children:[
        {
          path:'/GDSParementerS',
          component:GDSParementerS,
          meta:{
            breadcrumb:'GDS参数管理'
          }
        },
        {
          path:'/OBDcu',
          component:OBDcu,
          meta:{
            breadcrumb:'OBD标定升级'
          }
        },
        {
          path:'/KanBanS',
          component:KanBanS,
          meta:{
            breadcrumb:'看板'
          }
        }
      ]
    },
    {
      path:'/OperationsIndex',
      redirect:'/OperationsS',
      component:OperationsIndex,
      meta:{
        breadcrumb:'运营管理'
      },
      children:[
        {
          path:'/OperationsS',
          component:OperationsS,
          meta:{
            breadcrumb:'运营类统计'
          }
        },
        {
          path:'/StateS',
          component:StateS,
          meta:{
            breadcrumb:'状态统计'
          }
        },
        {
          path:'/UserS',
          component:UserS,
          meta:{
            breadcrumb:'用户管理'
          }
        },
        {
          path:'/ImageS',
          component:ImageS,
          meta:{
            breadcrumb:'图片类报表'
          }
        }
      ]
    }
  ]
})
