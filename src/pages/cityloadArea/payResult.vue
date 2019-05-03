<template>
	<div class="">
		<cmheader :title="thatTitle"></cmheader>
		<div v-if="payResultStatus==4">
			<div class="pay-result">
				<img src="../../../static/chicon/支付失败@2x.png">
				<div class="pay-result-title">
					购买失败
				</div>
				<div class="pay-result-tips">
					提示，购买失败
				</div>
			</div>
			<div class="result-back" @click="goCityLoadArea">
				<div class=" btn-bg back-btn">
					返回城主专区
				</div>
			</div>
		</div>
		<div v-if="payResultStatus==1">
			<div class="pay-result">
				<img src="../../../static/chicon/支付成功@2x.png">
				<div class="pay-result-title">
					购买成功
				</div>
				<div class="pay-result-tips">
					提示，购买成功
				</div>
			</div>
			<div class="result-back" @click="goCityLoadArea">
				<div class=" btn-bg back-btn">
					返回城主专区
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	export default {
		name: '',
		data() {
			return {
				thatTitle:'支付结果',
				payResultStatus:null
			}
		},
		components: {
			cmheader
		},
		methods: {
			goCityLoadArea(){
				this.$gotoPages('/cityloadArea')
			}
//			demo() {
//				var _this = this
//				var params = {
//					keyname: ''
//				}
//				params = this.$qs.stringify(params)
//				this.$axios({
//					method: 'post',
//					data: params,
//					url: ''
//				}).then(function(res) {
//					console.log(res)
//					if(res.status == '200') {
//						var getData = res.data
//						if(getData.status == '200') {
//							var _data = getData.data
//							_this.XXXX = _data
//						}
//					}
//				}).catch(function(err) {
//					console.log(err)
//				})
//			}
		},
		mounted() {
			this.payResultStatus=this.$route.query.payResultStatus
		}
	}
</script>

<style lang="less">
.pay-result{
		padding-top: 1.3rem;
		text-align: center;
		
		img{
			display: block;
			margin: 0 auto;
			margin-bottom: .4rem;
			width: 1.58rem;
			height: 1.58rem;
		}
		.pay-result-title{
			font-weight: 400;
			font-size: 16px;
			line-height: 20px;
			padding-bottom: .44rem;
			label{
				position: relative;
				top: -4px;
			}
		}
		.pay-result-tips{
			font-size: 13px;
			line-height: 17px;
			padding: 0 .3rem;
		}
		
	}
	.result-back{
			padding: .3rem;
			box-sizing: border-box;
			width: 100%;
			position: absolute;
			bottom: 0;
			left:0;
			.back-btn{
				width: 100%;
				height: .86rem;
				color: #FFFFFF;
				border-radius: .1rem;
				font-size: 16px;
				text-align: center;
				font-weight: 600;
				line-height: .86rem;
			}
		}
</style>