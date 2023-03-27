// UI elements

const btnLogin = document.querySelector('#btnLogin');
const btnRegister = document.querySelector('#btnRegister');
const btnSettings = document.querySelector('#btnSettings');
const btnSaveSettings = document.querySelector('#btnSaveSettings');
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
const settingsSection = document.querySelector('#settings');
const registrationParagraph = document.querySelector('#registrationP')
const alreadyRegisteredParagraph = document.querySelector('#alreadyregisteredP')
const logoutLink = document.querySelector('#logoutLink');
const logoutParagraph = document.querySelector('#logoutP');
const registerLink = document.querySelector('#registerLink');
const alreadyRegisteredLink = document.querySelector('#inlogLink');
const previousDoseTime = document.querySelector('#previousDoseTime');
const previousDoseTimeAgo = document.querySelector('#previousDoseTimeAgo');
const nextDoseTime = document.querySelector('#nextDoseTime');
const nextDoseTimeAway = document.querySelector('#nextDoseTimeAway');
const currentFoodStatus = document.querySelector('#currentFoodStatus');
const addField = document.querySelector('#addField');
const removeField = document.querySelector('#removeField');
const intakeForm = document.querySelector('#intakeForm');
const divLoginError = document.querySelector('#divLoginError');
const lblLoginErrorMessage = document.querySelector('#lblLoginErrorMessage');
const divLoginSucces = document.querySelector('#divLoginSucces');
const lblLoginSuccesMessage = document.querySelector('#lblLoginSuccesMessage');
const divSubmitSettingsError = document.querySelector('#divSubmitSettingsError');
const homeIcon = document.querySelector('#homeIcon');

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth,
         signInWithEmailAndPassword,
         createUserWithEmailAndPassword,
         updateProfile,
         signOut,
         onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
import { getDatabase,
         ref,
         set,
         onValue } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"

// Initialize app
const firebaseConfig = {
    apiKey: "AIzaSyAGvroXH8AhQIq0vY9lYZmfrmkBcTEbSqE",
    authDomain: "ledotrack-89b76.firebaseapp.com",
    databaseURL: "https://ledotrack-89b76-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ledotrack-89b76",
    storageBucket: "ledotrack-89b76.appspot.com",
    messagingSenderId: "268499313386",
    appId: "1:268499313386:web:842476d460adfddf866d93"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

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
        settingsSection.style.display = "none";
        registrationParagraph.style.display = "none";
        alreadyRegisteredParagraph.style.display = "none";
        logoutParagraph.style.display = "block";
        // Personalize welcome message
        userDisplayName.innerHTML = displayName;
    } else {
        // user is signed out
        // Show and hide sections
        loginSection.style.display = "grid";
        registerSection.style.display = "none";
        loggedinSection.style.display = "none";
        signedOutSection.style.display = "none";
        settingsSection.style.display = "none";
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
    settingsSection.style.display = "none";
    registrationParagraph.style.display = "none";
    alreadyRegisteredParagraph.style.display = "block";
    logoutParagraph.style.display = "none";
}

function showLoginForm() {
    loginSection.style.display = "grid";
    loggedinSection.style.display = "none";
    registerSection.style.display = "none";
    signedOutSection.style.display = "none";
    settingsSection.style.display = "none";
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

var currentAmountOfDoses = document.getElementsByClassName('dose').length;

function addUserInputs() {
    var uid = auth.currentUser.uid;
    const checkUser = ref(database, 'users/'+uid);

    onValue(checkUser, (snapshot) => {
        var data = snapshot.val();

        if (data != null) {
            var numberOfSavedDoses = data.length;

            onValue(checkUser, (snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                            const intakeNr = childSnapshot.val()["key"];
                            const intakeTime = childSnapshot.val()["value"];
                            // console.log(intakeNr);
                            // console.log(intakeTime);

                            currentAmountOfDoses = currentAmountOfDoses+1;
                            var newField = document.createElement("input");
                            newField.setAttribute("type", "time");
                            newField.setAttribute("class", "dose");
                            newField.setAttribute("name", intakeNr);
                            newField.setAttribute("id", intakeNr);
                            newField.setAttribute("value", intakeTime);
                            intakeForm.appendChild(newField);
                        });
                        }, {
                        onlyOnce: true
                        });

        };
    });
}

function removeUserInputs() {
    while (intakeForm.firstChild) {
        intakeForm.removeChild(intakeForm.lastChild)
    }
    currentAmountOfDoses = 0;
}

function showSettings() {
    loginSection.style.display = "none";
    loggedinSection.style.display = "none";
    registerSection.style.display = "none";
    signedOutSection.style.display = "none";
    settingsSection.style.display = "grid";
    registrationParagraph.style.display = "none";
    alreadyRegisteredParagraph.style.display = "none";
    logoutParagraph.style.display = "block";
   
    removeUserInputs()
    addUserInputs();
}

function goHome(event) {
    event.preventDefault();
    loginSection.style.display = "none";
    loggedinSection.style.display = "grid";
    registerSection.style.display = "none";
    signedOutSection.style.display = "none";
    settingsSection.style.display = "none";
    registrationParagraph.style.display = "none";
    alreadyRegisteredParagraph.style.display = "none";
    logoutParagraph.style.display = "block";
}

function addDose() {
    if (currentAmountOfDoses != 0) {
        currentAmountOfDoses = currentAmountOfDoses;
    } else {
        currentAmountOfDoses = currentAmountOfDoses;
    }
    currentAmountOfDoses = currentAmountOfDoses+1;
    console.log(`After adding a dose ${currentAmountOfDoses} `)
    var newField = document.createElement("input");
    newField.setAttribute("type", "time");
    newField.setAttribute("class", "dose");
    newField.setAttribute("name", `intake${currentAmountOfDoses}`);
    newField.setAttribute("id", `intake${currentAmountOfDoses}`);
    intakeForm.appendChild(newField);
}

function removeDose() {
    intakeForm.removeChild(intakeForm.lastElementChild);
    currentAmountOfDoses = currentAmountOfDoses-1;
}

var dosesToSave = "";

function saveSettings() {
    dosesToSave = document.querySelectorAll('.dose');

    var allIntakes = [];

    dosesToSave.forEach(
        function(input) {
            const intake = {};
            intake.key = input.name;
            intake.value = input.value;
            allIntakes.push(intake);
         }
    );

    console.log(allIntakes);

    // Check if all inputs contain a time

    var checkForInput = Object.values(allIntakes);

    console.log(checkForInput.length);

    for (var i = 0; i < checkForInput.length; i++) {
        console.log(checkForInput[i]["value"])
        if (checkForInput[i]["value"] == "") {
            console.log('check for empty fields');
            divSubmitSettingsError.style.display = "block";
            break;
        } else {
            console.log('ok to save');
            divSubmitSettingsError.style.display = "none";
            var uid = auth.currentUser.uid;

            set (ref (database, 'users/'+uid), allIntakes);

            // remove and return allIntakes as saved
            removeUserInputs()
            addUserInputs();
        }
    }
}

btnLogin.addEventListener("click", loginEmailPassword);
btnRegister.addEventListener("click", registerNewUser);
btnSettings.addEventListener("click", showSettings);
btnSaveSettings.addEventListener("click", saveSettings);
addField.addEventListener("click", addDose);
removeField.addEventListener("click", removeDose);
registerLink.addEventListener("click", showRegistrationForm);
alreadyRegisteredLink.addEventListener("click", showLoginForm);
logoutLink.addEventListener("click", logoutUser);
homeIcon.addEventListener("click", goHome);