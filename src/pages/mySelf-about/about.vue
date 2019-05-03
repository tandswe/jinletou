<template>
  <div class="myself home">
    <cmheader :title="'关于我们'"></cmheader>

    <!-- 头部占位 -->
    <div class="u-header-padding"></div>

    <img src="../../img/myself/i-logo.png"
         alt=""
         class="u-logo">
    <div class="u-title">八八娱乐购</div>
    <p class="u-content">海润电子商务有限公司容纳50多位专业型人才，主打开发各类软件及互联网商城。其旗下的八八娱乐购软件为集娱乐、购物、广告、互动于一体互联网新型购物商城，为各个领域、年龄阶层的人民提供一种有趣可盈利的购物方式。</p>

  </div>
</template>

<script>
import cmheader from "../../components/cmHeader.vue";
import { XButton, Popup } from "vux";

export default {
  name: "myself",
  data() {
    return {};
  },
  methods: {},
  components: {
    XButton,
    Popup,
    cmheader
  },
  created() {}
};
</script>

<style lang="less" scoped>
.myself {
  padding: 0.3rem;

  .u-logo {
    width: 1.8rem;
    height: 1.8rem;
    margin: 1rem auto 0;
    display: block;
  }

  .u-title {
    width: 100%;
    text-align: center;
    margin-top: 0.3rem;
    font-size: 22px;
    font-weight: bold;
  }

  .u-content {
    text-indent: 30px;
    line-height: 30px;
    padding: 0 0.3rem;
    margin-top: 0.5rem;
    font-size: 14px;
  }
}

.home {
  position: relative;
}
</style>