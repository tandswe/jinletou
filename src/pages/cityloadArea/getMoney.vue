<template>
  <div class="mall-wrap-outer">
    <cmheader :title="thatTitle"></cmheader>
    <div class="mall-wrap">
      <!--<iframe :src="mallSrc" id="mall-iframe" ref="myIframe">
				
			</iframe>-->
      <img  :src="adverList[0].imgUrl"
           class="getMoney">
    </div>
  </div>
</template>

<script>
import cmheader from "../../components/cmHeader.vue";
export default {
  name: "",
  data() {
    return {
      thatTitle: "城主攻略",
	  mallSrc: "",
	  adverList:[]
      //				goodsInfo:{
      //					price:'',
      //					giftName:'',
      //					id:''
      //				}
    };
  },
  components: {
    cmheader
  },
  methods: {
    getAdvertisementList() {
      var params = {
        type: "5",
        pageNum: 1,
        pageSize: 10
      };
      params = this.$qs.stringify(params);
      this.$axios({
        method: "post",
        data: params,
        url: "/appApi/appUsers/getAdvertisementList"
      }).then(res => {
        console.log(res.data.data, "data");
        this.adverList = res.data.data;
      });
    }
  },
  created() {
    //			this.mallSrc=this.$route.query.link
  },
  mounted() {
	  this.getAdvertisementList();
  }
};
</script>

<style>
.getMoney {
  width: 100%;
  margin-top: 0.88rem;
}
</style>