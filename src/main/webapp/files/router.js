define(['angular', 'utils', 'layer', 'ui-route'], function(angular, utils, layer) {
	var myApp = angular.module('myApp', ['ui.router']);
	
	myApp.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', 
	              function($stateProvider, $urlRouterProvider, $controllerProvider) {
		
		/*$urlRouterProvider
	        .when('/blog/add?id', '/contacts/:id')
	        .when('/user/:id', '/contacts/:id')
	        .otherwise('/');*/
		
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'views/home.html?t=' + (+new Date),
			})
			.state('blog', {
				url: '/blog',
				templateUrl: 'views/blog.html?t=' + (+new Date),
				controller: 'blogController'
			})
			.state('user', {
				url: '/user',
				templateUrl: 'views/user.html?t=' + (+new Date),
				controller: 'userController'
			})
			.state('user_add', {
				url: '/user/add',
				templateUrl: 'views/user_add.html?t=' + (+new Date),
				controller: 'userAddController'
			})
			.state('user_edit', {
				url: '/user/edit',
				templateUrl: 'views/user_edit.html?t=' + (+new Date),
				controller: 'userEditController'
			});
		
	}]);
	
	myApp.directive('compare', function() {	//比较两次输入的值是否一样
		return {
			strict: 'AE',
			scope: {
				orgText: '=compare'
			},
			require: 'ngModel',
			link: function(sco, ele, attr, ctrl) {
				ctrl.$validators.compare = function(v) {	//v就是传进来比较的值
					return v == sco.orgText;	//比较之前输入的和之后输入两个值是否一样
				}
				sco.$watch('orgText', function() {
					ctrl.$validate();
				})
			}
		}
	})
	
	myApp.controller('blogController', function($scope, $http, $interval){
        $scope.info = 'kenko';
        $http.get('views/blog.html').success(function(data) {
            $scope.info = 'vivi';
        });
    }).controller('userController', function($scope, $http) {
    	$scope.userBean = {};
    	
    	// 从数据库请求数据
		$http.get("/user/findAll/1?t=" + (+new Date)).success(function(data) {
			for(var i=0; i< data.list.length; i++) {
				data.list[i].birthday = utils.formatDate(data.list[i].birthday);
			}
			$scope.userBean = data;
		})
		
		//删除用户记录
		$scope.deleteRecord =  function(username, id) {
			var tipContent = '您真的要删除用户' + username + '记录信息么？';
			var win = new layer.Window();
			win.confirm({
				width: 300,
				height: 150,
				y: 150,
				title: '提示信息',
				content: tipContent,
				hasCloseBtn: true,
				skinClassName: 'window_skin_b',
				hasMask: true,
				dragHandle: '.window_header'
			}).on('confirm', function() {
				$http.post('/user/delete/' + id).success(function(resp) {
					if(resp == 1) {
						// 删除成功后	重新请求数据库 达到更新页面视图
						$http.get("/user/findAll/1?t=" + (+new Date)).success(function(data) {
							for(var i=0; i< data.list.length; i++) {
								data.list[i].birthday = utils.formatDate(data.list[i].birthday);
							}
							$scope.userBean = data;
						})
					}else {
						console.log('删除失败！')
					}
				}).error(function(resp) {
					console.log('ajax error')
				})
			});
		}
		
	}).controller('userAddController', function($scope, $http) {
		$scope.formData = {
				gender: '男',
				czs: '鼠'
		};
		$scope.submitData = function(isValid) {
			$http({
				url: '/user/add?t=' + (+new Date()),
				method: 'POST',
				params: $scope.formData
			}).success(function(resp) {
				if(resp == 1) {
					console.log('success');
					window.location.href = "#/user";
				}else if(resp == 0) {
					console.log('fail');
				}else {
					console.log('error');
				}
			}).error(function(resp) {
				console.log('error');
			})
		}
	}).controller('userEditController', function($scope, $http, $location) {
		$scope.formData = {};
		var id = $location.search().id;	//获取url的id
		var url = "/user/findById/"+ id +"?t=" + (+new Date);
		$http.get(url).success(function(resp) {
			$scope.formData = resp;	//Angular的数据双向绑定会自动的将数据填充到编辑表单
			$scope.formData.psdAgin = resp.password;
		})
		
		$scope.submitData = function(isValid) {
			$http({
				url: '/user/edit/'+id+'?t=' + (+new Date()),
				method: 'POST',
				params: $scope.formData
			}).success(function(resp) {
				if(resp == 1) {
					console.log('success');
					window.location.href = "#/user";
				}else if(resp == 0) {
					console.log('fail');
				}else {
					console.log('error');
				}
			}).error(function(resp) {
				console.log('error');
			})
		}
	})
	
	return myApp;
})