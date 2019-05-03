<template>
	<div class="order-manager">
		<div class="cm-header">
			<img src="../../../static/chicon/黑色返回@2x.png" class="pre" @click="goPrev">
			<div class="p1p"><strong  class="draw-list">领取列表</strong>
			</div>
		</div>
		<div class="tab-wrap">
			<tab>
		      <tab-item @on-item-click="onItemClick" v-for="(item,index) in menuArr" :key="index" :selected="index==tabIndex">
		      	{{item.label}}
		      </tab-item>
		      <!--<tab-item @on-item-click="onItemClick"></tab-item>
		      <tab-item @on-item-click="onItemClick"></tab-item>
		      <tab-item @on-item-click="onItemClick"></tab-item>-->
		    </tab>
		</div>
		<router-view/>
	</div>
</template>

<script>
	import { Tab, TabItem } from 'vux'
	export default {
	  components: {
	    Tab,
	    TabItem
	  },
	  data(){
	  	return{
	  		tabIndex:0,
	  		menuArr:[{
	  			label:'待完成'
	  		},{
	  			label:'待审核'
	  		},{
	  			label:'已完成'
	  		},{
	  			label:'已驳回'
	  		}]
	  	}
	  },
	  methods:{
	  	goPrev(){
	  		sessionStorage.removeItem('tabIndex')
	  		this.$gotoPages('/cityloadArea')
	  	},
	  	onItemClick(val){
	  		var _links=['/cityloadArea/orderImperfect','/cityloadArea/orderAuditing','/cityloadArea/orderFinish','/cityloadArea/orderReject']
	  		sessionStorage.setItem('tabIndex',val)
	  		this.tabIndex=val
	  		this.$gotoPages(_links[val])
	  	}
	  },
	  created(){
	  	 if(sessionStorage.getItem('tabIndex')){
	  	 	var index=sessionStorage.getItem('tabIndex')
	  	 	this.onItemClick(index)
	  	 }
	  }
	}
</script>

<style>
	.draw-list{
		color: #333333;
		font-size: 17px;
	}
	.vux-tab-item{
		position: relative;
	}
	.vux-tab-container{
		line-height: .88rem;	
	}
	.vux-tab{
		height: auto!important;
	}
	.vux-tab-selected::after{
		content: '';
		width: .2rem;
		height: 4px;
		position: absolute;
		bottom: .08rem;
		left: 50%;
		margin: 0;
		background: #E03228;
		border-radius: 2px 2px 2px 2px;
		margin-left: -.1rem;
	}
	.vux-tab-container{
		background: #FFFFFF;	
	}
	.tab-wrap{
		position: fixed;
		padding-top: .88rem;
		top: 0;
		left: 0;
		width: 100%;
	}
	.order-manager{
		height: 100%;
	}
</style>