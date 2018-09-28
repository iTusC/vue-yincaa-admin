<template>
  <div class="yc-pagination">
    <el-pagination 
      background
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page="Number(pageNum)" 
      :page-sizes="[10, 30, 50, 70, 100]" 
      :page-size="Number(pageSize)"
      layout="sizes,prev, pager, next, jumper" 
      :total="Number(pageTotal)"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'yc-pagination',
    props: ['pageNum', 'pageSize', 'render', 'options', 'pageTotal', 'route', 'change'],
    data(){
      return {

      }
    },
    methods:{
      handleSizeChange (val) {
        // console.log('handleSizeChange', val)
        this.options.pageSize = val
        this.options.pageNum = 1
        this.render && this.render(val)
      },
      handleCurrentChange (val) {
        // 增加分页url记录
        this.options.pageNum = val
        // console.log(query)
        if (this.route === false) {
          typeof this.change === 'function' && this.change(val)
        } else {
          const query = Object.assign({}, this.$route.query, {
            page: val
          })
          this.$router.push({ query })

          // 回到内容区顶部hook
          this.$root && this.$root.$emit('scrollToTop')
        }
        // this.render()
      }
    }
  }
</script>

<style>
  .yc-pagination{
    text-align: right;
  }
</style>
