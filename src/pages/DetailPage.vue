<template>
    <el-scrollbar style="height:100%;" class="yc-scrollbar">
        <div class="detail-main" v-loading="lodi">
            <div class="detail-m">
                <baidu-map class="map" center="广州" :scroll-wheel-zoom="true" :map-click="false" :center="{lng:lng, lat:lat }" :zoom="zoom">
                    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                    <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
                    <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic>
                    <bml-marker-clusterer :averageCenter="true">
                        <bm-marker :position="{lng:lng, lat:lat }" :zoom="zoom">
                        </bm-marker>
                    </bml-marker-clusterer>
                    <map-box :position="{lng:lng, lat:lat}">
                        <!-- <i @click="close">x</i> -->
                        <p class="info">驾驶员：{{ infoD }}</p>
                        <p class="info">车牌号：{{ infoNP }}</p>
                        <p class="info">报警时间：{{ infoWT }}</p>
                        <p class="info">报警类型：{{ infoTW }}</p>
                        <p class="info">报警地点：{{ infoL }}</p>
                    </map-box>
                </baidu-map>
                <aside class="page-turning">
                    <div class="pages-next" @click="back">
                        <i class="el-icon-back"></i>
                        <span> 返回列表</span>
                    </div>
                    <div class="pages-next" @click="onNext">
                        <span>下一条预警</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                    <div class="pages-prea" @click="onPrevious">
                        <i class="el-icon-arrow-left" :style="col?color='#fff':color='#333'"></i>
                        <span>上一条预警</span>
                    </div>
                </aside>

                <div class="detail-main-info">

                    <section class="detail-page-main border-bottom">
                        <article class="detail-main-warning">
                            <h3>预警信息(编号{{ alarmnNmber }})</h3>
                            <ul class="detail-warning-del">
                                <li>
                                    <span class="detail-warning-title">预警类别</span>
                                    <p class="detail-warnig-text">{{ atpyeName }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">预警子类型</span>
                                    <p class="detail-warnig-text">{{ atpyePName }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">预警时间</span>
                                    <p class="detail-warnig-text">{{ startDate }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">平台接收时间</span>
                                    <p class="detail-warnig-text">{{ endDate }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">终端机手机号</span>
                                    <p class="detail-warnig-text">{{ terminalNo }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">经纬度</span>
                                    <p class="detail-warnig-text">{{ longitude + "-" + latitude }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">海拔高度</span>
                                    <p class="detail-warnig-text">{{ altitude }} m</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">当前车速</span>
                                    <p class="detail-warnig-text">{{ speed }} km/h</p>
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
                                        <img :src="item" class="detail-main-images" @click.self="zommImages($event,i)">
                                    </li>
                                </ul>
                            </article>
                            <article class="detail-main-video">
                                <h4 class="detail-warning-title">预警视频</h4>
                                <video controls="" id="vid" name="media" @click.self="" class="detail-warning-video" v-if="videoShow" :src="videos">
                                </video>
                            </article>
                        </article>
                    </section>
                    <section class="detail-page-main border-bottom">
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
                                    <span class="detail-warning-title">车牌种类</span>
                                    <p class="detail-warnig-text">{{ licensePlateType }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">发证机关</span>
                                    <p class="detail-warnig-text">{{ issuingAuthority }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">车辆颜色</span>
                                    <p class="detail-warnig-text">{{ vcolor }}</p>
                                </li>
                                <li>
                                    <span class="detail-warning-title">车辆类型</span>
                                    <p class="detail-warnig-text">{{ VehicleModel}}</p>
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
                    <section class="detail-page-main">
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
                                    <p class="detail-warnig-text">{{ vehicleType }}</p>
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
                        <el-carousel trigger="click" height="576px" :autoplay="false" :initial-index="imagesIndex">
                            <el-carousel-item v-for="item in imagesList" :key="item">
                                <img v-if="imagesisshow" :src="item" :alt="messagesrctitle" class="mes-images">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </div>
            <el-dialog class="dialog" title="提示" :visible.sync="centerDialogVisible" width="20%" center @click="clears">
                <span style="display:inline-block;width:100%;text-align:center;font-size:14px;color:#666">{{ dialogText }}</span>
            </el-dialog>
        </div>
    </el-scrollbar>
</template>

<script>
import {BmlMarkerClusterer} from 'vue-baidu-map';
import MapBox from '../components/MapBox';
import {teamTree, alarmDetail} from '../api/getData';
import {formatDate} from '../../static/js/data'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'


export default {
    data() {
        return {
            lodi: true,
            isshow: true,
            lng: null,
            lat: null,
            infoD: '', //驾驶员
            infoNP: '', //车牌号码
            infoTW: '', //报警类型
            infoWT: '', //时间
            infoL: '', //地点,
            zoom: 14, //地图放大倍数
            tableDataAlarms: [], //综合统计列表
            infotext: '',
            imgSrc: '', //图片路径
            messageisshow: false, //显示弹窗
            imagesisshow: false, //显示弹框图片
            imagesIndex:'',//初始化显示
            messagesrc: '',
            messagesrctitle: '',
            imagesList: [],
            atpyePName: '-', //预警类型
            atpyeName: '-', //预警子类型
            startDate: '-', //预警上报时间
            endDate: '-', //预警结束时间
            longitude: '-', //经度
            latitude: '-', //纬度
            deriverName: '-', //驾驶员
            vehicleCode: '黄色', //车牌号
            teamName: '-', //所属车队
            locationDesc: '广东省广州市荔湾区员村街道三元里抗英斗争纪念公园', //预警地点
            vehicleId: 'YY-CM-7694', //车辆ID
            vcolor: '红色', //车辆颜色
            sex: '-', //性别
            birthday: '-', //生日
            vehicleType: '-', //驾驶证类型
            terminalNo: '018038863254', //终端编号
            speed: '70KM/h', //车速
            altitude: '209m', //海拔
            subordinate: '粤运综合物流有限公司', //从属公司
            issuingAuthority: '广东省公安厅交通管理局', //发证机关
            licensePlateType: '黄色', //车牌种类
            VehicleModel: '普通', //车辆类型
            carIndustry: '道路货物运输', //车属行业
            creationTime: '2018-4-5', //创建时间
            licenseNumber: '01803883977522', //驾驶证编号
            validPeriod: '2019-3-18', //有效期止
            listId: '-',
            dataMonday: '-',
            dataSunday: '-',
            tableDatas: [],
            currentN: 0,
            listData: [], //保存列表值
            companyId: '', //公司ID
            videos: '',
            videoShow: false,
            upAlarmNo: '',
            alarmNo: '',
            alarmnNmber:'',
            downAlarmNo: '',
            alarm: '',
            col: false,
            centerDialogVisible: false,
            dialogText: '',
            atypeParent: '',
        };
    },
    methods: {
        coninfo(e, i) {
            this.isshow = true;
            // this.lng = e.point.lng;
            // this.lat = e.point.lat;
            // this.infotext = this.markers[i].text;
            this.lng = this.listData.detailMap.longitude;
            this.lat = this.listData.detailMap.latitude;
            this.infotext = 'this.markers[i].text';
        },
        //地图配置
        handler({BMap, map}) {},
        //地图信息框显示位置
        draw({el, BMap, map}) {
            let pixel = map.pointToOverlayPixel(
                new BMap.Point(this.lng, this.lat)
            );
            el.style.left = pixel.x - 60 + 'px';
            el.style.top = pixel.y - 20 + 'px';
        },
        isinfo(i) {},
        //地图关闭弹窗
        close() {
            this.isshow = false;
        },
        zommImages(el,i) {
            this.messageisshow = true;
            this.imagesisshow = true;
            this.imagesIndex = i;
            this.messagesrctitle = el.srcElement.alt;
        },
        closeMessageBox() {
            this.imagesisshow = false;
            this.messageisshow = false;
        },
        onSearch() {
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
                target: document.querySelector('.detail-main'),
            });
            setTimeout(() => {
                loading.close();
            }, 2000);
        },
        setCookie(alarmNo,currentNo,tableDatas,exdays){
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = 'alarmNo' + '=' + alarmNo + ';path=/;expires=' + exdate.toGMTString();
            window.document.cookie = 'currentNo' + '=' + currentNo + ';path=/;expires=' + exdate.toGMTString();
            window.document.cookie = 'tableDatas' + '=' + tableDatas + ';path=/;expires=' + exdate.toGMTString();
        },
        //读取cookie
        getCookie: function() {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    if (arr2[0] == 'alarmNo') {
                        this.alarmNo = Number(arr2[1]); //保存到保存数据的地方
                    } else if (arr2[0] == 'currentNo') {
                        this.currentNo = arr2[1];
                    } else if (arr2[0] == 'tableDatas') {
                        this.tableDatas = arr2[1];
                    }
                }
            }
        },
        onNext() {
            if (this.currentN < this.tableDatas.length - 1) {
                this.lodi = true;

                this.alarmNo = this.tableDatas[this.currentN + 1].alarmNo;
                this.getDetailPageData({
                    alarmNo: this.alarmNo,
                    currentNo: ++this.currentN,
                });
                if(this.videoShow){
                    document.getElementById("vid").load();
                }else{
                    this.videoShow = false;
                }
                
                this.$options.methods.setCookie(this.alarmNo,this.currentN,1);
            } else {
                this.dialogText = '当前列表最后一页了！';
                this.centerDialogVisible = true;
            }
        },
        onPrevious() {
            if (this.currentN > 0) {
                this.lodi = true;
                let newAlarmNo = this.tableDatas[this.currentN - 1].alarmNo;
                this.getDetailPageData({
                    alarmNo: newAlarmNo,
                    currentNo: --this.currentN,
                });
                if(this.videoShow){
                    document.getElementById("vid").load();
                }else{
                    this.videoShow = false;
                }
                this.$options.methods.setCookie(this.alarmNo,this.currentN,1);
            } else {
                this.dialogText = '当前列表第一条了！';
                this.centerDialogVisible = true;
            }
        },
        back() {
            this.$router.go(-1);
        },
        clears(){
            let _self = this;
            this.$alert('请重新选择需要查看的预警信息!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
                _self.$router.go(-1)
            }
            });
        },
        formData(dataTime,shows=false){
            let dataT = new Date(dataTime)
            if(shows){
                return formatDate(dataT,'yyyy-MM-dd')
            }else{
                return formatDate(dataT,'yyyy-MM-dd hh:mm')

            }
            
        },
        //获取车辆搜索下拉列表
        async getDetailPageData(params) {
            let response = await alarmDetail(params);
            let res = response.data;
            let img = [];
            let _self = this;
            if (res.code == 0) {
                // let map = new BMap.Geocoder();
                // let locationDescs = map.getLocation(new BMap.Point(
                //         res.data.alarmInfoDto.longitude,
                //         res.data.alarmInfoDto.latitude
                //     ),
                //     function(result) {
                //         if (result) {
                //             _self.locationDesc = result.address;
                //             _self.infoL = result.address;
                //         }
                //     }
                // );

                //报警信息
                this.locationDesc = res.data.alarmInfoDto.locationDesc;
                this.infoL = res.data.alarmInfoDto.locationDesc;
                this.alarm = res.data;
                this.atpyePName = res.data.alarmInfoDto.atypeChildname;
                this.atpyeName = res.data.alarmInfoDto.atypeParentName;
                this.longitude = res.data.alarmInfoDto.longitude;
                this.latitude = res.data.alarmInfoDto.latitude;
                this.startDate = this.$options.methods.formData(res.data.alarmInfoDto.alarmTime);
                this.endDate = this.$options.methods.formData(res.data.alarmInfoDto.receiptTime);
                this.terminalNo = res.data.alarmInfoDto.commNo;
                this.altitude = res.data.alarmInfoDto.elevetion;
                this.speed = res.data.alarmInfoDto.speed;

                //驾驶员信息
                this.birthday = res.data.driverInfoDto.birthday;
                this.issuingAuthority = res.data.driverInfoDto.certOrg;
                this.vehicleType = res.data.driverInfoDto.ctfType;
                this.licenseNumber = res.data.driverInfoDto.driverLicense;
                this.deriverName = res.data.driverInfoDto.driverName;
                this.deriverId = res.data.driverInfoDto.driverNo;
                this.sex = res.data.driverInfoDto.sex;
                this.validPeriod = res.data.driverInfoDto.validEndTime; 

                //车辆信息
                this.issuingAuthority = res.data.vehicleInfoDto.certOrgName;
                this.subordinate = res.data.vehicleInfoDto.companyName;
                this.carIndustry = res.data.vehicleInfoDto.industryName;
                this.licensePlateType = res.data.vehicleInfoDto.numberKindName;
                this.teamName = res.data.vehicleInfoDto.teamName;
                this.vehicleId = res.data.vehicleInfoDto.vehicleNo;
                this.vehicleCode = res.data.vehicleInfoDto.vehicleCode;
                this.creationTime = this.$options.methods.formData(res.data.vehicleInfoDto.vehicleCreateTime);
                this.vcolor = res.data.vehicleInfoDto.color;

                //地图显示
                this.lng = res.data.alarmInfoDto.longitude;
                this.lat = res.data.alarmInfoDto.latitude;
                this.infoD = res.data.driverInfoDto.driverName;
                this.infoNP = res.data.vehicleInfoDto.vehicleCode; //车牌号码
                this.infoTW = res.data.alarmInfoDto.atypeChildname; //报警类型
                this.infoWT = this.$options.methods.formData(res.data.alarmInfoDto.alarmTime); //时间
                // this.infoL = res.data.detailMap.locationDesc; //地点,
                let imgPath = []
                res.data.multimediaFiles.forEach(element => {
                    imgPath.push(element);                    
                });
                let vide = ""
                if(res.data.multimediaFiles!=[]){
                    let indexs;
                    this.imagesList = [];
                    this.videos = [];
                    for(let i = 0; i<imgPath.length;i++){
                        indexs = imgPath[i].lastIndexOf(".");
                        if( imgPath[i].substr(indexs+1) == 'jpg'&&imgPath[i].substr(indexs+1) !==''){
                            img.push('http://47.106.196.228:8888/' + imgPath[i]);
                        }else if(imgPath[i].substr(indexs+1) == 'MP4'&&imgPath[i].substr(indexs+1) !==''){
                            vide = 'http://47.106.196.228:8888/' + imgPath[i];
                        } 
                    }
                    this.imagesList = img;
                    if(vide!=[]){
                        this.videoShow = true;
                        this.videos = vide;
                    }else{
                        this.videos = [];
                        this.videoShow = false;                        
                    }
                }else{
                    this.videos = [];
                    this.imagesList = [];
                }
                this.alarmnNmber = params.alarmNo; 
            }
            this.lodi = false;
            res = null;
        },
    },
    mounted() {
            this.alarmNo = this.$route.params.id.id;
            this.tableDatas = this.$route.params.tableData;
            this.currentN = this.$route.params.id.index;
            if(this.alarmNo){
                this.getDetailPageData({
                    alarmNo: this.alarmNo,
                    currentNo: this.currentN,
                });
            }else{
                this.clears()
                // this.centerDialogVisible = true;
                // this.back();

            }
    },
    created: function() {
        
    },
    // watch: {
    //     $route: function() {
    //         //2. $route发生变化时再次赋值listId
    //         this.alarmNo = this.$route.params.id.id;
    //         this.tableDatas = this.$route.params.tableData;
    //         this.currentN = this.$route.params.id.index;
    //     },
    // },
    components: {
        BmlMarkerClusterer,
        MapBox,
        videoPlayer,
    },
};
</script>

<style lang="less" scoped >
.detail-main {
    padding: 20px;
    height: 100%;
    position: relative;
}
.detail-m {
    width: 100%;
    height: 100%;
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
.page-turning {
    width: 100%;
    height: 62px;
    border-bottom: 2px solid #d2d2d2;
    text-align: right;
    line-height: 62px;
}
.pages-next,
.pages-prea {
    float: right;
    text-align: center;
    width: 160px;
    height: 40px;
    cursor: pointer;
}
.pages-next a,
.pages-prea a {
    font-size: 14px;
    color: #474747;
    text-decoration: none;
    padding-left: 10px;
}
.pages-next a {
    padding-right: 10px;
}
.pages-prea a {
    padding-right: 10px;
}
.pages-next a:hover,
.pages-prea a:hover {
    color: #474747;
}
.detail-page-main {
    padding: 30px;
}
.detail-page-main h3 {
    height: 20px;
    text-align: left;
    font-size: 14px;
    font-weight: 600px;
    color: #474747;
}
.detail-page-main ul li {
    float: left;
    width: 25%;
    margin-top: 30px;
    min-height: 52px;
}
.detail-page-main ul {
    display: inline-block;
    width: 100%;
}
.detail-page-main .detail-warning-title {
    font-size: 12px;
    color: #5a5a5a;
}
.detail-main-info {
    // height: calc(100% - 382px);
}
.detail-warnig-text {
    margin-top: 10px;
    font-size: 14px;
    color: #333333;
}
.detail-warning-del li:last-child {
    width: 100%;
}
.detail-main-photo {
    margin-top: 30px;
    clear: both;
    ul li {
        width: 234px;
        margin-right: 50px;
        margin-top: 14px;
    }
}
.detail-main-video {
    margin-top: 30px;
    .detail-warning-video {
        width: 234px;
        height: 192px;
        margin-top: 10px;
    }
}

.message-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .message-box-bg {
        width: 100%;
        height: 100%;
        z-index: 1;
        background: #333333;
        opacity: 0.5;
    }
    .message-main {
        position: absolute;
        width: 704px;
        height: 576px;
        z-index: 2;
        background: #fff;
        top: 50%;
        left: 50%;
        margin-left: -352px;
        margin-top: -288px;
        overflow: hidden;
        .message-close {
            position: absolute;
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
.detail-main-images {
    width: 234px;
    height: 192px;
    cursor: pointer;
}
.mes-images {
    width: 100%;
    height: 576px;
}
.border-bottom {
    border-bottom: 2px solid #d2d2d2;
}
.dialog {
    font-size: 14px;
    color: #666;
}
</style>