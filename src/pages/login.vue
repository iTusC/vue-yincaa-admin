<template>
    <div class="main" style="height:100%">
        <div class="container demo-1" style="height:100%">
					
          <div class="content" style="height:100%">
            <div id="large-header" class="large-header" style="height:100%">
							<div class="bg"></div>
							<div class="demobg"></div>
              <canvas id="demo-canvas"></canvas>
              <div class="logo_box">
                <h3><img src="../assets/byte-ai.png" alt=""></h3>
                <form action="#" name="f" method="post">
                  <div class="input_outer">
                    <span class="u_user"></span>
                    <input name="logname" class="text" style="color: #FFFFFF !important" autocomplete="off" type="text" v-model="ruleForm.userName"  placeholder="请输入账户">
                  </div>
                  <div class="input_outer">
                    <span class="us_uer"></span>
                    <input name="logpass" class="text" style="color: #FFFFFF !important; position:absolute; z-index:100;" v-model="ruleForm.password" autocomplete="off" type="password" placeholder="请输入密码">
                  </div>
                  <div class="mb2">
					  <el-button type="primary" @click="submit" style="width:400px;height:50px;color: #FFFFFF;border-radius:30px;" :loading="log">登录</el-button>
					  </div>
                </form>
              </div>
            </div>
          </div>
        </div><!-- /container -->
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
	import "../assets/bgs.jpg"
	import "../assets/login_ico.png"
	import {login,getCompanyName} from "../api/getData"
	import to from '../../static/js/to'
    export default {
        data(){
            return {
				dvecharts:{},
				ruleForm:{
					userName:"",
					password:""
				},
				log:false,
				dialogText:"",
				centerDialogVisible:false,
            }
        },
        mounted(){
			
        },
        methods:{
          submit(){
			let user = this.ruleForm.userName;
			let pass = this.ruleForm.password;
			
			
			if(!user || !pass){
				this.dialogText = "账号或密码不能为空"
				this.centerDialogVisible = true;
			}else{
				this.logins({
				username:user,
				password:pass
				},{username:user})
			}
		
		},
		//设置cookie
		setCookie(c_name,c_id,exdays) {
			var exdate=new Date();//获取时间
			exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
			//字符串拼接cookie
			window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
			window.document.cookie = "companyId" + "=" + c_id + ";path=/;expires=" + exdate.toGMTString();
		},
		//读取cookie
		getCookie:function () {
			if (document.cookie.length>0) {
			var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
			for(var i=0;i<arr.length;i++){
				var arr2=arr[i].split('=');//再次切割
				//判断查找相对应的值
				if(arr2[0]=='userName'){
				this.ruleForm.userName=arr2[1];//保存到保存数据的地方
				}
				}
			}
		},
		//清除cookie
		clearCookie:function () {
			this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
		},

		async logins(params,ps){
			let res = await login(params);
			this.log = true;
			if(res.status == 200){
				
				let response = await getCompanyName(ps);
				if(response.status == 200){
					this.$options.methods.setCookie(params.username,response.data.companyId,1);
					this.getCookie();
				}
				
				this.$message({
					message: '登录成功',
					type: 'success'
				});
				this.$router.push({path:'/indM'})
				this.log = false
			}
		}
	}
    }
</script>

<style lang="less" scoped>
article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block;}audio,canvas,video{display:inline-block;}audio:not([controls]){display:none;height:0;}[hidden]{display:none;}html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}body{margin:0;}a:focus{outline:thin dotted;}a:active,a:hover{outline:0;}h1{font-size:2em;margin:0.67em 0;}abbr[title]{border-bottom:1px dotted;}b,strong{font-weight:bold;}dfn{font-style:italic;}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0;}mark{background:#ff0;color:#000;}code,kbd,pre,samp{font-family:monospace,serif;font-size:1em;}pre{white-space:pre-wrap;}q{quotes:"\201C" "\201D" "\2018" "\2019";}small{font-size:80%;}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline;}sup{top:-0.5em;}sub{bottom:-0.25em;}img{border:0;}svg:not(:root){overflow:hidden;}figure{margin:0;}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:0.35em 0.625em 0.75em;}legend{border:0;padding:0;}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0;}button,input{line-height:normal;}button,select{text-transform:none;}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer;}button[disabled],html input[disabled]{cursor:default;}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0;}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none;}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}textarea{overflow:auto;vertical-align:top;}table{border-collapse:collapse;border-spacing:0;}
.mian{
  width: 100%;
  height: 100%;
}
/* Header */
.large-header {
	position: relative;
	width: 100%;
	background: #333;
	overflow: hidden;
	background-size: cover;
	background-position: center center;
	z-index: 1;
}
.demo-1{
	height:100%;
}
.demo-1 .large-header {

}
.demobg{
	width: 100%;
	height: 100%;
	background-color: #000;
	opacity: 0.4;
	position:absolute;
	z-index: 3;
}
.logo_box{
	width: 400px;
	height: 500px;
	padding: 35px;
	color: #EEE;
	position: absolute;
	z-index: 4;
	left: 50%;
	top:50%;
	margin-left: -200px;
	margin-top: -250px;
}
.logo_box h3{
	text-align: center;
	height: 20px;
	font: 20px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei",sans-serif;
	color: #FFFFFF;
	height: 20px;
	line-height: 20px;
	padding:0 0 100px 0; 
}
.forms{
	width: 280px;
	height: 485px;
}
.logon_inof{
	width: 100%;
	min-height: 450px;
	padding-top: 35px;
	position: relative;
}		
.input_outer{
	height: 46px;
	padding: 0 5px;
	margin-bottom: 30px;
	border-radius: 50px;
	position: relative;
	border: rgba(255,255,255,0.2) 2px solid !important;
}
.u_user{
	width: 25px;
	height: 25px;
	background: url(../assets/login_ico.png);
	background-position:  -125px 0;
	position: absolute;
	margin: 10px 13px;
}
.us_uer{
	width: 25px;
	height: 25px;
	background-image: url("../assets/login_ico.png");
	background-position: -125px -34px;
	position: absolute;
	margin: 10px 13px;
}
.l-login{
	position: absolute;
	z-index: 1;
	left: 50px;
	top: 0;
	height: 46px;
	font: 14px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei";
	line-height: 46px;
}
.text{
	width: 220px;
	height: 46px;
	outline: none;
	display: inline-block;
	font: 14px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei";
	margin-left: 50px;
	border: none;
	background: none;
	line-height: 46px;
}
/*///*/
.mb2{
	margin-bottom: 20px
}
.mb2 a{
	text-decoration: none;
	outline: none;
}
.submit {
	padding: 15px;
	margin-top: 20px;
	display: block;
}
.act-but{
	line-height: 20px;
	text-align: center;
	font-size: 20px;
	border-radius: 50px;
	background-color: #409eff;
}
.bg{
	position: absolute;
	z-index: 2;
	width: 100%;
	height: 100%;
	background-image: url('../assets/bgs.jpg');
	background-size: 100% 100%;
}
</style>
