<template>
	<div class="menu flex-sa" @click="divClk">
		<div></div>
	</div>
</template>

<script>
	export default{
		name:'myMenu',
		data(){
			return {
				
			}
		},
		methods:{
			divClk(){
				this.$bus.emit('busEmit1','bus-emit')
			}
		},
		mounted(){
			
		}
	}
</script>

<style>
</style>