<template>
    <div style="height:100%">
        <div class="yc-list">
          <div class="yc-velist-main">
            <div class="yc-velist">
                <div class="yc-velist-title">
                    <img src="" alt="">
                    <h3>粤运综合物流有限公司</h3>
                </div>
                <vehicle-list @handleSelect="handleSelect" :resL="resL" :selectNumber="selectNumber" :selectShow="selectShow" @Subm="Subm" :selectNull="selectNull"></vehicle-list>
                <vehicle-menu @showFun="showFun" @itemOpened="itemOpened" :vehicleList="vehicleList" :ind="ind" :itemEnd="itemEnd" :isListShow="isListShow"></vehicle-menu>
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
                          <el-cascader
                            :options="onlineOptions"
                            v-model="selectedOptions"
                            @change="handleChange"
                            @active-item-change="handleItemChange"
                            size="mini"
                            :props="onlineProps"
                            v-if="onlineS"
                            >
                          </el-cascader>
                      </el-col>
                    </el-row>
                </div>
                <div class="cd-online-main">
                    <div class="online-pro">
                        <online-rate :rate="rate" :skcolor="skcolors" :onlineD="onlineD" :onlineone="onlineone"></online-rate>
                    </div>
                    <template v-if="onlineD">
                      <div class="online-info">
                        <p><span :class="rate > 0.5 || rate == 0.5 || onlineone ? 'infoGreen' : 'infoRed'" class="info-sty"></span><i class="info-name">在线车辆：</i> <i class="info-car-number">{{ onlineRate.onLine }}</i><i class="info-car">辆</i></p>
                        <p><i class="info-car-all">所有车辆：</i><i class="info-car-numbers">{{ onlineRate.count }} 辆</i></p>
                        <p><i class="info-car-all">离线车辆：</i><i class="info-car-numbers">{{ onlineRate.offLine }} 辆</i></p>
                    </div>
                    </template>
                    <template v-else>
                      <div class="online-info">
                        <p><span :class="deriverisOnline === 1? 'infoGreen' : 'infooff'" class="info-sty"></span><i class="info-name">在线情况：</i> <i class="info-car-number" style="width:50px;" v-text="deriverisOnline === 1?'在线':'离线'"></i><i class="info-car"></i></p>
                        <p><i class="info-car-all">所属车队：</i><i class="info-car-numbers">{{ dName }}</i></p>
                        <p><i class="info-car-all">驾驶人数：</i><i class="info-car-numbers">{{ deriverSum }} 人</i></p>
                    </div>
                    </template>
                    
                </div>
            </section>
            <section class="cd-echart">
                <div class="cd-eachart-title">
                  <el-col :span="10">
                    <el-row :gutter="20">
                      <el-col :span="6" style="padding-right:0">
                        <h3>预警统计</h3>
                      </el-col>
                      
                      <el-col :span="8">
                        <date-w :datewSize="datewSize"  @dataMothe="dataMothe"></date-w>
                      </el-col>
                      
                    </el-row>
                  </el-col>
                  <el-col :span="5" :offset="9">
                      <el-cascader
                            :options="echartsOptions"
                            v-model="echartsOptionsModel"
                            @change="echartshandleChange"
                            @active-item-change="echartshandleItemChange"
                            size="mini"
                            :props="echartsProps"
                            v-if="onlineS"
                            >
                          </el-cascader>
                  </el-col>
                </div>
                <div ref="legend" class="legend" :style="{'margin-left':'-'+legendWith+'px'}">
                    <p v-if="ishowDLegend" class="legendD"><span></span>车辆预警</p>
                    <p v-if="ishowVLegend" class="legendV"><span></span>驾驶员预警</p>                 
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
                        <date-picker @pcickValue="pcickValue" :size="size"></date-picker>
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
                    <c-table :ctcspan="ctcspan" :showText="showText" :tableData="tableData" @showList="showList" :tableListShowi="tableListShowi"></c-table>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import VehicleMenu from '../../components/VehicleMenu';
import VehicleList from "../../components/VehicleList";
import { BmlMarkerClusterer } from "vue-baidu-map";
import MapBox from "../../components/MapBox";
import OnlineRate from "../../components/OnlineRate";
import CTable from "../../components/ComplexTable";
import DatePicker from "../../components/DatePicker";
import Selects from "../../components/Selects";
import DateW from "../../components/Datew";
import "echarts/lib/component/legend";
import invcat from "../../assets/invalid-name.png";
import invd from "../../assets/invalid-name2.png";
// import '../../mock/mock'
import { 
  teamTree,
  searchByName,
  searchByNameChr,
  teamTreeSelect,
  composAlarmCount,
  onlineRateAll,
  onlineRate,
  composAlarmCountVehicle,
  composAlarmCountDeriver } from '../../api/getData'
import { getDay,getWeek } from '../../../static/js/data'
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
          show:false,
          selectedMode: false,
          left: "center",
          top: 15,
          itemWidth:18,
          itemHeigth:18,
          padding:0,
          itemGap:30,
          symbolKeepAspect:false,
          data: [
          ]
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
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
          data: [],
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
            type: "line",
            data: [],
            smooth: true,
            itemStyle: {
              normal: {
                color: "#e5a936",
                lineStyle: {
                  color: "#e5a936"
                }
              }
            }
          },
          {
            name: "驾驶员预警",
            type: "line",
            data: [],
            smooth: true,
            itemStyle: {
              color: "#1672d8",
              normal: {
                color: "#1672d8"
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
      //表格列表数据格式
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
      vehicleList:[],
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
      ],
      onlineOptions:[{
        onlineChr:[]
      }
      ],
      echartsOptions:[{
        echartsChr:[]
      }],
      tableData:[
        {
          LicensePlate:"粤A2K532",
          Drivers:"萧大双",
          VehicleAlarmN:"23",
          DriverWarningN:"6",
          chr:[
            {
              VehicleAlarm:"车距时距监测",
              DriverWarning:"——",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            },
            {
              VehicleAlarm:"——",
              DriverWarning:"车距时距监测",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            },
            {
              VehicleAlarm:"车距时距监测",
              DriverWarning:"——",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            }
          ]
        },
        {
          LicensePlate:"粤A2K532",
          Drivers:"萧大双",
          VehicleAlarmN:"23",
          DriverWarningN:"6",
          chr:[
            {
              VehicleAlarm:"车距时距监测",
              DriverWarning:"——",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            },
            {
              VehicleAlarm:"——",
              DriverWarning:"车距时距监测",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            },
            {
              VehicleAlarm:"车距时距监测",
              DriverWarning:"——",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            }
          ]
        },
        {
          LicensePlate:"粤A2K532",
          Drivers:"萧大双",
          VehicleAlarmN:"23",
          DriverWarningN:"6",
          chr:[
            {
              VehicleAlarm:"车距时距监测",
              DriverWarning:"——",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            },
            {
              VehicleAlarm:"——",
              DriverWarning:"车距时距监测",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            },
            {
              VehicleAlarm:"车距时距监测",
              DriverWarning:"——",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            }
          ]
        },
        {
          LicensePlate:"粤A2K532",
          Drivers:"萧大双",
          VehicleAlarmN:"23",
          DriverWarningN:"6",
          chr:[
            {
              VehicleAlarm:"车距时距监测",
              DriverWarning:"——",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            },
            {
              VehicleAlarm:"——",
              DriverWarning:"车距时距监测",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            },
            {
              VehicleAlarm:"车距时距监测",
              DriverWarning:"——",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            }
          ]
        },
        {
          LicensePlate:"粤A2K532",
          Drivers:"萧大双",
          VehicleAlarmN:"23",
          DriverWarningN:"6",
          chr:[
            {
              VehicleAlarm:"车距时距监测",
              DriverWarning:"——",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            },
            {
              VehicleAlarm:"——",
              DriverWarning:"车距时距监测",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            },
            {
              VehicleAlarm:"车距时距监测",
              DriverWarning:"——",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            }
          ]
        },
        {
          LicensePlate:"粤A2K532",
          Drivers:"萧大双",
          VehicleAlarmN:"23",
          DriverWarningN:"6",
          chr:[
            {
              VehicleAlarm:"车距时距监测",
              DriverWarning:"——",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            },
            {
              VehicleAlarm:"——",
              DriverWarning:"车距时距监测",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            },
            {
              VehicleAlarm:"车距时距监测",
              DriverWarning:"——",
              address:"2018-05-27  11:46 / 507创意园",
              path:""
            }
          ]
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
      onlineRate:[],
      rate: 1,//在线率
      skcolor:'',
      onlineD:true,//车辆在线率与车辆在线,
      onlineone:1, //在线与离线
      legendWith:0, //图例居中显示
      ctcspan:0,  //表格展开时跨行
      showText:"展开本行",//表格展开收起切换
      tableListShowi:'',
      isListShow:'vehile-item-list-isopened',//车辆列表显示子导航
      resL:[],
      ind:'',//车辆列表展开，
      itemEnd:'',//车辆列表收起
      companyCode:'0000000001',//车队查询id
      selectNumber:0, //搜索结果数
      selectShow:false,//是否显示搜索结果
      selectNull:false,//搜索无结果时
      dName:'', //车辆参数查询
      deriverSum:'',//驾驶员人数
      deriverisOnline:1,//车辆在心情况
      selectedOptions:[],
      onlineProps:{
        children:'onlineChr' //在线率自定义chr
      },
      echartsProps:{
        children:'echartsChr',
        // // value:'deriveName',
        // label:'value'//预警统计自定义chr

      },
      onlineS:false, //显示搜索框
      starData:'',//默认开始时间
      endData:'',// 默认结束时间
      echartsOptions:[],//预警统计mode
      echartsOptionsModel:[],//预警图表下拉选择
      ishowDLegend:true,//图例
      ishowVLegend:true,
      valueDate:''//周日期控件选择
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
    pcickValue(time) {
      console.log(time);
    },
    CBValue(value) {
      console.log(value);
      

    },
    //表格展开更多内容
    showList(i){
      if(this.tableListShowi === i){
        this.tableListShowi = '展开本行';
      }
      else{
        this.ctcspan = 3
        this.tableListShowi = i
        this.showText = '收起本行'
      }
    },
    //搜索列表
    handleSelect(item){
      searchByNameChr(this.companyCode,item.value).then(res=>{
          this.vehicleList = res
        }
      )
      teamTreeSelect(this.companyCode,item.value).then(
        res =>{
          this.selectNumber = res.length
          this.selectShow = true
          this.vehicleList = res
          this.selectNumber = res.length
        }
      );
    },
    //条件车辆列表&&车辆在线率&&预警统计下拉选择
    showFun(msg){
      let reg = /[\(（][^\)）]+[\)）]$/
      let dirverName = msg.e.target.innerText
      this.dName = dirverName.replace(reg,'').substring(1)
      if(this.ind === msg.i){
          this.ind = null
      }else{
          this.ind =msg.i;
      }
       onlineRate(this.vehicleList[msg.i].companyCode,this.vehicleList[msg.i].teamCode).then(
            res=>{
              this.onlineD = true
              this.rate = res.onLineRate
              this.onlineRate = res
          })
      teamTreeSelect(this.companyCode,this.dName).then(res=>{
        console.log(res)
        this.onlineS = true
        this.onlineOptions = res
        this.onlineOptions[0].onlineChr = res[0].vehicleList
        this.echartsOptions = res[0].vehicleList
        for(let i = 0; i <  this.echartsOptions.length; i++){
          this.echartsOptions[i].echartsChr = this.echartsOptions[i].deriverList
        }
      })
    },
    itemOpened(msg){
      let text = msg.e.target.innerText.substring(7,0)
      if(this.itemEnd === msg.i){
          this.itemEnd = null
      }else{
          this.itemEnd =msg.i;
          msg.e.currentTarget.nextElementSibling.addClass = 'vehile-item-list-isopened'
          
      }
      msg.e.currentTarget.nextElementSibling.addClass = 'vehile-item-list-isopened'
          this.onlineD = false
          teamTreeSelect(this.companyCode,text).then(res=>{
            this.deriverSum = res[0].vehicleList[0].deriverSum
            this.deriverisOnline = res[0].vehicleList[0].isOnline
            this.onlineone = res[0].vehicleList[0].isOnline
          })
    },
    //enter搜索
    Subm(item){
      teamTreeSelect(this.companyCode,item).then(
        res =>{
          if(res.length === 0){
            this.selectNull = false;
          }else{
            this.selectNull = true
            this.selectNumber = res.length
            this.selectShow = true
            this.vehicleList = res
            this.selectNumber = res.length
          }
        }
      );
    },
    //在线率选择框
    handleChange(value){
      this.onlineD = false
      teamTreeSelect(this.companyCode,value[1]).then(res=>{
        this.deriverSum = res[0].vehicleList[0].deriverSum
        this.deriverisOnline = res[0].vehicleList[0].isOnline
        this.onlineone = res[0].vehicleList[0].isOnline
      })
    },
    handleItemChange(val){
      this.selectedOptions = val
      onlineRate(this.companyCode,val ).then(
            res=>{
              this.onlineD = true
              this.rate = res.onLineRate
              this.onlineRate = res
          })
    },

    //预警统计
    echartshandleChange(value){
      this.polar.xAxis.data = []
      for(let i = 0; i<this.polar.series.length; i++){
        this.polar.series[i].data = [];
      }
      composAlarmCountDeriver(this.companyCode,value[0],this.starData,this.endData).then(res=>{
        this.ishowVLegend = true
        this.ishowDLegend = false
        res.deriverCount.forEach(element => {
          this.polar.xAxis.data.push(element.everyDate.slice(5).replace(/-/,'/'))
        })
          res.deriverCount.forEach(
          element=>{
            this.polar.series[1].data.push(element.alarmCount)
          }
        )
      })
    },
    echartshandleItemChange(val){
      this.echartsOptionsModel = val
      this.polar.xAxis.data = []
      for(let i = 0; i<this.polar.series.length; i++){
        this.polar.series[i].data = [];
      }
      composAlarmCountVehicle(this.companyCode,val[0],this.starData,this.endData).then(
            res=>{
              this.ishowVLegend = false
              this.ishowDLegend = true
              res.vehicleCount.forEach(element => {
                  this.polar.xAxis.data.push(element.everyDate.slice(5).replace(/-/,'/'))
                })
                res.vehicleCount.forEach(element=>{
                    this.polar.series[0].data.push(element.alarmCount)
                  }
                )
        })
    },
    //图表时间选择
    dataMothe(val){
      var now = new Date(val); 
      var nowTime = now.getTime() ; 
      var day = now.getDay();
      var oneDayLong = 24*60*60*1000 ; 


      var MondayTime = nowTime - (day-1)*oneDayLong  ; 
      var SundayTime =  nowTime + (7-day)*oneDayLong ; 


      var monday = new Date(MondayTime);
      var sunday = new Date(SundayTime);
      console.log(monday) ; 
      console.log(sunday) ; 
 
    }

    // getVehicleList(){
    //   let _this = this
    //   this.$ajax.get('getVehicleList').then(function(res){
    //     _this.vehicleList = res.data.getVehicleList
    //     console.log(res.data.getVehicleList)
    //   })
    // }
  },
  mounted: function() {

    //预统计图表图例位置
    let legend = this.$refs.legend;
    let width =
      legend.style.width ||
      legend.clientWidth ||
      legend.offsetWidth ||
      legend.scrollWidth;
    this.legendWith = width / 2;
    console.log(this.legendWith);
    
    //获取车辆列表 搜索车辆个数
    teamTree(this.companyCode).then(
      res =>{
        this.selectNull = true
        this.vehicleList = res
        this.selectNumber = res.length
      }
    );
    //默认下拉列表
    searchByName(this.companyCode).then(
      res=>{
        this.resL = res
      }
    )

    //默认车辆在线数
    onlineRateAll(this.companyCode).then(
      res=>{
        this.onlineRate = res
        this.rate = res.onLineRate
      }
    )
    //图表查询默认时间（按照往后推7天）
    this.endData = getDay(0) + ' 23:23:59'
    this.starData = getDay(-6) + ' 00:00:00'
    
    console.log(this.starData)
    console.log(this.endData)
    //默认图表数据
    composAlarmCount(this.companyCode,this.starData,this.endData).then(
      res=>{
        res.deriverCount.forEach(element => {
          this.polar.xAxis.data.push(element.everyDate.slice(5).replace(/-/,'/'))
        });
        res.deriverCount.forEach(
          element=>{
            this.polar.series[0].data.push(element.alarmCount)
          }
        )
        res.vehicleCount.forEach(element =>{
          this.polar.series[1].data.push(element.alarmCount)
        })
        // this.polar.xAxis.data = res.deriverCount.everyDate
        // this.polar.series.data = res.deriverCount.alarmCount
      }
    )
  },
  computed:{
      skcolors(){
          if(this.rate > 0.5 || this.rate == 0.5 || this.onlineone){
              return this.skcolor = "#57a14d"
          }
          else{
              return this.skcolor = "#d85b5b"
          }
      },
  },
  watch: {
    linew: function() {
      console.log(this.linew);
    }
  },
  components: {
    BmlMarkerClusterer,
    MapBox,
    VehicleList,
    OnlineRate,
    CTable,
    DatePicker,
    Selects,
    DateW,
    VehicleMenu
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
.yc-select{
    width: 90%;
    font-size: 14px;
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
.infooff{
    background-color: #c7c7c7;
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
  width: 93px;
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
.legend {
  position: absolute;
  left: 50%;
  margin-left: -15%;
}
.legend p {
  float: left;
  margin-right: 20px;
  font-size: 12px;
  color: #474747;
}
.legend p span {
  display: inline-block;
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 10px;
}
.legend p span{
  border-radius: 50%;
}
.legend p.legendV span {
  background-image: url("../../assets/invalid-name.png");
  background-repeat: no-repeat;
}
.legend p.legendD span {
  background-image: url("../../assets/invalid-name2.png");
  background-repeat: no-repeat;
}
</style>