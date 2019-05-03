<template>
	<div class="application-auditing">
		<div>
			<toast v-model="showResMsg" type="text" :time='1200' is-show-mask :text="resMsgContent"  :position="'middle'" width="7em"></toast>
			<loading :show="isUpLoadding" text="提交中"></loading>
		</div>
		<cmheader :title="thatTitle"></cmheader>
		<div class="application-content" v-if="tabIndex==0">
			<div class="ac-title">
				您上传的凭证:
			</div>
			<div class="flex-start flex-item-3 ac-img-list">
				<div v-for="(item,index) in myFilesList" @click="deleteImg(index)">
					<img :src="item.src">
				</div>
				<div>
					<input type="file" multiple="multiple" id="domFiles" ref="domFiles" class="files" @change="changeFiles" @click="filesDomClk">
					<img src="../../../static/chicon/提交图片审核@3x.png" class="pre">
				</div>
			</div>
			<div style="color: red;" class="set-padding-8">
				注：图片不能大于1.2MB,否则系统自动过滤
			</div>
			<div class="ac-remark">
				<textarea v-model="remark" placeholder="输入备注">
					
				</textarea>
			</div>
			<div class="set-padding-8">
				<!--<div class="btn-bg">
					提交审核
				</div>-->
				<div @click="uploadFiles(0)" class="btn-bg submit-btn" style="margin: 0;margin-top: .33rem;margin-bottom: .59rem;">
					提交审核
				</div>
			</div>
			<div class="ac-task-detail">
				<strong>
					任务详情
				</strong>
			</div>
			<div  class="flex-start-end no-wrap goods-item ac-set-plr">
				<div class="flex-start no-wrap">
					<div>
						<img :src="taskInfo.taskImgsArr[0]" class="goods-img" v-if="taskInfo.taskImgsArr">
						<!--<img :src="taskInfo.taskImgsArr[0]" class="goods-img" v-if="taskInfo.taskImgsArr">-->
						<img src="/static/chicon/88商城余额@2x.png" class="goods-img" v-else>
					</div>
					<div>
						<div class="goods-name">
							{{taskInfo.taskName}}
						</div>
						<div class="goods-type">
							【{{taskInfo.taskTypeStr}}】
						</div>
					</div>
				</div>
				<div class="flex-end">
					<div>
						<div class="goods-price">
							¥&nbsp;{{taskInfo.remainAmount}}
						</div>
						<div class="goods-status">
							{{taskInfo.remainStatusStr}} 
						</div>
					</div>
					<!--<div class="goods-trangle-wrap">
						<img src="../../../static/chicon/右箭头@2x.png" class="goods-img">
					</div>-->
				</div>
			</div>
			<div class="flex-start flex-item-3 ac-img-list" v-if="taskInfo.taskImgsArr">
				<div v-for="(item,index) in taskInfo.taskImgsArr">
					<img :src="item" class="pre">
				</div>
			</div>
			<div class="ac-task-detail">
				<div style="padding-bottom: .1rem;">
					<strong style="font-size: 18px;">
						任务要求
					</strong>
				</div>
				<div v-html="taskInfo.taskContent">
					
				</div>
			</div>
			<!--<div class="ac-remark" v-html="taskInfo.taskContent">
			</div>-->
		</div>
		<div class="application-content" v-if="tabIndex==1">
			<div class="ac-title">
				您上传的凭证:
			</div>
			<div class="flex-start flex-item-3 ac-img-list">
				<div v-for="(item,index) in taskInfo.remainImgsArr">
					<img :src="item" class="pre" v-if="item">
					<img src="/static/chicon/88商城余额@2x.png" class="goods-img" v-else>
				</div>
			</div>
			<div class="ac-remark">
				备注：{{taskInfo.remainContent}}
			</div>
			<!--<div class="ac-task-detail">
				<strong>
					驳回原因
				</strong>
			</div>
			<div class="ac-remark">
				<strong>
					{{taskInfo.taskContent}}
				</strong>  
			</div>-->
			<div class="ac-task-detail">
				<strong>
					任务详情
				</strong>
			</div>
			
			<div  class="flex-start-end no-wrap goods-item ac-set-plr">
				<div class="flex-start no-wrap">
					<div>
						<img :src="taskInfo.taskImgsArr[0]" class="goods-img" v-if="taskInfo.taskImgsArr">
						<!--<img :src="taskInfo.taskImgsArr[0]" class="goods-img" v-if="taskInfo.taskImgsArr">-->
						<img src="/static/chicon/88商城余额@2x.png" class="goods-img" v-else>
					</div>
					<div>
						<div class="goods-name">
							{{taskInfo.taskName}}
						</div>
						<div class="goods-type">
							【{{taskInfo.taskTypeStr}}】
						</div>
					</div>
				</div>
				<div class="flex-end">
					<div>
						<div class="goods-price">
							¥&nbsp;{{taskInfo.remainAmount}}
						</div>
						<div class="goods-status">
							{{taskInfo.remainStatusStr}} 
						</div>
					</div>
					<!--<div class="goods-trangle-wrap">
						<img src="../../../static/chicon/右箭头@2x.png" class="goods-img">
					</div>-->
				</div>
			</div>
			<div class="flex-start flex-item-3 ac-img-list" v-if="taskInfo.taskImgsArr">
				<div v-for="(item,index) in taskInfo.taskImgsArr">
					<img :src="item" class="pre">
				</div>
			</div>
			<div class="ac-task-detail">
				<div style="padding-bottom: .1rem;">
					<strong style="font-size: 18px;">
						任务要求
					</strong>
				</div>
				<div v-html="taskInfo.taskContent">
					
				</div>
			</div>
		</div>
		<div class="application-content" v-if="tabIndex==2">
			<div class="ac-title">
				您上传的凭证:
			</div>
			<div class="flex-start flex-item-3 ac-img-list">
				<div v-for="(item,index) in taskInfo.remainImgsArr">
					<img :src="item" class="pre" v-if="item">
					<img src="/static/chicon/88商城余额@2x.png" class="goods-img" v-else>
				</div>
			</div>
			<div class="ac-remark">
				备注：{{taskInfo.remainContent}}
			</div>
			<!--<div class="ac-task-detail">
				<strong>
					驳回原因
				</strong>
			</div>
			<div class="ac-remark">
				<strong>
					{{taskInfo.taskContent}}
				</strong>  
			</div>-->
			<div class="ac-task-detail">
				<strong>
					任务详情
				</strong>
			</div>
			
			<div  class="flex-start-end no-wrap goods-item ac-set-plr">
				<div class="flex-start no-wrap">
					<div>
						<img :src="taskInfo.taskImgsArr[0]" class="goods-img" v-if="taskInfo.taskImgsArr">
						<!--<img :src="taskInfo.taskImgsArr[0]" class="goods-img" v-if="taskInfo.taskImgsArr">-->
						<img src="/static/chicon/88商城余额@2x.png" class="goods-img" v-else>
					</div>
					<div>
						<div class="goods-name">
							{{taskInfo.taskName}}
						</div>
						<div class="goods-type">
							【{{taskInfo.taskTypeStr}}】
						</div>
					</div>
				</div>
				<div class="flex-end">
					<div>
						<div class="goods-price">
							¥&nbsp;{{taskInfo.remainAmount}}
						</div>
						<div class="goods-status">
							{{taskInfo.remainStatusStr}} 
						</div>
					</div>
					<!--<div class="goods-trangle-wrap">
						<img src="../../../static/chicon/右箭头@2x.png" class="goods-img">
					</div>-->
				</div>
			</div>
			<div class="flex-start flex-item-3 ac-img-list" v-if="taskInfo.taskImgsArr">
				<div v-for="(item,index) in taskInfo.taskImgsArr">
					<img :src="item" class="pre">
				</div>
			</div>
			<div class="ac-task-detail">
				<div style="padding-bottom: .1rem;">
					<strong style="font-size: 18px;">
						任务要求
					</strong>
				</div>
				<div v-html="taskInfo.taskContent">
					
				</div>
			</div>
		</div>
		<div class="application-content" v-if="tabIndex==3">
			<div class="ac-title">
				您上传的凭证:
			</div>
			<div class="flex-start flex-item-3 ac-img-list">
				<div v-for="(item,index) in taskInfo.remainImgsArr">
					<img :src="item" class="pre" v-if="item">
					<img src="/static/chicon/88商城余额@2x.png" class="goods-img" v-else>
				</div>
			</div>
			<div class="ac-remark">
				备注：{{taskInfo.remainContent}}
			</div>
			<!--<div class="ac-task-detail">
				<strong>
					驳回原因
				</strong>
			</div>
			<div class="ac-remark">
				<strong>
					{{taskInfo.taskContent}}
				</strong>  
			</div>-->
			<div class="ac-task-detail" v-if="taskInfo.reason" style="padding-bottom: 0;">
				<strong>
					驳回原因
				</strong>
			</div>
			<div class="ac-remark" v-if="taskInfo.reason">
				{{taskInfo.reason}}
			</div>
			<div class="set-padding-8">
				<!--<div class="btn-bg">
					提交审核
				</div>-->
				<div @click="reReject" class="btn-bg submit-btn" style="margin: 0;margin-top: .33rem;margin-bottom: .59rem;">
					重新审核
				</div>
			</div>
			<div class="ac-task-detail">
				<strong>
					任务详情
				</strong>
			</div>
			
			<div  class="flex-start-end no-wrap goods-item ac-set-plr">
				<div class="flex-start no-wrap">
					<div>
						<img :src="taskInfo.taskImgsArr[0]" class="goods-img" v-if="taskInfo.taskImgsArr">
						<!--<img :src="taskInfo.taskImgsArr[0]" class="goods-img" v-if="taskInfo.taskImgsArr">-->
						<img src="/static/chicon/88商城余额@2x.png" class="goods-img" v-else>
					</div>
					<div>
						<div class="goods-name">
							{{taskInfo.taskName}}
						</div>
						<div class="goods-type">
							【{{taskInfo.taskTypeStr}}】
						</div>
					</div>
				</div>
				<div class="flex-end">
					<div>
						<div class="goods-price">
							¥&nbsp;{{taskInfo.remainAmount}}
						</div>
						<div class="goods-status">
							{{taskInfo.remainStatusStr}} 
						</div>
					</div>
					<!--<div class="goods-trangle-wrap">
						<img src="../../../static/chicon/右箭头@2x.png" class="goods-img">
					</div>-->
				</div>
			</div>
			<div class="flex-start flex-item-3 ac-img-list" v-if="taskInfo.taskImgsArr">
				<div v-for="(item,index) in taskInfo.taskImgsArr">
					<img :src="item" class="pre">
				</div>
			</div>
			<div class="ac-task-detail">
				<div style="padding-bottom: .1rem;">
					<strong style="font-size: 18px;">
						任务要求
					</strong>
				</div>
				<div v-html="taskInfo.taskContent">
					
				</div>
			</div>
		</div>
	</div>
	
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	import {Toast,Loading} from 'vux'
	export default {
		name: '',
		data() {
			return {
				thatTitle:'',
				tabIndex:0,
				taskId:'',
				myFilesList:[],
				remark:'',
				taskInfo:{},
				showResMsg:false,
				resMsgContent:'',
				isUpLoadding:false,
				imgs:'',
				myfilesArr:[]
			}
		},
		components: {
			cmheader,
			Toast,
			Loading
		},
		methods: {
			goPrev() {
				window.history.go(-1)
			},
			
			uploadFiles(count){
				var _this=this
				if(this.remark==''){
					this.resMsgContent='备注不能为空!'
					this.showResMsg=true
					return false
				}
				console.log(count)
				console.log(this.myFilesList.length)
				if(count>=this.myFilesList.length){
//					this.isUpLoadding=false
//					console.log(this.myfilesArr)
					this.saveTask()
					return false
				}
				if(this.myFilesList.length==0){
					this.myfilesArr=[]
//					console.log(this.myfilesArr)
//					this.isUpLoadding=false
					this.saveTask()
					return false
				}
				if(this.myFilesList.length>=10){
					this.resMsgContent='图片不能大于9张!'
					this.showResMsg=true
					return false
				}
				this.isUpLoadding=true
//				this.isUpLoadding=true
				var formData=new FormData()
				if(this.myFilesList.length>0){
					var filesBlobs=this.myFilesList[count].uploadFiles
					var fileName=this.myFilesList[count].uploadFiles.name
					formData.append(fileName,filesBlobs)
				}else{
					formData.append('File',[])
				}
				
				formData.append('bizCode','新增文件夹')
				this.$axios({
					headers: {
				        'Content-Type': 'multipart/form-data'
				    },
					method:'post',
					data:formData,
					url:'/appApi/file/uploadFile'
				}).then(function(res){
					console.log(res)
					if(res.status=='200'){
						var getData=res.data	
						if(getData.respCode=='00000'){
							var myfilesArr=[]
							if(getData.files.length>0){
								getData.files.forEach(function(item){
									myfilesArr.push(item.filePath)
								})
							}
							_this.myfilesArr=_this.myfilesArr.concat(myfilesArr)
							count++
							_this.uploadFiles(count)
						}else{
							_this.myfilesArr=[]
							_this.showResMsg=true
							_this.isUpLoadding=false
							_this.resMsgContent='提交失败'
						}
					}
				}).catch(function(err){
					
				})
			},
			//tabIndex==0
			reReject(){
//				this.myfilesArr=this.taskInfo.taskImgsArr  //图片
//				this.remark=this.taskInfo.taskContent //任务要求
				this.taskId=this.$route.query.taskId
				this.$gotoPages('/cityloadArea/orderTaskDetail',{taskId:this.taskId,tabIndex:0})
				window.location.reload()
			},
			saveTask(){
				this.imgs=this.myfilesArr.join(',')
				var params={
					memberId:this.$store.state.id,
					id:this.taskId,
					imgs:this.imgs,
					content:this.remark
				}
				var _this=this
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/subMemberRemain'
				}).then(function(res){
					console.log(res)
					if(res.status=='200'){
						var getData=res.data
						if(getData.status=='200'){
							_this.isUpLoadding=false
							_this.showResMsg=true
							_this.resMsgContent='提交成功!'
							setTimeout(function(){
								window.history.go(-1)
							},1500)
						}else{
							_this.myfilesArr=[]
							_this.isUpLoadding=false
							_this.showResMsg=true
							_this.resMsgContent=getData.msg
						}
					}
				}).catch(function(err){
					console.log(err)
				})
			},
			changeFiles(){
				//window.URL.createObjectURL(blob)//这里传一个文件对象 例如：file.files[0]
				var filesBlobs=this.$refs.domFiles.files
				if(filesBlobs.length>0){
					for(var i=0;i<filesBlobs.length;i++){
						var filesSrc=window.URL.createObjectURL(filesBlobs[i])
						if(filesBlobs[i].size>=1048576*1.2){
							continue
						}
						var extStart=filesBlobs[i].name.lastIndexOf(".");
						var ext=filesBlobs[i].name.substring(extStart,filesBlobs[i].name.length).toUpperCase();
						if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
							alert("“图片限于png,gif,jpeg,jpg格");
							continue
						}				
						var obj=new Object()
						obj.src=filesSrc
						obj.uploadFiles=filesBlobs[i]
						this.myFilesList.push(obj)
					}
				}
				console.log(this.myFilesList)
			},
			deleteImg(index){
				this.myFilesList.splice(index,1)
			},
			filesDomClk(){
				this.$refs.domFiles.value=''
			},
			//tabIndex==0
			
			getTaskInfo(){
				var params={
					memberId:this.$store.state.id,
					id:this.$route.query.taskId
				}
				var _this=this
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/getRemainById'
				}).then(function(res){
					if(res.status=='200'){
						var getData=res.data
		    			if(getData.status=='200'){
		    				var resultObj=getData.data
		    				if(resultObj.taskImgs!=null){
		    					var imgsArr=resultObj.taskImgs.split(',')
		    					resultObj.taskImgsArr=imgsArr
		    				}
		    				if(resultObj.remainImgs!=null){
		    					var remainImgsArr=resultObj.remainImgs.split(',')
		    					resultObj.remainImgsArr=remainImgsArr
		    				}
		    				_this.taskInfo=resultObj
		    			}
					}
				}).catch(function(err){
					console.log(err)
				})
			}
		},
		created(){
			var arr=['提交审核','待审核','已完成','已驳回']
			this.thatTitle=arr[this.$route.query.tabIndex]
			this.tabIndex=this.$route.query.tabIndex
			this.taskId=this.$route.query.taskId
			this.getTaskInfo()
		},
		mounted() {
		
		}
	}
</script>

<style lang="less">
.draw-list{
	color: #333;
}
.set-padding-8{
	padding: 0 .08rem;
}
.files{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	opacity: 0;
	left: 0;
}
.application-content{
	padding: 0 .08rem;
	overflow: scroll;
    height: 100%;
    .ac-title,.ac-remark{
    	text-align: left;
    	padding: .26rem .08rem;
    	word-break: break-all;
    	word-wrap: break-word;
    	line-height: 18px;
    	font-size: 12px;
    }
    .ac-remark{
    	textarea{
    		border: 0;
    		padding: .2rem;
    		outline: none;
    		width: 100%;
    		box-sizing: border-box;
    		border-radius: .1rem;
    		background: rgb(245,245,245);
    		height: 1.36rem;
    	}
    }
    .ac-task-detail{
    	text-align: left;
    	font-size: 18px;
    	padding: 0.26rem .08rem;
    }
    .ac-title{
    	font-size: 16px;	
    }
    .ac-img-list{
    	>div{
    		padding: .08rem;
    		box-sizing: border-box;
    		position: relative;
    		img{
    			width: 100%;
    			height: 100%;
    			display: block!important;
    		}
    	}
    	/*img{
    		width: 1.8rem!important;
    			height: 1.8rem!important;
    			display: block!important;
    	}*/
    }
    .ac-set-plr{
    	padding-left:  0.08rem;
    	padding-right: 0.08rem;
    	border-bottom: 0;
    }
}

.application-auditing{
	padding-top: .88rem;
	box-sizing: border-box;
	height: 100%;
	overflow: hidden;
}
.task-auditing {
	text-align: center;
	padding-top: 1.8rem;
}
.task-auditing img{
	width: 3.5rem;
}
	.goods-trangle-wrap{
		padding-left: .2rem;
	}
	
</style>