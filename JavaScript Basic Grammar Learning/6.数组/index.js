// 1.数组(Array):就是一组数据的集合存储在单个变量下的优雅方式
// 2．利用new创建数组
var arr = new Array();//创建了一个空的数组
// 3．利用数组字面量创建数组[]
var arr = [];//创建了一个空的数组
var arr1 = [1, 2, '老师', true];
//4．我们数组里面的数据一定用逗号分隔
//5．数组里面的数据比如 1,2,true，我们称为数组元素
//6. 获取数组元素 格式数组名[索引号]
var arr1 = [1, 2, '老师', true];
console.log(arr1[2]);//老师
console.log(arr1[5]);//undefined

//数组的遍历 就是把数组的元素从头到尾访问一遍
let arr2 = ['a', 'b', 'c']
for (let i = 0; i < 3; i++) {
    // i 当作计数器索引来使用
    console.log(arr2[i]);
}

//求数组的平均值与和
let arr3 = [2, 6, 1, 7, 4]
let sum3 = 0
let average3 = 0
for (let i = 0; i < arr3.length; i++) {
    sum3 += arr3[i]
}
console.log('arr3的和是：', sum3);//20
console.log('arr3的平均值是：', sum3 / arr3.length);//4

//求数组中的最大值
/**
声明一个保存最大元素的变量max。
默认最大值可以取数组中的第一个元素。
遍历这个数组，把里面每个数组元素和max相比较。
如果这个数组元素大于max就把这个数组元素存到max里面，否则继续下一轮比较。
最后输出这个max。
 */
let arr4 = [2, 6, 1, 77, 52, 25, 7]
let max4 = arr4[0]
for (let i = 1; i < arr4.length; i++) {
    if (arr4[i] > max4) {
        max4 = arr4[i]
    }
}
console.log('arr4的最大值是：', max4);//77

//数组转换为分割字符串 将数组转换为字符串并使用其它字符串分割
/* 
将数组['red', 'green', 'blue', 'pink']转换为字符串，并且用│或其他符号分割
1.需要一个新变量用于存放转换完的字符串 str。
2.遍历原来的数组，分别把里面数据取出来，加到字符串里面。
3.同时在后面多加一个分隔符
 */
let arr5 = ['red', 'green', 'blue', 'pink']
let str5 = ''
for (let i = 0; i < arr5.length; i++) {
    str5 += arr5[i] + '|'
}
console.log('分割字符串：', str5);//分割字符串： red|green|blue|pink|

//新增数组元素 修改数组长度
let arr1017 = [24, 8, 6, 8]
console.log(arr1017.length);
arr1017.length = 5
console.log(arr1017);//[ 24, 8, 6, 8, <1 empty item> ]
console.log(arr1017[4]);//undefined

//新增数组元素 修改索引号
let arr10172 = ['red', 'green']
arr10172[2] = 'pionk'
console.log(arr10172);//[ 'red', 'green', 'pionk' ]
arr10172[1] = 'blue'
console.log(arr10172);//[ 'red', 'blue', 'pionk' ] 替换原来的元素
arr10172 = '有点意思'
console.log(arr10172);//有点意思 不能直接给数组名赋值，否则会覆盖掉以前的数据

//循环追加数组
/* 
使用循环来追加数组。声明一个空数组arr。
循环中的计数器i可以作为数组元素存入。
由于数组的索引号是从O开始的，因此计数器从О开始更合适，存入的数组元素要+1。
*/
let arr1023 = []
for (let i = 0; i < 10; i++) {
    arr1023[i] = i
}
console.log(arr1023);
// [0, 1, 2, 3, 4,5, 6, 7, 8, 9]

//筛选数组
let arr10232 = [2, 0, 6, 1, 77, 0, 52, 0, 25, 7]
/* 
声明一个新的数组用于存放新数据newArr 。
遍历原来的旧数组，找出大于等于10的元素。
依次追加给新数组newArr。
*/
let newArr10232 = []
let j = 0
for (let i = 0; i < arr10232.length; i++) {
    if (arr10232[i] >= 10) {
        // newArr10232.push(arr10232[i])
        //新数组从0开始依次递增
        newArr10232[j] = arr10232[i]
        j++
    }
}
console.log(newArr10232);//[ 77, 52, 25 ]