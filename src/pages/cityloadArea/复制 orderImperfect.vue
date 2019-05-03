<template>
	<div class="order-content">
		<scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div class="box2">
        <p v-for="i in bottomCount">placeholder {{i}}</p>
        <load-more tip="loading"></load-more>
      </div>
    </scroller>		<!--<div class="order-content-scroll">
			<div v-for="(item,index) in 100" class="flex-start-end no-wrap goods-item" @click="goDetail(item)">
				<div class="flex-start no-wrap"> 
					<div>
						<img src="../../../static/chicon/右箭头@2x.png" class="goods-img">
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
							待完成
						</div>
					</div>
					<div class="goods-trangle-wrap">
						<img src="../../../static/chicon/右箭头@2x.png" class="goods-img">
					</div>
				</div>
			</div>
		</div>-->
	</div>
</template>

<script>
	import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore } from 'vux'
	export default{
		name:'',
		data(){
			return{
				imperfectList:[
				],
				showList1:true,
				pageNum:1,
				showList1: true,
      scrollTop: 0,
      onFetching: false,
      bottomCount: 20
			}
		},
		components:{
			Scroller,
    Divider,
    Spinner,
    XButton,
    Group,
    Cell,
    LoadMore
		},
		methods:{
			    onScrollBottom () {
      if (this.onFetching) {
        // do nothing
      } else {
      	alert(1)
        this.onFetching = true
        setTimeout(() => {
          this.bottomCount += 10
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
          this.onFetching = false
        }, 2000)
      }
    },
  onScroll (pos) {
      this.scrollTop = pos.top
    },
    onCellClick () {
      window.alert('cell click')
    },
    onClickButton () {
      window.alert('click')
    },
//  changeList () {
//    this.showList1 = false
//    this.$nextTick(() => {
//      this.$refs.scroller.reset({
//        top: 0
//      })
//    })
//  },
			goDetail(item){
				this.$gotoPages('/cityloadArea/submitAudit')
			},
			getTaskListByStatus(){
				var _this=this
				var params={
					id:this.$store.state.id,
					status:1,
					pageNum:this.pageNum,
					pageSize:'10'
				}
				params=this.$qs.stringify(params)
				this.$axios({
					method:'post',
					data:params,
					url:'/appApi/appUsers/getMemberRemainList'
				}).then(function(res){
					console.log(res)
					if(res.status=='200'){
						var getData=res.data
						if(getData.status=='200'){
							var _data=getData.data
							_this.imperfectList=_data
						}
					}
				}).catch(function(err){
					console.log(err)
				})
			}
		},
		created(){
			this.getTaskListByStatus()
		},
		mounted(){
		
			console.log(this.$refs.scrollerBottom)
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({top: 0})
    })
		}
	}
</script>

<style>
	.box2-wrap {
  height: 300px;
  overflow: hidden;
}
</style>