<template>
	<div class="order-content">
		<div class="order-content-scroll" ref="scrollArea">
			<div v-for="(item,index) in imperfectList" class="flex-start-end no-wrap goods-item" @click="goDetail(item)">
				<div class="flex-start no-wrap"> 
					<div>
						<img :src="item.taskList.imgs" class="goods-img" v-if="item.taskList.imgs">
						<img src="/static/chicon/88商城余额@2x.png" v-else class="goods-img">
					</div>
					<div>
						<div class="goods-name">
							{{item.taskList.taskName}}
						</div>
						<div class="goods-type">
							【{{item.taskList.memberTypeStr}}】
						</div>
					</div>
				</div>
				<div class="flex-end">
					<div>
						<div class="goods-price">
							¥&nbsp;{{item.taskAmount}}
						</div>  
						<div class="goods-status">
							{{item.statusStr}}
						</div>
					</div>
					<div class="goods-trangle-wrap">
						<img src="../../../static/chicon/右箭头@2x.png" class="goods-img">
					</div>
				</div>
			</div>
			<div class="loadding-status" v-if="isLoadding">
				<load-more :tip="tips"></load-more>
			</div>
			<div class="loadding-status" v-if="!isLoadding&&isLoadDown">
				<label>
					加载完毕
				</label>
			</div>
		</div>
	</div>
</template>

<script>
	import { LoadMore } from 'vux'
	export default{
		name:'',
		data(){
			return{
				imperfectList:[
				],
				pageNum:1,
				pageSize:10,
				isLoadding:false,
				isLoadDown:false,
				tips:'正在加载...'
			}
		},
		components:{
			LoadMore
		},
		methods:{
			goDetail(item){
				this.$gotoPages('/cityloadArea/orderTaskDetail',{taskId:item.id,tabIndex:2})
			},
			isScrollDown(dom){
				var boxDom=dom
				var h=dom.offsetHeight
				var scrollTop=boxDom.scrollTop
				if(scrollTop+boxDom.clientHeight>=boxDom.scrollHeight){
					return true
				}else{
					return false
				}
			},
			getTaskListByStatus(){
				var _this=this
				if(this.isLoadding||this.isLoadDown){
					return false
				}
				this.isLoadding=true
				var params={
					id:this.$store.state.id,
					status:3,
					pageNum:this.pageNum,
					pageSize:this.pageSize
				}
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/getMemberRemainList'
				}).then(function(res){
					if(res.status=='200'){
						var getData=res.data
						if(getData.status=='200'){
							var _data=getData.data
							console.log(_data)
							if(_data.length<_this.pageSize){
								_this.isLoadDown=true
							}else{
								_this.isLoadDown=false
							}
							var arr=_this.imperfectList.concat(_data)
							arr.forEach(function(item){
								if(item.imgs!=null){
									var imgsArr=item.imgs.split(',')
									item.imgsArr=imgsArr
								}
							})
							console.log(_this.imperfectList.concat(_data))
							_this.imperfectList=arr
						}
						if(getData.status=='1906'){
							_this.isLoadDown=true
						}
						_this.pageNum++
						_this.isLoadding=false
					}
				}).catch(function(err){
					console.log(err)
				})
			},
			loadMore(){
				if(this.isScrollDown(this.$refs.scrollArea)){
					this.getTaskListByStatus()
				}
			}
		},
		created(){
			this.getTaskListByStatus()
		},
		mounted(){
			//this.scrollAreaHeight()
			this.$refs.scrollArea.addEventListener('scroll',this.loadMore)
		}
	}
</script>

<style>

</style>