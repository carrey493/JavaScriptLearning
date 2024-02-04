## JavaScript 核心原理

> 学习地址：https://www.bilibili.com/video/BV1Ze411B7rS

**打好 JS 基石，走稳前端进阶之路。**

1.为什么要学习这门课

前端技术的日新月异，前端应用的复杂度日益提升，市场上对于前端人才的要求也愈加严格。

想要在这一领域走得长远，就必须具备扎实的 `JavaScript` 编码能力，它既是前端人的自检清单，更是进阶的必修课。

扎实掌握并加强原生 `JavaScript` 的核心原理及编码功底、深入理解前端框架源代码，对于提升自己的前端技术能力、提高职业生涯天花板是非常有必要的。

2.怎么学

围绕**基础原理**、**数组**、**异步编程**、**V8 引擎**几个核心知识点展开通过`4个模块`、`27讲内容`带你深挖 `JavaScript` 底层原理。

**模块一：深入讲解 JavaScript 核心基础知识**

> 这是构建前端工具的基础，只有掌握好这部分内容，你才能为以后的编码能力打下基础。

**模块二：介绍 JavaScript 的数组相关知识**

> 掌握这部分知识,你可以在每次写前端业务逻辑、处理一些数组数据的时候，不用再去翻看相关的数组 API 文档,从而提升你的开发效率。

**模块三：从 JavaScript 最基础的异步编程方式讲起**

> 在浏览器端比较耗时的操作都应该进行异步操作来减少等待时间。由此可见，异步编程在浏览器端是非常重要的。
> 掌握了 JavaScript 异步编程源码精髓，你就可以摆脱前端代码的“回调地狱”，更优雅地实现并解决业务场景的复杂问题、提升页面性能。

**模块四：浏览器核心 V8 引擎相关的内容**

> 讲解浏览器垃圾回收机制、浏览器核心引擎的工作逻辑等内容，帮助你理解 JavaScript 代码是如何被 V8 引擎编译和执行的。

**各种前端新技术、新框架的出现也在考验前端工程师的能力。**

<font color="FFE9C3">如何提升技术能力、建立自己的“核心竞争力”是每一位优秀的前端工程师应该思考的问题</font>

### JS 的数据类型你了解多少?

作为 JavaScript 的入门级知识点，JS 数据类型在整个 JavaScript 的学习过程中其实尤为重要。

特别是在：**边界数据类型条件判断问题**处理的时候，需要额外注意。

我们从数据类型的`概念`，`检测方法`，`转换方法`来学习数据类型。

#### 1. 数据类型的概念

![](https://img2024.cnblogs.com/blog/2332774/202401/2332774-20240116202144735-1547022855.png)

前七种是基础类型，`Object`是引用数据类型。尤其要注意`Object`，它在日常开发使用中是最频繁的，也是需要关注细节最多的。

数据类型大致可以分成两类来进行存

- 基础类型存储在栈内存：被引用或拷贝时,会创建一个完全相等的变量
- 引用类型存储在堆内存：存储的是地址,多个引用指向同一个地址

这里会涉及一个“共享”的概念，下面通过两段代码来说明。

1️⃣ 代码一

```js
let a = {
  name: "lee",
  age: 18,
};
let b = a;
console.log(a.name); //第一个console lee
b.name = "son";
console.log(a.name); //第二个console son
console.log(b.name); //第三个console son
```

这里就体现了引用类型的特征：这两个值都存在同一个内存空间中共享，一个值改变，另一个值也随之改变。

2️⃣ 代码二

```js
let a = { name: "Julia", age: 20 };

function change(o) {
  o.age = 24;
  o = { name: "Kath", age: 30 };
  return o;
}
let b = change(a); //注意这里没有new,后面new相关会有专门文章讲解
console.log(b.age); //第一个console 30
console.log(a.age); //第二个console 24
```

函数传参进来的 o，传递的是对象在堆中的内存地址，通过调用`o.age = 24;`确实改变了`a.age`的值，但是后续调用的`return`又把`o`变成了另一个内存最地址，将`{ name: "Kath", age: 30 }`这个对象存入其中，最后将该值返回给`b`。

如果不设置返回值，则会报错`Cannot read property 'age' of undefined`。

#### 2. 数据类型检测

**数据类型检测**，也是面试过程中经常会遇到的问题。

1️⃣ 第一种判断方法: typeof

```js
typeof 1; // 'number'
typeof "1"; // 'string'
typeof undefined; // 'undefined'
typeof true; // 'boolean'
typeof Symbol(); // 'symbol'
typeof null; // 'object' 答案不标准
typeof []; // 'object'
typeof {}; // 'object'
typeof console; // 'object'
typeof console.log; // 'function'
```

注意：**typeof null;** 结果为`object`答案并不标准，`null`不是引用数据类型而且`null`本身并不是对象，这是有问题的方法，不能用来做判断。判断是否为`null`，直接使用`value === null`即可。

此外，在引用数据类型中除了`function`会被判断为`ok(function)`以外，其余的结果都为`object`，无法具体的判断。

2️⃣ 第二种判断方法：instanceof

`instanceof` 运算符可以用来判断一个对象是否是某个类的实例或者某个类的原型链中的实例，使用 `instanceof` 运算符同样会返回一个布尔值，如果 `object` 是 `class` 或者 `class` 的原型链中的实例，则返回 `true`；否则返回 `false`。

```js
let Car = function () {};
let benz = new Car();
benz instanceof Car; // true
let car = new String("Mercedes Benz");
car instanceof String; // true
let str = "Covid-19";
str instanceof String; // false
```

当我们`new`一个对象时，新对象就是他原型链继承上的对象。通过`instanceof`我们可以判断这个对象是否是之前那个构造函数生成的对象，这样基本可以判断出这个新对象的数据类型。

这段代码是一个自定义的 `mylnstanceof` 函数，用来模拟实现 `instanceof` 运算符的功能。下面是这段代码的详细解释：

```javascript
function mylnstanceof(left, right) {
  // 这里先用 typeof 来判断基础数据类型，如果是，直接返回 false
  if (typeof left !== "object" || left === null) return false;

  // getPrototypeOf 是 Object 对象自带的 API，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);

  while (true) {
    // 循环往下寻找，直到找到相同的原型对象
    if (proto === null) return false;
    if (proto === right.prototype) return true; // 找到相同原型对象，返回 true

    proto = Object.getPrototypeOf(proto);
  }
}
```

函数的参数 `left` 表示要判断的对象，`right` 表示要判断的构造函数或者对象的原型。

函数首先通过 `typeof` 来判断 `left` 的类型，如果不是对象或者是 `null`，直接返回 `false`，因为只有对象才有原型。

然后通过 `Object.getPrototypeOf` 方法获取 `left` 的原型对象，并将其赋值给变量 `proto`。

接下来进入一个无限循环，不断通过 `Object.getPrototypeOf` 方法获取 `proto` 的原型对象，并赋值给 `proto`。直到找到一个与 `right.prototype` 相同的原型对象，表示 `left` 是 `right` 的实例，此时返回 `true`。

如果循环中到达了原型链的末尾，即 `proto` 变为 `null`，表示 `left` 不是 `right` 的实例，返回 `false`。

这个自定义函数通过逐层查找原型链的方式，来判断一个对象是否是某个构造函数或者对象的实例。它的实现与 `instanceof` 运算符类似，但是并不完全等同。

3️⃣ 两种判断数据类型的差异

1. instanceof 可以准确地判断复杂引用数据类型但是不能正确判断基础数据类型
2. 而 typeof 也存在弊端,它虽然可以判断基础数据类型(null 除外)但是引用数据类型中,除了 function 类型以外,其他的也无法判断

总之，单独使用其中的任何一个都无法满足所有场景的需求，只能通过二者混写的方式。这样也只是满足大多数的场景，而且写起来也比较繁琐。

4️⃣ 第三种判断方法:Object.prototype.toString **(推荐)**

```js
Object.prototype.toString({}); //"[object Object]"
Object.prototype.toString.call({}); //同上结果,加上call也ok
Object.prototype.toString.call(1); //"[object Number]"
Object.prototype.toString.call("1"); //"[object String]"
Object.prototype.toString.call(true); //"[object Boolean]"
Object.prototype.toString.call(function () {}); // "[object Function]"
Object.prototype.toString.call(null); //"[object Null]"
Object.prototype.toString.call(undefined); //"[object Undefined]"
Object.prototype.toString.call(/123/g); //"[object RegExp]"
Object.prototype.toString.call(new Date()); //"[object Date]"
Object.prototype.toString.call([]); //"[object Array]"
Object.prototype.toString.call(document); //"[object HTMLDocument]"
Object.prototype.toString.call(window); //"[objectWindow]"
```

**全局通用的数据类型检测方法**

```js
function getType(obj) {
  let type = typeof obj;
  if (type !== "object") {
    //先进行typeof判断,如果是基础数据类型,直接返回
    return type;
  }
  //对于typeof返回结果是object的,再进行如下的判断,正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object(\S+)\]$/, "$1");
  //注意正则中间有个空格
}

/*代码验证,需要注意大小写,哪些是typeof判断,哪些是toString判断?思考下*/
getType([]); // "Array" typeof[]是object 因此toString返回
getType("123"); // "string" typeof 直接返回
getType(window); // "Window" toString 返回
getType(null); // "Null"首字母大写,typeof null是object 需toString来判断
getType(undefined); // "undefined" typeof 直接返回
getType(); // "undefined" typeof 直接返回
getType(function () {}); // "function" typeof 能判断 因此首字母小写
getType(/123/g); // "RegExp" toString返回
```

![](https://img2024.cnblogs.com/blog/2332774/202401/2332774-20240129203134823-1978344759.png)

#### 3.数据类型转换

1. 强制类型转行

- Number()
- parseInt()
- parseFloat
- toString()
- String()
- Boolean()

![](https://img2024.cnblogs.com/blog/2332774/202401/2332774-20240129203750616-543638988.png)

![](https://img2024.cnblogs.com/blog/2332774/202401/2332774-20240129203843830-647892237.png)

![](https://img2024.cnblogs.com/blog/2332774/202401/2332774-20240129203914066-962500340.png)

![](https://img2024.cnblogs.com/blog/2332774/202401/2332774-20240129203929408-1742397777.png)

2. 隐式类型转换

凡是通过以下的方式执行的操作，如果遇到两个数据结构不一样的情况，都会出现隐式转换。

![](https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240204193319392-390200967.png)

下面主要解释日常用的比较多的 `==` 与 `+`

1️⃣ **`==`的隐式转换规则**

![](https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240204200552466-1608942475.png)

- 如果**类型相同**无须进行类型转换
- 如果其中一个的操作值是`null`或者`undefined`那么另一个操作符必须为`null`或者`undefined`才会返回`true`否则返回`false`
- 如果其中一个是`Symbol`类型那么返回`false`
- 两个操作值如果都为`string`和`number`类型那么就会将字符串转换为`number`
- 如果一个操作值是`boolean`那么转换为`number`
- 如果一个操作值为`object`且另一方为`string`、`number`或者`symbol`就会把`object`转换(调用`Object.valueOf`或者`toString`方法)为原始类型再进行判断

![](https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240204210223055-927428981.png)

```js
null == undefined
null == 0
" == null
"==0
'123'==123
0 == false
1 == true
var a = {
value: 0,
this.value++;
return this.value;};
// true 规则2
// false 规则2
// false 规则2
// true 规则4 字符串转隐式转换成Number之后再对比// true 规则4 字符串转隐式转换成Number之后再对比//true e规则布尔型隐式转换成Number之后再对比//true e规则布尔型隐式转换成Number之后再对比
valueOf: function() {
//注意这里a又可以等于1、2、3
console.log(a == 1 && a == 2 && a ==3); //true f规则 Object隐式转换
/注:但是执行过3遍之后,再重新执行a=3或之前的数字就是false,因为value已经加上去了,这里需要注意一下
```

2️⃣ **`+`的隐式转换规则**

`+`号操作符不仅可以用作数字相加，还可以用作字符串拼接。

`+`两边都是数字则直接进行加法运算，`+`两边都是字符串直接进行字符串拼接，无需进行隐式转换。

![](https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240204202345931-2001167424.png)

```js
1+2
//3常规情况
'1'+'2' // ‘12'常规情况
//下面看一下特殊情况
'1'+undefined //"lundefined“规则1, undefined转换字符串
'1'+null
//"1null"规则1,null转换字符串
'1' +true
//"1true" 规则1, true转换字符串
'1'+1n
//'11' 比较特殊字符串和BigInt相加,BigInt转换为字符串1+undefined//NaN规则2,undefined转换数字相加NaN
1 + null
/1规则2,null转换为0
1+true
//2规则2,true转换为1,二者相加为2
1+1n
//错误不能把BigInt和Number类型直接混合相加
'1'+3
//'13'规则3,字符串拼接
```

整体看来，如果数据中有`字符串`，`JavaScript`还是更倾向于把其他类型的数据转换为字符串。

3️⃣ **`Object`的转换规则**

对象的转换首先会调其内置的`toPrimitive`方法

![](https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240204203238372-1196679842.png)

1. 如果部署了`[Symbol.toPrimitive]()`方法优先调用再返回
2. 调用`valueOf()`，如果转换为基础类型则返回
3. 调用`toString()`，如果转换为基础类型则返回
4. 如果**都没有返回**基础类型会报错

```js
var obj = {
  value: 1,
  valueOf() {
    return 2;
  },
  toString() {
    return "3";
  },
  [Symbol.toPrimitive]() {
    return 4;
  },
};

console.log(obj + 1); //输出 5

//因为有Symbol.toPrimitive，就优先执行这个;如果Symbol.toPrimitive这段代码删掉，则执行valueOf打印结果为3;如果valueOf也去掉，则调用toString返回'31'(字符串拼接)

//再看两个特殊的case

console.log(10 + {}); //输出 "10[object Object]"
//注意:{}会默认调用valueOf是{}，不是基础类型继续转换；调用toString,返回结果"[objectObject]"，于是和10进行'+'运算，按照字符串拼接规则来，参考'+'的规则C

console.log([1, 2, undefined, 4, 5] + 10); // 输出 "1,2,,4,510"

//注意[1,2,undefined,4,5]会默认先调用valueOf结果还是这个数组,不是基础数据类型继续转换,也还是调用toString,返回"1,2,,4,5",然后再和10进行运算,还是按照字符串拼接规则,参考'+'的第3条规则
```
