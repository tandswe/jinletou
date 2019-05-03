<template>
	<div class="get-task-list" style="padding-top: 0;">
		<cmheader :title="thatTitle"></cmheader>
		<div class="order-content-scroll application-auditing">
			<div class="application-content">
				<div class="flex-start-end no-wrap goods-item ac-set-plr">
					<div class="flex-start no-wrap">
						<div>
							<img :src="taskDetailObj.imgsArr[0]" class="goods-img">
						</div>
						<div>
							<div class="goods-name">
								{{taskDetailObj.taskName}}
							</div>
							<div class="goods-type">
								{{taskDetailObj.taskStatusStr}}
							</div>
						</div>
					</div>
					<div class="flex-end">
						<div>
							<div class="goods-price">
								¥&nbsp;{{taskDetailObj.memberAmount}}
							</div>
							<div class="goods-status">
								{{taskDetailObj.memberTypeStr}}
							</div>
						</div>
					</div>
				</div>
				<!--<div class="ac-title">
					您上传的凭证:
				</div>-->
				<div class="flex-start flex-item-3 ac-img-list">
					<div v-for="item in taskDetailObj.imgsArr">
						<img :src="item" class="pre">
					</div>
				</div>
				<div style="text-align: center;padding-top: .26rem;" v-if="taskDetailObj.imgsArr.length>0">
					<div class="copy-btn btn-bg" @click="copyImgs">
						复制图片
					</div>
				</div>
				<div class="ac-title">
					<strong>
						任务要求
					</strong>
				</div>
				<div class="ac-remark">
					<strong v-html="taskDetailObj.content">
						
					</strong>
					<!--{{taskDetailObj.content}}-->
				</div>
				<div style="text-align: center;">
					<div class="copy-btn btn-bg" @click="copyUrl2">
						复制文字
					</div>
				</div>
				<div class="ac-remark">
					任务说明&nbsp;：<br>
					领取任务 - 以【任务图片+任务文字】的形式发布朋友圈 - 保留2小时或以上 - 提交任务 - 客服审核 - 审核通过即发放佣金到用户余额
					***在任务结束最后300分钟或人满截止领取<br>
					
					▲会员发圈时可复制个人链接到文字介绍亦可将个人推荐二维码与任务海报一并发布，与朋友们一起参与喜悦。<br>
					▲任务必须使用真实日常个人朋友圈公开发布，不得存在隐藏或分组可见广告任务等的虚假行为，如经后台检测发现，不予审核且终止该用户继续行使领取任务获取佣金的资格。<br>
					▲在任务截止时间内提交有效，如若超时未提交则任务佣金作废。<br>
					▲任务截止时间后不能领取任务，请领取任务的用户及时完成并提交系统审核。<br>			
				</div>
				<div @click="saveTask" class="btn-bg submit-btn">
					领&nbsp;取
				</div>
			<textarea ref="myWords" v-model="taskDetailObj.content" class="remember-value"></textarea>
			<!--<textarea id="myWords1" ref="myWords1" v-model="taskDetailObj.content"></textarea>-->
			</div>
		
			
		</div>

	<toast v-model="showMsg" type="text" :time='1200' is-show-mask :text="msgContent" :position="'middle'" width="8em"></toast>
	</div>
</template>

<script>
	import { Toast } from 'vux'
	import cmheader from '../../components/cmHeader.vue'
	export default {
		name: 'task-list',
		data() {
			return {
				id: '',
				thatTitle: '任务详情',
				taskDetailObj: {
					imgsArr:[]
				},
				showMsg: false,
				msgContent: '',
				textareaValue:'11111111111111'
				//				backUrl:'/cityloadArea/getTaskList'
			}
		},
		created() {
			this.id = this.$route.query.id
			this.getTaskDetail()
		},
		methods: {
			saveTask() {
				var params = {
					taskId: this.id,
					id: this.$store.state.id
				}
				var _this = this
				params = this.$qs.stringify(params)
				this.$axios({
					method: 'post',
					data: params,
					url: '/appApi/appUsers/saveMemberRemain'
				}).then(function(res) {
					if(res.status == '200') {
						var getData = res.data
						console.log(getData)
						if(getData.status == '200') {
							var _data = getData.data
							_this.showMsg = true
							_this.msgContent = '领取成功'
							setTimeOut(function() {
								window.history.go(-1)
							}, 2000)
						} else {
							var msg = getData.msg
							_this.msgContent = msg
							_this.showMsg = true
						}
					}
				}).catch(function(err) {

				})
			},
			copyUrl2(){
					let v=this.$refs.myWords
					let str="<br />"
					console.log('-----'+str.replace(/\<br\s*\/\>$/, ""))
					let content=v.value
						content=content.replace(/<\/p>/g,'')
						content=content.replace(/<p>/g,'')
						content=content.replace(/<p>/g,'')
						content=content.replace(/\s*/g, "")
						content=content.replace(/\<br\/>/g, "")
					v.value=content
					if(this.$isIOS()){
						copyWords(content)
						return false
					}	
				    if(v.value.length>0){
				        v.select();
				        this.msgContent = '任务要求已复制'
						this.showMsg = true
				        document.execCommand("Copy");
				        return false;
				    }
				    
			},
			copyImgs(){
				var imgs=''
				imgs=this.taskDetailObj.imgsArr
				if(window.android){
					imgs=imgs.join(',')
					window.android.oneKeySave(imgs)
				}else{
					oneKeySave(imgs)
				}		
			},
			getTaskDetail() {
				var params = {
					id: this.id
				}
				var _this = this
				params = this.$qs.stringify(params)
				this.$axios({
					method: 'post',
					data: params,
					url: '/appApi/appUsers/getTaskListById'
				}).then(function(res) {
					console.log(res)
					//str.split('')
					if(res.status == '200') {
						var getData = res.data
						if(getData.status == '200') {
							var arr=getData.data.imgs.split(',')
							getData.data.imgsArr=arr
							_this.taskDetailObj = getData.data
							
						}
					}
				}).catch(function(err) {

				})
			},
			loadMore(){
				if(this.isScrollDown(this.$refs.scrollArea)){
					this.getTaskListByStatus()
				}
			}
		},
		components: {
			cmheader,
			Toast
		},
		mounted(){
			
		}
	}
</script>
<style lang="less">
	.remember-value{
		opacity: 0;
		width: 0;
		height: 0;
	}
	.copy-btn{
		color: #fcd1ca;
		font-size: 14px;
		height: .32rem;
		line-height: .32rem;
		padding: 0.1rem .23rem;
		display: inline-block;
		/*font-weight: 700;*/
		border-radius: 0.08rem;
	}
	.get-task-list {
		/*padding-top: 1rem;*/
		box-sizing: border-box;
		height: 100%;
		overflow: hidden;
		.ac-img-list:first-child{
			padding-top: .3rem;
		}
		.application-auditing{
			/*padding-top: 0;*/
		}
		.ac-remark{
			font-weight: 400;
			padding-top: 0!important;
		}
	}
	
	.draw-list {
		color: #333;
	}
	.ac-remark strong{
		display: block;
	}
	.application-content {
		padding: 0 .08rem;
		overflow: scroll;
		height: 100%;
		.ac-title,
		.ac-remark {
			text-align: left;
			padding: .26rem .08rem;
			word-break: break-all;
			word-wrap: break-word;
			line-height: 18px;
			font-size: 12px;
		}
		.ac-task-detail {
			text-align: left;
			font-size: 18px;
			padding: 0.26rems .08rem;
		}
		.ac-title {
			font-size: 16px;
		}
		.ac-img-list {
			>div {
				padding: .08rem;
				box-sizing: border-box;
				img{
					width: 100%;
					height: auto;
				}
			}
		}
		.ac-set-plr {
			padding-left: 0.08rem;
			padding-right: 0.08rem;
			border-bottom: 0;
		}
	}
	
	.application-auditing {
		padding-top: .88rem;
		box-sizing: border-box;
		height: 100%;
		overflow: hidden;
	}
	
	.task-auditing {
		text-align: center;
		padding-top: 1.8rem;
	}
	
	.task-auditing img {
		width: 3.5rem;
	}
	
	.goods-trangle-wrap {
		padding-left: .2rem;
	}
</style>

<!--

<div class="application-auditing">
		<cmheader :title="thatTitle"></cmheader>
		
	</div>-->