<template>
	<view class="search">
		<uni-search-bar @confirm="search" @cancel="cancel" :focus="true"></uni-search-bar>
		<view class="search-list">
			<view class="item" v-for="(item,index) in musics" :key="item.id" @click="getSongsId(item)">
				<view class="left">
					<view class="text">
						<text>{{index+1}}</text>
					</view>
					<view class="songs-detail">
						<text>歌名:{{item.name}}</text>
						<text>歌手:{{item.author.name}}</text>
					</view>
				</view>
				<view class="right">
					<view class="mv">
						<image v-if="item.mvid" class="mvplay" src="@/static/icon/mv.png" @click.stop="getMvId(item)" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		searchUrl,
	} from '../../utils/http.js'
	import {
		handleStr,
		arrQc
	} from '../../utils/search.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				keyword: null,
				musics: [],
				offset: 0,
				songsId: "",
				mvId: ""
			}
		},
		methods: {
			...mapMutations(['change']),
			async search(e) {
				this.musics = [];
				this.offset = 0;
				this.keyword = e.value;
				console.log(this.keyword);
				const songslist = await requestGet(searchUrl, {
					keywords: this.keyword,
					limit: 30,
					offset: this.offset * 20
				});
				var songs = songslist.result.songs;
				songs.forEach((item, index) => {
					var {
						name,
						id,
						artists,
						duration,
						mvid,
					} = item;
					this.musics.push({
						name: handleStr(name),
						id,
						mvid,
						author: handleStr(artists[0]),
						duration,
					});
				});
			},
			cancel() {
				this.musics = [];
				this.offset = 0
			},
			getMvId(item) {
				let mvId = item.mvid;
				console.log(this.mvId)
				uni.navigateTo({
					url: `/pages/mvplayer/mvplayer?id=${mvId}`
				})
			},
			getSongsId(item) {
				let songsId = item.id;
				this.change(songsId);
				uni.switchTab({
					url: '/pages/player/player'
				})
			},
		},
		async onReachBottom() {
			this.offset++;
			const songslist = await requestGet(searchUrl, {
				keywords: this.keyword,
				limit: 20,
				offset: this.offset * 20
			});
			var songs = songslist.result.songs;
			songs.forEach((item, index) => {
				var {
					name,
					id,
					artists,
					duration,
					mvid,
				} = item;
				this.musics.push({
					name: handleStr(name),
					id,
					mvid,
					author: handleStr(artists[0]),
					duration,
				});
			});
			this.musics = arrQc(this.musics, "id")
		}
	}
</script>

<style lang="less">
	.search-list {
		background-color: black;
		color: white;
		display: flex;
		flex-direction: column;

		.item {
			margin-top: 20rpx;
			background-color: #000;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border: 1px solid #ccc;
			border-radius: 8px;
			color: #fff;

			.bg {
				width: 150rpx;
				height: 150rpx;
			}
		}

		.songs-detail {
			display: flex;
			flex-direction: column;
			padding-left: 10rpx;
		}

		.play {
			width: 60rpx;
			height: 60rpx;
		}

		.left {
			display: flex;
			align-items: center;

			.text {
				width: 50rpx;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				color: white;
			}
		}

		.right {
			display: flex;
			align-items: center;

			text {
				font-size: 12px;
				color: grey;
			}

			.mv {
				display: flex;
				align-items: center;
				margin-right: 20rpx;

				.mvplay {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>
