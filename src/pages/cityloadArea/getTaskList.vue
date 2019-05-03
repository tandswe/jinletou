<template>
	<div class="get-task-list">
		<cmheader :title="thatTitle" :backUrl="backUrl"></cmheader>
		<div class="order-content-scroll"  ref="scrollArea">
			<div v-for="(item,index) in taskList" class="flex-start-end no-wrap goods-item" @click="goTaskDetail(item)">
				<div class="flex-start no-wrap">
					<div>
						<img src="../../../static/chicon/icon.png" class="goods-img" v-if="item.imgsArr.length==0">
						<img :src="item.imgsArr[0]" class="goods-img" v-else>
					</div>
					<div>
						<div class="goods-name">
							{{item.taskName.substring(0,10)}}<label v-if="item.taskName.length>10">...</label>
						</div>
						<div class="goods-type">
							【{{item.memberTypeStr}}】
						</div>
					</div>
				</div>
				<div class="flex-end no-wrap">
					<div>
						<div class="goods-price">
							¥&nbsp;{{item.memberAmount.toString().substring(0,5)}}<label v-if="item.memberAmount.toString().length>5">...</label>
							<!--数量&nbsp;:&nbsp;{{item.applyNum}}-->
						</div>
						<div class="goods-status">
							<!--{{item.taskStatusStr}}--> 
							{{item.taskTypeStr}}
						</div>
					</div>
					<div class="goods-trangle-wrap">
						<img src="../../../static/chicon/右箭头@2x.png" class="goods-img">
					</div>
				</div>
			</div>
			<!--<div lass="text-center">
				<div class="loadding-status"v-if="isLoadding">
					<load-more :tip="tips"></load-more>
				</div>
				<div class="loadding-status" v-else>
					<label v-show="taskList.length==0">
						暂无数据
					</label>
					<label v-show="taskList.length!=0">
						加载完毕
					</label>					
				</div>
			</div>-->
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
	import cmheader from '../../components/cmHeader.vue'
	import { LoadMore } from 'vux'
	export default{
		name:'task-list',
		data(){
			return{
				thatTitle:'',
				backUrl:'/cityloadArea/getTask',
				taskType:0,
				taskList:[],
				pageNum:1,
				pageSize:10,
				isLoadding:false,
				isLoadDown:false,
				tips:'正在加载...'
			}
		},
		created(){
			this.thatTitle=this.$route.query.type==0?'会员任务':'城主任务'
			this.taskType=this.$route.query.type
		},
		components:{
			cmheader,
			LoadMore
		},
		methods:{
			goTaskDetail(item){
				this.$gotoPages('/cityloadArea/getTaskListDetail',{
					id:item.id
				})
			},
			initGetTaskList(){
				var params={
					type:this.taskType,
					pageNum:this.pageNum,
					pageSize:this.pageSize
				}
				var _this=this
				if(this.isLoadding||this.isLoadDown){
					return false
				}
				this.isLoadding=true
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/getTaskListByType'
				}).then(function(res){
					if(res.status=='200'){
						var getData=res.data
						if(getData.status=='200'){
							var _data=getData.data
							if(_data.length<_this.pageSize){
								_this.isLoadDown=true
							}else{
								_this.isLoadDown=false
							}
							var arr=_this.taskList.concat(_data)
							arr.forEach(function(item){
								if(item.imgs!=null){
									var imgsArr=item.imgs.split(',')
									item.imgsArr=imgsArr
								}
							})
							_this.taskList=arr
							console.log(arr)
						}
						if(getData.status=='1906'){
							_this.isLoadDown=true
						}
						_this.pageNum++
						_this.isLoadding=false
					}
				}).catch(function(err){
					
				})
			},
			loadMore(){
				if(this.isScrollDown(this.$refs.scrollArea)){
					this.initGetTaskList()
				}
			},
			isScrollDown(dom){
				var boxDom=dom
				var h=dom.offsetHeight
				var scrollTop=boxDom.scrollTop
				if(scrollTop+boxDom.clientHeight+50>=boxDom.scrollHeight){
					return true
				}else{
					return false
				}
			}
		},
		mounted(){
			this.initGetTaskList()
			this.$refs.scrollArea.addEventListener('scroll',this.loadMore)
		}
	}
</script>

<style>
	.goods-price label{
		color: #E03228;
	}
	.get-task-list .goods-price{
		text-align: right;
	}
	.get-task-list .goods-status{
		text-align: right;
	}
	.get-task-list .goods-item .flex-end{
		width: 2rem;
		overflow: hidden;
	}
	.text-center{
		text-align: center;
		line-height: .88rem;
		height: .88rem;
		font-size: 14px;
	}
	.get-task-list{
		padding-top: 1rem;
		box-sizing: border-box;
		height: 100%;
		overflow: hidden;
	}
</style>