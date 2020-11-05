function logIn() {
    let email_logIn = document.getElementById('email_logIn').value;
    let password_logIn = document.getElementById('password_logIn').value;

    firebase.auth().signInWithEmailAndPassword(email_logIn, password_logIn)
    .catch(function(error) {
        document.getElementById("errorMessage").style.display = "block";
    });
}   

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.href = "tablas.html";
    }
});

function goToIndex() {
    window.location.href = "http://www.latiendona.tk/index.html";
}

function tryLogin(event){
    if(event.keyCode == 13){
        logIn();
    }
}

function loadLogin(){
    window.location.href = "login.html";
}