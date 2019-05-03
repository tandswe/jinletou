<template>
	<div class="more-list">
		<cmheader :title="thatTitle"></cmheader>
		<div class="order-content">
			<div class="order-content-scroll" ref="scrollArea">
				<div class="flex-item-3 flex-start">
					<div>
						XXX
					</div>
					<div>
						XXX
					</div>
					<div>
						XXX
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	export default{
		name:'',
		data(){
			return{
				thatTitle:'城主礼包',
				goodsList:[{
					img:'../../../static/myself/xxjd_icon@2x.png',
					title:'介绍',
					p:'内容',
					href:''
				},{
					img:'../../../static/myself/xxjd_icon@2x.png',
					title:'介绍',
					p:'内容',
					href:''
				},{
					img:'../../../static/myself/xxjd_icon@2x.png',
					title:'介绍',
					p:'内容',
					href:''
				},{
					img:'../../../static/myself/xxjd_icon@2x.png',
					title:'介绍',
					p:'内容',
					href:''
				},{
					img:'../../../static/myself/xxjd_icon@2x.png',
					title:'介绍',
					p:'内容',
					href:''
				},{
					img:'../../../static/myself/xxjd_icon@2x.png',
					title:'介绍',
					p:'内容',
					href:''
				},{
					img:'../../../static/myself/xxjd_icon@2x.png',
					title:'介绍',
					p:'内容',
					href:''
				}]
			}
		},
		components:{
			cmheader
		},
		methods:{
			
		},
		mounted(){
			
		}
	}
</script>

<style lang="less">
	.more-list-title{
		height: .88rem;
		line-height: .88rem;
		font-size: 20px;
		text-align: center;	
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 999;
		background: #FFFFFF;
	}
	.more-list-title{
		.title-wrap{
			position: relative;
			width: 100%;
			height: 100%;
			box-sizing:border-box;
			padding:0 .3rem;
			span{
				float: left;
			}
		}
	}
	.more-content-list{
		position: relative;
		margin-top: .88rem;
	}
	.flex-start-end{
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
		}
		.list-item-l{
				img {
					width: 2rem;
					height: 2rem;
					display: block;
				}
		}
</style>