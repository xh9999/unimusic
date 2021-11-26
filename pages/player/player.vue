<template>
	<view class="player">
		<view class="normal-player">
			<view class="background">
				<image :src="songPic" style="width: 100%;"></image>
			</view>
			<view class="top">
				<view class="title">{{songs.name}}</view>
				<view class="subtitle">{{songArtist.name}}</view>
			</view>
			<swiper class="middle" style="height: 300px;" @change="changeDot">
				<swiper-item class="middle-l" style="overflow:visible">
					<view class="cd-wrapper">
						<view class="cd" :class="[isPlay ? 'play':'']">
							<image :src="songPic" class="image" :class="[isPlay ? 'play':'']"></image>
						</view>
					</view>
				</swiper-item>
				<swiper-item class="middle-r">
					<scroll-view class="lyric-wrapper" scroll-y scroll-into-view="" scroll-with-animation
						:scroll-top="marginTop">
						<view v-if="showLyric">
							<view class="text" v-for="(item,index) in showLyric" :key="item.time"
								:class="[lyricIndex === index?'current':'']">
								{{item.text}}
							</view>
						</view>
						<view v-else="!showLyric">
							<view class="text current">暂无歌词</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			<view class="dots-wrapper">
				<view class="dots" :class="[currentDot == index ? 'current':'']" v-for="(item,index) in dotsArray"
					:key="item"></view>
			</view>
			<view class="bottom">
				<view class="progress-wrapper">
					<text class="time time-l">{{currentTime}}</text>
					<view class="progress-bar-wrapper">
						<slider :value="precent" @change="sliderChange" block-size="12" selected-color="#1989fa" />
					</view>
					<text class="time time-r">{{duration}}</text>
				</view>
				<view class="operators">
					<view class="icon i-left">
						<image :src="getImgUrl(playMod)" @tap="changeMod"></image>
					</view>
					<view class="icon i-left">
						<image class="icon-pre" src="@/static/icon/previous.png" @tap="prev"></image>
					</view>
					<view class="icon i-center">
						<image src="@/static/icon/stop.png" @tap="togglePlaying" :hidden="!isPlay"></image>
						<image src="@/static/icon/start.png" @tap="togglePlaying" :hidden="isPlay"></image>
					</view>
					<view class="icon i-right">
						<image class="icon-next" src="@/static/icon/next.png" @tap="next"></image>
					</view>
					<view class="icon i-right" @tap="openList">
						<image src="@/static/icon/list.png" class="icon-playlist"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="content-wrapper" :class="translateCls">
			<view class="close-list" @tap="closeList"></view>
			<view class="play-content">
				<view class="plyer-list-title">播放队列</view>
				<scroll-view class="playlist-wrapper" scroll-y>
					<view v-if="songlist">
						<view class="item" @tap="playthis" v-for="(item,index) in songlist" :key="item.id"
							:data-id="item.id" :data-index="index">
							<view class="name">{{item.name}}</view>
							<view class="play_list__line">-</view>
							<view class="singer">{{item.ar[0].name}}</view>
						</view>
					</view>
					<!--<view v-else-if="everyday">
						<view class="item" @tap="playthis" v-for="item in everyday" :key="item.id"
							:data-id="item.id" :data-index="index">
							<view class="name">{{item.name}}</view>
							<view class="play_list__line">-</view>
							<view class="singer">{{item.artists[0].name}}</view>
						</view>
					</view>
					推荐电台
					<view v-else-if="radio">
						<view class="item" @tap="playthis" v-for="item in radio" :key="item.id"
							:data-id="item.mainSong.id" :data-index="index">
							<view class="name">{{item.name}}</view>
							<view class="play_list__line">-</view>
							<view class="singer">{{item.reason}}</view>
						</view>
					</view>
					歌手音乐
					<view v-else-if="searchSong">
						<view class="item" @tap="playthis" v-for="item in searchSong" :key="item.id"
							:data-id="item.id" :data-index="index">
							<view class="name">{{item.name}}</view>
							<view class="play_list__line">-</view>
							<view class="singer">{{item.ar[0].name}}</view>
						</view>
					</view>
					搜索
					<view v-else-if="searchmusics">
						<view class="item" @tap="playthis"v-for="item in searchmusics" :key="item.id"
							:data-id="item.id" :data-index="index">
							<view class="name">{{item.name}}</view>
							<view class="play_list__line">-</view>
							<view class="singer">{{item.author.name}}</view>
						</view>
					</view>
					我喜欢
					<view v-else="likeList">
						<view class="item" @tap="playthis" v-for="item in likeList" :key="item.id"
							:data-id="item.id" :data-index="index">
							<view class="name">{{item.names}}</view>
							<view class="play_list__line">-</view>
							<view class="singer">{{item.arname}}</view>
						</view>
					</view>-->
				</scroll-view>
				<view class="close-playlist" @tap="closeList">关闭</view>
			</view>
		</view>
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
		SongDataURL,
		SongURL,
		LyricURL,
		SongListURL,
		artistURL
	} from '@/utils/http.js'
	import {
		_pad,
		_formatTime,
		formatLyric,
		sortRule,
		showToast
	} from '@/utils/format.js'

	export default {
		data() {
			return {
				songs: [],
				isPlay: false,
				currentDot: 0,
				dotsArray: new Array(2),
				playMod: 1,
				translateCls: '',
				url: '',
				duration: '00:00',
				currentTime: '00:00',
				precent: 0,
				showLyric: [],
				marginTop: 0,
				lyricIndex: 0,
				timer: null,
				songlist: [],
				idx: 0,
				songPic: '',
				songArtist: '',
				bgAudioManager: null
			}
		},
		onLoad() {
			console.log(this.id)
			if (this.id) {
				this._init()
				this.getSongList()
			}
			this.getArtist()
		},
		computed: {
			...mapState(['id']),
		},
		methods: {
			// 初始化
			_init(id) {
				this.getSongData(id)
				this.getSongURL(id)
				this.getLyricURL(id)
			},
			// 播放顺序图片的获取
			getImgUrl(playMod) {
				if (playMod == 1) {
					return '../../static/icon/sequence.png'
				} else if (playMod == 2) {
					return '../../static/icon/random.png'
				} else if (playMod == 3) {
					return '../../static/icon/singlecycle.png'
				}
			},
			// 获取歌曲信息
			async getSongData(id) {
				const result = await requestGet(SongDataURL, {
					ids: this.id
				})
				console.log(result,'==============')
				this.songs = result.songs[0];
				this.songPic = this.songs.al.picUrl
				this.songArtist = this.songs.ar[0]
			},
			// 获取歌曲的URL地址
			async getSongURL(id) {
				const result = await requestGet(SongURL, {
					id: this.id
				})
				this.url = result.data[0]
				this.createBgAudio(result.data[0])
			},
			// 获取歌词
			async getLyricURL(id) {
				const result = await requestGet(LyricURL, {
					id: this.id
				})
				this.showLyric = formatLyric(result.lrc.lyric)
			},
			// 获取歌单
			async getSongList(id) {
				const result = await requestGet(SongListURL, {
					id: this.id
				});
				this.songlist = result.playlist.tracks;
			},
			// 根据歌手获取歌手的50部歌曲
			async getArtist() {
				const result = await requestGet(artistURL)
				this.songlist = result.songs
			},
			// 创建播放器



			createBgAudio(res) {
				if (res.url) {
					//#ifdef MP-WEIXIN 
					this.bgAudioManager = uni.getBackgroundAudioManager(); //获取全局唯一的背景音频管理器。并把它给实例bgAudioManage
					this.bgAudioManager.title = 'title';
					this.bgAudioManager.src = res.url;
					this.bgAudioManager.onPlay(() => {
						this.isPlay = true;
						this.lyricScroll();
						console.log('开始播放了')
					});
					this.bgAudioManager.onEnded(() => {
						this.next();
						console.log('播放结束了');
					});
					this.bgAudioManager.onPause(() => {
						clearInterval(this.timer);
						console.log('播放暂停了');
					});
					this.bgAudioManager.onTimeUpdate(() => {
						const currentTime = this.bgAudioManager.currentTime;
						const duration = this.bgAudioManager.duration;
						const precent = (currentTime / duration) * 100;
						this.duration = _formatTime(duration);
						this.currentTime = _formatTime(currentTime);
						this.precent = precent;
					})
					//#endif
					//#ifdef H5
					this.bgAudioManager = uni.createInnerAudioContext(); //获取全局唯一的背景音频管理器。并把它给实例bgAudioManage
					this.bgAudioManager.src = res.url;
					this.bgAudioManager.play()
					this.bgAudioManager.onPlay(() => {
						this.isPlay = true;
						this.lyricScroll();
						console.log('开始播放了')
					});
					this.bgAudioManager.onEnded(() => {
						this.next();
						console.log('播放结束了');
					});
					this.bgAudioManager.onPause(() => {
						clearInterval(this.timer);
						console.log('播放暂停了');
					});
					this.bgAudioManager.onTimeUpdate(() => {
						const currentTime = this.bgAudioManager.currentTime;
						const duration = this.bgAudioManager.duration;
						const precent = (currentTime / duration) * 100;
						this.duration = _formatTime(duration);
						this.currentTime = _formatTime(currentTime);
						this.precent = precent;
					})
					//#endif
				} else {
					showToast('该歌曲需付费 ')
				}
			},
			// 歌词滚动
			lyricScroll() {
				clearInterval(this.timer)
				this.timer = setInterval(() => {
					for (var i = 0; i < this.showLyric.length; i++) {
						if (this.bgAudioManager.currentTime >= this.showLyric[this.showLyric.length - 1].time) {
							this.lyricIndex = this.showLyric.length - 1;
							break;
						}
						if (this.bgAudioManager.currentTime >= this.showLyric[i].time - 1 && this.bgAudioManager
							.currentTime <= this.showLyric[i + 1].time - 1) {
							this.lyricIndex = i;
							this.marginTop = (this.lyricIndex - 1) * 32
						}
					}
				}, 500)
			},
			// 暂停和播放
			togglePlaying() {
				if (this.id) {
					if (this.isPlay) {
						this.bgAudioManager.pause()
					} else {
						this.bgAudioManager.play()
					}
					this.isPlay = !this.isPlay
				} else {
					showToast('暂无歌曲 ')
				}

			},
			// 小圆点
			changeDot(e) {
				this.currentDot = e.detail.current
			},
			// 进度条拖动
			sliderChange(e) {
				const value = e.detail.value / 100 * this.bgAudioManager.duration
				this.bgAudioManager.seek(Math.ceil(value));
				this.bgAudioManager.play()
			},
			// 切换播放顺序
			changeMod() {
				let playMod = this.playMod + 1
				if (playMod > 3) {
					playMod = 1
				}
				this.playMod = playMod
			},
			// 打开播放列表
			openList() {
				this.translateCls = 'uptranslate'
			},
			// 关闭播放列表
			closeList() {
				this.translateCls = 'downtranslate'
			},
			// 播放当前歌曲
			playthis(e) {
				this.id = e.currentTarget.dataset.id;
				this.idx = e.currentTarget.dataset.index;
				this._init(this.id);
				this.bgAudioManager.destroy();
				this.isPlay = false;
				this.translateCls = 'downtranslate';
			},
			// 播放下一首
			next() {
				if (this.id) {
					this.idx += 1;
					// 顺序播放
					if (this.playMod === 1) {
						// 如果是最后一首则从第一首开始播放
						if (this.idx === this.songlist.length) {
							this.idx = 0;
							this.playSong()
						} else {
							this.playSong()
						}
					} else if (this.playMod === 2) {
						this.idx = Math.ceil(Math.random() * this.songlist.length)
						this.playSong()
					} else {
						this.idx = this.idx - 1
						this.playSong()
					}
				} else {
					showToast('暂无歌曲 ')
				}

			},
			// 播放上一首
			prev() {
				if (this.id) {
					this.idx -= 1;
					// 顺序播放
					if (this.playMod === 1) {
						// 如果是最后一首则从第一首开始播放
						if (this.idx === -1) {
							this.idx = this.songlist.length - 1;
							this.playSong()
						} else {
							this.playSong()
						}
					} else if (this.playMod === 2) {
						this.idx = Math.ceil(Math.random() * this.songlist.length)
						this.playSong()
					} else {
						this.idx = this.idx + 1
						this.playSong()
					}
				} else {
					showToast('暂无歌曲 ')
				}
			},
			playSong() {
				this.id = this.songlist[this.idx].id;
				this._init(this.id)
				this.bgAudioManager.stop();
				this.isPlay = false
			}
		}
	}
</script>

<style lang="less" >
	.player {
		.normal-player {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 150;
			background: #333;

			.background {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
				opacity: 0.6;
				filter: blur(40rpx);
			}

			.top {
				margin-bottom: 50rpx;
				/*  #ifdef  H5 */
				margin-top: 120rpx;
				/*  #endif  */

				.title {
					width: 70%;
					margin: 0 auto;
					line-height: 80rpx;
					text-align: center;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					font-size: 36rpx;
					color: #fff;
				}

				.subtitle {
					line-height: 40rpx;
					text-align: center;
					font-size: 28rpx;
					color: #fff;
				}
			}

			.middle {
				position: fixed;
				width: 100%;
				top: 160rpx;
				bottom: 300rpx;
				/*  #ifdef  H5 */
				margin-top: 140rpx;
				/*  #endif  */
				white-space: nowrap;
				font-size: 0;

				.middle-l {
					display: inline-block;
					vertical-align: top;
					position: relative;
					width: 100%;
					height: 0 !important;
					padding-top: 80% !important;

					.cd-wrapper {
						position: absolute;
						left: 15%;
						top: 0;
						width: 70%;
						height: 90%;

						.cd {
							width: 99%;
							height: 97%;
							border: 10rpx solid rgba(255, 255, 255, 0.1);
							border-radius: 50%;
							animation: rotate 15s linear infinite;
							animation-play-state: paused;

							&.play {
								animation: rotate 15s linear infinite;
								animation-fill-mode: forwards;
							}


							.image {
								position: absolute;
								left: 5rpx;
								top: 7rpx;
								width: 98%;
								height: 97%;
								border-radius: 50%;
								animation: rotate 15s linear infinite;
								animation-play-state: paused;

								&.play {
									animation: rotate 15s linear infinite;
									animation-fill-mode: forwards;
								}
							}
						}
					}

				}

				.middle-r {
					display: inline-block;
					vertical-align: top;
					width: 100%;
					height: 100%;
					overflow: hidden;

					.lyric-wrapper {
						width: 80%;
						margin: 0 auto;
						overflow: hidden;
						text-align: center;
						height: 100%;

						.text {
							line-height: 32px;
							// color      : rgba(255, 255, 255, 0.5);
							font-size: 14px;

							&.current {
								color: pink;
							}
						}
					}
				}
			}

			.dots-wrapper {
				position: absolute;
				bottom: 210rpx;
				/*  #ifdef  H5 */
				bottom: 340rpx;
				/*  #endif  */
				height: 20rpx;
				line-height: 20rpx;
				text-align: center;
				width: 100%;

				.dots {
					width: 20rpx;
					height: 20rpx;
					border-radius: 10rpx;
					background: rgba(255, 255, 255, 0.5);
					display: inline-block;
					margin: 10rpx;
					margin-top: 0;
				}

				.current {
					width: 40rpx;
					background: rgba(255, 255, 255, .8);
				}
			}

			.bottom {
				position: absolute;
				bottom: 50rpx;
				/*  #ifdef  H5 */
				bottom: 140rpx;
				/*  #endif  */
				width: 100%;

				.progress-wrapper {
					display: -webkit-box;
					display: -ms-flexbox;
					display: flex;
					align-items: center;
					width: 80%;
					margin: 0rpx auto;
					padding: 20rpx 0;

					.time {
						color: #fff;
						font-size: 24rpx;
						-webkit-box-flex: 0;
						-ms-flex: 0 0 60rpx;
						flex: 0 0 60rpx;
						line-height: 60rpx;
						width: 60rpx;

						&.time-l {
							text-align: left;
						}

						&.time-r {
							text-align: right;
						}
					}

					.progress-bar-wrapper {
						flex: 1;
					}
				}

				.operators {
					display: -webkit-box;
					display: -ms-flexbox;
					display: flex;
					align-items: center;

					.icon {
						flex: 1;
						color: #d632ff;

						&.i-left {
							text-align: right;
						}

						&.i-center {
							padding: 0 40rpx;
							text-align: center;
						}

						&.i-right {
							text-align: left;
						}

						image {
							width: 60rpx;
							height: 60rpx;
						}
					}
				}
			}
		}

		.content-wrapper {
			position: fixed;
			top: 100%;
			height: 100%;
			width: 100%;
			z-index: 150;
			transition: all 0.5s;

			&.uptranslate {
				transform: translateY(-100%) !important;
			}

			&.downtranslate {
				transform: translateY(100%) !important;
			}

			.close-list {
				position: absolute;
				top: 0;
				height: 100%;
				width: 100%;
			}

			.play-content {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 860rpx;
				width: 100%;
				background: rgba(0, 0, 0, .9);
				z-index: 200;
				transition: all 0.5s;

				.plyer-list-title {
					height: 100rpx;
					width: 100%;
					text-align: center;
					line-height: 100rpx;
					border-bottom: 1px solid rgba(255, 255, 255, .3);
					font-size: 16px;
					color: #fff;
				}

				.playlist-wrapper {
					height: 660rpx;
					width: 100%;
					padding: 15rpx 30rpx;
					box-sizing: border-box;

					.item {
						display: flex;
						position: relative;
						height: 90rpx;
						line-height: 90rpx;
						margin-left: 30rpx;
						padding-right: 30rpx;
						border-bottom: 1rpx dashed rgba(255, 255, 255, .3);

						.name {
							max-width: 350rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							font-size: 14px;
							color: #fff;
						}

						.play_list__line {
							display: block;
							margin: 0 5px;
							color: #fff;
						}

						.singer {
							max-width: 200rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							font-size: 12px;
							color: #fff;

						}
					}

					.item1 {
						color: #fff;
						text-align: center;
						line-height: 100rpx;
					}
				}

				.close-playlist {
					height: 100rpx;
					width: 100%;
					text-align: center;
					line-height: 100rpx;
					border-top: 1px solid rgba(255, 255, 255, .3);
					font-size: 16px;
					color: #fff;
				}
			}
		}
	}

	@keyframes rotate {
		0% {
			transform: rotate(0)
		}

		100% {
			transform: rotate(360deg)
		}
	}
</style>
