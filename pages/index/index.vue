<template>
	<view class="example" @touchmove.stop.prevent>
		<cu-custom bgColor="bg-blue " :isBack="true">
			<block slot="backText" @click="TOlogin">退出登录</block>
			<block slot="content">标点列表</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-gradual-blue nav text-center">
			<view class="cu-item text-xxl" :class="index == TabCur ? 'text-white cur' : ''" v-for="(item, index) in 2" :key="index" @tap="tabSelect" :data-id="index">
				{{ index ? '全部' : '我的' }}
			</view>
		</scroll-view>

		<view class="cu-form-group" @click="PickFresh">
			<view class="title">标点类型:</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">{{ index > -1 ? picker[index] : '请选择标点类型' }}</view>
			</picker>
		</view>
		<view class="cu-form-group ">
			<view class="title">是否已标</view>
			<view>
				<text class="margin-right">{{ switchB ? '已标' : '未标' }}</text>
				<switch class="blue" @change="SwitchB" :class="switchB ? 'checked' : ''" :checked="switchB ? true : false" color="#e54d42"></switch>
			</view>
		</view>
		<scroll-view scroll-y :style="[{ height: 'calc(100vh - ' + (CustomBar + 154) + 'px)' }]">
			<swiper :current="TabCur" @change="onchange" :style="[{ height: 'calc(100vh - ' + (CustomBar + 154) + 'px)' }]">
				<swiper-item>
					<view>
						<scroll-view
							:scroll-top="scrollTop"
							@scroll="scroll"
							:scroll-y="true"
							class="scroll-Y"
							:scroll-with-animation="true"
							:lower-threshold="1"
							:style="[{ height: 'calc(100vh - ' + (CustomBar + 154) + 'px)' }]"
						>
							<view v-show="switchB">
								<uni-card mode="basic" v-for="item in mypoint" :key="item.id">
									<navigator :url="'../sign/punctuation?typeid=' + item.id + '&formData=' + JSON.stringify(item) + '&index=' + index" hover-class="navigator-hover">
										<view class="bg-gray light">
											<!-- <view class=" grid text-center col-1">
													<view class="padding">地址:{{item.site?item.site:''}}</view>
												</view> -->
											<view class=" grid text-center col-1">
												<view class="padding">详细地址:{{ item.detailSit ? item.detailSit : '' }}</view>
											</view>
											<view class=" grid text-center col-2">
												<view class="padding">名称：{{ item.val['a4ddb781e7ad8d392f5dc3c0cc8fba2d'] }}</view>
												<view class="padding">标记人:{{ item.name ? item.name : '' }}</view>
											</view>
										</view>
									</navigator>
								</uni-card>
							</view>
							<view v-show="!switchB">
								<uni-card mode="basic" v-for="item in myunpoint" :key="item.id">
									<navigator :url="'../sign/punctuation?typeid=' + item.id + '&formData=' + JSON.stringify(item) + '&index=' + index" hover-class="navigator-hover">
										<view class="bg-gray light">
											<!-- <view class=" grid text-center col-1">
													<view class="padding">地址:{{item.site?item.site:''}}</view>
												</view> -->
											<view class=" grid text-center col-1">
												<view class="padding">详细地址:{{ item.detailSit ? item.detailSit : '' }}</view>
											</view>
											<view class=" grid text-center col-2">
												<view class="padding">名称：{{ item.val['a4ddb781e7ad8d392f5dc3c0cc8fba2d'] }}</view>
												<view class="padding">标记人:{{ item.name ? item.name : '' }}</view>
											</view>
										</view>
									</navigator>
								</uni-card>
							</view>
						</scroll-view>
					</view>
					<uni-load-more :contentText="contentText" :statu="more"></uni-load-more>
				</swiper-item>
				<swiper-item>
					<view>
						<scroll-view
							:scroll-top="scrollTop"
							@scroll="scroll"
							:scroll-y="true"
							:style="[{ height: 'calc(100vh - ' + (CustomBar + 154) + 'px)' }]"
							:refresher-enabled="refresher"
							:refresher-threshold="threshold"
							:refresher-triggered="triggered"
							@refresherrefresh="refreshing"
							:scroll-anchoring="anchoring"
							@scrolltolower="infinite"
						>
							<view>
								<view v-show="switchB">
									<viwe v-for="item in pointList" :key="item.id">
										<uni-card mode="basic" :is-shadow="true">
											<navigator :url="'../sign/punctuation?typeid=' + item.id + '&formData=' + JSON.stringify(item) + '&index=' + index" hover-class="navigator-hover">
												<view class="bg-gray light">
													<!-- <view class=" grid text-center col-1">
													<view class="padding">地址:{{item.site?item.site:''}}</view>
												</view> -->
													<view class=" grid text-center col-1">
														<view class="padding">详细地址:{{ item.detailSit ? item.detailSit : '' }}</view>
													</view>
													<view class=" grid text-center col-2">
														<view class="padding">名称：{{ item.val['a4ddb781e7ad8d392f5dc3c0cc8fba2d'] }}</view>
														<view class="padding">标记人:{{ item.name ? item.name : '' }}</view>
													</view>
												</view>
											</navigator>
										</uni-card>
									</viwe>
								</view>

								<view v-show="!switchB">
									<uni-card mode="basic" v-for="item in unpointList" :key="item.id">
										<navigator :url="'../sign/punctuation?typeid=' + item.id + '&formData=' + JSON.stringify(item) + '&index=' + index" hover-class="navigator-hover">
											<view class="bg-gray light">
												<!-- <view class=" grid text-center col-1">
														<view class="padding">地址:{{item.site?item.site:''}}</view>
													</view> -->
												<view class=" grid text-center col-1">
													<view class="padding">详细地址:{{ item.detailSit ? item.detailSit : '' }}</view>
												</view>
												<view class=" grid text-center col-2">
													<view class="padding">名称：{{ item.val['a4ddb781e7ad8d392f5dc3c0cc8fba2d'] }}</view>
													<view class="padding">标记人:{{ item.name ? item.name : '' }}</view>
												</view>
											</view>
										</navigator>
									</uni-card>
								</view>
							</view>
						</scroll-view>
					</view>
					<uni-load-more :contentText="contentText" :statu="more"></uni-load-more>
				</swiper-item>
			</swiper>
		</scroll-view>
		<view style="position:fixed;top:70%;right:2%">
			<view><button @click="ToPoint" class="cu-btn round bg-blue text-white text-xxl">去标点</button></view>
			<view>
				<button @click="Reload" class="cu-btn round bg-yellow text-white text-xxl margin-top-xl">
					刷新
					<text class="cuIcon-refresh"></text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
let that;
import loadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniCard from '@/components/uni-card/uni-card.vue';
export default {
	components: {
		loadMore,
		uniCard
	},
	data() {
		return {
			index: -1,
			picker: [],
			more2: 'more-loading',
			more: 'more-loading', //more-loading前；loading-loading中；noMore-没有更多了
			contentText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			isAllowPull: true,
			CustomBar: this.CustomBar,
			scrollTop: 0,
			oldScrollTop: 0,
			old: {
				scrollTop: 0
			},
			TabCur: 0,
			scrollLeft: 0,
			switchB: false,
			bottomTips: '',
			currentPage: 1,
			pickerID: 0,
			formData: {
				values: [],
				site: '',
				detailSit: '',
				latitude: '',
				longitude: '',
				pointTypeId: '',
				filds: [],
				keys: []
			},
			mypoint: [],
			myunpoint: [],
			pointList: [],
			unpointList: []
		};
	},
	onReady() {
		// 判断是否登录
		if (!this.$store.state.hasLogin) {
			uni.showToast({
				icon: 'none',
				title: '请先登录'
			});
			uni.reLaunch({
				url: '../login/index'
			});
		} else {
			this.getPointType();
		}
	},
	onPullDownRefresh() {
		this.getPointType();
	},
	onShow() {
		this.getPointType();
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
	methods: {
		scroll(e) {
			//记录scroll  位置
			this.oldScrollTop = e.detail.scrollTop;
		},
		Reload() {
			//视图会发生重新渲染
			this.scrollTop = this.oldScrollTop;
			//当视图渲染结束 重新设置为0
			this.$nextTick(() => {
				this.scrollTop = 0;
			});
			this.GetPoint();
		},
		TOlogin() {
			uni.redirectTo({
				url: '../login/index'
			});
		},
		ToPoint() {
			uni.navigateTo({
				url: '../sign/punctuation'
			});
		},
		GetPoint() {
			this.$api
				.getPoint({ typeId: this.formData.pointTypeId })
				.then(res => {
					if (res.data && res.data.records) {
						this.pointList = res.data.records.filter(item => item.latitude);
						this.unpointList = res.data.records.filter(item => !item.latitude);
						if (this.unpointList.length == 0) {
							this.switchB = true;
						}
					}
					return this.$api.getMyPoint({ typeId: this.formData.pointTypeId, my: true });
				})
				.then(res => {
					if (res.data && res.data.records) {
						this.mypoint = res.data.records.filter(item => item.latitude);
						this.myunpoint = res.data.records.filter(item => !item.latitude);
					}
				});
		},
		SwitchB(e) {
			this.switchB = e.detail.value;
		},
		PickFresh() {
			this.$api.getPonitType().then(res => {
				if (res.data || res.data.records.length > this.picker.length) {
					this.picker = res.data.records.map(item => item.name);
					this.pickerID = res.data.records.map(item => item.id);
					if (this.pickerID.length > 0) {
						this.formData.pointTypeId = this.pickerID[0];
						this.$api.getPonitTypeF(this.pickerID[0]).then(res => {
							this.index = 0;
							this.filds = res.data.fields;
							this.formData.values = [];
							this.keys = res.data.fields.map(item => item.id);
						});
					}
				} else {
					uni.showToast({
						title: '当前没有添加标点类型，请先添加'
					});
				}
			});
		},
		getPointType() {
			uni.showLoading({
				title: '加载中'
			});
			this.$api.getPonitType().then(res => {
				uni.hideLoading();
				this.picker = res.data.records.map(item => item.name);
				this.pickerID = res.data.records.map(item => item.id);
				if (this.pickerID.length > 0) {
					this.formData.pointTypeId = this.pickerID[0];
					this.GetPoint();
					this.$api.getPonitTypeF(this.pickerID[0]).then(res => {
						this.index = 0;
						this.filds = res.data.fields;
						this.formData.values = [];
						this.keys = res.data.fields.map(item => item.id);
					});
				}
			});
		},
		PickerChange(e) {
			this.index = e.detail.value;
			this.formData.pointTypeId = this.pickerID[this.index];
			this.GetPoint();
			this.$api.getPonitTypeF(this.pickerID[this.index]).then(res => {
				this.filds = res.data.fields;
				this.formData.values = [];
				this.keys = res.data.fields.map(item => item.id);
			});
		},
		onchange(e) {
			this.TabCur = e.detail.current;
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		}
	}
};
</script>

<style>
page {
	font-size: 28upx;
}
</style>
