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

### 原子表与原子组的选择符

```js
let hd = 'houdunren'

console.log(/a|@/.test(hd));//false
console.log(/u|@/.test(hd));//true

let tel = '010-9999999'
console.log(/010\-\d{7,8}|020\-\d{7,8}/.test(tel));//true
console.log(/(010|020)\-\d{7,8}/.test(tel));//true

```

### 转义

```js
let price1 = '23854.@$5'
//. 除换行外任何字符
console.log(/\d+.\d/.test(price1));//true

//普通字符点.
let price2 = '23854.5'

console.log(/\d+\.\d/.test(price2));//true

let price3 = '12.23'
console.log('\d+\.\d+');//d+.d+
let reg = new RegExp('\d+\.\d+');//d+.d+
console.log(reg.test(price3));//false

let reg2 = new RegExp('\\d+\\.\\d+');//
console.log(reg.test(price3));//false

let url = 'https:www.houdunren.com'
console.log(/https?:\/\/\w+\.\w+\.\w+/.test(url));

```

### 字符边界约束
```js
let str = 'd45sads4'
console.log(/\d/.test(str));//true 包含数字
console.log(/^\d/.test(str));//false 以数字开头

let str2 = '45d45sads4fv'
console.log(/^\d/.test(str2));//true  ^ 以数字开头
console.log(/\d$/.test(str2));//false $ 以数字结尾 
console.log(/^\d$/.test(str2));//false 起始、结尾都是数字

// /^[a-z]{3,6}$/ 起始到结束是3-6位的字母
```

### 元字符与空白
```js
//元字符 最小单位字符，表示一类字符中的最小一个
let hd = 'houdunren 2010'
console.log(hd.match(/\d/));//2
console.log(hd.match(/\d\d\d/));//201

console.log(hd.match(/\d/g));// 2 0 1 0

console.log(hd.match(/\d+/g));// 2010

let str1 ='张三：010-9999799,李四：020-8875888'
console.log(str1.match(/\d{3}-\d{7,8}/g));//[ '010-9999799', '020-8875888' ]

// /D 匹配除了数字
let str2 = 'asdhj2014  dwa'
console.log(str2.match(/\D+/));//asdhj

let str3 ='张三：010-9999799,李四：020-8875888'
console.log(str3.match(/[-\d：,]/g));
//
/* [
    '：', '0',  '1', '0', '-', '9',
    '9',  '9',  '9', '7', '9', '9',
    ',',  '：', '0', '2', '0', '-',
    '8',  '8',  '7', '5', '8', '8',
    '8'
  ] */

//[^]除了匹配到的剩下都要
console.log(str3.match(/[^-\d：,]+/g));//[ '张三', '李四' ]

//空白 \s  包含空格 换行符
console.log(/\s/.test('hd'));//false
console.log(/\s/.test(' hd'));//true
console.log(/\s/.test('\nhd'));//true

// \S 除了空白
console.log(/\S/.test(' hd'));//true
```