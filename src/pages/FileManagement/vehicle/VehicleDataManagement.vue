<template>
    <!-- 车辆资料管理-->
    <div>
        <el-scrollbar style='height:100%;' class='yc-scrollbar'>
            <el-container class="mian">
                <el-main>
                    <article class='vd-management-left'>
                        <header>
                            <template v-if="companyImage">
                                <img :src="{ companyImage }" alt=''>
                            </template>
                            <template v-else>
                                <span class="placeholder-img"></span>
                            </template>
                            <div class="introduction">
                                <h2>{{ companyName }}</h2>
                                <span>今天是{{ time }}，BYTE AI平台已经为您服务了{{ day }}天</span>
                                <div>公司简介：{{ introductionMessage }}}</div>
                                <i @click="MessageEdit">编辑<i class="el-icon-edit-outline"></i></i>
                            </div>
                        </header>
                        <main>
                            <div>
                                <ul>
                                    <li>
                                        <p><i></i>车辆总数 <span>{{ Sum }}</span></p>
                                    </li>
                                    <li>
                                        <p><i></i>在线车辆 <span>{{ Online }}</span></p>
                                    </li>
                                    <li>
                                        <p><i></i>入网车辆 <span>{{ NetworkAccess }}</span></p>
                                    </li>
                                    <li>
                                        <p><i></i>在线率 <span>{{ OnlineRate }}</span></p>
                                    </li>
                                    <li>
                                        <p><i></i>入网率 <span>{{ NetworkAccessRate }}</span></p>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li><i></i>车队 <span>{{ Fleet }}</span></li>
                                    <li><i></i>终端机 <span>{{ Terminal }}</span></li>
                                    <li><i></i>SIM卡 <span>{{ SIM }}</span></li>
                                </ul>
                            </div>
                        </main>
                        <footer>
                            <p>建议/提示</p>
                            <ul>
                                <template v-for='(item,i) in NetworkInformation'>
                                    <li><i v-if='i === 0'>顶</i>{{ item.text }} — {{ item.time }}</li>
                                </template>
                            </ul>
                            <ul>
                                <template v-for='(item,i) in VehicleInformation'>
                                    <li v-if='i>0'>{{ item.text }} <el-button @click='toVehiclList'>补充信息</el-button></li>
                                </template>
                            </ul>
                            <ul>
                                <template v-for='(item,i) in SIMInformation'>
                                    <li v-if='i>0'>{{ item.text }} <el-button @click='toSIMList'>订正信息</el-button></li>
                                </template>
                            </ul>
                            <ul>
                                <template v-for='(item,i) in TerminalInformation'>
                                    <li v-if='i>0'>{{ item.text }} <el-button @click='toTerminalList'>订正信息</el-button></li>
                                </template>
                            </ul>
                        </footer>
                    </article>
                    <article class="vd-management-right">
                        <header>
                            <ul>
                                <li><el-button>添加车辆</el-button></li>
                                <li><el-button>证件过期提醒</el-button></li>
                                <li><el-button>待升级终端机</el-button></li>
                            </ul>
                        </header>
                        <main>
                            <h2>操作记录</h2>
                            <ul>
                                <template v-for="item in logList">
                                    <li><i></i><span>item.text</span><p>itme.time</p></li>
                                </template>
                                <li></li>
                            </ul>
                            <el-button>查看更多</el-button>>
                        </main>
                    </article>
                </el-main>
            </el-container>
        </el-scrollbar>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                NetworkInformation:[],//交通部通知
                VehicleInformation:[],//车辆新增消息通知
                SIMInformation:[],//SIM卡信息通知
                TerminalInformation:[],//终端机信息通知
                logList:[],//操作日志列表
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
.mian{
    padding: 20px;
    .vd-management-left{
        width: calc(100% - 220px);
        float: left;
        margin-right: 20px;
    }
}
</style>
