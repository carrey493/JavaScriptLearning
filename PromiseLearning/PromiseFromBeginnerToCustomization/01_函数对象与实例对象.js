// - 实例对象：new函数产生的对象，称为实例对象，简称为对象
// - 函数对象：将函数作为对象使用时，简称为函数对象
function Fn() { //Fn函数

}
const fn = new Fn() //Fn是构造函数 fn是实例对象(简称为对象)
console.log(Fn.prototype); //Fn是函数对象
Fn.bind({}) //Fn是函数对象
//括号的左边是函数 点的左边是对象
