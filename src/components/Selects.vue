<template>
  <el-select v-model="value" placeholder="请选择" :size ="size" @change="CBValue">
    <el-option
      v-for ="item in options"
      :key  ="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
</template>

<script>
  export default {
        props:{
            options:{
                type:Array,
                default:''
            },
            size:{
                type:String,
                default:'small'
            }
        },
        data() {
            return {
                value:''
            }
        },
        methods:{
            CBValue(){
                this.$emit('CBValue',this.value)
            }
        }
    }
</script>