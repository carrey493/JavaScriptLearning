/* 
#### 1.2.1同步回调
- 理解：立即执行，完全执行完了才结束，不会放入回调队列中
- 例子：数组遍历相关的回调函数/Promise的excutor函数
 */
const arr = [1, 3, 5]
arr.forEach(item => { //遍历回调 同步回调函数
    console.log(item);
})
console.log('after forEach()');

/* 
#### 1.2.2异步回调
- 理解：不会立即执行，会放入回调队列中将来执行
- 例子：定时器回调./ajax回调/Promise的成功|失败的回调
 */
setTimeout(() => { //异步回调函数 会放在队列中将来执行
    console.log('time callback');
}, 0)
console.log('after timeout');

/* 
1
3
5
after forEach()
after timeout
time callback
*/