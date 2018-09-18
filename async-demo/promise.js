const p = new Promise((resolve, reject) => {
    // Start some async work
    // ...
    setTimeout(() => {
        resolve(1);
        reject(new Error('This is the error message'));
    }, 2000);    
});

p.then(result => console.log('Result', result))
.catch(err => console.log('Error', err.message));