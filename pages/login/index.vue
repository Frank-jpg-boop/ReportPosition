<template>
	<view class="container bg-white" style="height: 100%;">
		<image src="../../static/login.png" mode="widthFix" class="bindbakcImage"></image>
		<view class='systemName'>辅助标点小程序</view>		
		<view class="bottomBox">
			<view class="TRinputBox" >
				<input placeholder="请输入账号" v-model="username" class="text-right" name="input"></input>
			</view>
			<view class="TRinputBox margin-top">
				<input placeholder="请输入密码"  v-model="password" type="password" class="text-right" name="input"></input>
			</view>
			<view class="flex align-center justify-between margin-top-xl">
 				<view class="loginBtnText">登录</view>
				<view class="loginBtn text-xxl" @click="Login">
					<text class="cuIcon-pullright"></text>
				</view>
			</view>
			<!-- <view class="loginWay margin-top">切换登录方式</view> -->
		</view>
		<!-- <button class="add-btn" @click="bindUser()">登录</button> -->
	</view>
</template>

<script>
 
	import {  
	    mapMutations  
	} from 'vuex';
	export default {
		data() {
			return { 
				username:"",
				password:""
			};
		}, 
		onLoad(){
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
		methods:{
			 // ...mapMutations({
				// 		login:"login" 
				// }),
				Login(){
					uni.showLoading({
					    title: '...',
							mask:true
					});
					this.$store.state.username = this.username
					uni.setStorageSync('username',this.username)
					this.$api.login({
						userName:this.username,
						password:this.password,
					})
					.then(res=>{
						if (res.status==200) {
							this.$store.commit('login',true)
							this.$store.state.token = res.data.tokenValue
							uni.setStorage({
							    key: 'token',
							    data: res.data.tokenValue,
							    success: function () {
										uni.showToast({
											icon:'success',
											title:'登录成功'
										}) 
							      uni.reLaunch({
							      	url:'../index/index?token='+res.data.tokenValue
							      })
							    }
							});
							// uni.setStorageSync('token',res.data.tokenValue)
							this.$store.commit('login',true) 
						}
						else{
							uni.showToast({
								icon:'none',
								title:'登录失败'
							}) 
						}  
					})
					.finally(res=>{
						uni.hideLoading();
					})
				}
		}
	}
</script>

<style lang='scss' scoped>
	page{
		height: 100%;
		background: #FFFFFF;
	}
	.HeadCon{
		height: 391upx;
	}
	.systemName{
		font-size: 54upx;
		font-family: SourceHanSansCN;
		font-weight: 500;
		color: #FFFFFF;
		position: absolute;
		top: 305upx;
		left: 75upx;
		z-index: 9;
	}
	.systemName text{
	  display: block;
	  font-size: 42rpx;
	}	
	.bottomBox{
		width: 100%;
		position: absolute;
		bottom: 40upx;
		left: 0;
		padding: 0 80upx;
		padding-bottom: 100upx;
	}
	.bindbakcImage{
	  width: 100%;
	  height: auto;
	  position: absolute;
	  top: 0;
	  left: 0
	}
	.TRinputBox{
		padding:21upx 0;
		border-bottom: 1px solid  #ABB6CC;
		input{
			text-align: left;
			font-size: 32upx;
			color: #2a2a2a;
			&::-webkit-input-placeholder{
			    color:rgba(171, 182, 204, 1);
			}
			&::-moz-placeholder{   /* Mozilla Firefox 19+ */
			    color:rgba(171, 182, 204, 1);
			}
			&:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
			    color:rgba(171, 182, 204, 1);
			}
			&:-ms-input-placeholder{  /* Internet Explorer 10-11 */
			    color:rgba(171, 182, 204, 1);
			}
		}
	}
	.loginBtnText{
		font-size: 48upx;
		font-family: SourceHanSansCN;
		font-weight: 500;
		color: #3C4249;
	}
	.loginBtn{
		width: 96upx;
		height: 96upx;
		background: linear-gradient(90deg, #368BF4 0%, #42A7FB 100%);
		border-radius: 16upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 96upx;
	}
	.loginWay{
		font-size: 32upx;
		font-family: SourceHanSansCN;
		font-weight: 400;
		color: #3C4249;
		display: inline-block;
		padding: 5upx 0;
		border-bottom: 1px solid #3C4249;;
	}
</style>
