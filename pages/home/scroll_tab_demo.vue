<template>
	<view class="example" @touchmove.stop.prevent>
		<cu-custom bgColor="bg-blue " :isBack="false">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">标点列表</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-gradual-blue nav text-center">
			<view class="cu-item" :class="index == TabCur ? 'text-white cur' : ''" v-for="(item, index) in 2" :key="index" @tap="tabSelect" :data-id="index">
				{{ index ? '我的' : '全部' }}
			</view>
		</scroll-view>
		<view class="cu-form-group" @click="PickFresh">
			<view class="title">标点类型:</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'请选择标点类型'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">是否已标</view>
			<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false" color="#e54d42"></switch>
		</view>
		<scroll-view scroll-y :style="[{ height: 'calc(100vh - ' + (CustomBar + 154) + 'px)' }]">
			<swiper :current="TabCur" @change="onchange" :style="[{ height: 'calc(100vh - ' + (CustomBar + 154) + 'px)' }]">
				<swiper-item>
					<view>
						<scroll-view
							:scroll-y="true"
							class="scroll-Y"
							:scroll-with-animation="true"
							:lower-threshold="1"
							@scrolltolower="lower"
							:style="[{ height: 'calc(100vh - ' + (CustomBar + 154) + 'px)' }]"
						>
							<view >
								<!-- 一般用法 -->
								<view v-show="switchB">
								 <viwe v-for="item in pointList" :key="item.id">
									 <uni-card title="类型:" mode="title" extra="已标" 
									 :is-shadow="true"
									 
									 note="去修改">
									 	<navigator :url="'../sign/punctuation?typeid='+item.id" hover-class="navigator-hover">
									 	<view class="bg-gray light"> 
									     <view class=" grid text-center col-2">
									 			<view class="padding">经度:</view>
									 			<view class="padding">纬度:</view>
									 		</view>
									 		<view class=" grid text-center col-1">
									 			<view class="padding">地址:</view>
									 		</view>
									 		<view class=" grid text-center col-1">
									 			<view class="padding">详细地址:</view>
									 		</view>
									 	</view>
									 	</navigator>
									 </uni-card>
								 </viwe>
								</view>
								<view v-show="!switchB">
									<uni-card   mode="basic"   >
											<navigator url="../sign/punctuation?typeid=1" hover-class="navigator-hover"> 
												<view class="bg-gray light"> 
													<view class=" grid text-center col-1">
														<view class="padding">地址:</view>
													</view>
													<view class=" grid text-center col-1">
														<view class="padding">详细地址:</view>
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
				<swiper-item>
					<view>
						<scroll-view
							:scroll-y="true"
							class="scroll-Y"
							:scroll-with-animation="true"
							:lower-threshold="1"
							@scrolltolower="lower2"
							:style="[{ height: 'calc(100vh - ' + (CustomBar + 154) + 'px)' }]"
						>
							<view>第二个页面</view>
						</scroll-view>
					</view>
					<uni-load-more :contentText="contentText" :statu="more"></uni-load-more>
				</swiper-item>
			</swiper>
		</scroll-view>
		<view style="position:fixed;top:70%;right:2%"><button @click="ToPoint" class="cu-btn round bg-blue">去标点</button></view>
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
			old: {
				scrollTop: 0
			},
			TabCur: 0,
			scrollLeft: 0,
			switchB: false,
			bottomTips: '',
			currentPage: 1,
			pickerID:0,
			formData:{
				values:[],
				site:"",
				detailSit:'',
				latitude:'',
				longitude:'',
				pointTypeId:'',
				filds:[],
				keys:[],
			},
			mypoint:[],
			pointList:[],
			unpointList:[]
		};
	},
  onReady() {
		if (!this.$store.state.hasLogin) {
			uni.showToast({
				icon:'none',
				title:'请先登录'
			})
			uni.reLaunch({
				url:'../index/index'
			})
		}
		else{
			 this.getPointType();
		}
 
  },
	onShow() {
		console.log(uni.getStorageSync('hasLogin'));
		if (uni.getStorageSync('hasLogin')) {
			 this.getPointType();
		}
	},
	methods: {
		formatMode(data){
			if (data.permitUrl) {
				return "style"
			}
			else{
				if (data.pointFiles) {
					return "style"
				}
				else{
					return "basic"
				}
			}
		},
		formatUrl(data){
			console.log("data",data);
			if (data.permitUrl) {
				return data.permitUrl
			}
			else{
				if (data.pointFiles) {
					return data.pointFiles[0].url
				}
				else{
					return ""
				}
			}
			 
		},
		ToPoint(){
			uni.navigateTo({
				url:'../sign/punctuation'
			})
		},
		GetPoint(){
			this.$api.getPoint({typeId:this.formData.pointTypeId})
			.then(res=>{
				if (res.data&&res.data.records) {
					this.pointList = res.data.records.filter(item=>item.latitude)
					this.unpointList = res.data.records.filter(item=>!item.latitude)
					this.mypoint = res.data.records.filter(item=>{
					   return item.name == this.$store.state.username
					})
					console.log(this.$store.state.username,this.mypoint);
				}
			})
		},
		SwitchB(e) {
			this.switchB = e.detail.value
		},
		PickFresh(){
			this.$api.getPonitType()
			.then(res=>{
				if (res.data || res.data.records.length > this.picker.length ) {
					this.picker = res.data.records.map(item=>item.name)
					this.pickerID = res.data.records.map(item=>item.id)
					if (this.pickerID.length>0) {
						this.formData.pointTypeId = this.pickerID[0];
						this.$api.getPonitTypeF(this.pickerID[0])
						.then(res=>{
							this.index = 0;
							this.filds = res.data.fields 
							this.formData.values = []
							this.keys = res.data.fields.map(item=>item.id);
						})
					}
				}
				else{
					uni.showToast({
						title:'当前没有添加标点类型，请先添加'
					})
				}
			 })
		},
		getPointType(){
			this.$api.getPonitType()
			.then(res=>{
				this.picker = res.data.records.map(item=>item.name)
				this.pickerID = res.data.records.map(item=>item.id)
				if (this.pickerID.length>0) {
					this.formData.pointTypeId = this.pickerID[0];
					this.GetPoint()
					this.$api.getPonitTypeF(this.pickerID[0])
					.then(res=>{
						this.index = 0;
						this.filds = res.data.fields 
						this.formData.values = []
						this.keys = res.data.fields.map(item=>item.id);
					})
				}
				 
			})
		},
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
		lower2() {
			this.more2 = 'loading-loading';
			setInterval(() => {
				this.more2 = 'more-loading';
			}, 3000);
		},
		lower() {
			console.log('loading-loading');
			this.more = 'loading-loading';
			setInterval(() => {
				this.more = 'more-loading';
			}, 3000);
		},
		onnav(index) {
			this.TabCur = index;
		},
		onchange(e) {
			this.TabCur = e.detail.current;
		},
		scroll: function(e) {
			console.log(e);
			this.old.scrollTop = e.detail.scrollTop;
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		}
	}
};
</script>

<style></style>
