let hd = 'houdunren'

console.log(/a|@/.test(hd));//false
console.log(/u|@/.test(hd));//true

let tel = '010-9999999'
console.log(/010\-\d{7,8}|020\-\d{7,8}/.test(tel));//true
console.log(/(010|020)\-\d{7,8}/.test(tel));//true
