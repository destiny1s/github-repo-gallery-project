//Global variable for div with class of overview, this div is where profile information will appear//
const overview = document.querySelector(".overview");
//Global variable for my Github username//
const username = "destiny1s";
//Global variable to select the unordered list to display the repos list//
const repoList = document.querySelector(".repo-list");

//Fetch user API JSON Data//
const gitUserInfo = async function () {
    //res or response = userInfo//
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);
    displayUserInfo(data);
};
gitUserInfo();


//Display user information//
const displayUserInfo = function (data) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-info");
    userDiv.innerHTML = `
        <figure>
    <img alt="user avatar" src=${data.avatar_url} />
        </figure>
    <div>
     <p><strong>Name: </strong>${data.name}</p>
     <p><strong>Bio: </strong>${data.bio}</p>
     <p><strong>Location: </strong>${data.location}</p>
     <p><strong>Number of public repos: </strong>${data.public_repos}</p>
    </div>`;
    overview.append(userDiv);
    gitRepos();
};

//Fetch Github repos//
const gitRepos = async function () {
    //res or response = fetchRepos//
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();

    //console.log(repoData);
    displayRepos(repoData);
};

//Display info about my repos//
const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoListItem = document.createElement("li");
        repoListItem.classList.add("repo");
        repoListItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoListItem);
    }
};