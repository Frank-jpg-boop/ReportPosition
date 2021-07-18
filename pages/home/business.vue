<template>
	<view class="example">
		<cu-custom bgColor="bg-blue " :isBack="true">
			<block slot="backText" @click="back">返回</block>
			<block slot="content">经营范围列表</block>
		</cu-custom>
		<checkbox-group class="block" @change="CheckboxChange">
			<view class="cu-form-group">
				<view class="title">定义颜色</view>
				<checkbox class='round red' :class="checkbox[2].checked?'checked':''" :checked="checkbox[2].checked?true:false"
				 value="C"></checkbox>
			</view>
		</checkbox-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkbox: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: true
				}, {
					value: 'C',
					checked: false
				}],
			}
		},
		methods:{
			back(){
				uni.navigateTo({
					url:'./index'
				})
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
		}
	}
</script>

<style>
</style>
