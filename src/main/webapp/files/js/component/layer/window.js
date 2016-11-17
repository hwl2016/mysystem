define(['widget', 'jquery', 'jqueryUI'], function(widget, $, $UI) {
	function Window() {
		this.cfg = {
			width: 500,
			height: 300,
			title: "系统消息",	//弹框标题
			content: "",	//消息内容
			hasMask: true,	//是否有模态蒙版
			hasCloseBtn: false,	//是否有关闭按钮
			isDraggable: true,	//是否可拖动
			dragHandle: null,	//可拖动的部位
			skinClassName: null,	//定制css的className钩子
			text4AlertBtn: '确定',	//alert弹框按钮的文本内容
			text4ConfirmBtn: '确定',	//confirm弹框确定按钮的文本内容
			text4CancelBtn: '取消',	//confirm弹框取消按钮的文本内容
			text4PromptBtn: '确定',	//prompt弹框确定按钮的文本内容
			handler4AlertBtn: null,	//alert弹框确认按钮回调函数
			handler4CloseBtn: null,	//关闭按钮回调函数
			handler4ConfirmBtn: null,	//confirm弹框确认按钮回调函数
			handler4CancelBtn: null,	//confirm弹框取消按钮回调函数
			isPromptInputPassword: false,	//prompt输入框是否是密码类型 如果是就显示星号
			defaultValue4PromptInput: "",	//prompt输入框默认值
			maxlength4PromptInput: 10,	//prompt输入框最大长度
			handler4PromptBtn: null	//prompt输入框确认按钮回调函数
		};

	}
	//继承widget组件中的方法
	Window.prototype = $.extend({}, new widget.Widget(), {
		renderUI: function() {	//实现生成DOM的接口
			var footerContent = "";
			switch(this.cfg.winType) {
				case "alert":
					footerContent = '<input type="button" class="window_alertBtn" value="'+ this.cfg.text4AlertBtn +'" />';
					break;
				case "confirm":
					footerContent = '<input type="button" class="window_confirmBtn" value="'+ this.cfg.text4ConfirmBtn +'" /><input type="button" class="window_cancelBtn" value="'+ this.cfg.text4CancelBtn +'" />';
					break;
				case "prompt":
					this.cfg.content += '<p class="window_promptInputWrapper"><input type="' + (this.cfg.isPromptInputPassword ? "password" : "text") + '" value="' + this.cfg.defaultValue4PromptInput + '" maxlength="' + this.cfg.maxlength4PromptInput + '" class="window_promptInput" /></p>';
					footerContent = '<input type="button" value="' + this.cfg.text4PromptBtn + '" class="window_promptBtn"/><input type="button" value="' + this.cfg.text4CancelBtn + '" class="window_cancelBtn"/>';
					break;
			}

			this.boundingBox = $('<div class="window_boundingBox">'+ 
									'<div class="window_body">' + this.cfg.content + '</div>' + 
							   '</div>');

			if(this.cfg.winType != 'common') {
				this.boundingBox.prepend('<div class="window_header">' + this.cfg.title + '</div>');
				this.boundingBox.append('<div class="window_footer">' + footerContent + '</div>');
			}

			if(this.cfg.hasMask) {
				this._mask = $('<div class="window_mask"></div>');
				this._mask.appendTo("body");
			}
			if(this.cfg.hasCloseBtn) {	//是否生成关闭按钮
				this.boundingBox.append('<span class="winodw_closeBtn">×</span>');
			}
			this.boundingBox.appendTo(document.body);

			this._promptInput = this.boundingBox.find(".window_promptInput");
		},
		bindUI: function() {	//实现事件监听的接口
			var that = this;

			//将所有的事件都委托到最外层容器上，这样便于事件的集中销毁
			this.boundingBox.on('click', '.window_alertBtn', function() {
				that.fire("alert");
				that.destroy();
			}).on('click', '.winodw_closeBtn', function() {
				that.fire("close");
				that.destroy();
			}).on('click', '.window_confirmBtn', function() {
				that.fire("confirm");
				that.destroy();
			}).on('click', '.window_cancelBtn', function() {
				that.fire("cancel");
				that.destroy();
			}).on('click', '.window_promptBtn', function() {
				that.fire("prompt", that._promptInput.val());
				that.destroy();
			})

			if(this.cfg.handler4AlertBtn) {
				this.on('alert', this.cfg.handler4AlertBtn);
			}
			if(this.cfg.handler4CloseBtn) {
				this.on('close', this.cfg.handler4CloseBtn);
			}
			if(this.cfg.handler4ConfirmBtn) {
				this.on('confirm', this.cfg.handler4ConfirmBtn);
			}
			if(this.cfg.handler4CancelBtn) {
				this.on('cancel', this.cfg.handler4CancelBtn);
			}
			if(this.cfg.handler4PromptBtn) {
				this.on('prompt', this.cfg.handler4PromptBtn);
			}
		},
		syncUI: function() {	//实现初始化组件的接口
			this.boundingBox.css({
				width: this.cfg.width + 'px',
				height: this.cfg.height + 'px',
				left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
				top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + 'px'
			});
			if(this.cfg.skinClassName) {	//定制皮肤的css钩子
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
			if(this.cfg.isDraggable) {
				if(this.cfg.dragHandle) {
					this.boundingBox.draggable({	//调用jQueryUI的方法
						handle: this.cfg.dragHandle
					});
				}else {
					this.boundingBox.draggable();
				}
			}
		},
		destructor: function() {	//实现销毁前事件处理函数的接口
			//弹框组件销毁前将模态蒙版移除
			this._mask && this._mask.remove();
		},
		alert: function(cfg) {
			$.extend(this.cfg, cfg, {winType: 'alert'});
			this.render();
			return this;
		},
		confirm: function(cfg) {
			$.extend(this.cfg, cfg, {winType: 'confirm'});
			this.render();
			return this;
		},
		prompt: function(cfg) {
			$.extend(this.cfg, cfg, {winType: 'prompt'});
			this.render();
			this._promptInput.focus();
			return this;
		},
		common: function(cfg) {
			$.extend(this.cfg, cfg, {winType: 'common'});
			this.render();
			return this;
		}
	})
	return {
		Window: Window
	}
})