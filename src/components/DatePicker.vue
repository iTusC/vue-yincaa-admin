<template>
  <div class="block">
    <el-date-picker
      v-model="value6"
      type="daterange"
      @change="pcickValue"
      :size="size"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style="width:220px"
      >
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    props:{
        size:{
            type:String,
            default:'small'
        }
    },
    data() {
      return {
        value6: ''
      }
    },
    methods:{
        pcickValue(){
            if(this.value6.length){
                let time = []
                for(let i = 0; i<this.value6.length;i++){
                    time.push(this.value6[i].toLocaleDateString())
                }
                this.$emit('pcickValue',time+'')
            }
            
        }
    }
  };
</script>