## JavaScript 核心原理

> 学习地址：https://www.bilibili.com/video/BV1Ze411B7rS

**<font color=skyblue size=6>打好 JavaScript 基石，走稳前端进阶之路。</font>**

**<font color=black size=4>1. 为什么要学习这门课</font>**

前端技术的日新月异，前端应用的复杂度日益提升，市场上对于前端人才的要求也愈加严格。

想要在这一领域走得长远，就必须具备扎实的 `JavaScript` 编码能力，它既是前端人的自检清单，更是进阶的必修课。

扎实掌握并加强原生 `JavaScript` 的核心原理及编码功底、深入理解前端框架源代码，对于提升自己的前端技术能力、提高职业生涯天花板是非常有必要的。

**<font color=black size=4>2. 怎么学</font>**

围绕**基础原理**、**数组**、**异步编程**、**V8 引擎**几个核心知识点展开通过`4个模块`、`27讲内容`带你深挖 `JavaScript` 底层原理。

**模块一：深入讲解 `JavaScript` 核心基础知识**

> 这是构建前端工具的基础，只有掌握好这部分内容，你才能为以后的编码能力打下基础。

**模块二：介绍 `JavaScript` 的数组相关知识**

> 掌握这部分知识,你可以在每次写前端业务逻辑、处理一些数组数据的时候，不用再去翻看相关的数组 API 文档，从而提升你的开发效率。

**模块三：从 `JavaScript` 最基础的异步编程方式讲起**

> 在浏览器端比较耗时的操作都应该进行异步操作来减少等待时间。由此可见，异步编程在浏览器端是非常重要的。
> 掌握了 `JavaScript` 异步编程源码精髓，你就可以摆脱前端代码的“回调地狱”，更优雅地实现并解决业务场景的复杂问题、提升页面性能。

**模块四：浏览器核心 V8 引擎相关的内容**

> 讲解浏览器垃圾回收机制、浏览器核心引擎的工作逻辑等内容，帮助你理解 `JavaScript` 代码是如何被 V8 引擎编译和执行的。

**各种前端新技术、新框架的出现也在考验前端工程师的能力。**

<font color="#f96351" size=5>如何提升技术能力、建立自己的“核心竞争力”是每一位优秀的前端工程师应该思考的问题</font>

### 一、JavaScript 的数据类型你了解多少?

作为 `JavaScript` 的入门级知识点，`JavaScript` 数据类型在整个 `JavaScript` 的学习过程中其实尤为重要。

特别是在：**边界数据类型条件判断问题**处理的时候，需要额外注意。

我们从数据类型的`概念`，`检测方法`，`转换方法`来学习数据类型。

#### 1. 数据类型的概念

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202401/2332774-20240116202144735-1547022855.png" /></p>

前七种是基础类型，`Object`是引用数据类型。尤其要注意`Object`，它在日常开发使用中是最频繁的，也是需要关注细节最多的。

数据类型大致可以分成两类来进行存

- 基础类型存储在栈内存：被引用或拷贝时，会创建一个完全相等的变量。
- 引用类型存储在堆内存：存储的是地址，多个引用指向同一个地址。

这里会涉及一个**共享**的概念，下面通过两段代码来说明。

**1️. 代码一**

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

**2. 代码二**

```js
let a = { name: "Julia", age: 20 };

function change(o) {
  o.age = 24;
  o = { name: "Kath", age: 30 };
  return o;
}
let b = change(a); // 注意这里没有new，后面new相关会有专门文章讲解。
console.log(b.age); // 第一个console 30
console.log(a.age); // 第二个console 24
```

函数传参进来的 `o`，传递的是对象在堆中的内存地址，通过调用`o.age = 24;`确实改变了`a.age`的值，但是后续调用的`return`又把`o`变成了另一个内存最地址，将`{ name: "Kath", age: 30 }`这个对象存入其中，最后将该值返回给`b`。

如果不设置返回值，则会报错`Cannot read property 'age' of undefined`。

#### 2. 数据类型检测

**数据类型检测**，也是面试过程中经常会遇到的问题。

**1️. 第一种判断方法: <font color="brown" size=5>typeof</font>**

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

**2️. 第二种判断方法：<font color="brown" size=5>instanceof</font>**

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

**两种判断数据类型的差异**

1. `instanceof` 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型。
2. 而 `typeof` 也存在弊端，它虽然可以判断基础数据类型(`null` 除外)，但是引用数据类型中，除了 `function` 类型以外，其他的也无法判断。

总之，单独使用其中的任何一个都无法满足所有场景的需求，只能通过二者混写的方式。这样也只是满足大多数的场景，而且写起来也比较繁琐。

**3. 第三种判断方法：<font color="brown" size=5>Object.prototype.toString</font>** **(推荐)**

```js
Object.prototype.toString({}); // "[object Object]"
Object.prototype.toString.call({}); // 同上结果,加上call也ok
Object.prototype.toString.call(1); // "[object Number]"
Object.prototype.toString.call("1"); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(function () {}); // "[object Function]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(/123/g); // "[object RegExp]"
Object.prototype.toString.call(new Date()); // "[object Date]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(document); // "[object HTMLDocument]"
Object.prototype.toString.call(window); // "[objectWindow]"
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

#### 3.数据类型转换

**<font color="#2f9dff" size=4>1. 强制类型转行</font>**

- Number()
- parseInt()
- parseFloat()
- toString()
- String()
- Boolean()

以上是几种比较常见的强制类型转换方法，下面重点介绍两个常用的方法。

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202401/2332774-20240129203750616-543638988.png" /></p>

**Number()方法的强制转换规则**

- 布尔值：`true`和`false`分别被转换为`1`和`0`
- 数字：返回自身
- `null`：返回`0`
- `undefined`：返回`NaN`
- 字符串：如果字符串中只值包含数字，则将其转换为十进制；如果字符串中包含有效的浮点格式，将其转换为浮点数值；如果是空字符串，将其转换为`0`；如果不是以上格式的字符串，均返回`NaN`。
- `Symbol`：抛出错误
- 对象：并且部署了`[Symbol.toPrimitive]`，那么调用此方法，否则调用对象的`valueOf`方法。

```js
Number(1); // 1
Number(false); // 0
Number("0111"); // 111
Number(null); // 0
Number(""); // 0
Number("la"); // NaN
Number(-0x11); // -17
Number(0x11); // 17
```

---

**Boolean()方法的强制转换规则**

除了`undefined`、`null`、`false`、`''`、`0(包括+0,-0)`、`NaN`转换出来是`false`，其它都是`true`。

```js
Boolean(0); // false
Boolean(null); // false
Boolean(undefined); // false
Boolean(NaN); // false
Boolean(1); // true
Boolean(13); // true
Boolean("12"); // true
Boolean({}); // true
```

**<font color="#2f9dff" size=4>2. 隐式类型转换</font>**

凡是通过以下的方式执行的操作，如果遇到两个数据结构不一样的情况，都会出现隐式转换。

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240204193319392-390200967.png" /></p>

下面主要解释日常用的比较多的 `==` 与 `+`

**1. `==`的隐式转换规则**

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240204200552466-1608942475.png" /></p>

- 如果**类型相同**无须进行类型转换
- 如果其中一个的操作值是`null`或者`undefined`那么另一个操作符必须为`null`或者`undefined`才会返回`true`否则返回`false`
- 如果其中一个是`Symbol`类型那么返回`false`
- 两个操作值如果都为`string`和`number`类型那么就会将字符串转换为`number`
- 如果一个操作值是`boolean`那么转换为`number`
- 如果一个操作值为`object`且另一方为`string`、`number`或者`symbol`就会把`object`转换(调用`Object.valueOf`或者`toString`方法)为原始类型再进行判断

```js
console.log(null == undefined); // true 规则2
console.log(null == 0); // false 规则2
console.log("" == null); // false 规则2
console.log("" == 0); // true 规则4 字符串转隐式转换成Number之后再对比
console.log("123" == 123); // true 规则4 字符串转隐式转换成Number之后再对比
console.log(0 == false); // true 5 规则布尔型隐式转换成Number之后再对比
console.log(1 == true); // true 规则5 布尔型隐式转换成Number之后再对比

var a = {
  value: 0,
  valueOf: function () {
    this.value++;
    return this.value;
  },
};
//注意这里a又可以等于1、2、3
console.log(a == 1 && a == 2 && a == 3); //true 规则6 Object隐式转换
//注:但是执行过3遍之后,再重新执行a=3或之前的数字就是false,因为value已经加上去了,这里需要注意一下
```

**2. `+`的隐式转换规则**

`+`号操作符不仅可以用作数字相加，还可以用作字符串拼接。

`+`两边都是数字则直接进行加法运算，`+`两边都是字符串直接进行字符串拼接，无需进行隐式转换。

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240204202345931-2001167424.png" /></p>

- 如果其中有一个是**字符串**，另外一个是`undefined`、`null`、或**布尔型**，则调用`toString()`方法进行字符串拼接。如果是**纯对象**、**数组**、**正则**等，则默认调用对象的转换方法会存在优先级，然后再进行拼接。
- 如果其中有一个是**数字**，另外一个是`undefined`、`null`、**布尔型**、或**数字**，则会将其转换成数字进行加法运算，对象的情况还是参考上一条规则。
- 如果其中一个是**字符串**、一个是**数字**，则按照字符串规则进行拼接。

```js
console.log(1 + 2); // 3 常规情况
console.log("1" + "2"); // '12' 常规情况

//下面看一下特殊情况

console.log("1" + undefined); // '1undefined' 规则1, undefined转换字符串
console.log("1" + null); // '1null' 规则1，null转换字符串
console.log("1" + true); // '1true' 规则1，true转换字符串
console.log("1" + 1n); // '11' 比较特殊字符串和BigInt相加，BigInt转换为字符串
console.log(1 + undefined); // NaN 规则2，undefined转换数字相加NaN
console.log(1 + null); // 1 规则2，null转换为0
console.log(1 + true); // 2 规则2，true转换为1，二者相加为2
console.log(1 + 1n); // 错误：Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions 不能把BigInt和Number类型直接混合相加
console.log("1" + 3); // '13' 规则3，字符串拼接
```

整体看来，如果数据中有`字符串`，`JavaScript`还是更倾向于把其他类型的数据转换为字符串。

**3. `Object`的转换规则**

对象的转换首先会调其内置的`toPrimitive`方法

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240204203238372-1196679842.png" /></p>

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
//注意:{}会默认调用valueOf是{}，不是基础类型继续转换；调用toString,返回结果"[object Object]"，于是和10进行'+'运算，按照字符串拼接规则来，参考'+'的规则C

console.log([1, 2, undefined, 4, 5] + 10); // 输出 "1,2,,4,510"

//注意[1,2,undefined,4,5]会默认先调用valueOf结果还是这个数组,不是基础数据类型继续转换,也还是调用toString,返回"1,2,,4,5",然后再和10进行运算,还是按照字符串拼接规则,参考'+'的第3条规则
```

#### 4.深拷贝与浅拷贝

在`JavaScript`的编程中经常需要对数据进行复制，什么时候用深拷贝、什么时候用浅拷贝，是开发过程中需要思考的。

**深入学习这部分知识可以提高你手写 JavaScript 的能力以及对一些边界特殊情况的深入思考能力**

1. 拷贝一个很多嵌套的对象怎么实现
2. 在面试官眼中，写成什么样的深拷贝代码才算合格。

**1. 浅拷贝的原理与实现**

自己创建一个对象，来接受你要重新复制或引用的对象值。如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象；但如果是属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了这个内存中的地址，肯定会影响到另一个对象。

**<font color="#2f9dff" size=4>方法一：`object.assign`</font>**

`object.assign`是`ES6`中`object`的一个方法，该方法可以用于`JavaScript`对象的合并等多个用途，其中一个用途就是可以进行浅拷贝。

> `object.assign`的语法为`Object.assign(target,...sources)`

```js
let target = {};
let source = { a: { b: 1 } };

Object.assign(target, source);
console.log(target); // { a: {b: 1} }
```

下面来看另一个例子

```js
let target = {};
let source = { a: { b: 2 } };

Object.assign(target, source);
console.log(target); // { a: {b: 2} }

source.a.b = 10;
console.log(source); // { a: {b: 10} }
console.log(target); // { a: {b: 10} }
```

**使用`object.assign`时需要注意**

- 它不会拷贝对象的继承属性
- 它不会拷贝对象的不可枚举属性
- 可以拷贝`Symbol`类型的属性

可以简单理解为：`object.assign`循环遍历源对象的属性，通过复制的方式将其赋给目标对象的相应属性。

下面代码用来验证`object.assign`可以拷贝`Symbol`类型的属性

```js
let obj1 = { a: { b: 1 }, sym: Symbol(1) };
Object.defineProperty(obj1, "innumerable", {
  value: "不可枚举属性",
  enumerable: false,
});
let obj2 = {};
Object.assign(obj2, obj1);
obj1.a.b = 2;
console.log("obj1", obj1);
console.log("obj2", obj2);
```

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240218204315441-139389357.png" /></p>

从图中可以看到，`object.assign`可以拷贝`Symbol`类型的对象，但是如果到了对象的第二层属性`obj1.a.b`时，前者值的改变也会影响后者第二层属性的值。说明其中依旧存在访问共同对应内存的问题。这就说明，这种方法还不能进一步的复制，只是完成了浅拷贝的功能。

**<font color="#2f9dff" size=4>方法二：扩展运算符的方法</font>**

利用`JavaScript`的扩展运算符，在构造对象的同时完成浅拷贝的功能。

> 扩展运算符的语法为：`let cloneObj = {...obj};`

```js
/*对象的拷贝*/
let obj = { a: 1, b: { c: 1 } };
let obj2 = { ...obj };
obj.a = 2;
console.log(obj); //{a:2,b:{c:1}}
console.log(obj2); //{a:1,b:{c:1}}
obj.b.c = 2;
console.log(obj); //{a:2,b:{c:2}}
console.log(obj2); //{a:1,b:{c:2}}

/*数组的拷贝*/
let arr = [1, 2, 3];
let newArr = [...arr]; //跟arr.slice()是一样的效果
console.log(newArr); // [ 1, 2, 3 ]
```

扩展运算符和`object.assign`有同样的缺陷：二者实现浅拷贝的功能差不多，但是如果属性都是基本类型的值，使用扩展运算符进行浅拷贝会更加方便一些。

**<font color="#2f9dff" size=4>方法三：`concat`拷贝数组</font>**

> **数组的`concat`方法其实也是浅拷贝**

```js
let arr = [1, 2, 3];
let newArr = arr.concat();
newArr[1] = 100;
console.log(arr); // [ 1,2,3]
console.log(newArr); // [1,100,3]
```

使用`concat`方法连接一个含有引用类型数据的数组时，需要注意修改原数组中的元素的属性，因为它会影响拷贝之后连接的数组。不过`concat`只能用于数组的浅拷贝，使用场景比较局限。

**<font color="#2f9dff" size=4>方法四：`slice`拷贝数组</font>**

> **`slice`方法仅仅针对数组类型**

> `slice`的语法为：`arr.slice(begin,end);`

`slice`使用也比较局限，因为它仅仅只针对于数组类型。`slice`方法会返回一个新的数组对象，这个方法由该对象的前两个参数来决定数组截取的开始位置与结束位置，而不会改变原始数组。

```js
let arr = [1, 2, { val: 4 }];
let newArr = arr.slice();
newArr[2].val = 1000;
console.log(arr); //[ 1, 2, { val: 1000 } ]
```

这段代码中就可以看到浅拷贝的限制所在了，它只能拷贝一层对象，如果存在对象的嵌套，那么浅拷贝将无能为力。因此，深拷贝就是为了解决这个问题而生的。他能解决多层对象嵌套问题，彻底实现拷贝。

**2. 手工实现一个浅拷贝**

1. 对基础类型做一个最基本的拷贝
2. 对引用类型开辟一个新的存储，并且拷贝一层对象属性。

```js
const shallowClone = (target) => {
  if (typeof target === "object" && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in cloneTarget) {
      // if (target.hasOwnProperty(prop)) {
      if (Object.prototype.hasOwnProperty.call(target, prop)) {
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
};
```

这里我们利用了类型的判断，针对引用类型的对象进行`for`循环遍历对象属性，赋值给目标对象的属性，基本手工实现浅拷贝。

---

**3. 深拷贝的原理和实现**

浅拷贝只是创建了一个新的对象，复制了原有对象的基本类型的值。而引用数据类型值拷贝了一层属性，再深层的就无法拷贝了。

**对于复杂引用数据类型，其在堆内存中完全开辟了一块内存地址，并将原有的对象完全复制过来存放。这两个对象是相互独立、不受影响的，彻底实现了内存的分离。**

总的来说，深拷贝的原理可以总结为，将一个对象从内存中完整地拷贝出来一份给目标对象，并从堆内存中开辟一个全新的空间存放新对象，且新对象的修改并不会改变原对象，二者实现真正的分离。

**1. 方法一：乞丐版(`JSON.stringfy`)**

> `JSON.stringfy()`是目前开发过程中最简单的深拷贝方法，其实就是把一个对象序列化为一个`JSON`的字符串。并把对象里面的内容转换为字符串，最后再用`JSON.parse`方法将`JSON`字符串生成一个新的对象。

```js
let obj1 = { a: 1, b: [1, 2, 3] };
let str = JSON.stringify(obj1);
let obj2 = JSON.parse(str);
console.log(obj2); //{a:1,b:[1,2,3]}
obj1.a = 2;
obj1.b.push(4);
console.log(obj1); // {a:2,b:[1,2,3,4]}
console.log(obj2); // {a:1,b:[1,2,3]}
```

从这段代码中可以看到，通过`JSON.stringfy()`可以初步实现一个对象的拷贝。通过改变`obj1`的`b`属性，`obj2`这个对象也不会受影响。

**使用`JSON.stringfy()`进行深拷贝时要注意**

1. 拷贝的对象的值中如果有`函数`、`undefined`、`symbol`这几种类型,经过`JSON.stringify` 序列化之后的字符串中这个键值对会消失
2. 拷贝 `Date` 引用类型会变成字符串
3. 无法拷贝不可枚举的属性
4. 无法拷贝对象的`原型链`
5. 拷贝 `RegExp` 引用类型会变成空对象
6. 对象中含有 `NaN`、`Infinity` 以及`-Infinity`，`JSON` 序列化的结果会变成 `null`
7. 无法拷贝对象的循环应用,即对象成环`(obj[key]=obj)`

```js
function Obj() {
  this.func = function () {
    alert(1);
  };
  this.obj = { a: 1 };
  this.arr = [1, 2, 3];
  this.und = undefined;
  this.reg = /123/;
  this.date = new Date(0);
  this.NaN = NaN;
  this.infinity = Infinity;
  this.sym = Symbol(1);
}

let obj1 = new Obj();
Object.defineProperty(obj1, "innumerable", {
  enumerable: false,
  value: "innumerable",
});
console.log("obj1", obj1);
let str = JSON.stringify(obj1);
let obj2 = JSON.parse(str);
console.log("obj2", obj2);
```

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240219204257148-1780404212.png" /></p>

使用`JSON.stringfy()`方法进行深拷贝对象，虽然目前还有很多无法实现的功能，但这种方法足以满足日常的开发需求。并且是最简单和快捷的。

---

**2. 方法二：基础版（手写递归实现）**

```js
let obj1 = {
  a: {
    b: 1,
  },
};
function deepClone(obj) {
  let cloneObj = {};
  for (let key in obj) {
    //遍历
    if (typeof obj[key] === "object") {
      cloneObj[key] = deepClone(obj[key]); //是对象就再次调用该函数递归
    } else {
      cloneObj[key] = obj[key]; //基本类型的话直接复制值
    }
  }
}

let obj2 = deepClone(obj1);
obj1.a.b = 2;
console.log(obj2); // {a:{b:1}}
```

**使用基础版递归进行深拷贝时要注意**

1. 这个深拷贝函数并不能复制不可枚举的属性以及 `Symbol` 类型
2. 这种方法只是针对普通的引用类型的值做递归复制，对于`数组`、`日期函数`、`正则`、`错误对象`、`function`这样的引用类型并不能正确的拷贝。
3. 对象的属性里面成环，即循环引用没有解决。

---

**3. 方法三：改进版（改进后递归实现）**

针对以上几个问题，通过一下四点理论来指导你怎么做

- 针对能够遍历对象的`不可枚举属性`以及 `Symbol类型` 我们可以使用 `Reflect.ownKeys` 方法
- 当参数为 `Date`、`RegExp`类型,则直接生成一个新的实例返回
- 利用 `Object` 的 `getOwnPropertyDescriptors` 方法可以获得对象的所有属性，以及对应的特性，顺便结合 `Object` 的 `create` 方法创建一个新对象，并继承传入原对象的原型链。
- 利用 `WeakMap` 类型作为`Hash`表,因为 `WeakMap` 是弱引用类型,可以有效防止内存泄漏,作为检测循环引用很有帮助,如果存在循环,则引用直接返回 `WeakMap` 存储的值。（_有人使用 WeakMap 来解决循环引用问题但是很多解释都是不够清晰的，建议自己学习了解。_）

你写的每一行代码都是需要经过深思熟虑并且非常清晰明白的这样你才能经得住面试官的推敲

```js
const isComplexDataType = (obj) =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;
const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) return new Date(obj); //日期对象直接返回一个新的日期对象
  if (obj.constructor === RegExp) return new RegExp(obj); //正则对象直接返回一个新的正则对象
  //如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) return hash.get(obj);
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  //遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  //继承原型链
  hash.set(obj, cloneObj);
  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== "function"
        ? deepClone(obj[key], hash)
        : obj[key];
  }
  return cloneObj;
};

let obj = {
  num: 0,
  str: "",
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: "我是一个对象", id: 1 },
  arr: [0, 1, 2],
  func: function () {
    console.log("我是一个函数");
  },
  date: new Date(0),
  reg: new RegExp("/我是一个正则/ig"),
  [Symbol("1")]: 1,
};

Object.defineProperty(obj, "innumerable", {
  enumerable: false,
  value: "不可枚举属性",
});
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj));
obj.loop = obj; //设置loop成循环引用的属性
let cloneObj = deepClone(obj);
cloneObj.arr.push(4);
console.log("obj", obj);
console.log("cloneObj", cloneObj);
```

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240219210819121-1989207252.png" /></p>

很多人对如何实现深拷贝的细节问题并不清楚，但是如果仔细研究你就会发现，这部分内容对于你深入了解 JavaScript 底层的原理有很大帮助。

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240219210941698-1234404498.png" /></p>

最好的建议还是要多动手，不清楚的地方自己敲一遍代码,这样才能加深印象。

### 二、继承实现：探究 JavaScript 常见的 6 种继承方式

**继承：** 继承是面向对象的，使用这种方式我们可以更好地服用以前开发的代码，缩短开发的周期、提升开发效率。

**继承在各种编程语言中都充当着至关重要的角色**

它天生的灵活性使应用场景更加丰富，`JavaScript` 中的继承也经常用在前端工程基础库的搭建中，在整个`JavaScript`的学习中尤为重要。

通过这部分知识的学习，可以让你对 `JavaScript` 的继承有更深一步的理解。使用起来更加得心应手，并可以轻松掌握和 `JavaScript` 继承相关的面试题目。

思考以下下问题

1. `JavaScript` 的继承到底有多少种实现方式呢?
2. `ES6` 的 `extends` 关键字是用哪种继承方式实现的呢?

#### 1. 继承概念的探究

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240221205345627-1534153238.png" /></p>

**继承可以使得子类别具有父类的各种方法和属性：** 在上图例子中，轿车和货车分别继了汽车的属性，而不需要在轿车中定义汽车已有的属性。在轿车继承汽车的同时，也可以重新定义汽车的某些属性，并重写或者覆盖某些属性与方法，使其获得与汽车这个父类不同的属性与方法。

继承的基本概念就初步介绍到这里，下面我们就来看看 `JavaScript` 都有哪些实现继承的方法。

#### 2. 实现继承的几种方法

**1. 方法一：原型链继承**

原型链继承是比较常见的继承方式之一，其中涉及的**构造函数**、**原型**和**实例**，三者之间存在着一定的关系。

- 每一个构造函数都有一个原型对象
- 原型对象又包含一个指向构造函数的指针
- 而实例则包含一个原型对象的指针

```js
function Parent1() {
  this.name = "parent1";
  this.play = [1, 2, 3];
}
function Child1() {
  this.type = "child2";
}
Child1.prototype = new Parent1();
console.log(new Child1()); // Parent1 { type: 'child2' }
```

这段代码看起来没什么问题，虽然父类的方法和属性都能够访问，但存在一个潜在的问题，下面举例说明。

```js
var s1 = new Child1();
var s2 = new Child1();
s1.play.push(4);
console.log(s1.play, s2.play); // [ 1, 2, 3, 4 ] [ 1, 2, 3, 4 ]
```

其中只改变了 `s1` 的属性，那么为什么 `s2` 也跟着变了？ 因为两个实例使用的是统一个原型对象。

内存空间是共享的，当一个发生变化的时候，另外一个也随之进行了变化，这就是使用原型链继承的一个缺点，因此我们就要使用其它方法来解决这个问题。

**2. 方法二：构造函数继承(借助 call)**

```js
function Parent1() {
  this.name = "parent1";
}

Parent1.prototype.getName = function () {
  return this.name;
};

function Child1() {
  Parent1.call(this);
  this.type = "child1";
}

let child = new Child1();
console.log(child); // Child1 { name: 'parent1', type: 'child1' }
console.log(child.getName()); // 报错 TypeError: child.getName is not a function at Object.<anonymous>
```

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240226200702091-728032989.png" /></p>

通过打印结果可以看到，除`Child1`的属性`type`之外，`child`也继承了`Parent1`的属性`name`。这样写的时候虽然子类可以拿到父类的属性值，解决了第一种方式的弊端，但问题是，父类原型对象中一旦存在父类之前自己定义的方法，那么子类将无法继承这些方法。

这种情况下，我们再看控制台执行结果，就可以看到构造函数继承的优缺点。

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240226201430707-1117240173.png" /></p>

它使父类的引用属性不会被共享，优化了第一种继承方式的弊端。但随之而来的缺点也比较明显，只能继承父类的实例属性和方法，不能继承原型属性或方法。

> 上面的两种继承方式各有优缺点，那么结合二者的优点，于是就产生了下面这种组合继承的方式。

**3. 方法三：组合继承(前两种组合)**

这种方式组合了前两种继承的优缺点，请看代码。

```js
function Parent3() {
  this.name = "parent3";
  this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
  return this.name;
};

function Child3() {
  // 第二次调用Parent3()
  Parent3.call(this);
  this.type = "child3";
}

// 第一次调用Parent3()
Child3.prototype = new Parent3();
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;
let s3 = new Child3();
let s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play); // [ 1, 2, 3, 4 ] [ 1, 2, 3 ]
console.log(s3.getName()); // 正常输出 parent3
console.log(s4.getName()); // 正常输出 parent3
```

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240226203006827-1628446369.png" /></p>

之前方法一和方法二的问题的得以解决，但是这里又增加了一个新问题。通过注释我们可以看到`parent3`执行了两次，第一次是改变`child3`的`prototype`的时候，第二次通过`call`调用`parent3`的时候，那么`parent3`多构造一次，就多进行了一次性能开销，这是我们不愿意看到的。那么是否有更好的方法，请看下面的第六种方式。

上面的介绍更多的是围绕构造函数的方式，那么对于`JavaScript`普通对象怎么实现继承呢？

**4. 方法四：原型式继承**

这里不得不提到的是`ES5`里面的`Object.create()`方法，这个方法接收两个参数。

1. 用作新对象原型的对象
2. 为新对象定义额外属性的对象(可选参数)

下面通过一段代码，看看普通对象是怎么实现继承的。

```js
let parent4 = {
  name: "parent4",
  friends: ["p1", "p2", "p3"],
  getName: function () {
    return this.name;
  },
};

let parent41 = Object.create(parent4);
parent41.name = "tom";
parent41.friends.push("jerry");

let parent5 = Object.create(parent4);
parent5.friends.push("lucy");

console.log(parent41.name); // tom
console.log(parent41.name === parent41.getName()); // true
console.log(parent5.name); // parent4
console.log(parent41.friends); // [ 'p1', 'p2', 'p3', 'jerry', 'lucy' ]
console.log(parent5.friends); // [ 'p1', 'p2', 'p3', 'jerry', 'lucy' ]
```

从代码可以看到，通过`Object.create()`这个方法可以实现普通对象继承，不仅能继承属性，同样也能继承`getName`方法。下面是运行结果：

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202402/2332774-20240227205322098-1713923246.png" /></p>

前两个结果不做说明，第三个结果是`parent5`继承了`parent4`的内部属性，没有进行覆盖，因此输出父对象的属性。最后两个输出结果是一样的，这里可以联想到前面讲过的浅拷贝的知识点，过于引用数组类型共享的问题。

其实，`Object.create()`方法是可以对一些对象实现浅拷贝的，那么关于这种继承方式的缺点也很明显：多个实例的引用类型属性指向相同内存，存在篡改的可能。接下来，我们来看在这个继承基础上进行优化的另一种继承方式。

**5. 方法五：寄生式继承**

使用原型式继承可以获得一份目标对象的浅拷贝，然后利用这个浅拷贝的能力再进行增强，
添加一些方法。这样的方式称为寄生式继承。

虽然优缺点和原型式继承一样，但对于普通对象的继承方式来说，寄生式继承相比于原型式继承还是在父类上添加了更多的方法。

```js
let parent5 = {
  name: "parent5",
  friends: ["p1", "p2", "p3"],
  getName: function () {
    return this.name;
  },
};

function clone(original) {
  let clone = Object.create(original);
  clone.getFriends = function () {
    return this.friends;
  };
  return clone;
}

let person5 = clone(parent5);

console.log(person5.getName());
console.log(person5.getFriends());
```

我们可以看到通过寄生式继承生成的实例，它不仅仅有`getName()`方法，还用了`getFriends()`方法。

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202403/2332774-20240312210232195-1447153219.png" /></p>

`person5`通过`clone`方法添加了`getFriends`方法，从而使`person5`这个普通对象在继承过程中有增加了一个方法，这样的继承方式就是寄生式继承。

在上面几种组合式继承中提到了一些弊端，也就是两次调用父类构造函数造成浪费，上面介绍的寄生式继承就可以解决这种问题。结合第四种提及的继承方式，解决普通对象的继承`Object.create()`方法，我们在前面这几种继承方式的基础上做了改造，得出了寄生式继承的方式，这也是所有继承方式里面相对最优的继承。

**6. 方法六：寄生组合式继承**

```js
function clone(parent, child) {
  // // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function Parent6() {
  this.name = "parent6";
  this.play = [1, 2, 3];
}

Parent6.prototype.getName = function () {
  return this.name;
};

function Child6() {
  Parent6.call(this);
  this.friends = "child5";
}

clone(Parent6, Child6);

Child6.prototype.getFriends = function () {
  return this.friends;
};

let person6 = new Child6();
console.log(person6);
console.log(person6.getName());
console.log(person6.getFriends());
```

通过这段代码可以看出来，这种寄生组合式方式基本可以解决前几种继承方式的缺点，较好的实现了继承想要的结果。同时也减少了构造函数的次数，减少了性能开销。

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202403/2332774-20240313204133702-2058872341.png" /></p>

打印结果可以看到，属性都得到了继承，方法也没有问题，可以输出预期结果。整体看下来**寄生组合式继承**是最优结果。

另外`ES6`还提供了继承的关键词`extend`，我们在看一下`extend`继承逻辑实现。

**7. ES6 的 extends 关键字实现逻辑**

使用关键词很容易直接实现 `JavaScript` 的继承，但是如果想深入了解 extends 语法糖是怎么实现的，就得深入研究 `extends` 的底层逻辑。

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  //原型方法
  // 即 Person.prototype.getName=function() {}
  // 下面可以简写为 getName() {...}
  getName = function () {
    console.log("Person:", this.name);
  };
}
class Gamer extends Person {
  constructor(name, age) {
    //子类中存在构造函数,则需要在使用“this”之前首先调用 super()。
    super(name);
    this.age = age;
  }
}

const asuna = new Gamer("Asuna", 20);
asuna.getName(); //成功访问到父类的方法
```

因为浏览器的兼容性问题，如果遇到不支持`ES6`的浏览器，就得利用`babel`这个编译工具将`es5`代码编译成`es6`代码，让一些不支持新语法特性的浏览器也能运行。那么最后`extends`变异成什么样了呢？

```js
function _possibleConstructorReturn(self, call) {
  // ...
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  //这里可以看到
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });

  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto_ = superClass);
}

var Parent = function Parent() {
  // 验证是否是 Parent 构造出来的 this
  _classCallCheck(this, Parent);
};

var Child = (function (_Parent) {
  inherits(Child, _Parent);
  function Child() {
    classCallCheck(this, Child);
    return _possibleConstructorReturn(
      this,
      (Child.__proto || Object.getPrototypeOf(Child)).apply(this, arguments)
    );
  }
  return Child;
})(Parent);
```

我们看一下转译后的代码片段，从编译完的源码中可以看到，它采用的也是寄生组合式继承的方式。因此，也证明了这种方式是最优的解决继承的方式。

**8. 总结**

<p align=center><img src="https://img2024.cnblogs.com/blog/2332774/202403/2332774-20240313205941172-1716967837.png" /></p>

通过以上的脑图，通过`Object.create`来划分不同的继承方式。最后的寄生组合式继承，是通过组合继承改造过后最优的继承方式。而`extends`的语法糖，和寄生自合继承的方式基本类似。

你可以看到不同的继承有不同的优缺点，我们需要深入了解不同方式的优缺点，这样才能在日常开发中选择适合当前的开发方式。

**开发者往往会忽视对继承相关的系统性学习，**继承的方法比较多，每个实现的方法细节也比较零散。很多开发者很难有一个系统的、整体的认识，造成效率低下以及代码能力难以进一步提升等问题。因此，通过对上面知识的学习可以深入了解到继承相关的知识，在开发中可以很好的规避提到的问题。

### 四、继承进阶：如何实现 new、apply、call、bind 的底层逻辑

通过上一讲的学习，可以看到在继承的实现过程中，我们综合使用了 new、apply 以及 call 的方法。那么这一讲我们就围绕着这几个方法进行深入的学习，以便于你清楚这几个核心方法的实现思路，更好的理解继承的原理。

**JavaScript 中的 apply、call 和 bind 方法是前端代码开发中相当重要的概念，并且与 this 的指向密切相关。**

如果你想有了解`JavaScript`凡人基础，那么必须了解这些常见的方法。在开始之前，首先请思考几个问题。

1. 用什么样的思路可以 new 关键词?
2. apply、call、bind 这三个方法之间有什么区别?
3. 怎样实现一个 apply 或者 call 的方法?

#### 1. new 原理的介绍

`new` 关键词的主要作用就是执行一个构造函数、返回一个实例对象，在`new`的过程中根据构造函数的情况，来确定是否可以接受参数的传递。

下面来看一个简单的例子

```js
function Person() {
  this.name = "Jack";
}

let p = new Person();
console.log(p.name); // Jack
```

这段代码比较简单，从输出结果可以看到，`p`是一个通过`Person`这个构造函数生成的一个实例对象。那么`new`在这个生成实例的过程中到底执行了哪些步骤呢？

总结有以下几点

1. 创建一个新对象
2. 将构造函数的作用域赋给新对象(this 指向新对象)
3. 执行构造函数中的代码(为这个新对象添加属性)
4. 返回新对象

那么如果不使用`new`关键字，结合下面的代码进行改造，去掉`new`会发生什么样的变化呢？

```js
function Person() {
  this.name = "Jack";
}
var p = Person();
console.log(p); // undefined
console.log(name); // Jack
console.log(p.name); // TypeError: Cannot read property 'name' of undefined
```

那么构造函数中有`return`一个对象的操作时，结果又会是怎么样呢？

```js
function Person() {
  this.name = "Jack";
  return { age: 18 };
}
var p = new Person();
console.log(p); // { age: 18 }
console.log(p.name); // undefined
console.log(p.age); // 18
```

可以看出构造函数最后`return`一个与`this`无关的对象时，`new`命令会直接返回这个新对象，而不是通过`new`执行步骤生成的`this`对象。但是这里要求构造函数必须返回一个对象，如果返回不是一个对象，那么还是会按照`new`实现的步骤，返回新生成的对象。接下来，我们还是在上段代码中改造一下。

```js
function Person() {
  this.name = "Jack";
  return "Tom";
}
var p = new Person();
console.log(p); // { name: 'Jack' }
console.log(p.name); // Jack
```

可以看出构造函数`return`的不是一个对象时，还是通过`new`关键字执行步骤生成一个新的对象，也就是绑定了最新`this`，最后返回出来。因此，我们总结一下。

**new 关键词执行之后总是会返回一个对象，要么是实例对象,要么是 return 语句指定的对象。**

#### 2. apply&call&bind 原理的介绍

call、apply 和 bind 是挂在 Function 对象上的三个方法，**调用这三个方法的必须是一个函数**。

基础语法：

```js
func.call(thisArg,param1,param2,...)
func.apply(thisArg,[param1,param2,...])
func.bind(thisArg,param1,param2,...)
```

`func`是要调用的函数，`thisArg`一般为`this`指向的对象，后面的多个`param`为函数`function`的多个参数，如果不需要也可以不写。

**这三个方法共有的比较明显的特征就是改变函数 func 的 this 指向**

- `call`和`apply`的区别在于传参不同，`apply`的第二个参数为数组，`call`则是从第二个至第 N 个都是给`func`传参
- `bind`和这两个不同，`bind`虽然改变了`func`的`this`指向，但不是马上执行。而`call`和`apply`是在改变了函数的`this`指向后立马执行的。

这些解释理解起来有点抽象，下面配合例子与代码一起看一下。

> 生活中我不经常做饭，家里没有锅，周末突然想给自己做个饭尝尝。但是家里没有锅，而我又不想出去买，所以就问隔壁邻居借了一个锅来用，这样做了饭，又节省了开销，一举两得。

`A 对象`有个 `getName` 的方法，`B对象`也需要临时使用同样的方法那么这时候可以借用 `A 对象`的 `getName` 方法。既达到了目的，又节约了重复的定义以及节省了内存空间。请看以下代码：

```js
let a = {
  name: "jack",
  getName: function (msg) {
    return msg + this.name;
  },
};

let b = {
  name: "lily",
};

console.log(a.getName("hello~")); // hello~jack
console.log(a.getName.call(b, "hi~")); // hi~lily
console.log(a.getName.apply(b, ["hi~"])); // hi~lily
let name = a.getName.bind(b, "hello~");
console.log(name()); // hello~lily
```

从执行的结果可以发现，这三个方式都可以达到我们想要的目标，也就是通过改变`this`指向，让`B`对象可以直接使用`A`对象中的`get`方法。而且可以看到，最后三个方法输出的都是和`lily`相关的打印结果，满足了我们的预期。

关于这三个方法的原理相关先介绍到这里，我们再看看这几个方法的使用场景。

#### 3. apply&call&bind 使用场景

**下面几种应用场景的理念都是“借用”方法的思路**

**1.判断数据类型**

用`Object.prototype.toString`几乎可以判断所有类型的数据

```js
function getTpye(obj) {
  let type = typeof obj;
  if (type !== "object") return type;
  return Object.prototype.toString.call(obj).repalce(/^$/, "$1");
}
```

结合这段代码以及前面说的`call`方法的借用思路，那判断数据类型的方法就是借用了`object`原型链上的`toString`方法，最后返回用来判断传入的`object`字符串来确定最后的数据类型。

**2.类数组借用方法**

类数组因为不是真正的数组，所以没有数组类型是自带的种种方法，可以利用一些方法去**借用**数组的方法。

比如借用数组的`push`方法

```js
let arrayLike = {
  0: "java",
  1: "script",
  length: 2,
};

Array.prototype.push.call(arrayLike, "jack", "lily");
console.log(typeof arrayLike); // object
console.log(arrayLike); // { '0': 'java', '1': 'script', '2': 'jack', '3': 'lily', length: 4 }
```

可以看到，`arrayLike`是一个对象，模拟数组的是一个类数组。从数据类型上看它是一个对象，此外在代码中可以看出，用`typeof`来判断这个对象输出的是`object`，它自身是不会有`push`方法的，这里我们借用`Array`原型链上的`push`方法，可以实现一个类数组的`push`方法。这样就可以给`arrayLike`添加新的元素，从结果也可以看出`push`满足了我们添加元素的诉求。

**3.获取数组的最大/最小值**

用`apply`来实现数组中判断最大/最小值：`apply`直接传递数组作为调用方法的参数，也可以减少一步展开数组。

```js
let arr = [13, 6, 10, 11, 16];

const max = Math.max.apply(Math, arr);
const min = Math.min.apply(Math, arr);

console.log(max); // 16
console.log(min); // 6
```

**4.继承**

与`new`、`call`、实现了各种各样的继承方式，下面是组合式继承。

```js
function Parent3() {
  this.name = "parent3";
  this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
  return this.name;
};

function Child3() {
  Parent3.call(this);
  this.type = "child3";
}

Child3.prototype = new Parent3();
Child3.prototype.constructor = Child3;
let s3 = new Child3();
console.log(s3.getName()); // arent3
```

其实这些方法的应用场景很多，关键在于**借用**方法理念。

#### 4. 如何自己实现这些方法

在互联网大厂的面试中，手写实现 `new`、`call`、`apply`、`bind` 一直是比较高频的题目，结合本讲的内容，我们一起来手工实现一下这几个方法。

**1. new 的实现**

刚才我们介绍了`new`实现的过程，来看一下这个过程中`new`被 1 调用后大致做了几件事。

![](https://img2024.cnblogs.com/blog/2332774/202403/2332774-20240327204647960-28936779.png)

```js
function _new(ctor, ...args) {
  if (typeof ctor !== "function") {
    throw "ctor must be a function";
  }
  let obj = new Object();
  obj.__proto__ = Object.create(ctor.prototype);
  let res = ctor.apply(obj, ...args);

  let isObject = typeof res === "object" && res !== null;
  let isFunction = typeof res === "function";
  return isObject || isFunction ? res : obj;
}
```

**2. apply 和 call 的实现**

`apply` 和 `call`的实现方式都差不多，只是传递的参数同，因此我们放到一起学习。

**结合方法“借用”的原理**

```js
Function.prototype.call = function (context, ...args) {
  context = context || window;
  context.fn = this;
  let result = eval("context.fn(...args)");
  delete context.fn;
  return result;
};

Function.prototype.apply = function (context, args) {
  context = context || window;
  context.fn = this;
  let result = eval("context.fn(...args)");
  delete context.fn;
  return result;
};
```

实现`call`和`apply`的关键就在于`eval`这个代码，其中显示用了`context`这个临时变量来指定上下文，通过执行`eval`来执行`context.fn`这个函数，最后返回`result`。

要注意这两个方法和`bind`的区别在于，**这两个方法是直接返回执行结果，而 bind 方法是返回一个函数。**因此这里直接用`eval`执行得到结果。

**3. bind 的实现**

`bind` 的实现思路基本和 `apply` 一样，但是在最后实现返回结果这里`bind`不需要直接执行,因此不再需要用 `eval` 而是需要通过返回一个函数的方式将结果返回，之后再通过执行这个结果,得到想要的执行效果。

结合这个代码，我们看一下`bind`的底层逻辑以及实现代码。

```js
Function.prototype.bind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("this must be a function");
  }
  var self = this;
  var fbound = function () {
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };
  if (this.prototype) {
    fbound.prototype = Object.create(this.prototype);
  }
  return fbound;
};
```

可见看到实现`bind`的核心在于返回的时候需要返回一个函数，因此这里的`fbound`需要返回。但是在返回的过程中，原型链对象上的属性不能丢失。所以这里要使用`Object.create`方法将`this.prototype`上面的属性挂到`fbound`的原型上面，最后再返回`fbound`。这样调用`bind`方法接收到函数的对象，在通过执行接收的函数就能得到想要的结果。

你是不是已经弄清了`new`、`apply`、`call`、`bind`，这些方法是如何实现的呢？如果还是一知半解，建议你手动实践。

这一讲的内容基本结束了，通过原理以及对底层逻辑的剖析介绍了日常开发中经常用的 `new`、`apply`、`call`、`bind` 这几种方法，最后带你一起动手进行了实践。我们可以看到这几个方法是有区别和联系的。

![](https://img2024.cnblogs.com/blog/2332774/202404/2332774-20240402213515900-1614972341.png)

以上表格对这几个方法做了简单总结，希望可以帮助更好理解。在日常的前端开发中，这些方法在高级`JavaScript`编程中经常出现，尤其是一些比较好的开源项目，经常会通过借用的方式复用已有的方法来节约内存、优化代码、

这些方法的底层逻辑的实现在互联网大厂的前端面试中出现的频率也比较高，每个实现的方法细节也比较零散。希望通过这一讲的学习,你能很好地掌握这部分内容，以便在面试中遇到这类题目的时候能够轻松应对。
