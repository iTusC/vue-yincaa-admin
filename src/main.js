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
import echarts from 'echarts'
import md5 from 'js-md5'
import infiniteScroll from 'vue-infinite-scroll'
import 'element-ui/lib/theme-chalk/index.css'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'v-infinite-scroll/dist/v-infinite-scroll.css'
import 'video.js/dist/video-js.css'
import {
  getToken
} from '../static/js/data'

import {
  post,
  fetch,
  patch,
  put
} from '../src/config/fetch'

/* 引入公共样式 */
import '../src/assets/css/public.css'

Vue.use(infiniteScroll)
Vue.prototype.$echarts = echarts
Vue.prototype.$md5 = md5
Vue.prototype.bus = new Vue;
Vue.config.productionTip = false;
Vue.config.silent = true;
Vue.config.performance = true;
Vue.use(BaiduMap, {
  ak: 'N5k99Bd4TSEVGScmwV4XuEab'
})
Vue.use(ElementUI)
Vue.use(VueBreadcrumbs, {
  template: '<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb" v-if="$breadcrumbs.length"> ' +
    '<el-breadcrumb-item style="font-size:12px;line-height:initial" class="breadcrumb-item" v-for="(crumb, key) in $breadcrumbs" :to="linkProp(crumb)" :key="key">{{ crumb | crumbText }}</el-breadcrumb-item> ' +
    '</el-breadcrumb>'

})
Vue.component('chart', ECharts)
Vue.use(Echart)
Vue.Cancel = [];
Vue.directive('loadmore', {
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function () {
      let sign = 100
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        binding.value()
      }
    })
  }
})


// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       if (getToken()) {  // 通过vuex state获取当前的token是否存在
//           next({
//             path:'/indM'
//           });
//       }
//       else {
//           next({
//               path: 'login',
//               query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           })
//       }
//   }
//   else {
//       next();
//   }
// })

Vue.prototype.$ajax = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
