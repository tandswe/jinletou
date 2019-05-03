<template>
	<div class="myself home">

		<div class="m-bg">
			<span class="u-custom-service"
				@click="toLink({toPageUrl: '/cityloadArea/editAd',type:1})"
			></span>
		</div>
		<div class="m-user">
			<div class="container">	
				<div @click="toLink({toPageUrl: '/mySelf-userinfor'})">
					<div class="cityowner f-clear"
						v-if="isCityOwner"
					>
						<i class="i-cityowner f-fl"></i>
						<span class="f-fr">
							城主
						</span>
					</div>
					<img class="user-headport" src="http://39.98.52.58:8088/resource/header/man.png" alt="" v-if="user.img=='man.png'">
					<img class="user-headport" src="http://39.98.52.58:8088/resource/header/old.png" v-else-if="user.img=='old.png'">
					<img class="user-headport" src="http://39.98.52.58:8088/resource/header/woman.png" v-else-if="user.img=='woman.png'">
					<img class="user-headport" src="http://39.98.52.58:8088/resource/header/young.png" v-else-if="user.img=='young.png'">
					<img class="user-headport" src="http://39.98.52.58:8088/resource/header/man.png" v-else>
					<p class="user-name">
						<span class="f-fs-18">{{user.name}}</span>
						<i class="i-raw-right"></i>
					</p>
					<p class="user-phone f-gray-1 f-sz-18"
						v-if="user.phone"
					>
						手机号：{{user.phone | myfilters('phone')}}
					</p>
				</div>
				<div class="wallet-details">
					<div class="item">
						<p class="num f-fs-18 f-fw-b">{{wallet.sum}}</p>
						<p class="label f-fs-12 f-gray-1">总余额</p>
					</div>
					<div class="item">
						<p class="num f-fs-18 f-fw-b">{{wallet.incommonyes}}</p>
						<p class="label f-fs-12 f-gray-1">昨日收入</p>
					</div>
					<div class="item">
						<p class="num f-fs-18 f-fw-b">{{wallet.pickedup}}</p>
						<p class="label f-fs-12 f-gray-1">已提现</p>
					</div>
				</div>
			</div>
		</div>

		<!-- 个人信息 -->
		<div class="m-details" v-show="commond.pageState === 'details'">
			
			<template v-for="item in details.items">
				<div class="c-list-item c-list-item-raw noborder"
					v-if="item.type !== 'line'"
					@click="toLink(item)"
				>
					<div class="c-item-label f-gray-2"
					>
						<img class="label-icon" v-if="item.icon" :src="getIconUrl(item)" alt="">
						<label class="f-fs-14"> {{item.label}} </label>
					</div>
					<div class="c-item-content"
					>
						<div
							v-if="item.content"
							:class="item.class"
							class="f-fs-14"
						>
							{{ item.content }}
						</div>
								
						<div v-if="item.rawRight" class="c-item-raw-right"></div>
					</div>
				</div>

				<hr class="line-item" v-if="item.type === 'line'">
			</template>
		
		</div>

		<!-- 输入昵称 -->
		<div class="m-name-input" v-if="commond.pageState === 'nameInput'">
			<div class="c-list-item">
				<input  type="text" placeholder="输入昵称">
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

		<popup v-model="popup.show" >
		</popup>		
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	import { XButton, Popup } from 'vux'	
	import {Toast} from 'vux'

	var toast = {
		show: false,
		text: ""
	}
	var imgSrc = ""; //http://39.98.52.58:8088/resource/header/
	var popup ={show: false}
	var common = {
		pageState: 'details'
	}
	// console.log(this)
	export default{
		name:'myself',
		filters: {
			myfilters: function(value, type){
				return value && utils.filters(value, type);
			}
		},
		data(){
			return{
				toast: toast, 
				popup: popup,
				commond: common,
				hasIdentified: false,
				isCityOwner: false,
				user:{
					name:'',
					img: '',
					// img: require('../../img/myself/man.png'),
					phone:'',
					userLevel:''
				},
				details: {
					sum: 0,
					items:[{
							label: '钱包',
							icon: 'wallet',
							content: '',
							rawRight: true,
							toPageUrl: '/mySelf-wallet',
							class: {
								'f-gray-2': true
							}
						},{
							label: '收支明细',
							icon: 'budget',
							rawRight: true,
							toPageUrl: '/mySelf-budget',
							class: {
								'f-gray-1': true
							}
						}, {
							label: '认证中心',
							icon: 'identification',
							rawRight: true,
							toPageUrl: '/mySelf-identification',
							content: "",
							class: {
								'f-gray-1': true
							}
						}, {
							label: '我的团队',
							icon: 'myTeam',
							rawRight: true,
							toPageUrl: '/mySelf-myTeam',
							class: {
								'f-gray-1': true
							}
						}, {
							label: '邀请有奖',
							icon: 'invite',
							rawRight: true,
							toPageUrl: '/cityloadArea/share',
							class: {
								'f-gray-1': true
							}
						}, {
							label: '横线',
							type: 'line'
						}, {
							label: '账号与安全',
							icon: 'acount',
							rawRight: true,
							toPageUrl: '/mySelf-acount',
							class: {
								'f-gray-1': true
							}
						}, {
							label: '关于我们',
							icon: 'about',
							rawRight: true,
							toPageUrl: '/mySelf-about',
							class: {
								'f-gray-1': true
							}
						}, {
							label: '联系我们',
							icon: 'conect',
							rawRight: true,
							toPageUrl: '/cityloadArea/editAd',
							type:1,
							class: {
								'f-gray-1': true
							}
						}, {
							label: '设置',
							icon: 'setting',
							rawRight: true,
							toPageUrl: '/mySelf-setting',
							class: {
								'f-gray-1': true
							}
						}
					]
				},
				wallet: {
					sum:0,
					incommonyes:0,
					pickedup:0
				},
			}
		},
		methods:{
			getIconUrl: function(item){
				return require("../../img/myself/i-" + item.icon + ".png" );
			},
			toLink(item){
				if(item.toPageUrl){
					// if(item.label === "认证中心" && !this.hasIdentified){
					if(item.label === "认证中心" && this.hasIdentified){
						this.$gotoPages('/mySelf-identifiedalready')
						return;
					}
					this.$gotoPages(item.toPageUrl,item.type?{
							type:item.type?item.type:null
						}:{})
//					if(item.type){
//						
//					}else{
//						this.$gotoPages(item.toPageUrl)
//					}
				}
			},
			showPopUp(){
				this.$store.state.isShowPop=true				
			},
			isIdentified(userinfo){
				var identifield = false;
				var fields = ['userName', 'idCard', 'wechat', 'email', 'address'];
				
				for(var f in userinfo){
					if(fields.indexOf(f) > -1 && userinfo[f]){
						identifield = true;
					}
				}
				return identifield;
			},
			getUserDetail(){
				var self = this;
				var params={
					id:this.$store.state.id,
				}
				params=this.$qs.stringify(params);
				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/getUserDetail'
				}).then(function(res){
					var data = res.data;
					
					if(data && data.status=='200'){
						var userinfor = res.data.data;
						// var userinfor = self.$getUserInfo();
						var headImg = userinfor.headImg || 'headpoint-man.png';

						self.isCityOwner = !!userinfor.cityOwner;
						self.$resetUserInfor(userinfor);
						self.user.name = userinfor.nickName || '未设置昵称';
						self.user.phone = userinfor.phone;
						self.hasIdentified = self.isIdentified(userinfor);
						self.user.img = imgSrc + headImg;

						var identificationItem = self.$findObj(self.details.items, "label", "认证中心");
						var Vue = self.$root;
						Vue.$set(identificationItem, 'content', self.hasIdentified ? "" : "未认证")

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
							self.wallet.sum = data.data.balance;
							self.wallet.incommonyes = data.data.amount;
							self.wallet.pickedup = data.data.withdrawAmount;
						}
					}
				})
			},
			getBalance(){
				var params={
					id:this.$store.state.id,
				}
				params=this.$qs.stringify(params);
				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/getBalance'
				}).then(function(res){
					var data = res.data;
					if(data && data.status=='200'){
						// if(getData.status=='200'){
						// console.log("getBalance",res);
						// }else{

						// }

					}
				}).catch(function(err){
					
				})
			}
		},
		components:{
			XButton,
			Popup,
			cmheader,
			Toast
		},
		created(){
			this.getBalance();
			this.getUserDetail();
		}
	}
</script>

<style lang="less" scoped>
.m-bg{
	height: 3.6rem;
	background: url(../../img/myself/myself-bg.png) no-repeat;
	background-size: 100% 100%;
	margin-bottom: 2.2rem;
	position: relative;

	.u-custom-service{
		position: absolute;
		top: 0.5rem;
		right: 0.3rem;
		background: url(../../img/myself/i-custom-service.png) no-repeat;
		background-size: 100% 100%;
		width: .55rem;
		height: 0.44rem;
		padding-bottom: 2px;
		color: #FFFFFF;
		text-decoration: underline;
	}
}

.m-user{
	position: absolute;
	top: 1.7rem;
	width: 90%;
	left: 50%;
	margin-left: -45%; 
	background: #FFFFFF;
	border-radius: 0.15rem;
	box-shadow: #eaeaea 0.021rem 0.1rem 0.5rem;

	.container{
		position: relative;
		width: 100%;
		height: 100%;
		padding-top: 0.95rem; 

		.cityowner{
			position: absolute;
			right: 0;
			top: 0.3rem;
			font-size: 12px;
			line-height: 0.5rem;
			height: 0.5rem;
			width: 1.1rem;
			text-align: center;
			background-color: #f3d7d5; 
			padding-right: 0.2rem;
			box-sizing: border-box; 

			.i-cityowner{
				background: url(../../img/myself/i-city-owner.png) no-repeat;
				background-size: 100% 100%;
				width: 0.5rem;
				height: 0.5rem;
				border-radius: 0.25rem;
				margin-left: -0.25rem; 
				display: inline-block;
			}
			span{
				color: #d55d51;
			}
		}

		.user-headport{
			width: 1.7rem;
			height: 1.7rem;
			border-radius: 0.85rem;
			left: 50%;
			display: block;
			position: absolute;
			margin-top: -1.8rem; 
			margin-left: -0.85rem; 
		}

		.user-name{
			font-size: 0.25rem;
			text-align: center;
			position: relative;
			margin-bottom: 0.2rem;
			height: 0.53rem;

			span{
				font-size: 20px;
			}

			.i-raw-right{
				height: 0.3rem;
				width: 0.3rem;
				position: absolute;
				right: 0.3rem;
				top: 50%;
				margin-top: -0.15rem;
			}
		}

		.user-phone{
			text-align: center;
			font-size: 13px;
			margin-bottom: 0.3rem;
		}

		.wallet-details{
			height: 1.3rem;
			display: flex;
			justify-content: center;
			border-top: 0.01rem solid #f5f5f5;

			.item{
				width: 100%;
				padding: 0.2rem 0;

				.num{
					font-size: 16px;
					text-align: center;
					margin-bottom: 0.1rem;
				}

				.label{
					text-align: center;
				}
			}
		}
	}
}


.myself{
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
		.line-item{
			border: 0.01rem solid #f5f5f5;
		}
		.c-list-item{
			padding-right: 0.6rem;

			.c-item-label .label-icon{
				height: 0.35rem;
				width: 0.35rem;
				margin-right: 0.2rem;
			}

			.c-item-raw-right{
				margin-left: 0.15rem;
				margin-right: -0.15rem;
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

 .myself-t {
        /*background: url(../img/bg/wd_bg@2x.png);*/
        height: 3.14rem;
        padding-top: .34rem;
        box-sizing: border-box;
        background-size: 100% 100%;
        background-position: 8px 1px;
        .myself-info {
            div {
                text-align: center;
                line-height: .5rem;
                font-size: 18px;
                color: #FFFFFF ;
            }
            .transparent-7-10 {
                font-size: 12px;
            }
            .no-logined{
			 	font-size: 16px;
			 	width: 2.3rem;
			 	border-bottom: 1px solid #FFFFFF;
			 	margin: 0 auto;
			 }
            img {
                margin: 0 auto;
                width: 1.18rem;
                display: block;
                height: 1.18rem;
            }
		    .tourist{
			 	width: 1rem;
			 	height: 1rem;
			 	margin-bottom: .13rem;
			 }
            img.flag {
                margin-top: .08rem;
                width: .8rem;
                height: auto;
            }
        }
    }
</style>