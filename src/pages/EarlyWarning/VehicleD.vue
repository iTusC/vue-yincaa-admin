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
         <el-scrollbar style="height:100%;" class="yc-scrollbar">
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
                      <el-col :span="9" style="padding-right:0">
                        <h3>车辆预警统计</h3>
                      </el-col>
                      
                      <el-col :span="8">
                        <!-- <date-w :datewSize="datewSize"  @dataMothe="dataMothe"></date-w> -->
              

                           <el-date-picker
                            v-model="selectData"
                            align="right"
                            type="date"
                            size="mini"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            style="width:150px;"
                            @change="dataMothe"
                            value-format="yyyy-MM-dd">
                          </el-date-picker>
                      </el-col>
                      
                    </el-row>
                  </el-col>
                  <el-col :span="5" :offset="9">
                      <el-cascader
                            :options="onlineOptions"
                            v-model="echartsOptionsModel"
                            @change="echartshandleChange"
                            @active-item-change="echartshandleItemChange"
                            size="mini"
                            :props="onlineProps"
                            v-if="onlineS"
                            >
                          </el-cascader>
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
                <baidu-map class="map" center="广州"   :scroll-wheel-zoom="true" :map-click="false"  :center="{lng:lng, lat:lat }" @ready="handler"   :zoom="zoom" >
                    <bml-marker-clusterer :averageCenter="true" v-if="isshow">
                            <template v-for="(markerlist,index) in tableListData">
                              <bm-marker :position="{lng:markerlist.longit, lat:markerlist.lat }" @click="coninfo($event,index)" :zoom="zoom" >
                              </bm-marker> 
                        </template>
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
                                  :options="onlineOptions"
                                  v-model="listOptionsModel"
                                  @change="listhandleChange"
                                  @active-item-change="listhandleItemChange"
                                  size="mini"
                                  :props="onlineProps"
                                  v-if="onlineS"
                                  >
                                </el-cascader>
                            </el-col>
                            <el-col :span="12">
                                <p v-if="onlineS" class="table-select-title">预警类型</p>
                                <el-select v-if="onlineS" @change="getAlarmCode"  v-model="value7" placeholder="请选择" size="mini">
                                  <el-option-group
                                    size="mini"
                                    v-for="group in options3"
                                    :key="group.label"
                                    :label="group.label">
                                    <el-option
                                      v-for="item in group.options"
                                      :key="item.ALARM_NAME"
                                      :label="item.ALARM_NAME"
                                      :value="item.ALARM_CODE">
                                    </el-option>
                                  </el-option-group>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <div class="ul-itme">
                    <cd-table @getLocation="getLocation" :tableListDatas="tableListData" :tableTitle="tableTitle" :tableH="tableH" ></cd-table>
                </div>
            </section>
           
        </div>
         </el-scrollbar>
    </div>
</template>

<script>
import VehicleMenu from '../../components/VehicleMenu';
import VehicleList from "../../components/VehicleList";
import { BmlMarkerClusterer } from "vue-baidu-map";
import MapBox from "../../components/MapBox";
import OnlineRate from "../../components/OnlineRate";
import CdTable from "../../components/Table";
import DatePicker from "../../components/DatePicker";
import Selects from "../../components/Selects";
import DateW from "../../components/Datew";
import "echarts/lib/component/legend";
import echarts from "echarts"
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
  composAlarmCountDeriver,
  composAlarmCountTeamCode,
  alarmCompsStat,
  alarmCompsStatVehicle,
  alarmCompsStatVehiclelPlice,
  getByGategory,
  alarmCompsStatD, 
  alarmCompsStatVehiclelclass,
  vehicleAlarmCount,
  alarmStatAll,
  vehicleAlarmCountV,
  vehicleAlarmCountSum,
  alarmStat,
  alarmStatTeamCode,
  alarmStatAlarmCode,
  } from '../../api/getData'
import { getDay,getWeek } from '../../../static/js/data'
export default {
  
  data() {
    return {
     
      //预计图表筛选
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', start);
            }
          },]
        },
        selectData:'',
      //列表报警类型配置
      options3: [{
          label: '车辆预警类型',
          options: []
        }, {
          label: '驾驶员预警类型',
          options: []
        }],
        value7: '',
      //数据统计表配置
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
          name: "次数          ",
          nameGap:26,
          nameTextStyle: {
            align: "center",
            color: "#656565"
          },
          boundaryGap:['0%','0%'],
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
            data: [],
            barCategoryGap: "78%",
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
      isshows:true,
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
      alarmCode:'',//报警类型
      dataTime:'',//图例开始时间
      dataNumber:'',//图例报警个数
      valueName:'',//车辆
};
  },
  methods: {
    coninfo(e, i) {
      this.isshow = true;
      this.lng = e.point.lng;
      this.lat = e.point.lat;
      this.infotext = this.markers[i].text;
    },
    //地图配置
    handler({BMap, map}){
      
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
       alarmStatAll(1,10,this.companyCode,this.tabletimestart,this.tabletimeend,'00').then(res=>{
      if(res){      
        this.tableListData = res
      }
    })
    },
    //统计列表车辆筛选数据获取
    listhandleChange(val){   
      {
        alarmStat(1,10,this.companyCode,val[1],this.starData,this.endData,'00').then(res=>{
          if(res){
            this.tableListData = res
          }
        })
      }
    },
    listhandleItemChange(val){
      this.listOptionsModel = val
      alarmStatTeamCode(1,10,this.companyCode,val,this.starData,this.endData,'00').then(res=>{
        if(res){
          console.log(res)
          this.tableListData = res
        }
      })
        
    },
    getAlarmCode(){
      this.alarmCode=this.value7
        alarmStatAlarmCode(1,10,this.companyCode,this.starData,this.endData,'00',this.alarmCode).then(res=>{
          if(res){
            console.log(res)
            this.tableListData = res
          }
        })
    },
    
    //搜索列表
    handleSelect(item){
      searchByNameChr(this.companyCode,item.value).then(res=>{
        console.log(res)
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
      this.teamCode = this.vehicleList[msg.i].teamCode
      this.dName = dirverName.replace(reg,'').substring(1)
      if(this.ind === msg.i){
          this.ind = null
      }else{
          this.ind =msg.i;
      }
      //在线车辆查询
      onlineRate(this.vehicleList[msg.i].companyCode,this.vehicleList[msg.i].teamCode).then(
          res=>{
            this.onlineD = true
            this.rate = res.onLineRate
            this.onlineRate = res
        })
      teamTreeSelect(this.companyCode,this.dName).then(res=>{
        this.onlineS = true
        this.onlineOptions = res
        this.onlineOptions[0].onlineChr = res[0].vehicleList
        this.echartsOptions = res[0].vehicleList
        
      })
      //数据图表
      vehicleAlarmCountSum(this.vehicleList[msg.i].companyCode,this.vehicleList[msg.i].teamCode,this.starData,this.endData).then(res=>{
            this.valueCode = this.echartsOptionsModel[1]
            this.polar.series[0].data.length = 0;
            res.resultMap.forEach(element => {
              this.polar.series[0].data.push(element.alarmCount)
            });

            this.dataTime = this.starData+ '-' +this.endData
            this.dataNumber = res.sumCount
      })
      getByGategory('00','车辆类型').then(res=>{
        this.options3[0].options = res
      })
      getByGategory('01','驾驶员类型').then(res=>{
        this.options3[1].options = res
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
          vehicleAlarmCountV(this.companyCode,text,this.starData,this.endData).then(res=>{
            console.log(res)
            this.valueCode = this.echartsOptionsModel[1]
            this.polar.series[0].data.length = 0;
            this.polar.xAxis.data.length = 0;
            res.resultMap.forEach(element => {
              this.polar.xAxis.data.push(element.alarmName)
              this.polar.series[0].data.push(element.alarmCount)
            });

            this.dataTime = this.starData+ '-' +this.endData
            this.dataNumber = res.sumCount
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
      this.valueName = value[1]
      this.valueCode = this.echartsOptionsModel[1]
      this.polar.xAxis.data = []
      for(let i = 0; i<this.polar.series.length; i++){
        this.polar.series[i].data = [];
      }
       vehicleAlarmCountV(this.companyCode,value[1],this.starData,this.endData).then(res=>{
            if(res){
            this.valueCode = this.echartsOptionsModel[1]
            this.polar.series[0].data.length = 0;
            this.polar.xAxis.data.length = 0
            res.resultMap.forEach(element => {
              this.polar.xAxis.data.push(element.alarmName)
              this.polar.series[0].data.push(element.alarmCount)
            });

            this.dataTime = this.starData+ '-' +this.endData
            this.dataNumber = res.sumCount
            }
         })
    },
    echartshandleItemChange(val){
      this.valueCode = val[0]
      this.echartsOptionsModel = val

     vehicleAlarmCountSum(this.companyCode,val[0],this.starData,this.endData).then(
        res=>{
          this.valueCode = this.echartsOptionsModel[1]
          this.polar.series[0].data.length = 0
          this.polar.xAxis.data.length = 0
          res.resultMap.forEach(element => {
            this.polar.xAxis.data.push(element.alarmName)
            this.polar.series[0].data.push(element.alarmCount)
          });

          this.dataTime = this.starData+ '-' +this.endData
          this.dataNumber = res.sumCount
        })
    },
    //图表时间选择
    dataMothe(val){
        if(this.selectData){
           if(this.valueCode){
            vehicleAlarmCountSum(this.companyCode,this.valueCode,val+' 00:00:00',this.endData).then(
              res=>{
                this.valueCode = this.echartsOptionsModel[1]
                this.polar.series[0].data.length = 0;
                this.polar.xAxis.data.length =0;
                res.resultMap.forEach(element => {
                  this.polar.xAxis.data.push(element.alarmName)
                  this.polar.series[0].data.push(element.alarmCount)
                });

                this.dataTime = val
                this.dataNumber = res.sumCount
          })
          }else if(this.valueName){
              vehicleAlarmCountV(this.companyCode,this.valueName,val+' 00:00:00',this,endData).then(
                res=>{
                  this.valueCode = this.echartsOptionsModel[1]
                this.polar.series[0].data.length = 0;
                this.polar.xAxis.data.length =0;
                res.resultMap.forEach(element => {
                  this.polar.xAxis.data.push(element.alarmName)
                  this.polar.series[0].data.push(element.alarmCount)
                });

                this.dataTime = val
                this.dataNumber = res.sumCount
                }
              )
          }
          else{
            vehicleAlarmCount(this.companyCode,val+' 00:00:00',this.endData).then(
              res=>{
                    this.polar.series[0].data.length = 0
                    this.polar.xAxis.data.length = 0
                    res.resultMap.forEach(element => {
                      this.polar.xAxis.data.push(element.alarmName)
                      this.polar.series[0].data.push(element.alarmCount)
                    });
                    this.dataTime = val
                    this.dataNumber = res.sumCount
                // this.polar.xAxis.data = res.deriverCount.everyDate
                // this.polar.series.data = res.deriverCount.alarmCount
              }
            )
          }
        }
    }
  },
 
  created: function() {
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
    vehicleAlarmCount(this.companyCode,this.starData,this.endData).then(
      res=>{
            this.polar.series[0].data.length = 0
            res.resultMap.forEach(element => {
              this.polar.xAxis.data.push(element.alarmName)
              this.polar.series[0].data.push(element.alarmCount)
            });
            this.dataTime = this.starData+ '-' +this.endData
            this.dataNumber = res.sumCount
        // this.polar.xAxis.data = res.deriverCount.everyDate
        // this.polar.series.data = res.deriverCount.alarmCount
      }
    )
    //默认综合统计表格数据
     alarmStatAll(1,10,this.companyCode,this.starData,this.endData,'00').then(res=>{
      if(res){      
        this.tableListData = res
      }
    })

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
      
    }
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
  beforeDestroy:function(){
    this.onlineS = false
    this.polar.series[0].data.length = 0;
    this.isshow = false
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
    /* margin-left: 260px; */
    padding: 20px 20px 20px 0;
    overflow: auto;
    margin-left: 20px;
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
  /* margin-bottom: 20px; */
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
</style>