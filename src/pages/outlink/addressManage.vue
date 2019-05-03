<template>
	<div class="add-manage">
		<outlink :thatTitle="thatTitle" :mallSrc="mallSrc">
		</outlink>
	</div>
</template>

<script>
	import outlink from '../../components/outlink.vue'
	import md5 from 'js-md5'
	export default{
		name:'',
		data(){
			return{
				thatTitle:'',
				mallSrc:''
			}
		},
		components:{
			outlink
		},
		methods:{
			
		},
		created(){
			var userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
			var phone=userInfo.phone
			this.thatTitle=this.$route.query.linkType==0?'收货地址新增':'收货地址编辑'
			console.log(sessionStorage.getItem('mallSrc'))
			var mallSrc=sessionStorage.getItem('mallSrc')
			var params='&APPBagType=1&app_phone='+phone+'&app_strkey='+md5('hpyshop'+md5(phone))
			this.mallSrc=mallSrc+params
			console.log(mallSrc+params)
		},
		mounted(){
			
		}
	}
</script>

<style>
	.add-manage{
		height: 100%;	
	}
</style>