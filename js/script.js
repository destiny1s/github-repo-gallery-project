//Global variable for div with class of overview, this div is where profile information will appear//
const overview = document.querySelector(".overview");
//Global variable for my Github username//
const username = "destiny1s";

//Fetch API JSON Data//
const gitUserInfo = async function () {
    //res or response = userInfo//
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);
    displayUserInfo(data);
};
gitUserInfo();


//Fetch and display user information//
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
};