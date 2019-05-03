import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 创建基本状态
const state = {
 userId:'',
 test:'3',
 isShowPop:false,
 playerInfo:{
 	
 },
 isCanSwiper:false,
 shareFlag:false,
 playerInfo1:'',
 editorTxt:'',
 audioshow:false,
 videoshow:false,
 hidePlayer:false,
 // 登录状态为没登录
 logined: false,
 //底部菜单激活状态下标
 loginToken:'',
 uid:'',
 nowIndex:0,
 isAudioMini:false,
 audioInfo:{
 },
 // 用户信息数据,目前只需要avatar和name,还是把username也加上吧
 LoginedUser: {
  name: '',
  avatar: '',
  username: ''
 }
}
// 创建改变状态的方法
const mutations = {
 // 改变状态的方法也需要2个，一个是登录或注册了，一个是登出了
 // 这里不能写箭头函数???
 // 登录
 LOGIN (state) {
  // 先让登录状态变为登录了
  state.logined = true
  // 然后去sessionStorage取用户数据
  let user = sessionStorage.getItem('userInfoStorage')
  // 再把用户数据发下去
  state.LoginedUser.username = user
  //state.LoginedUser.avatar = user.avatar
  //state.LoginedUser.username = user.username
 },
 // 登出
 LOGOUT (state) {
  // 这个同理
  state.logined = false
  state.LoginedUser.name = ''
  //state.LoginedUser.avatar = ''
  //state.LoginedUser.username = ''
 },
 GETUID (state){
 	//存在cookie种的uid，则在APP.vue中调用GETUID获取uid存放在state.uid中
 	var getCookie=function (name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");　　
		return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
	}
	if(getCookie('uid')){
		state.uid=getCookie('uid')
		state.username=getCookie('username')
	}else{
		state.uid=''
	}
 }
}
// 创建驱动actions可以使得mutations得以启动
const actions = {
 // 这里先来一个驱动LOGIN的东西就叫login吧
 // 这个context是官方写的，应该叫什么无所谓
 login({commit}) {
  commit('LOGIN')
 },
 // 同样来个logout
 logout({commit}) {
  commit('LOGOUT') 
 },
 //触发getuid
 getuid({commit}){
 	commit('GETUID')
 }
}
 
export default new Vuex.Store({
 state,
 mutations,
 actions
})