// 网络请求
const baseUrl = "http://121.5.237.135:3000"

export function requestGet(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: "GET",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}

export function requestPost(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: "POST",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}

export const SongDataURL = "/song/detail?ids=" //获取歌曲详情
export const SongURL = "/song/url?id=" //获取音乐 url
export const LyricURL = "/lyric?id="  //获取歌词
export const SongListURL = "/playlist/detail?id=" //获取歌单详情
export const artistURL = "/artist/top/song?id=5781" //歌手热门 50 首歌曲