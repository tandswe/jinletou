<template>
	<div class="myself home">

		<cmheader :title="'认证中心'"></cmheader>

		<!-- 头部占位 -->
		<div class="u-header-padding" ></div>

		<!-- 个人信息 -->
		<div class="m-details">

			<div v-for="item in nameInputs.items" 
				class="c-list-item"
			>
				<div class="c-item-label">
					{{item.label}}
				</div>
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
					items: []
				}
			}
		},
		methods:{
			submit(){
				var params={
					id:this.$store.state.id,
				}
				var items = this.nameInputs.items;
				var warn;
				var self = this;

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
						var code=res.data.data.code;
						if(code=='200'){
							console.log("ok", res.data);
						}else{

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
			var fields = ['userName', 'idCard', 'phone', 'email', 'address'];
			var self = this;
			var userInfo = self.$getUserInfo();
			for(var f in userInfo){
				if(userInfo[f] && fields.indexOf(f) > -1){
					self.nameInputs.items.push({
						name: f,
						label: userInfo[f]
					})
				}
			}

			self.nameInputs.items.sort(function(a, b){
				return fields.indexOf(a.name) > fields.indexOf(b.name) 
			})
			// console.log(userInfo);
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