<template>
    <div>
        <el-row type="flex" class="uc-header-copy">
            <el-col :span="24">
                <div class="breadcrumb">
                    <span class="yc-brc-title">您当前位置：</span>
                    <breadcrumb></breadcrumb>
                </div>
            </el-col>
            <el-col :span="12" :offset="12">
                <div class="yc-header-main">
                    <span class="yc-select-mian" @mouseover="showSelect" @mouseout="blur">
                        <transition name="fade"   mode="out-in">
                            <el-input 
                            v-if="selectShow" 
                            v-model="input" 
                            placeholder="请输入内容" 
                            size="mini" 
                            class="yc-select-sy"
                            >
                            </el-input>
                            <i v-else class="el-icon-search" ></i>
                         </transition>
                    </span>

                    <!-- <el-dropdown class="yc-layout-mt yc-dropdown">
                        <span class="el-dropdown-link ">
                            <i class="el-icon-message"><i class="yc-mesg-red"></i></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                       
                    </el-dropdown> -->

                    <el-dropdown class="yc-layout-mt">
                        <span class="el-dropdown-link">
                            YINCAA<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><router-link to="/login">退出</router-link></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    export default {
        components:{
            Breadcrumb
        },
        data(){
            return {
                selectShow:false,
                input:''
            }
        },
        methods:{
            showSelect(){
                this.selectShow = true
            },
            blur(){
                this.selectShow = false
            }
        }
    }
</script>

<style scoped>
.yc-header-main{
    position: absolute;
    right: 20px;
}
.yc-header-copy{
    width: 100%;
    height: 64px;
	opacity: 0.85;
	background-color: #ffffff;
}
.el-icon-search,.el-icon-message{
    color: #a4a4a4;
    font-size: 14px;
    margin-top: 24px;
    margin-right: 22px;
}
.el-icon-message{
    margin-top: 0;
}
.el-dropdown{
    margin-top: 23px;
    font-size: 12px;
    font-family: PingFangSC;
	font-size: 12px;
	letter-spacing: -0.1px;
	text-align: center;
	color: #7c8889;
}
.yc-mesg-red{
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: red;
    position:absolute;
    right: -1px;
    top: -1px;
}
.yc-layout-mt,.breadcrumb{
    margin-top: 24px;
}
.breadcrumb{
    margin-left: 15px;
}
.yc-dropdown{
    width: 17px;
    display: inline-block;
    margin-right: 22px;
}
.yc-select-sy{
    width: 144px;
    height: 30px;
    margin-right: 22px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.yc-brc-title{
    float: left;
    font-size: 12px;
}
.breadcrumb-item.el-breadcrumb{
    font-size: 12px;
}
</style>