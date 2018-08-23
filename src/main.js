// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import ElementUI from 'element-ui'
import Axios from 'axios'
import VueBreadcrumbs from 'vue-breadcrumbs'
import Echart from 'echarts'
import ECharts from 'vue-echarts/components/ECharts'
import 'element-ui/lib/theme-chalk/index.css'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import echarts from 'echarts'

import {post,fetch,patch,put} from '../src/config/fetch'

Vue.prototype.$echarts = echarts 
Vue.config.productionTip = false;
Vue.config.silent = true;
Vue.config.performance = true;
Vue.use(BaiduMap,{
	ak:'N5k99Bd4TSEVGScmwV4XuEab'
})
Vue.use(ElementUI)
Vue.use(VueBreadcrumbs,{
    template: '<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb" v-if="$breadcrumbs.length"> ' +
      '<el-breadcrumb-item style="font-size:12px;line-height:initial" class="breadcrumb-item" v-for="(crumb, key) in $breadcrumbs" :to="linkProp(crumb)" :key="key">{{ crumb | crumbText }}</el-breadcrumb-item> ' +
      '</el-breadcrumb>'

})
Vue.component('chart',ECharts)
Vue.use(Echart)
Vue.Cancel = [];
// router.beforeEach((to, from, next) => {
//     while (Vue.Cancel.length > 0) {
//         Vue.Cancel.shift()('cancel');
//     }
//     next();
// })


Vue.prototype.$ajax = Axios
// Vue.prototype.$post=post;
// Vue.prototype.$fetch=fetch;
// Vue.prototype.$patch=patch;
// Vue.prototype.$put=put;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


//读取cookie
const getCookie= ()=> {
  if (document.cookie.length>0) {
  var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
  for(var i=0;i<arr.length;i++){
    var arr2=arr[i].split('=');//再次切割
    //判断查找相对应的值
    if(arr2[0]=='userName'){
    return arr2[1];//保存到保存数据的地方
    }
    }
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (getCookie()) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})