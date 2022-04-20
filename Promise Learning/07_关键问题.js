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
p.then(
    value => { },
    reason => { console.log('reason2', reason); }
)