<template>
  <div class="viptips">
    <cmheader :title="thatTitle"></cmheader>
    <img :src="adverList[0].imgUrl">
  </div>
</template>

<script>
import cmheader from "../../components/cmHeader.vue";
export default {
  name: "viptips",
  data() {
    return {
	  thatTitle: "会员攻略",
	  adverList:[]
    };
  },
  mounted() {
    this.getAdvertisementList();
  },
  methods: {
    getAdvertisementList() {
      var params = {
        type: "4",
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
  components: {
    cmheader
  }
};
</script>

<style lang="less">
.viptips {
  padding-top: 0.89rem;
  img {
    width: 100%;
    height: auto;
  }
}
</style>