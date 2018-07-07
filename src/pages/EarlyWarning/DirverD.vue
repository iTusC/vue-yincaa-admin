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
                
                <div ref="legend" class="legend" :style="{'margin-left':'-'+legendWith+'px'}">
                    <p><span></span>时间：{{dirverTimeStart}}{{ '  - ' + dirverTimeEnd }} </p>
                    <p><span></span>预警总次数:{{ sumCount }}次</p>
                    <p v-if="vehicleNumbner" v-for="items in driversD"><span></span>{{ items.deriverName }}:{{ items.deriverCount }}次</p> 
                                      
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
import VDaterange from '../../components/VDaterange';
import "echarts/lib/component/legend";
import invcat from "../../assets/invalid-name.png";
import invd from "../../assets/invalid-name2.png";
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
  deriverAlarmCount,
  alarmStatAll,
  deriverAlarmCountTeamCode,
  alarmStatTeamCode,
  deriverVehicleAlarmCount,
  deriverVehicleAlarmCountVehicleCode,
  deriverAlarmCountDeriverCode,
  deriverAlarmCountVehicleCode,
  alarmStat,
  alarmStatAlarmCode} from '../../api/getData'
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
          barCategoryGap: "40%",
          smooth: true,
          itemStyle: {
            normal: {
              color: "#1672d8"
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
      tableListData: [],
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
      datewSize: "mini", //日历选择,
      rate: 0.49, //在线率
      skcolor: "",
      dataTime: "5/21",
      dataNumber: "37",
      legendWith: 0, //图例居中
      resL:[], //车辆列表
      selectNumber:0, //搜索结果数
      selectShow:false,//是否显示搜索结果
      selectNull:false,//搜索无结果时
      vehicleList:[],//车辆树
      ind:'',//车辆列表展开
      itemEnd:'',//车辆列表收起
      isListShow:'vehile-item-list-isopened',//车辆列表显示子导航
      companyCode:'0000000001',//车队查询id
      driversD:[],//驾驶员列表报警次数
      vehicleNumbner:false,//是否渲染驾驶员图例
      sumCount:'',//预警总次数
      endData:'',//默认结束时间
      starData:'',//默认开始时间
      dirverTimeStart:'',//图例开始时间
      dirverTimeEnd:'',//图例结束时间
      onlineS:false,//查询显示隐藏
      onlineOptions:[{ //下拉搜索列表
        onlineChr:[]
      }
      ],
      echartsOptions:[{ //下拉搜索列表
        echartsChr:[]
      }],
      onlineProps:{
        children:'onlineChr' //在线率自定义chr
      },
      echartsProps:{
        children:'echartsChr',
        // // value:'deriveName',
        // label:'value'//预警统计自定义chr
      },
      echartsOptionsModel:[],//预警图表下拉选择
      vechartsOptions:[],//报警类型选择
      egory:'',//预警选择
     
         value7: '',
      listOptionsModel:[],//表格车辆驾驶员选择
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
        teamCodes:'',//保存当前车队编号,
        deriverCodes:[],//驾驶员名称
        deriverData:[],//驾驶员数据详情
        xAxisD:[],//图表下列标签
        isshows:false,
         //列表报警类型配置
      options3: [{
          label: '车辆预警类型',
          options: []
        }, {
          label: '驾驶员预警类型',
          options: []
        }],
        teamCodeNumber:'0000000001'
    }
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
    PcickValue(time) {
      console.log(time);
    },
    CBValue(value) {
      console.log(value);
    },
    //初始化数据赋值
    pushEchertsData(ele){

    },

    //---------- get data function------------//
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
    //条件车辆列表&&车辆在线率&&预警统计下拉选择
    //选择车队列表
    showFun(msg){
      let reg = /[\(（][^\)）]+[\)）]$/
      let dirverName = msg.e.target.innerText
      let teamCodes = this.vehicleList[msg.i].teamCode
      this.teamCode = this.vehicleList[msg.i].teamCode
      this.dName = dirverName.replace(reg,'').substring(1)
      if(this.ind === msg.i){
          this.ind = null
      }else{
          this.ind =msg.i;
      }
      if(this.vehicleNumbner){
        this.vehicleNumbner = false
      }
      teamTreeSelect(this.companyCode,this.dName).then(res=>{
        this.echartsOptions = []
        this.onlineOptions[0].onlineChr.length  = 0
        for(let i = 0; i <   this.echartsOptions.length; i++){
            this.echartsOptions[i].echartsChr.length = 0
        }
        this.onlineS = true
        this.onlineOptions = res
        this.onlineOptions[0].onlineChr = res[0].vehicleList
      
        this.echartsOptions = res[0].vehicleList
        for(let i = 0; i <  this.echartsOptions.length; i++){
        this.echartsOptions[i].echartsChr = this.echartsOptions[i].deriverList
        }
      })

        getByGategory('00','车辆类型').then(res=>{
        this.options3[0].options = res
      })
      getByGategory('01','驾驶员类型').then(res=>{
        this.options3[1].options = res
      })

      //数据统计查询
      deriverAlarmCountTeamCode(this.companyCode,this.vehicleList[msg.i].teamCode,this.starData,this.endData).then(
        res=>{
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
                this.polar.series[1].data.push(element.alarmCount)
              });
              this.sumCount = res.sumCount
              this.polar.series[1].name = this.vehicleList[0].teamName
            
        }
      )

      //车队查询统计表格查询
      alarmStatTeamCode(1,30,this.companyCode,teamCodes,this.starData,this.endData,'01').then(res=>{
          this.tableListData = res
      })

    },
    // 选择车辆列表
    itemOpened(msg){
      let text = msg.e.target.innerText.substring(7,0)
      this.teamCodes = this.vehicleList[msg.i].teamCode
      if(this.itemEnd === msg.i){
          this.itemEnd = null
      }else{
          this.itemEnd =msg.i;
          msg.e.currentTarget.nextElementSibling.addClass = 'vehile-item-list-isopened'
      }
      msg.e.currentTarget.nextElementSibling.addClass = 'vehile-item-list-isopened'

      //所属三个驾驶员统计
      deriverVehicleAlarmCount(this.companyCode,this.teamCodes,text,this.starData,this.endData).then(res=>{
           if(res.derivers.length>0){
             this.vehicleNumbner = true
            this.onlineS = true
            this.polar.xAxis.data.length = 0 
            for(let i = 0; i<this.polar.series.length; i++){
              this.polar.series[i].data.length = 0;
            }

            res.derivers[0].alarms.forEach(element => {
                  this.polar.xAxis.data.push(element.alarmName)
            })

            for(let i = 0; i < res.derivers.length;i++){
              for(let c = 0; c < res.derivers[0].alarms.length; c++){
                this.polar.series[i].data.push(res.derivers[i].alarms[c].alarmCount)
              }
              this.polar.series[i].name = res.derivers[i].deriverName
            }
            this.driversD = res.derivers
            this.sumCount = res.sumCount
           }else{
             console.log('暂无数据')
           }
           
      })
      
    },

    //驾驶员选择查询
    echartshandleChange(val){
      this.vehicleNumbner = false
      this.valueCode = this.echartsOptionsModel[1]
      this.polar.xAxis.data = []
      for(let i = 0; i<this.polar.series.length; i++){
        this.polar.series[i].data = [];
      }
      console.log(val)
      deriverAlarmCountDeriverCode(this.companyCode,val[1],this.starData,this.endData).then(
              res=>{
                console.log(res)
                this.valueCode = this.echartsOptionsModel[1]
                res.resultMap.forEach(element => {
                  this.polar.xAxis.data.push(element.alarmName)
                  this.polar.series[1].data.push(element.alarmCount)
                });

                this.dataTime = val
                this.dataNumber = res.sumCount
              })
    },
    //车辆选这查询
     echartshandleItemChange(val){
      this.vehicleNumbner = true
      this.valueCode = val[0]
      this.echartsOptionsModel = val
      this.polar.xAxis.data = []
      for(let i = 0; i<this.polar.series.length; i++){
        this.polar.series[i].data = [];
      }
      //所属三个驾驶员统计
      deriverVehicleAlarmCount(this.companyCode,this.teamCodes,val,this.starData,this.endData).then(res=>{
           if(res.derivers.length>0){
             this.vehicleNumbner = true
            this.onlineS = true
            this.polar.xAxis.data.length = 0 
            for(let i = 0; i<this.polar.series.length; i++){
              this.polar.series[i].data.length = 0;
            }

            res.derivers[0].alarms.forEach(element => {
                  this.polar.xAxis.data.push(element.alarmName)
            })

            for(let i = 0; i < res.derivers.length;i++){
              for(let c = 0; c < res.derivers[0].alarms.length; c++){
                this.polar.series[i].data.push(res.derivers[i].alarms[c].alarmCount)
              }
              this.polar.series[i].name = res.derivers[i].deriverName
            }
            this.driversD = res.derivers
            this.sumCount = res.sumCount
           }else{
             console.log('暂无数据')
           }
           
      })
     },
     //图表时间选择
    dataMothe(val){
        if(this.echartsOptionsModel.length){
           if(this.valueCode){
            deriverAlarmCountVehicleCode(this.companyCode,this.valueCode,val+' 00:00:00',this.endData).then(
              res=>{
                console.log(this.valueCode)
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
          }else if(this.valueCode){
              deriverAlarmCountDeriverCode(this.companyCode,this.valueName,val+' 00:00:00',this.endData).then(
                res=>{
                  console.log(1)
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
     //地图配置
    handler({BMap, map}){
      
    },

    //表格车辆选择查询
    dlisthandleItemChange(){

    },

    //xAxis.data数据
    xAxisData(){
      this.polar.xAxis.data = this.xAxisD
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
  },
  computed: {
    skcolors() {
      if (this.rate > 0.5 || this.rate == 0.5) {
        return (this.skcolor = "#57a14d");
      } else {
        return (this.skcolor = "#d85b5b");
      }
    }
  },
  watch: {
    linew: function() {
      console.log(this.linew);
    }
  },
  mounted: function() {

    //----------getdatafunction-------//
    //图表查询默认时间（按照往后推7天）
    this.endData = getDay(0) + ' 23:23:59'
    this.starData = getDay(-6) + ' 00:00:00'

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
    //默认图表数据
    deriverAlarmCount(this.companyCode,this.teamCodeNumber,this.starData,this.endData).then(
      res=>{
        res.resultMap.forEach(element => {
                this.polar.xAxis.data.push(element.alarmName)
                this.polar.series[1].data.push(element.alarmCount)
              });
              this.sumCount = res.sumCount
              this.polar.series[1].name = this.vehicleList[0].teamName
              this.dirverTimeStart = this.starData
              this.dirverTimeEnd = this.endData
          
      }
    )

    //默认综合统计表格数据
    alarmStatAll(1,10,this.companyCode,this.teamCodeNumber,this.starData,this.endData,'01').then(res=>{
      if(res){      
        this.tableListData = res
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
  beforeDestroy:function(){
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