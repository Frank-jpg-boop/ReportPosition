<template>
	<view class="bg-white page">
	 
		<cu-custom  :isBack="true" class="text-blue">
			 <!-- <block slot="backText" @click="Back" class="text-bold text-xl">返回</block> -->
		</cu-custom>
		<map
			id="isMap"
		 	style="width: 100%;" 
			:style="[{ height: 'calc(' +  (CustomBar+210)  + 'px)',marginTop:'-'+CustomBar+'px' }]"
		 	:scale="17" 
		 	:show-compass="true"
		 	:show-location="true"
		 	:latitude="latitude"
		 	:longitude="longitude"
		 ></map>
		 <cover-view :style="[{ top: 'calc(' +  (CustomBar+140)  + 'px)' }]" 
		 style="display: flex;position:fixed;width:100%;justify-content:flex-end;margin-right: 5px;
		 margin-bottom: 40px;right:10px;" >
		 		<cover-image @click="getLocation" :style="[{animation: 'show ' + (1*0.2+1) + 's 1'}]" 
		 		 src="../../static/focus.png" class="shadow shadow-lg" 
		 		 style="width:34px;"></cover-image>
		 </cover-view>
		 <scroll-view scroll-y="true" :style="[{ height: 'calc(100vh - ' +  (CustomBar+200+60)  + 'px)' }]">  
		  
		 <view class="padding radius bg-gray show shadow-blur shadow-lg">
			 <view class="solid">
			  <view class="cu-form-group" >
			  	<view class="title"> <text class="cuIcon-new text-olive"></text><text class="text-red">*</text> 标点类型:</view>
			  	<picker @change="PickerChange" :value="index" :range="picker">
			  		<view class="picker">
			  			{{index>-1?picker[index]:'请选择标点类型'}}
			  		</view>
			  	</picker>
			  </view>
			 </view>
			<view class="solid" @click="goMapchoose">
					 <view class="cu-form-group align-start" style="line-height: 100rpx;">
						<view class="title" style="width:130px;">
							<text class="cuIcon-focus text-orange"></text>
							<text class="text-red">*</text>
							标点位置:
						</view>
						<view>
							<text class="cuIcon-location">
							</text>{{formData.site?formData.site:'选择位置'}}<text class="cuIcon-right" style="float: right;"></text> 
						</view>
					 </view>
			</view>
			 <view class="solid">
				 <view class="cu-form-group align-start">
				 	<view class="title"  style="width:130px;"> <text class="cuIcon-info text-green"></text>详细地址:</view>
				 	<textarea maxlength="-1" v-model="formData.detailSit" placeholder="|"></textarea>
				 </view>
			 </view>
			 <view  v-for="(item,index) in filds" :key="item.id">
					<view class="cu-form-group">
						 <view class="title"><text class="cuIcon-tag text-green"></text>{{item.name}}:</view>
						 <input v-model="formData.values[index]" :placeholder="'请输入'+item.name" name="input"></input>
					</view>
			 </view>
			  <view class="cu-bar bg-white">
			  	<view class="action">
			  		<text class="cuIcon-people text-green"></text>员工
			  	</view>
			  	<view class="action">
			  		 <button class="cu-btn cuIcon" @click="addlastitems">
			  						 <text class="cuIcon-add"></text>
			  					 </button>
			  	</view>
			  </view>
			  <view class="solid-bottom">
				 <view class="cu-bar bg-white search "  v-for="(item, index) in stuff" :key="index">
					<view class="action search-form text-center" style="width:20%;" >
						<input type="text" placeholder="输入姓名" v-model="item.key"></input>
					</view>
					 <view class="search-form text-center">
						<input type="text" placeholder="输入电话" v-model="item.value"></input>
					</view>
					<view class="action">
						 <button class="cu-btn cuIcon" @click="rmlastitems(index)">
							 <text class="cuIcon-delete text-red"></text>
						 </button>
					</view>
				 </view>
			  </view>
			 
			 <view class="cu-bar bg-white">
			 	<view class="action">
			 		营业执照
			 	</view>
			 	<view class="action">
			 		{{formData.permitUrl.length==0?0:1}}/1
			 	</view>
			 </view>
			 <view class="cu-form-group">
			 	<view class="grid col-4 grid-square flex-sub">
			 		<view class="bg-img"  v-if="formData.permitUrl.length!=0" @tap="ViewImage" :data-url="formData.permitUrl">
			 		  <image :src="formData.permitUrl" mode="aspectFill"></image>
			 			<view class="cu-tag bg-red" @tap.stop="DelImg2" :data-index="index">
			 				<text class='cuIcon-close'></text>
			 			</view>
			 		</view>
			 		<view class="solids" @tap="ChooseImage(0)" v-if="formData.permitUrl.length<1">
			 			<text class='cuIcon-cameraadd'></text>
			 		</view>
			 	</view>
			 </view>
			 <view class="cu-bar bg-white ">
			 	<view class="action">
			 		其他
			 	</view>
			 	<view class="action">
			 		{{fileUrl.length}} 
			 	</view>
			 </view>
			 <view class="cu-form-group">
			 	<view class="grid col-4 grid-square flex-sub">
			 		<view class="bg-img" v-for="(item,index) in fileUrl" :key="item" @tap="ViewImage" :data-url="item">
			 		 <image :src="item" mode="aspectFill"></image>
			 			<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
			 				<text class='cuIcon-close'></text>
			 			</view>
			 		</view>
			 		<view class="solids" @tap="ChooseImage(1)" >
			 			<text class='cuIcon-cameraadd'></text>
			 		</view>
			 	</view>
			 </view>
			
				<!-- <button class="cu-btn bg-blue shadow-blur round lg" @click="upload">上传</button> -->
		 </view>
		 </scroll-view>  
			 
			<view class="cu-bar btn-group  ">
				<button class="cu-btn bg-green shadow-blur round " @click="Back">返回</button> <button class="cu-btn bg-blue shadow-blur round lg" @click="submit">提交</button>
			</view>
 
	</view>
</template>

<script>
	let that;
	// 自动获取位置
	// import QQMapWX from '../../api/qqmap-wx-jssdk.min.js'
	// 图片上传
	import uploadFile from '../../api/upload.js'
	// 合并连个数组，根据数组位置，一一对应
	function getnewarr(keyArr,valueArr) {
	    var obj = {};
	    keyArr.map( (v,i) => {
	        obj[keyArr[i]] = valueArr[i]?valueArr[i]:'';
	    })
	    return obj;
	}
	export default {
		data() {
			return {
				stuff:[
					{key:'',value:''}
				],
				index: -1,//标点类型的默认index
				picker: [],//标点类型 
				CustomBar:this.CustomBar,
				latitude:39.909,//经度,
				longitude:116.39742,//纬度
				filds:[],//标点类型字段
				keys:[],//标点类型字段id
				fileUrl:[],//其他图片
				chooseImage:false,//是否是选择图片
				//标点数据
				formData:{  
					values:[],//标点类型字段值
					fileUrl:[],//其他图片
					site:"",//位置
					permitUrl:'',//营业执照
					staff:"",//员工
					detailSit:'',//位置详情
					latitude:'',//纬度
					longitude:'',//经度
					pointTypeId:''//标点类型id
				},
				//是否更新
				updata:false,
				//更新时的标点类型的index
				uperIndex:-1,
			}
		},
		onShareAppMessage: function(options) {
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: "标点工具", // 默认是小程序的名称(可以写slogan等)
				success: function(res) {
					// 转发成功之后的回调
					if (res.errMsg == 'shareAppMessage:ok') {}
				},
				fail: function() {
					// 转发失败之后的回调
					if (res.errMsg == 'shareAppMessage:fail cancel') {
						// 用户取消转发
					} else if (res.errMsg == 'shareAppMessage:fail') {
						// 转发失败，其中 detail message 为详细失败信息
					}
				},
			};
			// 返回shareObj
			return shareObj;
		},
		onLoad(option) {
			// 判断是否带参数跳转
        if (option.index) {
					// 判断是否是更新操作
				  this.updata = true;
			  	this.formData  = JSON.parse(option.formData) 
					// 获取已填写员工值
					this.stuff = JSON.parse(this.formData.staff) 
					if (!this.stuff||this.stuff.length==0) {
						this.stuff = [{key:'',value:''}]
					}
					// 获取已选择营业执照图片
					this.formData.permitUrl=this.formData.permitUrl?this.formData.permitUrl:"";
					// 获取已选其他图片
					this.formData.fileUrl = []
					if (this.formData.pointFiles) {
						var urList = this.formData.pointFiles.map(item=>{
							return item.url
						})
						this.formData.fileUrl = JSON.parse(JSON.stringify(urList)) 
						this.fileUrl = JSON.parse(JSON.stringify(urList)) 
					}
					this.uperIndex = parseInt(option.index)
					// 标点类型的默认index
					this.index =  parseInt(option.index) 
					// 获取类型列表
					this.$api.getPonitType()
					.then(res=>{
						this.picker = res.data.records.map(item=>item.name)
						this.pickerID = res.data.records.map(item=>item.id)
					});
					// 获取标点详情
					this.getPointByID(this.formData.id)
			 }
			 else{
				  this.getPointType();
			 }
		},
		onReady() {
			that = this;
			// 判断是否登录
			if (!this.$store.state.hasLogin) {
				uni.showToast({
					icon:'none',
					title:'请先登录'
				})
				uni.reLaunch({
					url:'../login/index'
				})
			}
			else{
				// 获取当前位置，并移动到当前位置
				this.getLocation()
			}
		 
		},
		onHide() {
			// 页面隐藏清空位置，除非是选择图片
			 if (!this.chooseImage) {
					this.formData.latitude = ""
					this.formData.longitude = ""
					this.formData.site = ""
					this.chooseImage = false
			 }
		},
		methods: {
			// 根据标点ID查询标点详情
			getPointByID(id){
				this.$api.getPointDetail(id)
				.then(res=>{
					 this.getFields(res.data.fieldValues);
				})
			},
			getFields(fieldValues){
				this.$api.getPonitTypeF(this.formData.pointTypeId)
				.then(res=>{
					this.joinList([...fieldValues,...res.data.fields])
				})
			},
			// 将数组里名称相同的对象合并成一个数组
			joinList(resData){
				let dataInfo = {};
				console.log("resData",resData,resData.length);
				resData.forEach((item, index) => {
					let { name,fieldId,value="",id } = item;
					if (!dataInfo[name]) {
						dataInfo[name] = {
							name,			
							id:fieldId?fieldId:id,
							value
						}
					} 
				});
				this.filds = Object.values(dataInfo); // list 转换成功的数据
				this.keys = []
				this.formData.values = []
				for (var i = 0; i < this.filds.length; i++) {
					// 获取已填写类型字段id
					 this.keys.push(this.filds[i].id) 
					 // 获取已填写类型字段内容
					 this.formData.values.push(this.filds[i].value) 
				}
			},
			// 添加员工字段
			addlastitems(){
				console.log(this.stuff);
				 var keylist = this.stuff.map(item=>item.key)
				 var valuelist = this.stuff.map(item=>item.value)
				 console.log(keylist,valuelist);
					if (keylist.includes('')||valuelist.includes('')) {
						uni.showToast({
							 icon:"none",
							title:'请您填写完一项后继续追加'
						}) 
					} else {
						this.stuff.push({key:'',value:''});
					}
			},
			// 删除员工字段
			rmlastitems(index){
				this.stuff.splice(index, 1);
			},
			// 返回标点列表
			Back() {
				var delta = getCurrentPages();
				if (delta.length>=2) {
					uni.navigateBack({
						 delta: 1
					}); 
				}
				else{
					uni.navigateTo({
						url:'../index/index'
					})
				}
			},
			// 选择图片
			ChooseImage(type){
				this.chooseImage = true;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera','album'], //从相册选择
					success: (res) => {
						 
						let filePath = res.tempFiles[0].path;
						let filename = filePath.substr(filePath.lastIndexOf('/') + 1);
						if (type==0) {
							this.formData.permitUrl = res.tempFiles[0].path
						}
						else{
							this.fileUrl = this.fileUrl.concat(filePath)
						}
						this.upload(filename,filePath,type)
					}
				});
			},
			// 查看图片
			ViewImage(e){
				uni.previewImage({
					urls: [...this.fileUrl,this.formData.permitUrl],
					current: e.currentTarget.dataset.url
				});
			},
			// 删除营业执照
			DelImg2(e) {
				this.formData.permitUrl = ""
			},
			// 删除其他图标
			DelImg(e) { 
				this.fileUrl.splice(e.currentTarget.dataset.index, 1) 
			},
			// 上传图片
			upload(filename,filePath,type){
				var updata = {
					filename:filename,
					filePath:filePath,
					data:{}
				}
				// 获取临时密钥
				this.$api.getTmp_secret_key()
				.then(res=>{
					if (res.status == 200) {
						updata.data = res.data 
						uploadFile(updata)
						.then(res=>{
							if(res){
								if (type==0) {
									this.formData.permitUrl = res
								}
								else{
									this.fileUrl.splice(this.fileUrl.length-1,1)
									this.fileUrl.push(res) 
								}
							}
						})
						.catch(err=>{
							console.log('uploadFile',err);
						})
					} 
				})
			},
			// 初始化标点类型以及对应字段
			getPointType(){
				this.$api.getPonitType()
				.then(res=>{
					this.picker = res.data.records.map(item=>item.name)
					this.pickerID = res.data.records.map(item=>item.id)
					if (this.pickerID.length>0) {
						if (this.formData.pointTypeId.length<=0) {
							this.formData.pointTypeId = this.pickerID[0];
						}
						this.$api.getPonitTypeF(this.formData.pointTypeId)
						.then(res=>{
							this.index = 0
							this.filds = res.data.fields
							this.keys = res.data.fields.map(item=>item.id);
						})
					}
					 
				})
			},
			// 选择标点类型
			PickerChange(e) {
				this.index = e.detail.value
				this.formData.pointTypeId = this.pickerID[this.index];
				this.$api.getPonitTypeF(this.pickerID[this.index])
				.then(res=>{
					this.filds = res.data.fields 
					this.formData.values = []
					this.keys = res.data.fields.map(item=>item.id);
				})
			},
			// 填好标点数据
			submit(){
				// 位置必选
				if (!this.formData.latitude) {
					uni.showToast({
						icon:'none',
						title:'请选择位置'
					})
					return;
				}
				if (this.formData.values.length==0) {
					this.formData.values.length = this.keys.length;
				}
				 
				uni.showLoading({
					mask:true
				});
				// 格式员工字段
				this.formData.staff = JSON.stringify(this.stuff)
				// 合并标点类型字段
				this.formData.values = getnewarr(this.keys,this.formData.values)
			 	this.formData.fileUrl = this.fileUrl
				this.formData.pointFiles = []
				 
				// 判断是否是修改
				if (this.updata) {
					this.$api.updataPoint(this.formData)
					.then(res=>{
						if (res) {
							this.formData.detailSit = ""
							this.formData.latitude = ""
							this.formData.longitude = ""
							this.formData.site = ""
							this.formData.fileUrl = []
							this.fileUrl = []
							this.formData.permitUrl = ""
							this.formData.staff = ""
						  this.stuff = [{key:'',value:''}]
							uni.showToast({
								icon:'success',
								title:'修改成功！'
							})
							this.updata = false;
						}
						else{
							uni.showToast({
								icon:"none",
								title:'修改失败！'
							})
						}
					})
					.catch(res=>{
						uni.showToast({
							icon:"none",
							title:'修改失败！'
						})
					})
					.finally(()=>{
						this.Back()
						uni.hideLoading()
					})
				  
				}
				else{
					this.$api.addPoint(this.formData)
					.then(res=>{
						if (res.status == 200) {
							this.formData.detailSit = ""
							this.formData.latitude = ""
							this.formData.longitude = ""
							this.formData.site = ""
							this.formData.fileUrl = []
							this.formData.permitUrl = ""
							this.formData.staff = ""
							this.stuff = [{key:'',value:''}]
						 
							uni.showToast({
								icon:'success',
								title:'提交成功！'
							})
						}
						else{
							uni.showToast({
								icon:"none",
								title:'提交失败！'
							})
						}
					})
					.catch(res=>{
						uni.showToast({
							icon:"none",
							title:'提交失败！'
						})
					})
					.finally(()=>{
						this.Back()
						uni.hideLoading()
					})
				}
			},
			// 获取当前位置
			getLocation(){
				uni.getLocation({
				 	type: 'wgs84',
				 	success: function(res) {
				 		that.latitude = res.latitude
				 		that.longitude = res.longitude
						that.toLocation();
				 	}
				});
			},
			// 移动到选择位置
			toLocation(longitude,latitude){
				uni.createMapContext("isMap", this).moveToLocation({
					longitude:longitude,   
					latitude:latitude  
				}); 
			},
			// 点击调起地图选择位置
			goMapchoose() {
				uni.authorize({
					scope: 'scope.userLocation',
					success(res) {
						uni.chooseLocation({
								success: function (res) {
									that.formData.latitude = ''+res.latitude
									that.formData.longitude =''+ res.longitude
									that.formData.site = res.address
									// that.formData.detailSit = res.address
									console.log('formData',that.formData);
									// that.toLocation(res.longitude,res.latitude)
								 }
						});
					},
					fail(err) {
					}
				})
			} 
		}
	}
</script>

<style>
 page{
 	font-size: 28upx;
 }
	@keyframes show {
	    0% {
	        opacity: 0
	    }
	
	    100% {
	        opacity: 1
	    }
	}
	
	.page{
		height:100vh;
	}
	.bar{
		    width: 60px;
		    margin: 0 auto;
		    height: 3px;
		    /* background-color:#d8d8d8; */
		    border-radius: 2px;
	}
	 .page {
	 	height: 100Vh;
	 	width: 100vw;
	 }
	 
	 .page.show {
	 	overflow: hidden;
	 }
	 
	 .switch-sex::after {
	 	content: "\e716";
	 }
	 
	 .switch-sex::before {
	 	content: "\e7a9";
	 }
	 
	 .switch-music::after {
	 	content: "\e66a";
	 }
	 
	 .switch-music::before {
	 	content: "\e6db";
	 }
 
</style>
