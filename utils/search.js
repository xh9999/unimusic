export function handleStr(str) {
	// #ifdef MP-WEIXIN
	if (str.length > 16) {
		str = str.slice(0, 16) + "..."
	}
	return str;
	// #endif
	// #ifdef MP-WEIXIN
	if (str.length > 16) {
		str = str.slice(0, 16) + "..."
	}
	return str;
	// #endif
};

export function arrQc(arr, name) {
	// #ifdef MP-WEIXIN
	var hash = {};
	return arr.reduce(function(item, next) {
		hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
		return item;
	}, []);
	// #endif
	// #ifdef MP-WEIXIN
	var hash = {};
	return arr.reduce(function(item, next) {
		hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
		return item;
	}, []);
	// #endif
}
