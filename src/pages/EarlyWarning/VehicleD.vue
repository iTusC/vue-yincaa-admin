<template>
    <div style="height:100%">
        <div class="yc-list">
          <div class="yc-velist-main">
            <div class="yc-velist">
                <div class="yc-velist-title">
                    <img src="" alt="">
                    <h3>粤运综合物流有限公司</h3>
                </div>
                <vehicle-list></vehicle-list>
                <vehicle-menu></vehicle-menu>
            </div>
          </div>
        </div>
        <div class="yc-cd-mains">
             <section class="cd-online">
                <div class="cd-online-title">
                    <el-row :gutter="20">
                      <el-col :span="10">
                          <h3>实时车辆在线率</h3>
                      </el-col>
                      <el-col :span="8" :offset="6">
                          <selects @CBValue="CBValue" :size="selectSize"  :options="options"></selects>
                      </el-col>
                    </el-row>
                </div>
                <div class="cd-online-main">
                    <div class="online-pro">
                        <online-rate :rate="rate" :skcolor="skcolors" ></online-rate>
                    </div>
                    <div class="online-info">
                        <p><span :class="rate > 0.5 || rate == 0.5  ? 'infoGreen' : 'infoRed'" class="info-sty"></span><i class="info-name">在线车辆：</i> <i class="info-car-number">43</i><i class="info-car">辆</i></p>
                        <p><i class="info-car-all">所有车辆：</i><i class="info-car-numbers">67 辆</i></p>
                        <p><i class="info-car-all">离线车辆：</i><i class="info-car-numbers">24 辆</i></p>
                    </div>
                </div>
            </section>
            <section class="cd-echart">
                <div class="cd-eachart-title">
                   <el-col :span="10">
                       <el-row :gutter="20">
                         <el-col :span="6" style="padding-right:0">
                            <h3>预警统计</h3>
                         </el-col>
                         <el-col :span="6">
                             <date-w :datewSize="datewSize"></date-w>
                         </el-col>
                       </el-row>
                      </el-col>
                      <el-col :span="5" :offset="9">
                          <selects @CBValue="CBValue" :size="selectSize"  :options="options"></selects>
                      </el-col>
                </div>
                
                <div class="legend" ref="legend"  :style="{'margin-left':'-'+legendWith+'px'}">
                    <p><span></span>时间：{{ dataTime }}</p>
                    <p><span></span>预警总次数{{ dataNumber }}次</p>
                </div>
                <chart :options="polar" :autoResize="true"></chart>
            </section>
            <section class="cd-map">
                <div class="cd-map-title">
                    <h3>预警统计列表</h3>
                </div>
                <baidu-map class="map" center="广州"   :scroll-wheel-zoom="true"  :center="{lng:lng, lat:lat }"   :zoom="zoom" >
                    <bml-marker-clusterer :averageCenter="true" >
                        <bm-marker v-for="(marker,index) in tableListData" :position="{lng:marker.lng, lat:marker.lat }" @click="coninfo($event,index)" :zoom="zoom" :key="index">
                        </bm-marker> 
                    </bml-marker-clusterer>   
                    <map-box :position="{lng: lng, lat: lat}" v-if="isshow">
                        <i @click="close">x</i>
                        <p class="info"  >驾驶员：{{ infoD }}</p>
                        <p class="info"  >车牌号：{{ infoNP }}</p>
                        <p class="info"  >报警时间：{{ infoWT }}</p>
                        <p class="info"  >报警类型：{{ infoTW }}</p>
                        <p class="info"  >报警地点：{{ infoL }}</p>
                    </map-box>
                </baidu-map>
                <el-row :gutter="20" class="cd-table-select">
                    <el-col :span="6">
                        <p class="table-select-title">时间筛选</p>
                        <date-picker @PcickValue="PcickValue" :size="size"></date-picker>
                    </el-col>
                    <el-col :span="6" :offset="12">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <p class="table-select-title">车辆/驾驶员筛选</p>
                                <selects @CBValue="CBValue" :size="selectSize"  :options="options"></selects>
                            </el-col>
                            <el-col :span="12">
                                <p class="table-select-title">驾驶员预警类型</p>
                                <selects @CBValue="CBValue" :size="selectSize"  :options="options"></selects>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <div class="ul-itme">
                    <cd-table @getLocation="getLocation" :tableListDatas="tableListData" :tableTitle="tableTitle" :tableH="tableH" ></cd-table>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import vehicleMenu from '../../components/VehicleMenu'
import VehicleList from "../../components/VehicleList";
import { BmlMarkerClusterer } from "vue-baidu-map";
import MapBox from "../../components/MapBox";
import OnlineRate from "../../components/OnlineRate";
import CdTable from "../../components/Table";
import DatePicker from "../../components/DatePicker";
import Selects from "../../components/Selects";
import DateW from "../../components/Datew";
import echarts from "echarts"
import "echarts/lib/component/legend";
import invcat from "../../assets/invalid-name.png";
import invd from "../../assets/invalid-name2.png";
export default {
  data() {
    return {
      polar: {
        title: {
          text: "粤运化工",
          show:false
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          show:false
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          show:false,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          data: ["车道偏离","前车碰撞","车距时距检测","驻车滑行"],
          show: true,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#656565",
              width: 0
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: "次数         ",
          nameGap: 26,
          nameTextStyle: {
            align: "right",
            color: "#656565"
          },
          type: "value",
          show: true,
          axisLine: {
            show: true,
            // symbol:'none',
            lineStyle: {
              color: "#656565",
              width: 0,
              type: "dashed"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color:"#efefef"
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params, ticket, callback) {
            let res =
              "时间：" +
              params.name +
              "<br/>范围：" +
              "粤运化工" +
              "<br/>预警：" +
              params.data;

            setTimeout(function() {
              callback(ticket, res);
            }, 300);
            return "加载中";
          }
        },
        series: [
          {
            name: "车辆预警",
            type: "bar",
            data: [5, 10, 30, 20],
            barCategoryGap:'80%',
            smooth: true,
            itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                          [
                              {offset: 0, color: '#f4d466'},
                              {offset: 1, color: '#e5a936'}
                          ]
                      )
              }
            }
          }
        ],
        animationDuration: 1000
      },
      tableTitle: [
        {
          vul: "drivers",
          title: "驾驶员"
        },
        {
          vul: "numberPlate",
          title: "车牌号"
        },
        {
          vul: "typeOfWarning",
          title: "预警类型"
        },
        {
          vul: "warningTime",
          title: "预警时间"
        },
        {
          vul: "location",
          title: "预警地点",
          scope: true
        },
        {
          vul: "more",
          title: "详情信息",
          widths: "",
          more: true
        }
      ],
      tableListData: [
        {
          drivers: "邱小刚",
          numberPlate: "粤A2K532",
          typeOfWarning: "分神提醒（低头/瞌睡）",
          warningTime: "2018-05-03  11:46",
          location: "507创意园",
          more: "",
          lng: "113.363552",
          lat: "23.116597"
        },
        {
          drivers: "邱小刚",
          numberPlate: "粤A2K5321",
          typeOfWarning: "分神提醒（低头/瞌睡）",
          warningTime: "2018-05-03  11:46",
          location: "507创意园",
          more: "",
          lng: "116.547135",
          lat: "39.996569"
        },
        {
          drivers: "邱小刚",
          numberPlate: "粤A2K532",
          typeOfWarning: "分神提醒（低头/瞌睡）",
          warningTime: "2018-05-03  11:46",
          location: "507创意园1",
          more: "",
          lng: "116.935203",
          lat: "39.736504"
        },
        {
          drivers: "邱小刚",
          numberPlate: "粤A2K532",
          typeOfWarning: "分神提醒（低头/瞌睡）",
          warningTime: "2018-05-03  11:46",
          location: "507创意园2",
          more: "",
          lng: "116.743756",
          lat: "39.335839"
        },
        {
          drivers: "邱小刚",
          numberPlate: "粤A2K532",
          typeOfWarning: "分神提醒（低头/瞌睡）",
          warningTime: "2018-05-03  11:46",
          location: "507创意园3",
          more: "",
          lng: "113.435506",
          lat: "23.145676"
        },
        {
          drivers: "邱小刚",
          numberPlate: "粤A2K532",
          typeOfWarning: "分神提醒（低头/瞌睡）",
          warningTime: "2018-05-03  11:46",
          location: "507创意园4",
          more: "",
          lng: "113.352718",
          lat: "23.001511"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      isshow: false,
      lng: 116.404,
      lat: 39.915,
      infoD: "", //驾驶员
      infoNP: "", //车牌号码
      infoTW: "", //报警类型
      infoWT: "", //时间
      infoL: "", //地点,
      tableH: "300", //表格高度,
      value6: "", //日期选择
      size: "mini",
      zoom: 12,
      selectSize: "mini", //下拉框大小,
      datewSize: "mini" ,//日历选择,
      rate: 0.49,//在线率
      skcolor:'',
      dataTime:'5/21',
      dataNumber:'37',
      legendWith:0
    };
  },
  methods: {
    coninfo(e, i) {
      this.isshow = true;
      this.lng = e.point.lng;
      this.lat = e.point.lat;
      this.infotext = this.markers[i].text;
    },
    //地图弹框显示位置
    draw({ el, BMap, map }) {
      let pixel = map.pointToOverlayPixel(new BMap.Point(this.lng, this.lat));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
    isinfo(i) {
      alert(1);
    },
    close() {
      this.isshow = false;
    },
    //预警定位
    getLocation(row) {
      this.isshow = true;
      this.lng = row.lng;
      this.lat = row.lat;
      this.infoD = row.drivers;
      this.infoNP = row.numberPlate;
      this.infoTW = row.typeOfWarning;
      this.infoWT = row.warningTime;
      this.infoL = row.location;
    },
    PcickValue(time) {
      console.log(time);
    },
    CBValue(value) {
      console.log(value);
    }
  },
  computed:{
      skcolors(){
          if(this.rate > 0.5 || this.rate == 0.5 ){
              
              return this.skcolor = "#57a14d"
          }
          else{
              return this.skcolor = "#d85b5b"
          }
      }
  },
  watch: {
    linew: function() {
      console.log(this.linew);
    }
  },
  mounted:function(){
    let legend = this.$refs.legend
    let width = legend.style.width || legend.clientWidth || legend.offsetWidth || legend.scrollWidth;  
    this.legendWith = width/2
    console.log(this.legendWith)
  },
  components: {
    BmlMarkerClusterer,
    MapBox,
    VehicleList,
    OnlineRate,
    CdTable,
    DatePicker,
    Selects,
    DateW,
    vehicleMenu
  }
};
</script>

<style scoped>
.yc-velist-main{
    height: 100%;
    overflow: hidden;
}
.yc-velist{
    width: 240px;
    height: 100%;
    background-color: #f5f5f5;
    box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.18);
    text-align: center;
}
.yc-velist-title{
    width: 240px;
    height: 64px;
    background-color: #f5f5f5;
}
.yc-velist-title img{
    width: 32px;
    height: 32px;
    border-radius: 16px;
    float: left;
    margin: 16px 0 0 16px;
    background-color: #112146;
}
.yc-velist-title h3{
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.1px;
  color: #112146;
  float:left;
  padding-top: 22px;
  padding-left: 10px;
}
.yc-list {
  width: 240px;
  float: left;
  height: 100%;
}
.yc-cd-mains {
  height: 100%;
  margin-left: 260px;
  padding: 20px 20px 20px 0;
  overflow: auto;
}
.map {
  width: auto;
  height: 300px;
}
.cd-map {
  background-color: #fff;
  margin-top: 2%;
}
.sample {
  width: 200px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: left;
  padding: 10px;
  position: absolute;
}
.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
.sample i {
  position: absolute;
  right: 10px;
  top: 0;
  font-style: normal;
}
.info {
  margin: 0;
  padding: 0;
  font-size: 12px;
  line-height: 20px;
  text-align: left;
}
.ul-itme li:hover {
  cursor: pointer;
}
.echarts {
  width: 100%;
  height: 200px;
}
.cd-echart {
  width: 56%;
  min-width:560px;
  height: 260px;
  padding: 20px;
  background-color: #fff;
  position: relative;
  margin-left: 41%;
}
.cd-eachart-title {
  font-size: 14px;
  height: 48px;
  color: #474747;
}
.cd-eachart-title h3 {
  line-height: 28px;
}
.legend{
  position: absolute;
  left: 50%;
  margin-left: -15%;
}
.legend p{
  float: left;
  margin-right: 20px;
  font-size: 12px;
  color: #474747;
}
.legend p span{
  display: inline-block;
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 10px;
}
.legend p:last-child span{
  background-image:url('../../assets/invalid-name2.png');
  background-repeat: no-repeat;
}
.legend p:first-child span{
  background-image:url('../../assets/invalid-time.png');
  background-repeat: no-repeat;
}
.cd-online {
  width: 36%;
  min-width: 212px;
  height: 260px;
  background-color: #fff;
  padding: 20px;
  float: left;
}
.cd-map-title {
  width: 100%;
  height: 48px;
}
.cd-map-title h3 {
  line-height: 48px;
  padding-left: 20px;
  font-size: 14px;
}
.cd-online-main {
  height: 252px;
  width: 100%;
  position: relative;
}
.cd-online-title {
  height: 28px;
}
.cd-online-title h3 {
  font-size: 14px;
  line-height: 28px;
}
.online-pro {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 20px;
  top: 50px;
}
.online-info {
  width: 168px;
  height: auto;
  position: absolute;
  right: 0px;
  top: 70px;
}
.info-sty {
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  margin-right: 10px;
  float: left;
  margin-top: 13px;
}
.infoGreen{
  background-color: #57a14d;
}

.infoRed{
    background-color: #d85b5b;
}
.info-name {
  display: inline-block;
  width: 70px;
  height: 20px;
  font-style: normal;
  font-size: 14px;
  color: #474747;
}
.info-car-number {
  display: inline-block;
  width: 29px;
  height: 33px;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  margin-right: 10px;
}
.info-car {
  font-size: 14px;
  font-style: normal;
}
.info-car-all {
  display: inline-block;
  width: 123px;
  text-align: right;
  font-size: 12px;
  font-style: normal;
  color: #656565;
  margin-top: 10px;
}
.info-car-numbers {
  font-size: 12px;
  font-style: normal;
  color: #656565;
}
.ul-itme {
  margin-bottom: 56px;
}
.has-gutter {
  background: #979797;
}
.cd-table-select {
  height: 90px;
  padding: 0 20px;
}
.table-select-title {
  font-size: 12px;
  color: #9b9b9b;
  line-height: 30px;
  padding-top: 10px;
}
.select-right-condition {
  float: right;
}
</style>