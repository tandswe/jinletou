<template>
	<div class="myself home">

		<cmheader :title="'认证中心'"></cmheader>

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
			<button @click="submit">认证</button>
			<div class="c-btn-details">
				说明：请如实填写认证信息，一旦认证不可自行修改。如需修改请联系客服。
			</div>
		</div>
	
	</div>
</template>

<script>
	import { XButton, Popup } from 'vux'	
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
						name: 'userName',
						value: '',
						placeholder: '输入姓名',
						checker: function(item, $getChecker){
							if(!item.value)
								return "请输入姓名"

							if(!$getChecker('userName')(item.value))
								return "姓名格式不正确"
						}
					}, {
						name: 'idCard',
						value: '',
						placeholder: '输入身份证号码',
						checker: function(item, $getChecker){
							if(!item.value)
								return "请输入身份证号码"

							if(!$getChecker('idCard')(item.value))
								return "身份证号码不合法"
						}
					}, {
						name: 'wechat',
						value: '',
						placeholder: '输入微信号',
						checker: function(item, $getChecker){
							if(!item.value)
								return "请输入微信号"

							if(!$getChecker('wechat')(item.value))
								return "请输入正确的微信号"
						}
					}, {
						name: 'email',
						value: '',
						placeholder: '输入邮箱',
						checker: function(item, $getChecker){
							if(!item.value)
								return "请输入邮箱"

							if(!$getChecker('email')(item.value))
								return "请输入正确的邮箱"
						}
					}, {
						name: 'address',
						value: '',
						placeholder: '输入地址信息',
						checker: function(item, $getChecker){
							if(!item.value)
								return "请输入地址"

							if(!$getChecker('address')(item.value))
								return "地址不正确"
						}
					}]
				}
			}
		},
		methods:{
			submit(){
				var params={
					id:this.$store.state.id,
				}
				var self = this;
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
				params=this.$qs.stringify(params);

				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/updateUserDetail'
				}).then(function(res){
					if(res.status=='200'){		// TODO 
						var status=res.data.status;
						if(status=='200'){
							window.history.go(-1)
						}else{
							res.data.msg && window.$toast.alert(res.data.msg)
						}
					}
				}).catch(function(err){

				})
			},
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