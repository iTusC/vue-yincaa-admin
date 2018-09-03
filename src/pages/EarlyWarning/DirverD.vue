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
                            value-format="yyyy-MM-dd"
                            :editable="false">
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
                
                <div ref="legend" class="legend" >
                    <p><span></span>时间：{{ dataTime }} </p>
                    <p><span></span>预警总次数:{{ sumCount }}次</p>
                    <p v-if="vehicleNumbner" v-for="items in driversD"><span></span>{{ items.deriverName }}:{{ items.deriverCount }}次</p>                  
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
            <!-- <template>
              <el-button type="text" @click="open" v-hidde></el-button>
            </template> -->
        </div>
        </el-scrollbar>
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
import VDaterange from "../../components/VDaterange";
import "echarts/lib/component/legend";
import invcat from "../../assets/invalid-name.png";
import invd from "../../assets/invalid-name2.png";
import {
  teamTree,
  searchByName,
  ByGategory,
  deriverAlarmCount,
  alarmStatTeamCode,
  deriverVehicleAlarmCount,
  alarmStat,
  alarmStatAlarmCode,
  alarmStatAll,
  getCompanyName
} from "../../api/getData";
import { getDay, getWeek } from "../../../static/js/data";
import Axios from "axios";
import _ from "lodash";
export default {
  data() {
    return {
      lod:true,
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
      tableListData: [],
      options: [],
      isshow: false,
      lng: 113.23,
      lat: 23.16,
      infoD: "", //驾驶员
      infoNP: "", //车牌号码
      infoTW: "", //报警类型
      infoWT: "", //时间
      infoL: "", //地点,
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
      resL: [], //车辆列表
      selectNumber: 0, //搜索结果数
      selectShow: false, //是否显示搜索结果
      selectNull: false, //搜索无结果时
      vehicleList: [], //车辆树
      ind: "", //车辆列表展开
      itemEnd: "", //车辆列表收起
      isListShow: "vehile-item-list-isopened", //车辆列表显示子导航
      companyCode: "", //车队查询id
      driversD: [], //驾驶员列表报警次数
      vehicleNumbner: false, //是否渲染驾驶员图例
      sumCount: "", //预警总次数
      endData: "", //默认结束时间
      starData: "", //默认开始时间
      // dirverTimeStart: "", //图例开始时间
      // dirverTimeEnd: "", //图例结束时间
      dataTime:"",
      onlineS: false, //查询显示隐藏
      onlineOptions: [
        {
          //下拉搜索列表
          onlineChr: []
        }
      ],
      echartsOptions: [
        {
          //下拉搜索列表
          echartsChr: []
        }
      ],
      onlineProps: {
        children: "onlineChr" //在线率自定义chr
      },
      echartsProps: {
        children: "echartsChr"
        // // value:'deriveName',
        // label:'value'//预警统计自定义chr
      },
      echartsOptionsModel: [], //预警图表下拉选择
      vechartsOptions: [], //报警类型选择
      egory: "", //预警选择
      value7: "",
      listOptionsModel: [], //表格车辆驾驶员选择
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
      teamCodes: "", //保存当前车队编号,
      deriverCodes: [], //驾驶员名称
      deriverData: [], //驾驶员数据详情
      xAxisD: [], //图表下列标签
      isshows: false,
      //列表报警类型配置
      options3: [
        // {
        //   label: "车辆预警类型",
        //   options: []
        // },
        {
          label: "驾驶员预警类型",
          options: []
        }
      ],
      teamCodeNumber: "1", //..
      gategorys: "65", //报警类别
      pageNumber: 1, //页码
      teamTreeCode: "", //树结构teamCode
      cd: false,
      listVehicle: "", //查询车辆
      listDirver: "", //查询驾驶员
      tableDataAlarms: [], //综合统计列表
      pageNumber: 1, //翻页，页数总览
      listPageNumber: 1, //详细翻页
      indexShowList:"",//保存点击的行数
      dd:false,//判断是驾驶员/车辆
      dataMonday:"",
      dataSunday:"",
      tableDatas:[],//保存公司
      comName:"广州鹰瞰信息科技公司",
      companyImage:"",
      usersname:"",
    };
  },
  methods: {
   
    //点击公司获取所有数据
    allData(){
      //获取车辆列表 搜索车辆个数
      this.getTeamTree({ companyId:this.companyCode });

      //默认获取下拉列表
      this.getSearchByName({ companyId:this.companyCode });

      //图表查询默认时间（按照往后推7天）
      this.endData = getDay(0) + " 23:23:59";
      this.starData = getDay(-6) + " 00:00:00";

      //默认获取预警统计echarts数据
      this.getDeriverAlarmCount({
        companyId:this.companyCode,
        startDate:this.starData,
        endDate:this.endData
      }),

      //默认综合统计表格数据
      this.getAlarmStatAll({
        pageNum: this.pageNumber,
        pageSize: 10,
        companyId: this.companyCode,
        startDate: this.starData,
        endDate: this.endData,
        atypeParent: this.gategorys
      })
    },
    //初始化Echarts图表数据
    eChartsPostion() {
      this.polar.xAxis.data.length = 0;
      for (let i = 0; i < this.polar.series.length; i++) {
        this.polar.series[i].data.length = 0;
      }
    },
    //初始化Echarts图表数据
    eChartsPostion() {
      this.polar.xAxis.data.length = 0;
      for (let i = 0; i < this.polar.series.length; i++) {
        this.polar.series[i].data.length = 0;
      }
    },
    open() {
      this.$alert("暂无数据内容", "消息提示", {});
    },
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
      pixel = null
    },
    isinfo(i) {},
    close() {
      this.isshow = false;
    },

    PcickValue(time) {

    },
    CBValue(value) {

    },
    //---------- get data function------------//

    //车辆树，搜索数据获取并显示结果
    handleSelect(item) {
      this.selectShow = true;
      this.getSearchByName({
        companyId: this.companyCode,
        name:item.value
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

    //条件车辆列表&&车辆在线率&&预警统计下拉选择
    //选择车队树
    showFun(msg) {
      let reg = /[\(（][^\)）]+[\)）]$/;
      let dirverName = msg.e.target.innerText;
      this.teamCodes = msg.tm;
      this.dName = dirverName.replace(reg, "").substring(1);
      if (this.ind === msg.i) {
        this.ind = null;
        // this.showFun.destroy()
      } else {
        this.ind = msg.i;
        this.onlineS = true;
      }
      //获取echarts数据
      this.getDeriverAlarmCount({
        companyId: this.companyCode,
        teamId: msg.tm,
        startDate: this.starData,
        endDate: this.endData
      });
      //获取预警统计列表数据
      this.getAlarmStatAll({
        pageNum: this.pageNumber,
        pageSize: 10,
        companyId: this.companyCode,
        teamId:msg.tm,
        startDate: this.starData,
        endDate: this.endData,
        atypeParent: this.gategorys
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
      if (this.vehicleNumbner) {
        this.vehicleNumbner = false;
      }

    },

    // 选择车辆列表
    itemOpened(msg) {
      
      this.vehicleNumbner = true;
      let text = msg.e.target.innerText.substring(7, 0);
      if (this.itemEnd === msg.i) {
        this.itemEnd = null;
      } else {
        this.itemEnd = msg.i;
        // msg.e.currentTarget.nextElementSibling.addClass = 'vehile-item-list-isopened'
      }
      //点击车辆获取echarts数据
      this.getDeriverVehicleAlarmCount({
        companyId: this.companyCode,
        teamId:msg.tm,
        vehicleId: msg.di,
        startDate: this.starData,
        endDate: this.endData
      });
      //点击获取表格数据
      this.getAlarmStatAll({
        pageNum: this.pageNumber,
        pageSize: 10,
        companyId: this.companyCode,
        vehicleId: msg.di,
        startDate: this.starData,
        endDate: this.endData,
        atypeParent: this.gategorys
      });
      
    },
    //echarts驾驶员选择查询
    echartshandleChange(val) {
      this.cd = true;
      this.vehicleNumbner = false;
      this.valueCode = this.echartsOptionsModel[1];
      this.getDeriverAlarmCount({
        companyId: this.companyCode,
        deriverId: this.valueCode,
        startDate: this.starData,
        endDate: this.endData
      })
      
    },
    //echarts车辆选这查询
    echartshandleItemChange(val) {
      this.cd = false;
      this.vehicleNumbner = true;
      this.valueCode = val[0];
      this.echartsOptionsModel = val;
      this.getDeriverVehicleAlarmCount({
        companyId: this.companyCode,
        teamId:this.teamCodes,
        vehicleId: this.valueCode,
        startDate: this.starData,
        endDate: this.endData
      })
    },
    //echarts时间选择
    dataMothe(val) {
      if (this.onlineS) {
        if (this.valueCode && this.cd) {
          this.getDeriverAlarmCount({
            companyId: this.companyCode,
            vehicleId: this.valueCode,
            startDate: this.selectData + " 00:00:00",
            endDate: this.endData
          });
          this.dataTime =  val + " 00:00:00"+ "-" + this.endData
        } else if (this.valueCode && !this.cd) {
          this.getDeriverAlarmCount({
            companyId: this.companyCode,
            deriverId: this.valueCode,
            startDate: this.selectData + " 00:00:00",
            endDate: this.endData
          });

          this.dataTime =  val + " 00:00:00"+ "-" + this.endData
        }
      } else {
        this.getDeriverAlarmCount({
          companyId: this.companyCode,
          startDate: this.selectData + " 00:00:00",
          endDate: this.endData
        });
        this.dataTime =  val + " 00:00:00"+ "-" + this.endData
      }
 
    },
    //预警列表，点击地点获取地图预警定位信息
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
          gategory:this.gategorys,
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
        this.$router.push({name:'DDdetail',params:{id:listidArray,dataMonday:this.dataMonday,dataSunday:this.dataSunday,tableDatas:this.tableDatas,companyIds:this.companyCode,atypeParent:65}});
      }else{
        this.$router.push({name:'DDdetail',params:{id:listidArray,dataMonday:this.starData,dataSunday:this.endData,tableDatas:this.tableDatas,companyIds:this.companyCode,atypeParent:65}});
      }
    },
    /** 数据获取方法 */
    //获取车辆树结构
    async getTeamTree(params, select = false, vehicle = false) {
      let res = await teamTree(params);
      if (res.status === 200) {
        if (select) {
          this.dName = res.data[0].teamName;
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
    //获取驾驶员预警统计echarts"
    async getDeriverAlarmCount(params) {
      let res = await deriverAlarmCount(params);
      this.eChartsPostion();
      if (res.status === 200) {
        res.data.resultMap.forEach(element => {
          this.polar.xAxis.data.push(element.atpyeName);
          this.polar.series[1].data.push(element.alarmCount);
        });
        this.sumCount = res.data.sumCount
        this.polar.series[1].name = this.vehicleList[0].teamName
      }

    },
    async getDeriverVehicleAlarmCount(params){
      let res = await deriverVehicleAlarmCount(params);
      this.eChartsPostion();
      if (res.status === 200) {
        res.data.derivers[0].alarms.forEach(element => {
          this.polar.xAxis.data.push(element.atypeName);
          for (let i = 0; i < res.data.derivers.length; i++) {
            for (let c = 0; c < res.data.derivers[0].alarms.length; c++) {
              this.polar.series[i].data.push(
                res.data.derivers[i].alarms[c].alarmCount
              );
            }
            this.polar.series[i].name = res.data.derivers[i].deriverName;
          }
        });
        this.driversD = res.data.derivers;
        this.sumCount = res.data.sumCount;
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
      if (res.status === 200) {
        // this.options3[0].options = res.data;
        let respons = await ByGategory(i);
        if (respons.status === 200) {
          let arr = []
          for(let i = 0; i<respons.data.length;i++){
            if(respons.data[i].atypeParent && respons.data[i].atypeParent == "65"){
                arr.push(respons.data[i]);
            }
          }

          this.options3[0].options = arr;
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
    //获取点击teamcode
    getTeamCode: async function(params) {
      let res = await teamTree(params);
      this.teamTreeCode = res;
    }
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
  // beforeDestroy:function(){
  //   this.handleSelect.destroy()
  //   this.showFun.destroy()
  //   this.itemOpened.destroy()
  //   this.handleChange.destroy()
  //   this.handleItemChange.destroy()
  //   this.echartshandleChange.destroy()
  //   this.dataMothe.destroy()
  //   this.getLocation.destroy()
  //   this.pcickValue.destroy()
  //   this.listhandleChange.destroy()
  //   this.listhandleItemChange.destroy()
  //   this.getAlarmCode.destroy()
  //   this.getByGategory.destroy()
  // },
  watch: {
    linew: function() {
      // console.log(this.linew);
    },
  },
  created: function() {
    this.getCookie();
    this.getCompos({
      username:this.usersname
    })
    //----------getdatafunction-------//
    //图表查询默认时间（按照往后推7天）
    this.endData = getDay(0) + " 23:23:59";
    this.starData = getDay(-6) + " 00:00:00";

    //图表图例时间
    this.dataTime = this.starData+ '-' +this.endData

    Axios.all([
      //获取车辆列表 搜索车辆个数
      this.getTeamTree({ companyId: this.companyCode }),
      //默认获取下拉列表
      this.getSearchByName({ companyId: this.companyCode }),
      //默认图表数据
      this.getDeriverAlarmCount({
        companyId: this.companyCode,
        startDate: this.starData,
        endDate: this.endData
      }),
      //默认综合统计表格数据
      this.getAlarmStatAll({
        pageNum: this.pageNumber,
        pageSize: 10,
        companyId: this.companyCode,
        startDate: this.starData,
        endDate: this.endData,
        atypeParent: this.gategorys
      })
    ]);

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
    // legend = null 
    // width = null
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
.yc-list {
  width: 240px;
  float: left;
  height: 100%;
}
.yc-cd-mains {
  height: 100%;
  margin-left: 20px;
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
.legend p span {
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