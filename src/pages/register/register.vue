<template>
  <div class="login">
    <img src="../../../static/chicon/close_btn.png"
         @click="goBack"
         class="page-close">
    <div class="login-title">
      注册八八娱乐购
    </div>
    <div class="logo-wrap">
    </div>
    <div class="login-input-wrap">
      <div>
        <input type="text"
               placeholder="手机号"
               id="phone"
               v-model="user.username"
               @keyup="onlyNumber"
               onafterpaste="this.user.username=this.user.username.replace(/\D/g,'')">
      </div>
      <div class="set-pt flex-start">
        <div>
          <input type="number"
                 placeholder="验证码"
                 id="checkNumber"
                 v-model="user.checkNumber">
        </div>
        <div v-if="isShowSec"
             class="check-btn">
          {{sec}}
        </div>
        <div class="check-btn"
             @click="getCode"
             v-else>
          发送验证码
        </div>
      </div>
      <div class="set-pt">
        <input type="password"
               placeholder="密码"
               id="pwd"
               v-model="user.pwd">
      </div>
    </div>
    <div class="login-btn-wrap">
      <div @click="registerSubmit"
           class="btn-bg"
           :class="{'cannot-clik':!this.isSelected}">
        注&nbsp;册
      </div>
    </div>

    <div class="go-login"
         @click="goLogin">
      已有账号去登录
    </div>
    <div class="go-login">
      <label @click="changeStatus">
        <img src="../../../static/chicon/right1.png"
             style="width: 15px;margin-right: 4px;height: 15px;position: relative;top: 2px;"
             v-if="isSelected">
        <img src="../../../static/chicon/right2.png"
             style="width: 15px;margin-right: 4px;height: 15px;position: relative;top: 2px;"
             v-if="!isSelected">
      </label>
      <label>
        注册即代表同意
      </label>
      <label class="color-blue"
             @click="goProtocal">
        《用户注册协议》
      </label>

    </div>
    <toast v-model="showErr"
           type="text"
           :time='1200'
           is-show-mask
           :text="msgContent"
           :position="'middle'"
           width="auto"></toast>
    <div class="islogining"
         v-if="islogining">
      <load-more :tip="'登录中'"></load-more>
    </div>
  </div>
</template>

<script>
import {
  Divider,
  Toast,
  LoadMore,
  TransferDomDirective as TransferDom,
  Alert
} from "vux";
//	import cmheader from '../components/CmHeader.vue'
//	import Tab from '../components/Tab.vue'
import md5 from "js-md5";
export default {
  name: "login",
  directives: {
    TransferDom
  },
  components: {
    //			cmheader,
    Divider,
    LoadMore,
    Toast
  },
  data() {
    return {
      msgContent: "账号不能为空",
      showErr: false,
      islogining: false,
      user: {
        username: "",
        checkNumber: "",
        pwd: ""
      },
      isShowSec: false,
      sec: "",
      invitationId: "",
      isSelected: true
    };
  },
  methods: {
    changeStatus() {
      this.isSelected = !this.isSelected;
    },
    goProtocal() {
      this.$gotoPages("/protocol");
    },
    getCode() {
      var _this = this;
      if (this.user.username == "") {
        this.msgContent = "手机号不能为空";
        document.getElementById("phone").focus();
        this.showErr = true;
        return false;
      }
      var params = {
        phone: this.user.username
      };
      params = this.$qs.stringify(params);
      this.$axios({
        method: "post",
        url: "/appApi/appUsers/sendMs",
        data: params
      })
        .then(function(res) {
          console.log(res);
          var getData = res.data;
          if (getData.status == "200") {
            _this.msgContent = "发送成功!";
            _this.countTime(60);
            _this.showErr = true;
          } else {
            var msg = getData.msg;
            _this.msgContent = msg;
            _this.showErr = true;
          }
        })
        .catch(function(err) {});
    },
    countTime(sec) {
      var _this = this;
      var inv = setInterval(function() {
        sec--;
        _this.isShowSec = true;
        _this.sec = sec + "s";
        if (sec == 0) {
          clearInterval(inv);
          flag = 0;
          _this.isShowSe = false;
        }
      }, 1000);
    },
    onlyNumber() {
      this.user.username = this.user.username.replace(/\D/g, "");
    },
    goLogin() {
      this.$gotoPages("/login");
    },
    goBack() {
      this.$gotoPages("/login");
    },
    isChecked() {
      if (this.user.username == "") {
        this.msgContent = "手机号不能为空";
        document.getElementById("phone").focus();
        this.showErr = true;
        return false;
      }
      if (this.user.checkNumber == "") {
        this.msgContent = "验证码不为空";
        document.getElementById("checkNumber").focus();
        this.showErr = true;
        return false;
      }
      return true;
    },
    registerSubmit() {
      var _this = this;
      var params = {
        phone: this.user.username,
        password: md5(this.user.pwd),
        invitationType: 0,
        captcha: this.user.checkNumber,
        invitationId: this.invitationId
      };
      if (!this.isSelected) {
        return false;
      }
      if (params.phone == "") {
        //tipsShow('手机号码为空!')
        document.getElementById("phone").focus();
        this.msgContent = "手机号码不能为空";
        this.showErr = true;
        return false;
      }
      if (params.phone.length < 11) {
        //
        document.getElementById("phone").focus();
        this.msgContent = "手机号码有误";
        this.showErr = true;
        return false;
      }
      if (params.captcha == "") {
        document.getElementById("checkNumber").focus();
        this.msgContent = "请输入验证码";
        this.showErr = true;
        return false;
      }
      if (params.password == "") {
        document.getElementById("pwd").focus();
        this.msgContent = "密码不能为空";
        this.showErr = true;
        return false;
      }
      if (params.password.length < 5) {
        document.getElementById("pwd").focus();
        this.msgContent = "密码不少于5位";
        this.showErr = true;
        return false;
      }
      params = this.$qs.stringify(params);
      this.$axios({
        method: "post",
        url: "/appApi/appUsers/register",
        data: params
      })
        .then(function(res) {
          var getData = res.data;
          if (getData.status == "200") {
            _this.msgContent = "注册成功!";
            _this.showErr = true;
            setTimeout(function() {
              _this.$gotoPages("/login");
            }, 1500);
          } else {
            var msg = getData.msg;
            _this.msgContent = msg;
            _this.showErr = true;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    clearLocalStorage() {
      window.localStorage.clear();
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.cannot-clik {
  opacity: 0.7;
}
.go-login {
  font-size: 12px;
  position: relative;
  color: #333333;
  text-align: center;
  top: -0.1rem;
  padding-bottom: 0.3rem;
}
.color-blue {
  color: rgb(27, 102, 199);
}
.page-close {
  position: fixed;
  top: 0.2rem;
  right: 0.2rem;
  display: inline-block;
  width: 0.44rem;
  height: 0.44rem;
}
#checkNumber {
  width: 3rem;
}
.check-btn {
  color: #e03228;
  width: 72px;
  text-align: center;
}
.set-pt {
  padding-top: 0.34rem;
}
.password-register {
  line-height: 0.12rem;
  font-size: 12px;
  div {
    color: #333333;
  }
}
.login {
  padding: 1.5rem 0.62rem 0.4rem;
}
.login-title {
  font-size: 27px;
  line-height: 27px;
  text-align: left;
  color: #1a1a1a;
  padding-bottom: 1rem;
}
p.weui-toast__content {
  color: #ffffff;
}
.logo-wrap img {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  height: 2rem;
  width: auto;
}
.login-input-wrap {
  margin-bottom: 1rem;
  > div {
    overflow: hidden;
  }
  input {
    float: left;
    outline: none;
    padding-left: 0.3rem;
    border: none;
    color: #333333;
    font-size: 0.28rem;
    width: 100%;
    line-height: 0.88rem;
    border-bottom: 1px solid #f5f5f5;
  }
}
.other-way-login > div:last-child {
  border-bottom: 1px solid #999999;
  width: 2rem;
  margin: 0 auto;
  color: #999999 !important;
  margin-top: 0.24rem;
  margin-bottom: 0.2rem;
}
.login-btn-wrap {
  div {
    border: 1px solid #ddd;
    line-height: 0.86rem;
    box-sizing: border-box;
    height: 0.86rem;
    text-align: center;
    font-size: 16px;
    color: #ffffff;
    border-radius: 0.2rem;
    margin-bottom: 0.36rem;
  }
}
</style>