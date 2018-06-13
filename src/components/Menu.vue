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
                    <h1 v-if="isNavShow" class="yc-logo" ><i class="byte-ai">B.A</i></h1>
                    <h1 v-else class="yc-logo"><i class="byte-ai">BYTE.AI</i></h1>
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
                      name:'预警管理',
                      iconcls:'yc-icon-tubiao',
                      children:[
                          {
                            name:'综合数据统计',
                            path:'/ComprenensiveD',
                          },
                          {
                            name:'车辆数据统计',
                            path:'/VehicleD',
                          },
                          {
                            name:'驾驶员数据统计',
                            path:'/DirverD',
                          }
                      ]
                  },
                  {
                      name:'功能管理',
                      iconcls:'yc-icon-tubiao',
                      children:[
                          {
                            name:'基础数据管理',
                            path:'/BasicM',
                          },
                          {
                            name:'高级功能管理',
                            path:'/SeniorM',
                          },
                          {
                            name:'道路安全管理',
                            path:'/RoadSafetyM',
                          },
                          {
                            name:'安装维修管理',
                            path:'/InstallatilM',
                          }
                      ]
                  },
                  {
                      name:'报警管理',
                      iconcls:'yc-icon-tubiao',
                      children:[
                          {
                            name:'报警统计',
                            path:'/AlarmS',
                          },
                          {
                            name:'车辆报警',
                            path:'/VehicleAS',
                          },
                          {
                            name:'驾驶报警',
                            path:'/DriverAS',
                          },
                          {
                            name:'故障报警',
                            path:'/FarltAS',
                          }
                      ]
                  },
                  {
                      name:'运营管理',
                      iconcls:'yc-icon-tubiao',
                      children:[
                          {
                            name:'状态统计',
                            path:'/StateS',
                          },
                          {
                            name:'运营类统计',
                            path:'/OperationsS',
                          },
                          {
                            name:'用户管理',
                            path:'/UserS',
                          },
                          {
                            name:'图片类报表',
                            path:'/ImageS',
                          }
                      ]
                  },
                  {
                      name:'绿色驾驶',
                      path:'/AlarmModule11',
                      iconcls:'yc-icon-tubiao',
                      children:[
                          {
                            name:'看板',
                            path:'/KanBanS',
                          },
                          {
                            name:'OBD标定升级',
                            path:'/OBDcu',
                          },
                          {
                            name:'GDS参数配置',
                            path:'/GDSParementerS',
                          }
                      ]
                  }
                ]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
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
@import url("../assets/css/iconfont");
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