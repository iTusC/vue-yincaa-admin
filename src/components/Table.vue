<template>
  <el-table
    :data="tableListDatas"
    stripe
    style="width: 100%"
    v-loading="lod"
    @row-click="showDetail"
    v-loadmore="loadMore">
    <el-table-column
      type="index"
      width="50"
      label="序号">
    </el-table-column>
  
     <template v-for="(items,ind) in tableTitle">
        
       <template v-if="items.scope">
          <el-table-column
            :prop ="items.vul"
            :label="items.title"
            :width="items.widths"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px" @click="showDetail(scope.row)" :title="scope.row.locationDesc">{{ scope.row.locationDesc.slice(0,8)+'...' }}</span>
              </template>
          </el-table-column>
       </template>
       <template v-if="items.more">
          <el-table-column
            :prop="items.vul"
            :label="items.title"
            :width="items.widths"
            type="index">
              <template slot-scope="scope">
                <a @click="getDateil(scope.$index)" style="color:#474747" class="hovers">{{ items.title }}</a>
              </template>
          </el-table-column>
       </template>
       <template v-if="!items.more && !items.scope">
         <el-table-column
          :prop="items.vul"
          :label="items.title"
          :width="items.widths"
          >
        </el-table-column>
       </template>
     </template>
<!--     
    <el-table-column
      prop="numberPlate"
      label="车牌号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="typeOfWarning"
      label="预警类型">
    </el-table-column>
    <el-table-column
      prop="warningTime"
      label="预警时间">
    </el-table-column>
    <el-table-column
      prop="location"
      label="预警地点"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px" @click="showDetail(scope.row)">{{ scope.row.location }}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="more"
      label="详情信息">
        <template slot-scope="scope">
          <router-link to="">查看更多</router-link>
        </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
import {formatDate} from '../../static/js/data'
export default {
  // tableListDatas:列表详情，tableTitle：列表表头，tableH：表格高度
  props: ["tableListDatas", "tableTitle","lod"],
  data() {
    return {};
  },
  methods: {
    showDetail(row) {
      this.$emit("getLocation", row);
    },
    getDateil(id){
      this.$emit("getDateil",{id:id})
    },
    loadMore(){
      this.$emit("loadMore")
    },
    dateFormat(row,column){
      let data = new Date(row.alarmTime) 
      return formatDate(data,'yyyy-MM-dd hh:mm')
       console.log(data);
    }
  }
};
</script>
<style scoped>
  .hovers{
    cursor: pointer;
  }
</style>

