<template>
    <div>
        <div class="yc-velist">
            <el-autocomplete
            class="yc-select"
            v-model="searchtxt"
            :fetch-suggestions="querySearch"
            placeholder="输入车队名称或车牌号"
            @select="handleSelect"
            @focus="ckFcus"
            @blur="inputBlur"
            @keyup.enter.native="Subm"
            :stext="stext"
            >
            </el-autocomplete>
            <div class="yc-list-selectif">搜索结果：2个</div>
        </div>
    </div>
</template>

<script>
import {saveSearch} from '../../static/js/cache'
import storage from 'good-storage'
    export default {
        data(){
            return {
                searchtxt: '',
                restaurants: [],
                historyxs:false ,
                recording:false,
                resL:[
                    {
                        "value":'123'
                    },
                    {
                        "value":'123'
                    },
                    {
                        "value":'123'
                    }
                ],
                stext:"搜索李四"
            }
        },
        methods:{
            handleinput(){	 	
            //输入框获取焦点显示搜索历史记录	
	 		//为避免重复先清空再添加
                let searches=storage.get('_search_')
                let items = []
                if(searches!=undefined){
                    this.historyxs=true; 	
                    for(var i=0;i<searches.length;i++){
                        items[i] = {'value':searches[i]}
                    }
                    return items
                }
            },
            Subm(){
                if(this.searchtxt!=''){ //搜索框不为空
                saveSearch(this.searchtxt); // 本地存储搜索的内容
                    // this.$router.push({ 
                    //         path: '/searchlist'
                    //         });
                    this.historyxs=false;
                    this.searchtxt='';
                }	 		
            },
            querySearch(queryString, cb) {
                this.Recording = false
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
                
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createStateFilter(queryString) {
                return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item.value);
            },
            inputBlur(){
                this.Recording = false
            },
            valueActive(e){
               this.searchtxt = e.currentTarget.innerText
            },
            ckFcus(){
                this.Recording = true
            }
        },
        mounted(){
            this.restaurants = this.handleinput();
        },
        watch:{
            searchtxt:function() {
                if(this.searchtxt === ''){
                    return this.restaurants  = this.handleinput()
                }
                else{
                    return this.restaurants = this.resL
                }
            }
        }
    }
</script>

<style scoped lang="less">
.yc-velist-main{
    height: 100%;
    overflow: hidden;
}
.yc-velist{
    width: 240px;
    height: 100%;
    background-color: #f5f5f5;
    text-align: center;
}
.yc-velist-title{
    width: 240px;
    height: 64px;
    background-color: #f5f5f5;
}
.yc-velist-title img{
    width: 32px;
    height: 32px;
    border-radius: 16px;
    float: left;
    margin: 16px 0 0 16px;
    background-color: #112146;
}
.yc-velist-title h3{
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.1px;
  color: #112146;
  float:left;
  padding-top: 22px;
  padding-left: 10px;
}
.yc-select{
    width: 90%;
    font-size: 14px;
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

.yc-box{
    max-height: 280px;
    width: 90%;
    padding: 10px 0;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    display: inline-block;
    margin-top: 10px;
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.popper__arrow {
    border-width: 6px;
    filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-top-width: 0;
    border-bottom-color: #fff;
    top: -6px;
    z-index: 2;
}
.yc-box{
    text-align: left;
    padding: 24px 17px;
    h4{
        font-size: 12px;
        color: #b8b8b8;
        margin-bottom: 10px;
    }
    ul>li{
        font-size: 12px;
        letter-spacing: -0.1px;
        color: #656565;
        margin-bottom: 10px;
    }
}
.fade-enter-active,.fade-leave-active{
    transition: opacity .5s
}
.fade-enter,.fade-leave-to{
    opacity: 0;
}
.yc-list-selectif{
  width: 90%;
  height: 17px;
  display: inline-block;
  font-size: 12px;
  color: #767676;
  text-align: left;
  line-height: 17px;
}

</style>