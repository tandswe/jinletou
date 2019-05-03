<template>

	<div>
		<swiper :options="swiperOption" ref="mySwiper" v-if="swiperList.length>0" >
			<!-- slides -->
			<swiper-slide v-for="(item,index) in swiperList" :key="index">
				<div @click="showData(item)">
					<img :src="item.img" class="slider-img">
				</div>
			</swiper-slide>
			<!-- Optional controls -->
			<!--<div class="swiper-pagination" slot="pagination"></div>
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
			<div class="swiper-scrollbar" slot="scrollbar"></div>-->
		</swiper>
	</div>

</template>
<script>
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'carrousel',
		data() {
			return {
				swiperOption: {
							preventLinksPropagation : false,
							notNextTick: true,
							slidesPerView: 'auto',
							loopedSlides :4,
		//					spaceBetween: 10,
							autoplay: {
								delay: 3000,
								disableOnInteraction: false
							},
							initialSlide: 1, //默认第二个
							slidesPerView: 1.3, //可见个数2
							centeredSlides: true, //居中
							tdFlow: {
								rotate: 10,
								stretch: -10,
								depth: 10,
								modifier: 4,
								slideShadows: false
							},
							observer:true,//修改swiper自己或子元素时，自动初始化swiper
		       				observeParents:true,//修改swiper的父元素时，自动初始化swiper
							effect: "coverflow",
							loop: true,
							grabCursor: true,
				},
				swiperListSet:[]
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		props:{
			swiperList:{
				default:[{},{},{}]
			}
		},
		watch:{
			swiperList:{
				handler:function(){
//						this.swiperOption={
//							preventLinksPropagation : false,
//							notNextTick: true,
//							slidesPerView: 'auto',
//							loopedSlides :4,
//		//					spaceBetween: 10,
//							autoplay: {
//								delay: 3000,
//								disableOnInteraction: false
//							},
//							initialSlide: 1, //默认第二个
//							slidesPerView: 1.3, //可见个数2
//							centeredSlides: true, //居中
//							tdFlow: {
//								rotate: 10,
//								stretch: -10,
//								depth: 10,
//								modifier: 4,
//								slideShadows: false
//							},
//							observer:true,//修改swiper自己或子元素时，自动初始化swiper
//		       				observeParents:true,//修改swiper的父元素时，自动初始化swiper
//							effect: "coverflow",
//							loop: true,
//							grabCursor: true,
//					}
				},
				deeply:true
			}
		},
		methods:{
			showData(item){
				this.$emit('swiperClk',item)
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			},
//			swiperListSet(){
//				return this.swiperList
//			}
		},
		created(){
			
		},
		mounted() {
			
			var _this=this
//			setTimeout(function(){
//				_this.swiperOption={
//					preventLinksPropagation : false,
//					notNextTick: true,
//					slidesPerView: 'auto',
//					loopedSlides :4,
////					spaceBetween: 10,
//					autoplay: {
//						delay: 3000,
//						disableOnInteraction: false
//					},
//					initialSlide: 1, //默认第二个
//					slidesPerView: 1.3, //可见个数2
//					centeredSlides: true, //居中
//					tdFlow: {
//						rotate: 10,
//						stretch: -10,
//						depth: 10,
//						modifier: 4,
//						slideShadows: false
//					},
//					observer:true,//修改swiper自己或子元素时，自动初始化swiper
//     				observeParents:true,//修改swiper的父元素时，自动初始化swiper
//					effect: "coverflow",
//					loop: true,
//					grabCursor: true,
//			}
//			},3000)
		}
	}
</script>
<style>
	.slider-img{
		width: 100%;
		height: 190px;
	}
	.swiper-container-horizontal > .swiper-scrollbar{
		height: 0;
	}
</style>