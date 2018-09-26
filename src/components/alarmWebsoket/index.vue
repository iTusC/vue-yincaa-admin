<template>
  
</template>

<script>

  import msg from './msg'

  // {"code":0,"message":"OK","data":{"pAlarmType":"驾驶员报警","alarmNo":"01328280074465041809211544100604","alarmTime":"2018-09-21 15:44:10","vehicleCode":"测B03989","location":"广东省,广州市,天河区,怡景大街148怡景花园(南三门)","cAlarmType":"分神驾驶报警"}}
  
  export default {
    components:{
      msg
    },
    data(){
      return {
        alarmWebSoket: null,
        stompClient: null
      }
    },
    methods:{
      initAlarmWebSoket(){
        
        /* 实例化webSoket */
        window.$alarmWebSoket = this.alarmWebsoket = new SockJS("/admin/ws_sockjs_stomp")
        window.$stompClient = this.stompClient = Stomp.over(window.$alarmWebSoket)
        
        // 配置header
        var headers = {
          // login : 'yincaa_xpw',
          // passcode : '123456',
          // user : '20',
          method: 'get',
          type: 'get',
          lang: 'zh-cn'
        }

        this.stompClient.connect(headers, (frame) => {
          this.showResponse('Websocket 连接成功！')
          // setConnected(true)
          console.log('connected : ' + frame)
          // 订阅广播通道
          this.stompClient.subscribe('/topic/chat', (response) => {
            var data = JSON.parse(response.body).data
            this.renderNotify(data, '/topic/chat')
          })
          // 订阅个人错误通道
          this.stompClient.subscribe('/user/queue/errors', (response) => {
            var data = JSON.parse(response.body).data
            this.renderNotify(data, '/user/queue/errors')
          })

          // 订阅私聊通道
          this.stompClient.subscribe('/user/queue/single_chat', (response) => {
            var data = JSON.parse(response.body).data
            this.renderNotify(data, '/user/queue/single_chat')
          })
        })
      },
      showResponse(message){
        console.log(`showResponse`, message)
      },
      renderNotify(data, type){
        console.log(`renderNotify`, type, data)
        this.$notify({
          title: '新预警消息',
          dangerouslyUseHTMLString: true,
          // message: `<div>
          //             <p>时间:${data.alarmTime}</p>
          //             <p>车牌号:${data.vehicleCode}</p>
          //             <p>地点:${data.location}</p>
          //             <p>预警分类:${data.pAlarmType}</p>
          //             <p>预警子分类:${data.cAlarmType}</p>
          //           </div>`,
          message: <msg data={data} />,
          type: 'warning'
        })
      }
    },
    mounted(){
      try{
        this.initAlarmWebSoket()
      }catch(e){
        console.log(e)
      }

      /* 测试 */
      // setInterval(() => {
      //   this.renderNotify({
      //     alarmNo: `01328280074165051809190936060D04`,
      //     alarmTime: '2018-09-25 22:54',
      //     location: '广州市，天河区，渣渣大道57号',
      //     cAlarmType: '渣渣辉上线了'
      //   })
      // }, 5000)
    }
  }
</script>

<style>

</style>
