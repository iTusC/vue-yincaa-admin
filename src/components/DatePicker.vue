<template>
  <div class="block">
    <el-date-picker
      v-model="value6"
      type="daterange"
      align="right"
      @change="pcickValue"
      unlink-panels
      size="mini"
      style="width:200px；font-size：12px;"
      :clearable="false"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions1"
      :editable="false"
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
        value6: '',
        pickerOptions1:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        }
      }
    },
    methods:{
        pcickValue(){
            if(this.value6.length){
                let time = []
                for(let i = 0; i<this.value6.length;i++){
                    time.push(this.value6[i])
                }
                this.$emit('pcickValue',time)
            }
            
        }
    }
  };
</script>