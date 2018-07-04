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
            <section class="yc-dd-main">
                <div class="cd-eachart-title">
                  <el-col :span="10">
                    <el-row :gutter="20">
                      <el-col :span="4" style="padding-right:0">
                        <h3>预警统计</h3>
                      </el-col>
                      <el-col :span="5">
                         <v-daterange @dateRange="getDateRange"  placeholder="请选择时间范围"></v-daterange>
                      </el-col>
                      <el-col :span="6">
                          <date-w :datewSize="datewSize"  @dataMothe="dataMothe"></date-w>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="3" :offset="11">
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
                <!-- <div class="legend">
                    <p><span></span>时间：{{ dataTime }}</p>
                    <p><span></span>预警总次数{{ dataNumber }}次</p>
                </div> -->

                   <div ref="legend" class="legend" :style="{'margin-left':'-'+legendWith+'px'}">
                      <p><span></span>时间：{{dirverTimeStart}}{{ '  - ' + dirverTimeEnd }} </p>
                      <p><span></span>预警总次数:{{ sumCount }}次</p>
                      <template v-for="items in driversD" v-if="isCodeleng">
                        <p><span></span>{{ items.deriverName }}:{{ items.deriverCount }}次</p>
                      </template>
                  </div>
                    <chart  :options="polar" :autoResize="true"></chart>     
            </section>
        
            <section class="cd-map">
                <div class="cd-map-title">
                    <h3>预警统计列表</h3>
                </div>
                <baidu-map class="map" center="广州"   :scroll-wheel-zoom="true"  :center="{lng:lng, lat:lat }"   :zoom="zoom" >
                    <bml-marker-clusterer :averageCenter="true" >
                        <bm-marker v-for="(marker,index) in tableListData" :position="{lng:marker.longit, lat:marker.lat }" @click="coninfo($event,index)" :zoom="zoom" :key="index">
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
                       <date-picker @pcickValue="pcickValue" :size="size" ></date-picker>
                    </el-col>
                    <el-col :span="6" :offset="12">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <p v-if="onlineS" class="table-select-title">车辆/驾驶员筛选</p>
                                <el-cascader
                                  :options="echartsOptions"
                                  v-model="dlistOptionsModel"
                                  @change="dlisthandleChange"
                                  @active-item-change="dlisthandleItemChange"
                                  size="mini"
                                  :props="echartsProps"
                                  v-if="onlineS"
                                  >
                                </el-cascader>
                            </el-col>
                            <el-col :span="12">
                                <p v-if="onlineS" class="table-select-title">预警类型</p>
                                <el-cascader
                                  :options="echartsOptions"
                                  v-model="vechartsOptionsModel"
                                  @change="vechartshandleChange"
                                  @active-item-change="vechartshandleItemChange"
                                  size="mini"
                                  :props="echartsProps"
                                  v-if="onlineS"
                                  >
                                </el-cascader>
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
import vehicleMenu from "../../components/VehicleMenu";
import VehicleList from "../../components/VehicleList";
import { BmlMarkerClusterer } from "vue-baidu-map";
import MapBox from "../../components/MapBox";
import OnlineRate from "../../components/OnlineRate";
import CdTable from "../../components/Table";
import DatePicker from "../../components/DatePicker";
import Selects from "../../components/Selects";
import DateW from "../../components/Datew";
import echarts from "echarts";
import "echarts/lib/component/legend";
import invcat from "../../assets/invalid-name.png";
import invd from "../../assets/invalid-name2.png";
import VDaterange from "../../components/VDaterange";
import { 
  teamTree,
  searchByName,
  searchByNameChr,
  teamTreeSelect,
  composAlarmCount,
  onlineRateAll,
  onlineRate,
  composAlarmCountVehicle,
  composAlarmCountDeriver,
  composAlarmCountTeamCode,
  alarmCompsStat,
  alarmCompsStatVehicle,
  deriverAlarmCount,
  deriverVehicleAlarmCount,
  alarmStat,
  alarmStatAll,
  alarmStatTeamCode, 
  deriverAlarmCountTeamCode,
  deriverVehicleAlarmCountVehicleCode,
  deriverAlarmCountDeriverCode} from '../../api/getData'
import { getDay,getWeek } from '../../../static/js/data'
export default {
  data() {
    return {
      polar: {
        title: {
          text: "粤运化工",
          show: false
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          show: false
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "1%",
          containLabel: true
        },
        toolbox: {
          show: false,
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
          },
          axisLabel: {
            interval: 0
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
              color: "#efefef"
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
              params.seriesName +
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
            name: "",
            type: "bar",
            data: [],
            barCategoryGap: "80%",
            smooth: true,
            itemStyle: {
                normal: {
                  color: "#1672d8"
                }
              },
            },
            {
              name: "",
              type: "bar",
              data: [],
              barCategoryGap: "40%",
              smooth: true,
              itemStyle: {
                normal: {
                  color: "#458ee0"
                }
              }
            },
            {
              name: "",
              type: "bar",
              data: [],
              barCategoryGap: "40%",
              smooth: true,
              itemStyle: {
                normal: {
                  color: "#73aae8"
                }
              }
          }
        ],
        animationDuration: 2000
      },
     tableTitle: [
        {
          vul: "deriverName",
          title: "驾驶员"
        },
        {
          vul: "vehicleCode",
          title: "车牌号"
        },
        {
          vul: "alarmName",
          title: "预警类型"
        },
        {
          vul: "reportTime",
          title: "预警时间"
        },
        {
          vul: "locationDesc",
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
      ],
      vehicleList:[],
      onlineOptions:[{
        onlineChr:[]
      }
      ],
      echartsOptions:[{
        echartsChr:[]
      }],
      tableData:[
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
      listOptionsModel:[],//预警图表下拉选择
      ishowDLegend:true,//图例
      ishowVLegend:true,
      valueDate:'',//周日期控件选择
      valueCode:'',//图表查询时value
      tabletimestart:'',//统计列表时间
      tabletimeend:'',//统计列表结束时间
      sumCount:'',//报警总数
      dirverTimeStart:'',//默认预警统计开始时间
      dirverTimeEnd:'',//默认预警统计开始时间
      isCodeleng:false,
      driversD:[],//驾驶员列表
      dirverC:'',//保存车队ID
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
      this.zoom = 34
      this.isshow = true;
      this.lng = row.longit;
      this.lat = row.lat;
      this.infoD = row.deriverName;
      this.infoNP = row.vehicleCode;
      this.infoTW = row.alarmName;
      this.infoWT = row.reportTime;
      this.infoL = row.locationDesc;
    },
    //统计列表数据获取
    pcickValue(time) {
      this.tabletimestart = time[0]+'00:00:00'
      this.tabletimeend = time[1]+'23:59:59'
      alarmCompsStat(this.companyCode,this.tabletimestart,this.tabletimeend).then(res=>{
      if(res){
        this.tableListData = res
        this.tableData = res
      }
    })
    },
    CBValue(value) {
    },
    //预警统计
     echartshandleItemChange(val){
      this.valueCode = val[0]
      this.echartsOptionsModel = val
      this.polar.xAxis.data = []
      for(let i = 0; i<this.polar.series.length; i++){
        this.polar.series[i].data = [];
      }
      
      let teamCodes = this.vehicleList[msg.i].teamCode
    },
    //统计列表车辆筛选数据获取
    listhandleChange(val){
      // console.log(val)
      // if(this.tabletimestart || this.tabletimeend){
      //   alarmCompsStatVehicle(this.companyCode,val,this.tabletimestart,this.tabletimeend).then(res=>{
      //     if(res){
      //       console.log(res)
      //       this.tableListData = res
      //       this.tableData = res
      //     }
      //   })
      // }
    },
    listhandleItemChange(val){
        if(this.tabletimestart || this.tabletimeend){
          alarmCompsStatVehicle(this.companyCode,val[0],this.tabletimestart,this.tabletimeend).then(res=>{
            if(res){
              this.tableListData = res
              this.tableData = res
            }
          })
        }else{
          alarmCompsStatVehicle(this.companyCode,val[0],this.starData,this.endData).then(res=>{
            if(res){
              this.tableListData = res
              this.tableData = res
            }
          })
        }
    },

    //日期选择
    getDateRange(dateObj) {  
      
 // dateObj就可以获得时间范围的时间戳  
    },
    //条件车辆列表&&车辆在线率&&预警统计下拉选择
    showFun(msg){
      let reg = /[\(（][^\)）]+[\)）]$/
      let dirverName = msg.e.target.innerText
      this.dirverC = msg.i
      
      this.dName = dirverName.replace(reg,'').substring(1)
      if(this.ind === msg.i){
          this.ind = null
      }else{
          this.ind =msg.i;
      }
     
      let teamCodes = this.vehicleList[msg.i].teamCode
      onlineRate(this.vehicleList[msg.i].companyCode,this.vehicleList[msg.i].teamCode).then(
          res=>{
            this.onlineD = true
            this.rate = res.onLineRate
            this.onlineRate = res
        })
      teamTreeSelect(this.companyCode,this.dName).then(res=>{
         this.echartsOptions = []
          this.onlineOptions[0].onlineChr  = []
          for(let i = 0; i <   this.echartsOptions.length; i++){
              this.echartsOptions[i].echartsChr = []
          }
        this.onlineS = true
        this.onlineOptions = res
        this.onlineOptions[0].onlineChr = res[0].vehicleList
      
          this.echartsOptions = res[0].vehicleList
          for(let i = 0; i <  this.echartsOptions.length; i++){
          this.echartsOptions[i].echartsChr = this.echartsOptions[i].deriverList
        }
        
      })


      //车队查询统计列表
      alarmStatTeamCode(1,30,this.companyCode,teamCodes,this.starData,this.endData,'01').then(res=>{
          this.tableListData = res
      })
       //车队查询图表数据
      deriverAlarmCountTeamCode(this.companyCode,this.vehicleList[msg.i].teamCode,this.starData,this.endData).then(
        res=>{
              this.onlineS = true
              this.dirverTimeStart = this.starData
              this.dirverTimeEnd = this.endData
              this.polar.xAxis.data.length = 0
              // this.ishowVLegend = true
              // this.ishowDLegend = true
              for(let i = 0; i<this.polar.series.length; i++){
                this.polar.series[i].data.length = 0;
              }
              res.resultMap.forEach(element => {
                this.polar.xAxis.data.push(element.alarmName)
              });

              for(let i = 0; i<res.resultMap.length;i++){
                this.polar.series[1].data.push(res.resultMap[i].alarmCount)
              }
              this.sumCount = res.sumCount
              this.polar.series[1].name = this.vehicleList[0].teamName
            
        }
      )

     
    },
    itemOpened(msg){
      let text = msg.e.target.innerText.substring(7,0)
      if(this.itemEnd === msg.i){
          this.itemEnd = null
      }else{
          this.itemEnd = msg.i;
      }
      //统计三个驾驶员
       deriverVehicleAlarmCount(this.companyCode,this.vehicleList[msg.i].teamCode,text,this.starData,this.endData).then(res=>{
            if(res.derivers.length>0){
            this.isCodeleng = true
            this.onlineS = true
            this.polar.xAxis.data.length = 0 
            for(let i = 0; i<this.polar.series.length; i++){
              this.polar.series[i].data.length = 0;
            }
            res.derivers[0].alarms.forEach(element => {
                  this.polar.xAxis.data.push(element.alarmName)
            });
            for(let i = 0; i < res.derivers.length;i++){
              for(let c = 0; c < res.derivers[0].alarms.length; c++){
                this.polar.series[i].data.push(res.derivers[i].alarms[c].alarmCount)
                this.polar.series[i].name = res.derivers[i].deriverName
              }
            }
            this.driversD = res.derivers
            this.sumCount = res.sumCount
            }
      })
      let teamCodes = this.vehicleList[msg.i].teamCode
      //车辆查询统计列表
      alarmStat(1,10,this.companyCode,text,this.starData,this.endData,'01').then(res=>{
          this.tableListData = res
      })
    },
    //驾驶员统计列表 ------echarts下拉子项下拉查询
    echartshandleChange(value){
      
    },

    //驾驶员数据统计------统计echarts下拉车辆选择查询
    echartshandleItemChange(val){
      this.valueCode = val[0]
      this.echartsOptionsModel = val
      this.polar.xAxis.data.length = 0
      for(let i = 0; i<this.polar.series.length; i++){
        this.polar.series[i].data.length = 0;
      }
      this.onlineS = true
      this.isCodeleng = true
      this.polar.xAxis.data.length = 0
      for(let i = 0; i<this.polar.series.length; i++){
            this.polar.series[i].data.length = 0;
          }
       deriverVehicleAlarmCountVehicleCode(this.companyCode,this.vehicleList[this.dirverC].teamCode,this.valueCode,this.starData,this.endData).then(res=>{     
           if(res.derivers.length>0){
            res.derivers[0].alarms.forEach(element => {
                  this.polar.xAxis.data.push(element.alarmName)
            });
            for(let i = 0; i < res.derivers.length;i++){
              for(let c = 0; c < res.derivers[0].alarms.length; c++){
                this.polar.series[i].data.push(res.derivers[i].alarms[c].alarmCount)
                this.polar.series[i].name = res.derivers[i].deriverName
              }
            }

            this.driversD = res.derivers
            this.sumCount = res.sumCount
            }
      })
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
    dataMothe(val){
       if (escape(this.valueCode).indexOf( "%u" )<0 && this.valueCode !== ''){
         this.polar.xAxis.data = []
          for(let i = 0; i<this.polar.series.length; i++){
            this.polar.series[i].data = [];
          }
          composAlarmCountDeriver(this.companyCode,this.valueCode,val.dataMonday,val.dataSunday).then(res=>{
            if(res){this.ishowVLegend = true
            this.ishowDLegend = false
            res.deriverCount.forEach(element => {
              this.polar.xAxis.data.push(element.everyDate.slice(5).replace(/-/,'/'))
            })
              res.deriverCount.forEach(
              element=>{
                this.polar.series[1].data.push(element.alarmCount)
              }
            )}
         })
       }else if(this.valueCode !== ''){
          this.polar.xAxis.data = []
          for(let i = 0; i<this.polar.series.length; i++){
            this.polar.series[i].data = [];
          }
          composAlarmCountVehicle(this.companyCode,this.valueCode,val.dataMonday,val.dataSunday).then(
                res=>{
                  if(res){this.ishowVLegend = false
                  this.ishowDLegend = true
                  res.vehicleCount.forEach(element => {
                      this.polar.xAxis.data.push(element.everyDate.slice(5).replace(/-/,'/'))
                    })
                    res.vehicleCount.forEach(element=>{
                        this.polar.series[0].data.push(element.alarmCount)
                      }
                    )}
            })
       }else{
          this.polar.xAxis.data = []
          for(let i = 0; i<this.polar.series.length; i++){
            this.polar.series[i].data = [];
          }
         composAlarmCount(this.companyCode,val.dataMonday,val.dataSunday).then(
          res=>{
            if(res){res.deriverCount.forEach(element => {
              this.polar.xAxis.data.push(element.everyDate.slice(5).replace(/-/,'/'))
            });
            res.deriverCount.forEach(
              element=>{
                this.polar.series[0].data.push(element.alarmCount)
              }
            )
            res.vehicleCount.forEach(element =>{
              this.polar.series[1].data.push(element.alarmCount)
            })}
          }
        )
       }
 
    }
  },
  computed: {
    skcolors() {
      if (this.rate > 0.5 || this.rate == 0.5) {
        return (this.skcolor = "#57a14d");
      } else {
        return (this.skcolor = "#d85b5b");
      }
    },
  },
  watch: {
    linew: function() {
      
    }
    
  },
  mounted: function() {
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

    //默认图表数据
    deriverAlarmCount(this.companyCode,this.starData,this.endData).then(
      res=>{
            this.dirverTimeStart = this.starData
            this.dirverTimeEnd = this.endData

            res.resultMap.forEach(element => {
              this.polar.xAxis.data.push(element.alarmName)
            });

            for(let i = 0; i<res.resultMap.length;i++){
              this.polar.series[1].data.push(res.resultMap[i].alarmCount)
            }
            this.sumCount = res.sumCount
            this.polar.series[1].name = this.vehicleList[0].teamName
           
      }
    )
    //默认综合统计表格数据
    alarmStatAll(1,10,this.companyCode,this.starData,this.endData,'01').then(res=>{
  
      if(res){      
        this.tableListData = res
        this.tableData = res

      }
    })
  },
  updated(){
      //预统计图表图例位置
        let legend = this.$refs.legend;
        let width =
          legend.style.width ||
          legend.clientWidth ||
          legend.offsetWidth ||
          legend.scrollWidth;
          this.legendWith = width / 2;
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
    vehicleMenu,
    VDaterange
  }
};
</script>

<style lang="less" scoped>
@width: 100%;
.yc-velist-main {
  height: 100%;
  overflow: hidden;
}
.yc-velist {
  width: 240px;
  height: 100%;
  background-color: #f5f5f5;
  box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.18);
  text-align: center;
}
.yc-velist-title {
  width: 240px;
  height: 64px;
  background-color: #f5f5f5;
}
.yc-velist-title img {
  width: 32px;
  height: 32px;
  border-radius: 16px;
  float: left;
  margin: 16px 0 0 16px;
  background-color: #112146;
}
.yc-velist-title h3 {
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.1px;
  color: #112146;
  float: left;
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
  min-width: 560px;
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
.legend p:nth-child(2) span {
  background-image: url("../../assets/invalid-name2.png");
  background-repeat: no-repeat;
}
.legend p:nth-child(1) span {
  background-image: url("../../assets/invalid-time.png");
  background-repeat: no-repeat;
}
.legend p:nth-child(3) span {
  background-color: #1672d8;
  background-repeat: no-repeat;
}
.legend p:nth-child(4) span {
  background-color: #458ee0;
  background-repeat: no-repeat;
}
.legend p:nth-child(5) span {
  background-color: #73aae8;
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
.infoGreen {
  background-color: #57a14d;
}

.infoRed {
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

.yc-dd-main {
  height: 260px;
  padding: 20px;
  background-color: #fff;
  position: relative;
}
</style>