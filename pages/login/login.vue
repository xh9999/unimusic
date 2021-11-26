<template>
	<view class="container">
		<uni-forms :modelValue="formData" class="center">
			<uni-forms-item label="手机号码" name="phone" class="one">
				<uni-easyinput type="number" v-model="formData.phone" placeholder="请输入手机号" />
			</uni-forms-item>
			<uni-forms-item label="密码" name="password" class="two">
				<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
			</uni-forms-item>
			<button @click="submitForm" type="primary">登录</button>
		</uni-forms>
		<view class="mask"></view>
		<uni-popup ref="popups" type="message">
			<uni-popup-message type="error" message="账号或者密码错误" :duration="1000" class="message"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {
		requestPost,
		loginUrl,
		H5loginUrl,
		likeList,
		musicDetail,
		requestGet
	} from '../../utils/http.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				formData: {
					phone: '',
					password: ''
				},
				flag: false
			}
		},
		methods: {
			...mapMutations(['addSong']),
			async submitForm() {
				let data = {
					phone: this.formData.phone,
					password: this.formData.password
				}
				console.log(data)
				// #ifdef MP-WEIXIN
				const res = await requestPost(loginUrl, data);
				// #endif
				// #ifdef H5
				const res = await requestPost(H5loginUrl, data);
				// #endif
				var cookieStr = "";
				var cookieArr = new Array();
				res.cookies.forEach((item, index, array) => {
					cookieArr.push(item.split(";")[0]);
				});
				cookieStr = cookieArr.join(";");
				if (res.data.code == 200) {
					uni.removeStorageSync("cookieKey");
					uni.removeStorageSync("img");
					uni.removeStorageSync("name");
					uni.removeStorageSync("useId");
					uni.setStorageSync('cookieKey', cookieStr);
					uni.setStorageSync('img', res.data.profile.avatarUrl);
					uni.setStorageSync('name', res.data.profile.nickname);
					uni.setStorageSync('useId', res.data.profile.userId);
					this.getLike();
					uni.switchTab({
						url: '/pages/index/index'
					});
					uni.navigateTo({
						url: '',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				} else {
					var message = res.data.message
					this.$refs.popups.open('top')
				}
			},
			handle(e) {
				console.log(e)
			},
			async getLike() {
				const result = await requestGet(likeList, {
					uid: uni.getStorageSync("useId")
				});
				var obj = {};
				var array = result.ids;
				var songsList = [];
				array.forEach(async (item) => {
					const songs = await this.getLikeSong(item)
					obj.names = songs.songs[0].name;
					obj.id = songs.songs[0].id;
					obj.arname = songs.songs[0].ar[0].name;
					obj.img = songs.songs[0].al.picUrl;
					songsList[songsList.length] = obj;
					this.addSong(obj);
					obj = {};
				});
			},
			async getLikeSong(id) {
				const result = await requestGet(musicDetail, {
					ids: id
				});
				return result
			},
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		position: relative;

		.message {
			text-align: center;
		}

		.container {
			height: 100%;
		}

		.mask {
			width: 100%;
			height: 100%;
			background-color: #000;
			opacity: .5;
		}

		.center {
			padding: 20rpx;
			width: 80%;
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate(-50%, -60%);
			background-color: #fff;
			z-index: 2;
			border-radius: 20rpx;
			overflow: hidden;
			height: 400rpx;

			.one {
				.uni-forms-item {
					margin-top: 40rpx;
				}

				.uni-forms-item__label {
					padding-top: 10rpx;
				}
			}

			.two {
				margin-top: 30rpx;
			}

			button {
				position: absolute;
				bottom: 0;
				left: 50%;
				width: 300rpx;
				transform: translateX(-50%);
			}
		}
	}
</style>
