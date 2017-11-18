// 自定义事件源对象，基类
function EventSource() {
    // 事件委托集合
    this._events = {}; 
}


// 添加事件侦听器，注册事件
// eventname 事件名称 string
// listener 事件的处理函数 function
// capture 是否在捕获阶段触发(这里只是做了顺序排列),可选 boolean
EventSource.prototype.addEventListener = function (eventname, listener, capture) {   
 
    // 判断一下传入的参数是否符合规格
    if (typeof eventname !== 'string' || typeof listener !== 'function') return;
 
    // 缓存符合条件的事件处理函数列表
    var list = this._events[eventname];
 
    // 判断是否已经有该类型事件，若没有则添加一个新数组
    if (typeof list === 'undefined') list = (this._events[eventname] = []);
 
    /* 判断插入函数的位置 */
    if (!!capture) {
        list.push(listener);
    }
    else {
        list.insert(0, listener);
    } 
    return this;
    };
 


    // 移除事件侦听器，移除注册事件
    // eventname 事件名称 string
    // listener 事件的处理函数 function
    // capture 是否在捕获阶段触发(这里只是做了顺序排列),可选，为以后扩展用 boolean
EventSource.prototype.removeEventListener = function (eventname, listener, capture) {
       
 
        // 判断一下传入的参数是否符合规格
    if (typeof eventname !== 'string' ) return this;
    
    if (listener && typeof listener !== 'function') return this;
 
            // 缓存符合条件的事件列表
    var list = this._events[eventname];
 
            // 若没有绑定过此类事件则不需要做处理
        if (typeof list === 'undefined') return this;
 
        if (listener)
        	{
	        for (var i = 0, len = list.length; i < len; i++) {
	            // 通过循环判断来确定事件列表中存在要移除的事件侦听函数
	            if (list[i] == listener) {
	            // 找到后将此侦听函数从事件列表中移除
	                list.remove(i);
	                break;
	        }
        }
        	}
        else
        	{
        	while(list.length > 0) {                
                    list.remove(0);
                    
            }
        	
        }
        return this;
        }; 

// 触发事件
// eventname 事件名称 string
// e 附加参数对象 object
EventSource.prototype.fireEvent = function (eventname, e) {
 
    // dom树中的事件
    var onevent = 'on' + eventname.toLowerCase();
            // 若存在dom用法的函数，则触发
    this[onevent] && this[onevent].call(this, e);
 
            // 缓存符合条件的事件列表
    var list = this._events[eventname];
 
            // 若事件列表中没有内容则不需要做处理
            if (!list || list.length <= 0) return this;
 
            // 阻止事件冒泡开关
            var isStop = false; 
            // 模拟事件对象
            //window.event = { stopPropagation: function () { isStop = true; } };
            //e.stopPropagation = window.event.stopPropagation;
 
            for (var i = 0, len = list.length; i < len; i++) {
                // 通过循环触发符条件的事件列表中存在的所有事件侦听函数
                // 若函数内返回false或事件内调用了event.stopPropagation函数则阻止接下来的所有调用
                if (list[i].call(this, e) === false || isStop) break;
            }
            return this;
        }; 

// 扩展数组方法insert
Array.prototype.insert = function (index, value) {
     
    if (index > this.length) index = this.length;
    if (index < -this.length) index = 0;
    if (index < 0) index = this.length + index;
    for (var i = this.length; i > index; i--) {
        this[i] = this[i - 1];
    }
    this[index] = value;
    return this;
};
 
// 扩展数组方法remove
Array.prototype.remove = function (index) {   
 
    if (isNaN(index) || index > this.length) return;
    this.splice(index, 1);
};