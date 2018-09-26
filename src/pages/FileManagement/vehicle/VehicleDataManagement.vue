<template>
    <!-- 车辆资料管理-->
    <div>
        <el-scrollbar style='height:100%;' class='yc-scrollbar'>
            <el-container class="mian">
                <el-main class="vd-management">
                    <div class='vd-management-left'>
                        <header class="vd-management-header card">
                            <template v-if="companyImage">
                                <img class="placeholder-img" :src="{ companyImage }" alt=''>
                            </template>
                            <template v-else>
                                <span class="placeholder-img"></span>
                            </template>
                            <div class="introduction relative" style="line-height: 30px;">
                                <div style="display: flex;margin-bottom: 30px;">
                                    <h2 style="font-size: 24px; font-weight: blod;">{{ companyName }}</h2>
                                    <div style="text-align: right; flex: auto;" class="f12">今天是{{ time }}，BYTE AI平台已经为您服务了<span class="color-green">{{ day || 300 }}</span>天</div>
                                </div>
                                <div class="f12">公司简介：{{ introductionMessage }}</div>
                                <i class="f12" style="position: absolute; right: 0; margin-top: -10px; color: #aaa; font-style: inherit;" @click="MessageEdit">编辑<i class="el-icon-edit-outline"></i></i>
                            </div>
                        </header>
                        <div class="card">
                            <ul class="vd-management-indicator">
                                <li>
                                    <p><i></i>车辆总数 <span>{{ Sum }}</span></p>
                                </li>
                                <li>
                                    <p><i></i>在线车辆 <span>{{ Online }}</span></p>
                                </li>
                                <li>
                                    <p><i></i>车队 <span>{{ NetworkAccess }}</span></p>
                                </li>
                                <li>
                                    <p><i></i>在线率 <span>{{ OnlineRate }}</span></p>
                                </li>
                                <li>
                                    <p><i></i>入网率 <span>{{ NetworkAccessRate }}</span></p>
                                </li>
                                <li>
                                    <p><i></i>车队 <span>{{ NetworkAccessRate }}</span></p>
                                </li>
                                <li>
                                    <p><i></i>终端机 <span>{{ NetworkAccessRate }}</span></p>
                                </li>
                                <li>
                                    <p><i></i>SIM卡 <span>{{ NetworkAccessRate }}</span></p>
                                </li>
                            </ul>
                        </div>
                        <div class="card">
                            <p class="f14">建议/提示</p>
                            <div class="vd-management-msg">
                                <div class="vd-management-msg-item" v-for="(item, idx) in manageMsg" :key="idx">
                                    <div class="vd-management-msg-item-text f12">{{ item.text }}</div>
                                    <div class="vd-management-msg-item-btn">
                                       <el-button size="small">前往查看</el-button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="vd-management-right">
                        <ul class="vd-management-toolbar">
                            <li><el-button>添加车辆</el-button></li>
                            <li><el-button>证件过期提醒</el-button></li>
                            <li><el-button>待升级终端机</el-button></li>
                        </ul>

                        <!-- 操作记录 -->
                        <div class="vd-management-record card">
                            <p class="f14 margin-b">操作记录</p>
                            <ul>
                                <li class="vd-management-record-item" v-for="(item, idx) in logList" :key="idx">
                                    <i></i>
                                    <div class="f12">{{item.text}}</div>
                                    <p class="f10 color-grey">{{item.time}}</p>
                                </li>
                            </ul>
                            <div class="vd-management-record-more" >查看更多</div>
                        </div>

                    </div>
                </el-main>
            </el-container>
        </el-scrollbar>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                manageMsg:[
                    {text: ' 广东省交通运输厅关于启用广东省运政', type: 1},
                    {text: ' 广东省交通运输厅关于启用广东省运政', type: 1},
                    {text: ' 广东省交通运输厅关于启用广东省运政', type: 1},
                    {text: ' 广东省交通运输厅关于启用广东省运政', type: 1}
                ],
                logList:[
                    {text: '测试操作', time: '2018-09-24'}
                ],//操作日志列表
                companyName:'SUPRA速派联合速递',//公司名称
                time:'2018-08-03 星期五',//平台显示当前时间
                introductionMessage:'SUPRA速派联合速递，隶属于XXX科技有限公司旗下品牌，以互联网+、大数据为依托，专注于即时专人直送，为用户提供7×24小时，平均1分钟响应、10分钟上门、同城1小时速递服务。',//公司简介
                Sum:'60',//车辆总数
                Online:'45',//在线车辆数
                NetworkAccess:'54',//入网车辆总数
                OnlineRate:'75%',//在线率
                NetworkAccessRate:'86.7%',//入网率
                Fleet:'5',//车队数量
                Terminal:'60',//终端机总数
                SMI:'41',//SIM卡总数
                companyImage:"",//公司logo图片
            }
        },
        methods:{

        }
    }
</script>

<style lang="less" scoped>
.vd-management{
    padding: 20px;
    display: flex;
    .vd-management-left{
        flex: auto;
        margin-right: 20px;
    }
    .vd-management-right{
        width: 220px;
        flex: none;
    }
}

.vd-management{
    &-header{
        display: flex;
        height: 140px;
        .placeholder-img{
            width: 140px;
            height: 140px;
            flex: none;
            margin-right: 20px;
        }
    }
    &-indicator{
        display: flex;
        flex-wrap: wrap;
        > li {
            width: 25%;
            flex: auto;
            line-height: 80px;
            font-size: 14px;
        }
    }

    &-msg{
        .vd-management-msg-item{
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
        }
        .vd-management-msg-item:last-child{
            border-bottom: 0;
        }
    }

    &-toolbar{
        height: 160px;
        margin-bottom: 20px;
        > li {
            margin-bottom: 15px;
            > .el-button{
                width: 100%;
                padding: 14px 20px;
                border-radius: 8px;
                &:focus{
                    color: #606266;
                    background-color: #fff;
                }
                &:hover{
                    background-color: #243E94;
                    color: #fff;
                }
            }
        }
    }

    &-record{
        &-item{
            margin-bottom: 20px;
        }
        &-more{
            width: 100%;
            line-height: 40px;
            text-decoration: underline;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
            &:hover{
                background-color: #ccc;
            }
        }
    }
}

.vd-management-msg-item{
    display: flex;
    align-items: center;
    &-text{
        flex: auto;
    }
    &-btn{
        flex: none;
        width: 100px;
        .el-button{
            width: 100%;
        }
    }
}

</style>
