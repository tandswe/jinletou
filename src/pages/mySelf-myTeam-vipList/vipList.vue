<template>
	<div class="myself home">
		<cmheader :title="title"></cmheader>

		<!-- 头部占位 -->
		<div class="u-header-padding" ></div>

		<!-- 个人信息 -->
		<div class="m-details">

			<div class="no-data" v-if="!vipList.items.length">
				没有数据...
			</div>

			<div v-for="item in vipList.items" 
				class="c-list-item"
				@click="item.onClick && item.onClick(item)"
			>
				<div class="c-item-label user-infor">
					<img class="user-infor-img" :src="item.img" alt="">
					<div class="user-infor-details">
						<p class="f-fs-16">{{item.label}}</p>
						<p class="user-infor-phone f-fs-12" 
							v-if="item.phone && level == 1"
						>{{item.phone}}</p>
					</div>
				</div>
				<div class="c-item-content f-fs-12 f-gray-1"
					:class="{
						'date-bottom': level == 1
					}"
				>
					{{item.date}}
				</div>
			</div>
		
		</div>
	
	</div>
</template>

<script>
	import { XButton, Popup } from 'vux'	
	import cmheader from '../../components/cmHeader.vue'
import { debug } from 'util';
	
	var common = {
		pageState: 'details'
	}
	var imgSrc = "http://39.98.52.58:8088/resource/header/";

	export default{
		name:'myself',
		filters: {
		},
		data(){
			return{
				commond: common,
				title: '一级会员',
				level: 1,
				vipList:{
					items: []
				}
			}
		},
		methods:{
			getVipList: function(pageNum){
				var params={
					id:this.$store.state.id,
					pageNum: pageNum,
					pageSize: 200		// FIXME
				}
				var self = this;

				params=this.$qs.stringify(params);
				var levelApi = {
					1: 'getOneInvitationList',
					2: 'getTwoInvitationList'
				}
				var url = '/appApi/appUsers/' + levelApi[this.level];
				this.$axios({
					method:'post',
					data:params,
					url: url
				}).then(function(res){
					if(res.status=='200'){	 
						console.log("请求会员列表成功：", res.data);
						var data = res.data;
						
						if(data.status === "200" && data.data){ 	// FIXME 500
							var arr = [];
							data.data.forEach(function(item, index){
								arr.push({			// FIXME push 生效
									label: item.nickName || "无昵称",
									img: imgSrc + (item.headImg || 'man.png'),
									phone: item.phone,
									date: item.inviteTime.split(" ")[0],
								})
							})

							self.vipList.items = arr;
						}else{
						}
					}
				}).catch(function(err){

				})
			}
		},
		components:{
			XButton,
			Popup,
			cmheader
		},
		created(){
			this.level = this.$route.query.level;
			this.title = {
				1: '一级会员',
				2: '二级会员'
			}[this.level];
			
			this.getVipList(1);
		}
	}
</script>

<style lang="less" scoped>
.myself{

	.u-header-padding{
		height: 0.9rem;
		width: 100%;
	}

	.m-details{

		.no-data{
			line-height: 1rem;
			text-align: center;
			font-size: 14px;
			color: #9f9f9f;
		}

		.c-list-item{
			padding-right: 0.6rem;

			.c-item-label{

				&.user-infor{
					width: 200%;
			
					.user-infor-img{
						width: 0.8rem;
						height: 0.8rem;
						border-radius: 0.4rem;
						margin-right: 0.2rem;
					}
					.user-infor-details{
						text-align: left;
					}
					.user-infor-phone{
						margin-top: 0.1rem; 
					}
				}
			}

			.c-item-raw-right{
				margin-left: 0.15rem;
				margin-right: -0.44rem;
			}

			.c-item-content.date-bottom{
				padding-top: 0.5rem;
			}
		}

		.right-raw{
			width: 0.24rem;
			height: 0.33rem;
			margin-left: 0.15rem;
			margin-right: -0.44rem;
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