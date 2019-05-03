<template>
	<div class="order-manager">
		<cmheader :title="thatTitle"></cmheader>
		<div class="task-shirtdown">
			<img src="../../../static/chicon/已下架@3x.png">
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
				thatTitle:'已完成'
			}
		},
		components: {
			cmheader 
		},
		methods: {
			goPrev() {
				window.history.go(-1)
			}
		},
		mounted() {

		}
	}
</script>

<style>
.draw-list{
	color: #333;
}
.task-shirtdown {
	text-align: center;
	padding-top: 1.8rem;
}
.task-shirtdown img{
	width: 3.5rem;
}
</style>