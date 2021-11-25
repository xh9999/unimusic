<template>
	<view>
		<button type="default" @click="stop">暂停</button>
		<button type="default" @click="play">播放</button>
	</view>
</template>

<script>
	import {
		requestGet,
		musicUrl,
		musicDetail
	} from '../../utils/http.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				url: '',
				musicImg: ''
			}
		},
		created() {
			this.getUrl().then(() => {
				innerAudioContext.src = this.url,
					innerAudioContext.autoplay = true;
			})
		},
		onShow() {
			this.getUrl();
			this.getDetail();
		},
		watch: {
			id: function() {
				this.getUrl().then(() => {
					innerAudioContext.src = this.url,
						innerAudioContext.autoplay = true;
				})
			}
		},
		computed: {
			...mapState(['id']),
			...mapGetters(['watcher'])
		},
		methods: {
			stop() {
				innerAudioContext.pause();
			},
			play() {
				innerAudioContext.play()
			},
			async getUrl() {
				const result = await requestGet(musicUrl, {
					id: this.id
				});
				this.url = result.data[0].url;
			},
			// 获取音乐的详情
			async getDetail() {
				const result = await requestGet(musicDetail, {
					ids: this.id
				});
				this.musicImg = result.songs[0].al.picUrl
			},
		}
	}
</script>

<style>

</style>
