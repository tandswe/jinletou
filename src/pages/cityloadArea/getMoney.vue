<template>
	<div class="mall-wrap-outer">
		<cmheader :title="thatTitle"></cmheader>
		<div class="mall-wrap">
			<!--<iframe :src="mallSrc" id="mall-iframe" ref="myIframe">
				
			</iframe>-->
			<img src="../../../static/chicon/getMoney.jpg" class="getMoney">
		</div>
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	export default{
		name:'',
		data(){
			return{
				thatTitle:'城主攻略',
				mallSrc:'',
//				goodsInfo:{
//					price:'',
//					giftName:'',
//					id:''
//				}
			}
		},
		components:{
			cmheader,
		},
		methods:{
			
		},
		created(){
//			this.mallSrc=this.$route.query.link
		},
		mounted(){
			
		}
	}
</script>

<style>
	.getMoney{
		width: 100%;
		margin-top: .88rem;
	}
</style>