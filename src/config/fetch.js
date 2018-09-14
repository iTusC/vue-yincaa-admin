import axios from 'axios'
import router from '../router/index'

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;
const axiosRef = axios
let TOKEN = ""

const handleSetAxiosHeaders = (options) => {
  axiosRef.defaults.headers = Object.assign({}, axiosRef.defaults.headers, options)
}

//设置cookie
const setCookie =(c_name,exdays)=> {
  var exdate=new Date();//获取时间
  exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
  //字符串拼接cookie
  window.document.cookie="authorization"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
}

//读取cookie
const getCookie =  ()=> {
  if (document.cookie.length>0) {
  var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
  for(var i=0;i<arr.length;i++){
    var arr2=arr[i].split('=');//再次切割
    //判断查找相对应的值
    if(arr2[0]=='authorization'){
      return arr2[1];//保存到保存数据的地方
    }
    }
  }
}
////清除cookie
const clearCookie = ()=> {
  this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
}

//请求拦截器
axios.interceptors.request.use(config => {
    // axios.create({
    //   headers:{
    //     'X-Auth-Token':getCookie()
    //   }
    // })
    // config.headers.authorization = getCookie();
    config.headers.authorization = getCookie();
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
    return config
}, error => {
    return Promise.reject(error)
})


//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  
    // console.log(response.headers['x-auth-token'])
    // debugger
    // if(response.headers.authorization){
    //   setCookie(response.headers.authorization,1)
    // }
    // handleSetAxiosHeaders({authorization: getCookie()})
    if(response.headers.authorization){
        setCookie(response.headers.authorization,1)
      }

    return response
}, error => {
  if (error.response) {
      switch (error.response.status) {
        case 400:
          // err.message = '错误请求'
          break;
        case 401:
          // err.message = '未授权，请重新登录'
          
          router.replace({path: '/login'})
          clearCookie()

          break;
        case 403:
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        })
          // router.replace({path: '/login'})
          // query: {redirect: to.fullPath}
          clearCookie()

          // err.message = '拒绝访问'
          break;
        case 404:
          // err.message = '请求错误,未找到该资源'
          break;
        case 405:
          // err.message = '请求方法未允许'
          break;
        case 408:
          // err.message = '请求超时'
          break;
        case 500:
          // err.message = '服务器端出错'
          break;
        case 501:
          // err.message = '网络未实现'
          break;
        case 502:
          // err.message = '网络错误'
          break;
        case 503:
          // err.message = '服务不可用'
          break;
        case 504:
          // err.message = '网络超时'
          break;
        case 505:
          // err.message = 'http版本不支持该请求'
          break;
        default:
          // err.message = `连接错误${err.response.status}`
      }
    } else {
      // err.message = "连接到服务器失败"
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
})
axios.defaults.baseURL = 'http://39.108.152.102/admin/'
//设置默认请求头
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
}

axios.defaults.timeout = 10000
 
export default {
  //get请求
    get (url,param) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'get',
          url,
          params: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res)
        })
      })
    },
  //post请求
    post (url,param) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'post',
          url,
          data: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res)
        })
      })
     }
  }
 
