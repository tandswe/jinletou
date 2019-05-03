<template>
	<div class="more-list">
		<cmheader :title="thatTitle"></cmheader>
		<div class="more-content-list">
			<div class="package-list flex-item-3 flex-start">
				<div class="" v-for="(item,index) in goodsList" @click="toGoodsDetail(item.detailLinkUrl,item)">
					<img :src="item.imgs">
				</div>
				<div @click="morePackage" v-if="!isFirstLoad">
					<img src="../../../static/chicon/cityload/更多礼包@2x.png" class="only-more-btn">
				</div>
			</div>
		</div>
		<toast v-model="showMsg" type="text" :time='1200' is-show-mask :text="msgContent" :position="'middle'" width="6em"></toast>
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	import {Toast} from 'vux'
	export default{
		name:'',
		data(){
			return{
				msgContent:'',
				showMsg:false,
				thatTitle:'礼包列表',
				goodsList:[],
				pageNum:1,
				pageSize:10,
				isLoadding:false,
				isLoadDown:false,
				isFirstLoad:true
			}
		},
		components:{
			cmheader,
			Toast
		},
		methods:{
			toGoodsDetail(link,goodsInfo){
				var price=goodsInfo.price
				var id=goodsInfo.id
				var giftName=goodsInfo.giftName
				this.$gotoPages('/cityloadArea/moreDetail',{
					link:link,
					price:price,
					giftName:giftName,
					id:id
				})
			},
			initData(){
				var params={
					pageNum:this.pageNum,
					pageSize:this.pageSize
				}
				if(this.isLoadding||this.isLoadDown){
					return false
				}
				var _this=this
				this.isLoadding=true
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/getCityOwnerGiftList'					
				}).then(function(res){
					_this.isLoadding=false
					if(res.status=='200'){
						var getData=res.data
						if(getData.status=='200'){
							var nowList=_this.goodsList.concat(getData.data)
							_this.goodsList=nowList
							if(_this.pageNum>=2&&getData.data.length==0){
								_this.isLoadDown=true
								_this.msgContent='礼包加载完毕'
								_this.showMsg=true
							}else if(getData.data.length<_this.pageSize){
								_this.isLoadDown=true
							}else{
								_this.isLoadDown=false
							}
							_this.isFirstLoad=false
						}else{
							var msg=getData.message
							_this.msgContent=msg
							_this.showMsg=true
							_this.isLoadDown=true
						}
					}
				}).catch(function(err){
					console.log(err)
				})
			},
			morePackage(){	
				if(this.isLoadDown){
					this.msgContent='礼包加载完毕'
					this.showMsg=true
				}else{
					this.pageNum++
					this.initData()
				}
				
			}
		},
		mounted(){
			this.initData()
		}
	}
</script>

<style lang="less">
	.more-list-title{
		height: .88rem;
		line-height: .88rem;
		font-size: 20px;
		text-align: center;	
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 999;
		background: #FFFFFF;
	}
	.more-list-title{
		.title-wrap{
			position: relative;
			width: 100%;
			height: 100%;
			box-sizing:border-box;
			padding:0 .3rem;
			span{
				float: left;
			}
		}
	}
	.package-list>div{
		padding-bottom: .2rem;
	}
	.more-list .more-content-list{
		position: relative;
		margin-top: .88rem;
		padding: .07rem;
		padding-top: .2rem;
		box-sizing: border-box;
		>div{
			/*padding: .1rem;*/
			text-align: center;
			box-sizing: border-box;
			>div{
				width: 33%;
				box-sizing: border-box;
				padding: .07rem;
				img{
					width: 100%;
					height:auto;
				}
			}
			.only-more-btn{
				width:100%;
				height: auto;
			}
		}
	}
	.flex-start-end{
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
		}
		.list-item-l{
				img {
					width: 2rem;
					height: 2rem;
					display: block;
				}
	}
</style>