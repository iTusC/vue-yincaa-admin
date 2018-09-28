<template>
  <div class="yc-toolbar">
    <el-select size="small" v-for="combo in selectGroup" v-model="combo.value" :key="combo.type" placeholder="请选择">
      <el-option
        v-for="item in combo.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input size="small" class="yc-toolbar-input" v-model="search" :placeholder="placeholder"></el-input>
    <el-button size="small" class="btn-purple">搜素</el-button>
    <slot name="toolbarExtend"></slot>
  </div>
</template>

<script>
  export default {
    name: 'yc-toolbar',
    props:{
      selectGroupData:{
        type: Object,
        default: () => ({})
      },
      placeholder:{
        type: String,
        default: `请输入内容`
      }
    },
    data(){
      return {
        selectGroup: {},
        search: ''
      }
    },
    watch:{
      selectGroupData:{
        handler(group){
          this.selectGroup = Object.assign({}, group)
        },
        immediate: true
      }
    },
    methods:{

    }
  }
</script>

<style lang="less">
  .yc-toolbar{
    display: flex;
    margin-bottom: 16px;
    > * {
      margin-right: 10px;
      margin-left: 0 !important;
    }
    > .el-select{
      width: 120px;
    }
    > .yc-toolbar-input{
      width: 240px;
    }
  }
</style>
