//11.变量的数据类型
var number1;//不确定数据类型
var number2 = 10;//数字型
//js的变量数据类型是只有程序运行中根据值来确定的
var str = 'jack';//字符型

//js是动态语言，变量的数据类型是可变化的
var x = 10; //number
var x = 'x' //string

//12.数字型number
var num1 = 10
var num2 = 3.14

//八进制 0~7 以0开头表示八进制
var num3 = 010
console.log(num3);//8

//十六进制 0~9 a~f 数字前加0x表示十六进制
var num4 = 0x9;
console.log(num4);//9

//最大值
console.log(Number.MAX_VALUE);
//1.7976931348623157e+308

//最小值
console.log(Number.MIN_VALUE);
//5e-324

//无穷大
console.log(Number.MAX_VALUE * 2);
//无穷小
console.log(-Number.MAX_VALUE * 2);

//非数字NaN
console.log('test' - 100);

//13.isNaN
/*isNaN(）这个方法用来判断非数字――并且返回一个值 如果是数字返回的是 false 如果不是数字返回的是true */
console.log(isNaN(12));
console.log(isNaN('test'));

//14.字符串型String
//'pink' 'pink老师' '12' 'true'
var str1 = '我是一个"高富帅"程序员';
console.log(str1);
//字符串转义字符 都是以反斜杠 \ 开头 转义字符需要写道引号里面
var str2 = "我是一个'高富帅'\n程序员";
console.log(str2);

//15.弹出框警示案例
alert('酷热难耐，火辣的太阳底下，我挺拔的身姿，成为了最为独特的风景。\n我审视四周，这里，是我的舞台，我就是天地间的王者。\n这一刻，我豪气冲天，终于大喊一声:"收破烂啦~"');

//16.字符串的长度与拼接
//1.检测字符串的长度 length
var str3 = 'my name is andy';
console.log(str3.length);//15
//2.字符串的拼接 +  只要有字符串和其它类型相拼接最终的结果是字符串类型
console.log('沙漠' + '骆驼');//沙漠骆驼
console.log('pink老师' + 18);//pink老师18
console.log('pink老师' + true);//pink老师true
console.log(12 + 12);//24
console.log('12' + '12');//'1212'

//17.字符串拼接加强
console.log('pink老师' + 19 + '岁');//pink老师19岁
var age = 20;
//字符串变量不要写到字符串里，是通过和字符串相连的方式实现的
console.log('pink老师' + age + '岁');//pink老师20岁
//变量和字符串相连口诀：引引相加

//18.显示年龄案例
let age18 = prompt('请输入年龄')
let str18 = '你今年' + age18 + '岁了'
alert(str18)

//19.布尔型Boolean
var f191 = true //true参与加法运算当作1
var f192 = false//false参与加法运算当作0
console.log(f191 + 1);

//20.undefined和null
var str201
console.log(str201);
var str202 = undefined
console.log(str202 + 'test');//undefinedtest
console.log(str202 + 1);//NaN
//null
var space = null
console.log(space + 'test');//nulltest
console.log(space + 1);//1

//21.获取数据变量类型
var num211 = 10
console.log(typeof (num211));//number
var str211 = 'test'
console.log(typeof (str211));//string
var flag211 = true
console.log(typeof (flag211));//boolean
var vari211 = undefined
console.log(typeof (vari211));//undefined
var timer211 = null
console.log(typeof (timer211));//object
var age211 = prompt('请输入你的年龄')//prompt取过来的值字符型
console.log(age211);
console.log(typeof (age211));//string

//22字面量
console.log(18);
console.log('18');
console.log(true);
console.log(undefined);
console.log(null);

//23.转换为字符串
//1.变量.toString()
var num231 = 10
var str231 = num231.toString()
console.log(num231);
console.log(typeof (str231));
//2.String()
console.log(String(num231));
//3.利用 + 
console.log(num231 + '');

//24.转换为数字型
//1.parseInt(变量)可以把 字符型的转换为数字型 得到的是整数 取整--》不进位
var age241 = prompt('请输入你的年龄')
console.log(parseInt(age));
console.log(parseInt('3.14'));//3
console.log(parseInt('120px'));//120会去掉单位
console.log(parseInt('rem120px'));//NaN
//2.parseFloatI(变量)可以把 字符型的转换为数字型 得到的是浮点数
console.log(parseFloat('3.14'));//3.14
console.log(parseFloat('120px'));//120会去掉单位
console.log(parseFloat('rem120px'));//NaN
//3.Number(变量)
var str241 = '123'
console.log(Number(str241));//123
//4.利用算术运算隐式转换 + - * /
console.log('12' - 0);//12
console.log('123' - '120');//3

//25
console.log(Boolean(' ')); //false
console.log(Boolean(o)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(null));// false
console.log(Boolean(undefined)); // false
console.log(Boolean('小白')); // true
console.log(Boolean(12)); // true
