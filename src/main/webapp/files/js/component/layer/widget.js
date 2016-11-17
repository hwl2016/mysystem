define(['jquery'], function($) {
	function Widget() {
		this.boundingBox = null;	//属性：最外层容器
	}
	Widget.prototype = {
		on: function(type, handler) {
			if(typeof this.handlers[type] == 'undefined') {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire: function(type, data) {
			if(this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for(var i = 0, len = handlers.length; i < len; i++) {
					handlers[i](data);
				}
			}
		},
		render: function(container) {	//方法 渲染组件
			this.renderUI();
			this.handlers = {};	//清空handler
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.boundingBox);
		},
		destroy: function() {	//	方法 销毁组件	
			this.destructor();
			this.boundingBox.off();	//将boundBox上的事件解绑
			this.boundingBox.remove();
		},
		renderUI: function() {},	//接口，添加dom节点 由子类去实现
		bindUI: function() {},	//监听事件	由子类去实现
		syncUI: function() {},	//接口 初始化组件属性	由子类去实现
		destructor: function() {}	//接口 销毁前的处理函数	由子类去实现

	}
	return {
		Widget: Widget
	}

})