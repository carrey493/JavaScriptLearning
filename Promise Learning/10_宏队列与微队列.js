setTimeout(() => {
    console.log('setTimeout1');
    Promise.resolve(3).then(
        value => {
            console.log('Promise onResolved3', value);
        }
    )
}, 0)
setTimeout(() => {
    console.log('setTimeout2');
}, 0)

Promise.resolve(1).then(
    value => {
        console.log('Promise onResolved1', value);
    }
)
Promise.resolve(2).then(
    value => {
        console.log('Promise onResolved2', value);
    }
)