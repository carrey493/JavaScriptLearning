# JavaScript高级程序设计

`第4版`

`[美]马特-弗里斯比(Matt Frisbie)`

Professional JavaScript for Web Developers,4th Edition

**Standing on the Shoulders of Giants**

本书是JavaScript经典图书的新版。第4版涵盖ECMAScript2019，全面、深入地介绍了JavaScript开发者必须掌握的前端开发技术，涉及JavaScript的基础特性和高级特性。书中详尽讨论了JavaScript的各个方面，从JavaScript的起源开始，逐步讲解到新出现的技术，其中重点介绍ECMAScript和DOM标准。在此基础上，接下来的各章揭示了JavaScript的基本概念，包括类、契约、迭代器、代理，等等。另外，书中深入探讨了客户端检测、事件、动画、表单、错误处理及JSON。本书同时也介绍了近几年来涌现的重要新规范，包括FetchAPI、模块、工作者线程、服务线程以及大量新的API。

## 第1章	什么是JavaScript

- JavaScript历史回顾
- JavaScript是什么
- JavaScript与ECMAScript的关系
- JavaScript的不同版本

**1995年，JavaScript问世。**

**JavaScript逐渐成为市面上所有主流浏览器的标配**

**JavaScript的应用也不再局限与数据验证，而是渗透到浏览器窗口及其内容的方方面面。**

**从简单的输入验证脚本到强大的编程语言，JavaScript的崛起没有任何人预测**。

**它很简单，学会用只要几分钟；它又很复杂，掌握它要很多年。**

**要真正学好用好JavaScript，理解其本质、历史及局限性是非常重要的。**

### 1.1	简短的历史回顾

- 1995年 Brendan Eich 开发
- 1996年8月，微软重磅进入Web浏览器领域，代表JavaScript作为一门语言向前迈了一大步
- 1997年，JavaScript1.1作为提案被提交给欧洲计算机制造商协会(Ecma)
- 1998年，国际化标准组织(ISO)和国际电工委员会(IEC)也将ECMAScript采纳为标准(ISO/IEC-16262)。自此以后，各家浏览器均以ECMAScript作为自己JavaScript实现的依据，虽然具体实现不同。

### 1.2	JavaScript实现

**完整的JavaScript实现包含以下几个部分**

- 核心(ECMAScript)
- 文档对象模型(DOM)
- 浏览器对象模型(BOM)

#### 1.2.1	ECMAScript

**ECMAScript，即ECMAScript定义的语言，并不局限于Web浏览器**

**Web浏览器只是ECMAScript实现可能存在的一种宿主环境(host environment)**

**ECMA-262定义了什么**

- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 全局对象

ECMAScript只是对实现这个规范描述的所有方面的一门语言的称呼。JavaScript实现了ECMAScript，而Adobe ActionScript也实现了ECMAScript