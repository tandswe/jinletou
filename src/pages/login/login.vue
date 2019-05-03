<template>
  <div class="login">
    <!--<img src="../../../static/chicon/close_btn.png" @click="goBack" class="page-close">-->
    <div class="login-title">
      登录八八娱乐购
    </div>
    <div class="logo-wrap">
    </div>
    <div class="login-input-wrap">
      <div>
        <input type="text"
               placeholder="手机号"
               id="username"
               v-model="user.username">
      </div>
      <div class="set-pt">
        <input type="password"
               placeholder="密码"
               id="pwd"
               v-model="user.password">
      </div>
    </div>
    <div class="login-btn-wrap">
      <div @click="login"
           class="btn-bg login-btn">
        登&nbsp;录
      </div>
    </div>
    <div class="flex-start-end password-register">
      <div @click="forgetPassWord">
        忘记密码?
      </div>
      <div @click="register">
        <strong>
          手机注册
        </strong>
      </div>
    </div>
    <toast v-model="showErr"
           type="text"
           :time='1200'
           is-show-mask
           :text="msgContent"
           :position="'middle'"
           width="2.4rem"></toast>
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
      msgContent: "手机号不能为空",
      showErr: false,
      islogining: false,
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    loginAcounts(val) {
      // if(val){
      let usre = JSON.parse(val);
      this.user.username = usre.phone;
      this.user.password = usre.password;
      this.login(1);
      // }else{
      // 	alert('失败了'+val)
      // }
    },
    forgetPassWord() {
      this.$gotoPages("/forgetPassword");
    },
    register() {
      this.$gotoPages("/register");
    },
    goPrev() {
      //this.$gotoPages('/Main')
      this.$store.state.nowIndex = 3;
      this.$gotoPages("/myself");
      //				console.log(this.$getCookie('uid'))
      //				if(this.$getCookie('uid')!=undefined){
      //
      //					this.$router.back()
      //				}else{
      //					this.$gotoPages('/Main')
      //				}
    },
    login(isValue) {
      if (this.user.username == "") {
        this.msgContent = "手机号不能为空";
        document.getElementById("username").focus();
        this.showErr = true;
        return false;
      }
      if (this.user.password == "") {
        this.msgContent = "密码不能为空";
        document.getElementById("pwd").focus();
        this.showErr = true;
        return false;
      }
      var _this = this;
      var params
      //					_this.islogining=true
       if (isValue == 1) {
         params = {
          phone: this.user.username,
          pwd: this.user.password
        };
       }else{
        this.user.password =  md5(this.user.password)
         params = {
          phone: this.user.username,
          pwd: this.user.password
        };
       }
      params = this.$qs.stringify(params);
      this.$axios({
        method: "post",
        data: params,
        url: "/appApi/appUsers/userLogin"
      })
        .then(function(res) {
          if (res.status == "200") {
            var getData = res.data;
            var userInfo = JSON.stringify(getData.data);
            if (getData.status == "200") {
              sessionStorage.setItem("userInfo", userInfo);
              var _userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
              _this.$store.state.id = _userInfo.id;
              _this.$store.state.userInfo = _userInfo;
              sessionStorage.setItem("nowIndex", 0);
              let usre;
                usre = {
                  phone: _this.user.username,
                  password: _this.user.password,
                  userid: _userInfo.id
                };
              if (window.android) {
                window.android.saveAccount(JSON.stringify(usre));
              } else {
                saveAccount(JSON.stringify(usre));
              }
              _this.$gotoPages("/home");
            } else {
              var msg = getData.msg;
              _this.msgContent = msg;
              _this.showErr = true;
            }
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    clearLocalStorage() {
      window.localStorage.clear();
    },
    goBack() {
      sessionStorage.setItem("nowIndex", 0);
      this.$gotoPages("/home");
    }
  },
  beforeCreate() {
    var toLogout = this.$store.state.logout;
    if (toLogout) {
      // 登出状态进入，刷新页面清除
      window.sessionStorage.clear();
      window.location.reload();
    }
  },
  mounted() {},
  created() {
    let that = this;
    window.loginAcount = that.loginAcounts;
  }
};
</script>

<style lang="less">
.login-btn {
  color: #ffffff;
}

.set-pt {
  padding-top: 0.34rem;
}
.page-close {
  position: fixed;
  top: 0.2rem;
  right: 0.2rem;
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
}

.password-register {
  line-height: 0.12rem;
  font-size: 12px;
  div {
    height: 24px;
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
  .flex-start {
    padding-bottom: 0.4rem;
  }
  > div {
    overflow: hidden;
  }
  input {
    float: left;
    outline: none;
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
    height: 0.86rem;
    text-align: center;
    box-sizing: border-box;
    font-size: 16px;
    border-radius: 0.2rem;
    margin-bottom: 0.36rem;
  }
}
</style>