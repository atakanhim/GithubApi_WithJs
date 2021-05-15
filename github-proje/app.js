const githubForm = document.getElementById("github-form");
const nameInput =document.getElementById("githubname");
const clearLastUsers =document.getElementById("clear-last-users");

const lastUsers=document.getElementById("last-users");

const git=new Github();
const ui = new UI();
const storage= new Storage
eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}
function getData(e){

    
    let username = nameInput.value.trim();//boşlluk siler trim
    if(username ===""){
        alert("geçerli gir");
    }
    else{
        git.getGithubData(username)
        .then(response => {
            if(response.user.message ==="Not Found"){
                ui.showError("Kullanıcı Bulunamadı");
            }
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
                
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput();// input temizlmee
    e.preventDefault();
}
function clearAllSearched(){
 // son arananları temilze
 if(confirm("Emin misiniz ?")){
    Storage.clearAllSearchedUsersFromStorage();// storageden temizleyecek
    ui.clearAllSearchedFromUI();
 }
}
function getAllSearched(){
    // arananları storagedan al ve uı a ekle,
    
    let users =Storage.getSearchedUsersFromStorage();
    let result="";
    users.forEach(user=>{
        result +=`
        <li class="list-group-item">${user}</li> 
        `;
    });
    lastUsers.innerHTML= result;
}