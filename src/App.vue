<template>
  <div id="app">
    <!-- <el-container class="yc-ctner-h">
        <div class="yc-menu-heiht">
          <nav-menu></nav-menu>
        </div>
          <el-container>
              <el-header height="64px" class="yc-header-copy">
                <headers></headers>
              </el-header>
                <el-main class="yc-mains" style="padding:0;">
                    <router-view class="yc-main-height"></router-view>
                </el-main>
          </el-container>
       </el-container> -->
       <router-view></router-view>
      <dialog></dialog>
  </div>
</template>

<script>
import Headers from "../src/components/Header";
import NavMenu from "../src/components/Menu";
import dialog from "../src/components/dialog";
import axios from "axios";
let protocol = window.location.protocol;
let host = window.location.host;
let reg = /^localhost+/


if(reg.test(host)) {
  //若本地项目调试使用
  axios.defaults.baseURL = '/api';
} else {
  //动态请求地址
  axios.defaults.baseURL = protocol + "//" + host + "/admin/";
}
export default {
  components: {
    Headers,
    NavMenu,
    dialog
  },
  name: "App"
};
</script>

<style>
@charset "utf-8";
/*CSS reset*/
html {
  color: #000;
  background: #fff;
}
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
button,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
fieldset,
img {
  border: 0;
}
address,
caption,
cite,
code,
dfn,
em,
strong,
th,
var,
optgroup {
  font-style: inherit;
  font-weight: inherit;
}
del,
ins {
  text-decoration: none;
}
li {
  list-style: none;
}
caption,
th {
  text-align: left;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}
q:before,
q:after {
  content: "";
}
abbr,
acronym {
  border: 0;
  font-variant: normal;
}
sup {
  vertical-align: baseline;
}
sub {
  vertical-align: baseline;
}
legend {
  color: #000;
}
input,
button,
textarea,
select,
optgroup,
option {
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
}
input,
button,
textarea,
select {
  *font-size: 100%;
}
html,
body,
#app {
  min-width: 1410px;
  height: 100%;
  background-color: #eee;
}
.yc-ctner-h {
  height: 100%;
}
.yc-header-copy {
  padding: 0;
  opacity: 0.85;
  background-color: #ffffff;
}
.yc-mains {
  padding: 0;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.yc-main-height {
  height: 100%;
  box-sizing: border-box;
}
.yc-menu-heiht {
  height: 100%;
  background-color: #373a44;
}
.yc-list-scrollbar {
  height: 100%;
  box-sizing: border-box;
}
.yc-menus .el-submenu__title:hover {
  background-color: #868686;
}
.yc-menus .el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0;
  background-color: #868686;
}
.el-table thead th {
  background: #fbfbfb;
  height: 64px;
  font-size: 12px;
  font-weight: 600;
  color: #474747;
}
.el-table td,
.el-table th.is-leaf {
  border: none;
  text-align: center;
}
.el-table .cell{
  font-size: 12px;
  color: #474747;
}
/* .el-scrollbar__wrap{
  overflow-x: auto;
} */

.yc-scrollbar .el-scrollbar__wrap{
  overflow-x: auto;
}
.el-main{
  padding: 0;
}

/* 全局hover */
.el-radio-button__inner:hover {
    color: #333;
    font-weight:bold;
}
</style>
