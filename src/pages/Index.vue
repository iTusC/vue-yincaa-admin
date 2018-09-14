<template>
  <div style="height:100%">
    <el-container class="yc-ctner-h">
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
    </el-container>
  </div>
</template>

<script>
import Headers from '../components/Header';
import NavMenu from '../components/Menu';

export default {
    components: {
        Headers,
        NavMenu,
    },
};
</script>

<style>
</style>