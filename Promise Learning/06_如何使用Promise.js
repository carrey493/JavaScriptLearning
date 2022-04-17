new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功的数据')
        //reject('失败的数据') (无意义 状态只改变一次)
    }, 1000)
}).then(value => {
    console.log('onResolve', value);
}).catch(reason => {
    console.log('onRejected', reason);
})

//产生一个成功值为1的promise的对象
const p1 = new Promise((resolve, reject) => {
    resolve(1)
})
const p2 = Promise.resolve(2)
const p3 = Promise.reject(3)

p1.then(value => { console.log(value); })
p2.then(value => { console.log(value); })
p3.catch(reason => { console.log(reason); })