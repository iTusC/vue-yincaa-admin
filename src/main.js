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
Vue.prototype.bus = new Vue;
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
window.$VUE = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
