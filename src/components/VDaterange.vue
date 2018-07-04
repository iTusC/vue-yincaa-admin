<template>  
  <div class="date">   
    <ul class="data-ul">
      <li v-for="(item,index) in datar"><span  type="primary" :class="[item.class,{active:isactive === index}]"  @click="dataClick(index)">{{ item.text }}</span></li>
    </ul> 
  </div>  
</template>  
  
<script>  
  import moment from 'moment'  
  
  export default {  
    props: {  
      placeholder: null  
    },  
    data() {  
      return {  
        range: [],  
        dateObj: {  
          startTime: '',  
          endTime: ''  
        },  
        oneDay: 86400  ,
        isactive:null,
        datar:[
          {
            text:'日',
            clk:'yesterday',
            class:'vd-day'
          },
          {
            text:'周',
            clk:'theWeek',
            class:'vd-month'
          },
          {
            text:'月',
            clk:'theMonth',
            class:'vd-data'
          }
        ]
      }  
    },  
    computed: {  
      nowYear() {  
        return moment().get('year')  
      },  
      nowMonth() {  
        return moment().get('month') + 1  
      },  
      nowDate() {  
        return moment().get('date')  
      },  
      nowWeek() {  
        return moment().format('d')  
      }  
    },  
    methods: {  
      dataClick(index){
        if(index === 0){
          this.yesterday()
          this.isactive = 0
        }
        else if(index == 1){
          this.theWeek()
          this.isactive = 1
        }
        else if(index === 2){
          this.theMonth()
          this.isactive = 2
        }
      },
      searchTime() {  
        if (this.range && this.range[0] && this.range[1]) {  
          this.dateObj.startTime = this.range[0]
          this.dateObj.endTime = this.range[1]
        } else {  
          this.dateObj = {  
            startTime: '',  
            endTime: ''  
          }  
        }  
        this.submitDateRange()  
      },  
      yesterday() {  
        this.dateObj.endTime = moment().month(this.nowMonth - 1).date(this.nowDate).hours(0).minutes(0).seconds(0)._d
        this.dateObj.startTime = this.dateObj.endTime - this.oneDay  
        this.submitDateRange()  
      },  
      theWeek() {  
        let now = new Date(); 
        let nowTime = now.getTime() ; 
        let day = now.getDay();
        let oneDayLong = 24*60*60*1000 ; 


        let MondayTime = nowTime - (day-1)*oneDayLong  ; 
        let SundayTime =  nowTime + (7-day)*oneDayLong ; 
        
        let monday = new Date(MondayTime);
        let sunday = new Date(SundayTime);

        this.dateObj.startTime = monday   // 本周一  
        this.dateObj.endTime = moment()._d
        this.submitDateRange()  
      },
      theMonth() {  
        this.dateObj.startTime = moment().month(this.nowMonth - 1).date(1).hours(0).minutes(0).seconds(0)._d                        // 本月1日  
        this.dateObj.endTime = moment()._d
        this.submitDateRange()  
      },  
      exportData() {},  
      submitDateRange() {  
        this.$emit('dateRange', this.dateObj)  
      }  
    }  
  }  
</script> 
<style scpand>
  .date{
    width: 96px;
    height: 28px;
    box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    line-height: 28px;
    font-size: 12px;
    overflow: hidden;
  }
  .vd-day,.vd-month,.vd-data{
    display: inline-block;
    width: 31px;
    height: 28px;
    border-right:1px solid #dedede;
    text-align: center;
    float: left;
    color: #767676;
    cursor: pointer;
    
  }
  .vd-data{
    border:none;
  }
  .active{
    background-color: #8f8f8f;
    color: #fff;
  }
</style>
