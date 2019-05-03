<template>
	<div class="foot">
		<grid>
			<grid-item >
				<div @click="toLink(0)">
					<!--<img src="static/images/sy_navi@2x.png" v-show="$store.state.nowIndex!=0">
					<img src="static/images/sy_navi1@2x.png" v-show="$store.state.nowIndex==0">-->
					<span :class="{'active':nowIndex==0}"></span>
					<p :class="{'active':nowIndex==0}">首页</p>
				</div>
			</grid-item>
			<grid-item>
				<div  @click="toLink(1)">
					<span :class="{'active':nowIndex==1}"></span>
					<p :class="{'active':nowIndex==1}">爆品专区</p>
				</div>
			</grid-item>
			<grid-item>
				<div  @click="toLink(2)">
					<span :class="{'active':nowIndex==2}"></span>
					<p :class="{'active':nowIndex==2}">竞乐投</p>
				</div>
			</grid-item>
			<grid-item>
				<div  @click="toLink(3)">
					<span :class="{'active':nowIndex==3}"></span>
					<p :class="{'active':nowIndex==3}">个人中心</p>
				</div>
			</grid-item>
		</grid>
		<Popup v-model="$store.state.isShowPop">
			<div class="set-z-index login-out-pop">
				<div>
					退出后重新登陆需输入账号密码,确定？
				</div>
				<div class="login-out-btn" @click="loginOut">
					退出登陆
				</div>
				<div @click="$store.state.isShowPop=false">
					取消
				</div>
			</div>
		</Popup>
	</div>
</template>

<script>

	import { Grid, GridItem,Popup } from 'vux'
	export default {
		components: {
			Grid,
			GridItem,
			Popup
		},
		computed:{
			nowIndex(){
				return Number(this.$store.state.nowIndex)
			}
		},
		methods:{
			loginOut(){
				this.$store.state.logined=false
				this.$store.state.isShowPop=false
				this.$cookie.delete('uid')
				this.$cookie.delete('username')
				this.$cookie.delete('mobile')
				this.$cookie.delete('loginToken')
				this.$gotoPages('/login')
			},
			
			toLink(index){
				this.$store.state.nowIndex=index
				sessionStorage.setItem('footIndex',index)
				var path=''
				//this.$emit('change',index)
				switch(index){
					case 0:
						path='/home'
						sessionStorage.setItem('nowIndex',0)
						break;
					case 1:
						path='/cityloadArea'
						sessionStorage.setItem('nowIndex',1)
						break;
					case 2:
						path='/findNew'
						sessionStorage.setItem('nowIndex',2)
						break;
					case 3:
						path='/mySelf'
						sessionStorage.setItem('nowIndex',3)
						break;
					default: 
						break;
				}
				this.$gotoPages(path)
//				if(this.$store.state.logined){
//					var query={
//						loginToken:this.$store.state.loginToken,
//						uid:this.$store.state.uid
//					}
//					this.$gotoPages(path,query)
//				}else{
//					this.$gotoPages(path)
//				}
			},
			getNowIndex(){
				//console.log(this.$routes.name)
				//if(this.$routes)
				if(sessionStorage.getItem('nowIndex')){
					this.$store.state.nowIndex=Number(sessionStorage.getItem('nowIndex'))
				}
			}
		},
		created(){
			this.getNowIndex()
		}
	}
</script>

<style scoped="true">
	.vux-popup-mask.vux-popup-show{
		z-index: 1!important;
	}
	.weui-grids:before,
	.weui-grid:before,
	.weui-grid:after,
	.weui-grids:after {
		border: none;
	}
	
	.weui-grid {
		padding: .1rem 0 .1rem 0;
		line-height: 15px;
	}
	.weui-grids{
	    height: 100%!important;
	}
	.weui-grid__label {
		margin: 0;
	}
	.foot{
		height: 1rem;
		line-height: 1rem;
	}
	.foot p{
		color: #999999;
		font-size: 12px;
		padding-top: .02rem;
		line-height: 14px;
	}
	.foot p.active{
		color: #e03228;
		line-height: 14px;
		font-size: 14px;
	}
	.foot a{
		text-decoration: none;
		height: 100%;
		box-sizing: border-box;
	}
	.weui-grids{
		/*padding: .2rem 0;*/
		position: relative;
	}
	.weui-grid>div{
		position: absolute;
		width: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		-webkit-transform: translate(-50%,-50%);
		-moz-transform: translate(-50%,-50%);
		-o-transform: translate(-50%,-50%);
	}
	.weui-grids a span{
		display: inline-block;
		width: 22px;
		height: 22px;
	}
	.weui-grids a:first-child span{
		background: url(../assets/首页@3x.png);
		background-size: 100% 100%;
	}
	.weui-grids a:first-child span.active{
		background: url(../assets/首页选中@3x.png);
		background-size: 100% 100%;
	}
	
	.weui-grids a:nth-of-type(2) span{
		background: url(../assets/城主专区@3x.png);
		background-size: 100% 100%;
	}
	.weui-grids a:nth-of-type(2) span.active{
		background: url(../assets/城主专区选中@3x.png);
		background-size: 100% 100%;
	}
	.weui-grids p.active{
		color: #e03228;
	}
	.weui-grids a:nth-of-type(3) span{
		background: url(../assets/竞乐投@3x.png);
		background-size: 100% 100%;
	}
	.weui-grids a:nth-of-type(3) span.active{
		background: url(../assets/竞乐投选中@3x.png);
		background-size: 100% 100%;
	}
	
	.weui-grids a:nth-of-type(4) span{
		background: url(../assets/我的@3x.png);
		background-size: 100% 100%;
	}
	.weui-grids a:nth-of-type(4) span.active{
		background: url(../assets/我的选中@3x.png);
		background-size: 100% 100%;
	}
</style>