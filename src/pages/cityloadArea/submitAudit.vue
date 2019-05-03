<template>
	<div class="application-auditing">
		<!--<div class="cm-header">
			<img src="../../../static/chicon/back.jpg" class="pre" @click="goPrev">
			<div class="p1p"><strong class="draw-list">已完成</strong>
			</div>
		</div>-->
		<cmheader :title="thatTitle"></cmheader>
		<div class="application-content">
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
			<div class="ac-remark">
				备注：XXXXXXXXXXXXXXX
			</div>
			<div class="ac-task-detail">
				<strong>
					任务详情
				</strong>
			</div>
			<div  class="flex-start-end no-wrap goods-item ac-set-plr">
				<div class="flex-start no-wrap">
					<div>
						<img src="../../../static/chicon/icon.png" class="goods-img">
					</div>
					<div>
						<div class="goods-name">
							X奥传媒
						</div>
						<div class="goods-type">
							【普通】
						</div>
					</div>
				</div>
				<div class="flex-end">
					<div>
						<div class="goods-price">
							¥&nbsp;6
						</div>
						<div class="goods-status">
							待审核 
						</div>
					</div>
					<div class="goods-trangle-wrap">
						>
					</div>
				</div>
			</div>
			<div class="flex-start flex-item-3 ac-img-list">
				<div>
					<img src="../../../static/chicon/back.jpg" class="pre">
				</div>
				<div>
					<img src="../../../static/chicon/back.jpg" class="pre">
				</div>
				<div>
					<img src="../../../static/chicon/back.jpg" class="pre">
				</div>
			</div>
			<div class="ac-remark">
				任务要求：XXXXXXXXXXXXXXX  
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	export default {
		name: '',
		data() {
			return {
				thatTitle:'提交审核',
				myFilesList:[]
			}
		},
		components: {
			cmheader 
		},
		methods: {
			goPrev() {
				window.history.go(-1)
			},
			changeFiles(){
				//window.URL.createObjectURL(blob)//这里传一个文件对象 例如：file.files[0]
				var filesBlobs=this.$refs.domFiles.files
				if(filesBlobs.length>0){
					for(var i=0;i<filesBlobs.length;i++){
						var filesSrc=window.URL.createObjectURL(filesBlobs[i])
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
			}
		},
		mounted() {

		}
	}
</script>

<style lang="less">
.files{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	opacity: 0;
	left: 0;
}
.draw-list{
	color: #333;
}
.application-content{
	padding: 0 .20rem;
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
    .ac-task-detail{
    	text-align: left;
    	font-size: 18px;
    	padding: 0.26rems .08rem;
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
    			height: auto;
    		}
    	}
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