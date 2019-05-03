<template>
	<div class="index">
		{{$store.state.test}}
		ddddddddddd111
		<myMenu></myMenu>
		<button v-on:click="submitRegiste">
			注册
		</button>
		<button v-on:click="getPhoneMsg">
			获取验证码
		</button>
	</div>
</template>

<script>
	export default{
		name:'',
		data(){
			return {
				
			}
		},
		components:{
			myMenu
		},
		methods:{
			getPhoneMsg(){
				var params="phone=17666066115"
				var _this=this
//				this.$axios({
//					method:'post',
//					url:'/appApi/appUsers/sendMs',
//			        data:params
//				}).then(function(res){
//					console.log(res)
//				}).catch(function(err){
//					console.log(err)
//				})
				this.Ajax('post','/appApi/appUsers/sendMs',params,function(res){
					var res=JSON.parse(res)
					console.log(res.success)
//					if(res.){
//						
//					}
				})
			},
			Ajax(type, url, data, success, failed) {
				// 创建ajax对象
				var xhr = null;
				if(window.XMLHttpRequest) {
					xhr = new XMLHttpRequest();
				} else {
					xhr = new ActiveXObject('Microsoft.XMLHTTP')
				}
	
				var type = type.toUpperCase();
				// 用于清除缓存
				var random = Math.random();
	
				if(typeof data == 'object') {
					var str = '';
					for(var key in data) {
						str += key + '=' + data[key] + '&';
					}
					data = str.replace(/&$/, '');
				}
	
				if(type == 'GET') {
					if(data) {
						xhr.open('GET', url + '?' + data, true);
					} else {
						xhr.open('GET', url + '?t=' + random, true);
					}
					xhr.send();
	
				} else if(type == 'POST') {
					xhr.open('POST', url, true);
					// 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send(data);
				}
	
				// 处理返回数据
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4) {
						if(xhr.status == 200) {
							success(xhr.responseText);
						} else {
							if(failed) {
								failed(xhr.status);
							}
						}
					}
				}
		},
		
		submitRegiste(){
			var phoneNumber=17666066115
			var pwdString=123456
			var captcha='612068'
			var params="phone="+phoneNumber+"&pwd="+pwdString+"&invitationType=3"+"&captcha="+captcha
			this.Ajax('post', 'http://120.77.216.100:8088/appApi/appUsers/register', params, function(res) {
				console.log(res)
				if(res.success){
					console.log(res)
					//tipsShow('注册成功!')
				}else{
					var msg=res.msg
					//tipsShow(msg)
				}
			})
//			this.$axios({
//					method:'post',
//					url:'/appApi/appUsers/register',
//			        data:params
//				}).then(function(res){
//					console.log(res)
//				}).catch(function(err){
//					console.log(err)
//				})
		}
		},
		mounted(){
			//this.getPhoneMsg()
			this.$bus.on('busEmit1',function(){
				alert('busEmitGot')
			})
		}
	}
</script>

<style>
	.test{
		align-items: stretch;
		height: auto;
	}
	.test-r{
		flex-grow:2;
		
	}
	.test-r .flex-item{
		text-align: left;
	}
</style>