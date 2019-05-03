<template>
	<div class="order-manager">
		<cmheader :title="'收支明细'"></cmheader>

		<!-- 头部占位 -->
		<!--<div class="u-header-padding" ></div>-->

		<div class="tab-wrap">
			<tab>
		      <tab-item selected @on-item-click="checkout('all')">全部</tab-item>
		      <tab-item @on-item-click="checkout('pay')">支出</tab-item>
		      <tab-item @on-item-click="checkout('income')">收入</tab-item>
		    </tab>
		</div>
		<!-- <router-view/> -->

		<div class="order-content p-budget-panel-0">
			<div class="order-content-scroll">
				
				<div class="no-data" v-if="budget.noData">
					没有数据...
				</div>

				<div v-for="item in budget.items" 
					class="c-list-item"
					@click="item.onClick && item.onClick(item)"
					v-show="!item.hide"
				>
					<div class="c-item-label budget-infor">
						<img class="user-infor-img" :src="item.img" alt="">
						<div class="user-infor-details">
							<p class="f-tl f-fs-14">{{item.label}}</p>
							<p class="budget-type f-tl f-fs-12" v-if="item.phone">[{{item.type}}]</p>
							<p class="f-tl f-fs-12">{{item.date}}</p>
						</div>
					</div>
					<div class="c-item-content">
						<p class="budget-num"
							:class="{
								'budget-out': item.type === '提现',
								'budget-in': item.type === '任务'
							}"
						>
							<span v-if="item.type === '提现'">-</span>
							<span v-if="item.type === '任务'">+</span>
							{{item.budget}}
						</p>
						<p class="budget-status f-fs-12"
							:class="item.class"
							v-if="item.status"
						>
							{{item.status.label}}
						</p>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import { Tab, TabItem } from 'vux'
	import cmheader from '../../components/cmHeader.vue'

	var imgSrc = "http://39.98.52.58:8088/resource/header/";

	export default {
		data(){
			return{
				budget:{
					noData: false,
					items:[]
				}
			}
		},
		components: {
			Tab,
			TabItem,
			cmheader
		},
	  methods:{
			goPrev(){
				window.history.go(-1)
			},
			checkout(type){

				// 0 ==> pay
				var filter = {
					'all': function (){
						return true
					},
					'pay': function (item){
						return item.type === "提现"
					},
					'income': function (item){
						return item.type === "任务"
					}
				}
				var self = this;
				var Vue = self.$root;
				var noData = true;
				this.budget.items.forEach(function (item){
					var hide = !filter[type](item);
					Vue.$set(item, 'hide', hide);
					noData = hide && noData;
				})
				console.log(!!noData)
				self.budget.noData = !!noData;
			},
			showNoData(){

			}
		},
		created(){
			var self = this;
			var params = {
				id: this.$store.state.id,
				pageNum: 1,
				pageSize: 200
			}
			params=this.$qs.stringify(params);
			this.$axios({
				method:'post',
				data:params,
				url:'/appApi/appUsers/getUserBill'
			}).then(function(res){
				var data = res.data;
				if(data.status === "200" && data.data){
					data.data.forEach(function(item, index){
						item.type = parseInt(item.type);
						console.log(item.type);
						self.budget.items.push({
							label: item.billName || "收支描述",
							img: imgSrc + (item.headImg || 'man.png'),
							type: item.type ? "任务" : "提现",
							phone: "12345678901",
							date: item.createTime.split(" ")[0],
							budget: item.amount,
							class:  {
								'f-red-1': !item.cashStatus			
							},
							status: {
								type: 'finished',
								label: item.cashStatus ? '已完成' : '正在处理'
							},
						})
					})
					self.checkout('all')
				}else{
					self.budget.noData = true;
				}
				
			}).catch(function(err){
				console.log(err)
			})
	  }
	}
</script>

<style lang="less">
	.draw-list{
		color: #333333;
		font-size: 17px;
	}
	.vux-tab-item{
		position: relative;
	}
	.vux-tab-container{
		line-height: .88rem;	
	}
	.vux-tab{
		height: auto!important;
	}
	.vux-tab-selected::after{
		content: '';
		width: .2rem;
		height: 4px;
		position: absolute;
		bottom: .08rem;
		left: 50%;
		margin: 0;
		background: #E03228;
		border-radius: 2px 2px 2px 2px;
		margin-left: -.1rem;
	}
	.vux-tab-container{
		background: #FFFFFF;	
	}
	.order-content{
		padding-top: 1.8rem;

		.no-data{
			line-height: 1rem;
			text-align: center;
			font-size: 14px;
			color: #9f9f9f;
		}
	}
	.tab-wrap{
		position: fixed;
		padding-top: .88rem;
		top: 0;
		left: 0;
		width: 100%;

		.vux-tab{
			border-bottom: 0.01rem solid #f5f5f5;
		}
	}
	.order-manager{
		height: 100%;
	}


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
					margin-bottom: 0.3rem;

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