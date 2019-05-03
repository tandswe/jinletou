<template>
	<div class="mall-wrap">
		<div v-transfer-dom class="my-loadding">
			<loading :show="showLoadding" :text="loaddingText"></loading>
    	</div>
		<cmheader :title="thatTitle" :backUrl='backUrl'></cmheader>
		<iframe :src="mallSrc" id="mall-iframe" ref="myIframe">
			
		</iframe>
	</div>
</template>

<script>
	import md5 from 'js-md5'
	import cmheader from '../../components/cmHeader.vue'
	import {Loading,TransferDomDirective as TransferDom } from 'vux'
	export default{
		directives: {
		    TransferDom
		},
		name:'mall',
		
		data(){
			return{
				thatTitle:'商城',
				backUrl:'/home',
				mallSrc:'',
				loaddingText:'加载中',
				showLoadding:true
			}
		},
		components:{
			cmheader,
			Loading
		},
		watch:{
			"mallSrc":{
				handler:function(){
					console.log(111111111111111)	
				},
				deeply:true
			}
		},
		methods:{
			autoGetUserInfo(){
				var userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
				var phone=userInfo.phone
				console.log(phone)
				var params='?app_phone='+phone+'&app_strkey='+md5('hpyshop'+md5(phone))
				var domain=this.$route.query.domain
				var _url=domain+params
				this.mallSrc=_url
			}
		},
		created(){
			this.autoGetUserInfo()
		},
		mounted(){
			var _this=this
			setTimeout(function(){
				_this.showLoadding=false
			},2500)
//			setInterval(function(){
//				console.log(this.$refs.myIframe.getAttribute('src'))  
//			},1000)
		}
	}
</script>

<style>
	
</style>