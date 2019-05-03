<template>
	<div class="myself f-bg-gray p-binkbind">

		<cmheader :title="'收支明细'"></cmheader>

		<!-- 头部占位 -->
		<div class="u-header-padding" ></div>

		<!-- 个人信息 -->
		<div class="c-panel">
			<p class="bank">{{wallet.bankAddress}}</p>
			<p class="bank-card f-gray-2">尾号{{wallet.bankCardTail}}储值卡</p>
		</div>

		<div class="c-panel money">
			<p class="f-gray-1">提现金额</p>
			<div class="money-input">
				<span class="money-icon">¥</span>
				<input type="text" v-model="wallet.pickupNum"
					v-on:input="onInput"
					v-on:focus="onFocus"
					v-on:blur="onBlur"
				>
			</div>
			<div class="f-gray-2">
				可提现余额 {{wallet.sum || 0}} 元

				<div class="all-pickup"
					@click="pickupAll"
				>
					全部提现
				</div>
			</div>
		</div>
		<p class="tips f-gray-1">
			最低提现100元, 手续率为{{wallet.procedureRate * 100}}%
		</p>

		<div class="c-btn  pickup-btn"
			:class="btn.class"
			@click="onPickup"
		>
			<button class="f-bdr">
				提现
			</button>
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


		<x-dialog v-model="dialog.show">
			<div class="m-dialog">
				<p class="header">提现</p>
				<p class="money">¥ {{wallet.pickupNum}}</p>
				<p class="content">确定提现到该银行卡？</p>

				<div class="button">
					<div class="cancel"
						@click="onCancel"
					>
						取消
					</div>
					<div class="confirm"
						@click="onConfirm"
					>
						确认
					</div>
				</div>
			</div>
		</x-dialog>
	</div>
</template>

<script>
	import {XDialog} from 'vux'
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
				toast: toast,
				dialog: {
					show: false,
				},
				wallet: {
					procedureRate: 0.002,
					bankAddress: "",
					bankCardTail: "",
					sum: 0,
					pickupNum: null
				},
				btn: {
					class: {
						disabled: true
					}
				}
			}
		},
		components:{
			cmheader,
			XDialog,
			Toast
		},
		methods:{
			pickupAll(){
				this.wallet.pickupNum = this.wallet.sum;
				this.onInput()
			},
			onInput(){
				var pickupNum = Number.parseFloat(this.wallet.pickupNum);
				this.btn.class.disabled = !pickupNum || pickupNum <= 0;
			},
			onFocus(){
				return
				var pickupNum = Number.parseFloat(this.wallet.pickupNum);
				if(!pickupNum)
					this.wallet.pickupNum = ""
			},
			onBlur(){
				return
				var pickupNum = Number.parseFloat(this.wallet.pickupNum);
				if(!pickupNum)
					this.wallet.pickupNum = 0
			},
			onPickup(){
				var reg = /^\+?(\d+\.\d{2})$/;
				if( reg.test(this.wallet.pickupNum)) {
					toast.show = true;
					toast.text = "请输入有效的提现额度";
					return;
				}

				var pickupNum = Number.parseFloat(this.wallet.pickupNum);
				if (this.btn.class.disabled) return;
				this.dialog.show = true;
			},
			onConfirm(){
				var params={
					id:this.$store.state.id,
					money: Number.parseFloat(this.wallet.pickupNum)
				}
				var self = this;

				if(this.wallet.pickupNum < 100){
					window.$toast.alert("最低提现100元")
					return;
				}else if(this.wallet.sum < this.wallet.pickupNum){
					window.$toast.alert("余额不足")
					return;
				}

				this.$HRApp("cashWithdrawal" ,{
					FIXME: true,
					params: params,
					then: function(data){
						if(data.status === "200"){
							self.wallet.sum = self.wallet.sum = self.wallet.pickupNum;
							self.wallet.pickupNum = "";
							window.$toast.alert("提现成功");
							window.history.go(-1);
						}else{
							data.msg && window.$toast.alert(data.msg);
						}
						self.dialog.show = false;
					}
				})
			},
			onCancel(){
				this.dialog.show = false
			},
		},
		mounted(){
			var self = this;

			var userinfo = self.$getUserInfo();
			self.wallet.bankAddress = userinfo.bankAddress;
			self.wallet.bankCardTail = userinfo.bankCard;
			var len = userinfo.bankCard.length;
			self.wallet.bankCardTail = self.wallet.bankCardTail.slice(len - 4, len);
			this.wallet.sum = this.$route.query.sum || 0;
		}
	}
</script>

<style lang="less" scoped>
	.p-binkbind{
		height: 100%;
	}
	.bank{
		font-size: 18px;
	}
	.bank-card{
		font-size: 12px;
	}
	.m-panel.money{
		text-align: left;
	}
	.tips{
		padding-left: 0.3rem;
		margin-top: 0.2rem;
	}
	.money-input{
		border-bottom: 1px solid #f0f0f0;
		display: flex;
		justify-content: left;
		padding: 0.21rem 0;
		margin-bottom: 0.2rem;

		input{
			line-height: 0.78rem;
			font-weight: bold;
			font-size: 36px;
		}
	}
	.money-icon{
		font-size: 32px;
		font-weight: bold;
		line-height: 0.5rem;
		margin-right: 0.15rem;
		padding-top: 0.2rem;
	}
	.all-pickup{
		color: #6d48ff;
		float: right;
	}
	.pickup-btn{
		font-size: 24px;
	}

	.m-dialog{
		.header{
			margin-top: 0.5rem;
			font-size: 16px;
		}
		.money{
			margin-top: 0.5rem;
			font-size: 36px;
			font-weight: bold;
		}
		.content{
			margin-top: 0.5rem;
			font-size: 12px;
			color: #9f9f9f;
		}
		.button{
			display: flex;
			flex-direction: row;
			height: 0.9rem;
			border-top: 0.01rem solid #f0f0f0;
			height: 1rem;
			line-height: 1rem;
			margin-top: 0.3rem;

			.cancel{
				line-height: 1rem;
				width: 50%;
				font-size: 16px;
				border-right: 0.01rem solid #f0f0f0;
			}
			.confirm{
				color: #cb3c30;
				line-height: 1rem;
				width: 50%;
				font-size: 16px;
			}
		}
	}

</style>