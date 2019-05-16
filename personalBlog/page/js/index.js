var vm = new Vue({
	el: "#everyday",
	data: {
		dayen: '',
		daych: '',
		daywh: ''
	},
	created() {
		//获取每日一句
		axios({
			method: 'get',
			url: '/getDaily'
		}).then(response => {
			var data = response.data[0];
			this.dayen = data.content_english;
			this.daych = data.content_chinese;
			this.daywh = data.where;
		}).catch(function(error) {
			console.log(error);
		});
	},
})


var ac = new Vue({
	el: '#articles',
	data: {
		articleList: [],
	},
	created() {
		//获取文章列表
		axios({
			method: 'get',
			url: '/getArticles?page=1&count=5',
		}).then(response => {
			console.log(response)
			var data = response.data;
			//处理result中content的内容
			data.forEach(function(item) {
				var content = item.content.replace(/<[\W\w]{1,7}>/g, '').replace(/<img [\W\w]*>/g, '').slice(0,300);
				item.content = content;
			})
			this.articleList = data;
		}).catch(function(error) {
			console.log(error);
		});
	}
})
