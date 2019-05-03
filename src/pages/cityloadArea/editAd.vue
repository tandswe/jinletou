<template>
	<div class="edit-ad">
		<cmheader :title="thatTitle"></cmheader>
		<div class="task-list">
			<div>
				<textarea :placeholder="textareaTxt" v-model="ad" id="myAd">
				
				</textarea>
				<input type="text" v-model="phone" placeholder="请输入联系方式 ( 手机 / 微信 ) "  @keyup="onlyNumber"  id="phone">
			</div>
			<div class="btn-bg submit-btn" @click="editAdSubmit">
				提&nbsp;交
			</div>
		</div>
		<toast v-model="showErr" type="text" :time='1200' is-show-mask :text="errContent"  :position="'middle'" width="auto"></toast>
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	import {Toast} from 'vux'
	export default{
		name:'ad',
		data(){
			return{
				thatTitle:'发布广告',
				textareaTxt:'请您简单描述一下您想投入的广告..',
				phone:'',
				ad:'',
				showErr:false,
				errContent:''
			}
		},
		methods:{
			onlyNumber(){
				//this.phone=this.phone.replace(/\D/g,'')
			},
			getQueryString(name){
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			},
			editAdSubmit(){
				var _this=this
				var params={
					id:this.$store.state.id,
					content:this.ad,
					feedbackImgs:'',
					contactInformation:this.phone
				}
				if(this.ad==''){
					this.errContent='请您描述想投入的广告信息'
					document.getElementById('myAd').focus()
					this.showErr=true
					return false
				}
				if(this.phone==''){
					this.errContent='联系方式不能为空'
					document.getElementById('phone').focus()
					this.showErr=true
					return false
				}
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/adsServ'
				}).then(function(res){
					if(res.status=='200'){
						var getData=res.data
						if(getData.status=='200'){
							_this.errContent='发布成功!'
							
							_this.showErr=true
							setTimeout(function(){
								_this.$gotoPages('/cityloadArea')
							},1500)
						}else{
							var msg=getData.msg
							_this.errContent=msg
							_this.showErr=true
						}
					}
				}).catch(function(err){
					console.log(err)
				})
			},
			getAdsServ(){
				var _this=this
				var params={
					id:this.$store.state.id,
					pageNum:1,
					pageSize:10
				}
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/getAdsServ'
				}).then(function(res){
					if(res.status=='200'){
						var getData=res.data
						if(getData.status=='200'){
							console.log(getData.data)
						}
					}
				}).catch(function(err){
					
				})
			},
			getCityOwnerGiftById(){
				var _this=this
				var params={
					id:this.$store.state.id,
				}
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/getCityOwnerGiftById'
				}).then(function(res){
					if(res.status=='200'){
						var getData=res.data
						if(getData.status=='200'){
							console.log(getData.data)
						}
					}
				}).catch(function(err){
					
				})
			}
		},
		components:{
			cmheader,
			Toast
		},
		created(){
			this.getAdsServ()
			this.getCityOwnerGiftById()
			if(this.$route.query.type==1){
				this.thatTitle='联系客服'
				this.textareaTxt='请输入给客服的留言...'
			}
		},
		mounted(){
			
		}
	}
</script>

<style lang="less">
	.edit-ad{
		/*padding: .3rem;*/
		textarea{
			font-size: 15px;
			background: rgb(245,245,245s);
			border:0;
			border-radius: .1rem;
			height: 3.2rem;
			width: 100%;
			box-sizing: border-box;
			padding: .2rem;
			outline: none;
			margin-bottom: .3rem;
		}
		input{
			font-size: 15px;
			background: rgb(245,245,245s);
			border:0;
			height: .88rem;
			width: 100%;
			box-sizing: border-box;
			line-height: .88rem;
			padding: 0 .2rem;
			outline: none;
			border-radius: .1rem;
		}
	}
	.task-list{
		padding-top: .9rem;
		>div{
			padding: .3rem;
		}
	}
</style>