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
			<uni-collapse-item :show-animation="true" title="开启动画">
				<view @click="click" class="one" v-for="item in likeSongs" :key='item.id'>{{item.names}}</view>
			</uni-collapse-item>
			<uni-collapse-item :show-animation="true" title="开启动画">
				<text>折叠内容</text>
			</uni-collapse-item>
			<uni-collapse-item :show-animation="false" title="不开启动画">
				<text>折叠内容</text>
			</uni-collapse-item>
		</uni-collapse>
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
				useId: ''
			}
		},
		computed:{
			...mapState(['likeSongs'])
		},
		onLoad() {
			console.log(this.likeSongs[1],'============')
		},
		onShow() {
			if (uni.getStorageSync("img")) {
				this.backgroundImg = uni.getStorageSync("img");
				this.name = uni.getStorageSync("name");
				this.useId = uni.getStorageSync("useId");
			} else {
				this.backgroundImg = null;
				this.name = null;
				this.content = null;
			}
		},
		methods: {
			click() {
				console.log(123)
			}
		}
	}
</script>

<style lang="less">
	.self {
		.one {
			height: 100rpx;
			background-color: #000;
			color: #fff;
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
