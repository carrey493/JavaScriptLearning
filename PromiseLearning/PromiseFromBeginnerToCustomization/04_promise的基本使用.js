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