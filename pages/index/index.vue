<template>
	<view class="container">
		<!-- 登录 -->
		<view class="login">
			<view>
				<view v-if="stauts" class="item1">
					<view class="img">
						<image :src="iconImg"></image>
					</view>
					<view class="icon">{{name}}</view>
				</view>
				<view v-else>
					<view class="left iconfont icon-denglu">
						<text class="icon">未登录</text>
					</view>
				</view>
			</view>
			<view class="right" v-if="stauts" @click="outlog">退出登录</view>
			<view class="right" v-else @click="golog">立即登录</view>
		</view>
		<!-- 搜索 -->
		<view class="search">
			<view class="iconfont icon-sousuo" @click="handle3"></view>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper">
			<swiper-item class="swiper-item" v-for="item in slider" :key='item.bannerId'>
				<image :src="item.pic" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 每日推荐 -->
		<view class="recommend">
			<view class="item" @click="click('new')">
				<view class="iconfont icon-yinle"></view>
				<text>每日推荐</text>
			</view>
			<view class="item" @click="click('radio')">
				<view class="iconfont icon-diantai"></view>
				<text>推荐电台</text>
			</view>
			<view class="item" @click="click('mv')">
				<view class="iconfont icon-MV"></view>
				<text>MV排行</text>
			</view>
			<view class="item" @click="click('songer')">
				<view class="iconfont icon-paixingbang"></view>
				<text>推荐歌单</text>
			</view>
		</view>
		<!-- 热门榜单推荐 -->
		<scroll-view scroll-y="true" class="scroll">
			<view class="hot">
				<view class="title">
					热门榜单
				</view>
				<view class="content">
					<view @click="gettop(item.id)" v-for="item in musiclist" :key="item.id" class="item"
						:style="{'background-image': 'url('+item.coverImgUrl+')'}">
						<text>{{item.updateFrequency}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="popup" type="message" class="message">
			<uni-popup-message type="info" message="请先登录" :duration="1000" class="message"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {
		requestGet,
		sliderUrl,
		sonList
	} from '../../utils/http.js'
	export default {
		data() {
			return {
				slider: [],
				value: null,
				musiclist: null,
				iconImg: null,
				stauts: null,
				name: null
			}
		},
		onLoad() {
			this.getStauts();
			this.getBanner();
			this.getSonList();
		},
		onShow() {
			this.getStauts();
		},
		methods: {
			handle3() {
				uni.navigateTo({
					url: '/pages/search/search',
				});
			},
			// banner部分
			async getBanner() {
				const result = await requestGet(sliderUrl);
				this.slider = result.banners
			},
			// 退出登录
			outlog() {
				uni.removeStorageSync("cookieKey");
				uni.removeStorageSync("img");
				uni.removeStorageSync("name");
				this.getStauts();
			},
			// 登录
			golog() {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			},
			// 获取登录转态
			getStauts() {
				this.stauts = uni.getStorageSync("img");
				this.iconImg = uni.getStorageSync("img");
				this.name = uni.getStorageSync("name");
			},
			// 获取榜单
			async getSonList() {
				const result = await requestGet(sonList);
				var array = result.list.slice(0, 6);
				array.splice(4, 1, result.list[6]);
				this.musiclist = array;
			},
			input() {
				console.log(123)
			},
			gettop(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}&tag=two`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			click(e) {
				var type = e;
				if (type == "new" || type == "songer") {
					if (uni.getStorageSync("img")) {
						uni.navigateTo({
							url: `/pages/list/list?type=${type}`,
						});
					} else {
						this.$refs.popup.open('top')
					}
				} else {
					uni.navigateTo({
						url: `/pages/list/list?type=${type}`,
					});
				}
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.message {
			text-align: center;
		}

		.login {
			background-color: #000;
			padding: 0 30rpx;
			padding-bottom: 10rpx;

			.item1 {
				.img {
					float: left;
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					overflow: hidden;
					vertical-align: middle;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.icon {
					float: left;
					color: aliceblue;
					vertical-align: middle;
					padding: 12rpx 20rpx;
				}
			}

			.left {
				float: left;
				color: #fff;

				.icon {
					margin-left: 10rpx;
					display: inline-block;
					top: 10rpx;
					vertical-align: middle;
				}
			}

			.right {
				float: right;
				padding: 8rpx 10rpx;
				text-align: center;
				border: solid 1px #ccc;
				border-radius: 25rpx;
				vertical-align: middle;
				color: aliceblue;
			}
		}

		.swiper {
			height: 300rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.search {
			color: #fff;
			width: 100%;
			padding-bottom: 15rpx;
			background-color: #000;
			display: flex;

			view {
				position: relative;
				justify-content: center;
				width: 680rpx;
				background-color: #fff;
				height: 76rpx;
				margin: auto;
				border-radius: 50rpx;
			}
		}

		.recommend {
			background-color: #222;
			display: flex;
			color: aliceblue;
			// height: 220rpx;

			.item {
				flex: 1;
				display: flex;
				flex-direction: column;
				height: 180rpx;
				text-align: center;
				font-size: 25rpx;

				view {
					width: 50%;
					height: 50%;
					line-height: 90rpx;
					background-color: rgb(41, 40, 40);
					border-radius: 50%;
					margin-left: 50rpx;
					margin-top: 20rpx;
				}

				text {
					margin-top: 15rpx;
					height: 40%;
				}
			}
		}


		.scroll {
			overflow: hidden;
			height: 500rpx;

			.hot {
				background-color: #000;
				color: aliceblue;

				.title {
					padding: 20rpx;
				}

				.content {
					display: flex;
					flex-wrap: wrap;
					// padding: 20rpx;
					padding-left: 33rpx;

					// padding-right: 15rpx;
					.item {
						position: relative;
						width: 30%;
						height: 220rpx;
						box-sizing: border-box;
						background-color: #000;
						border-radius: 10rpx;
						margin-right: 23rpx;
						margin-bottom: 20rpx;
						background-size: cover;

						text {
							position: absolute;
							font-size: 24rpx;
							bottom: 10rpx;
							left: 20rpx;
						}
					}
				}
			}
		}
	}

	@font-face {
		font-family: 'iconfont';
		/* Project id 2907777 */
		src: url('//at.alicdn.com/t/font_2907777_veaioljcr7s.woff2?t=1637829520655') format('woff2'),
			url('//at.alicdn.com/t/font_2907777_veaioljcr7s.woff?t=1637829520655') format('woff'),
			url('//at.alicdn.com/t/font_2907777_veaioljcr7s.ttf?t=1637829520655') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 18px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-sousuo:before {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 30rpx;
		content: "\e602";
		color: #000;
	}

	.icon-denglu:before {
		content: "\e67c";
		font-size: 60rpx;
		vertical-align: middle;
	}

	.icon-paixingbang:before {
		content: "\e6c5";
	}

	.icon-diantai:before {
		content: "\e621";
	}

	.icon-yinle:before {
		content: "\e624";
	}

	.icon-MV:before {
		content: "\e62c";
	}
</style>
