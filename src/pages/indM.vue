<template>
  <div class="main">
    <main class="mainbg">
      <article class="demmap">
        <section class="demo-map">
          <!-- <div class="demo-map-onlien">在线</div> -->
          <div class="number">
            {{ companyName }}
            <!-- <div class="wrapper">
                        <div class="letters">
                            <span class="letter">1</span>
                            <span class="emjd">,</span>
                            <span class="letter">5</span>
                            <span class="letter">0</span
                            <span class="letter">2</span>
                            <span class="emjd">,</span>
                            <span class="letter">3</span>
                            <span class="letter">9</span>
                            <span class="letter">7</span>
                        </div>
                    </div> -->
          </div>
          <div class="mycharts">
            <div id="myCharts" :style="{width: '100%', height: '500px'}" style=""></div>
          </div>
        </section>

      </article>
      <article class="democontent">
        <section class="demo-early">
          <div class="top">
            <span class="more"></span>
            <h2>综合预警统计（{{ statisticsTime }}）</h2>
            <div class="toplengs">
              <span>车辆预警</span>
              <span style="border-color:transparent transparent #1ea4b6;">驾驶员预警</span>
            </div>
            <ul>
              <li v-for="item in earlyWList">
                <el-tooltip placement="top">
                  <div slot="content">预警时间：{{ item.alarmDate }}<br/>车辆预警：{{ item.driverCount }}</div>
                  <span class="listD" :style="{height:(item.driverCount/arrMaxInNumber*50)+'px'}"></span>
                </el-tooltip>
                <el-tooltip placement="top">
                  <div slot="content">预警时间：{{ item.alarmDate }}<br/>驾驶员预警：{{ item.vehicleCount }}</div>
                  <span class="listv" :style="{height:(item.vehicleCount/arrMaxInNumber*50)+'px'}"></span>
                </el-tooltip>
              </li>

            </ul>
          </div>
          <div class="bottom">
            <span class="more1"></span>
            <span class="more2"></span>
            <h2>企业管理运营评分（2018.8）</h2>
            <ul>
              <li>
                <span>入网率 - 84</span>
                <div class="imgs">
                  <i></i>
                </div>
              </li>
              <li>
                <span>在线率 - 95</span>
                <div class="imgs">
                  <i></i>
                </div>
              </li>
              <li>
                <span>处理率 - 98</span>
                <div class="imgs">
                  <i></i>
                </div>
              </li>
            </ul>
            <div class="numbers">
              <span></span>
              <i>95</i>
            </div>
            <ul class="right" style="float:right;margin-left:0px;clear:none;margin-right:20px;">
              <li>
                <div class="imgs" style="margin-left:0px;margin-right:10px;">
                  <i style="margin:4px;background-image: linear-gradient(-90deg, #FFA032 0%, rgba(255,160,50,0.10) 100%);"></i>
                </div>
                <span>安全驾驶 - 84</span>
              </li>
              <li>
                <div class="imgs" style="margin-left:0px;margin-right:10px;">
                  <i style="margin:4px;background-image: linear-gradient(-90deg, #FFA032 0%, rgba(255,160,50,0.10) 100%);"></i>
                </div>
                <span>平台安全 - 84</span>
              </li>
              <li>
                <div class="imgs" style="margin-left:0px;margin-right:10px;">
                  <i style="margin:4px;background-image: linear-gradient(-90deg, #FFA032 0%, rgba(255,160,50,0.10) 100%);"></i>
                </div>
                <span>防控性能 - 84</span>
              </li>
            </ul>
          </div>
        </section>
        <section class="demo-echarts">
          <h2>预警分类（2018.08）</h2>
          <span class="more"></span>
          <div id="myChart" class="myChart" :style="stylewh" style="margin-top:50px;margin-left:20px;"></div>
        </section>
        <section class="demo-message">
          <div class="news">
            <span class="more"></span>
            <h2>最新报警信息</h2>
            <div class="new-list">
              <el-scrollbar style="height:100%;" class="yc-scrollbar">
                <ul class="messageNew">
                  <li v-for="(item,i) in messages">
                    {{ formData(item.alarmTime) }} 在{{ item.locationDesc === " " ? "未知地点" : item.locationDesc }}发生{{ item.pId === 65 ? "驾驶员预警" : "车辆预警" }}{{ item.atypeName }}。
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </div>
          <div class="logos" @click="routoIndex">
            <img src="../assets/byte-ai.png" alt="">
          </div>
        </section>
      </article>
    </main>
  </div>
</template>
       
<script>
import axios from 'axios';
import data from '../../static/js/lines-bus';
import 'echarts/map/js/china.js';
import bmap from 'vue-baidu-map';
import echarts from 'echarts';
import '../assets/mainImages/bgpic.png';
import '../assets/mainImages/lines.png';
import '../assets/map-jpg.png';
import '../assets/mainImages/vdbg.png';
import '../assets/echarsL.png';
import '../assets/2.png';
import {
    getDomeVertical,
    getLatestAlarms,
    alarmTypeDayCount,

} from '../api/getData';
import {
    getDay,
    getWeek,
    getLocation,
    showPosition,
    getCascaderObj,
} from '../../static/js/data';
import '../../static/js/bmap.min';
import {formatDate,thirtyDays} from '../../static/js/data'
export default {
    data() {
        return {
            statisticsTime:'',//统计时间
            intervalId: 0,
            dvecharts: {},
            ddData: [],
            vdData: [],
            legendName: [],
            usersname: '',
            companyCode: '', //公司名字
            companyName: '',
            day: '',
            stylewh: {
                width: 'calc(100% - 20px)',
                height: '400px',
            },
            arrMaxInNumber: 0, //报警最大数
            earlyWList: [],
            messages: [
                {
                    text: '16:34  粤A0L248在中山大学南校区发生-抽烟-驾驶员预警',
                },
                {
                    text: '16:22  粤AM491在荔湾文化中心发生-打电话-驾驶员预警',
                },
                {
                    text: '16:22  粤AM491在荔湾文化中心发生-打电话-驾驶员预警',
                },
                {
                    text: '16:01  粤A5Q492在新大新百货发生-左顾右盼-驾驶员预警',
                },
            ],
        };
    },
    created() {
        this.intervalId = setInterval(() => {
            this.getLatestAlarms();
        }, 5000);
    },
    mounted() {
        this.messageNew();
        this.getData();
        this.getCookie();
        this.getMapData();
        //图表查询默认时间（按照30天查询）
        this.endData = thirtyDays().t1 + ' 23:23:59';
        this.starData = thirtyDays().t2 + ' 00:00:00';
        this.statisticsTime = thirtyDays().t1
        this.alarmTypeDayCount({
            companyId: this.companyCode,
            startDate: this.starData,
            endDate: this.endData,
        });
        this.getDomeVerticals({
            companyId: this.companyCode,
            startDate: this.starData,
            endDate: this.endData,
        });
        // this.drawLine();
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    },
    methods: {
        
         //时间戳转换
        formData(dataTime){
            let dataT = new Date(dataTime)
            return formatDate(dataT,'yyyy-MM-dd hh:mm')
        },
        getData() {
            let now = new Date();
            this.day = now.getDate();
        },
        //读取cookie
        getCookie: function() {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == 'companyId') {
                        this.companyCode = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] == 'companyName') {
                        this.companyName = arr2[1];
                    }
                }
            }
        },
        routoIndex() {
            let routeData = this.$router.resolve({path: 'ComprenensiveD'});
            window.open(routeData.href, '_blank');
            // ;
        },
        messageNew() {
            let ul = document.getElementsByClassName('messageNew').childNodes;
        },
        getMapData() {
            let myCharts = echarts.init(document.getElementById('myCharts'));
            $.get('../../static/js/lines-bus.json', function(data) {
                var hStep = 300 / (data.length - 1);
                var busLines = [].concat.apply(
                    [],
                    data.map(function(busLine, idx) {
                        var prevPt;
                        var points = [];
                        for (var i = 0; i < busLine.length; i += 2) {
                            var pt = [busLine[i], busLine[i + 1]];
                            if (i > 0) {
                                pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]];
                            }
                            prevPt = pt;

                            points.push([pt[0] / 1e4, pt[1] / 1e4]);
                        }
                        return {
                            coords: points,
                            lineStyle: {
                                normal: {
                                    color: echarts.color.modifyHSL(
                                        '#5A94DF',
                                        Math.round(hStep * idx)
                                    ),
                                },
                            },
                        };
                    })
                );
                myCharts.setOption({
                    animation: true,
                    bmap: {
                        center: [116.46, 39.92],
                        zoom: 12,
                        roam: true,
                        mapStyle: {
                            styleJson: [
                                {
                                    featureType: 'water',
                                    elementType: 'all',
                                    stylers: {
                                        color: '#031628',
                                    },
                                },
                                {
                                    featureType: 'land',
                                    elementType: 'geometry',
                                    stylers: {
                                        color: '#000102',
                                    },
                                },
                                {
                                    featureType: 'highway',
                                    elementType: 'all',
                                    stylers: {
                                        visibility: 'off',
                                    },
                                },
                                {
                                    featureType: 'arterial',
                                    elementType: 'geometry.fill',
                                    stylers: {
                                        color: '#000000',
                                    },
                                },
                                {
                                    featureType: 'arterial',
                                    elementType: 'geometry.stroke',
                                    stylers: {
                                        color: '#0b3d51',
                                    },
                                },
                                {
                                    featureType: 'local',
                                    elementType: 'geometry',
                                    stylers: {
                                        color: '#000000',
                                    },
                                },
                                {
                                    featureType: 'railway',
                                    elementType: 'geometry.fill',
                                    stylers: {
                                        color: '#000000',
                                    },
                                },
                                {
                                    featureType: 'railway',
                                    elementType: 'geometry.stroke',
                                    stylers: {
                                        color: '#08304b',
                                    },
                                },
                                {
                                    featureType: 'subway',
                                    elementType: 'geometry',
                                    stylers: {
                                        lightness: -70,
                                    },
                                },
                                {
                                    featureType: 'building',
                                    elementType: 'geometry.fill',
                                    stylers: {
                                        color: '#000000',
                                    },
                                },
                                {
                                    featureType: 'all',
                                    elementType: 'labels.text.fill',
                                    stylers: {
                                        color: '#857f7f',
                                    },
                                },
                                {
                                    featureType: 'all',
                                    elementType: 'labels.text.stroke',
                                    stylers: {
                                        color: '#000000',
                                    },
                                },
                                {
                                    featureType: 'building',
                                    elementType: 'geometry',
                                    stylers: {
                                        color: '#022338',
                                    },
                                },
                                {
                                    featureType: 'green',
                                    elementType: 'geometry',
                                    stylers: {
                                        color: '#062032',
                                    },
                                },
                                {
                                    featureType: 'boundary',
                                    elementType: 'all',
                                    stylers: {
                                        color: '#465b6c',
                                    },
                                },
                                {
                                    featureType: 'manmade',
                                    elementType: 'all',
                                    stylers: {
                                        color: '#022338',
                                    },
                                },
                                {
                                    featureType: 'label',
                                    elementType: 'all',
                                    stylers: {
                                        visibility: 'off',
                                    },
                                },
                            ],
                        },
                    },
                    series: [
                        {
                            type: 'lines',
                            coordinateSystem: 'bmap',
                            polyline: true,
                            data: busLines,
                            silent: true,
                            lineStyle: {
                                normal: {
                                    // color: '#c23531',
                                    // color: 'rgb(200, 35, 45)',
                                    opacity: 0.1,
                                    width: 1,
                                },
                            },
                            progressiveThreshold: 500,
                            progressive: 200,
                        },
                        {
                            type: 'lines',
                            coordinateSystem: 'bmap',
                            polyline: true,
                            data: busLines,
                            lineStyle: {
                                normal: {
                                    width: 0,
                                },
                            },
                            effect: {
                                constantSpeed: 20,
                                show: true,
                                trailLength: 0.1,
                                symbolSize: 1.5,
                            },
                            zlevel: 1,
                        },
                    ],
                });
            });
        },
        scroll() {
            // this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
            // setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
            //         this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
            //         this.items.shift();               //删除数组的第一个元素
            //         this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
            // },500)
        },
        async getDomeVerticals(param) {
            let response = await getDomeVertical(param);
            let res = response.data;
            if (res.code == 0) {
                let name = [];
                let datas = [];
                res.data.alarmTypeDriverCount.forEach(element => {
                    name.push(element.aTypeName);
                    this.ddData.push(element.aTypeCount);
                });
                res.data.alarmTypeVehicleCount.forEach(element => {
                    name.push(element.aTypeName);
                    this.vdData.push(element.aTypeCount);
                });
                this.legendName = name;
                let myChart = this.$echarts.init(
                    document.getElementById('myChart')
                );
                let _self = this;
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c}次 ({d}%)',
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        itemGap: 20,
                        data: _self.legendName,
                        // data:["前车碰撞报警","车道偏离报警","车距过近报警","驻车滑行","疲劳驾驶报警","接打电话报警","抽烟报警","分神驾驶报警","驾驶员异常报警","左顾右盼","未系安全带"],
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    // color:['#6B8FC9', '#2778A6','#DCBB4B','#E43D3D','#BF1F6F','#9A4DAD','#5445BB','#C65455','#18BCC3;','#4BB46C','#D06F33','#bf1f6f','#5445bb','#2778a6'],
                    series: [
                        {
                            name: '车辆预警',
                            type: 'pie',
                            radius: [0, '30%'],
                            center: ['60%', '45%'],
                            label: {
                                normal: {
                                    position: 'inner',
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: false,
                                },
                            },
                            // data:dd
                            data: [
                                {
                                    value: _self.vdData[0],
                                    name: '前车碰撞报警',
                                    itemStyle: {color: '#4bb46c'},
                                },
                                {
                                    value: _self.vdData[1],
                                    name: '车道偏离报警',
                                    itemStyle: {color: '#d06f33'},
                                },
                                {
                                    value: _self.vdData[2],
                                    name: '车距过近报警',
                                    itemStyle: {color: '#18bcc3'},
                                },
                                {
                                    value: _self.vdData[3],
                                    name: '驻车滑行',
                                    itemStyle: {color: '#c65455'},
                                },
                            ],
                        },
                        {
                            name: '驾驶员预警',
                            type: 'pie',
                            radius: ['40%', '66%'],
                            center: ['60%', '45%'],
                            label: {
                                normal: {
                                    show: false,
                                },
                            },
                            // data:vd
                            data: [
                                {
                                    value: _self.ddData[0],
                                    name: '疲劳驾驶报警',
                                    itemStyle: {color: '#dcbb4b'},
                                },
                                {
                                    value: _self.ddData[1],
                                    name: '接打电话报警',
                                    itemStyle: {color: '#6b8fc9'},
                                },
                                {
                                    value: _self.ddData[2],
                                    name: '抽烟报警',
                                    itemStyle: {color: '#2778a6'},
                                },
                                {
                                    value: _self.ddData[3],
                                    name: '分神驾驶报警',
                                    itemStyle: {color: '#5445bb'},
                                },
                                {
                                    value: _self.ddData[4],
                                    name: '驾驶员异常报警',
                                    itemStyle: {color: '#9a4dad'},
                                },
                                {
                                    value: _self.ddData[5],
                                    name: '左顾右盼',
                                    itemStyle: {color: '#e43d3d'},
                                },
                                {
                                    value: _self.ddData[6],
                                    name: '未系安全带',
                                    itemStyle: {color: '#bf1f6f'},
                                },
                            ],
                            //  data:[]
                        },
                    ],
                });
            }
        },
        //获取最新报警列表
        async getLatestAlarms(param) {
            let response = await getLatestAlarms(param);
            let res = response.data;

            if (res.code == 0) {
                if (res.data) {
                    this.messages = res.data;
                }
            }
        },
        //获取30天报警数据统计
        async alarmTypeDayCount(param) {
            let response = await alarmTypeDayCount(param);
            let res = response.data;
            if (res.code == 0) {
                this.earlyWList = res.data.alarmTypeDayCount;
                let arr = [];
                res.data.alarmTypeDayCount.forEach(ele => {
                    arr.push(ele.vehicleCount);
                });
                res.data.alarmTypeDayCount.forEach(ele => {
                    arr.push(ele.driverCount);
                });

                this.arrMaxInNumber = Math.max.apply(Math, arr);
                console.log(this.arrMaxInNumber);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.main {
    min-width: 1440px;
    padding: 20px;
    height: 1024px;
    background-image: url('../assets/mainImages/bgpic.png');
    background-size: 100% 100%;

    .mainbg {
        width: 100%;
        min-width: 1368px;

        height: 100%;
        background: url('../assets/mainImages/lines.png') no-repeat;
        background-size: 100% 100%;
        .demmap {
            height: 540px;
        }
        .bg {
            width: 53%;
            min-width: 773px;
            height: 14px;
            top: 62px;
            right: 78px;
            position: absolute;
            background: url('../assets/mainImages/maptopbg.png');
        }
        .demo-map {
            float: left;
            width: calc(100% - 38px);
            height: 500px;
            margin-left: 39px;
            margin-top: 40px;
            background-image: url('../assets/map-jpg.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: relative;
            overflow: hidden;
        }
        .mycharts {
            width: calc(100% - 64px);
            height: 444px;
            margin-left: 26px;
            margin-top: 28px;
            border-radius: 20px;
            overflow: hidden;
        }
        .number {
            position: absolute;
            top: 10px;
            left: 10px;
            background: url('../assets/mainImages/vdbg.png');
            width: 40%;
            height: 127px;
            background-size: 100% 100%;
            z-index: 2;
            font-size: 36px;
            color: #1d798c;
            text-align: center;
            line-height: 127px;
        }
        .democontent {
            display: block;
            // min-width: 688px;
            width: 100%;
            min-width: 1406px;
            height: 154px;
            margin-top: 20px;
            margin-right: auto;
            margin-left: auto;
            background-size: 100% 100%;
            .demo-early {
                float: left;
                min-width: 696px;
                width: 49.5%;
                margin-left: 3.05%;
                .top {
                    min-width: 696px;
                    height: 190px;
                    background: url('../assets/echarsL.png') no-repeat;
                    background-size: 100% 100%;
                    position: relative;
                    .more {
                        position: absolute;
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        right: 5px;
                        top: 12px;
                        background-image: url('../assets/2.png');
                        background-size: 100% 100%;
                        -webkit-animation-name: scaleDraw; /*关键帧名称*/
                        -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
                        -webkit-animation-iteration-count: infinite; /*动画播放的次数*/
                        -webkit-animation-duration: 5s; /*动画所花费的时间*/
                    }
                    @keyframes scaleDraw {
                        /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
                        0% {
                            transform: scale(1); /*开始为原始大小*/
                        }
                        25% {
                            transform: scale(1.1); /*放大1.1倍*/
                        }
                        50% {
                            transform: scale(1);
                        }
                        75% {
                            transform: scale(1.1);
                        }
                    }
                    h2 {
                        float: left;
                        font-size: 16px;
                        color: #288b9f;
                        margin-top: 15px;
                        margin-left: 20px;
                    }
                    .toplengs {
                        float: right;
                        margin-right: 20px;
                        margin-top: 20px;
                        span {
                            display: inline-block;
                            text-align: center;
                            width: 80px;
                            height: 0px;
                            color: #fff;
                            font-size: 14px;
                            border-width: 0 16px 20px 16px;
                            border-style: none solid solid;
                            border-color: transparent transparent #d35841;
                        }
                    }
                    ul {
                        clear: both;
                        float: left;
                        margin-left: 20px;
                        margin-top: 10px;
                        min-width: 645px;
                        width: 100%;
                    }
                    ul > li {
                        width: 0.93%;
                        height: 100px;
                        background: rgb(38, 86, 102);
                        position: relative;
                        float: left;
                        margin-right: 2.32%;
                        overflow: hidden;
                        ul.right {
                            float: right;
                        }
                        .listD:hover {
                            cursor: pointer;
                            background-color: #f3a090;
                        }
                        .listv:hover {
                            cursor: pointer;
                            background-color: #9beffb;
                        }
                    }
                    ul > li:nth-child(1) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 48px;
                            background: #d35841;
                            animation: logs1 3s;
                        }
                        @keyframes logs1 {
                            0% {
                                top: -48px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 22px;
                            background-color: rgb(30, 164, 182);
                            animation: log1 3s;
                        }
                        @keyframes log1 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 22px;
                            }
                        }
                    }
                    ul > li:nth-child(2) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 30px;
                            background: #d35841;
                            animation: logs2 3s;
                        }
                        @keyframes logs2 {
                            0% {
                                top: -30px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 19px;
                            background-color: rgb(30, 164, 182);
                            animation: log2 3s;
                        }
                        @keyframes log2 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 19px;
                            }
                        }
                    }
                    ul > li:nth-child(3) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 31px;
                            background: #d35841;
                            animation: logs3 3s;
                        }
                        @keyframes logs3 {
                            0% {
                                top: -31px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 41px;
                            background-color: rgb(30, 164, 182);
                            animation: log3 3s;
                        }
                        @keyframes log3 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 41px;
                            }
                        }
                    }
                    ul > li:nth-child(4) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 30px;
                            background: #d35841;
                            animation: logs4 3s;
                        }
                        @keyframes logs4 {
                            0% {
                                top: -30px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 20px;
                            background-color: rgb(30, 164, 182);
                            animation: log5 3s;
                        }
                        @keyframes log5 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 20px;
                            }
                        }
                    }
                    ul > li:nth-child(5) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 35px;
                            background: #d35841;
                            animation: logs6 3s;
                        }
                        @keyframes logs6 {
                            0% {
                                top: -35px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 12px;
                            background-color: rgb(30, 164, 182);
                            animation: log7 3s;
                        }
                        @keyframes log7 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 12px;
                            }
                        }
                    }
                    ul > li:nth-child(6) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 11px;
                            background: #d35841;
                            animation: logs8 3s;
                        }
                        @keyframes logs8 {
                            0% {
                                top: -11px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 32px;
                            background-color: rgb(30, 164, 182);
                            animation: log9 3s;
                        }
                        @keyframes log9 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 32px;
                            }
                        }
                    }
                    ul > li:nth-child(7) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 30px;
                            background: #d35841;
                            animation: logs10 3s;
                        }
                        @keyframes logs10 {
                            0% {
                                top: -30px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 50px;
                            background-color: rgb(30, 164, 182);
                            animation: log10 3s;
                        }
                        @keyframes log10 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 50px;
                            }
                        }
                    }
                    ul > li:nth-child(8) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 15px;
                            background: #d35841;
                            animation: logs11 3s;
                        }
                        @keyframes logs11 {
                            0% {
                                top: -15px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 50px;
                            background-color: rgb(30, 164, 182);
                            animation: log11 3s;
                        }
                        @keyframes log11 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 50px;
                            }
                        }
                    }
                    ul > li:nth-child(9) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 43px;
                            background: #d35841;
                            animation: logs12 3s;
                        }
                        @keyframes logs12 {
                            0% {
                                top: -43px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 19px;
                            background-color: rgb(30, 164, 182);
                            animation: log12 3s;
                        }
                        @keyframes log12 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 19px;
                            }
                        }
                    }
                    ul > li:nth-child(10) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 35px;
                            background: #d35841;
                            animation: logs13 3s;
                        }
                        @keyframes logs13 {
                            0% {
                                top: -35px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 30px;
                            background-color: rgb(30, 164, 182);
                            animation: log13 3s;
                        }
                        @keyframes log13 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 30px;
                            }
                        }
                    }
                    ul > li:nth-child(11) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 38px;
                            background: #d35841;
                            animation: logs14 3s;
                        }
                        @keyframes logs14 {
                            0% {
                                top: -38px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;

                            width: 100%;
                            height: 19px;
                            background-color: rgb(30, 164, 182);
                            animation: log15 3s;
                        }
                        @keyframes log15 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 19px;
                            }
                        }
                    }
                    ul > li:nth-child(12) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 20px;
                            background: #d35841;
                            animation: logs16 3s;
                        }
                        @keyframes logs16 {
                            0% {
                                top: -20px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            width: 100%;
                            bottom: 0;
                            left: 0;

                            height: 48px;
                            background-color: rgb(30, 164, 182);
                            animation: log16 3s;
                        }
                        @keyframes log16 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 48px;
                            }
                        }
                    }
                    ul > li:nth-child(13) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 30px;
                            background: #d35841;
                            animation: logs17 3s;
                        }
                        @keyframes logs17 {
                            0% {
                                top: -30px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 36px;
                            background-color: rgb(30, 164, 182);
                            animation: log18 3s;
                        }
                        @keyframes log18 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 36px;
                            }
                        }
                    }
                    ul > li:nth-child(14) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 10px;
                            background: #d35841;
                            animation: logs19 3s;
                        }
                        @keyframes logs19 {
                            0% {
                                top: -10px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 20px;
                            background-color: rgb(30, 164, 182);
                            animation: log20 3s;
                        }
                        @keyframes log20 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 20px;
                            }
                        }
                    }
                    ul > li:nth-child(15) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 30px;
                            background: #d35841;
                            animation: logs222 3s;
                        }
                        @keyframes logs22 {
                            0% {
                                top: -30px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 50px;
                            background-color: rgb(30, 164, 182);
                            animation: log22 3s;
                        }
                        @keyframes log22 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 50px;
                            }
                        }
                    }
                    ul > li:nth-child(16) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 42px;
                            background: #d35841;
                            animation: logs 3s;
                        }
                        @keyframes logs23 {
                            0% {
                                top: -42px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 10px;
                            background-color: rgb(30, 164, 182);
                            animation: log23 3s;
                        }
                        @keyframes log23 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 10px;
                            }
                        }
                    }
                    ul > li:nth-child(17) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 32px;
                            background: #d35841;
                            animation: logs24 3s;
                        }
                        @keyframes logs24 {
                            0% {
                                top: -32px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 44px;
                            background-color: rgb(30, 164, 182);
                            animation: log 3s;
                        }
                        @keyframes log25 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 44px;
                            }
                        }
                    }
                    ul > li:nth-child(18) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 30px;
                            background: #d35841;
                            animation: logs25 3s;
                        }
                        @keyframes logs25 {
                            0% {
                                top: -30px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 50px;
                            background-color: rgb(30, 164, 182);
                            animation: log25 3s;
                        }
                        @keyframes log25 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 50px;
                            }
                        }
                    }
                    ul > li:nth-child(19) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 26px;
                            background: #d35841;
                            animation: logs26 3s;
                        }
                        @keyframes logs26 {
                            0% {
                                top: -26px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 43px;
                            background-color: rgb(30, 164, 182);
                            animation: log27 3s;
                        }
                        @keyframes log27 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 43px;
                            }
                        }
                    }
                    ul > li:nth-child(20) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 30px;
                            background: #d35841;
                            animation: logs28 3s;
                        }
                        @keyframes logs28 {
                            0% {
                                top: -30px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 31px;
                            background-color: rgb(30, 164, 182);
                            animation: log29 3s;
                        }
                        @keyframes log29 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 31px;
                            }
                        }
                    }
                    ul > li:nth-child(21) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 39px;
                            background: #d35841;
                            animation: logs30 3s;
                        }
                        @keyframes logs30 {
                            0% {
                                top: -39px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 29px;
                            background-color: rgb(30, 164, 182);
                            animation: log30 3s;
                        }
                        @keyframes log30 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 29px;
                            }
                        }
                    }
                    ul > li:nth-child(22) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 20px;
                            background: #d35841;
                            animation: logs30 3s;
                        }
                        @keyframes logs30 {
                            0% {
                                top: -20px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 39px;
                            background-color: rgb(30, 164, 182);
                            animation: log40 3s;
                        }
                        @keyframes log40 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 39px;
                            }
                        }
                    }
                    ul > li:nth-child(23) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 18px;
                            background: #d35841;
                            animation: logs31 3s;
                        }
                        @keyframes logs31 {
                            0% {
                                top: -18px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 22px;
                            background-color: rgb(30, 164, 182);
                            animation: log31 3s;
                        }
                        @keyframes log31 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 22px;
                            }
                        }
                    }
                    ul > li:nth-child(24) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 20px;
                            background: #d35841;
                            animation: logs32 3s;
                        }
                        @keyframes logs32 {
                            0% {
                                top: -20px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 40px;
                            background-color: rgb(30, 164, 182);
                            animation: log33 3s;
                        }
                        @keyframes log33 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 40px;
                            }
                        }
                    }
                    ul > li:nth-child(25) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 20px;
                            background: #d35841;
                            animation: logs34 3s;
                        }
                        @keyframes logs34 {
                            0% {
                                top: -20px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 10px;
                            background-color: rgb(30, 164, 182);
                            animation: log34 3s;
                        }
                        @keyframes log34 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 10px;
                            }
                        }
                    }
                    ul > li:nth-child(26) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 24px;
                            background: #d35841;
                            animation: logs35 3s;
                        }
                        @keyframes logs35 {
                            0% {
                                top: -24px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 17px;
                            background-color: rgb(30, 164, 182);
                            animation: log36 3s;
                        }
                        @keyframes log36 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 17px;
                            }
                        }
                    }
                    ul > li:nth-child(27) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 37px;
                            background: #d35841;
                            animation: logs37 3s;
                        }
                        @keyframes logs37 {
                            0% {
                                top: -37px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 17px;
                            background-color: rgb(30, 164, 182);
                            animation: log37 3s;
                        }
                        @keyframes log37 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 17px;
                            }
                        }
                    }
                    ul > li:nth-child(28) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 43px;
                            background: #d35841;
                            animation: logs38 3s;
                        }
                        @keyframes logs38 {
                            0% {
                                top: -43px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 50px;
                            background-color: rgb(30, 164, 182);
                            animation: log39 3s;
                        }
                        @keyframes log39 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 50px;
                            }
                        }
                    }
                    ul > li:nth-child(29) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 23px;
                            background: #d35841;
                            animation: logs40 3s;
                        }
                        @keyframes logs40 {
                            0% {
                                top: -23px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 36px;
                            background-color: rgb(30, 164, 182);
                            animation: log40 3s;
                        }
                        @keyframes log40 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 36px;
                            }
                        }
                    }
                    ul > li:nth-child(30) {
                        .listD {
                            position: absolute;
                            display: inline-block;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 20px;
                            background: #d35841;
                            animation: logs41 3s;
                        }
                        @keyframes logs41 {
                            0% {
                                top: -20px;
                            }
                            100% {
                                top: 0px;
                            }
                        }
                        .listv {
                            position: absolute;
                            display: inline-block;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 40px;
                            background-color: rgb(30, 164, 182);
                            animation: log41 3s;
                        }
                        @keyframes log41 {
                            0% {
                                height: 0px;
                            }
                            100% {
                                height: 40px;
                            }
                        }
                    }
                }
                .bottom {
                    position: relative;
                    min-width: 696px;
                    height: 216px;
                    margin-top: 15px;
                    background: url('../assets/score.png') no-repeat;
                    background-size: 100% 100%;
                    .more1 {
                        position: absolute;
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        right: 5px;
                        top: 12px;
                        background-image: url('../assets/2.png');
                        background-size: 100% 100%;
                        -webkit-animation-name: scaleDraw; /*关键帧名称*/
                        -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
                        -webkit-animation-iteration-count: infinite; /*动画播放的次数*/
                        -webkit-animation-duration: 5s; /*动画所花费的时间*/
                    }
                    .more2 {
                        position: absolute;
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        right: 5px;
                        bottom: 12px;
                        background-image: url('../assets/2.png');
                        background-size: 100% 100%;
                        -webkit-animation-name: scaleDraw; /*关键帧名称*/
                        -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
                        -webkit-animation-iteration-count: infinite; /*动画播放的次数*/
                        -webkit-animation-duration: 5s; /*动画所花费的时间*/
                    }
                    @keyframes scaleDraw {
                        /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
                        0% {
                            transform: scale(1); /*开始为原始大小*/
                        }
                        25% {
                            transform: scale(1.1); /*放大1.1倍*/
                        }
                        50% {
                            transform: scale(1);
                        }
                        75% {
                            transform: scale(1.1);
                        }
                    }
                    h2 {
                        color: #288b9f;
                        font-size: 16px;
                        float: left;
                        margin-top: 10px;
                        margin-left: 20px;
                    }
                    ul {
                        clear: both;
                        margin-left: 30px;
                        margin-top: 46px;
                        float: left;
                    }
                    ul > li {
                        clear: both;
                        display: block;
                        height: 14px;
                        margin-bottom: 20px;
                        span {
                            float: left;
                            color: #288b9f;
                            font-size: 14px;
                        }
                        .imgs {
                            float: left;
                            margin-left: 10px;
                            width: 130px;
                            height: 14px;
                            border: 1px solid #5c676b;
                            line-height: 9px;
                            i {
                                display: inline-block;
                                width: 105px;
                                height: 6px;
                                margin-left: 20px;
                                background-image: linear-gradient(
                                    90deg,
                                    #ffa032 0%,
                                    rgba(255, 160, 50, 0.1) 100%
                                );
                            }
                        }
                        ul.numbers {
                            li {
                                .imgs {
                                    i {
                                    }
                                }
                            }
                        }
                    }
                    .numbers {
                        width: 152px;
                        height: 152px;
                        position: absolute;
                        float: left;
                        margin-top: -57px;
                        margin-left: -76px;
                        left: 50%;
                        top: 50%;
                        span {
                            display: inline-block;
                            width: 152px;
                            height: 152px;

                            background: url('../assets/methus.png') no-repeat;
                            -webkit-transition-property: -webkit-transform;
                            -webkit-transition-duration: 8s;
                            -moz-transition-property: -moz-transform;
                            -moz-transition-duration: 8s;
                            -webkit-animation: rotate 10s linear infinite;
                            -moz-animation: rotate 10s linear infinite;
                            -o-animation: rotate 10s linear infinite;
                            animation: rotate 10s linear infinite;
                        }
                        @-webkit-keyframes rotate {
                            from {
                                -webkit-transform: rotate(0deg);
                            }
                            to {
                                -webkit-transform: rotate(360deg);
                            }
                        }
                        @-moz-keyframes rotate {
                            from {
                                -moz-transform: rotate(0deg);
                            }
                            to {
                                -moz-transform: rotate(359deg);
                            }
                        }
                        @-o-keyframes rotate {
                            from {
                                -o-transform: rotate(0deg);
                            }
                            to {
                                -o-transform: rotate(359deg);
                            }
                        }
                        @keyframes rotate {
                            from {
                                transform: rotate(0deg);
                            }
                            to {
                                transform: rotate(359deg);
                            }
                        }
                        i {
                            position: absolute;
                            width: 152px;
                            height: 152px;
                            left: 0;
                            top: 0;
                            line-height: 152px;
                            font-style: normal;
                            font-size: 42px;
                            color: #34dbf2;
                            text-align: center;
                        }
                    }
                }
            }
            .demo-echarts {
                background: url('../assets/ev.png') no-repeat;
                // width: 441px;
                width: 31.3%;
                height: 421px;
                float: left;
                margin-top: 0px;
                margin-left: 0.71%;
                background-size: 100% 100%;
                position: relative;
                h2 {
                    float: left;
                    margin-top: 16px;
                    margin-left: 20px;
                    font-size: 16px;
                    color: #288b9f;
                }
                .more {
                    position: absolute;
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    right: 5px;
                    top: 12px;
                    background-image: url('../assets/2.png');
                    background-size: 100% 100%;
                    -webkit-animation-name: scaleDraw; /*关键帧名称*/
                    -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
                    -webkit-animation-iteration-count: infinite; /*动画播放的次数*/
                    -webkit-animation-duration: 5s; /*动画所花费的时间*/
                }
                .myCharts {
                    width: calc(100% - 20px);
                    height: calc(100% - 50px);
                }
                @keyframes scaleDraw {
                    /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
                    0% {
                        transform: scale(1); /*开始为原始大小*/
                    }
                    25% {
                        transform: scale(1.1); /*放大1.1倍*/
                    }
                    50% {
                        transform: scale(1);
                    }
                    75% {
                        transform: scale(1.1);
                    }
                }
            }
        }
        .demo-message {
            float: left;
            margin-left: 0.71%;
            width: 14.2%;
            .news {
                width: 100%;
                min-width: 220px;
                height: 300px;
                background: url('../assets/message.png') no-repeat;
                position: relative;
                background-size: 100% 100%;
                ul {
                    clear: both;
                    padding-top: 4px;
                    padding-left: 12px;
                    width: calc(100% - 20px);
                }
                ul > li {
                    clear: both;
                    margin: 0 auto;
                    display: block;
                    padding-left: 6px;
                    margin-top: 10px;
                    width: 185px;
                    text-align: content;
                    font-size: 14px;
                    color: #288b9f;
                    line-height: 24px;
                    margin-bottom: 10px;
                }
                ul > li:first-child {
                    color: rgb(102, 220, 242);
                }
                h2 {
                    float: left;
                    margin-top: 16px;
                    margin-left: 20px;
                    font-size: 16px;
                    color: #288b9f;
                }
                .more {
                    position: absolute;
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    right: 0px;
                    bottom: 0px;
                    background-image: url('../assets/2.png');
                    background-size: 100% 100%;
                    -webkit-animation-name: scaleDraw; /*关键帧名称*/
                    -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
                    -webkit-animation-iteration-count: infinite; /*动画播放的次数*/
                    -webkit-animation-duration: 5s; /*动画所花费的时间*/
                }
                @keyframes scaleDraw {
                    /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
                    0% {
                        transform: scale(1); /*开始为原始大小*/
                    }
                    25% {
                        transform: scale(1.1); /*放大1.1倍*/
                    }
                    50% {
                        transform: scale(1);
                    }
                    75% {
                        transform: scale(1.1);
                    }
                }
            }
            .logos {
                cursor: pointer;
                width: 100%;
                min-width: 220px;
                height: 100px;
                margin-top: 18px;
                background: url('../assets/yclogo.png') no-repeat;
                background-size: 100%;
                line-height: 90px;
                text-align: center;
                img {
                    width: 200px;
                    height: 117px;
                    background-size: 100% 100%;
                }
            }
        }
    }
}

.wrapper {
    width: 100%;
    position: absolute;
    top: 20%;
    left: 50%;
    font-size: 0;
    -webkit-transform: translate(-40%);
    transform: translate(-40%);
}

.letter {
    width: 50px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    overflow: hidden;
    margin: 0 0;
    font-family: 'Microsoft YaHei', 'Lantinghei SC', 'Open Sans', Arial,
        'Hiragino Sans GB', 'STHeiti', 'WenQuanYi Micro Hei', 'SimSun',
        sans-serif;
    font-size: 48px;
    font-weight: 600;
    line-height: 70px;
    text-transform: uppercase;
    color: #34dbf2;
    background-color: #065160;
    margin-right: 10px;
    float: left;
}
.letter:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    word-break: break-all;
    background-color: #065160;
}

.letter:nth-child(1):before {
    content: '0295176384';
    margin-top: -96px;
    -webkit-animation-name: letter2;
    animation-name: letter2;
    -webkit-animation-duration: 2.56s;
    animation-duration: 2.56s;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

@-webkit-keyframes letter1 {
    from {
        margin-top: -60px;
    }
    to {
        margin-top: 80px;
    }
}

@keyframes letter1 {
    from {
        margin-top: -48px;
    }
    to {
        margin-top: 80px;
    }
}
.letter:nth-child(2):before {
    content: '0295176384';
    margin-top: -96px;
    -webkit-animation-name: letter2;
    animation-name: letter2;
    -webkit-animation-duration: 2.56s;
    animation-duration: 2.56s;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

@-webkit-keyframes letter2 {
    from {
        margin-top: -96px;
    }
    to {
        margin-top: 80px;
    }
}

@keyframes letter2 {
    from {
        margin-top: -96px;
    }
    to {
        margin-top: 80px;
    }
}
.letter:nth-child(3):before {
    content: '8562143079';
    margin-top: -168px;
    -webkit-animation-name: letter3;
    animation-name: letter3;
    -webkit-animation-duration: 1.82s;
    animation-duration: 1.82s;
    -webkit-animation-delay: 0.48s;
    animation-delay: 0.48s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

@-webkit-keyframes letter3 {
    from {
        margin-top: -168px;
    }
    to {
        margin-top: 80px;
    }
}

@keyframes letter3 {
    from {
        margin-top: -168px;
    }
    to {
        margin-top: 80px;
    }
}
.letter:nth-child(4):before {
    content: '0295176384';
    margin-top: -96px;
    -webkit-animation-name: letter2;
    animation-name: letter2;
    -webkit-animation-duration: 2.56s;
    animation-duration: 2.56s;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

@-webkit-keyframes letter4 {
    from {
        margin-top: -24px;
    }
    to {
        margin-top: 80px;
    }
}

@keyframes letter4 {
    from {
        margin-top: -24px;
    }
    to {
        margin-top: 80px;
    }
}
.letter:nth-child(5):before {
    content: '0295176384';
    margin-top: -96px;
    -webkit-animation-name: letter2;
    animation-name: letter2;
    -webkit-animation-duration: 2.56s;
    animation-duration: 2.56s;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

@-webkit-keyframes letter5 {
    from {
        margin-top: -120px;
    }
    to {
        margin-top: 80px;
    }
}

@keyframes letter5 {
    from {
        margin-top: -120px;
    }
    to {
        margin-top: 80px;
    }
}
.letter:nth-child(6):before {
    content: '9,471,830';
    margin-top: -216px;
    -webkit-animation-name: letter6;
    animation-name: letter6;
    -webkit-animation-duration: 2.88s;
    animation-duration: 2.88s;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

@-webkit-keyframes letter6 {
    from {
        margin-top: -216px;
    }
    to {
        margin-top: 80px;
    }
}

@keyframes letter6 {
    from {
        margin-top: -216px;
    }
    to {
        margin-top: 80px;
    }
}
.letter:nth-child(7):before {
    content: '9,471,830';
    margin-top: -96px;
    -webkit-animation-name: letter7;
    animation-name: letter7;
    -webkit-animation-duration: 2.208s;
    animation-duration: 2.208s;
    -webkit-animation-delay: 0.31s;
    animation-delay: 0.31s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

@-webkit-keyframes letter7 {
    from {
        margin-top: -96px;
    }
    to {
        margin-top: 80px;
    }
}

@keyframes letter7 {
    from {
        margin-top: -96px;
    }
    to {
        margin-top: 80px;
    }
}
.letter:nth-child(8):before {
    content: '9,471,830';
    margin-top: -216px;
    -webkit-animation-name: letter8;
    animation-name: letter8;
    -webkit-animation-duration: 2.268s;
    animation-duration: 2.268s;
    -webkit-animation-delay: 0.37s;
    animation-delay: 0.37s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

@-webkit-keyframes letter8 {
    from {
        margin-top: -216px;
    }
    to {
        margin-top: 80px;
    }
}

@keyframes letter8 {
    from {
        margin-top: -216px;
    }
    to {
        margin-top: 80px;
    }
}
.letter:nth-child(9):before {
    content: '9,471,830';
    margin-top: -72px;
    -webkit-animation-name: letter9;
    animation-name: letter9;
    -webkit-animation-duration: 1.65s;
    animation-duration: 1.65s;
    -webkit-animation-delay: 0.45s;
    animation-delay: 0.45s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

@-webkit-keyframes letter9 {
    from {
        margin-top: -72px;
    }
    to {
        margin-top: 80px;
    }
}

@keyframes letter9 {
    from {
        margin-top: -72px;
    }
    to {
        margin-top: 80px;
    }
}
.emjd {
    display: inline-block;
    width: 24px;
    font-size: 48px;
    color: #fff;
    line-height: 90px;
    float: left;
    color: #34dbf2;
}
.demo-map-onlien {
    position: absolute;
    top: 38px;
    left: 30px;
    width: 30px;
    font-size: 24px;
    color: #288b9f;
    z-index: 2;
}
.new-list {
    clear: both;
    height: 250px;
}
</style>
