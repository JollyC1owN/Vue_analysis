/**
 * 自定义实现事件总线
 * 事件总线的对象
 *
 * 绑定
 * on(eventName,listener)
 * 分发
 * emit(eventName,data)
 * 解绑
 * off(eventName)
 *
 * eventName---事件类型----事件的名字
 * listener---事件的监听函数---回调函数
 * data----数据---分发事件的时候传入的数据
 *
 * 设计存储事件类型及对应回调函数的容器
 * {'add':[listener1,listener2],'delete':[listener3]}
 */
(function (window) {
	// 定义一个时间总线对象，并且向外暴露
	let myEventBus = {}
	// 定义一个存放 事件名 : 回调函数   键值对的对象  --大容器
	// 在存储回调函数时，一个事件名可能对应多个回调函数，所以此时为数组
	let callbackContainer = {}
	// 绑定事件
	/**
	 * eventName: 事件名
	 * callback: 事件对应的回调函数
	 */
	myEventBus.on = function (eventName, callback) {
		// 根据事件名在大的对象容器中找到所对应的回调函数数组
		let callbacks = callbackContainer[eventName]
		// 判断是否存在这个事件
		if (!callbacks) { // 没有则进判断
			// 没有这个事件所对应的回调函数数组，则创建一个
			callbacks = []
			// 将这个数组给当前这个事件名
			callbackContainer[eventName] = callbacks
		}
		// 如果事件对应的回调函数数组存在，则将会把这个事件新的回调函数加到数组中
		callbacks.push(callback)
	}


	// 分发函数
	/* 
	eventName: 事件名
	data: 函数调用需要的数据
	*/
	// myEventBus.emit('add','您好')
	myEventBus.emit = function (eventName, data) {
		// 根据事件名，去找到对应回调函数的数组
		let callbacks = callbackContainer[eventName]
		// 判断回调函数数组是否存在，存在的话是否不是一个空数组
		if (callbacks && callbacks.length > 0) {
			// 同一个事件名的所有回调函数都要执行，所以让回调函数数组中的函数都要执行
			callbacks.forEach(callback => {
				callback(data)
			})
		}
	}

	// 解绑事件
	/* 
	eventName: 需要解绑的事件名
	 */
	myEventBus.off = function (eventName) {
		// 判断事件名是否存在----当在调用myEventBus.off() 不传参数
		// 有形参没实参则为undefined
		if (eventName === undefined) {
			// 解绑所有的事件----如果是undefined则把所有的事件解绑
			callbackContainer = {}
		} else {
			// delete是内置的一种方法
			delete callbackContainer[eventName]
			// 或者
			// callbackContainer[eventName] = []
		}
	}
	// 向外暴露这个事件总线对象
	window.myEventBus = myEventBus
})(window)
