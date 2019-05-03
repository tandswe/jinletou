<template>
	<div class="login">
		<img src="../../../static/chicon/黑色返回@2x.png" @click="goBack" class="forget-go-back">
		<div class="login-title">
			找回密码
		</div>
		<div class="logo-wrap">
		</div>
		<div class="login-input-wrap">
			<div>
				<input type="text" placeholder="手机号" id="phone" v-model="user.username">
			</div>
			<div class="set-pt flex-start">
				<div>
					<input type="number" placeholder="验证码" id="checkNumber" v-model="user.checkNumber">
				</div>
				<div v-if="isShowSec" class="check-btn"> 
					{{sec}}
				</div>
				<div class="check-btn" v-else @click="getCode">
					发送验证码
				</div>
			</div>
			<div>
				<input type="password" placeholder="新密码" id="pwd" v-model="user.pwd">
			</div>
		</div>
		<div class="login-btn-wrap">
			<div @click="findPassSubmit" class="btn-bg findPassSubmit">
				确&nbsp;定
			</div>
		</div>
		<toast v-model="showErr" type="text" :time='1200' is-show-mask :text="msgContent"  :position="'middle'" width="auto"></toast>
		<div class="islogining"v-if="islogining">
			<load-more :tip="'登录中'"></load-more>
		</div>
	</div>
</template>

<script>
	import {Divider,Toast,LoadMore,TransferDomDirective as TransferDom,Alert} from 'vux'
//	import cmheader from '../components/CmHeader.vue'
//	import Tab from '../components/Tab.vue'
import md5 from "js-md5";
	export default {
		name: 'login',
		directives: {
		    TransferDom
		  },
		components: {
//			cmheader,
			Divider,
			LoadMore,
			Toast
		},
		data() {
			return {
				msgContent:'手机号不能为空',
				showErr:false,
				islogining:false,
				isShowSec:false,
				sec:60,
				user:{
					username:'',
					checkNumber:'',
					pwd:''
				}
			}
		},
		methods:{
			getCode(){
				var _this=this
				if(this.user.username==''){
					this.msgContent='手机号不能为空'
					document.getElementById('phone').focus()
					this.showErr=true
					return false
				}
				var params={
					phone:this.user.username
				}
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					url:'/appApi/appUsers/sendMs',
					data:params
				}).then(function(res){
					console.log(res)
					var getData=res.data
					if(getData.status=='200'){
						_this.msgContent='发送成功!'
						_this.countTime(60)
						_this.showErr=true
					}else{
						var msg=getData.msg
						_this.msgContent=msg
						_this.showErr=true
					}
				}).catch(function(err){
					
				})
			},
			countTime(sec){	
			var _this=this
			var inv=setInterval(function(){
				sec--
				_this.isShowSec=true
				_this.sec=sec+'s'
				if(sec==0){
					clearInterval(inv)
					flag=0
					_this.isShowSec=false
				}
				},1000)
			},
			onlyNumber(){
				this.user.username=this.user.username.replace(/\D/g,'')
			},
			goBack(){
				window.history.go(-1)
			},
			register(){
				this.$gotoPages('/register')
			},
			goPrev(){
				//this.$gotoPages('/Main')
				this.$store.state.nowIndex=3
				this.$gotoPages('/myself')
//				console.log(this.$getCookie('uid'))
//				if(this.$getCookie('uid')!=undefined){
//					
//					this.$router.back()
//				}else{
//					this.$gotoPages('/Main')
//				}
				
			},
			isChecked(){
				if(this.user.username==''){
					this.msgContent='手机号不能为空'
					document.getElementById('phone').focus()
					this.showErr=true
					return false
				}
				if(this.user.checkNumber==''){
					this.msgContent='验证码不为空'
					document.getElementById('checkNumber').focus()
					this.showErr=true
					return false
				}
				return true
			},
			findPassSubmit(){
				var _this=this
				var params={
					phone:this.user.username,
					password:this.user.pwd,//新密码
					captcha:this.user.checkNumber
				}
				if(params.phone==''){
					//tipsShow('手机号码为空!')
					document.getElementById('phone').focus()
					this.msgContent='手机号码不能为空'
					this.showErr=true
					return false
				}
				if(params.phone.length<11){
					//
					document.getElementById('phone').focus()
					this.msgContent='手机号码有误'
					this.showErr=true
					return false
				}
				if(params.captcha==''){
					document.getElementById('checkNumber').focus()
					this.msgContent='请输入验证码'
					this.showErr=true
					return false
				}
				if(params.password==''){
					document.getElementById('pwd').focus()
					this.msgContent='密码不能为空'
					this.showErr=true
					return false
				}
				if(params.password.length<5){
					document.getElementById('pwd').focus()
					this.msgContent='密码不少于5位'
					this.showErr=true
					return false
				}
				params.password = md5(params.password)
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					url:'/appApi/appUsers/forgetPassword',
					data:params
				}).then(function(res){
					var getData=res.data
					if(getData.status=='200'){
						_this.msgContent='重置成功!'
						_this.showErr=true
					}else{
						var msg=getData.msg
						_this.msgContent=msg
						_this.showErr=true
					}
				}).catch(function(err){
					console.log(err)
				})
			},
			clearLocalStorage(){
				window.localStorage.clear()
			}
		},
		mounted(){
			
		}
	}
</script>

<style lang="less">
	.findPassSubmit{
		color: #FFFFFF;
		font-size: 16px;
		font-weight: 400;
	}
	.forget-go-back{
		position: fixed;
		top: .2rem;
		left: .2rem;
		display: inline-block;
		width: .44rem;
		height: .44rem;
	}
	#checkNumber{
		width: 3.8rem;
	}
	.check-btn{
		color: #e03228;
	}
	.set-pt{
		padding-top: .34rem;
	}
	.password-register{
		line-height: .12rem;
		font-size: 12px;
		div{
			color: #333333;
		}
	}
	.login {
		padding: 1.5rem .62rem .4rem;
	}
	.login-title{
		font-size: 27px;
		line-height: 27px;
		text-align: left;
		color:#1a1a1a;
		padding-bottom: 1rem;
	}
	p.weui-toast__content{
    	color: #FFFFFF;
	}
	.logo-wrap img{
		margin-top: .5rem;
		margin-bottom: 1rem;
		height: 2rem;
		width: auto;
	}
	.login-input-wrap{
		margin-bottom: 1rem;
		/*.flex-start{
			padding-bottom: .4rem;
		}*/
		>div{
			overflow: hidden;
		}
		input{
			float: left;
			outline: none;
			border: none;
			color: #333333;
			font-size: .28rem;
			padding-left: .3rem;
			width: 100%;
			line-height: .88rem;
			border-bottom: 1px solid #f5f5f5;
		}
	}
	.other-way-login >div:last-child{
		border-bottom: 1px solid #999999;
		width: 2rem;
		margin: 0 auto;
		color: #999999!important;
		margin-top: .24rem;
		margin-bottom: .2rem;
	}
	.login-btn-wrap{
		div{
			border:1px solid #ddd;
			line-height: .86rem;
			box-sizing: border-box;
			height: .86rem;
			text-align: center;
			font-size: 18px;
			border-radius: .2rem;
			margin-bottom: .36rem;
		}
	}
</style>