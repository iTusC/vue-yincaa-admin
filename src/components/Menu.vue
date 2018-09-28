<template>
    <div @mouseover="ShowNav" @mouseout="HideNav">
        <el-aside class="yc-nav-sy" :width="navWt">
            <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo yc-menus"
            @open="handleOpen"
            @close="handleClose"
            text-color="#babdbf"
            active-text-color="#fff"
            :router="true"
            :unique-opened="true"
            :collapse="isCollapse">
                <transition name="bounce" mode="out-in">
                    <h1 v-if="isNavShow" class="yc-logo" ><img src="../assets/eye-logo.png" alt=""></h1>
                    <h1 v-else class="yc-logo"><img src="../assets/logo2.png" alt=""></h1>
                </transition>
                <template v-for="(navlist,index) in navList">
                    <template v-if="navlist.children">
                        <el-submenu :index="index+''">
                            <template slot="title">
                                <i :class="navlist.iconcls" class="yc-icon-sty iconfont"></i>
                                <span>{{ navlist.name}}</span>
                            </template>
                            <el-menu-item-group  style="background-color:#40434c">
                                <template v-for="itemList in navlist.children">
                                    <el-menu-item :index="itemList.path" style="padding-left:55px;">{{ itemList.name }}</el-menu-item>
                                </template>
                            </el-menu-item-group>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="navlist.path">
                            <i :class="navlist.iconcls"></i>
                            <span slot="title">{{ navlist.name }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
    export default {
        data(){
          return {
              isCollapse:false,
              isNavShow:false,
              navWt:'180px',
              navList:[
                  {
                      name:'预警统计',
                      iconcls:'yc-icon-tubiao',
                      children:[
                          {
                            name:'综合预警统计',
                            // path:'/EarlyIndex/ComprenensiveD',
                            path: '/ComprenensiveD'
                          },
                          {
                            name:'车辆预警统计',
                            path:'/VehicleD',
                          },
                          {
                            name:'驾驶员预警统计',
                            path:'/DirverD',
                          }
                      ]
                  },
                  {
                      name:'报警统计',
                      iconcls:'yc-icon-tubiao',
                      children:[
                          {
                            name:'综合报警统计',
                            path:'/BasicM',
                          },
                          {
                            name:'车辆报警统计',
                            path:'/SeniorM',
                          },
                          {
                            name:'驾驶员报警统计',
                            path:'/RoadSafetyM',
                          }
                      ]
                  },
                  {
                      name:'警报数据分析',
                      iconcls:'yc-icon-tubiao',
                      children:[
                          {
                            name:'一键报表上报',
                            path:'/AlarmS',
                          },
                          {
                            name:'车辆报警分析',
                            path:'/VehicleAS',
                          },
                          {
                            name:'驾驶员行为分析',
                            path:'/DriverAS',
                          }
                      ]
                  },
                  {
                      name:'资料档案库',
                      iconcls:'yc-icon-tubiao',
                      children:[
                          {
                            name:'车辆资料管理',
                            path:'/FileManagement/VehicleDataManagement',
                          },
                          {
                            name:'驾驶员资料管理',
                            path:'/OperationsS',
                          }
                      ]
                  },
                  {
                      name:'企业运营分析',
                      path:'/AlarmModule11',
                      iconcls:'yc-icon-tubiao',
                      children:[
                          {
                            name:'车辆数据分析',
                            path:'/KanBanS',
                          },
                          {
                            name:'驾驶员数据分析',
                            path:'/OBDcu',
                          },
                          {
                            name:'报警数据分析',
                            path:'/GDSParementerS',
                          },
                          {
                            name:'运营管理分析',
                            path:'/GDSParementerS',
                          }
                      ]
                  },
                  {
                      name:'保险数据采集',
                      path:'/AlarmModule11',
                      iconcls:'yc-icon-tubiao',
                      children:[
                          {
                            name:'六轴加速度数据',
                            path:'/KanBanS',
                          },
                          {
                            name:'现场定损数据',
                            path:'/OBDcu',
                          },
                          {
                            name:'实施风控救援数据',
                            path:'/GDSParementerS',
                          }
                      ]
                  }
                ]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
               
            },
            handleClose(key, keyPath) {
                
            },
            ShowNav(){
                this.navWt = '180px'
                this.isCollapse = false
                this.isNavShow = false
            },
            HideNav(){
                this.navWt = '64px'
                this.isCollapse = true
                this.isNavShow = true
            }
        }
    }
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.el-menu{
    border:0;
}
.yc-nav-sy{
    background-color: #373a44;
    height: 100%;
    transition: width 0.3s;
    overflow: hidden;
}
.yc-logo{
    height: 64px;
    text-align: center;
    line-height: 64px;
    color:#fff;
}
.yc-logo img{
    margin-top: 10px;
}
.el-submenu .el-menu-item{
    padding: 0px;
    min-width: auto;
    color:#868c91;
    font-size: 12px;
}
.el-menu--inline{
    background-color: none;
}
.el-menu li.is-opened {
    background-color: #40434c;
}
.el-menu{
    background-color: #373a44;
}
.el-menu-item:focus, .el-menu-item:hover {
    background-color: #868686;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
  }
.yc-icon-sty{
    font-size: 16px;
    color: #868c91;
    margin-right: 10px;
}

</style>