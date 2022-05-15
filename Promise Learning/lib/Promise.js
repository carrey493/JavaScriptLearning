/* 
自定义Promise函数模块 IFIE
*/
//自调用函数表达式
(function (params) {
    /* 
        Promise构造函数
        excutor 执行器函数(同步执行)
    */
    function Promise(excutor) {

    }
    /* 
    Promise原型对象的then()
    指定成功和函数的回调函数
    返回一个新的promise对象
    */
    Promise.prototype.then = function (onResolved, onResolved) {

    }
    /* 
    Promise原型对象的catch()
    指定失败和函数的回调函数
    返回一个新的promise对象
     */
    Promise.prototype.catch = function (onResolved, onResolved) {

    }
    /* 
    Promise函数对象的resolve方法
    返回一个指定value的成功的promise
    */
    Promise.resolve = function (value) {

    }
    /* 
    Promise函数对象的reject方法
    返回一个指定reason的失败的promise
    */
    Promise.reject = function (reason) {

    }
    /* 
    Promise函数对象的all方法
    返回一个promise,只有当所有promise都成功时才成功，否则只要有一个失败则失败
    */
    Promise.all = function (promises) {

    }
    /* 
    Promise函数对象的reace方法
    返回一个promise，其结果由第一个完成的promise决定
    */
    Promise.reace = function (promises) {

    }
    //向外暴露Promise函数
    window.Promise = Promise
})(window)