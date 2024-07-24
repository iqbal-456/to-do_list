const userinputBox = document.getElementById("userinput-box");
const userlistContainer = document.getElementById("userlist-container");
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const currentUserElement = document.getElementById("current-user");

let currentUser = '';

function addUser() {
    if(userinputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = `${userinputBox.value} <span>\u00d7</span>`;
        li.setAttribute('data-username', userinputBox.value);
        userlistContainer.appendChild(li);
    }
    userinputBox.value = "";
    saveData("userData", userlistContainer.innerHTML);
}

function addTask() {
    if (inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = `${inputBox.value} <span>\u00d7</span>`;
        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData(`${currentUser}-tasks`, listContainer.innerHTML);
}

function saveData(key, data) {
    localStorage.setItem(key, data);
}

function showTodoApp() {
    document.getElementById('create-user-section').style.display = 'none';
    document.getElementById('todo-app-section').style.display = 'block';
    currentUserElement.textContent = currentUser;
    console.log(`Showing To-Do List for - ${currentUser}`);
}

function showCreateUser() {
    document.getElementById('todo-app-section').style.display = 'none';
    document.getElementById('create-user-section').style.display = 'block';
}

userlistContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        currentUser = e.target.getAttribute('data-username');
        loadUserTasks(currentUser);
        showTodoApp();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData("userData", userlistContainer.innerHTML);
    }
});

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(`${currentUser}-tasks`, listContainer.innerHTML);
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(`${currentUser}-tasks`, listContainer.innerHTML);
    }
});

function loadUserTasks(username) {
    listContainer.innerHTML = localStorage.getItem(`${username}-tasks`) || "";
}

function logUsernames() {
    const userItems = userlistContainer.querySelectorAll('li[data-username]');
    const usernames = Array.from(userItems).map(item => item.getAttribute('data-username'));
    console.log("Usernames:", usernames);
}

// Load data from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    userlistContainer.innerHTML = localStorage.getItem("userData") || "";
    logUsernames();
    showCreateUser();
});
