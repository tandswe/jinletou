<template>
	<div class="myself home">
		<cmheader :title="'意见反馈'"></cmheader>

		<!-- 头部占位 -->
		<div class="u-header-padding" ></div>

		<!-- 个人信息 -->
		<div class="m-details">
			<textarea class="u-content f-fs-14" 
				name="" id="" cols="30" rows="10" 
				placeholder="请描述您需要反馈的内容"
				v-model="conection.content"
			></textarea>
			<input class="u-conection f-fs-14" 
				type="text" 
				placeholder="请输入联系方式 （手机 / 微信 / 邮箱）"
				v-model="conection.contactInformation"			
			>
		</div>

		<div class="c-btn">
			<button class="f-fs-16"
				@click="onSubmit"
			>提交</button>
		</div>
		
	</div>
</template>

<script>
	import cmheader from '../../components/cmHeader.vue'
	import { XButton, Popup } from 'vux'	
	
	export default{
		name:'myself',
		data(){
			return{
				conection: {
					content: "",
					contactInformation: "",
				}
			}
		},
		methods:{
			onSubmit(){
				var self = this;
				if( !this.conection.content || this.conection.content.length < 8 ){
					window.$toast.alert("反馈留言需不少于8个字体")
					return;
				}

				var params = {
					id: this.$getUserInfo().id,
					content: this.conection.content,
					contactInformation: this.conection.contactInformation,		// FIXME
				};
				this.$HRApp("userFeedBack",{
					params: params,
					then: function(data){
						if(data.status === "200"){
							window.$toast.alert("反馈成功");
							window.history.go(-2)
						}else{
							data.msg && window.$toast.alert(data.msg);
						}
					}
				})
			}
		},
		components:{
			XButton,
			Popup,
			cmheader
		},
		created(){
		}
	}
</script>

<style lang="less" scoped>
.myself{
	padding: 0.3rem;

	.u-content{
		width: 100%;
		height: 3.15rem;
		background: #f5f5f5;
		line-height: 0.5rem;
		border-radius: 0.1rem;
		border: none;
		padding: 0.35rem;
		box-sizing: border-box;
		margin-bottom: 0.3rem;
	}

	.u-conection{
		width: 100%;
		background: #f5f5f5;
		border: none;
		border-radius: 0.1rem;
		height: 1rem;
		padding: 0.35rem;
		box-sizing: border-box;
		// line-height: 1rem;
		margin-bottom: 0.8rem;
	}

}

 
 .home{
	position: relative;	
 }
</style>