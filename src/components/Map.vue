<template>
  <div>
    <baidu-map class="map" center="广州"   :scroll-wheel-zoom="true"  :center="{lng:lng, lat:lat }"   :zoom="zoom" >
      <bml-marker-clusterer :averageCenter="true" >
        <bm-marker v-for="(marker,index) in markers" :position="{lng:marker.lng, lat:marker.lat }" @click="coninfo($event,index)" :zoom="zoom" :key="index">
        </bm-marker> 
      </bml-marker-clusterer>   
      <map-box :position="{lng: lng, lat: lat}" v-if="isshow">
          <i @click="close">x</i>
          <p class="info" @click="isinfo" >{{ infotext }}</p>
      </map-box>
    </baidu-map>
    <ul class="ul-itme">
      <li v-for="(item,index) in markers" @click="onMapDel(index)" :key="index" > {{ item.text }}</li>
    </ul>
  </div>
</template>

<script>
import {BmlMarkerClusterer} from 'vue-baidu-map'
import MapBox from '../components/MapBox';
export default {
  data () {
    return {
      markers:[
        {
          lng:'113.363552',
          lat:'23.116597',
          text:'第一个'
        },
        {
          lng:'116.547135',
          lat:'39.996569',
          text:'第二个'
        },
        {
          lng:'116.935203',
          lat:'39.736504',
          text:'第三个'
        },
        {
          lng:'116.743756',
          lat:'39.335839',
          text:'第四个'
        },
        {
          lng:'113.435506',
          lat:'23.145676',
          text:'第五个'
        },
        {
          lng:'113.352718',
          lat:'23.001511',
          text:'第六个'
        },
        {
          lng:'113.982251',
          lat:'22.974363',
          text:'第七个'
        }
      ],
      isshow:false,
      lng:116.404,
      lat:39.915,
      infotext:'',
      zoom:12
    }
  },
  methods:{
    coninfo(e,i){
     this.isshow = true
     this.lng = e.point.lng
     this.lat = e.point.lat
     this.infotext = this.markers[i].text
    },
    draw ({el, BMap, map}) {
      let pixel = map.pointToOverlayPixel(new BMap.Point(this.lng, this.lat))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },
    onMapDel(i){
      this.isshow = true
      this.lng = this.markers[i].lng
      this.lat = this.markers[i].lat
      this.infotext = this.markers[i].text
    },
    isinfo(i){
      alert(1)
    },
    close(){
      this.isshow = false
    }
  },
  components:{
    BmlMarkerClusterer,MapBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.map{
  width: 100%;
  height: 300px;
}
.sample {
  width: 120px;
  line-height: 40px;
  background: rgba(0,0,0,0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}
.sample.active {
  background: rgba(0,0,0,0.75);
  color: #fff;
}
.info{
  margin:0;
  padding: 0;
  font-size:12px;
  line-height: 20px;
  text-align: left;
  
}
.ul-itme li:hover{
  cursor: pointer;
}
</style>
