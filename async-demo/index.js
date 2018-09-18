console.log('Before');
getUser(1, displayUsers);
console.log('After');


function displayUsers(user){
    console.log('User', user)
    getRepositories(user.username, displayRepos);
}
function displayRepos(repos) {
    console.log('Repositories', repos);
        getCommits(repos[0], displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}



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

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log(`Fetching ${repo} github repositories....`);
        callback(['message1', 'message2', 'message3'])

    }, 2000);
}