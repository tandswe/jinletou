<template>
	<div class="myself home">
		<cmheader :title="'账号与安全'"></cmheader>

		<!-- 头部占位 -->
		<div class="u-header-padding" ></div>

		<!-- 个人信息 -->
		<div class="m-details">

			<!-- 输入昵称 -->
			<div class="m-name-input">
				<div class="c-list-item c-list-item-input">
					<input type="text" placeholder="输入昵称" v-model="name">
				</div>
			</div>

			<div class="c-btn"
				@click="onConfirm"
			>
				<button>确定</button>
			</div>
		</div>
		
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	import { XButton, Popup } from 'vux'	
import { debug } from 'util';
	
	var popup ={show: false}
	var common = {
		pageState: 'details'
	}

	export default{
		data(){
			return{
				name: ""
			}
		},
		methods:{
			onConfirm(){
				var self = this;
				var $resetUserInfor = self.$resetUserInfor;

				if(!this.name || this.name.length < 3){
					window.$toast.alert("请输入三位字符以上昵称")
					return;
				}

				var params = {
					id: this.$store.state.id,
					nickName: this.name
				};
				
				self.$HRApp('updateUserDetail', {
					FIXME: true,    // 500 报错
					params: params,
					then: function(res){
						debugger
						self.$resetUserInfor({
							nickName: self.name
						})
						window.$toast.alert("更新成功");

						window.history.go("-1")
					},
					catch: function(err){
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
			this.name = this.$route.query.nickName || "";
		}
	}
</script>

<style lang="less" scoped>
.myself{

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

 
 .home{
	position: relative;	
 }
</style>