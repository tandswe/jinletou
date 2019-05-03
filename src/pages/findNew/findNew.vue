<template>
	<div class="find-new">
		<div class="ljt-box" @click="showWebView">
			<img src="../../../static/chicon/ljt.jpg">
		</div>
		<div>
			<toast v-model="showMsg" type="text" :time='1200' is-show-mask :text="msgContent" :position="'middle'" :width="width"></toast>
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5'
	import { Toast } from 'vux'
	export default{
		name:'findNew',
		data(){
			return{
				showMsg:false,
				width:'10em',
				msgContent:'近期开放，敬请期待'
			}
		},
		components:{
			Toast
		},
		methods:{
			showWebView(){
				var userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
				var phone=userInfo.phone
				var params='?app_phone='+phone+'&app_strkey='+md5('hpyshop'+md5(phone))
				var domain="http://shop.zbei.online/bidding.php"
				var _url=domain+params
					console.log(_url)
				if(this.$isIOS()){
					//ios
				
					showNativeView(_url)
				}else{
					//android
//					this.$gotoPages('/cityloadArea/mallDetail',{
//						link:_url
//					})
					window.android.showNativeView(_url)
				}
			}
		},
		mounted(){
			
		}
	}
</script>

<style>
	.find-new .weui-toast{
		width: 13em!important;
		
	}
	.find-new, .ljt-box{
		height: 100%;
	}
	.ljt-box img{
		width: 100%;
		margin: 0;
		padding: 0;
		border: 0;
		height: 100%;
	}
</style>