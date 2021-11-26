export function requestGet(url, data) {
	// #ifdef MP-WEIXIN
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: 'GET',
			data: data,
			header: {
				'content-type': 'application/json', // 默认值
				'Cookie': uni.getStorageSync("cookieKey")
			},
			success: res => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			},
		});
	})
	// #endif
	// #ifdef H5
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: 'GET',
			data: data,
			header: {
				'content-type': 'application/json', // 默认值
			},
			success: res => {
				console.log(res, "xxxxxxxxxxxxxxxxx")
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			},
		});
	})
	// #endif
};
export function requestPost(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: 'POST',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: data,
			success: res => {
				console.log(res, "999999999999999")
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			},
			// success: res => {
			// 	resolve(res,"000000000000000000000000");
			// },
			// fail: (err) => {
			// 	reject(err,"99999999999999999999999")
			// },
			// complete: () => {
			// 	console.log("77777777777777777777777777")
			// }
		});
	})
};

// export function requestPostAxios(url, data) {
// 	// 发送 POST 请求
// 	return axios({
// 		method: 'post',
// 		url: url,
// 		data: data
// 	});
// };


export var loginUrl = 'http://121.5.237.135:3000/login/cellphone' //post请求
export var H5loginUrl = '/login/cellphone' //post请求
export var sliderUrl = "http://121.5.237.135:3000/banner?type=2"; //get请求轮播图
// 专辑
export var albumUrl = "http://121.5.237.135:3000/album/newest"; //get请求
// 获取歌单榜
export var sonList = "http://121.5.237.135:3000/toplist/detail"; //get请求
// 获取推荐歌曲
export var newSong = "http://121.5.237.135:3000/recommend/songs"; //get请求
export var H5newSong = "/recommend/songs"; //get请求
// 获取mv
export var mvUrl = "http://121.5.237.135:3000/top/mv"; //get请求
// 获取推荐电台
export var radioUrl = "http://121.5.237.135:3000/program/recommend"; //get请求
// 获取每日推荐歌单
export var hotUrl = "http://121.5.237.135:3000/recommend/resource"; //get请求
// 获取mv的url
export var mv = "http://121.5.237.135:3000/mv/url";
// 获取相似mv
export var simimv = "http://121.5.237.135:3000/simi/mv";
// 获取榜单的内容
export var personal = "http://121.5.237.135:3000/playlist/detail";
// 获取音乐的url
export var musicUrl = "http://121.5.237.135:3000/song/url";
// 获取歌曲详情
export var musicDetail = "http://121.5.237.135:3000/song/detail"; //传入歌曲的id
// mv评论
export var mvcomment = "http://121.5.237.135:3000/comment/mv";
// 喜欢列表
export var likeList = "http://121.5.237.135:3000/likelist";
export var searchUrl = "http://121.5.237.135:3000/search";
export var searchHotUrl = "http://121.5.237.135:3000/search/hot";
