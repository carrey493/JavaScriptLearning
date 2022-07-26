// \w 包括\d 匹配字母数字下划线
let hd = 'houdunren_2020'
console.log(hd.match(/\d+/));//2020
console.log(hd.match(/\w+/));//houdunren_2020

let email = '2577632085@qq.com'
console.log(email.match(/\w@\w/));//5@q
console.log(email.match(/\w+@\w+/));//2577632085@qq
console.log(email.match(/\w+@\w+\.\w+/));//2577632085@qq.com

let email2 = '@##￥@@2577632085@qq.com'
//$ 以...结束 ^以...开始
console.log(email2.match(/\w+@\w+\.\w+$/));//2577632085@qq.com

// \W 除了字母数字下划线
console.log(email.match(/\W/));//@

console.log(email.match(/^[a-z]\w{4,9}$/));//null


