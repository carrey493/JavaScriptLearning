let ex1 = 'houdunren123cms9988'
console.log([...ex1]);
let nums = [...ex1].filter(a => !Number.isNaN(parseInt(a)))
console.log(nums);
console.log(nums.join(''));

console.log(ex1.match(/\d/g).join(''));