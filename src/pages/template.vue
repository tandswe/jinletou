<template>
	<div class="">
		<div class="">
			
		</div>
		<div class="">
			
		</div>
	</div>
</template>

<script>
	export default{
		name:'',
		data(){
			return{
				
			}
		},
		components:{
			
		},
		methods:{
			demo(){
				var _this=this
				var params={
					keyname:''
				}
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					data:params,
					url:''
				}).then(function(res){
					console.log(res)
					if(res.status=='200'){
						var getData=res.data
						if(getData.status=='200'){
							var _data=getData.data
							_this.XXXX=_data
						}
					}
				}).catch(function(err){
					console.log(err)
				})
			}
		},
		mounted(){
			
		}
	}
</script>

<style>
</style>