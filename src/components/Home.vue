<template>
	<div class="hello">
		<input type="tel" v-model="user.phone">
		<button @click="submitForm">
 			提交
 		</button>
		<a :href="dlink"></a>
		<x-button type="primary">primary</x-button>
		<button>XXX</button>
	</div>
</template>

<script>
	import { XButton  } from 'vux'
	export default {
		name: 'home',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				user: {
					phone: ''
				},
				dlink: this.$domain
			}
		},
		components: {
				XButton 
		},
		methods: {
			submitForm() {
				if(this.$check(this.user.phone, 'id')) {
					alert('手机输入正确')
				} else {
					alert('输入错误')
				}
			}
		},
		mounted() {
			this.$bus.emit('busEmit')
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
</style>