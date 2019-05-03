<template>
	<div class="share-box-wrap">
		<img src="../../../static/chicon/share/bg.jpg" class="share-bg">
	<div class="share-box"> 	
		<div class="share-title">
			<img src="../../../static/chicon/白色返回@3x.png" @click="goBack">
			推广二维码
		</div>
		
		<div class="share-content">
			
			<div class="share-div">
				<div class="share-code">
					<div class="share-code-radius" @click="saveCodeImg">
						<img :src="userInfo.linkImgUrl">
					</div>
				</div>
				<div class="share-link">
					<div class="share-link-content">
						
					<div class="link-box">
						{{userInfo.linkUrl}}
					</div>
					<div @click="copyUrl2">
						复制链接
					</div>
				</div>
				</div>
				<div class="share-code-btn" @click="showDialog">
					<img src="../../../static/chicon/share/分享按钮@2x.png">
				</div>
				<div class="share-words">
					<img src="../../../static/chicon/share/share-words.png">
				</div>
			</div>
			<textarea ref="myWords" v-model="userInfo.linkUrl" class="remember-value" ></textarea>
		</div>
		<toast v-model="showMsg" type="text" :time='1200' is-show-mask :text="msgContent" :position="'middle'" width="6em"></toast>
		<Popup v-model="isPopUp">
			<div class="share-link-list">
				<div class="share-link-title">
					分享到
				</div>
				<div class="flex-start flex-item-4 share-list">
					<div v-for="(item,index) in shareLinkList" @click="shareClk(item)">
						<img :src="item.img">
						<div>
							{{item.label}}
						</div>
					</div>
				</div>
				<div class="share-cancel" @click="isPopUp=false">
					取消
				</div>
			</div>
		</Popup>
	</div>
	</div>
</template>

<script>
	import {Popup,Toast} from 'vux'
	export default{
		name:'share',
		data(){
			return {
				isPopUp:false,
				userInfo:{},
				msgContent:'',
				showMsg:false,
				shareLinkList:[{
					img:'../../../static/chicon/share/微信@2x.png',
					label:'微信朋友'
				},{
					img:'../../../static/chicon/share/朋友圈@2x.png',
					label:'朋友圈'
				},{
					img:'../../../static/chicon/share/QQ@2x.png',
					label:'QQ好友'
				},{
					img:'../../../static/chicon/share/QQ空间@2x.png',
					label:'QQ空间'
				}]
			}
		},
		methods:{
			shareClk(item){
				
			},
			saveCodeImg(){
				var imgsLink=this.userInfo.linkImgUrl
				if(window.android){
					window.android.SaveCode(imgsLink)
				}else{
					SaveCode(imgsLink)
				}	
			},
			copyUrl2(){
					var v=this.$refs.myWords
					if(this.$isIOS()){
						console.log(v.value)
						copyWords(v.value)
						return false
					}			
				    if(v.value.length>0){
				        v.select();
				        this.msgContent = '链接已复制'
						this.showMsg = true
				        document.execCommand("Copy");
				        return false;
				    }
				    
			},
			goBack(){
				window.history.go(-1);
			},
			showDialog(){
				//this.isPopUp=true
				var linkImgUrl=this.userInfo.linkImgUrl
				if(window.android){
					window.android.shareClick(linkImgUrl)
				}else{
					shareClick(linkImgUrl)
				}	
			},
			initData(){
				var _this=this
				var params={
					id:this.$store.state.id
				}
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/getUserDetail'
				}).then(function(res){
					if(res.status=='200'){
						var getData=res.data
						_this.userInfo=getData.data
						console.log(getData.data)
					}
				}).catch(function(err){
					console.log(err)
				})
			}
		},
		components:{
			Popup,
			Toast
		},
		mounted(){
			this.initData()
		}
	}
</script>

<style lang="less" scoped>
.remember-value{
		opacity: 0;
		width: 0;
		height: 0;
	}
	.link-box{
		height: 20px;
		line-height: 20px;
		overflow: hidden;
	}
	.share-bg{
		width: 100%;
		height: auto;
		top: 0;
		left: 0;
		position: absolute;
	}
	.share-content{
		position: relative;
	}
	.share-cancel{
		height: 1rem;
		line-height: 1rem;
		font-size: 17px;
		font-weight: 400;
	}
	.share-list{
		padding: 0 .3rem .3rem;	
		box-sizing: border-box;
	}
	.flex-item-4{
		flex-wrap: nowrap;
	}
	.flex-item-4 >div{
		width: 25%;
		img{
			width: 1.26rem;
			height: 1.26rem;
			margin-bottom: .1rem;
		}
	}
	
	.share-link-title{
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		font-size: 13px;
	}
	.share-link{
		text-align: center;
		width: 4.5rem;
		margin: 0 auto;
		padding-top: .2rem;
		padding-bottom: .24rem;
		.share-link-content{
			display: inline-block;
			overflow:hidden;
			>div{
				float: left;
			}
			>div:first-child{
				text-decoration: underline;
				max-width: 3.3rem;
				padding-right: .2rem;
				font-size: 14px;
				box-sizing: border-box;
			}
			>div:last-child{
				color: #e63929;
				font-size: 15px;
				font-weight: 700;
			}
		}
	}
	.share-code-btn{
		/*padding-bottom:1.6rem;*/
		img{
			width: 94%;
			display: block;
			margin: 0 auto;
			height: auto;
		}
	}
	.share-words{
		margin-bottom: .3rem;
		img{
			width: 90%;
			display: block;
			margin: 0 auto;
			height: auto;
		}
	}
	.share-code{
		width: 2.7rem;
		height: 2.7rem;
		margin: 0 auto;
		padding-top: .57rem;
		.share-code-radius{
			width: 100%;
			height: 100%;
			padding: .2rem;
			box-sizing: border-box;
			background: url(../../../static/chicon/share/二维码边框@2x.png);
			background-size: 100% 100%;
			img{
				width: 100%;
				height: 100%;
				border: 0;
				display: block;
			}
		}
	}
	.share-title{
		height: .88rem;
		line-height: .88rem;
		text-align: center;
		font-weight: 400;
		font-size: 18px;
		/*position: fixed;
		top: 0;
		left: 0;*/
		position: relative;
		color: #FFFFFF;
		width: 100%;
		img{
			width: 24px;
			height: 24px;
			display: block;
			position: absolute;
			left: .24rem;
			top: .15rem;
		}
	}
	.share-content{
		padding:5.5rem .29rem .29rem;
		min-height: 100%;
		box-sizing: border-box;
		.share-div{
			width: 100%;
			height: 100%;
			position: relative;
			background: #FFFFFF;
			border-radius: .14rem;
		}
	}
	.share-box-wrap{
		background-color: #df3328;
		position: relative;
	}
	.share-box{
		width: 100%;
		min-height: 100%;
		background: url(../../assets/背景图@3x.png);
		background-size: 100% auto;
		background-repeat: no-repeat;
		
	}
</style>