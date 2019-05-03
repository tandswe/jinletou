<template>
	<div class="mall-wrap">
		<cmheader :title="thatTitle" ></cmheader>
		<iframe :src="mallSrc" id="mall-iframe" ref="myIframe">
			
		</iframe>
		<router-view/>
		<!--<break>-->
	</div>
</template>

<script>
	import md5 from 'js-md5'
	import cmheader from './cmHeader.vue'
	export default{
		name:'mall',
		data(){
			return{
//				thatTitle:'商城',
				backUrl:'',
//				mallSrc:''
			}
		},
		watch:{
//			"mallSrc":{
//				handler:function(){
//					console.log(111111111111111)	
//				},
//				deeply:true
//			}
		},
		props:{
			"thatTitle":{
	            default:"我是默认值"
	        },
	        "mallSrc":{
	        	default:""
	        }
		},
		methods:{
			autoGetUserInfo(){
//				var userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
//				var phone=userInfo.phone
//				console.log(phone)
//				var params='?app_phone='+phone+'&app_strkey='+md5('hpyshop'+md5(phone))
//				var domain=this.$route.query.domain
//				var _url=domain+params
//				this.mallSrc=_url
			}
		},
		components:{
			cmheader
		},
		created(){
			this.autoGetUserInfo()
		},
		mounted(){
			var _this=this
//			setInterval(function(){
//				console.log(this.$refs.myIframe.getAttribute('src'))  
//			},1000)
		}
	}
</script>

<style>
	
</style>