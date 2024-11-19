//1.常见的内置错误
// - RefrenceError:引用的变量不存在
// console.log(a); //ReferenceError: a is not defined
// - TypeError:数据类型不正确的错误
// let b = null
// console.log(b.xxx);//TypeError: Cannot read properties of null (reading 'xxx')
// - RangeError:数据值不在其所允许的范围内
// function fn(){
//     fn() //递归调用
// }
// fn() //RangeError: Maximum call stack size exceeded
// - SyntaxError:语法错误
// let c = """"// SyntaxError: Unexpected string

//2.错误处理
//捕获错误 try catch
try {
    let d

    console.log(d.xx);
} catch (error) {
    console.log(error);
}
//抛出错误 throw error
function something() {
    if (Date.now() % 2 === 1) {
        console.log('当前时间为奇数');
    } else {
        throw new Error('当前时间为偶数')
    }
}
try {
    something()
} catch (error2) {
    console.log(error2.message);
}
