<template>
    <div class="vehicle-menu">
       <div class="vehicle-list">
           <ul>
               <template v-for="(vehicleL,i) in vehicleList">
                   <li class="yc-vehicle-list-items" :class="{'yc-active-list-items':i === ind}">
                       <div class="title" @click.stop="showFun($event,i,vehicleL.teamId)" :key="i" :class="{'yc-is-opened':i === ind}">
                           <i class="icon-chosen iconfont yc-icon-jiegou"></i>
                           {{ vehicleL.teamName }}({{ vehicleL.onLineCount }}/{{ vehicleL.vehicleCount }})
                           <i class="el-submenu__icon-arrow el-icon-arrow-down"></i>
                        </div>
                       <ul :class="{'active':i === ind}" class="vehicle-list-items">
                           <template v-for="(chr,ind) in vehicleL.vehicleList">
                                <li class="vehilce-list-item" :class="{'activeli':inlist === ind}">
                                    <div class="vehile-item-title" @click.stop="itemOpened($event,ind,chr.vehicleId,vehicleL.teamId)" >
                                        <i :class="chr.isOnline?'online':'offline'"></i>
                                        {{ chr.vehicleCode }}
                                        <i class="icon-user iconfont yc-icon-yonghu">{{ chr.deriverSum }}</i>
                                    </div>
                                    <ul class="vehile-item-list" :class="{'vehile-item-list-isopened':ind === itemEnd}">
                                        <template v-for="chrls in chr.driverList">
                                            <li>
                                                {{ chrls.driverName }}
                                                <i class="item-time">{{ chrls.workDate }}</i>
                                            </li>
                                        </template>
                                    </ul>
                                </li>
                           </template>
                       </ul>
                   </li>
               </template>
           </ul>
       </div>
    </div>
</template>

<script>
    export default {
        props:['vehicleList','ind','itemEnd'],
        data(){
            return {
                vehiclelmenu:false,
                active:'active',
            }
        },
        methods: {
            showFun(e,i,tm){
                // if(this.ind === i+1+''){
                //     this.ind = ''
                // }else{
                //     this.ind =i+1+'' ;
                // }  
                this.$emit('showFun',{i:i,e:e,tm:tm});
            },
            itemOpened(e,i,di,tm){
                // if(this.itemEnd === i+1+''){
                //     this.itemEnd = ''
                // }else{
                //     this.itemEnd =i+1+'' ;
                // }  
                this.inlist = i;
                this.$emit('itemOpened',{e:e,i:i,di:di,tm:tm})
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
.activeli{
    background-color:#f5f5f5; 
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
    background-color:#fff;
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