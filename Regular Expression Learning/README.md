# Regular expression related knowledge learning

### 正则表达式介绍

- 用途：字符串的增删改查 ：=> 更加强大、灵活

### 体验正则表达式

```js
let ex1 = 'houdunren123cms9988'
console.log([...ex1]);
let nums = [...ex1].filter(a => !Number.isNaN(parseInt(a)))
console.log(nums);
console.log(nums.join(''));

console.log(ex1.match(/\d/g).join('')); //1239988
```

### 字面量创建正则表达式

```js
let ex = 'exexex.com'
console.log(/e/.test(ex));//true

let a = 'e'
console.log(/a/.test(ex));//false
//不能识别变量

console.log(eval(`/${a}/`).test(ex));//true
//eval 把字符串变为js表达式
```

### 对象创建正则表达式

```js
let a = '@'
let reg = new RegExp(a,'g')
let ex = 'houdunren.com'
console.log(reg.test(ex));//false

//检测高亮
let con  = prompt('请输入要检测的内容，支持正则。')
let reg2 = new RegExp(con,'g')
let div = document.querySelector('div')
div.innerHTML = div.innerHTML.replace(reg2,search=>{
    return `<span style="color:red>${search}</span>`
})
```

### 选择符 |

```js
let hd = 'houdunren'

console.log(/a|@/.test(hd));//false
console.log(/u|@/.test(hd));//true

let tel = '010-9999999'
console.log(/010\-\d{7,8}|020\-\d{7,8}/.test(tel));//true
console.log(/(010|020)\-\d{7,8}/.test(tel));//true

```


