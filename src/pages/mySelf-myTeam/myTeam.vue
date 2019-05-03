<template>
	<div class="myself home">
		<cmheader :title="'个人中心'"></cmheader>

		<!-- <div class="cm-header ">
			<img src="../../../static/myself/set_icon@2x.png" class="pre">
			<div class="p1p">个人中心		
			</div>
		</div> -->

		<!-- 头部占位 -->
		<div class="u-header-padding" ></div>

		<!-- 个人信息 -->
		<div class="m-details" v-show="commond.pageState === 'details'">

			<div v-for="item in details.items" 
				class="c-list-item c-list-item-raw" 
				@click="toLink(item)"
			>
				<div class="c-item-label f-gray-2">
					<label class="f-fs-16"> {{item.label}} </label>
				</div>
				<div class="c-item-content"
				>
					<div
						:class="item.class"
						class="f-fs-14"
					>
						{{ item.content }}
					</div>
							
					<div v-if="item.rawRight" class="c-item-raw-right"></div>
				</div>
			</div>
		
		</div>
		
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	import { XButton, Popup } from 'vux'	
	
	var popup ={show: false}
	var common = {
		pageState: 'details'
	}

	export default{
		name:'myself',
		filters: {
			filterFactory: function(value, type){
				var filter = {
					phone: function(value){
						return "TODO " + value
					},
					identify: function(){
						return "TODO " + value
					}
				}[type];

				return filter(value);
			},
		},
		data(){
			return{
				popup: popup,
				commond: common,
				details: {
					items:[{
						label: '一级会员',
						level: 1,
						rawRight: true,
					},{
						label: '二级会员',
						level: 2,
						rawRight: true,
					}]
				},
			}
		},
		methods:{
			toLink(item){
				this.$gotoPages('/mySelf-myTeam-vipList', {level: item.level})
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