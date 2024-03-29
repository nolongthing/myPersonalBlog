function creatTime() {
	var time = parseInt(new Date().getTime() / 1000);

	return time;
};
function add0(m) {
	return m < 10 ? '0' + m : m
};
function transformTime(shijianchuo) {
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(shijianchuo*1000);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
};

module.exports = {
	creatTime,
	transformTime
}
