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
