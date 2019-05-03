<template>
  <div class="myself home">

    <cmheader :title="'设置'"></cmheader>

    <!-- 头部占位 -->
    <div class="u-header-padding"></div>

    <!-- 个人信息 -->
    <div class="m-details">

      <div v-for="item in setting.items"
           class="c-list-item"
           @click="item.onClick && item.onClick(item)">
        <div class="c-item-label">{{item.label}}</div>
        <div class="c-item-raw-right"></div>
      </div>

    </div>

    <div class="c-btn btn-cancel"
         @click="logout">
      <button>退出登录</button>
    </div>

  </div>
</template>

<script>
import cmheader from "../../components/cmHeader.vue";
import { XButton, Popup } from "vux";

var common = {
  pageState: "details"
};

export default {
  name: "myself",
  filters: {},
  data() {
    var self = this;

    return {
      commond: common,
      setting: {
        items: [
          {
            label: "意见反馈",
            onClick: function() {
              self.$gotoPages("/mySelf-conect");
            }
          }
        ]
      }
    };
  },
  methods: {
    logout() {
      console.log(this.$toast);
      window.$toast.alert("退出成功");
       if (window.android) {
          window.android.deleteAccount()
        } else {
          deleteAccount()
        }
      this.$store.state.logout = true; // 标志登出
      this.$gotoPages("/login");
    }
  },
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
  .u-header-padding {
    height: 0.9rem;
    width: 100%;
  }

  .m-popup {
    height: 6rem;
    .header {
      padding: 0.4rem 0;
    }

    .haederpoit-list {
      flex-wrap: wrap;
      display: flex;
      justify-items: 2;
      justify-content: center;

      .list-item {
        flex-basis: 50%;
        height: 1.7rem;

        .wrap {
          // &>div{
          // 	display: block;
          // }
          width: 1.25rem;
          margin: 0 auto;

          .headpoint {
            float: left;
            display: inline-block;
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 0.25rem;
          }
          .checkbox {
            float: right;
            display: inline-block;
            line-height: 0.8rem;
            height: 0.8rem;
            width: 0.45rem;
          }
          label {
            width: 0.8rem;
            float: left;
            display: block;
            padding: 0.12rem 0;
          }
        }
      }
    }
  }

  .m-details {
    .c-list-item {
      padding-right: 0.6rem;

      .c-item-raw-right {
        margin-left: 0.15rem;
        margin-right: -0.44rem;
      }

      .c-item-content {
        .head-portrail {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 0.625rem;
        }
      }
    }

    .right-raw {
      width: 0.24rem;
      height: 0.33rem;
      margin-left: 0.15rem;
      margin-right: -0.44rem;
    }

    .item.user-headport {
      img.head-portrail {
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 0.625rem;
      }
      img.right-raw {
        width: 0.24rem;
        height: 0.33rem;
      }
    }

    .item {
      padding: 0.24rem 0.6rem 0.24rem 0.16rem;
      box-sizing: border-box;
      border-bottom: 1px solid #000;
      flex-wrap: nowrap;

      label {
        text-align: left;
        display: inline-block;
      }

      .content {
        .right-raw {
          display: block;
        }
      }
    }
  }

  .c-btn.btn-cancel {
    margin-top: 1.2rem;
  }
}
</style>