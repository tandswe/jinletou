<template>
	<div class="cityload-area">
		<div class="home-title flex-start-end" style="text-align: center;font-size: 22px;">
			<div>
				爆品专区
			</div>
			<div></div>
		</div>
		<div class="flex-item-4 flex-start cityLoadList">
			<div v-for="(item,index) in cityLoadList" @click="goDetail(item.href,item.type)">
				<img :src="item.img">
				<p>{{item.p}}</p>
			</div>
		</div>
		<!-- <img src="/static/chicon/mall.png" alt="" class="city_advert"> -->
		<div class="flex-start-end static-ad-list" style="padding-top: .1rem;">
			<div style="font-size: 15px;">
				精选
			</div>
			<div></div>
			<!--<div @click="moreList">
				更多礼包
			</div>-->
		</div>
		<div class="home-content">
			<!--<div>
				<div class="swiper">
				<swiper :list="swiperList" :show-dots="false" v-model="swiperIndex" @on-index-change="swiperonIndexChange"></swiper>
			</div>-->
			<div class="more-content-list" style="margin-top: -.3rem;">
				<div class="package-list flex-item-2 flex-start">
					<div class="" v-for="(item,index) in goodsList" @click="toGoodsDetail(item.detailLinkUrl,item)">
						<img :src="item.imgs">
					</div>
					<div @click="morePackage" v-if="!isFirstLoad">
						<img src="../../../static/chicon/cityload/更多礼包@2x.png" class="only-more-btn">
					</div>
				</div>
			</div>

		</div>
		<div>
			<toast v-model="showErr" type="text" :time='1200' is-show-mask :text="errContent" :position="'middle'" width="6em"></toast>
		</div>
	</div>
</template>

<script>
	import { Icon, Popup, Toast } from 'vux'
	import { Swiper, SwiperItem } from 'vux'
	const baseList = [{
		url: 'http://www.baidu.com',
		img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
		//	  title: '送你一朵fua'
	}, {
		url: 'javascript:',
		img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
		//	  title: '送你一辆车'
	}]
	export default {
		name: 'cityloadArea',
		data() {
			return {
				showErr: false,
				errContent: '功能暂未开放',
				swiperList: baseList,
				swiperIndex: 0,
				goodsList: [],
				pageNum: 1,
				pageSize: 10,
				isFirstLoad: true,
				isLoadDown: false,
				msgContent: '',
				//				show3:true,
				cityLoadList: [{
					p: '城主攻略',
					img: 'static/chicon/cityload/chengzhu.png',
					href: '/cityloadArea/getMoney'
				}, {
					p: '提交任务',
					img: 'static/chicon/cityload/tijiao.png',
					href: '/cityloadArea/orderManager'
				}, {
					p: '领取任务',
					img: 'static/chicon/cityload/qingqu.png',
					href: '/cityloadArea/getTask'
				}, {
					p: '发布广告',
					img: 'static/chicon/cityload/guangao.png',
					href: '/cityloadArea/editAd'
				}, {
					p: '推广二维码',
					img: 'static/chicon/cityload/erweima.png',
					href: '/cityloadArea/share'
				}, {
					p: '私人影院',
					img: 'static/chicon/cityload/siren.png',
					href: 'http://www.yshitv.cn/',
					type:'5'
				},  {
					p: '更多',
					img: 'static/chicon/cityload/genduo.png'
				}]
			}
		},
		// {
		// 			p: '竞投中心',
		// 			img: '../../../static/chicon/cityload/竞投中心@2x.png'
		// 		},
		components: {
			Icon,
			Popup,
			Swiper,
			SwiperItem,
			Toast
		},
		methods: {
			swiperonIndexChange(index) {
				this.swiperIndex = index
			},
			morePackage() {
				this.$gotoPages('/cityloadArea/moreList')
			},
			moreList() {
				this.$gotoPages('/cityloadArea/moreList')
			},
			orderList() {
				this.$gotoPages('/cityloadArea/orderManager')
			},
			goDetail(href,type) {
				if(href != undefined) {
				 if(type != 5) {
					this.$gotoPages(href)
					}else{
						window.location.href = href
					}
				} else {
					this.showErr = true
				}

			},
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
			initData() {
				var params = {
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				if(this.isLoadding || this.isLoadDown) {
					return false
				}
				if(sessionStorage.getItem('goodsList')){
					let goodsList=JSON.parse(sessionStorage.getItem('goodsList'))
					this.goodsList=goodsList
					this.isFirstLoad=false
					return false
				}
				var _this = this
				this.isLoadding = true
				params = this.$qs.stringify(params)
				this.$axios({
					method: 'post',
					data: params,
					url: '/appApi/appUsers/getCityOwnerGiftList'

				}).then(function(res) {
					_this.isLoadding = false
					if(res.status == '200') {
						var getData = res.data
						if(getData.status == '200') {
							var len = getData.data.length
							if(len >= 8) {
								len = 7
							}
							for(var i = 0; i < len; i++) {
								_this.goodsList.push(getData.data[i])
							}
							if(_this.goodsList){
								sessionStorage.setItem('goodsList',JSON.stringify(_this.goodsList))
							}
							if(_this.pageNum >= 2 && getData.data.length == 0) {
								_this.isLoadDown = true
								//								_this.msgContent='礼包加载完毕'
								//								_this.showMsg=true
							} else if(getData.data.length < _this.pageSize) {
								_this.isLoadDown = true
							} else {
								_this.isLoadDown = false
							}
							_this.isFirstLoad = false
						} else {
							var msg = getData.message
							_this.msgContent = msg
							_this.showMsg = true
							_this.isLoadDown = true
						}
					}
				}).catch(function(err) {
					console.log(err)
				})
			}
		},
		mounted() {
			this.initData()
		}
	}
</script>

<style lang="less">
.city_advert{
	width: 80%;
	margin: 10px auto;
	display: block;
	
}
	.static-ad-list {
		justify-content: space-between!important;
	}
	
	.home-content {
		.more-content-list {
			padding: .2rem;
		}
		.package-list>div {
			/*padding-bottom: .15rem;*/
			padding: .1rem;
			box-sizing: border-box;
		}
	}
	
	.home-content {
		.more-content-list {
			position: relative;
			/*		margin-top: .88rem;*/
			padding: .1rem 0;
			padding-top: .2rem;
			box-sizing: border-box;
			>div {
				/*padding: .1rem;*/
				text-align: center;
				box-sizing: border-box;
				padding: .1rem;
				img {
					width: 100%;
					height: auto;
					display: block;
				}
				.only-more-btn {
					width: 100%;
					height: auto;
				}
			}
		}
	}
	
	.cityLoadList {
		flex-wrap: wrap!important;
	}
	
	.cityLoadList>div {
		width: 25%;
		text-align: center;
		font-size: 13px;
		padding-top: .1rem;
		img {
			width: 45px;
			margin: 0 auto;
			height: 45px;
			display: block;
		}
	}
	
	.cityload-area h5 {
		padding: .15rem 0;
		line-height: 16px;
		font-size: 14px;
	}
</style>