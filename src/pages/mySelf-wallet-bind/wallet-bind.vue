<template>
	<div class="myself home">
		<cmheader :title="'绑定银行卡'"></cmheader>

		<!-- 头部占位 -->
		<div class="u-header-padding" ></div>

		<!-- 个人信息 -->
		<div class="m-details">

			<div v-for="item in nameInputs.items" 
				class="c-list-item c-list-item-input"
				@click="item.onClick && item.onClick(item)"
			>
				<input type="text" :placeholder="item.placeholder" v-model="item.value">
			</div>
		
		</div>

		<div class="c-btn">
			<button @click="submit">绑定</button>
			<div class="c-btn-details f-gray-2">
				说明：银行卡用于提现使用，请确认好输入的银行卡信息。
			</div>
		</div>
	
	</div>
</template>

<script>
	import { XButton, Popup } from 'vux';
	import cmheader from '../../components/cmHeader.vue'
	
	var popup ={show: false}
	var common = {
		pageState: 'details'
	}

	export default{
		name:'myself',
		filters: {
		},
		data(){
			return{
				popup: popup,
				commond: common,
				nameInputs:{
					items: [{
						name: 'bankAddress',
						value: '',
						placeholder: '输入银行卡开户行',
						checker: function(item){
							if(!item.value || (item.value.length && item.length < 2))
								return "请输入银行卡开户行"
						}
					}, {
						name: 'bankCard',
						value: '',			//FIXME
						placeholder: '输入银行卡账号',
						checker: function(item, $getChecker){
							if(!item.value)
								return "请输入银行卡账号"

							if(!$getChecker('bankCard')(item.value))
								return "银行卡格式不正确";
 						}
					}, {
						name: 'bankPerson',
						value: '',
						placeholder: '输入持卡人姓名',
						checker: function(item, $getChecker){
							if(!item.value)
								return "请输入持卡人姓名"

							if(!$getChecker('userName')(item.value))
								return "姓名格式不正确"
						}
					}, {
						name: 'bankPhone',
						value: '',
						placeholder: '输入银行预留手机号',
						checker: function(item, $getChecker){
							if(!item.value)
								return "请输入银行预留手机号";

							//验证规则：11位数字，以1开头。
							if( !$getChecker('phone')(item.value))
								return "手机号格式不正确";

						}
					}]
				}
			}
		},
		methods:{
			submit(){
				var self = this;
				
				var params={
					id:this.$store.state.id,
				}
				var items = this.nameInputs.items;
				var warn;

				for(var i=0; i< items.length; i++){
					var item = items[i];
					warn = item.checker(item, this.$getChecker);
					params[item.name] = item.value;
					if(warn){
						window.$toast.alert(warn);
						return;
					}
				}
				var userInfoParmas = JSON.parse(JSON.stringify(params));

				this.$HRApp('bindBankCard', {
					params: params,
					then: function(data){
						if(data.status=='200'){
							window.$toast.alert('绑定成功');
							delete userInfoParmas.id;
							userInfoParmas.bankStatus = 1;  // FIXME getUserDetail接口无这些字段
							self.$resetUserInfor(userInfoParmas);
							window.history.go(-1);
						}else{
							data.msg && window.$toast.alert(data.msg);
						}
					}
				})
			}
		},
		components:{
			XButton,
			Popup,
			cmheader
		},
		created(){
		}
	}
</script>

<style lang="less" scoped>
.myself{

	.u-header-padding{
		height: 0.9rem;
		width: 100%;
	}

	.m-popup{
		height: 6rem;
		.header{
			padding: 0.4rem 0;
		}

		.haederpoit-list{
			flex-wrap: wrap;
			display: flex;
			justify-items: 2;
			justify-content: center;

			.list-item{
				flex-basis: 50%;
				height: 1.7rem;

				.wrap{
					// &>div{
					// 	display: block;
					// }
					width: 1.25rem;
					margin: 0 auto;
					
					.headpoint{
						float: left;
						display: inline-block;
						width: 0.8rem;
						height: 0.8rem;
						border-radius: 0.25rem; 
					}
					.checkbox{
						float: right;
						display: inline-block;
						line-height: 0.8rem;
						height: 0.8rem;
						width: 0.45rem;
					}
					label{
						width: 0.8rem;
						float: left;
						display: block;
						padding: 0.12rem 0;
					}
				}
				
			}
		}
	}

	.m-details{
		.c-list-item{
			padding-right: 0.6rem;

			.c-item-raw-right{
				margin-left: 0.15rem;
				margin-right: -0.44rem;
			}

			.c-item-content{
				.head-portrail{
					width: 1.25rem;
					height: 1.25rem;
					border-radius: 0.625rem;
				}
			}
		}

		.right-raw{
			width: 0.24rem;
			height: 0.33rem;
			margin-left: 0.15rem;
			margin-right: -0.44rem;
		}

		.item.user-headport{
			img.head-portrail {
				width: 1.25rem;
				height: 1.25rem;
				border-radius: 0.625rem;
			}
			img.right-raw{
				width: 0.24rem;
				height: 0.33rem;
			}
		}

		.item{
			padding: 0.24rem 0.6rem 0.24rem 0.16rem;
			box-sizing: border-box;
			border-bottom: 1px solid #000;
			flex-wrap: nowrap;

			label{
				text-align: left;
				display: inline-block;
			}

			.content{
				.right-raw{
					display: block;
				}
			}
		}
	}
}
</style>