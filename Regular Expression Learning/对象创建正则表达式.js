let a = '@'
let reg = new RegExp(a,'g')
let ex = 'houdunren.com'
console.log(reg.test(ex));//false

//检测高亮
let con  = prompt('请输入要检测的内容，支持正则。')
//输入u则替换输入内容的u /w：把所有字母数字下划线替换
let reg2 = new RegExp(con,'g')
let div = document.querySelector('div')
div.innerHTML = div.innerHTML.replace(reg2,search=>{
    return `<span style="color:red>${search}</span>`
})
