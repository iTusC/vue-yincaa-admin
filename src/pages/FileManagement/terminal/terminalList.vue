<template>
  <div class="yc-panel flex-cloumn">
    
    <!-- /* 操作按钮 */ -->
    <div class="toolbar">
      <el-button size="small">返回</el-button>
      <div style="flex: auto; text-align: right;">
        <el-button size="small">批量管理</el-button>
        <el-button size="small">添加设备</el-button>
      </div>
    </div>

    <!-- /* 搜索框 */ -->
    <ycToolbar :selectGroupData="selectGroupData"  />

    <!-- /* 表格 */ -->
    <div class="flex-auto">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>

    <yc-pagination :pageNum="options.pageNum" :pageSize="options.pageSize" :pageTotal="options.pageTotal" />

  </div>
</template>

<script>
  import ycToolbar from 'COMPONENTS/yc-toolbar'
  import pageMixin from 'COMPONENTS/yc-pagination/mixin'
  import {getTerminalInfoList} from 'API/getData'

  export default {
    mixins: [pageMixin],
    components:{
      ycToolbar
    },
    data(){
      return {
        selectGroupData:{
          team:{
            type: 'team',
            value: '',
            options: []
          }
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      getList(){
        let params = Object.assign({
          pageNum: 0,
          pageSize: this.options.pageSize
        }, this.$route.query)

        // let params = {
        //   "needUpdate": true,
        //   "pageNum": 0,
        //   "pageSize": 10,
        //   "teamId": 1
        // }

        getTerminalInfoList(params).then(res => {

        })
      }
    },
    watch: {
      '$route':{
        handler({query}){
          this.getList()
        },
        immediate: true
      }
    }
  }
</script>

<style>

</style>
