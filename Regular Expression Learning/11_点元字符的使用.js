// . 除了换行符以外的所有字符
let hd = 'as$$$$#dhjaskdnajbdj-9uh'
console.log(hd.match(/.+/));

let url = 'http:ww.baidu.com'
console.log(url.match(/https?:\/\/\w+\.\w+\.\w/));

let hd2 = `
asdaklslj
sada
`
//s 模式s ：视为单行匹配
console.log(hd2.match(/.+/s)[0]);

//空格严格意义上与其它字符相同
let hd3 = `010 - 986544`
console.log(hd3.match(/\d+ - \d{6}/));
console.log(hd3.match(/\d+\s-\s\d{6}/));
