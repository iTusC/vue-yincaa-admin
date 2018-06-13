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
      <tr >
        <td >1</td>
        <td >粤A2K532</td>
        <td >萧大双</td>
        <td colspan="3" style="padding:0;">
          <div class="cm-table-d">
            <el-scrollbar style="height:100%">
              <table width="100%" class="cm-table">
            <tr>
              <td width="31%">车距时距监测</td>
              <td width="30%">——</td>
              <td>2018-05-27  11:46 / 507创意园</td>
              <td>查看更多</td>
            </tr>
            <tr>
              <td width="31%">驻车滑行</td>
              <td width="30%">——</td>
              <td>2018-05-24  08:30 / 三元里抗英斗争</td>
              <td>查看更多</td>
            </tr>
            <tr>
              <td width="31%">——</td>
              <td width="30%">分神提醒（低头/瞌睡）</td>
              <td>2018-05-22  18:11 / 广州市地方志馆</td>
              <td>查看更多</td>
            </tr>
            <tr>
              <td width="31%">——</td>
              <td width="30%">分神提醒（低头/瞌睡）</td>
              <td>2018-05-22  18:11 / 广州市地方志馆</td>
              <td>查看更多</td>
            </tr>
          </table>
            </el-scrollbar>
          </div>
        </td>
        <td >收起本行</td>
      </tr>
      <tr>
        <td>2</td>
        <td>粤A2K532</td>
        <td>萧大双</td>
        <td>23次</td>
        <td>4次</td>
        <td></td>
        <td>展开本行</td>
      </tr>
      <tr>
        <td>3</td>
        <td>粤A2K532</td>
        <td>萧大双</td>
        <td>23次</td>
        <td>4次</td>
        <td></td>
        <td>展开本行</td>
      </tr>
      <tr>
        <td>4</td>
        <td>粤A2K532</td>
        <td>萧大双</td>
        <td>23次</td>
        <td>4次</td>
        <td></td>
        <td>展开本行</td>
      </tr>
      <tr>
        <td>5</td>
        <td>粤A2K532</td>
        <td>萧大双</td>
        <td>23次</td>
        <td>4次</td>
        <td></td>
        <td>展开本行</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.yc-table tr th{
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #474747;
  background-color: #fbfbfb;
  line-height: 40px;
}
.yc-table tr td{
  text-align: center;
  font-size: 12px;
  line-height: 23px;
}
.yc-table tr td:last-child{
  text-decoration:1px #474747 solid;
}
.yc-table tr:nth-child(odd){
    background-color: #fbfbfb;

}
.cm-table tr:nth-child(odd){
    background-color: #fff;
}
.cm-table{
  height: 141px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2)
}
.cm-table tr:nth-child(even){
    background-color: #fbfbfb;
}
.cm-table-d{
  height: 141px;
  width: 100%;
  display: inline-block;
}

</style>