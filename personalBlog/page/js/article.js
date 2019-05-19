var vm = new Vue({
	el:'#article',
	data:{
		article:{},
	},
	created() {
		axios({
			method: 'get',
			url: '/getArticle'+location.search,
		}).then(response => {
			this.article = response.data[0];
		}).catch(function(error) {
			console.log(error);
		});
	}
})