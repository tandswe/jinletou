<template>
	<div class="edit-ad">
		<cmheader :title="thatTitle" :backUrl="backUrl"></cmheader>
		<div class="task-list">
			<div class="flex-start-end" @click="goTaskList(0)">
				<div class="right-icon flex-start">
					<div>
						<img src="../../../static/chicon/task/普通任务@2x.png">
					</div>
					<div>
						会员任务
					</div>
				</div>
				<div>
					<img src="../../../static/chicon/task/右箭头@2x.png">
				</div>
			</div>
			<div class="flex-start-end"  @click="goTaskList(1)">
				<div class="right-icon flex-start">
					<div>
						<img src="../../../static/chicon/task/高级任务@2x.png">
					</div>
					<div>
						城主任务
					</div>
				</div>
				<div>
					<img src="../../../static/chicon/task/右箭头@2x.png">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	export default{
		name:'ad',
		data(){
			return{
				thatTitle:'领取任务',
				backUrl:'/cityloadArea'
			}
		},
		methods:{
			goTaskList(type){
				var params={
					type:type
				}
				this.$gotoPages('/cityloadArea/getTaskList',params)
			}
		},
		components:{
			cmheader
		},
		mounted(){
			
		}
	}
</script>

<style lang="less">
	.edit-ad{
		
	}
	.task-list{
		padding-top: .9rem;
		.flex-start-end{
			flex-wrap: nowrap;
		}
		>div{
			div{
				font-size: 16px;
			}
			box-sizing: border-box;
			border-bottom:1px solid #f5f5f5;
			padding: .28rem;
			.right-icon img{
				width: 42px;
				height: 42px;
				display: block;
				margin-right: .2rem;
			}
			img{
				width: 18px;
				height: 18px;
				display: block;
			}
		}
	}
</style>