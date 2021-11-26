<template>
	<view class="container">
		<view class="titleImg">
			<image :src="imgUrl" mode="" class="img"></image>
		</view>
		<scroll-view scroll-y="true">
			<view>
				<uni-list v-for="item in content" :key='item.id'>
					<uni-list-item clickable @click='player(item.id)'>
						<!-- 自定义 header -->
						<template v-slot:header>
							<view class="icon">
								<image class="slot-image" :src="item.al.picUrl" mode="widthFix"></image>
							</view>
						</template>
						<!-- 自定义 body -->
						<template v-slot:body>
							<view class="content">
								<view class="one">{{item.name}}</view>
								<view class="one">{{item.ar[0].name}}</view>
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
		</scroll-view>
		<uni-load-more :status="'loading'"></uni-load-more>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import {
		requestGet,
		personal
	} from '../../utils/http.js'
	export default {
		data() {
			return {
				sid: '',
				content: '',
				imgUrl: '',
				tag: '',
				uid: '',
				limit: 15
			}
		},
		onLoad(options) {
			this.sid = options.id;
			this.tag = options.tag;
			this.getList();
		},
		computed: {
			...mapState(['id'])
		},
		methods: {
			...mapMutations(['change']),
			async getList() {
				var result = await requestGet(personal, {
					id: this.sid
				});
				// 获取到数据后清除轻提示
				this.content = result.playlist.tracks;
				this.imgUrl = result.playlist.coverImgUrl;
			},
			player(id) {
				this.change(id);
				uni.switchTab({
					url: '/pages/player/player'
				})
			}
		}
	}
</script>

<style lang="less">
	.container {
		.titleImg {
			width: 100%;
			height: 380rpx;

			.img {
				width: 100%;
				height: 100%;
			}
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
	}
</style>
