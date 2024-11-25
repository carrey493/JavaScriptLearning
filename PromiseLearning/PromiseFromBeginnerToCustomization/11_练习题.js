setTimeout(()=>{
    console.log(1);
},0)
Promise.resolve().then(()=>{
    console.log(2);
})
Promise.resolve().then(()=>{
    console.log(4);
})
console.log(3);
//3 2 4 1

setTimeout(()=>{
    console.log(1);
},0)
new Promise((resolve)=>{
    console.log(2);
    resolve()
}).then(()=>{
    console.log(3);
}).then(()=>{
    console.log(4);
})
console.log(5);
//2 5 3 4 1

const first = () =>
(new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6)
        }, 0)
        resolve(1)
    })
    resolve(2)
    p.then((arg) => {
        console.log(arg);
    })
}))

first().then((arg) => {
    console.log(arg);
})
console.log(4);
//3 7 4 1 2 5

setTimeout(() => {
    console.log(0);
}, 0)
new Promise((resolve, reject) => {
    console.log(1);
    resolve()
}).then(() => {
    console.log(2);
    new Promise((resolve, reject) => {
        console.log(3);
        resolve()
    }).then(() => {
        console.log(4);
    }).then(() => {
        console.log(5);
    })
}).then(() => {
    console.log(6);
})

new Promise((resolve, reject) => {
    console.log(7);
    resolve()
}).then(() => {
    console.log(8);
})
//1 7 2 3 8 4 6 5 0
