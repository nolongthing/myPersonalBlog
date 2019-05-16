var vm = new Vue({
	el:'#article',
	created() {
		axios({
			method: 'get',
			url: '/getArticle'+location.search,
		}).then(response => {
			console.log(response);
		}).catch(function(error) {
			console.log(error);
		});
	}
})