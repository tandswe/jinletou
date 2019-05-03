<template>
	<div class="order-content p-budget-panel-0">
		<div class="order-content-scroll">

			<div v-for="item in budget.items" 
				class="c-list-item"
				@click="item.onClick && item.onClick(item)"
			>
				<div class="c-item-label budget-infor">
					<img class="user-infor-img" :src="item.img" alt="">
					<div class="user-infor-details">
						<p class="f-tl">{{item.label}}</p>
						<p class="budget-type f-tl" v-if="item.phone">[{{item.type}}]</p>
						<p class="f-tl">{{item.date}}</p>
					</div>
				</div>
				<div class="c-item-content">
					<p class="budget-num"
						:class="{
							'budget-out': item.budget <= 0,
							'budget-in': item.budget > 0
						}"
					>
						<span v-if="item.budget > 0">+</span>{{item.budget}}
					</p>
					<p class="budget-status"
						v-if="item.status"
					>
						{{item.status.label}}
					</p>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default{
		name:'',
		data(){
			return{
				budget:{
					items:[{
						label: '余额提现到银行卡',
						img: require('../../img/myself/男@2x.png'),
						type: "提现",
						phone: "12345678901",
						date: '今天 20:33',
						budget: -200,
						status: {
							type: 'processing',
							label: '正在处理'
						},
						onClick: function (){

						}
					}, {
						label: '完成任务奖励',
						img: require('../../img/myself/男@2x.png'),
						type: "提现",
						phone: "12345678901",
						date: '今天 20:33',
						budget: 200,
						status: {
							type: 'processing',
							label: '正在处理'
						},
						onClick: function (){

						}
					}]
				}
			}
		}
	}
</script>

<style lang="less" scoped>

	.p-budget-panel-0{

		.user-infor-img{
			width: 0.8rem;
			height: 0.8rem;
			border-radius: 0.4rem;
			margin-right: 0.2rem;
		}
		.c-list-item{
			
			.c-list-label{
				width: 65%;

				.budget-infor{
					text-align: left;
				}
			}

			.c-item-content{
				width: 35%;
				display: flex;
				flex-direction: column;

				.budget-num{
					margin-bottom: 0.4rem;

					&.budget-out{
						color: black;
					}

					&.budget-in{
						color: red;
						span{
							color: red;
						}
					}

				}
			}

		}
	}
</style>