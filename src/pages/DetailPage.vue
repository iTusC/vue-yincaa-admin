<template>
    <div class="detail-main">
        <baidu-map class="map" center="广州"   :scroll-wheel-zoom="true" :map-click="false"  :center="{lng:lng, lat:lat }" @ready="handler"   :zoom="zoom" >
            <bml-marker-clusterer :averageCenter="true" >
                <template v-for="marker in tableDataAlarms">
                    <bm-marker :position="{lng:marker.longit, lat:marker.lat }" @click="coninfo($event,index)" :zoom="zoom" >
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
        <aside>
                <a href="#"><span icon="el-icon-arrow-left"></span>上一条预警</a>
                <a href="#"><span icon="el-icon-arrow-right"></span>下一条预警</a>
        </aside>
        <section>
            <article>
                <h3>预警信息(编号38992994910400)</h3>
                <ul>
                    <li>
                        <span>预警类别</span>
                        <p>车辆预警</p>
                    </li>
                    <li>
                        <span>预警子类型</span>
                        <p>车距时距监测</p>
                    </li>
                    <li>
                        <span>预警上报时间</span>
                        <p>2018-06-20 19:20</p>
                    </li>
                    <li>
                        <span>预警结束时间</span>
                        <p>2018-06-20 19:22</p>
                    </li>
                    <li>
                        <span>终端机编号</span>
                        <p>5+n1+n2+n3+n4</p>
                    </li>
                    <li>
                        <span>预警地点</span>
                        <p>三元里抗英斗争纪念公园</p>
                    </li>
                    <li>
                        <span>经度</span>
                        <p>65.33721</p>
                    </li>
                    <li>
                        <span>纬度</span>
                        <p>139.275573</p>
                    </li>
                    <li>
                        <span>驾驶员</span>
                        <p>李词豪</p>
                    </li>
                    <li>
                        <span>车牌号</span>
                        <p>粤AP726</p>
                    </li>
                    <li>
                        <span>所属车队</span>
                        <p>粤运化工</p>
                    </li>
                    <li>
                        <span>从属公司</span>
                        <p>粤运综合物流有限公司</p>
                    </li>
                </ul>
                <article>
                    <h4>预警照片</h4>
                    <ul>
                        <!-- <li><img src="" alt=""></li>
                        <li><img src="" alt=""></li>
                        <li><img src="" alt=""></li> -->
                    </ul>
                </article>
                <article>
                    <h4>预警视频</h4>
                </article>
            </article>
        </section>
        <section>
            <article>
                <h3>车辆信息</h3>
                <ul>
                    <li>
                        <span>车辆ID</span>
                        <p>YY-CM-7694</p>
                    </li>
                    <li>
                        <span>车牌号</span>
                        <p>粤AP726</p>
                    </li>
                    <li>
                        <span>发证机关</span>
                        <p>广州市XXX部门</p>
                    </li>
                    <li>
                        <span>车牌种类</span>
                        <p>车距时距监测</p>
                    </li>
                    <li>
                        <span>车辆型号</span>
                        <p>asdddd</p>
                    </li>
                    <li>
                        <span>车辆颜色</span>
                        <p>红色</p>
                    </li>
                    <li>
                        <span>车属行业</span>
                        <p>车距时距监测</p>
                    </li>
                    <li>
                        <span>车辆创建时间</span>
                        <p>车距时距监测</p>
                    </li>
                </ul>
            </article>
        </section>
        <section>
            <article>
                <h3>驾驶员信息</h3>
                <ul>
                    <li>
                        <span>驾驶员ID</span>
                        <p>YY-CM-7694</p>
                    </li>
                    <li>
                        <span>驾驶员姓名</span>
                        <p>粤AP726</p>
                    </li>
                    <li>
                        <span>性别</span>
                        <p>广州市XXX部门</p>
                    </li>
                    <li>
                        <span>出生年月</span>
                        <p>1980-5-20</p>
                    </li>
                    <li>
                        <span>驾驶证编号</span>
                        <p>asdddd</p>
                    </li>
                    <li>
                        <span>驾驶证类型</span>
                        <p>红色</p>
                    </li>
                    <li>
                        <span>发证机关</span>
                        <p>车距时距监测</p>
                    </li>
                    <li>
                        <span>有效期止</span>
                        <p>车距时距监测</p>
                    </li>
                </ul>
            </article>
        </section>
    </div>
</template>

<script>
import { BmlMarkerClusterer } from "vue-baidu-map";
export default {
    data(){
        return {
            isshow:true,
            lng: 116.404,
            lat: 39.915,
            infoD: "", //驾驶员
            infoNP: "", //车牌号码
            infoTW: "", //报警类型
            infoWT: "", //时间
            infoL: "", //地点,
            zoom:14,//地图放大倍数
            tableDataAlarms: [], //综合统计列表
            infotext:"",
        }
    },
    methods:{
        coninfo(e, i) {
            this.isshow = true;
            this.lng = e.point.lng;
            this.lat = e.point.lat;
            this.infotext = this.markers[i].text;
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
    }
};
</script>

<style scoped>
.detail-main{
    padding: 20px;
}
.map {
  width: auto;
  height: 400px;
}
</style>