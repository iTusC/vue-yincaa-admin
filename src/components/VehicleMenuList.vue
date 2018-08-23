<template>
    <div>

        <li class="vehilce-list-item">
            <div class="vehile-item-title" @click.stop="itemOpened($event,i)">
                <i :class="chr.status?'online':'offline'"></i>
                {{ chr.title }}
                <i class="icon-user iconfont yc-icon-yonghu">{{ chr.numb }}</i>
            </div>
            <ul class="vehile-item-list" :class="{'vehile-item-list-isopened':chr.ind === itemEnd}">
                <template v-for="chrls in chr.chrl">
                    <li>
                        {{ chrls.name }}
                        <i class="item-time">{{ chrls.time }}</i>
                    </li>
                </template>
            </ul>
        </li>
        
    </div>
</template>

<script>
    
    export default {
        props:['vChr'],
        methods:{
            itemOpened(e,i){
                this.$emit('itemOpened',{e:e,i:i})
            }
        }
    }
</script>

<style scoped>
@import url("../assets/css/iconfont");
.el-menu-vertical-demo{
        background-color: #f5f5f5;
        text-align: left;
}
.el-submenu__title:hover {
    background-color: #333;
}
.el-submenu__title:focus, .el-submenu__title:hover {
    outline: 0;
    background-color: #333;
}
.el-menu-vertical-demo .el-submenu__title{
    padding: 0;
}
.yc-menu-vehicle .el-submenu__title:hover{
    background-color: #fff;
}
.yc-menu-vehicle .el-menu--inline{
    background-color: #f5f5f5;
}
.yc-menu-vehicle .el-menu-item:hover{
    background-color: #fff;
}
.yc-menu-vehicle .el-menu-item.is-active{
    color: #333;
    font-weight: 700;
    background-color: #fff;
}
.online{
  position: absolute;
  left: -20px;
  width: 9px;
  height: 9px;
  background-color: #52a261;
  border-radius: 50%;
  top: 35%;
}
.offline{
  position: absolute;
  left: -20px;
  width: 9px;
  height: 9px;
  background-color: #b1b5b6;
  border-radius: 50%;
  top: 35%;
}
.icon-vehicle{
   font-size: 16px;
    color: #868c91;
    margin-right: 10px;
}
.vehicle-list{
    width: 100%;
    min-height: 600px;
    margin: 0 auto;
    text-align: left;
    margin-top: 10px;
    overflow-x: auto;
}
.vehicle-list li div.title{
    font-size: 14px;
    color: #474747;
    position: relative;
    height: 48px;
    line-height: 48px;
    
}
.el-submenu__icon-arrow{
    right: 0px;
}
.vehilce-list-item{
    position: relative;
    height: auto;
    line-height: 32px;
    font-size: 12px;
    color: #474747;
    padding-left: 46px;
}
.icon-driver{
    font-size:12px;
}
.icon-user{
    position: absolute;
    right: 5%;
    top:0;
    color: #767676;
    font-size: 12px;
}
.icon-chosen{
    margin-right: 10px;
}
.icon-user:before{
    margin-right: 6px;
}
.vehile-item-list li{
    position: relative;
    color: #5a5a5a
}
.item-time{
    position: absolute;
    right: 5%;
    top: 0;
    font-style: normal;
}
.vehile-item-title{
    color: #474747;
    position: relative;
}
.title{
    cursor: pointer;
    padding: 0 5%;
}
.vehicle-list ul.vehicle-list-items{
    display: none;
}
.vehicle-list ul.active{
    display: block;
    background-color:#fbfbfb;
}
.yc-is-opened{
    background-color: #fff;
}
.yc-is-opened i.el-submenu__icon-arrow{
    transform: rotate(180deg);
}
.el-icon-arrow-down{
    transition: transform .3s;
    right: 5%;
}

.yc-active-list-items{
    background-color: #fff;
}
.vehile-item-list{
    display: none;
    cursor: pointer;
}
.vehile-item-list-isopened{
    display: block;
}
.vehile-item-title{
    cursor: pointer;
}
</style>