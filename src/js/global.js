exports.install = function(Vue, options) {

	window.utils = {
		filters: function(value, type){
			var filters = {
				phone: function(){
					return markStar(value, 3, 4);
				},
				identify: function(){
					return markStar(value, 5, 5);
				},
				username: function(){
					var len = value.length;
					return markStar(value, 1, 1);
				},
				email: function(){
					var emailname = value.split("@");
					var tail = emailname[1] || "" ;
					emailname = emailname[0];
					
					return emailname
						? markStar(emailname, 2, 2) + ( tail ? ("@" + tail) : "")
						: value;
				},
			};
			function markStar (str,frontLen,endLen) { 
				if(str.length <= frontLen + endLen) return str;
				var len = str.length-frontLen-endLen;
				var star = '';
				for (var i=0;i<len;i++) {
					star+='*';
				}
				return str.substring(0,frontLen)+star+str.substring(str.length-endLen);
			}

			if(value === null || value === undefined || value === "" || typeof value !== "string")
				return value;
			else 
				return filters[type] ? filters[type]() : value;
		}
	}

	Date.prototype.Format = function(fmt){ //author: meizz   
	  var o = {   
		"M+" : this.getMonth()+1,                 //月份   
		"d+" : this.getDate(),                    //日   
		"h+" : this.getHours(),                   //小时   
		"m+" : this.getMinutes(),                 //分   
		"s+" : this.getSeconds(),                 //秒   
		"q+" : Math.floor((this.getMonth()+3)/3), //季度   
		"S"  : this.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
		if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
	}  

	//服务器地址
	Vue.prototype.$domain = 'http://www.baidu.com'
	Vue.prototype.$check = function(str, type) {
			var reg = {
				//身份证
				id: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
				//手机号码
				phone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
				//email
				email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
				//包含有中文就返回true
				cn: /[\u4e00-\u9fa5]/,
				numen: /^[A-Za-z0-9]+$/,
				code: /[1-9]\d{5}/
			}
			//正确返回true
			return reg[type].test(str) ? true : false
	}
	Vue.prototype.$onlyNumber = function(str) {
		//只能输入数字
		return str.replace(/\D/g, '')
	}
	Vue.prototype.$isAndroid = function() {
		//判断是否android客户端，返回boolean
		var u = navigator.userAgent;
		return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	}
	Vue.prototype.$isIOS = function() {
		//判断是否isIOS客户端，返回boolean
		var u = navigator.userAgent;
		return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	}
	Vue.prototype.$backTop = function() {
		//滚动条置顶
		document.documentElement.scrollTop = 0
		window.pageYOffset = 0
		document.body.scrollTop = 0
	}
	Vue.prototype.$gotoPages = function(path, params) {
		//跳转页面
		if(params == '' || params == null) {
			this.$router.push(path)
		} else {
			this.$router.push({
				path: path,
				query: params
			})
		}
	},
	Vue.prototype.$cookie = {
		//cookie设置，取值，删除
	    set:function(key,val,time){//设置cookie方法
	        var date=new Date(); //获取当前时间
	        var expiresDays=time;  //将date设置为n天以后的时间
	        date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
	        document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
	    },
	    get:function(key){//获取cookie方法
	        /*获取cookie参数*/
	        var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
	        var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
	        var tips;  //声明变量tips
	        for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
	            var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
	            if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
	                tips=arr[1];   //将cookie的值赋给变量tips
	                break;   //终止for循环遍历
	            }
	        }
	        return tips;
	       },
	      delete:function(key){ //删除cookie方法
	         var date = new Date(); //获取当前时间
	         date.setTime(date.getTime()-10000); //将date设置为过去的时间
	         document.cookie = key + "=v; expires =" +date.toGMTString();//设置cookie
	       }
	}

	// 变更$store.state、变更session storage 的 userInfor
	Vue.prototype.$resetUserInfor = function (params){
		if(!this.$store || !this.$store.state) return;

		var sessionUserInfor = JSON.parse(sessionStorage.getItem('userInfo')) || {};
		for(var i in params){
			this.$store.state[i] = params[i];
			sessionUserInfor[i] = params[i];
		}

		// 直接使用JSON.stringify 会让 npm run dev 凉凉？
		var jsonObj = JSON;
		sessionUserInfor = jsonObj.stringify(sessionUserInfor);
		sessionStorage.setItem('userInfo', sessionUserInfor);
	}

	Vue.prototype.$findObj = function(obj, key, value){
		var targetObj = undefined;
		for(k in obj){
			if(obj[k][key] === value){
				targetObj = obj[k];
				break;
			}
		}
		return targetObj;
	}

	Vue.prototype.$getChecker = function(type){
		var checkers = {
			bankCard: CheckBankNo,
			userName: function(value){
				return /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(value)
			},
			phone: function(value){
				return /^1\d{10}$/.test(value)
			},
			email: function(value){
				return value && value.length >= 3;
				// var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
				// return reg.test(value);
			},
			idCard: function(value){
				return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
			},
			wechat: function (value){
				return value && value.length >= 3;
				// return /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(value);
			},
			address: commonChecker,
			password: function(value){
				return /^(\w){6,20}$/.test(value)
			},
			identification: function(value){
				return /^[0-9]{6}$/.test(value)
			}
		}

		return checkers[type];
	}

	Vue.prototype.$getUserInfo = function(name, obj){
		return this.$store.state.userInfo
	}

	Vue.prototype.$filter = function(value, type){
		var filters = {
			phone: function(){
				value = value.toString();
				return value.substr(0, 3) + '****' + val.substr(7);
			}
		}
		return filters[type]()
	}

	// 海润APP 请求
	Vue.prototype.$HRApp = function(name, obj){
		obj.params=this.$qs.stringify(obj.params);
		this.$axios({
			method:'post',
			data:obj.params,
			url:'/appApi/appUsers/' + name
		}).then(function (res){
			if(obj.FIXME){			// 调试，FIXME
				obj.then && obj.then(res.data);
				return;
			}
			if(res.data.status === "200"){
				obj.then && obj.then(res.data);
			}else{
				res.data.msg && alert(res.data.msg);
			}
		}).catch(function(err){
			obj.catch && obj.catch(err);
		})
	}

	function commonChecker(value){
		return value && value.length && value.length > 2;
	}


	// https://blog.csdn.net/sinat_17775997/article/details/78210455

	//银行卡号Luhn校验算法
	//银行卡号Luhn校验算法
	//luhn校验规则：16位银行卡号（19位通用）: 
	//1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
	//2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
	//3.将加法和加上校验位能被 10 整除。

	//bankno为银行卡号
	function luhnCheck(bankno){
		var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhn进行比较）
	
		var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
		var newArr=new Array();
		for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
			newArr.push(first15Num.substr(i,1));
		}
		var arrJiShu=new Array();  //奇数位*2的积 <9
		var arrJiShu2=new Array(); //奇数位*2的积 >9
		
		var arrOuShu=new Array();  //偶数位数组
		for(var j=0;j<newArr.length;j++){
			if((j+1)%2==1){//奇数位
				if(parseInt(newArr[j])*2<9)
				arrJiShu.push(parseInt(newArr[j])*2);
				else
				arrJiShu2.push(parseInt(newArr[j])*2);
			}
			else //偶数位
			arrOuShu.push(newArr[j]);
		}
		
		var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
		var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
		for(var h=0;h<arrJiShu2.length;h++){
			jishu_child1.push(parseInt(arrJiShu2[h])%10);
			jishu_child2.push(parseInt(arrJiShu2[h])/10);
		}        
		
		var sumJiShu=0; //奇数位*2 < 9 的数组之和
		var sumOuShu=0; //偶数位数组之和
		var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
		var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
		var sumTotal=0;
		for(var m=0;m<arrJiShu.length;m++){
			sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
		}
		
		for(var n=0;n<arrOuShu.length;n++){
			sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
		}
		
		for(var p=0;p<jishu_child1.length;p++){
			sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
			sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
		}      
		//计算总和
		sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
		
		//计算luhn值
		var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
		var luhn= 10-k;
		
		if(lastNum==luhn){
			// console.log("验证通过");
			return true;
		}else{
			return false;
		}        
	}
	
	//检查银行卡号
	function CheckBankNo(bankno) {
		var bankno = bankno.replace(/\s/g,'');
		if(bankno == "") {
			return false;
		}
		if(bankno.length < 16 || bankno.length > 19) {
			return false;
		}
		var num = /^\d*$/;//全数字
		if(!num.exec(bankno)) {
			return false;
		}
		//开头6位
		var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
		if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
			return false;
		}
		//Luhn校验
		if(!luhnCheck(bankno)){
			return false;
		}
		return true;
	}
}