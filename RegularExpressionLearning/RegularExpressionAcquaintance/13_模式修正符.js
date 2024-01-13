let hd = 'dJhbjsSaJdbhjkn'
// i 不区分大小写
console.log(hd.match(/j/i));
// g 全局匹配
console.log(hd.match(/j/gi));

console.log(hd.replace(/j/i,'@'));//d@hbjsSaJdbhjkn
console.log(hd.replace(/j/gi,'@'));//d@hb@sSa@dbh@kn

