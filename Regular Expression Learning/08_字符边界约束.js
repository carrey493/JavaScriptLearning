let str = 'd45sads4'
console.log(/\d/.test(str));//true 包含数字
console.log(/^\d/.test(str));//false 以数字开头

let str2 = '45d45sads4fv'
console.log(/^\d/.test(str2));//true  ^ 以数字开头
console.log(/\d$/.test(str2));//false $ 以数字结尾 
console.log(/^\d$/.test(str2));//false 起始、结尾都是数字

// /^[a-z]{3,6}$/ 起始到结束是3-6位的字母