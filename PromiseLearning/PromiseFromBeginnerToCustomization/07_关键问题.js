//1.如何改变promise的状态
const p = new Promise((resolve, reject) => {
    // resolve(1)// promise变为resolved成功状态
    // reject(2) // promise变为rejected成功状态
    // throw new Error('出错了！') //程序执行抛出异常 promise变为rejected reason为抛出的error
    throw 'error'
    //可以抛出任何
})
p.then(
    value => { },
    reason => { console.log('reason', reason); }
)

//2.一个promise指定多个成功/失败回调函数，都会调用吗
p.then(
    value => { },
    reason => { console.log('reason2', reason); }
)

//3.改变promise状态和指定回调函数谁先谁后
//先指定回调函数后改变状态
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {//后改变回调函数(同时指定数据)，异步执行回调函数
        resolve(2)
    }, 1000)
}).then(//先指定回调函数，保存当前指定的回调函数
    value => { },
    reason => { }
)

//先改变状态后指定回调函数
const p3 = new Promise((resolve, reject) => {
    //先改变回调函数(同时指定数据)
    resolve(3)
}).then(//后指定回调函数
    value => { },
    reason => { }
)

const p4 = new Promise((resolve, reject) => {
    //先改变回调函数(同时指定数据)
    setTimeout(() => {//后改变回调函数(同时指定数据)，异步执行回调函数
        resolve(3)
    }, 1000)
})

setTimeout(() => {
    p4.then()
}, 1100)

//4.peomise.then()返回新的promise的结果状态由什么决定
new Promise((resolve, reject) => {
    resolve('p5true')
    // reject('p5false')
}).then(
    value => {
        console.log('onResolved1()', value);
        // return 'true'
        // return Promise.resolve(5)
        // return Promise.reject(5)
        throw 5
    },
    reason => {
        console.log('onRejected1()', reason);
    }
).then(
    value => {
        console.log('onResolved2()', value);
    },
    reason => {
        console.log('onRejected2()', reason);
    }
)

//5.promise如何串联多个操作任务
new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('执行异步任务一');
        resolve(1)
    }, 1000)
}).then(
    value => {
        console.log('任务一的结果：', value);
        console.log('执行同步任务二');
        return 2
    },
    reason => {
        console.log(reason);
    }
).then(
    value => {
        console.log('任务二的结果：', value);
        //启动异步任务三
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('执行异步任务三');
                resolve(3)
            }, 1000)
        })
    }
).then(
    value => {
        console.log('任务三的结果：', value);
    }
)

//6.promise异常传透
new Promise((resolve, reject) => {
    // resolve(61)
    reject(61)
}).then(
    value => {
        console.log('onResolved61', value);
        return 61
    },
    reason => { throw reason }
).then(
    value => {
        console.log('onResolved62', value);
        return 63
    },
    // reason => { throw reason }
    reason=> Promise.reject(reason)
).then(
    value => {
        console.log('onResolved63', value);
    },
    reason => { throw reason }
).catch(reason => {
    console.log('onRejected61', reason);
    // throw reason
    // return Promise.reject(reason)
    return new Promise(()=>{}) // 返回一个pendding的promise 中断promise链
}).then(
    value=>{
        console.log('onResolved()',value);
    },
    reason=>{
        console.log('onRejected()',reason);
    }
)