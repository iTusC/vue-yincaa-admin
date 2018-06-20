<template>
    <div>
        <el-date-picker
        v-model="value3"
        type="week"
        format="第 WW 周"
        placeholder="选择周"
        :size="datewSize"
        style="width:110px;"
        @click="dataMothe">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        props:{
            datewSize:{
                type:String,
                default:'smill'
            }
        },
        data(){
            return {
                value3:''
            }
        },
        methods:{
            dataMothe(){
                this.$emit('dataMothe')
            }
        }
    }
</script>

<style scoped>

</style>