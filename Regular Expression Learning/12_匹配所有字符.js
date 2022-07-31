// . \d \w

let xj = 'ab'
console.log(xj.match(/[#$%$&#^b]/));

//[\s\S] [\d\D] 匹配所有字符
let s = `<span>ahj
kdhsjkh
###</span>`
console.log(s.match(/<span>[\d\D]+<\/span>/));