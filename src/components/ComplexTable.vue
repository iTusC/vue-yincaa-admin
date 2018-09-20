<template>
  <div class="el-table">
    <table  class="el-table yc-table" v-loading="loading"> 
      <tr width="100%">
        <th width="5%">序号</th>
        <th width="10%">车牌号</th>
        <th width="10%">驾驶员</th>
        <th width="20%">车辆预警统计</th>
        <th width="20%">驾驶员预警统计</th>
        <th width="25%"></th>
        <th width="10%">更多操作</th>
      </tr>
      <template v-for="(tableDatas,i) in tableData">
        <tr >
          <td >{{ i + 1 }}</td>
          <td >{{ tableDatas.vehicleCode }}</td>
          <td >{{ tableDatas.driverName }}</td>
          <template v-if="tableListShowi === i">
            <td :colspan="ctcspan" style="padding:0;">
              <div class="cm-table-d">
                <el-scrollbar style="height:100%;" class="yc-scrollbar" @scroll="getPushApply">
                  <table width="100%" class="el-table cm-table" v-loading="loadings">
                      <tr v-for="(tablechr,index) in tableDataAlarms" @click="getLocation(tableDataAlarms,tableData,index,i)">
                        <template v-if="tablechr.atypeParent === 64">
                          <td width="31%">{{ tablechr.atypeName }}</td>
                          <!-- <td width="30%">{{ tablechr.deriverAlarmName }}</td> -->
                          <td width="30%">-</td>
                        </template>
                        <template v-else>
                          <td width="31%">-</td>
                          <td width="30%">{{ tablechr.atypeName }}</td>
                        </template>
                        <!-- <td width="31%">{{ tablechr.atypeName }}</td>
                        <td width="30%">{{ tablechr.deriverAlarmName }}</td> -->
                        <td class="hovers" :title="tablechr.locationDesc " >{{ formData(tablechr.alarmTime) }} {{ tablechr.locationDesc.slice(0,8)+'...' }}</td>
                        <td @click.stop="getDateil(tablechr.alarmNo,index)" class="hovers">查看更多</td>
                      </tr>
                  </table>
                </el-scrollbar>
              </div>
            </td>
            </template>
            <template v-else>
              <td>{{ tableDatas.vehicleCount }} 次</td>
              <td>{{ tableDatas.derivCount }} 次</td>
              <td></td>
            </template>
            <td  @click="showList(i)" :tableListShow="tableListShowi" class="show" v-text="tableListShowi === i?'收起本行':'展开本行'"></td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import {formatDate} from '../../static/js/data'
export default {
  props: ["ctcspan", "showText", "tableData", "tableListShowi","tableDataAlarms","paths","loading","loadings"],
  methods: {
    showList(i) {
      this.$emit("showList", i);
    },
    getLocation(tablechr,tableData,index,i){
      this.$emit("getLocation",{tablechr,tableData,index,i})
    },
    getDateil(id,index){
      this.$emit("getDateil",{id:id,index:index})
    },
    getPushApply(){
      this.$emit("getPushApply")
    },
    formData(dataTime){
      let dataT = new Date(dataTime)
      return formatDate(dataT,'yyyy-MM-dd hh:mm')
    },
  },
  created(){
      let self = this;
        $(".div-table").scroll(function(){
          self.loadMore();
      })
  }
}
</script>

<style scoped>
.yc-table tr th {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #474747;
  background-color: #fbfbfb;
  line-height: 40px;
}
.yc-table tr td {
  text-align: center;
  font-size: 12px;
  line-height: 23px;
}
.yc-table tr td:last-child {
  text-decoration: 1px #474747 solid;
}
.yc-table tr:nth-child(odd) {
  background-color: #fbfbfb;
}
.cm-table tr:nth-child(odd) {
  background-color: #fff;
}
.cm-table {
  height: 141px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
}
.cm-table tr:nth-child(even) {
  background-color: #fbfbfb;
}
.cm-table-d {
  height: 140px;
  width: 100%;
}
.show{
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; 
}
.hovers{
  cursor: pointer;
}
</style>