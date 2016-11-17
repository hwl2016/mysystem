define(function() {
	function Utils() {
		
	}
	Utils.prototype = {
		formatDate: function(str) {
			var d = new Date(str);
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var date = d.getDate();
			month = month.toString().length == 1 ? ('0' + month) : month;
			date = date.toString().length == 1 ? ('0' + date) : date;
			return year + '-' + month + '-' + date;
		}
	}
	return new Utils();
})