<template>
<el-scrollbar style="height:100%;" class="yc-scrollbar">
    <div class="detail-main">
        
        <div class="detail-m">
            <baidu-map class="map" center="广州"   :scroll-wheel-zoom="true" :map-click="false"  :center="{lng:lng, lat:lat }"  :zoom="zoom" >
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
                <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic>
                <bml-marker-clusterer :averageCenter="true" >
                    <bm-marker :position="{lng:lng, lat:lat }"  :zoom="zoom" >
                    </bm-marker> 
                </bml-marker-clusterer>   
                <map-box :position="{lng:lng, lat:lat}">
                    <!-- <i @click="close">x</i> -->
                    <p class="info"  >驾驶员：{{ infoD }}</p>
                    <p class="info"  >车牌号：{{ infoNP }}</p>
                    <p class="info"  >报警时间：{{ infoWT }}</p>
                    <p class="info"  >报警类型：{{ infoTW }}</p>
                    <p class="info"  >报警地点：{{ infoL }}</p>
                </map-box>
            </baidu-map>
            <aside class="page-turning">
                    <div class="pages-next" @click="back"><i class="el-icon-back"></i><span > 返回列表</span></div>
                    <div class="pages-next" @click="onNext"><span >下一条预警</span><i class="el-icon-arrow-right"></i></div>
                    <div class="pages-prea" @click="onPrevious"><i class="el-icon-arrow-left" :style="col?color='#fff':color='#333'" ></i><span >上一条预警</span></div>
            </aside>
            
                <div class="detail-main-info">
                    
                    <section  class="detail-page-main border-bottom">
                        <article class="detail-main-warning">
                            <h3>预警信息(编号38992994910400)</h3>
                            <ul class="detail-warning-del">
                                <li>
                                    <span class="detail-warning-title">预警类别</span>
                                    <p class="detail-warnig-text">{{ pid === 64 ? '车辆预警':'驾驶员预警' }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">预警子类型</span>
                                    <p class="detail-warnig-text">{{ atpyeName }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">预警上报时间</span>
                                    <p class="detail-warnig-text">{{ startDate }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">预警结束时间</span>
                                    <p class="detail-warnig-text">{{ endDate }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">终端机编号</span>
                                    <p class="detail-warnig-text">{{ terminalNo }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">经纬度</span>
                                    <p class="detail-warnig-text">{{ longitude + "-" + latitude }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">海拔高度</span>
                                    <p class="detail-warnig-text">{{ altitude }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">当前车速</span>
                                    <p class="detail-warnig-text">{{ speed }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">驾驶员</span>
                                    <p class="detail-warnig-text">{{ deriverName }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">车牌号</span>
                                    <p class="detail-warnig-text">{{ vehicleCode }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">所属车队</span>
                                    <p class="detail-warnig-text">{{ teamName }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">从属公司</span>
                                    <p class="detail-warnig-text">{{ subordinate }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">预警地点</span>
                                    <p class="detail-warnig-text">{{ locationDesc }}</p>
                                </li>
                            </ul>
                            <article class="detail-main-photo">
                                <h4 class="detail-warning-title">预警照片</h4>
                                <ul>
                                    <li v-for="(item,i) in imagesList" :key="i">
                                        <img :src="item"  class="detail-main-images" @click.self="zommImages($event)">
                                    </li>
                                </ul>
                            </article>
                            <article class="detail-main-video">
                                <h4 class="detail-warning-title">预警视频</h4>
                                <video controls="" name="media" @click.self="" class="detail-warning-video" v-if="videoShow">
                                    <source :src="videos" type="video/mp4">
                                </video>
                            </article>
                        </article>
                    </section>      
                    <section  class="detail-page-main border-bottom">
                        <article class="detail-main-warning">
                            <h3>车辆信息</h3>
                            <ul>
                                <li>
                                    <span class="detail-warning-title">车辆ID</span>
                                    <p class="detail-warnig-text">{{ vehicleId }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">车牌号</span>
                                    <p class="detail-warnig-text">{{ vehicleCode }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">发证机关</span>
                                    <p class="detail-warnig-text">{{ issuingAuthority }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">车牌种类</span>
                                    <p class="detail-warnig-text">{{ licensePlateType }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">车辆型号</span>
                                    <p class="detail-warnig-text">{{ VehicleModel}}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">车辆颜色</span>
                                    <p class="detail-warnig-text">{{ color }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">车属行业</span>
                                    <p class="detail-warnig-text">{{ carIndustry }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">车辆创建时间</span>
                                    <p class="detail-warnig-text">{{ creationTime }}</p>
                                </li>
                                
                            </ul>
                        </article>
                    </section>
                     <section  class="detail-page-main">
                        <article class="detail-main-warning">
                            <h3>驾驶员信息</h3>
                            <ul>
                                <li>
                                    <span class="detail-warning-title">驾驶员ID</span>
                                    <p class="detail-warnig-text">{{ deriverId }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">驾驶员姓名</span>
                                    <p class="detail-warnig-text">{{ deriverName }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">性别</span>
                                    <p class="detail-warnig-text">{{ sex == "m" ? '男':'女' }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">生日</span>
                                    <p class="detail-warnig-text">{{ birthday }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">驾驶证编号</span>
                                    <p class="detail-warnig-text">{{ licenseNumber }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">驾驶证类型</span>
                                    <p class="detail-warnig-text">{{ vehicleType }}照</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">发证机关</span>
                                    <p class="detail-warnig-text">{{ issuingAuthority }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">有效期止</span>
                                    <p class="detail-warnig-text">{{ validPeriod }}</p>
                                </li>
                            </ul>
                        </article>
                    </section>
            </div>
        </div>
       
       <div class="message-box" v-if="messageisshow">
           <div class="message-box-bg" @click.self="closeMessageBox"></div>
           
           <div class="message-main">
                <span class="message-close el-icon-close" @click.self="closeMessageBox"></span>
                <div class="block">
                    <el-carousel trigger="click" height="576px" :autoplay="false">
                    <el-carousel-item v-for="item in imagesList" :key="item">
                        <img v-if="imagesisshow" :src="item" :alt="messagesrctitle" class="mes-images">
                    </el-carousel-item>
                    </el-carousel>
                </div>
           </div>
       </div>
       <el-dialog class="dialog"
       title="提示"
        :visible.sync="centerDialogVisible"
        width="20%"
        center>
        <span  style="display:inline-block;width:100%;text-align:center;font-size:14px;color:#666">{{ dialogText }}</span>
        </el-dialog>
    </div>
     </el-scrollbar>
</template>

<script>
import { BmlMarkerClusterer } from "vue-baidu-map";
import MapBox from "../components/MapBox";
import {teamTree,alarmDetail} from "../api/getData";

export default {
    data(){
        return {
            isshow:true,
            lng: null,
            lat: null,
            infoD: "", //驾驶员
            infoNP: "", //车牌号码
            infoTW: "", //报警类型
            infoWT: "", //时间
            infoL: "", //地点,
            zoom:14,//地图放大倍数
            tableDataAlarms: [], //综合统计列表
            infotext:"",
            imgSrc:"",//图片路径
            messageisshow:false,//显示弹窗
            imagesisshow:false,//显示弹框图片
            messagesrc:"",
            messagesrctitle:"",
            imagesList:[],
            atpyeName:"-",//预警类型
            pid:"-",//预警子类型
            startDate:"-",//预警上报时间
            endDate:"-",//预警结束时间
            longitude:"-",//经度
            latitude:"-",//纬度
            deriverName:"-",//驾驶员
            vehicleCode:"-",//车牌号
            teamName:"-",//所属车队
            locationDesc:"-",//预警地点
            vehicleId:"-",//车辆ID
            color:"-",//车辆颜色
            sex:"-",//性别
            birthday:"-",//生日
            vehicleType:"-",//驾驶证类型
            terminalNo:"-",//终端编号
            speed:"-",//车速
            altitude:"-",//海拔
            subordinate:"-",//从属公司
            issuingAuthority:"-",//发证机关
            licensePlateType:"-",//车牌种类
            VehicleModel:"-",//车辆型号
            carIndustry:"-",//车属行业
            creationTime:"-",//创建时间
            licenseNumber:"-",//驾驶证编号
            validPeriod:"-",//有效期止
            listId:"-",
            dataMonday:"-",
            dataSunday:"-",
            tableDatas:[],
            currentN:0,
            listData:[],//保存列表值
            companyId:"",//公司ID
            videos:"",
            videoShow:false,
            upAlarmNo:"",
            alarmNo:"",
            downAlarmNo:"",
            alarm:"",
            col:false,
            centerDialogVisible:false,
            dialogText:"",
            atypeParent:"",
        }
    },
    methods:{
        coninfo(e, i) {
            this.isshow = true;
            // this.lng = e.point.lng;
            // this.lat = e.point.lat;
            // this.infotext = this.markers[i].text;
            this.lng = this.listData.detailMap.longitude;
            this.lat = this.listData.detailMap.latitude;
            this.infotext = "this.markers[i].text";
        },
        //地图配置
        handler({ BMap, map }) {},
        //地图信息框显示位置
        draw({ el, BMap, map }) {
            let pixel = map.pointToOverlayPixel(new BMap.Point(this.lng, this.lat));
            el.style.left = pixel.x - 60 + "px";
            el.style.top = pixel.y - 20 + "px";
        },
        isinfo(i) {},
        //地图关闭弹窗
        close() {
            this.isshow = false;
            
        },
        zommImages(el){
            this.messageisshow = true;
            this.imagesisshow = true;
            this.messagesrc = el.srcElement.currentSrc;
            this.messagesrctitle = el.srcElement.alt
        },
        closeMessageBox(){
            this.imagesisshow = false;
            this.messageisshow = false;
        },
        onSearch() {
            const loading = this.$loading({
            lock: true,
            text: '加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target: document.querySelector('.detail-main')
            });
            setTimeout(() => {
            loading.close();
            }, 2000);
        },
        onNext(){
            if(this.downAlarmNo!=="" && this.currentN < 10){
                this.onSearch();
                this.getDetailPageData({
                    alarmNo:this.downAlarmNo,
                    companyId:this.companyId,
                    // teamId:this.tableDatas.teamId,
                    // vehicleId:this.tableDatas.vehicleId,
                    // deriverId:this.tableDatas.deriveId,
                    startDate:this.dataMonday,
                    endDate:this.dataSunday,
                    atypeParent:this.atypeParent,
                    currentNo:this.currentN++,
                    upAlarmNo:this.alarmNo
                })
            }else{
                this.dialogText = "最后一页了！"
                this.centerDialogVisible = true;
            }
        },
        onPrevious(){
            if(this.upAlarmNo!=="" && this.currentN > 0){
                this.onSearch();
                this.getDetailPageData({
                    alarmNo:this.upAlarmNo,
                    companyId:this.companyId,
                    vehicleId:this.tableDatas.vehicleId,
                    deriverId:this.tableDatas.deriveId,
                    startDate:this.dataMonday,
                    endDate:this.dataSunday,
                    currentNo:this.currentN--,
                    downAlarmNo:this.downAlarmNo
                })
            }
            else{
                this.dialogText = "第一页了！"
                this.centerDialogVisible = true;
            }
        },
        back(){
            this.$router.go(-1);
        },
        //获取车辆搜索下拉列表
        async getDetailPageData(params) {
        let res = await alarmDetail(params);
        let img = [];
        if (res.status === 200) {
            this.alarm = res.data
                this.atpyeName = res.data.detailMap.atpyeName;
                this.pid = res.data.detailMap.pid;
                this.longitude = res.data.detailMap.longitude;
                this.latitude = res.data.detailMap.latitude;
                this.deriverName = res.data.detailMap.deriverName;
                this.vehicleCode = res.data.detailMap.vehicleCode;
                this.teamName = res.data.detailMap.teamName;
                this.locationDesc = res.data.detailMap.locationDesc;
                this.vehicleId = res.data.detailMap.vehicleId;
                this.color = res.data.detailMap.color;
                this.sex = res.data.detailMap.sex;
                this.birthday = res.data.detailMap.birthday;
                this.vehicleType = res.data.detailMap.vehicleType;
                this.lng = res.data.detailMap.longitude;
                this.lat = res.data.detailMap.latitude;
                this.infoD = res.data.detailMap.deriverName;
                this.infoNP = res.data.detailMap.vehicleCode;  //车牌号码
                this.infoTW = res.data.detailMap.atpyeName; //报警类型
                this.infoWT = res.data.detailMap.alarmTime; //时间
                this.infoL = res.data.detailMap.locationDesc; //地点,

                console.log(res.data.multimMap)
                res.data.multimMap.forEach(element => {
                    if(element.fileType == 0){
                        img.push('http://47.106.196.228:8888/'+element.filePath) 
                }else if(element.fileType == 2){
                    this.videos ='http://47.106.196.228:8888/'+element.filePath;
                }
                });
            // for(let i = 0;i<res.data.multimMap.length;i++){
            //     if(res.data.multimMap.filetype == 0){
            //         img.push('http://47.106.196.228:8888'+res.data.detailMap[i].filePath) 
            //     }
            //     else if(res.data.multimMap.filetype == 2){
            //         this.videos ='http://47.106.196.228:8888'+res.data.detailMap[i].filePath;
            //     }
            console.log(img)
            this.imagesList = img
            
            this.videoShow = true;
            this.startDate = this.dataMonday;
            this.endDate = this.dataSunday;
            this.deriverId = res.data.params.deriverId

            if(res.data.params.upAlarmNo){
                this.upAlarmNo = res.data.params.upAlarmNo;
                this.alarmNo = res.data.params.alarmNo;
                this.downAlarmNo = res.data.params.downAlarmNo;
            }
            else if(!res.data.params.downAlarmNo){
                this.upAlarmNo = res.data.params.upAlarmNo;
                this.alarmNo = res.data.params.alarmNo;
            }
            else{
                this.alarmNo = res.data.params.alarmNo;
                this.downAlarmNo = res.data.params.downAlarmNo;
            }

        }
        res = null;
        }
        
    },
    mounted(){
        

        
    },
    created:function(){
        this.listId = this.$route.params.id;
        this.currentN = this.listId.index;
        this.dataMonday=this.$route.params.dataMonday;
        this.dataSunday=this.$route.params.dataSunday;
        this.tableDatas = this.$route.params.tableDatas;
        this.companyId = this.$route.params.companyIds;
        this.atypeParent = this.$route.params.atypeParent;
        this.getDetailPageData({
            alarmNo:this.listId.id,
            companyId:this.companyId,
            vehicleId:this.tableDatas.vehicleId,
            deriverId:this.tableDatas.deriveId,
            startDate:this.dataMonday,
            endDate:this.dataSunday,
            atypeParent:this.atypeParent,
            currentNo:this.listId.index,
            
        })
        
    },
    watch: {
        '$route': function () {
            //2. $route发生变化时再次赋值listId
            this.listId = this.$route.params.id;
            this.dataMonday=this.$route.params.dataMonday;
            this.dataSunday=this.$route.params.dataSunday;
            this.tableDatas = this.$route.params.tableDatas;
            this.companyId = this.$route.params.companyIds;
            this.atypeId = this.$route.params.atypeId;
        }
    },
    components: {
    BmlMarkerClusterer,
    MapBox,
  }
};
</script>

<style lang="less" scoped >
.detail-main{
    padding: 20px;
    height: 100%;
    position: relative;
}
.detail-m{
    width: 100%;
    height:100%;
    overflow: hidden;
    background-color: #fff;
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
.page-turning{
    width: 100%;
    height: 62px;
    border-bottom: 2px solid #d2d2d2;
    text-align: right;
    line-height: 62px;
}
.pages-next,.pages-prea{
    float: right;
    text-align: center;
    width: 160px;
    height: 40px;
    cursor: pointer;
}
.pages-next a,.pages-prea a{
    font-size: 14px;
    color: #474747;
    text-decoration: none;
    padding-left: 10px;
}
.pages-next a{
    padding-right: 10px;
}
.pages-prea a{
    padding-right: 10px;
}
.pages-next a:hover,.pages-prea a:hover{
  color: #474747
}
.detail-page-main{
    padding: 30px;
}
.detail-page-main h3{
    height: 20px;
    text-align: left;
    font-size: 14px;
    font-weight: 600px;
    color: #474747;
}
.detail-page-main ul li{
    float: left;
    width: 25%;
    margin-top: 30px;
}
.detail-page-main ul {
    display: inline-block;
    width: 100%;
}
.detail-page-main .detail-warning-title{
    font-size: 12px;
    color: #5a5a5a;
}
.detail-main-info{
    // height: calc(100% - 382px);
}
.detail-warnig-text{
    margin-top: 10px;
    font-size: 14px;
    color: #333333;
}
.detail-warning-del li:last-child{
    width: 100%;
}
.detail-main-photo{
    margin-top: 30px;
    clear: both;
    ul li{
        width: 234px;
        margin-right: 50px;
        margin-top: 14px;
    }
}
.detail-main-video{
    margin-top: 30px;
    .detail-warning-video{
        width: 234px;
        height: 192px;
        margin-top: 10px;
    }
}

.message-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .message-box-bg{
        width: 100%;
        height: 100%;
        z-index: 1;
        background: #333333;
        opacity: 0.5;
    }
    .message-main{
        position:absolute;
        width: 704px;
        height: 576px;
        z-index: 2;
        background: #fff;
        top: 50%;
        left: 50%;
        margin-left: -352px;
        margin-top: -288px;
        overflow: hidden;
        .message-close{
            position:absolute;
            right: 0;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #000;
            color: #fff;
            line-height: 72px;
            margin-right: -31px;
            margin-top: -27px;
            padding-left: 12px;
            font-size: 14px;
            cursor: pointer;
            z-index: 5;
        }
    }
}
.detail-main-images{
    width: 234px;
    height: 192px;
    cursor: pointer;
}
.mes-images{
    width: 100%;
    height: 576px;
}
.border-bottom{
    border-bottom: 2px solid #d2d2d2;
}
.dialog{
    font-size: 14px;
    color: #666; 
}
</style>