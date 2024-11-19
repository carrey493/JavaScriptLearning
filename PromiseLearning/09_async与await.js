//async函数的返回值是一个promise对象
//async函数返回的promise的结果由函数执行的结果决定
async function fn1() {
    // return 1 //Promise { 1 }
    // throw 2 //Promise { <rejected> 2 }
    // return Promise.resolve(3)
    // return Promise.reject(3)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(4)
        }, 3000)
    })
}

const result = fn1()
console.log(result);

result.then(
    value => {
        console.log('resolve', value);
    },
    reason => {
        console.log('reject', reason);
    }
)

function fn2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(5)
            reject(7)
        }, 1000)
    })
}

async function fn3() {
    //await 右侧表达式为promise得到的结果就是promise成功的value
    // const value = await fn2()//5
    try {
        const value = await fn2()
        console.log(value);
    } catch (error) {
        console.log('得到的失败的结果',error);
    }
    //await 右侧表达式不是promise,得到的结果就是表达式本身
    const value = await 6
    console.log(value);
}
fn3()