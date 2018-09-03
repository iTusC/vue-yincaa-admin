<template>
    <div style="height:100%;overflow:hidden">
        <keep-alive>
          <router-view ></router-view>
        </keep-alive>
        <div class="yc-list">
          <div class="yc-velist-main">
            <div class="yc-velist">
                <div class="yc-velist-title" @click="allData">
                    <img :src="companyImage" alt="">
                    <h3>{{ comName }}</h3>
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
                            value-format="yyyy-MM-dd"
                            :editable="false"
                            :clearable="false">
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

                <div class="legend" ref="legend">
                    <p><span></span>时间：{{ dataTime }}</p>
                    <p><span></span>预警总次数{{ dataNumber }}次</p>
                </div>
                <chart :options="polar" :autoResize="true"></chart>
            </section>
            <section class="cd-map">
                <div class="cd-map-title">
                    <h3>预警统计列表</h3>
                </div>
                <baidu-map class="map" center="广州"   :scroll-wheel-zoom="false" :map-click="false"  :center="{lng:lng, lat:lat }" @ready="handler"   :zoom="zoom" >
                  <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
                  <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                  <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
                  <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic>
                    <bml-marker-clusterer :averageCenter="true" >
                        <template v-for="marker in tableDataAlarms">
                              <bm-marker :position="{lng:marker.longitude, lat:marker.latitude }" @click="coninfo($event,index)" :zoom="zoom" >
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
                                  :options="echartsOptions"
                                  v-model="listOptionsModel"
                                  @change="listhandleChange"
                                  @active-item-change="listhandleItemChange"
                                  size="mini"
                                  :props="echartsProps"
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
                                      :key="item.atypeName"
                                      :label="item.atypeName"
                                      :value="item.atypeId">
                                    </el-option>
                                  </el-option-group>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <div class="ul-itme">
                    <cd-table @getLocation="getLocation" :tableListDatas="tableListData" :tableTitle="tableTitle" :tableH="tableH" @getDateil="getDateil" :lod="lod"></cd-table>
                </div>
            </section>
        </div>
         </el-scrollbar>
    </div>
</template>

<script>
import VehicleMenu from "../../components/VehicleMenu";
import VehicleList from "../../components/VehicleList";
import { BmlMarkerClusterer } from "vue-baidu-map";
import MapBox from "../../components/MapBox";
import OnlineRate from "../../components/OnlineRate";
import CdTable from "../../components/Table";
import DatePicker from "../../components/DatePicker";
import Selects from "../../components/Selects";
import DateW from "../../components/Datew";
import "echarts/lib/component/legend";
import echarts from "echarts";
import invcat from "../../assets/invalid-name.png";
import invd from "../../assets/invalid-name2.png";
// import '../../mock/mock'
import {
  teamTree,
  searchByName,
  teamTreeSelect,
  composAlarmCount,
  onlineRateAll,
  onlineRate,
  getCompanyName,
  alarmCompsStat,
  alarmCompsStatVehicle,
  ByGategory,
  vehicleAlarmCount,
  alarmStatAll,
  alarmStat,
  alarmStatTeamCode,
  alarmStatAlarmCode
} from "../../api/getData";
import { getDay, getWeek } from "../../../static/js/data";
export default {
  data() {
    return {
      //预计图表筛选
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", start);
            }
          }
        ]
      },
      selectData: "",
      //列表报警类型配置
      options3: [
        {
          label: "车辆预警类型",
          options: []
        },
        // {
        //   label: "驾驶员预警类型",
        //   options: []
        // }
      ],
      value7: "",
      //数据统计表配置
      polar: {
        title: {
          text: "粤运化工",
          show: false
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          show: false,
          selectedMode: false,
          left: "center",
          top: 15,
          itemWidth: 18,
          itemHeigth: 18,
          padding: 0,
          itemGap: 30,
          symbolKeepAspect: false,
          data: []
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
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
          }
          // axisLabel:{
          //   interval:0,
          //   rotate:40
          // }
        },
        yAxis: {
          name: "次数          ",
          nameGap: 26,
          nameTextStyle: {
            align: "center",
            color: "#656565"
          },
          boundaryGap: ["0%", "0%"],
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
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#f4d466" },
                  { offset: 1, color: "#e5a936" }
                ])
              }
            }
          }
        ],
        animationDuration: 1000
      },
      tableTitle: [
        {
          vul: "deriveName",
          title: "驾驶员"
        },
        {
          vul: "vehicleCode",
          title: "车牌号"
        },
        {
          vul: "atpyeName",
          title: "预警类型"
        },
        {
          vul: "alarmTime",
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
      tableListData: [],
      vehicleList: [],
      onlineOptions: [
        {
          onlineChr: []
        }
      ],
      echartsOptions: [
        {
          echartsChr: []
        }
      ],
      tableData: [],
      isshow: false,
      isshows: true,
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
      onlineRate: {},
      rate: 1, //在线率
      skcolor: "",
      onlineD: true, //车辆在线率与车辆在线,
      onlineone: 0, //在线与离线
      legendWith: 0, //图例居中显示
      isListShow: "vehile-item-list-isopened", //车辆列表显示子导航
      resL: [],
      ind: "", //车辆列表展开，
      itemEnd: "", //车辆列表收起
      companyCode: "", //车队查询id
      selectNumber: 0, //搜索结果数
      selectShow: false, //是否显示搜索结果
      selectNull: false, //搜索无结果时
      dName: "", //车辆参数查询
      deriverSum: "", //驾驶员人数
      deriverisOnline: 0, //车辆在线情况
      selectedOptions: [],
      onlineProps: {
        children: "onlineChr" //在线率自定义chr
      },
      echartsProps: {
        children: "echartsChr"
        // // value:'deriveName',
        // label:'value'//预警统计自定义chr
      },
      onlineS: false, //显示搜索框
      starData: "", //默认开始时间
      endData: "", // 默认结束时间
      echartsOptions: [], //预警统计mode
      echartsOptionsModel: [], //预警图表下拉选择
      listOptionsModel: [], //预警图表下拉选择
      ishowDLegend: true, //图例
      ishowVLegend: true,
      valueDate: "", //周日期控件选择
      valueCode: "", //图表查询时value
      tabletimestart: "", //统计列表时间
      tabletimeend: "", //统计列表结束时间
      alarmCode: "", //报警类型
      dataTime: "", //图例开始时间
      dataNumber: "", //图例报警个数
      valueName: "", //车辆
      teamCodeNumber: "1",
      pageNumber: 1, //页码
      gategorys: "64", //报警类别
      dd:false,//判断显示车辆/车队
      listPageNumber:1,//页码
      dataMonday:"",
      dataSunday:"",
      tableDatas:[],//保存公司
      comName:"广州鹰瞰信息科技公司",
      companyImage:"",
      usersname:"",
      lod:true
    };
  },
  methods: {
    
     //点击公司获取所有数据
    allData(){
      //获取车辆列表 搜索车辆个数
      this.getTeamTree({ companyId: this.companyCode });

      //默认获取下拉列表
      this.getSearchByName({ companyId: this.companyCode });

      //默认获取车辆在线数
      this.getOnlineRateAll({ companyId: this.companyCode });

      //图表查询默认时间（按照往后推7天）
      this.endData = getDay(0) + " 23:23:59";
      this.starData = getDay(-6) + " 00:00:00";

      //默认获取预警统计echarts数据
      this.getComposAlarmCount({
        companyId: this.companyCode,
        startDate: this.starData,
        endDate: this.endData
      });

      //默认综合统计表格数据
      this.getAlarmCompsStat({
        pageNum: this.pageNumber,
        pageSize: 10,
        companyId: this.companyCode,
        startDate: this.starData,
        endDate: this.endData
      });
    },
    //初始化Echarts图表数据
    eChartsPostion() {
      this.polar.xAxis.data.length = 0;
      for (let i = 0; i < this.polar.series.length; i++) {
        this.polar.series[i].data.length = 0;
      }
    },
    //地图弹框显示位置
    coninfo(e, i) {
      this.isshow = true;
      this.lng = e.point.lng;
      this.lat = e.point.lat;
      this.infotext = this.markers[i].text;
    },
    //地图配置
    handler({ BMap, map }) {},
    //地图弹框显示位置
    draw({ el, BMap, map }) {
      let pixel = map.pointToOverlayPixel(new BMap.Point(this.lng, this.lat));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
    //地图预警定位
    getLocation(row) {
      this.zoom = 34;
      this.isshow = true;
      this.lng = row.longitude;
      this.lat = row.latitude;
      this.infoD = row.deriveName;
      this.infoNP = row.vehicleCode;
      this.infoTW = row.atpyeName;
      this.infoWT = row.alarmTime;
      this.infoL = row.locationDesc;
    },
    isinfo(i) {
    },
    //地图关闭弹框
    close() {
      this.isshow = false;
    },
    //车辆列表树，搜索框键盘事件enter搜索
    Subm(item) {
      if (item) {
        this.getTeamTree({ companyId: this.companyCode, name: item });
      } else {
        this.getTeamTree({ companyId: this.companyCode });
      }
    },
    //实时车辆在线率筛选框，点击车辆查询
    handleChange(val) {
      this.onlineD = false;
      let text = "";
      this.onlineOptions[0].onlineChr.map((value,key,arr)=>{
        if(val[1] == value.value){
           text =  value.vehicleCode
        }
      });
      this.getTeamTree(
        { companyId: this.companyCode, name: text },
        true
      );
    },
    //实时车辆在线率筛选框，点击车队查询
    handleItemChange(val) {
      this.selectedOptions = val;
      this.onlineD = true;
      this.getOnlineRateAll({
        companyId: this.companyCode,
        teamId: val[0]
      });
    },
    //预警车辆选择统计
    echartshandleChange(value) {
      this.dd = true
      this.valueName = value[1];
      this.valueCode = this.echartsOptionsModel[1];
      this.getComposAlarmCount({
        companyId:this.companyCode,
        vehicleId:value[1],
        startDate:this.starData,
        endDate: this.endData
      })
    },
    //预警车队选择
    echartshandleItemChange(val) {
      this.valueCode = val;

      this.echartsOptionsModel = val;
      this.getComposAlarmCount({
        companyId: this.companyCode,
        teamId:this.valueCode[0],
        startDate: this.starData,
        endDate: this.endData
      })
    },
    //图表时间选择
    dataMothe(val) {
      if (this.selectData) {
        if (this.valueCode && this.dd) {
          this.getComposAlarmCount({
            companyId: this.companyCode,
            vehicleId:this.valueCode,
            startDate: val+" 00:00:00",
            endDate: this.endData
          })
          this.dataTime =  val+" 00:00:00" + '-' +this.endData
        } else if (this.valueName) {
            this.getComposAlarmCount({
              companyId: this.companyCode,
              teamId:this.valueName,
              startDate: val+" 00:00:00",
              endDate: this.endData
          })
          this.dataTime =  val+" 00:00:00" + '-' +this.endData
        } else {
          this.getComposAlarmCount({
              companyId: this.companyCode,
              startDate: val+" 00:00:00",
              endDate: this.endData
          })
          this.dataTime =  val
        }
      }
    },
   

    //车辆树，搜索数据获取并显示结果
    handleSelect(item) {
      this.selectShow = true;
      this.getSearchByName({
        companyId: this.companyCode,
        name: item.value
      });
      this.getTeamTree({ companyId: this.companyCode, name: item.value });
    },
    //车辆列表树，搜索框键盘事件enter搜索
    Subm(item) {
      if (item) {
        this.getTeamTree({ companyId: this.companyCode, name: item });
      } else {
        // this.getTeamTree({ companyId: this.companyCode });
        return false
      }
    },
    //点击车队，按照车队查询获取在线率&&预警统计&&预警表格数据
    showFun(msg) {
      let reg = /[\(（][^\)）]+[\)）]$/;
      let dirverName = msg.e.target.innerText;
      this.onlineS = true; //显示预警筛选框
      this.onlineD = true; //预警显示切换
      this.ishowVLegend = true;
      this.ishowDLegend = true;
      this.teamCode = this.vehicleList[msg.i].teamId;
      this.dName = dirverName.replace(reg, "").substring(1);
      if (this.ind === msg.i) {
        this.ind = null;
      } else {
        this.ind = msg.i;
      }
      this.eChartsPostion();
      //获取表格预警数据
      this.getAlarmStatAll({
        pageNum: this.pageNumber,
        pageSize: 10,
        companyId: this.companyCode,
        teamId: this.vehicleList[msg.i].teamId,
        startDate: this.starData,
        endDate: this.endData,
        atypeParent:this.gategorys
      });
      //切换车队在线率
      this.getOnlineRateAll({
        companyId: this.vehicleList[msg.i].companyId,
        teamId: this.vehicleList[msg.i].teamId
      });
      //获取下拉选择列表的value值
      this.getTeamTree(
        {
          companyId: this.vehicleList[msg.i].companyId,
          name: this.dName
        },
        false,
        true
      );

      //获取预警列表预警类型value
      this.getByGategory({ gategory: "64" }, { gategory: "65" });
    },
    //点击车辆树，驾驶员树并根据点击的车辆信息查询在线、预计统计、预警统计列表数据
    itemOpened(msg) {
      let text = msg.e.target.innerText.substring(7, 0);
      this.ishowVLegend = false;
      this.ishowDLegend = true;
      if (this.itemEnd === msg.i) {
        this.itemEnd = null;
      } else {
        this.itemEnd = msg.i;
        msg.e.currentTarget.nextElementSibling.addClass =
          "vehile-item-list-isopened";
      }
      msg.e.currentTarget.nextElementSibling.addClass =
        "vehile-item-list-isopened";
      this.onlineD = false;
      //点击查询车辆在线情况
      this.getTeamTree({ companyId: this.companyCode, name: text }, true);
      //综合echarts,点击车辆查询统计
      this.getComposAlarmCount(
        {
          companyId: this.companyCode,
          vehicleId: msg.di,
          startDate: this.starData,
          endDate: this.endData
        },
        true
      );
      //综合预警表格统计
      this.getAlarmStatAll({
        pageNum: this.pageNumber,
        pageSize: 10,
        companyId: this.companyCode,
        teamId: msg.tm,
        vehicleId: msg.di,
        startDate: this.starData,
        endDate: this.endData,
        atypeParent:this.gategorys,
      });
    },
   
    //预警统计列表，点击筛选时间获取数据
    pcickValue(time) {
      this.tabletimestart = time[0] + " 00:00:00";
      this.tabletimeend = time[1] + " 23:59:59";
      this.dataMonday = time[0] + " 00:00:00";
      this.dataSunday = time[1] + "23:59:59";
      if (!this.onlineS) {
        this.getAlarmStatAll({
          pageNum: this.listPageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          startDate: this.tabletimestart,
          endDate: this.tabletimeend,
          atypeParent:this.gategorys
        });
      } else if (!this.listVehicle == "" && this.alarmCode == "") {
        this.getAlarmStatAll({
          pageNum: this.listPageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          vehicleId: this.listVehicle,
          startDate: this.tabletimestart,
          endDate: this.tabletimeend,
          atypeParent:this.gategorys
        });
      } else if (!this.listDirver == "" && this.alarmCode == "") {
        this.getAlarmStatAll({
          pageNum: this.listPageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          deriverId: this.listDirver,
          startDate: this.tabletimestart,
          endDate: this.tabletimeend,
          atypeParent:this.gategorys
        });
      } else if (!this.listVehicle == "" && this.alarmCode !== "") {
        this.getAlarmStatAll({
          pageNum: this.listPageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          vehicleId: this.listVehicle,
          startDate: this.tabletimestart,
          endDate: this.tabletimeend,
          atypeParent:this.gategorys,
          atypeId: this.alarmCode
        });
      } else if (!this.listDirver == "" && this.alarmCode !== "") {
        this.getAlarmStatAll({
          pageNum: this.listPageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          deriverId: this.listDirver,
          startDate: this.tabletimestart,
          endDate: this.tabletimeend,
          atypeParent:this.gategorys,
          atypeId: this.alarmCode
        });
      } else {
        this.getAlarmStatAll({
          pageNum: this.listPageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          startDate: this.tabletimestart,
          endDate: this.tabletimeend,
          atypeParent:this.gategorys
        });
      }
    },
    //预警统计列表，点击驾驶员筛选获取数据
    listhandleChange(val) {
      this.dd = false;
      this.listVehicle = val[0]; //查询车辆
      this.listDirver = val[1]; //查询驾驶员
      //如果时间筛选为真
      if (this.tabletimestart || this.tabletimeend) {
        this.getAlarmStatAll({
          pageNum: this.pageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          deriverId: val[1],
          startDate: this.tabletimestart,
          endDate: this.tabletimeend,
          atypeParent:this.gategorys
        });
      } else if (this.tabletimestart || this.tabletimeend || this.value7) {
        this.getAlarmStatAll({
          pageNum: this.pageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          deriverId: val[1],
          startDate: this.tabletimestart,
          endDate: this.tabletimeend,
          atypeParent:this.gategorys,
          atypeId: this.value7
        });
      } else {
        this.getAlarmStatAll({
          pageNum: this.pageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          deriverId: val[1],
          startDate: this.starData,
          endDate: this.endData,
          atypeParent:this.gategorys
        });
      }
       
    },
    //预警统计列表，点击车辆获取数据
    listhandleItemChange(val) {
      this.dd = true
      this.listOptionsModel = val;
      //判断时间筛选是否为真
      if (this.tabletimestart || this.tabletimeend) {
        this.getAlarmStatAll({
          pageNum: this.pageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          vehicleId: val[0],
          startDate: this.tabletimestart,
          endDate: this.tabletimeend,
          atypeParent:this.gategorys
        });
      } else {
        this.getAlarmStatAll({
          pageNum: this.pageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          vehicleId: val[0],
          startDate: this.starData,
          endDate: this.endData,
          atypeParent:this.gategorys
        });
      }
    },
    //预计统计列表，点击预警类型获取数据
    getAlarmCode() {
      this.alarmCode = this.value7;
      if(this.listOptionsModel && this.dd){
        this.getAlarmStatAll({
          pageNum: this.listPageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          vehicleId: this.listOptionsModel,
          startDate: this.starData,
          endDate: this.endData,
          atypeParent:this.gategorys,
          atypeId:this.value7
        });
      }else if(!this.dd && this.listOptionsModel){
        this.getAlarmStatAll({
          pageNum: this.listPageNumber,
          pageSize: 10,
          companyId: this.companyCode,
          deriverId: this.listDirver,
          startDate: this.starData,
          endDate: this.endData,
          atypeParent:this.gategorys,
          atypeId:this.value7
        });
      }
    },
    getDateil(id){
      let alarmN = this.tableListData[id.id].alarmNo;
      let listidArray = {id:alarmN,index:id.id}
      this.tableDatas = this.tableListData[id.id]

      if(this.dataMonday != ''){
        this.$router.push({name:'VDdetail',params:{id:listidArray,dataMonday:this.dataMonday,dataSunday:this.dataSunday,tableDatas:this.tableDatas,companyIds:this.companyCode,atypeParent:64}});
      }else{
        this.$router.push({name:'VDdetail',params:{id:listidArray,dataMonday:this.starData,dataSunday:this.endData,tableDatas:this.tableDatas,companyIds:this.companyCode,atypeParent:64}});
      }
    },
    //读取cookie
		getCookie:function () {
			if (document.cookie.length>0) {
			var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
			for(var i=0;i<arr.length;i++){
				var arr2=arr[i].split('=');//再次切割
				//判断查找相对应的值
				 if (arr2[0] == 'userName') {
            this.usersname = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == 'companyId') {
            this.companyCode = arr2[1];
          }
				}
			}
		},
     //获取公司名
    async getCompos(params) {
      let res = await getCompanyName(params);
      if(res.status == 200){
        this.companyCode = res.data.companyId
        this.comName = res.data.companyName
        this.companyImage = "http://47.106.196.228:8888/" + res.data.logoPath
      }
    },
        ///***** getDateFunction ****/
    //获取车辆树结构
    async getTeamTree(params, select = false, vehicle = false) {
      let res = await teamTree(params);
      if (res.status === 200) {
        if (select) {
          this.dName = res.data[0].teamName;
          this.deriverSum = res.data[0].vehicleList[0].deriverSum;
          this.deriverisOnline = res.data[0].vehicleList[0].isOnline;
          this.onlineone = res.data[0].vehicleList[0].isOnline;
        } else if (vehicle) {
          this.onlineOptions = res.data;
          this.onlineOptions[0].onlineChr = res.data[0].vehicleList;
          this.echartsOptions = res.data[0].vehicleList;
          for (let i = 0; i < this.echartsOptions.length; i++) {
            this.echartsOptions[i].echartsChr = this.echartsOptions[
              i
            ].deriverList;
          }
        } else {
          this.selectNull = true;
          this.vehicleList = res.data;
          this.selectNumber = res.data.length;
        }
      }
      res = null;
    },
    //获取车辆搜索下拉列表
    async getSearchByName(params) {
      let res = await searchByName(params);
      if (res.status === 200) {
        this.resL = res.data;
      }
      res = null;
    },
    //获取这车辆在线数
    async getOnlineRateAll(params, vehicle = false) {
      let res = await onlineRateAll(params);
      //判断是否是车辆查询在线数
      if (res.status === 200) {
        if (vehicle) {
          this.deriverSum = res.data.vehicleList.deriverSum;
          this.deriverisOnline = res.data.vehicleList.isOnline;
          this.onlineone = res.data.vehicleList.isOnline;
        } else {
          this.onlineRate = res.data;
          this.rate = res.data.onLineRate;
        }
      }
      res = null;
    },
    //获取预警统计数据
    async getComposAlarmCount(params) {
      let res = await vehicleAlarmCount(params);
      this.eChartsPostion();
      this.valueCode = this.echartsOptionsModel[1]
      if (res.status === 200) {
          res.data.resultMap.forEach(element => {
              this.polar.xAxis.data.push(element.atpyeName)
              this.polar.series[0].data.push(element.alarmCount)
            });
            this.dataNumber = res.data.sumCount
        }
        res = null;
      },
   //获取统计表格数据
    async getAlarmStatAll(params) {
      let res = await alarmStatAll(params);
      if (res.status === 200) {
        this.tableListData = res.data;
        this.lod = false
      }
    },
    //获取综合统计表格车辆类型筛选条件
    async getByGategory(params, i) {
      let res = await ByGategory(params);
      let dataarr = []
         if (res.status === 200) {
          let arr = []
          for(let i = 0; i<res.data.length;i++){
            if(res.data[i].atypeParent && res.data[i].atypeParent == "64"){
                arr.push(res.data[i]);
            }
          }

          this.options3[0].options = arr;
        }
        // let respons = await ByGategory(i);
        // if (respons.status === 200) {
        //   this.options3[1].options = respons.data;
        // }
      }
  },

  created: function() {
    this.getCookie();
    this.getCompos({
      username:this.usersname
    })
    //图表查询默认时间（按照往后推7天）
    this.endData = getDay(0) + " 23:23:59";
    this.starData = getDay(-6) + " 00:00:00";

    //图表图例时间
     this.dataTime = this.starData+ '-' +this.endData

    //获取车辆列表 搜索车辆个数
    this.getTeamTree({ companyId: this.companyCode });

    //默认获取下拉列表
    this.getSearchByName({ companyId: this.companyCode });

    //默认获取车辆在线数
    this.getOnlineRateAll({ companyId: this.companyCode });

    //默认综合统计表格数据
    this.getAlarmStatAll({
      pageNum: this.pageNumber,
      pageSize: 10,
      companyId: this.companyCode,
      startDate: this.starData,
      endDate: this.endData,
      atypeParent: this.gategorys
    })
    //默认echarts数据列表
    this.getComposAlarmCount({
      companyId: this.companyCode,
      startDate: this.starData,
      endDate: this.endData
    })

  },
  computed: {
    skcolors() {
      if (this.rate > 0.5 || this.rate == 0.5 || this.onlineone) {
        return (this.skcolor = "#57a14d");
      } else {
        return (this.skcolor = "#d85b5b");
      }
    }
  },
  watch: {
    linew: function() {}
  },
  updated() {
    //预统计图表图例位置
    // let legend = this.$refs.legend;
    // let width =
    //   legend.style.width ||
    //   legend.clientWidth ||
    //   legend.offsetWidth ||
    //   legend.scrollWidth;
    // this.legendWith = width / 2;
  },
  beforeDestroy: function() {
    this.onlineS = false;
    this.polar.series[0].data.length = 0;
    this.isshow = false;
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
  cursor: pointer;
}
.yc-velist-title img {
  width: 32px;
  height: 32px;
  border-radius: 16px;
  float: left;
  margin: 16px 0 0 16px;
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
   width: 174px;
  text-align: left
}
.yc-select {
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
.infooff {
  background-color: #c7c7c7;
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
.legend {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: inline-table;
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
.legend p:last-child span {
  background-image: url("../../assets/invalid-name2.png");
  background-repeat: no-repeat;
}
.legend p:first-child span {
  background-image: url("../../assets/invalid-time.png");
  background-repeat: no-repeat;
}
</style>


// WEBPACK FOOTER //
// src/pages/EarlyWarning/VehicleD.vue