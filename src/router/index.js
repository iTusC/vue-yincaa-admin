import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/Index'
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
import { resolve } from 'upath';

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      redirect:'/ComprenensiveD',
      component: resolve => require(['../pages/EarlyWarning/EarlyIndex'],resolve),
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
      component: resolve => require(['../pages/Alarm/AlarmIndex'],resolve),
      meta:{
        breadcrumb:'报警管理'
      },
      children:[
        {
          path:'/AlarmS',
          component: resolve => require(['../pages/Alarm/AlarmIndex'],resolve),
          meta:{
            breadcrumb:'报警统计'
          }
        },
        {
          path:'/VehicleAS',
          component: resolve => require(['../pages/Alarm/VehicleAS'],resolve),
          meta:{
            breadcrumb:'车辆报警'
          }
        },       
        {
          path:'/FarltAS',
          component: resolve => require(['../pages/Alarm/FarltAS'],resolve),
          meta:{
            breadcrumb:'故障报警'
          }
        },
        {
          path:'/DriverAS',
          component: resolve => require(['../pages/Alarm/DriverAS'],resolve),
          meta:{
            breadcrumb:'司机报警'
          }
        }
      ]
    },
    {
      path:'/BasicIndex',
      redirect:'/BasicM',
      component: resolve => require(['../pages/BasicSkills/BasicIndex'],resolve),
      meta:{
        breadcrumb:'基础功能管理'
      },
      children:[
        {
          path:'/BasicM',
          component: resolve => require(['../pages/BasicSkills/BasicM'],resolve),
          meta:{
            breadcrumb:'基础功能'
          }
        },
        {
          path:'/SeniorM',
          component: resolve => require(['../pages/BasicSkills/SeniorM'],resolve),
          meta:{
            breadcrumb:'高级功能管理'
          }
        },
        {
          path:'/RoadSafetyM',
          component: resolve => require(['../pages/BasicSkills/RoadSafetyM'],resolve),
          meta:{
            breadcrumb:'道路安全管理'
          }
        },
        {
          path:'/InstallatilM',
          component: resolve => require(['../pages/BasicSkills/InstallatilM'],resolve),
          meta:{
            breadcrumb:'安装维修管理'
          }
        }
      ]
    },
    {
      path:'/EarlyIndex',
      redirect:'/ComprenensiveD',
      component: resolve => require(['../pages/EarlyWarning/EarlyIndex'],resolve),
      meta:{
        breadcrumb:'预警管理'
      },
      children:[
        {
          path:'/ComprenensiveD',
          component: resolve => require(['../pages/EarlyWarning/ComprenensiveD'],resolve),
          meta:{
            breadcrumb:'综合统计'
          }
        },
        {
          path:'/DirverD',
          component: resolve => require(['../pages/EarlyWarning/DirverD'],resolve),
          meta:{
            breadcrumb:'驾驶员数据统计'
          }
        },
        {
          path:'/VehicleD',
          component: resolve => require(['../pages/EarlyWarning/VehicleD'],resolve),
          meta:{
            breadcrumb:'车辆数据统计'
          }
        }
      ]
    },
    {
      path:'/GreenIndex',
      redirect:'/GDSParementerS',
      component: resolve => require(['../pages/GreenDriving/GreenIndex'],resolve),
      meta:{
        breadcrumb:'绿色安全驾驶'
      },
      children:[
        {
          path:'/GDSParementerS',
          component: resolve => require(['../pages/GreenDriving/GDSParementerS'],resolve),
          meta:{
            breadcrumb:'GDS参数管理'
          }
        },
        {
          path:'/OBDcu',
          component: resolve => require(['../pages/GreenDriving/OBDcu'],resolve),
          meta:{
            breadcrumb:'OBD标定升级'
          }
        },
        {
          path:'/KanBanS',
          component: resolve => require(['../pages/GreenDriving/KanBanS'],resolve),
          meta:{
            breadcrumb:'看板'
          }
        }
      ]
    },
    {
      path:'/OperationsIndex',
      redirect:'/OperationsS',
      component: resolve => require(['../pages/Operations/OperationsIndex'],resolve),
      meta:{
        breadcrumb:'运营管理'
      },
      children:[
        {
          path:'/OperationsS',
          component: resolve => require(['../pages/Operations/OperationsS'],resolve),
          meta:{
            breadcrumb:'运营类统计'
          }
        },
        {
          path:'/StateS',
          component: resolve => require(['../pages/Operations/StateS'],resolve),
          meta:{
            breadcrumb:'状态统计'
          }
        },
        {
          path:'/UserS',
          component: resolve => require(['../pages/Operations/UserS'],resolve),
          meta:{
            breadcrumb:'用户管理'
          }
        },
        {
          path:'/ImageS',
          component: resolve => require(['../pages/Operations/ImageS'],resolve),
          meta:{
            breadcrumb:'图片类报表'
          }
        }
      ]
    }
  ]
})
