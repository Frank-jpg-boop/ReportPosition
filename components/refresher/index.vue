<template>
  <!-- page-content -->
  <view class="page">
    <scroll-view scroll-y class="view-page-content" 
		:refresher-enabled="refresher" :refresher-threshold="threshold"
		:refresher-triggered="triggered" @refresherrefresh="refreshing" 
		:scroll-anchoring="anchoring" @scrolltolower="infinite">
      <slot></slot>
      <load-more :status="loadMoreStatus" iconType="snow" v-if="infiniting"></load-more>
    </scroll-view>
  </view>

</template>

<script>
export default {
  name: "PageContent",
  props: {
    refresher: {
      type: Boolean,
      default: false,
    },
    threshold: {
      type: Number,
      default: 100,
    },
    anchoring: {
      type: Boolean,
      default: true,
    },
    infiniting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isRefreshing: false, // 是否在刷新中
      isInfiniting: this.infiniting, // 是否在加载中
      infiniteDisabled: false, // 是否禁用上拉加载
      triggered: true,
      loadMoreStatus: 'more', // 上拉加载的状态样式
    };
  },
  methods: {
    refreshing() {
      if (this.isRefreshing) return;
      this.isRefreshing = true
      this.triggered = true;
      this.isInfiniting = false; // 若下拉刷新和上拉加载同时存在，则每次刷新需要重置上拉加载状态
      this.$emit('onRefresh', { complete: this.refresherComplete});
    },
    refresherComplete() {
      this.triggered = false;
      this.isRefreshing = false;
      this.isInfiniting = true;
      this.infiniteDisabled = false;
    },
    infinite() {
      if(this.isInfiniting) {
        this.loadMoreStatus = this.infiniteDisabled  ? 'noMore' : 'loading';
        this.$emit('onInfinite', { setStatus: function(status, disabled) {
          this.loadMoreStatus = status;
          this.infiniteDisabled = disabled;
        }.bind(this)});
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.view-page-content {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
 