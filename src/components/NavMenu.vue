<template>
    <div>
        <el-aside :width="navWithd" class="yc-nav-sy">
            <h1 class="uc-logo">yincaa</h1>
            <ul class="yc-nav">
                <template v-for="(nav,index) in navList">
                    <template v-if="nav.children">
                        <li :key="index" :class="{activebg:index === isLiClick}">
                            <div class="yc-navtitle" @click="showList(index,$event)" :key="index" >
                                <i :class="nav.iconcls"></i>
                                <i class="el-submenu__icon-arrow el-icon-arrow-down"  
                                :key="index" 
                                :class="{active:index === current}"></i>
                                <span>{{ nav.name }}</span>
                            </div>
                            <transition fade="fade" >
                                <ul :class="{active:index === current}" v-if="isShow" class="yc-nav-itemul" >
                                    <template v-for="(chList,i) in nav.children">
                                        <router-link
                                        :to="chList.path" 
                                        :data-key="index" 
                                        @click.native="itemActive(index,$event,i)" 
                                        tag="li" 
                                        class="yc-nav-item" >
                                        {{ chList.name }}
                                        </router-link>
                                    </template>
                                </ul>
                            </transition>
                        </li>
                    </template>
                    <template v-else>
                        <router-link :to="nav.path" tag="li" class="nochildren">
                            <div class="yc-navtitle" @click="inAc(index,$event)" :key="index" :class="{active:index === isNavL}">
                                <i :class="nav.iconcls"></i>
                                <span>{{ nav.name }}</span>
                            </div>
                        </router-link>
                    </template>
                </template>
            </ul>
        </el-aside>
    </div>
</template>

<style scoped>
    .yc-nav-sy{
        background-color: #ffffff;
	    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.11);
        height: 100%;
    }
    .uc-logo{
        height: 64px;
        text-align: center;
        line-height: 64px;
    }
    .yc-navtitle,.yc-nav-item{
        height: 64px;
        line-height: 64px;
        font-size: 14px;
        color: #303133;
        padding: 0 20px;
        list-style: none;
        cursor: pointer;
        position: relative;
        transition: border-color .3s,background-color .3s,color .3s;
        box-sizing: border-box;
        white-space: nowrap;
    }
    .yc-navtitle.active,.yc-nav li.activebg,.yc-nav li.router-link-active{
        background-color: #f5f5f5;
    }
    /* .yc-nav li.nochildren.router-link-active{
        background-color: #f5f5f5;
    } */
    .yc-nav .yc-nav-item{
        height: 48px;
        line-height: 48px;
        padding: 0 45px;
    }
    .yc-nav li{
        user-select: none;
        transition:  height 1s;
        height: 100%;
    }
    .yc-nav ul{
        display: none;
    }
    .yc-nav ul.active{
        display: block;
    }
    .yc-nav ul li{
        font-size: 12px;
    }
    .yc-nav ul li.router-link-active{
        font-weight: 600;
        letter-spacing: -0.1px;
        color: #112146;
    }
    .yc-nav div i.active{
        transform: rotate(180deg);
    }
    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }
</style>

<script>
import axios from 'axios'
  export default {
      data(){
          return {
              navList:[
                  {
                      name:'模块一',
                      iconcls:'el-icon-location',
                      children:[
                          {
                            name:'item-1',
                            path:'/AlarmModule1',
                          },
                          {
                            name:'item2',
                            path:'/AlarmModule2',
                          },
                          {
                            name:'item3',
                            path:'/AlarmModule3',
                          }
                      ]
                  },
                  {
                      name:'预警管理',
                      iconcls:'el-icon-location',
                      children:[
                          {
                            name:'车辆数据统计',
                            path:'/mokAlarmModule',
                          },
                          {
                            name:'驾驶员数据统计    ',
                            path:'/item2AlarmModule',
                          }
                      ]
                  },
                  {
                      name:'模块3',
                      iconcls:'el-icon-location',
                      children:[
                          {
                            name:'item-1',
                            path:'/mokAlarmModule2',
                          },
                          {
                            name:'item2',
                            path:'/item2AlarmModule2',
                          },
                          {
                            name:'item3',
                            path:'/item3AlarmModule2',
                          }
                      ]
                  },
                  {
                      name:'模块4',
                      iconcls:'el-icon-location',
                      children:[
                          {
                            name:'item-1',
                            path:'/mokAlarmModule44',
                          },
                          {
                            name:'item2',
                            path:'/item2AlarmModule44',
                          },
                          {
                            name:'item3',
                            path:'/item3AlarmModule44',
                          }
                      ]
                  },
                  {
                      name:'预警管理',
                      path:'/AlarmModule',
                      iconcls:'el-icon-location',
                  }
              ],
              current:'',
              isShow:false,
              itActive:'',
              isActiveBg:'',
              isLiClick:'',
              isNavL:'',
              navWithd:'180px',
              isShowCls:false
          }
      },
      methods:{
          showList(index,e){
              if(this.current === index ){
                this.current = ''
                this.isShow = false
              }else{
                this.current = index
                this.isShow = true
              }
          },
          itemActive(index,e,i){
            if(this.isLiClick === index){
                this.itActive = i
                
            }else{
                this.isNavL = ''
                this.isLiClick = index 
            }
           
          },
        //   showNav(){

        //   },
        //   hideNav(){

        //   },
          inAc(i){
              this.current=''
              this.isShow=false
              this.itActive=''
              this.isLiClick=''
              this.isNavL = i 
          },
          wlading(){
              console.log()
          }
      },
      mounted(){
         this.wlading()
      },
    //   mounted () {
    //     axios.get('api/getNavList').then((res)=>{
    //         this.navList = res.data.list
    //     }).catch((res)=>{
    //         console.log(res)
    //     })
    //   }

  }
</script>
