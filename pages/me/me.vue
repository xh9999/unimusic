<template>
	<view class="self">
		<view class="title">
			<view class="icon">
				<view class="img">
					<image :src="backgroundImg" v-if="backgroundImg"></image>
					<view v-else class="login iconfont icon-denglu"></view>
				</view>
				<view class="cot" v-if="backgroundImg">{{name}}</view>
				<view class="cot" v-else>未登录</view>
			</view>
		</view>
		<uni-collapse>
			<view @click="handle">
				<uni-collapse-item :show-animation="true" title="我喜欢" :disabled="flag" @click='handle'>
					<view @click="click(item.id)" v-for="item in Songs" :key='item.id' class="lists">
						<view class="imgs">
							<image :src="item.img" mode=""></image>
						</view>
						<view class="content">
							<view class="name">{{item.names}}</view>
							<view class="arname">{{item.arname}}</view>
						</view>
					</view>
				</uni-collapse-item>
			</view>
			<uni-collapse-item :show-animation="true" title="开启动画">
				<text>折叠内容</text>
			</uni-collapse-item>
			<uni-collapse-item :show-animation="false" title="不开启动画">
				<text>折叠内容</text>
			</uni-collapse-item>
		</uni-collapse>
		<uni-popup ref="popup" type="message" class="message">
			<uni-popup-message type="info" message="请先登录" :duration="1000" class="message"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {
		requestGet,
		likeList,
		musicDetail
	} from '../../utils/http.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				activeNames: [],
				content: [],
				backgroundImg: null,
				name: '',
				useId: '',
				Songs: '',
				flag: true
			}
		},
		computed: {
			...mapState(['likeSongs'])
		},
		onLoad() {
			if (this.likeSongs.length != 0) {
				uni.setStorageSync('LlikeSongs', this.likeSongs);
				this.Songs = this.likeSongs
			} else {
				this.Songs = uni.getStorageSync('LlikeSongs')
			}
		},
		onShow() {
			if (uni.getStorageSync("img")) {
				this.backgroundImg = uni.getStorageSync("img");
				this.name = uni.getStorageSync("name");
				this.useId = uni.getStorageSync("useId");
				this.flag = false
			} else {
				this.backgroundImg = null;
				this.name = null;
				this.content = null;
				this.flag = true
			}
		},
		methods: {
			...mapMutations(['change']),
			click(id) {
				this.change(id);
				uni.switchTab({
					url: `/pages/player/player`,
				})
			},
			handle() {
				if (!uni.getStorageSync("img")) {
					this.$refs.popup.open('top')
				}
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #000;
	}

	.self {
		.message {
			text-align: center;
		}

		/* #ifdef MP-WEIXIN */
		.uni-collapse-item__title-box.data-v-41027c34 {
			background-color: #000;
			color: #fff;
		}

		.uni-collapse-item__title-box.data-v-41027c34 {
			padding: 70rpx 30rpx;
		}

		.uni-collapse-item__title.data-v-41027c34 {
			background-color: #000;
		}

		/* #endif */
		/* #ifdef H5 */
		/deep/.uni-collapse-item__title-box[data-v-41027c34] {
			background-color: #000;
			color: #fff;
		}

		/deep/.uni-collapse-item__title-box[data-v-41027c34] {
			padding: 70rpx 30rpx;
		}

		/deep/.uni-collapse-item__title[data-v-41027c34] {
			background-color: #000;
		}

		/* #endif */
		.lists {
			display: flex;
			padding: 20rpx;
			background-color: #000;
			color: #fff;
			border-bottom: solid #C0C0C0 2rpx;
			border-top: solid 1rpx #C0C0C0;

			.imgs {
				width: 120rpx;
				height: 120rpx;
				margin-right: 15rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.content {
				font-size: 30rpx;

				.name {
					padding: 10rpx 0;
				}

				.arname {
					padding: 10rpx 0;
				}
			}
		}
	}

	.title {
		position: relative;
		width: 100%;
		height: 400rpx;
		background-color: rgb(32, 32, 32);

		.icon {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 300rpx;
			height: 168rpx;

			.img {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				overflow: hidden;

				.login {
					position: relative;
					width: 100%;
					height: 100%;
				}

				image {
					width: 100%;
					height: 100%;
				}
			}

			.cot {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 300rpx;
				text-align: center;
				color: #fff;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	@font-face {
		font-family: 'iconfont';
		/* Project id 2907777 */
		src: url('//at.alicdn.com/t/font_2907777_bjs2ns47sy.woff2?t=1636157461096') format('woff2'),
			url('//at.alicdn.com/t/font_2907777_bjs2ns47sy.woff?t=1636157461096') format('woff'),
			url('//at.alicdn.com/t/font_2907777_bjs2ns47sy.ttf?t=1636157461096') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-woxihuande_on:before {
		content: "\e670";
	}

	.icon-denglu:before {
		position: absolute;
		content: "\e67c";
		color: aliceblue;
		top: 60%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 87rpx;
	}
</style>
