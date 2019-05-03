<template>
	<div class="cm-header">
		<img src="../../static/chicon/黑色返回@2x.png" class="pre" @click="goPrev">
		<div class="p1p"><strong class="draw-list">{{title}}</strong>
		</div>
	</div>
</template>

<script>
	export default{
		name:'cm-header',
		props:['title','backUrl'],
		data(){
			return{
				
			}
		},
		methods:{
			goPrev(){
				if(this.backUrl){
					this.$gotoPages(this.backUrl)
				}else{
					window.history.go(-1)
				}	
			}
		}
	}
</script>

<style>
</style>