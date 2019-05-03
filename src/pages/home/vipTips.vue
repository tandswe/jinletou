<template>
	<div class="viptips">
		<cmheader :title="thatTitle"></cmheader>
		<img src="../../../static/chicon/get_money1.jpg">
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	export default{
		name:'viptips',
		data(){
			return{
				thatTitle:'会员攻略'
			}
		},
		methods:{
			
		},
		components:{
			cmheader
		}
	}
</script>

<style lang="less">
	.viptips{
		padding-top: .89rem;
		img{
			width: 100%;
			height: auto;
		}
	}
</style>