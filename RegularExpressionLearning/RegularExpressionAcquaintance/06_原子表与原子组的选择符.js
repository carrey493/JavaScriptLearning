// [] ()
let reg = /[123456]/
let hd = '1'
console.log(hd.match(reg));//[ '1', index: 0, input: '1', groups: undefined ]
let reg2 = /(12|34)/

let hd2 = '6358452245'
console.log(hd2.match(reg2));//null