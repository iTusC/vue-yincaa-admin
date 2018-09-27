<template>
  <div v-loading="loading">
    <a @click="handleDetail">{{data.alarmTime}}&emsp;{{data.location}}&emsp;发生{{data.cAlarmType}}</a>
  </div>
</template>

<script>
  import {
    alarmCompsDetails
  } from '../../api/getData';

  export default {
    props:{
      data:{}
    },
    data(){
      return {
      }
    },
    methods:{
      async handleDetail(){
        if(this.data && this.data.alarmNo){
          const url = `${window.location.origin}/#/ComprenensiveD/details/null?type=single&alarmNo=${this.data.alarmNo}`
          const win = window.open('about:blank', '_blank')
          win.location.href = url
        }
      }
    },
    created(){
    }
  }
</script>

<style>

</style>
