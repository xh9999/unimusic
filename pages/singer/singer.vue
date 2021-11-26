<template>
	<view class="sing">
		<image :src="picUrl"></image>
		<view class="sing-list" v-for="(item,index) in sings" :key="item.id" @click="gotoplay(item.id)">
			<text class="index">{{index}}</text>
			<text class="sing-text">{{item.name}}</text>
			<text class="singer-name">{{name}}</text>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		Singurl
	} from '@/utils/http.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				id: '',
				sings: [],
				picUrl: "",
				name: ''
			}
		},
		onLoad(options) {
			console.log(options);
			this.id = options.songerid;
			this.getSinger()
			uni.showLoading({
				title: "正在加载"
			})
			setTimeout(function() {
				uni.hideLoading();
			}, 2000);
		},
		onUnload() {},
		methods: {
			...mapMutations(['change', 'modifySongList', 'modifyState']),
			async getSinger() {
				let result = await requestGet(Singurl + this.id);
				this.sings = result.hotSongs;
				this.picUrl = result.artist.picUrl;
				this.name = result.artist.name;
			},
			gotoplay(songid) {
				//点击传输歌曲id
				this.change(songid);
				this.modifySongList(this.sings);
				this.modifyState('songer');
				uni.switchTab({
					url:'/pages/player/player'
				})
			}
		},
	}
</script>
<style lang="less">
	.sing {
		background-color: black;

		image {
			width: 100%;
		}

		.sing-list {
			width: 100%;
			height: 110rpx;
			position: relative;

			.index {
				color: white;
				position: absolute;
				top: 50rpx;
				left: 30rpx;
				font-size: 25rpx;
			}

			.sing-text {
				position: absolute;
				top: 35rpx;
				left: 90rpx;
				font-size: 30rpx;
				color: white;
			}

			.singer-name {
				color: white;
				position: absolute;
				top: 70rpx;
				left: 90rpx;
				font-size: 20rpx;
				color: white;
			}
		}
	}
</style>
