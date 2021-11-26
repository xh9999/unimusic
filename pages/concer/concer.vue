<template>
	<view class="item">
		<!-- <uni-grid :column="5">
			    <uni-grid-item  v-for="item in tabs" :key="item.id">
			        <text class="text">{{item.name}}</text>
			    </uni-grid-item>
			</uni-grid> -->
		<view class="item-list" v-for="(item,index) in songer" :key="item.name" @tap="IsSongerId(item.id,index)">
			
			<image class="item-img" :src="item.picUrl"></image>
			<text class="item-text">{{item.name}}</text>
		</view>

	</view>
</template>
<script>
	import {
		requestGet,
		Songerurl
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				songer: [],
				pic:'',
				song:''
			}
		},
		onLoad() {
			this.getSonger()
			uni.showLoading({
				title: "正在加载"
			})
			setTimeout(function() {
				uni.hideLoading();
			}, 2000);
		},
		methods: {
			async getSonger() {
				let result = await requestGet(Songerurl);
				this.songer = result.artists;
				console.log(this.songer[0].picUrl)
			},
			IsSongerId(songerid,index) {
				this.pic = this.songer[index].picUrl;
				this.song=songerid; 
				uni.navigateTo({
					// url: '/pages/singer/singer?songerid=' + songerid,
					url:`/pages/singer/singer?songerid=${this.song}`
				});
				uni.$emit('update',{msg:this.pic})
			},
		},
	}
</script>

<style lang="less">
	.item {
		background-color: black;

		.item-list {
			width: 100%;
			height: 110rpx;
			position: relative;
			// border-bottom: solid 1px white;
			.item-text {
				position: absolute;
				top: 35rpx;
				left: 90rpx;
				font-size: 30rpx;
				color: white;
			}

			.item-img {
				width: 70rpx;
				height: 70rpx;
				position: absolute;
				top: 20rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
