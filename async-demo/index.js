console.log('Before');
getUser(1, (user) => {
    console.log('User', user)
    getRepositories(user.username, (repos) => {
        console.log('Repositories', repos);
        getCommits(repos[0], (commits) => {
            console.log('Commit Messages', commits);
        })
    })
});

getUser(1)
.then(user => getRepositories(user.username)
.then(repos => getCommits(repos[0])
.then(commits => console.log(commits))))
.catch(err => console.log('Error', err.message));


console.log('After');

function getUser(id){

    return new Promise((resolve, reject) => {
        // Start some async funtion
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({
                id: id, 
                username: 'John Doe'
            })
        }, 2000);
    })

}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Fetching ${username} github repositories....`);
            resolve(['repo1', 'repo2', 'repo3'])
    
        }, 2000);
    });

    
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Fetching commit messages of ${repo}....`);
            resolve(['message1', 'message2', 'message3'])
    
        }, 2000);
    })    
}