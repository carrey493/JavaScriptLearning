# ECMAScript 6 入门

## 0.前言

## 1.ECMAScript6简介

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
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};
```

- 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。

#### 3.块级作用域与函数说明*

**允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于`let`，在块级作用域之外不可引用。**

- 允许在块级作用域内声明函数。
- 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

```js
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```

**ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。**

```js
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}
```

- 上面代码中，第一种写法没有大括号，所以不存在块级作用域，而`let`只能出现在当前作用域的顶层，所以报错。第二种写法有大括号，所以块级作用域成立。

**函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。**

### 3.const命令

#### 1.基本用法

**const声明一个只读的常量。一旦声明，常量的值就不能改变。**

```js
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

**const一旦声明变量，就必须立即初始化，不能留到以后赋值。**

```js
const foo;
// SyntaxError: Missing initializer in const declaration
```

**const的作用域与let命令相同：只在声明所在的块级作用域内有效。**

```js
if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined
```

**const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。**

```js
if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
```

**const声明的常量，也与let一样不可重复声明。**

```js
var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```

#### 2.本质

**const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。**

- 对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
- 但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。
- 因此，将一个对象声明为常量必须非常小心。

```js
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only

const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```

- 即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

**如果真的想将对象冻结，应该使用`Object.freeze`方法。**

```js
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

- 常量`foo`指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

**除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。**

```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

#### 3.ES6声明变量的六种方法

- ES5 只有两种声明变量的方法：`var`命令和`function`命令。ES6 除了添加`let`和`const`命令，另外两种声明变量的方法：`import`命令和`class`命令。所以，ES6 一共有 6 种声明变量的方法。

### 4.顶层对象的属性

**顶层对象，在浏览器环境指的是`window`对象，在 Node 指的是`global`对象。**

- ES6 为了改变这一点，一方面规定，为了保持兼容性，`var`命令和`function`命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```js
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
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

## 3.变量的解构赋值

### 1.数组的解构赋值

#### 1.基本用法

- ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）
- 可以从数组中提取值，按照对应位置，对变量赋值

```js
let [a,b,c]= [1,2,3]
console.log(a,b,c);//1 2 3
let [a1,[[b1,b2],[c1,c2],d1],e1]=[1,[[2,3],[4,5],6],7]
console.log([a1,[[b1],[c1],d1],e1]);//(3) [1,Array(3), 7]
```

- 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

```js
let [ , , third] = ['1','2','3']
console.log(third);//3
let [x,,y] = [1,2,3]
console.log(x,y);//1 3
let [head,...tail] = [1,2,3,4]
console.log(head,tail);//1 (3) [2, 3, 4]
let [a2,b2,...c2] = ['a']
console.log(a2,b2,c2);//a undefined []
```

- 如果解构不成功，变量的值就等于`undefined`。

```js
let [foo] = [];
let [bar, foo] = [1]
```

- 另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。

```js
let [a3,b3] = [1,2,3]
console.log(a3,b3);//1 2
```

- 如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。
- 语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。

```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

- 对于 Set 结构，也可以使用数组的解构赋值。

```js
let [x, y, z] = new Set(['a', 'b', 'c']);
console.log(x1,y1,z1);//a b c
```

- 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
- `fibs`是一个 Generator 函数，原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。

```js
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
```

#### 2.默认值

**解构赋值允许指定默认值。**

```js
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

- 注意，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，只有当一个数组成员严格等于`undefined`，默认值才会生效。
- 如果一个数组成员是`null`，默认值就不会生效，因为`null`不严格等于`undefined`。

```js
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

- 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
- 因为`x`能取到值，所以函数`f`根本不会执行。

```js
function f() {
  console.log('aaa');
}
let [x = f()] = [1];
```

- 上面的代码其实等价于下面的代码。

```js
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

- 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```js
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

### 2.对象的解构赋值

#### 1.简介

- 解构不仅可以用于数组，还可以用于对象。

```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"
```

- 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
- 第一个例子，等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。第二个例子的变量没有对应的同名属性，导致取不到值，最后等于`undefined`。

```js
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```

- 如果解构失败，变量的值等于`undefined`。
- 等号右边的对象没有`foo`属性，所以变量`foo`取不到值，所以等于`undefined`。

```js
let {foo} = {bar: 'baz'};
foo // undefined
```

- 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
- 例一将`Math`对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。例二将`console.log`赋值到`log`变量。

```js
// 例一
let { log, sin, cos } = Math;

// 例二
const { log } = console;
log('hello') // hello
```

- 如果变量名与属性名不一致，必须写成下面这样。

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

- 这实际上说明，对象的解构赋值是下面形式的简写

```js
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
```

- 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined
```

- 上面代码中，`foo`是匹配的模式，`baz`才是变量。真正被赋值的是变量`baz`，而不是模式`foo`。
- 与数组一样，解构也可以用于嵌套结构的对象。

```js
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
```

- 这时`p`是模式，不是变量，因此不会被赋值。如果`p`也要作为变量赋值，可以写成下面这样。

```js
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```

```js
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}
```

- 上面代码有三次解构赋值，分别是对`loc`、`start`、`line`三个属性的解构赋值。注意，最后一次对`line`属性的解构赋值之中，只有`line`是变量，`loc`和`start`都是模式，不是变量。
- 下面是嵌套赋值的例子。

```js
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj // {prop:123}
arr // [true]
```

- 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。

```js
// 报错
let {foo: {bar}} = {baz: 'baz'};
```

- 上面代码中，等号左边对象的`foo`属性，对应一个子对象。该子对象的`bar`属性，解构时会报错。原因很简单，因为`foo`这时等于`undefined`，再取子属性就会报错。
- 注意，对象的解构赋值可以取到继承的属性。

```js
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);

const { foo } = obj1;
foo // "bar"
```

- 上面代码中，对象`obj1`的原型对象是`obj2`。`foo`属性不是`obj1`自身的属性，而是继承自`obj2`的属性，解构赋值可以取到这个属性。

#### 2.默认值

- 对象的解构也可以指定默认值。

```js
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```

- 默认值生效的条件是，对象的属性值严格等于`undefined`。

```js
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

- 上面代码中，属性`x`等于`null`，因为`null`与`undefined`不严格相等，所以是个有效的赋值，导致默认值`3`不会生效

#### 3.注意点

- （1）如果要将一个已经声明的变量用于解构赋值，必须非常小心。

```js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
```

- 上面代码的写法会报错，因为 JavaScript 引擎会将`{x}`理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

```js
// 正确的写法
let x;
({x} = {x: 1});
```

- 上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。
- （2）解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。

```js
({} = [true, false]);
({} = 'abc');
({} = []);
```

- 上面的表达式虽然毫无意义，但是语法是合法的，可以执行。
- (3）由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

```js
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

- 上面代码对数组进行对象解构。数组`arr`的`0`键对应的值是`1`，`[arr.length - 1]`就是`2`键，对应的值是`3`。方括号这种写法，属于“属性名表达式”

### 3.字符串的解构赋值

- 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

- 类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

```js
let {length : len} = 'hello';
len // 5
```

### 4.数组和布尔值的解构赋值

- 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

- 上面代码中，数值和布尔值的包装对象都有`toString`属性，因此变量`s`都能取到值。

  解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

### 5.函数参数的解构赋值

- 函数的参数也可以使用解构赋值。

```js
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3
```

- 上面代码中，函数`add`的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量`x`和`y`。对于函数内部的代码来说，它们能感受到的参数就是`x`和`y`。
- 下面是另一个例子。

```js
[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```

- 函数参数的解构也可以使用默认值。

```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

- 上面代码中，函数`move`的参数是一个对象，通过对这个对象进行解构，得到变量`x`和`y`的值。如果解构失败，`x`和`y`等于默认值。
- 注意，下面的写法会得到不一样的结果。

```js
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

- 上面代码是为函数`move`的参数指定默认值，而不是为变量`x`和`y`指定默认值，所以会得到与前一种写法不同的结果。
- `undefined`就会触发函数参数的默认值。

```js
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

### 6.圆括号问题

- 解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。
- 由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
- 但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

#### 1.不能使用圆括号的情况

- 以下三种解构赋值不得使用圆括号。
- （1）变量声明语句

```js
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
```

- 上面 6 个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号。
- （2）函数参数
- 函数参数也属于变量声明，因此不能带有圆括号。

```js
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
```

- （3）赋值语句的模式

```js
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
```

- 上面代码将整个模式放在圆括号之中，导致报错。

```js
// 报错
[({ p: a }), { x: c }] = [{}, {}];
```

- 上面代码将一部分模式放在圆括号之中，导致报错。

#### 2.可以使用圆括号的情况

- 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

```js
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

- 上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是`p`，而不是`d`；第三行语句与第一行语句的性质一致。

### 7.用途

- 变量的解构赋值用途很多。

#### 1.交换变量的值

```js
let x = 1;
let y = 2;

[x, y] = [y, x];
```

- 上面代码交换变量`x`和`y`的值，这样的写法不仅简洁，而且易读，语义非常清晰。

#### 2.从函数返回多个值

- 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

```js
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

#### 3.函数参数的定义

- 解构赋值可以方便地将一组参数与变量名对应起来。

#### 4.提取JSON数据

- 解构赋值对提取 JSON 对象中的数据，尤其有用。

```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

- 上面代码可以快速提取 JSON 数据的值。

#### 5.函数参数的默认值

```js
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

- 指定参数的默认值，就避免了在函数体内部再写`var foo = config.foo || 'default foo';`这样的语句。

#### 6.遍历Map结构

- 任何部署了 Iterator 接口的对象，都可以用`for...of`循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

- 如果只想获取键名，或者只想获取键值，可以写成下面这样。

```js
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}

```

#### 7.输入模块的指定方法

- 加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```

## 4.字符串的扩展

### 1.字符的Unicode表示法

- ES6 加强了对 Unicode 的支持，允许采用`\uxxxx`形式表示一个字符，其中`xxxx`表示字符的 Unicode 码点。

- ```js
  console.log('\u0061')
  //a
  ```


### 2.字符串的遍历器接口

- ES6 为字符串添加了遍历器接口，使得字符串可以被`for...of`循环遍历。

```js
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```

- 除了遍历字符串，这个遍历器最大的优点是可以识别大于`0xFFFF`的码点，传统的`for`循环无法识别这样的码点。

### 3.直接输入u+2028和u+2029

### 4.JSON.stringify()的改造

### 5.模板字符串

- 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```js
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```

- 上面代码中的模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。

```js
let greeting = `\`Yo\` World!`;
```

- 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。

```js
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());

```

- 上面代码中，所有模板字符串的空格和换行，都是被保留的，比如`<ul>`标签前面会有一个换行。如果你不想要这个换行，可以使用`trim`方法消除它。
- 模板字符串中嵌入变量，需要将变量名写在`${}`之中。

```js
function authorize(user, action) {
  if (!user.hasPrivilege(action)) {
    throw new Error(
      // 传统写法为
      // 'User '
      // + user.name
      // + ' is not authorized to do '
      // + action
      // + '.'
      `User ${user.name} is not authorized to do ${action}.`);
  }
}
```

- 大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。

```js
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"
```

- 模板字符串之中还能调用函数。

```js
function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar
```

- 如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的`toString`方法。
- 如果模板字符串中的变量没有声明，将报错。

```js
// 变量place没有声明
let msg = `Hello, ${place}`;
// 报错
```

- 由于模板字符串的大括号内部，就是执行 JavaScript 代码，因此如果大括号内部是一个字符串，将会原样输出。

```js
`Hello ${'World'}`
// "Hello World"
```

- 模板字符串甚至还能嵌套。

```js
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
```

- 上面代码中，模板字符串的变量之中，又嵌入了另一个模板字符串，使用方法如下

```js
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>
```

- 如果需要引用模板字符串本身，在需要时执行，可以写成函数。

```js
let func = (name) => `Hello ${name}!`;
func('Jack') // "Hello Jack!"
```

### 6.模板编译

### 7.标签模板

### 8.模板字符串的限制

- 前面提到标签模板里面，可以内嵌其他语言。但是，模板字符串默认会将字符串转义，导致无法嵌入其他语言。

## 5.字符串的新增方法

### 1.String.fromCodePoint()

- ES5 提供`String.fromCharCode()`方法，用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于`0xFFFF`的字符。

### 2.String.raw()

- ES6 还为原生的 String 对象，提供了一个`raw()`方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
- `String.raw()`方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用
- `String.raw()`本质上是一个正常的函数，只是专用于模板字符串的标签函数。如果写成正常函数的形式，它的第一个参数，应该是一个具有`raw`属性的对象，且`raw`属性的值应该是一个数组，对应模板字符串解析后的值。

### 3.实例方法：codePointAt()

- JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为`2`个字节。对于那些需要`4`个字节储存的字符（Unicode 码点大于`0xFFFF`的字符），JavaScript 会认为它们是两个字符
- `codePointAt()`方法返回的是码点的十进制值，如果想要十六进制的值，可以使用

### 4.实例方法：normalize()

- ES6 提供字符串实例的`normalize()`方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
- `normalize`方法可以接受一个参数来指定`normalize`的方式，参数的四个可选值如下。
  - `NFC`，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
  - `NFD`，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
  - `NFKC`，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，`normalize`方法不能识别中文。）
  - `NFKD`，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

### 5.实例方法：includes(), startsWith(), endsWith()

- 传统上，JavaScript 只有`indexOf`方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。
  - **includes()**：返回布尔值，表示是否找到了参数字符串。
  - **startsWith()**：返回布尔值，表示参数字符串是否在原字符串的头部。
  - **endsWith()**：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```

- 这三个方法都支持第二个参数，表示开始搜索的位置。

```js
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

- 上面代码表示，使用第二个参数`n`时，`endsWith`的行为与其他两个方法有所不同。它针对前`n`个字符，而其他两个方法针对从第`n`个位置直到字符串结束。

### 6.实例方法：repeat()

- `repeat`方法返回一个新字符串，表示将原字符串重复`n`次。

```js
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

- 参数如果是小数，会被取整。

```js
'na'.repeat(2.9) // "nana"
```

- 但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于`-0`，`repeat`视同为 0。

```js
'na'.repeat(-0.9) // ""
```

- 参数`NaN`等同于 0。
- 如果`repeat`的参数是字符串，则会先转换成数字。

### 7.实例方法：padStart(),padEnd()

- ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()`用于头部补全，`padEnd()`用于尾部补全。

```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba
```

- 上面代码中，`padStart()`和`padEnd()`一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。
- 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。

```js
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'
```

- 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。

```js
'abc'.padStart(10, '0123456789')
// '0123456abc'
```

- 如果省略第二个参数，默认使用空格补全长度。

```js
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
```

- `padStart()`的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。

```js
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```

- 另一个用途是提示字符串格式。

```js
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

### 8.实例方法：trimStart()，trimEnd()

- [ES2019](https://github.com/tc39/proposal-string-left-right-trim) 对字符串实例新增了`trimStart()`和`trimEnd()`这两个方法。它们的行为与`trim()`一致，`trimStart()`消除字符串头部的空格，`trimEnd()`消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

```js
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```

- 上面代码中，`trimStart()`只消除头部的空格，保留尾部的空格。`trimEnd()`也是类似行为。
- 除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。
- 浏览器还部署了额外的两个方法，`trimLeft()`是`trimStart()`的别名，`trimRight()`是`trimEnd()`的别名。

### 9.实例方法：matchAll() 

- `matchAll()`方法返回一个正则表达式在当前字符串的所有匹配，详见《正则的扩展》的一章。

### 10.实例方法：replaceAll()

- 字符串的实例方法`replace()`只能替换第一个匹配。

```js
'aabbcc'.replace('b', '_')
// 'aa_bcc'
```

- 如果要替换所有的匹配，不得不使用正则表达式的`g`修饰符。

```js
'aabbcc'.replace(/b/g, '_')
// 'aa__cc'
```

- [ES2021](https://github.com/tc39/proposal-string-replaceall) 引入了`replaceAll()`方法，可以一次性替换所有匹配。

```js
'aabbcc'.replaceAll('b', '_')
// 'aa__cc'
```

- 它的用法与`replace()`相同，返回一个新字符串，不会改变原字符串。

```js
String.prototype.replaceAll(searchValue, replacement)
```

- 上面代码中，`searchValue`是搜索模式，可以是一个字符串，也可以是一个全局的正则表达式（带有`g`修饰符）。
- 如果`searchValue`是一个不带有`g`修饰符的正则表达式，`replaceAll()`会报错。这一点跟`replace()`不同。

```js
// 不报错
'aabbcc'.replace(/b/, '_')

// 报错
'aabbcc'.replaceAll(/b/, '_')
```

- 上面例子中，`/b/`不带有`g`修饰符，会导致`replaceAll()`报错
- `replaceAll()`的第二个参数`replacement`是一个字符串，表示替换的文本，其中可以使用一些特殊字符串。
  - `$&`：匹配的字符串。
  - `$` `：匹配结果前面的文本。
  - `$'`：匹配结果后面的文本。
  - `$n`：匹配成功的第`n`组内容，`n`是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
  - `$$`：指代美元符号`$`。
- `replaceAll()`的第二个参数`replacement`除了为字符串，也可以是一个函数，该函数的返回值将替换掉第一个参数`searchValue`匹配的文本。

```js
'aabbcc'.replaceAll('b', () => '_')
// 'aa__cc'
```

- 上面例子中，`replaceAll()`的第二个参数是一个函数，该函数的返回值会替换掉所有`b`的匹配。
- 这个替换函数可以接受多个参数。第一个参数是捕捉到的匹配内容，第二个参数捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置，最后一个参数是原字符串。

```js
const str = '123abc456';
const regex = /(\d+)([a-z]+)(\d+)/g;

function replacer(match, p1, p2, p3, offset, string) {
  return [p1, p2, p3].join(' - ');
}

str.replaceAll(regex, replacer)
// 123 - abc - 456
```

- 上面例子中，正则表达式有三个组匹配，所以`replacer()`函数的第一个参数`match`是捕捉到的匹配内容（即字符串`123abc456`），后面三个参数`p1`、`p2`、`p3`则依次为三个组匹配

## 6.正则的扩展

## 7.数值的扩展

## 11.对象的新增方法

### 1.Object.is()

- ES5 比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。
- 缺点，前者会自动转换数据类型，后者的`NaN`不等于自身，以及`+0`等于`-0`。
- JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。
- ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。
- 它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

```js
console.log(Object.is('foo','foo'));//true
console.log(Object.is({},{}));//false
```

- 不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身。

```js
console.log(Object.is(+0,-0));//flse
console.log(Object.is(NaN,NaN));//true
```

- ES5 可以通过下面的代码，部署`Object.is`。

```js
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```

### 2.Object.assgin()

#### 1.基本用法

- `Object.assign()`方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

```js
const target1 = {a :1}
const source1 = {b:2}
const source2 = {c:3}
console.log(Object.assign(target1,source1,source2));//{"a": 1,"b":2,"c": 3}
```

- Object.assign()方法的第一个参数是目标对象，后面的参数都是源对象。
- 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

```js
const target2 = { a: 1, b: 1 };
const s3 = { b: 2, c: 2 };
const s4 = { c: 3 };
const result2 = Object.assign(target2, s3, s4);
console.log(result2); //{"a": 1,"b": 2,"c": 3}
```

- 如果只有一个参数，Object.assign()会直接返回该参数。

```js
const obj = { a: 1 };
console.log(Object.assign(obj) === obj);//true
```

- 如果该参数不是对象，则会先转成对象，然后返回。

```js
typeof Object.assign(2) // "object"
```

- 如果只有一个参数，Object.assign()会直接返回该参数。

```js
const obj = { a: 1 };
console.log(Object.assign(obj) === obj);//true
```

- 如果该参数不是对象，则会先转成对象，然后返回。

```js
console.log(typeof Object.assign(2)); //object
```

- 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。

```js
console.log(Object.assign(undefined));//Uncaught TypeError: Cannot convert undefined or null to object
console.log(Object.assign(null));//Uncaught TypeError: Cannot convert undefined or null to object
```

- 如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。
- 首先，这些参数都会转成对象，如果无法转成对象，就会跳过。
- 这意味着，如果`undefined`和`null`不在首参数，就不会报错。

```js
let obj2 = { a: 1 };
console.log(Object.assign(obj2, undefined) === obj2);
console.log(Object.assign(obj2, null) === obj2);
```

- 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。
- 但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。

```js
const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = [1, 2, 3];
const r3 = Object.assign({}, v1, v2, v3);
console.log(r3); 
```

- 上面代码中，v1、v2、v3分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。
- 这是因为只有字符串的包装对象，会产生可枚举属性。

```js
console.log(Object(v1)); // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
console.log(Object(v2)); // {[[PrimitiveValue]]: true}
console.log(Object(v3)); //  {[[PrimitiveValue]]: 10}
```

- 上面代码中，布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，这个属性是不会被Object.assign()拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝
- Object.assign()拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。

```js
const r4 = Object.assign(
    { b: "c" },
    Object.defineProperty({}, "invisible", {
        enumerable: false,
        value: "hello",
    })
);
console.log(r4); //{"b": "c"}
```

- 上面代码中，`Object.assign()`要拷贝的对象只有一个不可枚举属性`invisible`，这个属性并没有被拷贝进去。
- 属性名为 Symbol 值的属性，也会被Object.assign()拷贝。

```js
const r5 = Object.assign({a:'b'},{[Symbol('c')]:'d'})
console.log(r5);//// { a: 'b', Symbol(c): 'd' }
```

#### 2.注意点

- 浅拷贝

  - `Object.assign()`方法实行的是浅拷贝，而不是深拷贝。
  - 也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

  ```js
  const obj3 = { a: { b: 1 } };
  const obj4 = Object.assign({}, obj3);
  console.log(obj4); //{"a": {"b": 1}}
  obj3.a.b = 2;
  console.log(obj4);//{"a": {"b": 2}}
  ```

  - 上面代码中，源对象`obj1`的`a`属性的值是一个对象，`Object.assign()`拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。

- 同名属性的替换

  - 对于这种嵌套的对象，一旦遇到同名属性，`Object.assign()`的处理方法是替换，而不是添加。

  ```js
  const t3 = {a:{b:'b',c:'c'}}
  const s5 = {a:{b:'hello'}}
  console.log(Object.assign(t3,s5));//{"a": {"b": "hello"}}
  ```

- 数组的处理

  - Object.assign()可以用来处理数组，但是会把数组视为对象。

  ```js
  console.log(Object.assign([1,2,3],[4,5]));//[4,5,3]
  ```

  - 上面代码中，Object.assign()把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。

#### 3.常见用途

- 为对象添加属性
  - 下面方法通过Object.assign()方法，将x属性和y属性添加到Point类的对象实例。

```js
class point{
    constructor(x,y){
        Object.assign(this,{x:1,y:1})
    }
}
console.log(point);
const point1 = new point();
console.log(point1);//{"x": 1,"y": 1}
```

- 为对象添加方法

  - 下面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用assign()方法添加到SomeClass.prototype之中。

  ```js
  class SomeClass {}
  Object.assign(SomeClass.prototype, {
      someMethod(arg1, arg2) {
          return arg1 + arg2;
      },
      anotherMethod() {
          console.log("assign为对象添加方法");
      },
  });
  console.log(SomeClass.prototype);//{someMethod: ƒ, anotherMethod: ƒ, constructor: ƒ}
  // 等同于下面的写法
  SomeClass.prototype.someMethod = function (arg1, arg2) {
      return arg1 + arg2;
  };
  SomeClass.prototype.anotherMethod = function () {
      console.log("为对象添加方法");
  };
  ```

- 克隆对象

  - 下面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆

  ```js
  function clone(o) {
      return Object.assign({}, o);
  }
  const o1 = { name: "james", age: "36" };
  console.log(clone(o1));//{name: 'james', age: '36'}
  ```

  - 不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。

  ```js
  function inheritClone(o){
      let oProto = Object.getPrototypeOf(o)
      return Object.assign(Object.create(oProto),o)
  }
  ```

- 合并多个对象

  - 将多个对象合并到某个对象。

  ```js
  const m1 = Object.assign(t1,s1,s2,s3)
  console.log(m1);//{a: 1, b: 2, c: 2}
  ```

  - 如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。

  ```js
  const m2 = Object.assign({},s1,s2,s3)
  console.log(m2);//{b: 2, c: 2}
  ```

- 为属性指定默认值

  - 下面代码中，DEFAULTS对象是默认值，options对象是用户提供的参数。Object.assign()方法将DEFAULTS和options合并成一个新对象，如果两者有同名属性，则options的属性值会覆盖DEFAULTS的属性值。

  ```js
  const DEFAULTS = {
      logLevel: 0,
      outputFormat: "html",
  };
  function processContent(opt) {
      opt = Object.assign({}, DEFAULTS, opt);
      console.log(opt);
  }
  const opt1 = { city: "beijing", location: "north", logLevel: 1 };
  console.log(processContent(opt1));
  ```

  - 注意，由于存在浅拷贝的问题，DEFAULTS对象和options对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，DEFAULTS对象的该属性很可能不起作用。

  ```js
  const DEFAULTS2 = {
      url: {
          host: "example.com",
          port: 7070,
      },
  };
  function processContent2(opt) {
      opt = Object.assign({}, DEFAULTS2, opt);
      console.log(opt);
  }
  console.log(processContent2({ url: { port: 8000 } }));//{"url": {"port": 8000}}
  ```

  - 上面代码的原意是将url.port改成 8000，url.host不变。实际结果却是options.url覆盖掉DEFAULTS.url，所以url.host就不存在了。

### 3.Object.getOwnPropertyDescriptors()

- ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）
- ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。

```js
const o2 = {
    foo: 123,
    get Bar() {
        return "abc";
    },
};
console.log(Object.getOwnPropertyDescriptors(o2));
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

- 上面代码中，Object.getOwnPropertyDescriptors()方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。

- 该方法的实现非常容易。

```js
function getOwnPropertyDescriptors(obj) {
    const result = {};
    for (let key of Reflect.ownKeys(obj)) {
        result[key] = Object.getOwnPropertyDescriptor(obj, key);
    }
    return result;
}
console.log(getOwnPropertyDescriptors(o2)); //ditto
```

- 该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。

```js
const s7 = {
    set foo(value) {
        console.log(value);
    },
};
const t5 = {};
Object.assign(t5, s7);
console.log(Object.getOwnPropertyDescriptors(t5, "foo"));
// { value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true }
```

- 上面代码中，source对象的foo属性的值是一个赋值函数，Object.assign方法将这个属性拷贝给target1对象，结果该属性的值变成了undefined。这是因为Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。
- 这时，Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。

```js
const s8 = {
    set foo(value) {
        console.log(value);
    },
};
const t6 = {};
Object.defineProperties(t6, Object.getOwnPropertyDescriptors(s8));
console.log(Object.getOwnPropertyDescriptor(t6, "foo"));
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }
```

- 上面代码中，两个对象合并的逻辑可以写成一个函数。

```js
const shallowMerge = (target, source) =>
Object.defineProperties(
    target,
    Object.getOwnPropertyDescriptors(source)
);

//Object.getOwnPropertyDescriptors()方法的另一个用处，是配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝
const clone3 = Object.create(
    Object.getPrototypeOf(obj4),
    Object.getOwnPropertyDescriptors(obj4)
);
// 或者
const shallowClone = (obj4) =>
Object.create(
    Object.getPrototypeOf(obj4),
    Object.getOwnPropertyDescriptors(obj4)
);
```

- 上面代码会克隆对象obj。
- 另外，Object.getOwnPropertyDescriptors()方法可以实现一个对象继承另一个对象。
- 有了Object.getOwnPropertyDescriptors()，我们就有了另一种写法。

```js
const prot = {};
const o4 = Object.create(
    prot,
    Object.getOwnPropertyDescriptors({
        foo: 123,
    })
);
```

- Object.getOwnPropertyDescriptors()也可以用来实现 Mixin（混入）模式。

```js
let mix = (object) => ({
    with: (...mixins) =>
    mixins.reduce(
        (c, mixin) =>
        Object.create(c, Object.getOwnPropertyDescriptors(mixin)),
        object
    ),
});
// multiple mixins example
let a = { a: "a" };
let b = { b: "b" };
let c = { c: "c" };
let d = mix(c).with(a, b);
console.log(d);
//d.c => "c"
//d.b => "b"
//d.a => "a"
```

### 4.__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()

#### 1.__proto__属性

- __proto__属性（前后各两个下划线），用来读取或设置当前对象的原型对象（prototype）
- 因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。
- 如果一个对象本身部署了__proto__属性，该属性的值就是对象的原型。

```js
console.log(Object.getPrototypeOf({ __proto__: null })); //null
```

#### 2.Object.setPrototypeOf()

- Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的原型对象（prototype），返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
- 格式:Object.setPrototypeOf(object, prototype);
- 用法:const o = Object.setPrototypeOf({}, null);
- 该方法等同于下面的函数。

```js
function setPrototypeOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}
```

- 下面是一个例子。

```js
let p1 = {};
let o5 = { x: 10 };
p1.y = 20;
p1.z = 30;
Object.setPrototypeOf(o5, p1);
console.log(o5); //x:10 y:20 z:30
```

- 上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。
- 如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。
- 由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。

```js
Object.setPrototypeOf(undefined, {});
// TypeError: Object.setPrototypeOf called on null or undefined
Object.setPrototypeOf(null, {});
// TypeError: Object.setPrototypeOf called on null or undefined
```

#### 3.Object.getPrototypeOf()

- 用于读取一个对象的原型对象。

```js
 Object.getPrototypeOf("");
```

- 下面是一个例子。

```js
function Rectangle() {
    // ...
}
const rec = new Rectangle();
console.log(Object.getPrototypeOf(rec) === Rectangle.prototype); //true
```

- 如果参数不是对象，会被自动转为对象。
- 等同于 Object.getPrototypeOf(Number(1))

```js
Object.getPrototypeOf(1);
// Number {[[PrimitiveValue]]: 0}
```

- 等同于 Object.getPrototypeOf(String('foo'))

```js
Object.getPrototypeOf("foo");
// String {length: 0, [[PrimitiveValue]]: ""}
```

- 等同于 Object.getPrototypeOf(Boolean(true))

```js
Object.getPrototypeOf(true);
// Boolean {[[PrimitiveValue]]: false}
```

- 如果参数是undefined或null，它们无法转为对象，所以会报错。

```js
Object.getPrototypeOf(null);
// TypeError: Cannot convert undefined or null to object
Object.getPrototypeOf(undefined);
// TypeError: Cannot convert undefined or null to object
```

### 5.Object.keys()，Object.values()，Object.entries()

#### 1.Object.keys()

- ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

```js
let o7 = { foo: "bar", baz: 42 };
console.log(Object.keys(o7)); // ['foo', 'baz']
```

- ES2017 引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。

```js
let { keys, values, entries } = Object;
let o8 = { a: 1, b: 2, c: 3 };
for (let key of keys(o8)) {
    console.log(key); // 'a', 'b', 'c'
}
for (let value of values(o8)) {
    console.log(value); // 1, 2, 3
}
for (let [key, value] of entries(o8)) {
    console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```

#### 2.Object.values()

- ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

```js
let o9 = { foo: "foo", br: "123" };
console.log(Object.values(o9)); //["foo","123"]
```

- 返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致

```js
let o10 = { 100: "a", 46: "b", 58: "c" };
console.log(Object.values(o10)); //['b', 'c', 'a']
```

- 上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。
- Object.values只返回对象自身的可遍历属性。

```js
let o11 = Object.create({}, { p: { value: 42 } });
console.log(Object.values(o11)); //[]
```

- 上面代码中，Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的，因为p的属性描述对象的enumerable默认是false，Object.values不会返回这个属性。只要把enumerable改成true，Object.values就会返回属性p的值。

```js
let o12 = Object.create({}, { p: { value: 50, enumerable: true } });
console.log(Object.values(o12)); //[50]
```

- Object.values会过滤属性名为 Symbol 值的属性。

```js
console.log(Object.values({ [Symbol()]: 123, foo: "bar" })); //['bar']
```

- 如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。

```js
console.log(Object.values("HelloWorld!")); // ['H', 'e', 'l', 'l', 'o', 'W', 'o', 'r', 'l', 'd', '!']
```

- 上面代码中，字符串会先转成一个类似数组的对象。字符串的每个字符，就是该对象的一个属性。因此，Object.values返回每个属性的键值，就是各个字符组成的一个数组。

- 如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。

```js
console.log(Object.values(42)); //[]
console.log(Object.values(true)); //[]

```

#### 3.Object.entries()

- Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

```js
let o13 = { name: "jack", sex: "male", age: 28, address: "UK" };
console.log(Object.entries(o13));
/*       
      ['name', 'jack']
      ['sex', 'male']
      ['age', 28]
      ['address', 'UK']
*/
```

- 除了返回值不一样，该方法的行为与Object.values基本一致。
- 如果原对象的属性名是一个 Symbol 值，该属性会被忽略。

```js
console.log(Object.entries({ [Symbol()]: 123, foo: "abc" })); //[ [ 'foo', 'abc' ] ]
```

- 上面代码中，原对象有两个属性，Object.entries只输出属性名非 Symbol 值的属性。将来可能会有Reflect.ownEntries()方法，返回对象自身的所有属性。
- Object.entries的基本用途是遍历对象的属性

```js
let o14 = { one: 1, two: 2 };
for (let [k, v] of Object.entries(o14)) {
    console.log(`${JSON.stringify(k)}:${JSON.stringify(v)}`);
} //"one":1 "two":2
```

- Object.entries方法的另一个用处是，将对象转为真正的Map结构。

```JS
let o15 = { foo: "bar", baz: 42 };
const map1 = new Map(Object.entries(o15));
console.log(map1); //Map(2) {'foo' => 'bar', 'baz' => 42}
```

- 自己实现Object.entries方法，非常简单。
- Generator函数的版本

```js
 function* entries1(obj) {
        for (let key of Object.keys(obj)) {
          yield [key, obj[key]];
        }
      }
      console.log(entries1(o15));
```

- 非Generator函数的版本

```js
function entries2(obj) {
    let arr = [];
    for (let key of Object.keys(obj)) {
        arr.push([key, obj[key]]);
    }
    return arr;
}
console.log(entries2(o15));
```

### 6.Object.fromEntries()

- Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。

```js
let o16 = [
    ['test1', "test1"],
    ['test2', 12],
];
console.log(Object.fromEntries(o16));//{test1: 'test1', test2: 12}
```

- 该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。

```js
let map2 = new Map().set('number',1).set('str','zifuchuan').set('boolen','true')
console.log(Object.fromEntries(map2));//{number: 1, str: 'zifuchuan', boolen: 'true'}
```

- 该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象。

```js
console.log(Object.fromEntries(new URLSearchParams('name=lucy&age=18')));//{name: 'lucy', age: '18'}
```



