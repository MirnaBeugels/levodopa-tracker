// UI elements

const btnLogin = document.querySelector('#btnLogin');
const btnRegister = document.querySelector('#btnRegister');
const newEmail = document.querySelector('#newEmail');
const newDisplayName = document.querySelector('#newDisplayName');
const newPassword = document.querySelector('#newPassword');
const txtEmail = document.querySelector('#txtEmail');
const txtPassword = document.querySelector('#txtPassword');
const userDisplayName = document.querySelector('.userDisplayName');
const loginSection = document.querySelector('#login');
const loggedinSection = document.querySelector('#loggedin');
const registerSection = document.querySelector('#registration')
const signedOutSection = document.querySelector('#signedOut');
const registrationParagraph = document.querySelector('#registrationP')
const alreadyRegisteredParagraph = document.querySelector('#alreadyregisteredP')
const logoutLink = document.querySelector('#logoutLink');
const logoutParagraph = document.querySelector('#logoutP');
const registerLink = document.querySelector('#registerLink');
const alreadyRegisteredLink = document.querySelector('#inlogLink');
const divLoginError = document.querySelector('#divLoginError');
const lblLoginErrorMessage = document.querySelector('#lblLoginErrorMessage');
const divLoginSucces = document.querySelector('#divLoginSucces');
const lblLoginSuccesMessage = document.querySelector('#lblLoginSuccesMessage');

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth,
         signInWithEmailAndPassword,
         createUserWithEmailAndPassword,
         updateProfile,
         signOut,
         onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize app
const firebaseConfig = {
    apiKey: "AIzaSyAGvroXH8AhQIq0vY9lYZmfrmkBcTEbSqE",
    authDomain: "ledotrack-89b76.firebaseapp.com",
    projectId: "ledotrack-89b76",
    storageBucket: "ledotrack-89b76.appspot.com",
    messagingSenderId: "268499313386",
    appId: "1:268499313386:web:842476d460adfddf866d93"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        // Set the user credentials
        var uid = user.uid;
        var displayName = user.displayName;
        var email = user.email;
        console.log(uid);
        console.log(displayName);
        console.log(email);
        
        // Show and hide sections
        loginSection.style.display = "none";
        loggedinSection.style.display = "grid";
        signedOutSection.style.display = "none";
        registerSection.style.display = "none";
        registrationParagraph.style.display = "none";
        alreadyRegisteredParagraph.style.display = "none";
        logoutParagraph.style.display = "block";

        // Personalise welcome message
        userDisplayName.innerHTML = displayName;

    } else {
        // user is signed out
        // Show and hide sections
        loginSection.style.display = "grid";
        registerSection.style.display = "none";
        loggedinSection.style.display = "none";
        signedOutSection.style.display = "none";
        logoutParagraph.style.display = "none";
        registrationParagraph.style.display = "block";
        alreadyRegisteredParagraph.style.display = "none";
    }
})

function loginEmailPassword(event) {
    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
        // user was signed in
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    })
    event.preventDefault()
};

function showRegistrationForm() {
    loginSection.style.display = "none";
    loggedinSection.style.display = "none";
    signedOutSection.style.display = "none";
    registerSection.style.display = "grid";
    registrationParagraph.style.display = "none";
    alreadyRegisteredParagraph.style.display = "block";
    logoutParagraph.style.display = "none";
}

function showLoginForm() {
    loginSection.style.display = "grid";
    loggedinSection.style.display = "none";
    registerSection.style.display = "none";
    signedOutSection.style.display = "none";
    registrationParagraph.style.display = "block";
    alreadyRegisteredParagraph.style.display = "none";
    logoutParagraph.style.display = "none";
}

function registerNewUser(value) {
    const chosenEmail = newEmail.value;
    const chosenPassword = newPassword.value;
    const chosenDisplayName = newDisplayName.value;
    createUserWithEmailAndPassword(auth, chosenEmail, chosenPassword)
    .then(() => {
        updateProfile(auth.currentUser, {
            displayName: chosenDisplayName
          })
    })
    .then((userCredential) => {
        // user was signed in
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    })
}

function logoutUser() {
    signOut(auth).then(() => {
        // user was signed out
    }).catch((error) => {
        // show error
    })
}

btnLogin.addEventListener("click", loginEmailPassword);
btnRegister.addEventListener("click", registerNewUser);
registerLink.addEventListener("click", showRegistrationForm);
alreadyRegisteredLink.addEventListener("click", showLoginForm);
logoutLink.addEventListener("click", logoutUser);