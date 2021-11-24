<template>
	<view class="contain">
		<view>
			<video :src="url" controls play-btn-position='center' autoplay :danmu-list="danmuList" enable-danmu danmu-btn></video>
		</view>
		<scroll-view scroll-y="true">
			<view>
				<view class="title">相似mv</view>
				<uni-list v-for="item in content" :key='item.id'>
					<uni-list-item @click="handle(item.id)" clickable>
						<!-- 自定义 header -->
						<template v-slot:header>
							<view class="icon">
								<image class="slot-image" :src="item.cover"></image>
							</view>
						</template>
						<!-- 自定义 body -->
						<template v-slot:body>
							<view class="content">
								<view class="one">{{item.name}}</view>
								<view class="one">{{item.artistName}}</view>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mv,
		requestGet,
		simimv,
		mvcomment,
	} from '../../utils/http.js'
	export default {
		data() {
			return {
				id: '',
				url: '',
				content: '',
				danmuList: []
			}
		},
		onLoad(options) {
			this.id = options.id;
			console.log(this.id, "88888888888")
			this.getMv();
		},
		onReady: function() {
			this.getComment();
		},
		methods: {
			// 获取mv评论
			async getComment() {
				var comment = await requestGet(mvcomment, {
					id: this.id
				});
				var array = [];
				var obj = {};
				var time = 1;
				comment.comments.forEach((item) => {
					obj.text = item.content;
					obj.color = '#ccc';
					obj.time = time;
					array.push(obj);
					obj = {};
					time += 2;
				});
				this.danmuList = array;
			},
			// 获取mv
			async getMv() {
				const result = await requestGet(mv, {
					id: this.id
				});
				const res = await requestGet(simimv, {
					mvid: this.id
				});
				this.url = result.data.url;
				this.content = res.mvs
			},
			handle(id) {
				this.id = id;
				this.getMv();
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
	}

	.contain {
		height: 100%;
		background-color: #000;

		video {
			width: 100%;
		}

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
	}
</style>
