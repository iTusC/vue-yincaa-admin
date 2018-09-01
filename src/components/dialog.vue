<template>
    <div>
        <el-dialog class="dialog"
            title="提示"
            :visible.sync="centerDialogVisible"
            width="20%"
            center>
        <span  style="display:inline-block;width:100%;text-align:center;font-size:14px;color:#666">{{ dialogText }}</span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                centerDialogVisible:false,
                dialogText:"",
            }
        },
        methods:{
             onSearch() {
                const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
                target: document.querySelector('.detail-main')
                });
                setTimeout(() => {
                loading.close();
                }, 2000);
            }
        },
        created(){
            let that = this;
            this.bus.$on('dialog',function(data){
                this.centerDialogVisible = !!data
            })
        }
    }
</script>

<style scoped>

</style>