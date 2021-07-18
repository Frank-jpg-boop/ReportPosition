<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area"> 
			 <button @click="goMapchoose">点击调起地图选择位置</button>
			  <button @click="goMapwacth">点击调起地图查看位置</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				latitude:0,//经度,
				longitude:0//纬度
			}
		},
		onLoad() {
				// 第一步 获取定位
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
							console.log(res);
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						this.latitude = res.latitude;
						this.longitude = res.longitude;
						// // 第二步：存入缓存
						// uni.setStorage({
						// 	key:"latitude",
						// 	data: res.latitude
						// })
						// uni.setStorage({
						// 	key:"longitude",
						// 	data: res.longitude
						// })
						
						
						// that.$store.state.vipInfo.longitude = that.longitude;
						// that.$store.state.vipInfo.latitude = that.latitude;
					}
				});
			//	第一步：uniapp需要先调取用户授权请求询问用户是否授权
				uni.authorize({
				    scope: 'scope.userLocation',
				    success() {
				        uni.getLocation()
				    }
				})
		},
		methods: {
			// 点击调起地图选择位置
						goMapchoose() {
							uni.authorize({
								scope: 'scope.userLocation',
								success(res) {
									uni.chooseLocation({
			    						success: function (res) {
												console.log(res);
			       							 console.log('位置名称：' + res.name);
			       							 console.log('详细地址：' + res.address);
			       							 console.log('纬度：' + res.latitude);
			       							 console.log('经度：' + res.longitude);
			   							 }
									});
								},
								fail(err) {
							
								}
							})
						},
		 
			// 点击调起地图查看位置
						goMapwacth() {
						//查看位置需要传经纬度才能执行
							const lat = parseFloat(this.latitude)
							const log = parseFloat(this.longitude)
			
							uni.authorize({
								scope: 'scope.userLocation',
								success(res) {
									uni.openLocation({
										latitude: lat,
										longitude: log,
										success: function() {}
									});
								},
								fail(err) {
									
								}
							})
						},
		 
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
