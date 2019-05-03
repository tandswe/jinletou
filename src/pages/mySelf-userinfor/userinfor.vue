<template>
	<div class="myself home">
		<cmheader :title="'个人中心'"></cmheader>

		<!-- 头部占位 -->
		<div class="u-header-padding" ></div>

		<!-- 个人信息 -->
		<div class="m-details">

			<div class="c-list-item c-list-item-raw">
				<div class="c-item-label">
					<label class="f-fs-16">
						{{ details.userImg.label }}
					</label>
				</div>
				<div class="c-item-content"
					@click="details.userImg.onClick"
				>
					<div>
						<img class="head-portrail" 
							:src="details.userImg.img" 
							@click="details.userImg.onClick()">
					</div>
					<div class="c-item-raw-right"></div>
				</div>
			</div>

			<div v-for="item in details.items" 
				class="c-list-item c-list-item-raw" 
				@click="item.onClick(item)"
			>
				<div class="c-item-label f-gray-2">
					<label class="f-fs-16"> {{item.label}} </label>
				</div>
				<div class="c-item-content"
				>
					<div v-if="item.filterType"
						:class="item.class"
						class="f-fs-14"
					>
						{{ item.content | myfilters(item.filterType) }}
					</div>
					<div v-else
						:class="item.class"
						class="f-fs-14"
					>
						{{ item.content }}
					</div>
							
					<div v-if="item.rawRight" class="c-item-raw-right"></div>
				</div>
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

		<popup v-model="popup.show" 
			@on-show="popup.onShow"
			@on-hide="popup.onHide"
		>
			<div class="m-popup popoup-select-headport" height="300">
			<div class="m-selector">
				<div class="header f-fs-14">
					选择头像
				</div>
				<div class="haederpoit-list">

					<div class="list-item" v-for = "item in headPoint.items"
						@click="item.check(item)"
					>
						<div class="wrap f-clear"
						>
							<img class="headpoint" :src="item.url" alt=""
							>
							<div class="checkbox i-checkbox"
								:class="item.class"
							></div>
							<label>{{item.label}}</label>
						</div>
					</div>

				</div>
			</div>
			<div class="cancel f-fs-16"
				@click="popup.onCancel"
			>
				取消
			</div>
			</div>
		</popup>		
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	import { XButton, Popup, Toast } from 'vux'	
	import { debug } from 'util';
	
	var imgSrc = "http://39.98.52.58:8088/resource/header/";
	var toast = {
		show: false,
		text: ""
	}
	var popup ={
		show: false,
		headUlrBak: "man.png",
		$parent: null,
		onShow: function (){
	
		},
		onCancel: function (){			// 取消
			var $parent = popup.$parent;
			var headPointItem = null;
			var headPointItems = $parent.headPoint.items;
			for(var i=0; i<headPointItems.length; i++){
				headPointItems[i].class.checked = headPointItems[i].img === popup.headUlrBak;
			}
		},
		onHide: function (){			// 确定
			var $parent = popup.$parent;
			var headPoints = $parent.headPoint.items;
			var checkedItem = null;

			$parent.headPoint.items.forEach(function (item){
				if(item.class.checked)
					checkedItem = item;
			}) 

			var params = {
				id: $parent.$store.state.id,
				headImg: checkedItem.img
			};
			
			$parent.$HRApp('updateUserDetail', {
				// FIXME: true,    // 500 报错
				params: params,
				then: function(res){
					$parent.$resetUserInfor({
						headImg: checkedItem.img
					})
					$parent.details.userImg.img = imgSrc + checkedItem.img;
					popup.headUlrBak = checkedItem.img;

					toast.show = true;
					toast.text = '修改成功';
				},
				catch: function(err){
				}
			})
		}
	}

	export default{
		name:'myself',
		filters: {
			myfilters: function(value, type){
				if(!value) return "未认证";
				value = value.toString();
				if(!value.length) return "未认证";
				return utils.filters(value, type);
			}
		},
		data(){
			var _self = this;
			var nameItem = {
				label: '昵称',
				content: '未设置昵称',
				rawRight: true,
				onClick: function(){
					var name = nameItem.content === "未设置昵称" ? "" : nameItem.content;
					_self.$gotoPages("/mySelf-userinfor-changename", {
						nickName: name
					})
				},
				class: {
					'f-gray-2': true
				}
			}
			return{
				toast: toast,
				imgSrc: imgSrc,
				popup: popup,
				details: {
					userImg:{
						label: '头像',
						img: 'http://39.98.52.58:8088/resource/header/man.png',
						rawRight: true,
						onClick: function(){
							popup.show = true;
						}
					},
					items:[
						nameItem,
						{
							label: '手机号码',
							content: '未认证',
							filterType: 'phone',
							class: {
								'f-gray-1': true
							}
						},{
							label: '身份证',
							content: '未认证',
							filterType: "identify",
							class: {
								'f-gray-1': true
							}
					}]
				},
				headPoint: {
					items: [{
						label: '男',
						img: 'man.png',
						check: function(item){
							_self.check(item)
						},
						class: {
							checked: true
						}
					}, {
						label: '女',
						img: 'woman.png',
						check: function(item){
							_self.check(item)
						},
						class: {
							checked: false
						}
					}, {
						label: '老',
						img: 'old.png',
						check: function(item){
							_self.check(item)
						},
						class: {
							checked: false
						}
					}, {
						label: '少',
						img: 'young.png',
						check: function(item){
							_self.check(item)
						},
						class: {
							checked: false
						}
					}]
				},
			}
		},
		methods:{
			toLink(href){
				if(!this.isLogined){
					this.$gotoPages('/login')
				}else{
					this.$gotoPages(href)
				}
			},
			showPopUp(){
				this.$store.state.isShowPop=true				
			},
			check: function (item){
				var checked = true;
				var self = this;
				this.headPoint.items.forEach(function (item){
					item.class.checked = false;
				}) 
				item.class.checked = checked;
				// this.details.userImg.img = item.url;
			},
			creatHeadPointUrl(item){
				var self = this;
				this.headPoint.items.forEach(function (item){
					item.url = self.imgSrc + item.img
				})
			}
		},
		components:{ 
			XButton,
			Popup,
			Toast,
			cmheader,
		},
		created(){
			var userInfo = this.$store.state.userInfo;
			var self = this;

			var nameItem =  this.$findObj(this.details.items, 'label', '昵称');
			nameItem.content = userInfo.nickName || nameItem.content;

			var phoneItem =  this.$findObj(this.details.items, 'label', '手机号码');
			phoneItem.content = userInfo.phone || phoneItem.content;

			var idCardItem =  this.$findObj(this.details.items, 'label', '身份证');
			idCardItem.content = userInfo.idCard || idCardItem.content;

			this.creatHeadPointUrl();

			var headimg = this.$store.state.userInfo.headimg;
			if(headimg){
				this.details.userImg.img = headimg;
			}
			var userInfo = this.$getUserInfo();
			popup.$parent = this;
			if(userInfo.headImg){
				var headPointItem = this.$findObj(
					this.headPoint.items, 
					'img',
					userInfo.headImg
				)

				if(headPointItem){
					this.details.userImg.img = self.imgSrc + userInfo.headImg;
					this.check(headPointItem)
					popup.headUlrBak = headPointItem.img;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.myself{
	.m-popup{
		height: 5.5rem;
		.header{
			padding: 0.4rem 0;
			text-align: center;
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
					width: 1.35rem;
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
						width: 0.4rem; 
						height: 0.4rem;
						margin-top:  0.2rem;
						margin-left: 0.1rem;
					}
					label{
						text-align: center;
						width: 0.8rem;
						float: left;
						display: block;
						padding: 0.12rem 0;
					}
				}
				
			}
		}

		.cancel{
			border-top: 0.01rem solid #f5f5f5; 
			text-align: center;
			line-height: 1rem;
			height: 1rem;
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