console.log('Before');
getUser(1, (user) => {
    console.log('User', user)

    getRepositories(user.username, (repos) => {
        console.log('Repositories', repos);
    })
});
console.log('After');

function getUser(id, callback){
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({
            id: id, 
            username: 'John Doe'
        })
    }, 2000);

}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log(`Fetching ${username} github repositories....`);
        callback(['repo1', 'repo2', 'repo3'])

    }, 2000);
}