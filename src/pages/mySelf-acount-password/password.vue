<template>
  <div class="myself home">

    <cmheader :title="'修改密码'"></cmheader>

    <!-- 头部占位 -->
    <div class="u-header-padding"></div>

    <!-- 个人信息 -->
    <div class="m-details">

      <div v-for="item in nameInputs.items"
           class="c-list-item c-list-item-input c-list-item-identification"
           @click="item.onClick && item.onClick(item)">
        <input :type="item.type || 'text'"
               :placeholder="item.placeholder"
               v-model="item.value">

        <div class="c-identification-btn"
             v-if="item.type === 'identification'"
             @click="sendMs"></div>
      </div>

    </div>

    <div class="c-btn">
      <button @click="changePassword">确定</button>
    </div>

    <div>
      <toast v-model="toast.show"
             type="text"
             :time='1200'
             is-show-mask
             :text="toast.text"
             :position="'middle'"
             width="6em">
      </toast>
    </div>

  </div>
</template>

<script>
import cmheader from "../../components/cmHeader.vue";
import { XButton, Popup } from "vux";
import { Toast } from "vux";
import md5 from "js-md5";
var popup = { show: false };
var common = {
  pageState: "details"
};
var toast = {
  show: false,
  text: "",
  alert: function(text) {
    this.show = true;
    this.text = text;
  }
};

export default {
  name: "myself",
  filters: {},
  data() {
    return {
      toast: toast,
      popup: popup,
      commond: common,
      nameInputs: {
        items: [
          {
            name: "phone",
            checkType: "phone",
            value: "",
            placeholder: "输入手机号"
          },
          {
            name: "captcha",
            checkType: "identification",
            value: "",
            type: "identification",
            placeholder: "输入验证码"
          },
          {
            name: "password",
            checkType: "password",
            type: "password",
            value: "",
            placeholder: "输入密码"
          }
        ]
      }
    };
  },
  methods: {
    sendMs() {
      var phone;
      this.nameInputs.items.forEach(function(item) {
        if (item.name === "phone") {
          phone = item.value;
        }
      });
      var params = {
        phone: phone
      };
      var validPhone = this.$getChecker("phone")(phone);
      if (!validPhone) {
        window.$toast.alert("请输入正确的手机号");
        return;
      }
      var self = this;
      params = this.$qs.stringify(params);
      this.$axios({
        method: "post",
        data: params,
        url: "/appApi/appUsers/sendMs"
      })
        .then(function(res) {
          if (res.status == "200") {
            window.$toast.alert("获取验证码成功");
          } else {
            window.$toast.alert("获取验证码失败");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    changePassword() {
      var params = {
        // id:this.$store.state.id,
      };
      var self = this;

      var validInput = true;
      var msgMap = {
        phone: "请输入正确的手机号",
        password: "密码格式不正确",
        identification: "请输入有效验证码"
      };
      var msg = "";

      this.nameInputs.items.forEach(function(item) {
        if (!validInput) return;
        params[item.name] = item.value;

        if (item.checkType) {
          var checkRight = self.$getChecker(item.checkType)(item.value);
          validInput = validInput && checkRight;
          if (!checkRight) {
            validInput = false;
            msg = msgMap[item.checkType];
          }
        }
      });

      if (!validInput) {
        msg && window.$toast.alert(msg);
        return;
      }
      params.password = md5(params.password)
      params = this.$qs.stringify(params);
      this.$axios({
        method: "post",
        data: params,
        url: "/appApi/appUsers/forgetPassword"
      })
        .then(function(res) {
          if (res.status == "200") {
            var data = res.data;
            if (data.status == "200") {
              // FIXME 服务器报错
              window.$toast.alert("密码修改成功");
              if (window.android) {
                window.android.deleteAccount()
              } else {
                deleteAccount()
              }
              window.history.go(-1);
            } else {
              data.msg && window.$toast.alert(data.msg);
            }
          }
        })
        .catch(function(err) {
          console.error(err);
        });
    }
  },
  components: {
    XButton,
    Popup,
    cmheader,
    Toast
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
}
</style>