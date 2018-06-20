<template>
  <div class="el-table">
    <table  class="el-table yc-table">
      <tr width="100%">
        <th width="5%">序号</th>
        <th width="10%">车牌号</th>
        <th width="10%">驾驶员</th>
        <th width="20%">车辆预警统计</th>
        <th width="20%">驾驶员预警统计</th>
        <th width="25%"></th>
        <th width="10%">更多操作</th>
      </tr>
      <template v-for="(tableData,i) in tableData">
        <tr >
          <td >{{ i + 1 }}</td>
          <td >{{ tableData.LicensePlate }}</td>
          <td >{{ tableData.Drivers }}</td>
          <template v-if="tableListShowi === i">
            <td :colspan="ctcspan" style="padding:0;">
              <div class="cm-table-d">
                <el-scrollbar style="height:100%" class="yc-scrollbar">
                  <table width="100%" class="cm-table">
                      <tr v-for="tablechr in tableData.chr">
                        <td width="31%">{{ tablechr.VehicleAlarm }}</td>
                        <td width="30%">{{ tablechr.DriverWarning }}</td>
                        <td>{{ tablechr.address }}</td>
                        <td :to="tablechr.path">查看更多</td>
                      </tr>
                  </table>
                </el-scrollbar>
              </div>
            </td>
            </template>
            <template v-else>
              <td>{{ tableData.VehicleAlarmN }} 次</td>
              <td>{{ tableData.DriverWarningN }} 次</td>
              <td></td>
            </template>
            <td @click="showList(i)" :tableListShow="tableListShowi" class="show">{{ showText }}</td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
export default {
  props: ["ctcspan", "showText", "tableData", "tableListShowi"],
  methods: {
    showList(i) {
      this.$emit("showList", i);
    }
  }
};
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
  height: 141px;
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
</style>