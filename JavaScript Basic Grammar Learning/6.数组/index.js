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