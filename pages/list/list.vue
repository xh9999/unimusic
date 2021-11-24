<template>
	<view class="container">
		<view v-if="type=='new'">
			<view class="title">每日推荐</view>
			<uni-list v-for="item in content" :key='item.id'>
				<uni-list-item clickable @click='player(item.id)'>
					<!-- 自定义 header -->
					<template v-slot:header>
						<view class="icon">
							<image class="slot-image" :src="item.album.blurPicUrl" mode="widthFix"></image>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view class="content">
							<view class="one">{{item.name}}</view>
							<view class="one">{{item.artists[0].name}}</view>
						</view>
					</template>
					<!-- 自定义 footer-->
					<template v-slot:footer>
						<view v-if="item.mvid!=0" class="bofa iconfont icon-mvbofang" @click="clickmv(item.mvid)">
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view v-else-if="type=='radio'">
			<view class="title">推荐电台</view>
			<uni-list v-for="item in content" :key='item.id' @click='player(item.mainSong.id)'>
				<uni-list-item clickable @click='player(item.mainSong.id)'>
					<!-- 自定义 header -->
					<template v-slot:header>
						<view class="icon">
							<image class="slot-image" :src="item.coverUrl"></image>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view class="content">
							<view class="one">{{item.name}}</view>
							<view class="one">{{item.reason}}</view>
						</view>
					</template>
					<!-- 自定义 footer-->
					<template v-slot:footer>
						<view v-if="item.mvid!=0" class="bofa iconfont icon-mvbofang" @click="clickmv(item.mvid)">
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view v-else-if="type=='mv'">
			<view class="title">热门mv</view>
			<view v-for="item in content" :key="item.id" class="mv" @click="click(item.id)">
				<view class="img">
					<image :src="item.cover" lazy-load="false"></image>
				</view>
				<view class="mv-cot">
					<view>{{item.name}}</view>
					<view>{{item.artistName}}</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="title">推荐歌单</view>
			<uni-list v-for="item in content" :key='item.id'>
				<uni-list-item @click='handle(item.id)' clickable>
					<!-- 自定义 header -->
					<template v-slot:header>
						<view class="icon">
							<image class="slot-image" :src="item.picUrl"></image>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view class="content">
							<view class="one">{{item.name}}</view>
							<view class="one">{{item.copywriter}}</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		hotUrl,
		newSong,
		mvUrl,
		radioUrl,
		H5newSong
	} from '../../utils/http.js'
	export default {
		data() {
			return {
				type: '',
				content: null,
				limit: 15
			}
		},
		onLoad(options) {
			this.type = options.type;
			this.getRecommend();
		},
		onReachBottom() {
			this.limit += 10;
			this.getRecommend();
		},
		methods: {
			player(){
				console.log(123)
			},
			// 每日推荐对应的内容
			async getRecommend() {
				// 每日推荐
				if (this.type == 'new') {
					// #ifdef MP-WEIXIN
					const result = await requestGet(newSong);
					// #endif
					// #ifdef H5
					const result = await requestGet(H5newSong);
					// #endif
					// 获取到数据后清除轻提示
					this.content = result.recommend;
					// 推荐电台
				} else if (this.type == 'radio') {
					var url = radioUrl;
					const result = await requestGet(url, {
						limit: this.limit
					});
					this.content = result.programs;
					console.log(this.content)
					// 推荐mv
				} else if (this.type == 'mv') {
					var url = mvUrl;
					const result = await requestGet(url, {
						limit: this.limit
					});
					// 获取到数据后清除轻提示
					this.content = result.data;
					// 推荐歌单
				} else {
					var url = hotUrl;
					const result = await requestGet(url, {
						limit: this.limit
					});
					// 获取到数据后清除轻提示
					this.content = result.recommend
				}
			},
			// 获取mv的地址
			click(id) {
				// uni.navigateTo({
				// 	url: `/pages/mvplayer/mvplayer?id=${id}`,
				// });
				uni.navigateTo({
					url: `/pages/mvplayer/mvplayer?id=${id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}

	}
</script>

<style lang="less">
	.container {
		.title {
			background-color: #222;
			text-align: center;
			color: #fff;
			padding: 20rpx 0;
		}

		.uni-list-item {
			background-color: #000;
			color: #fff;
			font-size: 30rpx;
		}

		.icon {
			width: 110rpx;
			height: 110rpx;
			margin-right: 40rpx;

			image {
				width: 110rpx;
				height: 110rpx;
			}
		}

		.content {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			.one {
				margin-top: 10rpx;
			}
		}

		.mv {
			background-color: #000;
			color: aliceblue;
			font-size: 30rpx;

			.img {
				border-radius: 20rpx;

				image {
					border: solid 1px #888;
					border-radius: 30rpx;
					width: 100%;
				}
			}

			.mv-cot {
				padding: 0 30rpx;
				height: 100rpx;

				view {
					padding-top: 10rpx;

					&:first-child {
						width: 100%;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					&:last-child {
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
