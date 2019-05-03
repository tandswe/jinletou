<template>
  <div class="home">
    <div class="home-title flex-start-end">
      <div>
        八八娱乐购
      </div>
      <div @click="goVipTips">
        会员攻略
      </div>
    </div>
    <div class="home-content">
      <div>
        <div class="swiper">
          <!--<swiper :list="swiperList" :show-dots="false" v-model="swiperIndex" @on-index-change="swiperonIndexChange"></swiper>-->
          <swiperTemplate :swiperList="swiperList"
                          @swiperClk="swiperClk"></swiperTemplate>
        </div>
        <div class="mall">
          <div @click="goMall">
             <img src="../../../static/chicon/img_advert.png">
          </div>
          <div v-for="(item,index) in logoList">
            <a :href="item.url">
              <img :src="item.img">
            </a>
          </div>
        </div>
        <div class="home_advert">
          <div v-for="(item,index) in adverList"
               :key="index"
               @click="adverClick(item)">
            <a>
              <img :src="item.imgUrl">
            </a>
          </div>
        </div>
        <div class="static-ad-list">
          <div>
            精选
          </div>
        </div>
        <div class="ad-list flex-start flex-item-2">
          <div v-for="(item,index) in staticAdList"
               @click="goAdDetail(item)">
            <a>
              <img :src="item.img">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import swiperTemplate from "../../components/SwiperDemo.vue";
//	import { Swiper,SwiperItem} from 'vux'
const baseList = [
  {
    url: "http://www.baidu.com",
    img: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg"
    //	  title: '送你一朵fua'
  },
  {
    url: "javascript:",
    img: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg"
    //	  title: '送你一辆车'
  }
];
export default {
  name: "home",
  data() {
    return {
      swiperList: [],
      swiperIndex: 0,
      logoList: [],
      staticAdList: [],
      adverList: []
    };
  },
  components: {
    //			Swiper,
    //  		SwiperItem
    swiper,
    swiperSlide,
    swiperTemplate
  },
  methods: {
    adverClick(val) {
      let link = val.linkUrl;
      let goodsInfo = val;
      var price = goodsInfo.status;
      var id = goodsInfo.id;
      var giftName = goodsInfo.mallName;
      var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      var phone = userInfo.phone;
      var params =
        "&app_phone=" + phone + "&app_strkey=" + md5("hpyshop" + md5(phone));
      if (link.indexOf("http://shop.zbei.online") == -1) {
        //非商城
        window.location.href = link;
      } else {
        //商城
        var _url = link + params;
        if (this.$isIOS()) {
          //ios
          goodsDetails(_url);
        } else {
          window.android.goodsDetails(_url);
        }
      }
    },
    getAdvertisementList() {
      let params = {
        type: "6",
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
    },
    goVipTips() {
      this.$gotoPages("/vipTips");
    },
    goAdDetail(val) {
      //				console.log(val)
      //				return false
      var link = val.linkUrl;
      var goodsInfo = val;
      this.toGoodsDetail(link, goodsInfo);
    },
    initSwiper() {
      var mySwiper = new Swiper(".swiper-container", {
        autoplay: true //可选选项，自动滑动
      });
    },
    swiperonIndexChange(index) {
      this.swiperIndex = index;
      console.log(this.swiperList[index]);
    },
    goMall() {
      //		    	if(this.$isIOS()){
      //		    		this.isIOSWebView('http://hairun.zbei.online')
      //		    	}else{
      //		    		this.$gotoPages('/mall',{domain:'http://hairun.zbei.online'})
      //		    	}
      this.isIOSWebView("http://shop.zbei.online");
    },
    isIOSWebView(domain) {
      var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      var phone = userInfo.phone;
      var params =
        "?app_phone=" + phone + "&app_strkey=" + md5("hpyshop" + md5(phone));
      var domain = domain;
      var _url = domain + params;
      if (this.$isIOS()) {
        //ios
        console.log(_url);
        showNativeView(_url);
      } else {
        //android
        //					this.$gotoPages('/cityloadArea/mallDetail',{
        //						link:_url
        //					})
        window.android.showNativeView(_url);
      }
    },
    swiperClk(val) {
      var link = val.linkUrl;
      var goodsInfo = val;
      this.toGoodsDetail(link, goodsInfo);
    },
    toGoodsDetail(link, goodsInfo) {
      var price = goodsInfo.status;
      var id = goodsInfo.id;
      var giftName = goodsInfo.mallName;
      var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      var phone = userInfo.phone;
      var params =
        "&app_phone=" + phone + "&app_strkey=" + md5("hpyshop" + md5(phone));
      if (link.indexOf("shop.zbei") == -1) {
        //非商城
        if (link.indexOf("cityloadArea/moreDetail") != -1) {
          //跳转商品详情
          window.location.href = link + "&phone=" + phone;
        } else {
          window.location.href = link;
        }
      } else {
        //商城
        var _url = link + params;
        if (this.$isIOS()) {
          //ios
          console.log(_url);
          goodsDetails(_url);
        } else {
          window.android.goodsDetails(_url);
        }
      }
    },
    initHomeData(type) {
      var _this = this;
      var params = {
        type: type,
        pageNum: 1,
        pageSize: 10
      };
      var flag = false; //本地存储
      switch (type) {
        case 1:
          if (sessionStorage.getItem("swiperList")) {
            let swiperList = JSON.parse(sessionStorage.getItem("swiperList"));
            this.swiperList = swiperList;
            flag = true;
          }
          break;
        case 2:
          if (sessionStorage.getItem("logoList")) {
            let logoList = JSON.parse(sessionStorage.getItem("logoList"));
            this.logoList = logoList;
            flag = true;
          }
          break;
        case 3:
          if (sessionStorage.getItem("staticAdList")) {
            let staticAdList = JSON.parse(
              sessionStorage.getItem("staticAdList")
            );
            this.staticAdList = staticAdList;
            flag = true;
          }
          break;
      }
      if (flag) {
        //本地存储则直接使用
        return;
      }
      params = this.$qs.stringify(params);
      this.$axios({
        method: "post",
        data: params,
        url: "/appApi/appUsers/getAdvertisementList"
      })
        .then(function(res) {
          if (res.status == "200") {
            var getData = res.data;
            if (getData.status == "200") {
              var resultArr = getData.data;
              if (resultArr.length > 0) {
                resultArr.forEach(function(item) {
                  item.img = item.imgUrl;
                  item.url = item.linkUrl;
                });
              }
              switch (type) {
                case 1:
                  _this.swiperList = resultArr;
                  _this.swiperList = _this.swiperList.concat(_this.swiperList);
                  //		    					console.log(resultArr.join(','))
                  sessionStorage.setItem(
                    "swiperList",
                    JSON.stringify(_this.swiperList)
                  );
                  break;
                case 2:
                  _this.logoList = resultArr;
                  sessionStorage.setItem("logoList", JSON.stringify(resultArr));
                  break;
                case 3:
                  console.log(resultArr);
                  _this.staticAdList = resultArr;
                  sessionStorage.setItem(
                    "staticAdList",
                    JSON.stringify(resultArr)
                  );
                  break;
                default:
                  break;
              }
            } else {
              var msg = getData.msg;
              //alert(msg)
              console.log(msg);
            }
          }
        })
        .catch(function(err) {});
    }
  },
  created() {
    this.initHomeData(1);
    this.initHomeData(2);
    this.initHomeData(3);
    this.getAdvertisementList();
  },
  mounted() {}
};
</script>

<style lang="less">
.home_advert {
  box-sizing: border-box;
  padding: 0.1rem 0.3rem;
  padding-top: 0.2rem;
  img {
    width: 100%;
    height: 90px;
    margin-bottom: 20px;
    display: block;
  }
}
.ad-list {
  padding: 0 0.2rem;
  box-sizing: border-box;
  > div {
    box-sizing: border-box;
    padding: 0.1rem;
  }
  img {
    border-radius: 0.1rem;
    width: 100%;
    height: auto;
  }
}
.swiper {
  /*padding: 0 .3rem;*/
}
.mall {
  box-sizing: border-box;
  padding: 0.1rem 0.3rem;
  padding-top: 0.2rem;
  img,
  a {
    width: 100%;
    height: auto;
    display: block;
  }
}

/*.home{
		background: red;
	}*/
</style>