<template>
	<div class="mall-wrap-outer">
		<div v-transfer-dom class="my-loadding">
			<loading :show="showLoadding" :text="loaddingText"></loading>
    	</div>
		<cmheader :title="thatTitle"></cmheader>
		<div class="mall-wrap">
			<iframe :src="mallSrc" id="mall-iframe" ref="myIframe">
				
			</iframe>
		</div>
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	import {Loading,TransferDomDirective as TransferDom } from 'vux'
	export default{
		directives: {
		    TransferDom
		 },
		name:'',
		data(){
			return{
				thatTitle:'商品详情',
				mallSrc:'',
				loaddingText:'加载中',
				showLoadding:true
//				goodsInfo:{
//					price:'',
//					giftName:'',
//					id:''
//				}
			}
		},
		components:{
			cmheader,
			Loading
		},
		methods:{
			
		},
		created(){
			this.mallSrc=this.$route.query.link
		},
		mounted(){
			var _this=this
			setTimeout(function(){
				_this.showLoadding=false
			},2500)
		}
	}
</script>

<style>
</style>