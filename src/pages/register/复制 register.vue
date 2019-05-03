<template>
	<div class="register">
		<!--<cmheader :disc="'注册'" :hideR="true" @goPrev="goPrev"></cmheader>-->
		<div class="bg-shadow">

		</div>
		<div class="">
			<div v-show="registerStep==0">
				<div class="register-input-wrap">
					<div class="flex-start">
						<div>
							<img src="static/images/userphone@2x.png">
						</div>
						<div>
							<input type="number" v-model="user.mobile" placeholder="手机号" maxlength="11" id="mobile" @keyup="resetIllegal('mobile')">
						</div>
					</div>
				</div>
				<div class="register-input-wrap">
					<div class="flex-start-end">
						<div class="flex-sa">
							<div>
								<img src="static/images/user_code@2x.png" style="opacity: 0;">
							</div>
							<div>
								<input type="text" v-model="user.code" placeholder="校验码" id="userCode" maxlength="15" style="width: 2rem;">
							</div>
						</div>
						<div class="get-checked-code">
							<img :src="codeImg"  @click="initCode">
							<!--<img src="http://192.168.31.136:8001/account/platformCode/g/1" onclick="this.src='http://192.168.31.136:8001/account/platformCode/g/2'+Math.random()">-->
						</div>
					</div>
				</div>
				<div class="register-input-wrap">
					<div class="flex-start-end">
						<div class="flex-sa">
							<div>
								<img src="static/images/user_code@2x.png">
							</div>
							<div>
								<input style="width: 3rem;" type="text" v-model="user.testCode" id="testCodeInput" placeholder="请输入验证码注册" maxlength="15">
							</div>
						</div>
						<div class="get-checked-code">
							<div @click="getCode" class="getCode" v-if="isReverseTime=='0'||isReverseTime==-1">
								获取验证码
							</div>
							<div v-else class="getCode">
								{{isReverseTime}}s
							</div>
						</div>
					</div>
				</div>
				<div class="login-btn-wrap">
					<div @click="Register">
						注册
					</div>
				</div>
			</div>
			<div v-show="registerStep==1">
				<div class="register-input-wrap">
					<div class="flex-start">
						<div>
							<img src="static/images/userphone@2x.png">
						</div>
						<div>
							<input type="number" readonly="true" v-model="user.mobile" placeholder="手机号" maxlength="11">
						</div>
					</div>
				</div>
				<div class="register-input-wrap">
					<div class="flex-start">
						<div>
							<img src="static/images/Group3@2x.png">
						</div>
						<div>
							<input type="password" v-model="user.userpwd" placeholder="密码(6位以上数字、字母组合)" id="userpwd" maxlength="15">
						</div>
					</div>
				</div>
				<div class="register-input-wrap">
					<div class="flex-start">
						<div>
							<img src="static/images/userphone@2x.png" style="opacity: 0;">
						</div>
						<div>
							<input type="password" v-model="user.repwd" placeholder="再次确认登录密码" id="userRepwd" maxlength="15">
						</div>
					</div>
				</div>
				<div class="register-input-wrap">
					<div class="flex-start">
						<div>
							<img src="static/images/nickname@2x.png">
						</div>
						<div class="forbid" @click="showToast=true">
							<div class="forbid-shadow"></div>
							<input type="text" placeholder="性别" v-model="user.six" id="six">
						</div>
					</div>
				</div>
				<div class="register-input-wrap">
					<div class="flex-start">
						<div>
							<img src="static/images/nickname@2x.png">
						</div>
						<div>
							<input type="text" placeholder="昵称" v-model="user.username" id="username">
						</div>
					</div>
				</div>
				<div class="login-btn-wrap">
					<div @click="DownFill">
						完成
					</div>
				</div>
			</div>

			<div class="mp-tips">
				注册代表你已同意<span>梦沛用户协议 </span>
			</div>
			<div class="registered" @click="toLogin">
				已注册，马上登陆
			</div>
			<x-dialog v-model="showSuccess" class="dialog-demo" @click="showSuccess=false">
				<div class="dialog-content">
					<div class="dialog-content-t">
						<div class="dialog-content-t0">
							<!--居住证相片回执（或者身份证原件）-->
						</div>
						你已经注册成为会员！
					</div>
					<div class="dialog-content-b" @click="succFun">
						知道了
					</div>
				</div>
			</x-dialog>
			<x-dialog v-model="showErr" class="dialog-demo" @click="showErr=false">
				<div class="dialog-content">
					<div class="dialog-content-t">
						<div class="dialog-content-t0">
							<!--居住证相片回执（或者身份证原件）-->
						</div>
						已经有相同的帐户名或手机号或邮箱，创建失败！
					</div>
					<div class="dialog-content-b" @click="showErr=false">
						知道了
					</div>
				</div>
			</x-dialog>
			<x-dialog v-model="showKnowSixRule" class="dialog-demo" @click="showKnowSixRule=false">
				<div class="dialog-content">
					<div class="dialog-content-t">
						<div class="dialog-content-t0">
							<!--居住证相片回执（或者身份证原件）-->
						</div>
						提交后不可更改性别！
					</div>
					<div class="flex-container flex-item-2">
		        		<div @click="infoCancel">
		        			取消
		        		</div>
		        		<div @click="infoSubmit">
		        			确定
		        		</div>
		        	</div>
				</div>
			</x-dialog>
			<x-dialog v-model="showToast" class="dialog-demo">
	        	<div class="flex-container flex-item-2">
	        		<div @click="maleSel">
	        			男
	        		</div>
	        		<div @click="femaleSel">
	        			女
	        		</div>
	        	</div>
      		</x-dialog>
			<!--<toast v-model="showCodeErr" type="text" :time="120000" is-show-mask :text="'请填写验证码！'"  :position="'middle'"></toast>-->
			<div v-transfer-dom>
				<toast v-model="showTips" type="text" :time="1200" is-show-mask :text="tips" width="4em" :position="'middle'"></toast>
			</div>
			<div v-transfer-dom>
				<toast v-model="showCodeErr" type="text" :time="1200" :text="'请填写验证码！'" width="3em" :position="'middle'"></toast>
			</div>
			<div v-transfer-dom>
				<toast v-model="showCodeErr1" type="text" :time="1200" :text="'输入校验码有误！'" width="3.4em" :position="'middle'"></toast>
			</div>
			<div v-transfer-dom>
				<toast v-model="showCodeErr2" type="text" :time="1200" :text="countSecErr" width="3.4em" :position="'middle'"></toast>
			</div>
			<div v-transfer-dom>
				<toast v-model="showMobileErr" type="text" :time="1200" :text="'手机号码有误！'" width="3em" :position="'middle'"></toast>
			</div>
			<div v-transfer-dom>
				<toast v-model="showFlesh" type="text" :time="1200" :text="'刷新太快'" width="3em" :position="'middle'"></toast>
			</div>
			<div class="islogining"v-if="islogining">
				<load-more :tip="'登录中'"></load-more>
			</div>
		</div>
	</div>
</template>

<script>
//	import cmheader from '../components/CmHeader.vue'
//	import $ from 'jquery'
	import { Toast, LoadMore,XDialog, XButton, Icon, Alert, TransferDomDirective as TransferDom } from 'vux'
	export default {
		name: 'register',
		directives: {
			TransferDom
		},
		data() {
			return {
				//成功提示窗口
				islogining:false,//登录状态中
				isDelay:false,
				showSuccess: false,
				showErr: false,
				showFlesh:false,
				tips: '',
				codeImg: '',
				isCanClk: true,
				showTips: false,
				showCodeErr: false,
				showToast:false,
				showCodeErr1: false,
				showKnowSixRule:false,
				showCodeErr2:false,
				countSecErr:'',
				showMobileErr: false,
				registerStep: 0,
				repeat: {
					username: false,
					mobile: false,
					email: false
				},
				user: {
					username: '',
					userpwd: '',
					repwd:'',
					realName: '',
					type: '',
					mobile: '',
					email: '',
					userinfo: '',
					code: '',
					testCode: '',
					uid:'',
					six:'',
					isReverseTime: null
				},
				focus: {
					username: true
				},
				isReverseTime: '0',
				params:''
			}
		},
		methods: {
			infoCancel(){
				this.showKnowSixRule=false
			},
			infoSubmit(){
				this.showKnowSixRule=false
				var mobile=this.user.mobile  //会员手机号码
				var pwd=this.user.userpwd    //用户密码
				var nickname=this.user.username //昵称
				var repwd=this.user.repwd   //用户再次确认密码
				var uid=this.user.uid      //uid上一步得到
				var _this=this
				var six=(this.user.six=='男'?1:2)
				this.$axios.get(this.domain +'/account/registerUpdate/g/1?uid='+uid+'&mobile='+mobile+'&pwd='+pwd+'&nickname='+nickname+'&repwd='+repwd+'&six='+six)
				.then(function(res){
					console.log(res)
					if(res.status==200){
						if(res.data.status==1&&res.data.data==1){
							_this.tips = "保存成功!"
							_this.showTips = true
							_this.downFillAutologin()
						}else if(res.data.status==0&&res.data.errorcode==204){
							_this.tips ='两次密码不相同'
							_this.showTips = true
						} else{
							_this.tips = "保存失败!"
							_this.showTips = true
						}
					}
				}).catch(function(err){
					
				})
			},
			maleSel(){
				this.user.six='男'
				this.showToast=false
			},
			femaleSel(){
				this.user.six='女'
				this.showToast=false
			},
			goPrev(){		
				if(this.registerStep==0){
					this.$router.back()
				}else{
					//this.isReverseTime=0
					this.registerStep=0
				}
			},
			succFun(){
				this.showSuccess=false;
				this.registerStep=1
			},
			toLogin() {
				this.$gotoPages('/login')
			},
			initCode() {
				var _this = this
			//	var _date=new Date()
//				var sec=_date.getSeconds()
//				this.params=sec
				if(this.isDelay){
					this.showFlesh=true
					return
				}
				this.isDelay=true
				console.log(1)
				_this.codeImg = _this.domain + '/account/platformCode/g/1'+Math.random()
				//_this.codeImg = _this.domain + '/account/platformCode/g/1'
				setTimeout(function(){
					_this.isDelay=false
				},3000)
//				var  params = parseInt(Math.random() * 100)
//				if(!this.isCanClk) {
//					return
//				} else {
//					this.isCanClk = false
//				}
				console.log(this.params)				
//				this.$axios.get(_this.domain + '/account/platformCode/g/1?params='+_this.params).then(function(res) {
//					_this.codeImg = _this.domain + '/account/platformCode/g/1'+_this.params
//					_this.user.code=''
////					setTimeout(function() {
////						_this.isCanClk = true
////					}, 3000)
//				}).catch(function(err) {
//
//				})
			},
			testPhoneFill(mobile) {
				var reg = /^1[34578]\d{9}$/
				return reg.test(mobile)
			},
			getCode() {
				var _this = this
				if(!this.testPhoneFill(this.user.mobile)) {
					this.showMobileErr = true
					document.getElementById('mobile').focus()
					return
				}
				if(this.user.code == '') {
					this.showCodeErr = true
					document.getElementById('userCode').focus()
					return
				}
				var _url=this.domain + '/account/sendCode/g/1'
//				$.ajax({
//					type:'POST',
//					url:_url,
//					xhrFields:{
//						withCredentials:true
//					},
//					crossDomain:true,
//					data:{
//						mobile:_this.user.mobile,
//						code:_this.user.code
//					},
//					dataType:'json',
//					success:function(res){
//						console.log(res.data.data)
//						if(res.status == '200') {
//							if(res.data.status == '0') {
//								if(res.data.errorcode==236){
//									_this.countSecErr=res.data.message
//									_this.showCodeErr2=true		
//								}
//								_this.showCodeErr1 = true
//								//_this.initCode()
//								document.getElementById('userCode').focus()
//							} else {
//								//_this.showCodeErr1=true
//								//成功光标定位到手机注册码填写
//								alert(1)
//								_this.isReverseTime = 60
//								var inv = setInterval(function() {
//									--_this.isReverseTime
//									if(_this.isReverseTime <= 0) {
//										clearInterval(inv)
//									}
//								}, 1000)
//								document.getElementById('testCodeInput').focus()
//							}
//						}
//						console.log(res)
//					},
//					error:function(err){
//						console.log(err)
//					}
//				})
				this.$axios.get(_this.domain + '/account/sendCode/g/1?mobile=' + _this.user.mobile + '&code=' + _this.user.code,{
					 headers: {
					    'Content-Type': 'application/x-www-form-urlencoded'
					 }
				})
				.then(function(res) {
						if(res.status == '200') {
							if(res.data.status == '0') {
								if(res.data.errorcode==236){
									_this.countSecErr=res.data.message
									_this.showCodeErr2=true		
								}
								_this.showCodeErr1 = true
								//_this.initCode()
								document.getElementById('userCode').focus()
							} else {
								//_this.showCodeErr1=true
								//成功光标定位到手机注册码填写
								_this.isReverseTime = 60
								var inv = setInterval(function() {
									--_this.isReverseTime
									if(_this.isReverseTime <= 0) {
										clearInterval(inv)
									}
								}, 1000)
								document.getElementById('testCodeInput').focus()
							}
						}
						console.log(res)
					}).catch(function(err) {
						console.log(err)
					})

			},
			toLink() {
				this.$gotoPages('/login')
			},
			//重置非法字符,只能输入中英文
			resetIllegal(params) {
				if(params == 'username') {
					var str = this.user.username
					var reg = /[\u4E00-\u9FA5]/g;
					var result = str.replace(reg, '');
					this.user.username = result
					this.repeat.username = false
				}
				if(params == 'mobile') {
					this.repeat.mobile = false
				}
				if(params == 'email') {
					this.repeat.email = false
				}

			},
			showSelect() {

			},
			autoFocus(id) {
				document.getElementById(id).focus()
			},
			downFillAutologin(){
				var mobile=this.user.mobile  //会员手机号码,也是用户名
				var pwd=this.user.userpwd    //用户密码
				var _this=this
				this.islogining=true
				this.$axios.get(_this.domain+'/Account/login/g/1?username='+mobile+'&password='+pwd).then(function(res){
						if(res.status=='200'){
							if(res.data.status==1){
								console.log(res.data.data)
								_this.$setCookie('uid',res.data.data.uid)		
								_this.$setCookie('username',res.data.data.nickname)   
								console.log(res.data.data.realName)
								_this.$setCookie('userLevel',res.data.data.userLevel)
								_this.$setCookie('loginToken',res.data.data.loginToken)
								_this.$setCookie('mobile',res.data.data.mobile)
								_this.$store.state.uid=res.data.data.uid
								_this.$store.state.username=res.data.data.username
								_this.$store.state.loginToken=res.data.data.loginToken
								_this.$store.state.logined=true								
								_this.$store.state.nowIndex=3
								setTimeout(function(){
									_this.islogining=false
									_this.$gotoPages('/myself',{loginToken:res.data.data.loginToken,uid:res.data.data.uid})
								},1000)
							}else if(res.data.status==0){
								_this.tips = "登录异常，请尝试重新填写信息"
								_this.showTips = true						
							}			
						}/*else if(res.status=='0'){
							_this.errContent='连续登录错误超过最大次数，请1小时后再试'
							_this.showErr=true
						}*/
					}).catch(function(err){
						console.log(err)
					})
			},
			checkInfo(){
				var repwd=this.user.repwd   //用户再次确认密码
				var pwd=this.user.userpwd    //用户密码\
				var six=this.user.six
				if(pwd==''){
					this.tips = "密码不能为空!"
					this.showTips = true
					return false
				}
				if(pwd.length<6){
					this.tips = "密码不少于6位!"
					this.showTips = true
					return false
				}
				if(repwd!=pwd){
					this.tips = "两次密码输入不符!"
					this.showTips = true
					return false
				}
				if(six==''){
					this.tips = "请选择性别!"
					this.showTips = true
					return false
				}
				if(this.user.username==''){			
					this.tips = "请填写昵称"
					this.showTips = true
					return false
				}
				return true
			},
			DownFill() {
				if(!this.checkInfo()){
					return false
				}
				this.showKnowSixRule=true
			},
			Register() {
				function testMobile(str) {
					var reg = /^1[34578]\d{9}$/
					return reg.test(str)
				}
				if(!testMobile(this.user.mobile)) {
					this.tips = "手机格式有误"
					this.showTips = true
					this.autoFocus('mobile')
					return false
				}
				if(this.user.code==''){
					this.tips = "校验码不能为空"
					this.showTips = true
					this.autoFocus('userCode')
					return false
				}
				if(this.user.testCode==''){
					this.tips='注册码不能为空'
					this.showTips = true
					this.autoFocus('testCodeInput')
					return false
				}
				if(this.user.testCode.length<5){
					this.tips='注册码'
					this.showTips = true
					this.autoFocus('testCodeInput')
					return false
				}
				var user = this.user
				var _this = this
				this.$axios.get(_this.domain +'/account/registerUser/g/1?mobile='+user.mobile+'&smsCode='+user.testCode)
					.then(function(res) {
						if(res.status == 200) {
							if(res.data.status==0&&res.data.errorcode==203){
							   	_this.tips = "注册失败，手机号已被注册"
								_this.showTips = true
							}else{
								_this.tips="注册成功！"
								//存储uid
								_this.user.uid=res.data.data
								_this.showTips = true
								setTimeout(function(){
									_this.registerStep=1
									_this.isReverseTime='0'
								},1000)
							}
						}
					}).catch(function(err) {

					})
			}
		},
		created() {
			this.initCode()
		},
		components: {
//			cmheader,
			Toast,
			XButton,
			Icon,
			Alert,
			LoadMore,
			XDialog
		}
	}
</script>

<style scoped lang="less">
	html,
	body {
		height: 100%;
	}
	
	.forbid{
		position: relative;
	}
	.forbid-shadow{
		position: absolute;
		top: 0;
		left: 0;
		background: transparent;
		width: 100%;
		height: 100%;
	}
	
	.dialog-demo .flex-item-2 div:last-child{
		font-size: 16px;
		border-left: 1px solid #E6E6E6;
		box-sizing: border-box;
	}
	.dialog-demo .flex-item-2 div{
		border-top: 1px solid #E6E6E6;
		font-size: 16px;
		padding: .14rem 0;
	}
	.dialog-demo .flex-item-2 div:hover{
		background: #F7F7F7;
	}
	.register-input-wrap{
		padding-bottom: .16rem;
	}
	.getCode {
		position: relative;
	}
	
	.mp-tips {
		margin: .5rem .4rem .5rem;
		font-size: .24rem;
		color: #AFAFAF;
	}
	
	.mp-tips span {
		color: #FC7B90;
		font-size: .24rem;
	}
	
	.registered {
		
		text-align: center;
		font-size: .24rem;
		color: #FC7B90;
		margin:0 auto;
		margin-top: 1.1rem;
		border-bottom: 1px solid #FC7B90;
		width: 2rem;
		line-height: .34rem!important;
		/*margin-top: .4rem;*/
	}
	.get-checked-code div {
		font-size: .28rem;
		padding-left: .2rem;
		color: #FF92A1;
		width: 1.4rem;
		text-align: center;
		border-left: 1px solid #FF92A1;
	}
	/*.get-checked-code img{
		position: relative;
		top: -.2rem;
	}
	.get-checked-code{
		position: relative;
		top: .2rem;
	}*/
	
	.register-input-wrap {
		/*.flex-sa {
			padding-bottom: .4rem;
		}*/
		margin: 0 .72rem;
		overflow: hidden;
		/*height: .6rem;
		line-height: .6rem;*/
		img {
			width: auto;
			height: .6rem;
		}
		input {
			border: none;
			width: 4rem;
			color: #333333;
			font-size: .28rem;
			line-height: .6rem;
			height: .6rem;
			float: left;
			padding: 0 .44rem;
		}
	}
	
	.login-btn-wrap {
		margin: .6rem .4rem .4rem;
		div {
			line-height: .88rem;
			height: .88rem;
			background: #FF92A1;
			text-align: center;
			font-size: .36rem;
			border-radius: .2rem;
			color: #FFFFFF;
		}
	}
	
	.logo-wrap img {
		height: 2rem;
		width: auto;
		margin: .5rem auto 1rem;
	}
	
	input {
		outline: none;
	}
	
	.flex-container-center input,
	.flex-container-center textarea {
		height: 16px;
		line-height: 16px;
		box-sizing: border-box;
		width: 230px;
		background: transparent;
		border: none;
		outline: none;
		font-size: 16px;
	}
	
	.flex-container-center textarea {
		height: auto;
		padding: 4px 0;
	}
	
	.flex-container-center {
		padding: 3px 10px;
		margin: 0 20px;
		margin-top: 20px;
		border-bottom: 1px solid #EEEEEE;
	}
	
	.flex-container-center>div:first-child {
		width: 20px;
	}
	
	.flex-container-center>div:last-child {
		padding-left: 20px;
	}
	
	.setPadding {
		padding: 20px;
	}
</style>