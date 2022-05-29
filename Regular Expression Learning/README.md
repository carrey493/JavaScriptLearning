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



