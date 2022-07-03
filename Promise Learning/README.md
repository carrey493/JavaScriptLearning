# Promise从入门到自定义

## 1.前置知识

### 1.1区别实例对象与函数对象

- 实例对象：new函数产生的对象，称为实例对象，简称为对象
- 函数对象：将函数作为对象使用时，简称为函数对象

### 1.2两种类型的回调函数

#### 1.2.1同步回调

- 理解：立即执行，完全执行完了才结束，不会放入回调队列中
- 例子：数组遍历相关的回调函数/Promise的excutor函数

#### 1.2.2异步回调

- 理解：不会立即执行，会放入回调队列中将来执行
- 例子：定时器回调./ajax回调/Promise的成功|失败的回调

### 1.3JS的error处理

#### 1.3.1错误的类型

- Error:所有错误的父类型
- RefrenceError:引用的变量不存在
- TypeError:数据类型不正确的错误
- RangeError:数据值不在其所允许的范围内
- SyntaxError:语法错误

#### 1.3.2错误处理

- 捕获错误：try...catch
- 抛出错误：throw error

#### 1.3.3错误对象

- message属性：错误相关信息
- stack属性：函数调用栈记录信息

## 2.promise的理解与使用

### 2.1Promise是什么

#### 2.1.1理解

- 抽象表达：Promise是JS中进行异步编程的新的解决方案
- 具体表达
  - 从语法上说：Promise是一个构造函数
  - 从功能上说：promsie对象用来封装一个异步操作并可以获取其结果

#### 2.1.2promise的状态改变

- pending 变为 resolved
- pending 变为 rejected

说明 

- 只有这两种 且一个promise对象只能改变一次
- 无论变为成功还是失败都只会有一个结果数据
- 成功的结果数据一般称为value 失败的结果一般称为reason

#### 2.1.3promise的基本流程

![](https://img2022.cnblogs.com/blog/2332774/202204/2332774-20220409163740954-5653776.png)

#### 2.1.4promise的基本使用

```js
//1.创建一个新的promise对象
const p = new Promise((resolve, reject) => {
    //执行器函数
    //2.执行异步任务
    setTimeout(() => {
        const time = Date.now()

        if (time % 2 === 0) {
            //3.1成功调用resolve(value)
            resolve('成功的数据,time：' + time)
        } else {
            //3.2失败调用reject(reason)
            reject('失败的数据,time:' + time)
        }

    }, 1000)
})

p.then(
    //onResolved
    value => {
        //接收得到成功的value数据
        console.log('成功的回调',value);
    },
    //onRejected
    reason => {
        //接收得到失败的reason数据
        console.log('失败的回调',reason);
    }
)
```

### 2.2为什么要使用Promise

#### 2.2.1指定回调函数的方式更加灵活

- 旧的：必须在启动异步任务前指定
- promise：启动异步任务 =>返回promise对象 =>给promise对象绑定回调函数(甚至可以在异步任务结束后指定)

#### 2.2.2支持链式调用 可以解决回调地狱问题

- 什么是回调地狱？：回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调函数执行的条件
- 回调地狱的缺点：不便于阅读/不便于异步处理
- 解决方案：promise链式调用
- 终极解决方案 ：async/await

### 2.3如何使用Promise
#### 2.3.1API

**1.Promise构造函数：Promise(excutor){}**

- excutor函数：执行器(resolve,reject)=>{}
- resolve函数：内部定义成功时我们调用的函数value=>{}
- reject函数：内部定义失败时我们调用的函数reason=>{}

说明：excutor会在Promise内部立即同步回调，异步操作在执行器中执行

**2.Promise.prototype.then方法：(onResolved,onRejected)=>{}**

- onResolved函数：成功的回调函数(value)=>{}
- onRejected函数：失败的回调函数(reason)=>{}

说明：指定用于得到成功value的成功的回调和用于得到失败reason的失败回调

**3.Promise.prototype.catch方法：(onRejected)=>{}**

- onRejected函数：失败的回调函数(reason)=>{}

说明：then()的语法糖，相当于：then(undefined,onRejected)

**4.Promise.resolve方法：(value)=>{}**

- value:成功的数据或promise对象

说明：返回一个成功/失败的promise对象

**5.Promise.reject方法：(reason)=>{}**

- reason:失败的原因

说明：返回一个失败的promise对象

**6.Promise.all方法：(promise)=>{}**

- promises:包含n个promise的数组

说明：返回一个新的promise，只有所有的promise都成功才算成功，只要有一个失败就直接失败

**7.Promise.race方法：(promises)=>{}**

- promises:包含n个promise的数组

说明：返回一个新的promise，第一个完成的promise的结果状态就是最终的状态

#### 2.3.2关键问题

**1.如何改变promise的状态**

- resolve(value):如果当前是pendding就会变为resolved
- reject(reason):如果当前是pennding就会变为rejected
- 抛出异常：如果当前是pennding就会变为rejected

**2.一个promise指定多个成功/失败回调函数，都会调用吗**

- 当promise改变为对应状态时都会调用

**3.改变promise状态和指定回调函数谁先谁后**

- 都有可能，正常情况下是指定回调再改变状态，但也可以先改状态再指定回调
- 如何先改状态再指定回调
  - 在执行器中直接调用resolve()/reject
  - 延长更长时间才调用then()
- 什么时候才能得到数据
  - 如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
  - 如果先改变状态，那当指定回调时，回调函数就会调用，得到数据

**4.peomise.then()返回新的promise的结果状态由什么决定**

- 简单表达：由then()指定的回调函数执行的结果决定
- 详细表达：
  - 如果抛出异常，新promise变为rejected，reason为抛出的异常
  - 如果返回的是非promise的任意值，新promise变为resolved，value为返回值
  - 如果返回的是另一个新promise，此promise的结果就会成为新promise的结果

**5.promise如何串联多个操作任务**

- promise的then返回一个新的promise,可以看成then()的链式调用
- 通过then的链式调用串联多个同步/异步任务

**6.promise异常传透**

- 当使用promise的then链式调用时，可以在最后指定失败的回调
- 前面任何操作出了异常，都会传到最后失败的回调中处理

**7.中断promise链**

- 当使用promise的then链式调用时，在中间中断，不再调用后面的回调函数
- 办法：在回调函数中返回一个pendding状态的promise对象

## 3.自定义(手写)promise

### 3.1定义整体结构

```js
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
```

### 3.2构造函数实现与完善

```js
function Promise(excutor) {
        //当前Promise对象保存起来
        const self = this
        self.status = 'pending' //给promise对象指定status属性，初始值为pending
        self.data = undefined //给promise对象指定一个用于存储结果数据的属性
        self.callbacks = [] //每个元素的结构：{onResolved(){},onRejected(){}}
        function resolve(value) {
            //如果当前状态不是pending,直接结束
            if (self.status !== 'pending') {
                return
            }
            //将状态改为resolved
            self.status = 'resolved'
            //保存value数据
            self.data = value
            //如果有待执行callback函数，立即异步执行回调函数onResolved
            if (self.callbacks.length > 0) {
                setTimeout(() => { //放入队列中执行所有成功的回调
                    self.callbacks.forEach(callbacksObj => {
                        callbacksObj.onResolved(value)
                    })
                })
            }
        }

        function reject(reason) {
            //如果当前状态不是pending,直接结束
            if (self.status !== 'pending') {
                return
            }

            //将状态改为rejected
            self.status = 'rejected'
            //保存value数据
            self.data = reason
            //如果有待执行callback函数，立即异步执行回调函数onResolved
            if (self.callbacks.length > 0) {
                setTimeout(() => { //放入队列中执行所有失败的回调
                    self.callbacks.forEach(callbacksObj => {
                        callbacksObj.onRejected(reason)
                    })
                })
            }
        }

        //立即同步执行excutor
        try {
            excutor(resolve, reject)
        } catch (error) { //如果执行器抛出异常,promise对象变为REJECTED状态
            reject(error)
        }

    }
```

### 3.3自定义promise_then方法实现

```js
/* 
    Promise原型对象的then()
    指定成功和失败的回调函数
    返回一个新的promise对象
    返回promise的结果由onResolved/onRejected执行结果决定
    */
    Promise.prototype.then = function (onResolved, onRejected) {

        onResolved = typeof onResolved === 'function' ? onResolved : value => value //向后传递成功的value
        //指定默认的失败的回调(实现错误/异常传透的关键点)
        // onRejected = typeof onRejected === 'function' ? onRejected : reason => Promise.reject(reason)
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason } //向后传递失败的reason

        const self = this

        //返回一个新的promise对象
        return new Promise((resolve, reject) => {
            //调用指定的回调函数处理，根据执行结果，改变promise的状态
            function handle(callback) {
                /* 
                    1.如果抛出异常，return的promise就会失败，reason就是error
                    2.如果回调函数执行返回非promise，return的promise就会成功，value就是返回的值
                    3.如果回调函数返回的是promise，return的promise结果就是根据这个promise的结果
                    */
                try {
                    const result = callback(self.data)
                    if (result instanceof Promise) {
                        //3.如果回调函数返回的是promise，return的promise结果就是根据这个promise的结果
                        /* result.then(
                            value =>
                                resolve(value)//当result成功时，让return的promise也成功
                            ,
                            reason =>
                                reject(reason)//当result失败时，让return的promise也失败
                        ) */
                        result.then(resolve, reject)
                    } else {
                        //2.如果回调函数执行返回非promise，return的promise就会成功，value就是返回的值
                        resolve(result)
                    }
                } catch (error) {
                    //1.如果抛出异常，return的promise就会失败，reason就是error
                    reject(error)
                }
            }
            //当前状态还是pending状态，将回调函数保存起来
            if (self.status === PENDING) {
                self.callbacks.push({
                    onResolved(value) {
                        handle(onResolved)
                    },
                    onRejected(reason) {
                        handle(onRejected)
                    }  
                })
            } else if (self.status === RESOLVED) {
                //当前状态是resolved状态，异步执行onResilve并改变并改变return的Promise状态
                setTimeout(() => {
                    handle(onResolved)
                })
            } else {
                //当前状态是rejected状态，异步执行onRejected并改变并改变return的Promise状态
                setTimeout(() => {
                    handle(onRejected)
                })
            }
        })
    }
```
### 3.4 Promise.resolve()/reject()的实现
**Promise.resolve()**
```js
/* 
    Promise函数对象的resolve方法
    返回一个指定value的成功的promise
    */
    Promise.resolve = function (value) {
        //返回一个成功/失败的promise
        return new Promise((resolve, reject) => {
            //value是promise 
            if (value instanceof Promise) {
                //使用value的结果作为promise的结果
                value.then(resolve, reject)
            } else {
                //value不是promise => promise变为成功，数据是value
                resolve(value)
            }
        })
    }
```
**Promise.reject()**
```js
    /* 
    Promise函数对象的reject方法
    返回一个指定reason的失败的promise
    */
    Promise.reject = function (reason) {
        //返回一个失败的promise
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
```

### 3.5 Promise.all()/race()的实现
**Promise.all()**
```js
/* 
    Promise函数对象的all方法
    返回一个promise,只有当所有promise都成功时才成功，否则只要有一个失败则失败
    */
    Promise.all = function (promises) {
        //用来保存所有成功value的数组
        const values = new Array(promises.length)
        //用来保存成功promise的数量
        let resolveCount = 0
        return new Promise((resolve, reject) => {
            //遍历获取每个promise的结果
            promises.forEach((p, index) => {
                Promise.resolve(p).then(
                    value => {
                        resolveCount++
                        //p成功，将成功的value保存values
                        //values.push(value)
                        values[index] = value
                        //如果全部成功，将return的promise改为成功
                        if(resolveCount === promises.length){
                            resolve(values)
                        }
                    },
                    reason => {
                        //只要有一个失败则整个都失败
                        reject(reason)
                    }
                )
            })
        })
    }
```
**Promise.race()**
```js
/* 
    Promise函数对象的reace方法
    返回一个promise，其结果由第一个完成的promise决定
    */
    Promise.race = function (promises) {
        return new Promise((resolve, reject) => {
            //遍历获取每个promise的结果
            promises.forEach((p, index) => {
                Promise.resolve(p).then(
                    value => {
                        //一旦有成功，将return变为成功
                        resolve(value)
                    },
                    reason => {
                        //只要有一个失败则整个都失败
                        reject(reason)
                    }
                )
            })
        })
    }
```

### 3.6 Promise.resolveDelay()/rejectDelay()的实现
```js
/* 
    返回一个promise对象，它在指定时间后才返回结果
    */
    Promise.resolveDelay = function (value, time) {
        //返回一个成功/失败的promise
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //value是promise 
                if (value instanceof Promise) {
                    //使用value的结果作为promise的结果
                    value.then(resolve, reject)
                } else {
                    //value不是promise => promise变为成功，数据是value
                    resolve(value)
                }
            }, time)
        })
    }

    /* 
    返回一个promise对象，它在指定时间后才返回结果
    */
    Promise.rejectDelay = function (reason, time) {
        //返回一个失败的promise
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(reason)
            }, time)
        })
    }
```

### 3.7 自定义Promise_class版本
```js
/* 
自定义Promise函数模块 IFIE
*/
//自调用函数表达式
(function (params) {

    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

    class Promise {
        /* 
            Promise构造函数
            excutor 执行器函数(同步执行)
        */
        constructor(excutor) {
            //当前Promise对象保存起来
            const self = this
            self.status = PENDING //给promise对象指定status属性，初始值为pending
            self.data = undefined //给promise对象指定一个用于存储结果数据的属性
            self.callbacks = [] //每个元素的结构：{onResolved(){},onRejected(){}}
            function resolve(value) {
                //如果当前状态不是pending,直接结束
                if (self.status !== PENDING) {
                    return
                }
                //将状态改为resolved
                self.status = RESOLVED
                //保存value数据
                self.data = value
                //如果有待执行callback函数，立即异步执行回调函数onResolved
                if (self.callbacks.length > 0) {
                    setTimeout(() => { //放入队列中执行所有成功的回调
                        self.callbacks.forEach(callbacksObj => {
                            callbacksObj.onResolved(value)
                        })
                    })
                }
            }

            function reject(reason) {
                //如果当前状态不是pending,直接结束
                if (self.status !== PENDING) {
                    return
                }

                //将状态改为rejected
                self.status = REJECTED
                //保存value数据
                self.data = reason
                //如果有待执行callback函数，立即异步执行回调函数onResolved
                if (self.callbacks.length > 0) {
                    setTimeout(() => { //放入队列中执行所有失败的回调
                        self.callbacks.forEach(callbacksObj => {
                            callbacksObj.onRejected(reason)
                        })
                    })
                }
            }

            //立即同步执行excutor
            try {
                excutor(resolve, reject)
            } catch (error) { //如果执行器抛出异常,promise对象变为REJECTED状态
                reject(error)
            }

        }
        /* 
Promise原型对象的then()
指定成功和失败的回调函数
返回一个新的promise对象
返回promise的结果由onResolved/onRejected执行结果决定
*/
        then(onResolved, onRejected) {

            onResolved = typeof onResolved === 'function' ? onResolved : value => value //向后传递成功的value
            //指定默认的失败的回调(实现错误/异常传透的关键点)
            // onRejected = typeof onRejected === 'function' ? onRejected : reason => Promise.reject(reason)
            onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason } //向后传递失败的reason

            const self = this

            //返回一个新的promise对象
            return new Promise((resolve, reject) => {
                //调用指定的回调函数处理，根据执行结果，改变promise的状态
                function handle(callback) {
                    /* 
                        1.如果抛出异常，return的promise就会失败，reason就是error
                        2.如果回调函数执行返回非promise，return的promise就会成功，value就是返回的值
                        3.如果回调函数返回的是promise，return的promise结果就是根据这个promise的结果
                        */
                    try {
                        const result = callback(self.data)
                        if (result instanceof Promise) {
                            //3.如果回调函数返回的是promise，return的promise结果就是根据这个promise的结果
                            /* result.then(
                                value =>
                                    resolve(value)//当result成功时，让return的promise也成功
                                ,
                                reason =>
                                    reject(reason)//当result失败时，让return的promise也失败
                            ) */
                            result.then(resolve, reject)
                        } else {
                            //2.如果回调函数执行返回非promise，return的promise就会成功，value就是返回的值
                            resolve(result)
                        }
                    } catch (error) {
                        //1.如果抛出异常，return的promise就会失败，reason就是error
                        reject(error)
                    }
                }
                //当前状态还是pending状态，将回调函数保存起来
                if (self.status === PENDING) {
                    self.callbacks.push({
                        onResolved(value) {
                            handle(onResolved)
                        },
                        onRejected(reason) {
                            handle(onRejected)
                        }
                    })
                } else if (self.status === RESOLVED) {
                    //当前状态是resolved状态，异步执行onResilve并改变并改变return的Promise状态
                    setTimeout(() => {
                        handle(onResolved)
                    })
                } else {
                    //当前状态是rejected状态，异步执行onRejected并改变并改变return的Promise状态
                    setTimeout(() => {
                        handle(onRejected)
                    })
                }
            })
        }
        /* 
        Promise原型对象的catch()
        指定失败和函数的回调函数
        返回一个新的promise对象
         */
        catch(onRejected) {
            return this.then(undefined, onRejected)
        }
        /* 
        Promise函数对象的resolve方法
        返回一个指定value的成功的promise
        */
        static resolve = function (value) {
            //返回一个成功/失败的promise
            return new Promise((resolve, reject) => {
                //value是promise 
                if (value instanceof Promise) {
                    //使用value的结果作为promise的结果
                    value.then(resolve, reject)
                } else {
                    //value不是promise => promise变为成功，数据是value
                    resolve(value)
                }
            })
        }
        /* 
        Promise函数对象的reject方法
        返回一个指定reason的失败的promise
        */
        static reject = function (reason) {
            //返回一个失败的promise
            return new Promise((resolve, reject) => {
                reject(reason)
            })
        }
        /* 
        Promise函数对象的all方法
        返回一个promise,只有当所有promise都成功时才成功，否则只要有一个失败则失败
        */
        static all = function (promises) {
            //用来保存所有成功value的数组
            const values = new Array(promises.length)
            //用来保存成功promise的数量
            let resolveCount = 0
            return new Promise((resolve, reject) => {
                //遍历获取每个promise的结果
                promises.forEach((p, index) => {
                    Promise.resolve(p).then(
                        value => {
                            resolveCount++
                            //p成功，将成功的value保存values
                            //values.push(value)
                            values[index] = value
                            //如果全部成功，将return的promise改为成功
                            if (resolveCount === promises.length) {
                                resolve(values)
                            }
                        },
                        reason => {
                            //只要有一个失败则整个都失败
                            reject(reason)
                        }
                    )
                })
            })
        }
        /* 
        Promise函数对象的reace方法
        返回一个promise，其结果由第一个完成的promise决定
        */
        static race = function (promises) {
            return new Promise((resolve, reject) => {
                //遍历获取每个promise的结果
                promises.forEach((p, index) => {
                    Promise.resolve(p).then(
                        value => {
                            //一旦有成功，将return变为成功
                            resolve(value)
                        },
                        reason => {
                            //只要有一个失败则整个都失败
                            reject(reason)
                        }
                    )
                })
            })
        }

        /* 
        返回一个promise对象，它在指定时间后才返回结果
        */
        static resolveDelay = function (value, time) {
            //返回一个成功/失败的promise
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    //value是promise 
                    if (value instanceof Promise) {
                        //使用value的结果作为promise的结果
                        value.then(resolve, reject)
                    } else {
                        //value不是promise => promise变为成功，数据是value
                        resolve(value)
                    }
                }, time)
            })
        }

        /* 
        返回一个promise对象，它在指定时间后才返回结果
        */
        static rejectDelay = function (reason, time) {
            //返回一个失败的promise
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(reason)
                }, time)
            })
        }
    }



    //向外暴露Promise函数
    window.Promise = Promise
})(window)
```

## 4.async与await
### 4.1 mdn 文档
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async function
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await
### 4.2 async函数
- 函数的返回值为promise对象
- promise对象的结果由async函数执行的返回值决定
### 4.3 await表达式
- await右侧的表达式一般为promise对象，但也可以是其它的值
- 如果表达式是promise对象，await返回的是promise成功的值

## 5.JS异步之宏队列与微队列
### 5.1 原理图
![](https://img2022.cnblogs.com/blog/2332774/202207/2332774-20220703230819940-1180436756.png)
### 5.2 说明
- js中用来存储待执行回调 函数的队列包含2个不同特定的列队
- 宏列队:用来保存待执行的宏任务(回调)，比如:定时器回调/DOM事件回调/ajax回调
- 微列队:用来保存待执行的微任务(回调)，比如: promise的回调/MutationObserver的回调
- js执行时会区别这2个队列
    - (1)JS引擎首先必须先执行所有的初始化同步任务代码
    - (2)每次准备取出第一个宏任务执行前，都要将所有的微任务一个一个取出来执行
