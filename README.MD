# JavaScriptLearning

**说明：本仓库是JavaScript相关知识的学习总结**

## 简介

`JavaScript`（简称“JS”） 是一种具有函数优先的轻量级，解释型或即时编译型的`编程语言`。虽然它是作为开发Web页面的脚本语言而出名，但是它也被用到了很多非`浏览器`环境中，`JavaScript` 基于原型编程、多范式的动态脚本语言，并且支持`面向对象`、`命令式`、`声明式`、`函数式编程范式`。

`JavaScript`在1995年由`Netscape`公司的`Brendan Eich`，在网景导航者浏览器上首次设计实现而成。因为Netscape与Sun合作，Netscape管理层希望它外观看起来像Java，因此取名为`JavaScript`。但实际上它的语法风格与Self及Scheme较为接近。

`JavaScript`的标准是`ECMAScript` 。截至 2012 年，所有浏览器都完整的支持ECMAScript 5.1，旧版本的浏览器至少支持ECMAScript 3 标准。2015年6月17日，ECMA国际组织发布了ECMAScript的第六版，该版本正式名称为 ECMAScript 2015，但通常被称为ECMAScript 6 或者ES2015。

## 产生背景

`JavaScript`最初由Netscape的Brendan Eich设计，最初将其脚本语言命名为`LiveScript`，后来Netscape在与Sun合作之后将其改名为`JavaScript`。`JavaScript`最初受Java启发而开始设计的，目的之一就是“看上去像Java”，因此语法上有类似之处，一些名称和命名规范也借自Java，但`JavaScrip`t的主要设计原则源自Self和Scheme。`JavaScript`与Java名称上的近似，是当时Netscape为了营销考虑与Sun微系统达成协议的结果。微软同时期也推出了JScript来迎战`JavaScript`的脚本语言。

发展初期，`JavaScript`的标准并未确定，同期有Netscape的`JavaScript`，微软的JScript和CEnvi的ScriptEase三足鼎立。为了互用性，Ecma国际（前身为欧洲计算机制造商协会）创建了`ECMA-262标准（ECMAScript）`，两者都属于`ECMAScript`的实现，尽管`JavaScript`作为给非程序人员的脚本语言，而非作为给程序人员的脚本语言来推广和宣传，但是`JavaScript`具有非常丰富的特性。1997年，在ECMA（欧洲计算机制造商协会）的协调下，由Netscape、Sun、微软、Borland组成的工作组确定统一标准：ECMA-262。完整的`JavaScript`实现包含`三个部分`：`ECMAScript`，`文档对象模型`，`浏览器对象模型`。

`JavaScript`是甲骨文公司的注册商标。`Ecma`国际以`JavaScript`为基础制定了`ECMAScript标准`。`JavaScript`也可以用于其他场合，如服务器端编程（Node.js）。

## 主要功能

- 嵌入动态文本于HTML页面。 
- 对浏览器事件做出响应。 
- 读写HTML元素。  
- 在数据被提交到服务器之前验证数据。  
- 检测访客的浏览器信息。  控制cookies，包括创建和修改等。  
- 基于Node.js技术进行服务器端编程。

## 语言组成

- ECMAScript，描述了该语言的语法和基本对象。 
- 文档对象模型（DOM），描述处理网页内容的方法和接口。 
- 浏览器对象模型（BOM），描述与浏览器进行交互的方法和接口。 

## 运行模式

`JavaScript`是一种属于网络的高级脚本语言,已经被广泛用于`Web应用开发`,常用来为网页添加各式各样的动态功能,为用户提供更流畅美观的浏览效果。通常`JavaScript`脚本是通过嵌入在`HTML`中来实现自身的功能的

- 是一种`解释性脚本语言`（代码不进行预编译）。 
- 主要用来向HTML（标准通用标记语言下的一个应用）页面添加交互行为。 
- 可以直接嵌入HTML页面，但写成单独的js文件有利于结构和行为的分离。 
- `跨平台特性`，在绝大多数浏览器的支持下，可以在多种平台下运行（如Windows、Linux、Mac、Android、iOS等）。
- `JavaScript`脚本语言同其他语言一样，有它自身的基本数据类型，表达式和算术运算符及程序的基本程序框架。
- `JavaScript`提供了四种基本的数据类型和两种特殊数据类型用来处理数据和文字。而变量提供存放信息的地方，表达式则可以完成较复杂的信息处理。

## 语言特点

**JavaScript脚本语言具有以下特点:**

- （1）脚本语言。`JavaScript`是一种解释型的脚本语言，C、C++等语言先编译后执行，而`JavaScript`是在程序的运行过程中逐行进行解释。
- （2）基于对象。`JavaScript`是一种基于对象的脚本语言，它不仅可以创建对象，也能使用现有的对象。
- （3）简单。`JavaScript`语言中采用的是弱类型的变量类型，对使用的数据类型未做出严格的要求，是基于Java基本语句和控制的脚本语言，其设计简单紧凑。
- （4）动态性。`JavaScript`是一种采用事件驱动的脚本语言，它不需要经过Web服务器就可以对用户的输入做出响应。在访问一个网页时，鼠标在网页中进行鼠标点击或上下移、窗口移动等操作`JavaScript`都可直接对这些事件给出相应的响应。
- （5）跨平台性。`JavaScript`脚本语言不依赖于操作系统，仅需要浏览器的支持。因此一个`JavaScript`脚本在编写后可以带到任意机器上使用，前提是机器上的浏览器支 持`JavaScript`脚本语言，`JavaScript`已被大多数的浏览器所支持。 不同于服务器端脚本语言，例如PHP与ASP，`JavaScript`主要被作为客户端脚本语言在用户的浏览器上运行，不需要服务器的支持。所以在早期程序员比较倾向于使用`JavaScript`以减少对服务器的负担，而与此同时也带来另一个问题，安全性。而随着服务器的强壮，虽然程序员更喜欢运行于服务端的脚本以保证安全，但`JavaScript`仍然以其跨平台、容易上手等优势大行其道。**同时，有些特殊功能（如AJAX）必须依赖JavaScript在客户端进行支持。**

## 编译模式

`JavaScript`是一种`脚本语言`，其源代码在发往客户端运行之前`不需经过编译`，而是`将文本格式的字符代码发送给浏览器由浏览器解释运行`。直译语言的弱点是安全性较差，而且在`JavaScript`中，如果一条运行不了，那么下面的语言也无法运行。

`JavaScript`被归类为直译语言，因为主流的引擎都是每次运行时加载代码并解译。V8是将所有代码解译后再开始运行，其他引擎则是逐行解译（SpiderMonkey会将解译过的指令暂存，以提高性能，称为实时编译），但由于V8的核心部分多数用`JavaScript`撰写（而SpiderMonkey是用C++），因此在不同的测试上，两者性能互有优劣。与其相对应的是编译语言，例如C语言，以编译语言编写的程序在运行之前，必须经过编译，将代码编译为机器码，再加以运行。

## 语言标准

`JavaScript`已经被`Netscape`公司提交给`ECMA`制定为标准，称之为`ECMAScript`，标准编号`ECMA-262`。符合ECMA-262 3rd Edition标准的实现有：
- Microsoft公司的JScript.
- Mozilla的JavaScript-C（C语言实现），现名SpiderMonkey
- Mozilla的Rhino（Java实现）
- Digital Mars公司的DMDScript
- Google公司的V8
- WebKit

### JavaScript Advanced Programming 4th Edition

**JavaScript高级程序设计第四版读书笔记**

本书是JavaScript经典图书的新版。第4版涵盖ECMAScript2019，全面、深入地介绍了JavaScript开发者必须掌握的前端开发技术，涉及JavaScript的基础特性和高级特性。书中详尽讨论了JavaScript的各个方面，从JavaScript的起源开始，逐步讲解到新出现的技术，其中重点介绍ECMAScript和DOM标准。在此基础上，接下来的各章揭示了JavaScript的基本概念，包括类、契约、迭代器、代理，等等。另外，书中深入探讨了客户端检测、事件、动画、表单、错误处理及JSON。本书同时也介绍了近几年来涌现的重要新规范，包括FetchAPI、模块、工作者线程、服务线程以及大量新的API。

### JavaScript Basic Grammar Learning

**JavaScript基础知识语法学习笔记**

目录
- 初识JavaScript
- JavaScript注释
- JavaScript输入输出语句
- 变量
- 数据类型
- 运算符
- 流程控制
- 数组
- 函数

### Promise Learning

**Promise从入门到自定义相关内容学习笔记**

提到`Promise`想必大家都不会陌生，`Promise` 是异步编程的一种解决方案，比传统的解决方案：回调函数和事件更合理、更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

`Promise`在前端开发中应用广泛，实际开发主要应用于封装axios请求、验证多个请求结果是否都是满足条件、合并请求结果并处理错误等等。本篇文章将带你从零开始了解`Promise`，熟悉`Promise`的概念与使用，完成自定义(手写)`Promise`，并且扩展一些其它功能，最后也会介绍异步编程的终极解决方案async与await的简单使用。除此之外，也会带领大家学习JavaScript中的宏任务(宏队列)与微任务(微队列)的相关知识，了解事件循环机制，梳理事件循环的顺序，确定JavaScript代码的执行顺序。

https://juejin.cn/post/7118654235373207559

### Regular Expression Learning

**JavaScript正则表达式基础知识学习笔记**

`正则表达式`，又称规则表达式,（Regular Expression，在代码中常简写为regex、regexp或RE），是一种`文本模式`，包括普通字符（例如，a 到 z 之间的字母）和特殊字符（称为"元字符"），是计算机科学的一个概念。
正则表达式使用单个字符串来描述、匹配一系列匹配某个句法规则的字符串，通常被用来检索、替换那些符合某个模式（规则）的文本。
