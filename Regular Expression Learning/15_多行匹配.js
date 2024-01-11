let hd = `
#1 js,200 #
#2 java,33 #
#3 php.com # test
`;
// 得到[{name:'js',price:'200'}]
// 多行匹配模式修正符 m
console.log(hd.match(/^\s*#\d+\s.+\s+#$/gm)); //[ '\n#1 js,200 #', '#2 java,33 #' ]
// ^ 以...开始 % 以...结尾

let res = hd.match(/^\s*#\d+\s.+\s+#$/gm);
let content = res.map((v) => {
  v = v.replace(/\s*#\d+\s*/, "").replace(/\s+#/, ""); //去除开头和结尾的#
  console.log(v.split(","));
  [name, price] = v.split(",");
  return [name, price];
});
console.log(content); //[ [ 'js', '200 ' ], [ 'java', '33 ' ] ]
