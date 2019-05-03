<template>
	<div class="p-myself-wallet">
		<cmheader :title="'我的钱包'"></cmheader>

		<!-- 头部占位 -->
		<div class="u-header-padding" ></div>

		<div class="m-wallet-details">
			<!-- <img :src="bgImg" alt=""> -->
			<p class="details-sum f-fs-12">总余额（元）</p>			
			<p class="details-num">{{sum}}</p>
			<div class="details-inner">
				<div class="detials-voucher">
					<div class="label">代金券（元）</div>
					<div class="num">{{ voucher }}</div>
				</div>
				<div class="detials-incomon-yesterday">
					<div class="label">昨日收入（元）</div>
					<div class="num">{{ incomon }}</div>
				</div>
			</div>
		</div>
		<div class="m-btn-pickup"
			@click="goToPickup"
		>
			提现
		</div>
		<div class="c-list-item"
			@click="goToBind"
		>
			<div class="c-item-label">
				<label> 绑定银行卡 </label>
			</div>
			<div class="c-item-content">
				<div v-if="!isBinded()">
					未绑定
				</div>
				<div class="c-item-raw-right"></div>
			</div>
		</div>

		<div>
			<toast v-model="toast.show" 
				type="text" :time='1200' 
				is-show-mask 
				:text="toast.text" 
				:position="'middle'" 
				width="6em">
			</toast>
		</div>

	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	import {Toast} from 'vux'

	var toast = {
		show: false,
		text: ""
	}

	export default{
		name:'',
		data(){
			return{
				// bgImg: require('../../assets/wallet-bg-x.png'),
				toast: toast, 
				sum: 0,
				voucher: 0,
				incomon: 0,
				bankStatus: 1
			}
		},
		components:{
			cmheader,
			Toast
		},
		methods:{
			goToPickup(){
				if(!this.isBinded()){
					toast.show = true;
					toast.text = "请先绑定银行卡";
					return;
				}
				this.$gotoPages('/mySelf-wallet-pickup', {
					sum: this.sum
				})
			},
			goToBind(){
				var nextPage = false ? '/mySelf-wallet-bindalready' :'/mySelf-wallet-bind';
				this.$gotoPages(nextPage)
			},
			isBinded(){
				var userinfo = this.$getUserInfo();
				var binded = false;
				var fields = ['bankAddress', 'bankCard', 'bankPerson', 'bankPhone'];
				
				for(var f in userinfo){
					if(fields.indexOf(f) > -1 && userinfo[f]){
						binded = true;
					}
				}
				return binded;

			}
		},
		mounted(){
			var _this = this;
			var params={
				id:this.$store.state.id,
			}
			params=this.$qs.stringify(params);
			_this.bankStatus = this.$store.state.userInfo.bankStatus;

			this.$axios({
				method:'post',
				data:params,
				url:'/appApi/appUsers/getBalance'
			}).then(function(res){
				if(res.status=='200'){		// TODO 
					var sum=res.data.data
					_this.sum = sum;
				}
			}).catch(function(err){
				
			})

			this.$HRApp('getUserReward', {
				FIXME: true,
				params: {
					id: this.$store.state.id
				},
				then: function (data){
					if(data.status === "200"){
						_this.sum = data.data.balance;
						_this.voucher = data.data.couponBalance;
						_this.incomon = data.data.amount;
					}
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.p-myself-wallet{
		height: 100%;
		background: #f5f5f5;
	}

	.m-wallet-details{
		height: 5rem;
		width: 100%;
		text-align: center;
		background: url(../../assets/wallet-bg.png) no-repeat;
		// background: url(../../assets/wallet-bg-x.png) no-repeat;
		background-size: 100% 100%; 
		padding-top: 0.7rem;
		box-sizing: border-box;
		color: #fff;
		&>img{
			height: 5rem;
			width: 100%;
			display: block;
		}
		
		.details-sum{
			color: #eca99d;
			margin-top: 0.4rem;
			font-size: 16px;
			margin-bottom: 0.4rem;
		}

		.details-num{
			color: #fff;
			font-size: 30px;
			margin-bottom: 0.6rem; 
		}

		.details-inner{
			display: flex;
			justify-content: center;

			.detials-voucher, .detials-incomon-yesterday{
				width: 100%;

				.label{
					color: #eca99d;
					font-size: 16px;
					margin-bottom: 0.2rem;
				}

				.num{
					color: #fff;
					font-size: 20px;
				}
			}

			.detials-voucher{
				border-right: 0.01rem solid #e27864;
			}
		}
	}

	.m-btn-pickup{
		background: #fff;
		height: 1rem;
		width: 100%;
		color: #ca0000;
		text-align: center;
		font-size: 18px;
		line-height: 1rem;
		margin-bottom: 0.2rem;
	}

	.c-list-item{
		background: #fff;
	}
</style>