/*秒前边加0*/
  export function _pad(num, n = 2) {
  	let len = num.toString().length
  	while (len < n) {
  		num = '0' + num
  		len++
  	}
  	return num
  }

  // 处理时间 秒变为分秒
  export function _formatTime(interval) {
  	interval = interval | 0
  	const minute = interval / 60 | 0
  	const second = _pad(interval % 60)
  	return `${minute}:${second}`
  }

  // 处理歌词
  export function formatLyric(text) {
  	let resultLyric = [];
  	let arr = text.split("\n"); //通过换行符“\n”进行切割
  	let row = arr.length; //获取歌词行数
  	for (let i = 0; i < row; i++) {
  		let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
  		let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
  		let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
  		//再对剩下的歌词时间进行处理
  		temp_arr.forEach(element => {
  			let obj = {};
  			let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
  			let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
  			obj.time = s;
  			obj.text = text;
  			resultLyric.push(obj); //每一行歌词对象存到组件的showLyric歌词属性里
  		});
  	}
  	resultLyric.sort(sortRule) //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
  	// showLyric=resultLyric
  	return resultLyric
  }

  //设置一下排序规则
  export function sortRule(a, b) {
  	return a.time - b.time;
  }

  // 提示信息
  export function showToast(title) {
  	uni.showToast({
  		title: title,
  		duration: 2000,
  		icon: 'error'
  	});
  }
