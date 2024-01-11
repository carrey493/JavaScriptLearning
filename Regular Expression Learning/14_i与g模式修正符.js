// 改变正则表达式的运行方式
let hd = "houdren";

console.log(hd.match(/u/)); //[ 'u', index: 2, input: 'houduren', groups: undefined ]

let hd1 = "hoUdren";

console.log(hd1.match(/u/)); //null

//如果不区分大小写

console.log(hd1.match(/u/i)); //[ 'U', index: 2, input: 'hoUdren', groups: undefined ]

let hd2 = "hoUdrueUn";

// 不区分大小写并全局匹配
console.log(hd2.match(/u/gi)); //[ 'U', 'u', 'U' ]
console.log(hd2.replace(/u/gi, "@")); //ho@dr@e@n
