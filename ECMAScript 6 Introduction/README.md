# ECMAScript 6 入门

## 2.let 和const命令

### 1.let命令

#### 1.基本用法

**ES6 新增了`let`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效。**

```js
{
    let a = 10;
    var b = 1;
}
/* console.log(a);//a is not defined */
console.log(b); //1
```

- `for`循环的计数器，就很合适使用`let`命令。
- 变量`i`是`var`命令声明的，在全局范围内都有效，所以全局只有一个变量`i`。每一次循环，变量`i`的值都会发生改变，而循环内被赋给数组`a`的函数内部的`console.log(i)`，里面的`i`指向的就是全局的`i`。也就是说，所有数组`a`的成员里面的`i`，指向的都是同一个`i`，导致运行时输出的是最后一轮的`i`的值
- 变量`i`是`let`声明的，当前的`i`只在本轮循环有效，所以每一次循环的`i`其实都是一个新的变量，所以最后输出的是`6`。你可能会问，如果每一轮循环的变量`i`都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量`i`时，就在上一轮循环的基础上进行计算。
- 函数内部的变量`i`与循环变量`i`不在同一个作用域，有各自单独的作用域（同一个作用域不可使用 `let` 重复声明同一个变量）。

#### 2.不存在变量提升

**“变量提升”现象，即变量可以在声明之前使用，值为`undefined`。**

**let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。**

```js
console.log(foo);
var foo = 2; //undefined

console.log(bar);
let bar = 2; //bar is not defined
```

#### 3.暂时性死区

**只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。**

```js
var tmp = 123;
    if (true) {
        tmp = "abc";
        let tmp;
}//Cannot access 'tmp' before initialization
```

- 如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
- 在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

```js
if (true) {
      // TDZ开始
      tmp = 'abc'; // ReferenceError
      console.log(tmp); // ReferenceError

      let tmp; // TDZ结束
      console.log(tmp); // undefined

      tmp = 123;
      console.log(tmp); // 123
}
```

- “暂时性死区”也意味着`typeof`不再是一个百分之百安全的操作。

```js
typeof x; // ReferenceError
let x;
typeof undeclared_variable // "undefined"
```

```js
// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined
```

- 使用`let`声明变量时，只要变量在还没有声明完成前使用，就会报错。
- ES6 规定暂时性死区和`let`、`const`语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。
- 暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

#### 4.不允许重复使用

**let不允许在相同作用域内，重复声明同一个变量。**

- 因此，不能在函数内部重新声明参数。

### 2.块级作用域

#### 1.为什么需要

- 内层变量可能会覆盖外层变量
- 用来计数的循环变量泄露为全局变量

#### 2.ES6的块级作用域

**let实际上为 JavaScript 新增了块级作用域。**

```js
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); 
}
f1()//5
```

- 外层代码块不受内层代码块的影响。如果两次都使用`var`定义变量`n`，最后输出的值才是 10

 **ES6允许块级作用域的任意嵌套。**

```js
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};
```

- 上面代码使用了一个五层的块级作用域，每一层都是一个单独的作用域。第四层作用域无法读取第五层作用域的内部变量。

**内层作用域可以定义外层作用域的同名变量。**

```js
{{{{  let insane = 'Hello World';  {let insane = 'Hello World'}}}}};
```

- 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。

#### 3.块级作用域与函数说明*

**允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于`let`，在块级作用域之外不可引用。**

- 允许在块级作用域内声明函数。
- 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

```js
// 块级作用域内部的函数声明语句，建议不要使用{  let a = 'secret';  function f() {    return a;  }}// 块级作用域内部，优先使用函数表达式{  let a = 'secret';  let f = function () {    return a;  };}
```

**ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。**

```js
// 第一种写法，报错if (true) let x = 1;// 第二种写法，不报错if (true) {  let x = 1;}
```

- 上面代码中，第一种写法没有大括号，所以不存在块级作用域，而`let`只能出现在当前作用域的顶层，所以报错。第二种写法有大括号，所以块级作用域成立。

**函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。**

### 3.const命令

#### 1.基本用法

**const声明一个只读的常量。一旦声明，常量的值就不能改变。**

```js
const PI = 3.1415;PI // 3.1415PI = 3;// TypeError: Assignment to constant variable.
```

**const一旦声明变量，就必须立即初始化，不能留到以后赋值。**

```js
const foo;// SyntaxError: Missing initializer in const declaration
```

**const的作用域与let命令相同：只在声明所在的块级作用域内有效。**

```js
if (true) {  const MAX = 5;}MAX // Uncaught ReferenceError: MAX is not defined
```

**const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。**

```js
if (true) {  console.log(MAX); // ReferenceError  const MAX = 5;}
```

**const声明的常量，也与let一样不可重复声明。**

```js
var message = "Hello!";let age = 25;// 以下两行都会报错const message = "Goodbye!";const age = 30;
```

#### 2.本质

**const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。**

- 对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
- 但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。
- 因此，将一个对象声明为常量必须非常小心。

```js
const foo = {};// 为 foo 添加一个属性，可以成功foo.prop = 123;foo.prop // 123// 将 foo 指向另一个对象，就会报错foo = {}; // TypeError: "foo" is read-onlyconst a = [];a.push('Hello'); // 可执行a.length = 0;    // 可执行a = ['Dave'];    // 报错
```

- 即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

**如果真的想将对象冻结，应该使用`Object.freeze`方法。**

```js
const foo = Object.freeze({});// 常规模式时，下面一行不起作用；// 严格模式时，该行会报错foo.prop = 123;
```

- 常量`foo`指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

**除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。**

```js
var constantize = (obj) => {  Object.freeze(obj);  Object.keys(obj).forEach( (key, i) => {    if ( typeof obj[key] === 'object' ) {      constantize( obj[key] );    }  });};
```

#### 3.ES6声明变量的六种方法

- ES5 只有两种声明变量的方法：`var`命令和`function`命令。ES6 除了添加`let`和`const`命令，另外两种声明变量的方法：`import`命令和`class`命令。所以，ES6 一共有 6 种声明变量的方法。

### 4.顶层对象的属性

**顶层对象，在浏览器环境指的是`window`对象，在 Node 指的是`global`对象。**

- ES6 为了改变这一点，一方面规定，为了保持兼容性，`var`命令和`function`命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```js
var a = 1;// 如果在 Node 的 REPL 环境，可以写成 global.a// 或者采用通用方法，写成 this.awindow.a // 1let b = 1;window.b // undefined
```

- 上面代码中，全局变量`a`由`var`命令声明，所以它是顶层对象的属性；全局变量`b`由`let`命令声明，所以它不是顶层对象的属性，返回`undefined`。

### 5.globalThis对象*

**JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。**

- 浏览器里面，顶层对象是`window`，但 Node 和 Web Worker 没有`window`。
- 浏览器和 Web Worker 里面，`self`也指向顶层对象，但是 Node 没有`self`。
- Node 里面，顶层对象是`global`，但其他环境都不支持

**同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用`this`关键字，但是有局限性。**

- 全局环境中，`this`会返回顶层对象。但是，Node.js 模块中`this`返回的是当前模块，ES6 模块中`this`返回的是`undefined`。
- 函数里面的`this`，如果函数不是作为对象的方法运行，而是单纯作为函数运行，`this`会指向顶层对象。但是，严格模式下，这时`this`会返回`undefined`。
- 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么`eval`、`new Function`这些方法都可能无法使用。

**综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。**

**[ES2020](https://github.com/tc39/proposal-global) 在语言标准的层面，引入`globalThis`作为顶层对象。也就是说，任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象，指向全局环境下的`this`。**

