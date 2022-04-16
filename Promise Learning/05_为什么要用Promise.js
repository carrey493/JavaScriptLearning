//成功的回调函数
function successCallback(result) {
    console.log('文件创建成功' + result);
}
//失败的回调函数
function failureCallback(error) {
    console.log('文件创建失败' + error);
}

//1.1使用纯回调函数
createAudioFileAsync(audioSettings, successCallback, failureCallback)

//1.2使用Promise
const p = createAudioFileAsync(audioSettings)
setTimeout(() => {
    p.then(successCallback, failureCallback)
}, 3000)

//2.1回调地狱
doSomething(function (result) {
    doSomethingElse(result, function (finalResult) {
        doThirdThing(newResult, function (finalResult) {
            console.log('Get the final result:' + finalResult);
        }, failureCallback)
    }, failureCallback)
}, failureCallback)

//2.2使用promise的链式调用解决回调地狱
doSomething().then(function (result) {
    return doSomethingElse(result)
})
    .then(function (newResult) {
        return doThirdThing(newResult)
    })
    .then(function (finalResult) {
        console.log('Get the final result' + finalResult);
    })
    .catch(failureCallback) //异常穿透

//2.3 async/await: 回调地狱的终极解决方案
async function request() {
    try {
        const result = await doSomething()
        const newResult = await doSomethingElse(result)
        const finalResult = await doThirdThing(newResult)
        console.log('Get the final result' + finalResult);
    } catch (error) {
        failureCallback(error)
    }

}