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