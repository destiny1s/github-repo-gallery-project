//Global variable for div with class of overview, this div is where profile information will appear//
const overview = document.querySelector(".overview");
//Global variable for my Github username//
const username = "destiny1s";
//Global variable to select the unordered list to display the repos list//
const repoList = document.querySelector(".repo-list");
//Global variable that selects the section with a class of “repos” where all your repo information appears.
const allReposContainer = document.querySelector(".repos");
//Global variable that selects the section with a class of "repo-data" where the individual repo data will appear.
const individualRepoData = document.querySelector(".repo-data");

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

//Click event//
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

//Function to get specific repo info//
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    //console.log(repoInfo);

    //Grab Languages
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    //An array of Languages - Make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        //console.log(languages);
    }
    displayRepoInfo(repoInfo, languages);
};

//Function to display Specific Repo Info//
const displayRepoInfo = function (repoInfo, languages) {
    individualRepoData.innerHTML = "";
    individualRepoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    individualRepoData.append(div);

};