<template>
    <div>
        <el-date-picker
        v-model="value3"
        type="week"
        format="第 WW 周"
        placeholder="选择周"
        :size="datewSize"
        style="width:110px;"
        @change="dataMothe"
        :clearable="false"
         :picker-options="pickerOptions1">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        props:{
            datewSize:{
                type:String,
                default:'smill'
            }
        },
        data(){
            return {
                value3:'',
                pickerOptions1:{
                     disabledDate(time) {
                            return time.getTime() > Date.now();
                        },
                }
            }
        },
        methods:{
            dataMothe(){
                var now = new Date(this.value3); 
                var nowTime = now.getTime() ; 
                var day = now.getDay();
                var oneDayLong = 24*60*60*1000 ; 


                var MondayTime = nowTime - (day)*oneDayLong  ; 
                var SundayTime =  nowTime + (7-day)*oneDayLong ; 


                var monday = new Date(MondayTime);
                var sunday = new Date(SundayTime);

                var dataMonday = monday.getFullYear() + '-' + (monday.getMonth() + 1<10?'0'+ (monday.getMonth() + 1):monday.getDate()+1) + '-' +(monday.getDate() + 1<10?'0'+(monday.getDate() + 1):monday.getDate()+1)+' 00:00:00'; 
                var dataSunday = sunday.getFullYear() + '-' + (sunday.getMonth() + 1<10?'0'+ (sunday.getMonth() + 1):sunday.getDate()+1) + '-' +(sunday.getDate() + 1<10?'0'+(sunday.getDate() + 1):sunday.getDate()+1)+ ' 23:59:59'; 

                this.$emit('dataMothe',{dataMonday,dataSunday})
            }
        }
    }
</script>

<style scoped>

</style>