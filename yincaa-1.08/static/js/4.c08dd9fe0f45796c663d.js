webpackJsonp([4],{"9j86":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-scrollbar",{staticClass:"yc-scrollbar",staticStyle:{height:"100%"}},[i("el-container",{staticClass:"mian"},[i("el-main",[i("article",{staticClass:"vd-management-left"},[i("header",[t.companyImage?[i("img",{attrs:{src:{companyImage:t.companyImage},alt:""}})]:[i("span",{staticClass:"placeholder-img"})],t._v(" "),i("div",{staticClass:"introduction"},[i("h2",[t._v(t._s(t.companyName))]),t._v(" "),i("span",[t._v("今天是"+t._s(t.time)+"，BYTE AI平台已经为您服务了"+t._s(t.day)+"天")]),t._v(" "),i("div",[t._v("公司简介："+t._s(t.introductionMessage)+"}")]),t._v(" "),i("i",{on:{click:t.MessageEdit}},[t._v("编辑"),i("i",{staticClass:"el-icon-edit-outline"})])])],2),t._v(" "),i("main",[i("div",[i("ul",[i("li",[i("p",[i("i"),t._v("车辆总数 "),i("span",[t._v(t._s(t.Sum))])])]),t._v(" "),i("li",[i("p",[i("i"),t._v("在线车辆 "),i("span",[t._v(t._s(t.Online))])])]),t._v(" "),i("li",[i("p",[i("i"),t._v("入网车辆 "),i("span",[t._v(t._s(t.NetworkAccess))])])]),t._v(" "),i("li",[i("p",[i("i"),t._v("在线率 "),i("span",[t._v(t._s(t.OnlineRate))])])]),t._v(" "),i("li",[i("p",[i("i"),t._v("入网率 "),i("span",[t._v(t._s(t.NetworkAccessRate))])])])])]),t._v(" "),i("div",[i("ul",[i("li",[i("i"),t._v("车队 "),i("span",[t._v(t._s(t.Fleet))])]),t._v(" "),i("li",[i("i"),t._v("终端机 "),i("span",[t._v(t._s(t.Terminal))])]),t._v(" "),i("li",[i("i"),t._v("SIM卡 "),i("span",[t._v(t._s(t.SIM))])])])])]),t._v(" "),i("footer",[i("p",[t._v("建议/提示")]),t._v(" "),i("ul",[t._l(t.NetworkInformation,function(e,n){return[i("li",[0===n?i("i",[t._v("顶")]):t._e(),t._v(t._s(e.text)+" — "+t._s(e.time))])]})],2),t._v(" "),i("ul",[t._l(t.VehicleInformation,function(e,n){return[n>0?i("li",[t._v(t._s(e.text)+" "),i("el-button",{on:{click:t.toVehiclList}},[t._v("补充信息")])],1):t._e()]})],2),t._v(" "),i("ul",[t._l(t.SIMInformation,function(e,n){return[n>0?i("li",[t._v(t._s(e.text)+" "),i("el-button",{on:{click:t.toSIMList}},[t._v("订正信息")])],1):t._e()]})],2),t._v(" "),i("ul",[t._l(t.TerminalInformation,function(e,n){return[n>0?i("li",[t._v(t._s(e.text)+" "),i("el-button",{on:{click:t.toTerminalList}},[t._v("订正信息")])],1):t._e()]})],2)])]),t._v(" "),i("article",{staticClass:"vd-management-right"},[i("header",[i("ul",[i("li",[i("el-button",[t._v("添加车辆")])],1),t._v(" "),i("li",[i("el-button",[t._v("证件过期提醒")])],1),t._v(" "),i("li",[i("el-button",[t._v("待升级终端机")])],1)])]),t._v(" "),i("main",[i("h2",[t._v("操作记录")]),t._v(" "),i("ul",[t._l(t.logList,function(e){return[i("li",[i("i"),i("span",[t._v("item.text")]),i("p",[t._v("itme.time")])])]}),t._v(" "),i("li")],2),t._v(" "),i("el-button",[t._v("查看更多")]),t._v(">\n                    ")],1)])])],1)],1)],1)},staticRenderFns:[]};var _=i("Z0/y")({data:function(){return{NetworkInformation:[],VehicleInformation:[],SIMInformation:[],TerminalInformation:[],logList:[],companyName:"SUPRA速派联合速递",time:"2018-08-03 星期五",introductionMessage:"SUPRA速派联合速递，隶属于XXX科技有限公司旗下品牌，以互联网+、大数据为依托，专注于即时专人直送，为用户提供7×24小时，平均1分钟响应、10分钟上门、同城1小时速递服务。",Sum:"60",Online:"45",NetworkAccess:"54",OnlineRate:"75%",NetworkAccessRate:"86.7%",Fleet:"5",Terminal:"60",SMI:"41",companyImage:""}},methods:{}},n,!1,function(t){i("9xdy")},"data-v-ab270e9e",null);e.default=_.exports},"9xdy":function(t,e){}});