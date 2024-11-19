// lastindex：用于控制正则表达式开始搜索的位置

let hd = "houdunren";

console.log(hd.match(/\w/)); // [ 'h', index: 0, input: 'houdunren', groups: undefined ]

console.log(hd.match(/\w/g)); // ['h', 'o', 'u','d', 'u', 'n','r', 'e', 'n']

console.log(hd.match(/\w/g.exec(hd))); // [ 'h', index: 0, input: 'houdunren', groups: undefined ]

let reg = /\w/g;

// lastIndex可以获取上一次搜索结束的位置
console.log(reg.lastIndex); // 0
console.log(reg.exec(hd)); // [ 'h', index: 0, input: 'houdunren', groups: undefined ]
console.log(reg.lastIndex); // 1
console.log(reg.exec(hd)); // [ 'o', index: 1, input: 'houdunren', groups: undefined ]

while ((res = reg.exec(hd))) {
  console.log(res);
}
/* 
[ 'o', index: 1, input: 'houdunren', groups: undefined ]
[ 'u', index: 2, input: 'houdunren', groups: undefined ]
[ 'd', index: 3, input: 'houdunren', groups: undefined ]
[ 'u', index: 4, input: 'houdunren', groups: undefined ]
[ 'n', index: 5, input: 'houdunren', groups: undefined ]
[ 'r', index: 6, input: 'houdunren', groups: undefined ]
[ 'e', index: 7, input: 'houdunren', groups: undefined ]
[ 'n', index: 8, input: 'houdunren', groups: undefined ]
*/

// 不使用全局模式的时候  /\w/g lastindex 一直为0
