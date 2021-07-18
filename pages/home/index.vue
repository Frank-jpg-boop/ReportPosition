<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText">
				<!-- <text class="cuIcon-location"></text> -->
				辅助标点小工具
			</block>
		</cu-custom>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map
				id='isMap'
					:style="[{ height: 'calc(100vh - ' + CustomBar + 'px)' }]"
					style="width: 100%; height: 300px;"
					:scale="15"
					:max-scale="16"
					:enable-poi="true"
					:show-compass="true"
					:show-location="true"
					:enable-3D="true"
					:latitude="latitude"
					:longitude="longitude"
				></map>
			</view>
			 <cover-view style="display: flex;position:fixed;width:100%;bottom:0;justify-content:flex-end;margin-top: 5px;margin-bottom: 5px;"> 
					<cover-image @click="Sign" :style="[{animation: 'show ' + (1*0.2+1) + 's 1'}]"
					 src="../../static/marke.png" class="padding shadow shadow-lg bg-white" 
					 style="width:60px;border-radius: 42px;
					 box-shadow:-3px 0px 3px #666666;margin: 0 auto;"></cover-image>
			</cover-view>
		</view>
	</view>
</template>

<script>
let that;
export default {
	data() {
		return {
			CustomBar: this.CustomBar,
			id: 0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude:39.909,
			longitude:116.39742,
			covers: [
				{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../../static/location.png'
				},
				{
					latitude: 39.9,
					longitude: 116.39,
					iconPath: '../../../static/location.png'
				}
			]
		}
	},
	onReady() {
		that = this;
		uni.authorize({
		    scope: 'scope.userLocation',
		    success() {
		       uni.getLocation({
		       	type: 'wgs84',
		       	success: function(res) {
		       		that.$store.state.latitude = res.latitude;
		       		that.$store.state.longitude = res.longitude;
		       		that.latitude = that.$store.state.latitude
		       		that.longitude = that.$store.state.longitude
		       	}
		      });
		    }
		})
	},
	methods: {
		Back(){
			console.log("back");
			uni.createMapContext("isMap", this).moveToLocation({  
				longitude: this.longitude,  
				latitude: this.latitude,  
			});  
		},
		 Sign(){
			 console.log("click")
			 uni.navigateTo({
			 	url:'../sign/index'
			 })
		 }
	}
};
</script>

<style></style>
