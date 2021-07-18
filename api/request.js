function toQueryPair(key, value) {
	if (typeof value == 'undefined') {
		return `&${key}=`;
	}
	return `&${key}=${value}`;
}

function jumpFlag(path, events) { //跳转开关
	if (getApp().globalData.is_flag) { //is_flag开始等于 true
		getApp().globalData.is_flag = false;
		console.log(path, events);
		uni.navigateTo({
			url: path,
			events: events
		});
		setTimeout(() => {
			getApp().globalData.is_flag = true;
			console.log(getApp().globalData.is_flag);
		}, 1000)
	} else {
		console.log('重复点击了');
	}
}
// 增
function Post({
	data,
	url
}) {
	return global.$http.request({
		url: url,
		method: 'post',
		header: {
			contentType: 'application/json'
		},
		data: data
	});
}
// 删
function Delete({
	url,
	data
}) {
	return global.$http.request({
		url: url + '/',
		method: 'delete',
		data: data
	});
}
// 改
function Put({
	data,
	url
}) {
	return global.$http.request({
		url: url +  '/',
		method: 'put',
		data: data
	});
}
// 查
function Get({
	param,
	url
}) {
	if (Object.prototype.toString.call(param) == '[object Object]') {
		let queryParam = '';
		url+='?'
		for (let key in param) {
			if (param.hasOwnProperty(key)) {
				let value = param[key];
				queryParam += toQueryPair(key, value);
			}
		}
		url += queryParam
	}
	console.log('url',url);
	return global.$http.request({
		url: url,
		method: 'get',
	});
}

export default {
	// 解决连续点击重复跳转页面的问题
	jumpFlag: jumpFlag,
	// 提示
	Toast(title) {
		uni.showToast({
			title: title,
			icon: "none"
		});
	},
	
	// 查询全部标点
	getPoint(param){
		return Get({
			param: param, 
			url: '/points'
		})
	},
	
	// 查询全部标点
	getPointDetail(id){
		return Get({
			url: `/points/details/${id}`
		})
	},
	
	// 查询我的标点
	getMyPoint(param){
		return Get({
			param: param, 
			url: '/points'
		})
	},
 
	// 添加標點
	addPoint(param){
		return Post({
			data: param, 
			url: '/points'
		})
	},
	// 修改标点
	updataPoint(param){
		return Put({
			data: param, 
			url: '/points'
		})
	},
	
	// 获取标点类型
	getPonitType(param){
		return Get({
			param: param, 
			url: '/pointTypes'
		})
	},
	
	
	// 获取标点字段
	getPonitTypeF(id){
		return Get({
			url: '/pointTypes/'+id
		})
	},
	
	 //登录  
	 login(data){
		return Post({
			data:data, 
			url: '/login/login'
		})
	 },
	 
	 //获取用户Id
	 getId(data){
	 		return Post({
				// header: {
				// 	'token':token,
				// }, 
	 			url: '/login/getId',
				data:data
	 		})
	  
	 },
 
	 //获取临时密钥
	 getTmp_secret_key(){
	 	return Get({ 
	 		url: '/oss/temporarySecret'
	 	}) 
	 },
	 
	 //获取临时签名
	 getTmp_secret_str(){
	 	return Get({ 
	 		url: '/oss/uploadingStr'
	 	}) 
	 },
	 
	 //文件上传
	 uploadingUrl(){
	 	return Get({ 
	 		url: '/oss/uploadingUrl'
	 	}) 
	 }
	 
};
