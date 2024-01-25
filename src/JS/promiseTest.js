function performTask () {
    return new Promise(function (resolve, reject) {
        reject(new Error('Error occured!'));
    });
}

let taskPromise = performTask();

taskPromise.then(function () {
    console.log('Task 1');
}).then(function () {
    console.log('Task 2');
}).then(function () {
    console.log('Task 3');
}).catch(function (err) {
    console.log(err)
}).then(function () {
    console.log('Task 4');
});