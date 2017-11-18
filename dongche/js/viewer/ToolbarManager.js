Viewer.ToolbarManager = function () {
	this.buttons = [{id: 'picked', shift: false,  tooltip: '点选(Q)'},
					{id: 'translate', shift: false, tooltip: '平移(W)'},
					{id: 'rotate', shift: false, tooltip: '旋转(E)'},
					// {id: 'zoom', shift: false,  tooltip: '缩放'},
					//{id: 'site', shift: false,  tooltip: '驻点观察(R)'},
					// {id: 'center', shift: false,  tooltip: '居中(F)'},
					// {id: 'separator', shift: false,  tooltip: ''},
					// {id: 'hidden', shift: false,  tooltip: '隐藏(H)'},
					// {id: 'showlast', shift: false,  tooltip: '显示上一个(J)'},
					// {id: 'showall',	shift: false,  tooltip: '显示全部(K)'},
					// {id: 'separator', shift: false,  tooltip: ''},
					// {id: 'p2p',	shift: false,  tooltip: '测量两点距离(Y)'},
					{id: 'p2l',	shift: false,  tooltip: '折线测量(U)'},
					// {id: 'angle', shift: false,  tooltip: '测量角度(I)'},
					// {id: 'vertical', shift: false,  tooltip: '测量平行轴距(O)'},
					// {id: 'edit', shift: false,  tooltip: '测量调整(Z)'},
					// {id: 'del', shift: false,  tooltip: '测量清除(ESC)'},
					// {id: 'separator', shift: false,  tooltip: ''},
					// {id: 'planarclip', shift: false,  tooltip: '平面剖切(P)'},
					// {id: 'filterclip', shift: false,  tooltip: '空间筛选(B)'},
					// {id: 'separator', shift: false,  tooltip: ''},
					// {id: 'mark', shift: false,  tooltip: '三维空间标记(M)'},
					// {id: 'separator', shift: false,  tooltip: ''},
					// {id: 'tree', shift: false,  tooltip: '模型树'},
					// {id: 'property', shift: false,  tooltip: '属性'},
					// {id: 'config', shift: false,  tooltip: '设置'}
					];
	this.exclusion = ['rotate', 'translate', 'zoom', 'picked', 'p2p', 'p2l', 'angle'];
	this.unshift = ['center', 'hidden', 'showlast', 'showall', 'del'];
	this.imgs = new Map();
	this.tips;
	
	this.tw = 35;
	this.h = 45;
	this.w = 840;

	var self = this;
	
	this.rect = function(div, w, h) {
		div.style.left = '0px';//(w - this.w) / 2 + 'px';
		div.style.bottom  = '3px';
		div.style.width = this.w + 'px';
		div.style.height = this.h + 'px';
	};

	this.src = function(img) {
		if (!img.shift){
			img.src = './res/toolbar/' + img.id + '_sel.png';
		}
		else{
			img.src = './res/toolbar/' + img.id + '_nor.png';
		}
		img.shift = !img.shift;
	};

	this.exclusive = function(id) {
		if (-1 != this.exclusion.indexOf(id)){
			for (var i = 0; i < this.exclusion.length; i++){
				if (id != this.exclusion[i]){
					var img = this.imgs.get(this.exclusion[i]);
					if (img){
						img.shift = false;
						img.src = './res/toolbar/' + this.exclusion[i] + '_nor.png';
					}
				}
			}
		}
		
		if (-1 != this.unshift.indexOf(id)){
			var img = this.imgs.get(id);
			if (img){
				img.shift = false;
				img.src = './res/toolbar/' + id + '_nor.png';
			}
		}
	};

	this.click = function(img) {
		this.src(img);
		this.exclusive(img.id);
		control.domElement.style.cursor = "default";
		switch(img.id)
		{
		    case 'rotate':
			case 'translate':
		    case 'zoom':
                setCamera( img.id );
				if ( pickMgr != null ){
					pickMgr.picking = false;
				}
			break;

		    case 'picked':
				if ( img.shift ){
					if ( pickMgr != null ){
						pickMgr.init();
					}
				}
				else{
					if ( pickMgr != null ){
						pickMgr.exit();
					}
				}
			break;

			default:
			break;

		}
	};

	this.mouseover = function(img) {
		img.style.background = '#00CC00';
		
		this.tips.style.left = img.offsetLeft + img.clientWidth / 2 + 'px';
		this.tips.style.top = img.offsetTop - img.clientHeight / 6 + 'px';
		this.tips.innerText = img.tooltip;
	};

	this.mouseout = function(img) {
		img.style.background = '';
		this.tips.innerText = '';
	};

	this.src = function(img) {
		if (!img.shift){
		    img.src = './res/toolbar/' + img.id + '_sel.png';
		    
		}
		else{
			img.src = './res/toolbar/' + img.id + '_nor.png';
		}
		img.shift = !img.shift;
	};

	this.reset = function () {
	    var buttons = this.buttons;
	    for (var i = 0; i < buttons.length; i++) {
	        var item = buttons[i];
	        var img = this.imgs.get(item.id);
	        if (img) {
	            if (img.shift) {
	                this.src(img);
	            }
	        }
	    }

	    control.domElement.style.cursor = "default";
	    setCamera('none');
	};
}

Viewer.ToolbarManager.prototype = {//原型
    constructor: Viewer.ToolbarManager,
	
	init: function(w, h) {
		var self = this;
		var toolbar = document.getElementById('toolbar');
		self.rect(toolbar, w, h);
		
		for (var i = 0; i < self.buttons.length; i++){
		    var img = document.createElement('img');
			img.id = self.buttons[i].id;
			img.shift = self.buttons[i].shift;
			img.tooltip = self.buttons[i].tooltip;
			img.src = './res/toolbar/' + img.id + '_nor.png';
			img.setAttribute('id', img.id);
			if (img.id != 'separator') {
				img.style.width = self.tw + 'px';
				img.style.margin = '5px 0 5px 5px';
				img.addEventListener('click', function(){
					self.click(this);
				}, false);
				img.addEventListener('mouseover', function(){
					self.mouseover(this);
				}, false);
				img.addEventListener('mouseout', function(){
					self.mouseout(this);
				}, false);
				self.imgs.set(img.id, img);
			}
			else{
				img.style.margin = '5px 0 7px 5px';
			}

			toolbar.appendChild(img);
		}

		if (self.tips == undefined){
			self.tips = document.createElement('div');
			self.tips.setAttribute('id', 'tltips');
			self.tips.style.display = 'block';
			self.tips.style.position = 'absolute';
			self.tips.style.color = 'white';
			self.tips.style.fontFamily = 'Microsoft Yahei';
			self.tips.style.fontSize = '16px';
			self.tips.style.background = 'rgba(12, 28, 32, 0.75)';
			self.tips.style.zIndex = 101;
			//添加
			container.appendChild(self.tips);
		}
	},
	resize: function(w, h) {
		var self = this;
		var toolbar = document.getElementById('toolbar');
		if (toolbar){
			self.rect(toolbar, w, h);
		}
	},

	setHidden: function (id, val) {
	    var img = document.getElementById(id);
	    if (img) {
	        img.hidden = val;
	    }
	}
}

