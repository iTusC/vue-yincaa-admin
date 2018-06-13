<template>
    <div class="pr">
      <template v-if="onlineD">
        <span style="fill:474747;" class="infotext" ref="infotext"  font-size="32" :x="xlf" y="82" width="150" height="150">{{ oRateN }}</span>
        <svg width="150" height="150">
          <circle cx="75" cy="75" r="70" stroke-width="6" stroke="#eeeeee" fill="none"></circle>
          <circle cx="75" cy="75" r="70" stroke-width="6" :stroke="skcolor" fill="none" transform="matrix(0,-1,1,0,0,150)" :stroke-dasharray="cps" stroke-linecap="round"></circle>
        </svg>  
      </template>
      <template v-else>
        <template v-if="onlineone">
          <img src="../../src/assets/positive.png" alt="">
        </template>
        <template v-else>
          <img src="../../src/assets/negative.png" alt="">
        </template>
      </template>
    </div>
</template>
<script >
export default {
  props: {
    rate: {
      type: Number,
      default: 0.5
    },
    skcolor: {
      type: String,
      default: "#57a14d"
    },
    onlineD:{
      type:Boolean,
      default:true
    },
    onlineone:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      sdasharry: "",
      xlfs: ""
    };
  },
  computed: {
    cps: function() {
      var percent = this.rate,
        perimeter = Math.PI * 2 * 70;

      return (this.sdasharry =
        perimeter * percent + " " + perimeter * (1 - percent));
    },
    oRateN: function() {
      return this.rate * 100 + "%";
    },
    xlf(){
      console.log(1)
    }
  }
};
</script>

<style scoped>
.pr{
  position: relative;
}
.spinner {
  /*半透明蓝色的圆弧，形成进度条的背景，透明的半圆弧和蓝色的半圆弧交替旋转构成进度条*/
  font-size: 20px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  box-shadow: inset 0 0 0 0.1em rgba(58, 168, 237, 0.2);
}
.spinner i {
  /*创造了一个透明矩形的一半*/
  position: absolute;
  width: 1em;
  height: 1em;
  clip: rect(0, 1em, 1em, 0.5em);
  animation: spinner-circle-clipper 1s ease-in-out infinite;
}
@keyframes spinner-circle-clipper {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
.spinner i:after {
  /*l蓝色的半圆弧*/
  position: absolute;
  clip: rect(0, 1em, 1em, 0.5em);
  width: 1em;
  height: 1em;
  content: "";
  animation: spinner-circle 1s ease-in-out infinite;
  border-radius: 50%;
  box-shadow: inset 0 0 0 0.1em #3aa8ed;
}
@keyframes spinner-circle {
  0% {
    transform: rotate(-180deg);
  }

  100% {
    transform: rotate(180deg);
  }
}
.infotext{
  position: absolute;
  width: 100%;
  height: 50px;
  top: 50%;
  line-height: 50px;
  font-size: 32px;
  font-weight: 600px;
  margin-top: -25px;
  text-align: center;
  color: #474747;
}
</style>