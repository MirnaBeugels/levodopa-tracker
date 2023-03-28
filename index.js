// Variables for the UI elements

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
const settingsIcon = document.querySelector('#settingsIcon');
const addField = document.querySelector('#addField');
const removeField = document.querySelector('#removeField');
const intakeForm = document.querySelector('#intakeForm');
const divLoginError = document.querySelector('#divLoginError');
const lblLoginErrorMessage = document.querySelector('#lblLoginErrorMessage');
const divLoginSucces = document.querySelector('#divLoginSucces');
const lblLoginSuccesMessage = document.querySelector('#lblLoginSuccesMessage');
const divSubmitSettingsError = document.querySelector('#divSubmitSettingsError');
const homeIcon = document.querySelector('#homeIcon');
const previousDoseText = document.querySelector('#previousDoseText');
const nextDoseText = document.querySelector('#nextDoseText');

// Calling variables for global use

var currentAmountOfDoses = document.getElementsByClassName('dose').length;
var dosesToSave = "";

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

// Initialize our Firebase app
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

// The function below listens to changes in that logged in state of a user

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
        timeDoses()
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

// After clicking the login button the user gets logged in

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

// When clicking on the registration link, the registration form is shown
// This link is visible when the login form is visible

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

// When clicking on the login link, the login form is shown
// This link is shown when the registration form is visibile

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

// This function executes after clicking the register button
// This button is visible when the registration form is visible

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

// The logoutUser function executes after clicking the logout link
// This link is visible only when a user is logged

function logoutUser() {
    signOut(auth).then(() => {
        // user was signed out
    }).catch((error) => {
        // show error
    })
}

// REMOVE THIS: var currentAmountOfDoses = document.getElementsByClassName('dose').length;

// This funtion executes after clicking on the Settings button and after saving settings
// It retrieves all the settings the logged in user has saved from Firebase
// After that it creates an input field for each intake and shows the saved times

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

// This function executes after saving settings and after clicking the home button
// It makes sure all currently shown or hidden inputs are deleted
// This way our inputs don't double in number when when we move back to the settings page and load a users saved settings

function removeUserInputs() {
    while (intakeForm.firstChild) {
        intakeForm.removeChild(intakeForm.lastChild)
    }
    currentAmountOfDoses = 0;
}

// This function executes after clicking the settings button from the logged in screen
// It hides the logged in section and shows the settings section

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

// This function executes after clicking the home button from the settings screen
// It hides the settings section and shows the logged in section

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

// This function excecutes after clicking the + button on the settings page
// It checks to see what the last current amount of doses is,
// Then adds an input field with the intake number as the name and id

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

// This function executes after clicking the - button on the settings page
// It removes one input field and deducts 1 from the current amount of doses

function removeDose() {
    intakeForm.removeChild(intakeForm.lastElementChild);
    currentAmountOfDoses = currentAmountOfDoses-1;
}

// This function executes after clicking the save button
// It saves al input fields with the class dose to an array
// Then it checks if all inputs contain a time
// If not it shows an error message telling the user te either fill or remove empty input fields
// If no empty fields, it saves the users intake settings to Firebase
// Then it calls the removeUserInputs function to remove all input fields
// Lastly it calls the addUserInputs function to add all saved inputs back to the screen

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

function timeDoses() {
    var uid = auth.currentUser.uid;
    const checkUser = ref(database, 'users/'+uid);
    onValue(checkUser, (snapshot) => {
        var data = snapshot.val();

        if (data != null) {
            // If the user has saved intakes:
            
            // Save the current time to a variable
            var date = new Date();
            var time = date.toLocaleTimeString();
            console.log(`The time is ${time}`);

            // Split the current time into hours, minutes and seconds in an array
            var splitCurrentTime = time.split(":");
            console.log(`The time in an array is: ${splitCurrentTime}`);

            // Remove the seconds, we don't need those for calculation
            splitCurrentTime.splice(splitCurrentTime.length-1);
            splitCurrentTime.map(Number);
            console.log(`The time in an array with last digit removed: ${splitCurrentTime}`);

            // Convert the hours to minutes and add the minutes we had left
            var currentTimeHours = parseInt(splitCurrentTime[0]);
            var currentTimeMinutes = parseInt(splitCurrentTime[1])
            var currentTimeHoursToMinutes = (currentTimeHours*60);
            var currentTimeMinutes = currentTimeHoursToMinutes + currentTimeMinutes;
            console.log(`Current time in minutes: ${currentTimeMinutes}`);

            var intakeTimes = []
            var intakeTimesMinutes = []

            // Push all intake times to intakeTimes list
            for (var i = 0; i < data.length; i++) {
                intakeTimes.push(data[i]["value"]);
            }

            // Convert all saved intake times to minutes
            for (var i = 0; i < intakeTimes.length; i++) {
                // Split the time up in hours and minutes into an array
                var splitTime = intakeTimes[i].split(":");
                // Convert the hours to a number to allow for calculation
                var intakeHours = parseInt(splitTime[0]);
                // Multiply hours by sixty to convert them to minutes
                var intakeHoursToMinutes = intakeHours*60;
                // Convert the remaining minutes to a number to allow for calculation
                var intakeMinutes = parseInt(splitTime[1]);
                // Add all together for a total number of minutes
                var intakeTotalMinutes = intakeHoursToMinutes + intakeMinutes;
                // Push the total number of minutes into an array
                intakeTimesMinutes.push(intakeTotalMinutes);
            }

            // Log the current time and intake times in minutes to the console
            console.log(currentTimeMinutes);
            console.log(intakeTimesMinutes);

            // Check which intaketimes have already passed and which are still to come
            // Save them in separate arrays

            var passedIntakes = [];
            var comingIntakes = [];

            for (var i = 0; i < intakeTimesMinutes.length; i++) {
                if (intakeTimesMinutes[i] < currentTimeMinutes) {
                    passedIntakes.push(intakeTimesMinutes[i]);
                } else {
                    comingIntakes.push(intakeTimesMinutes[i]);
                }
            };

            var previousIntakeMinutesAgo = 0;
            var nextIntakeMinutesAway = 0;

            if (passedIntakes.length === 0) {
                previousDoseText.innerHTML = "Je hebt de eerste inname van de dag nog niet gehad";
            } else {
                var previousIntakeMinutes = Math.max(...passedIntakes); // hoogste uit array = intake die het kortst geleden is
                previousIntakeMinutesAgo = currentTimeMinutes - previousIntakeMinutes;
                var previousIntakeRemainingMinutes = previousIntakeMinutesAgo % 60;
                var previousIntakeRemainingHours = Math.floor(previousIntakeMinutesAgo/60);
                var previousIntakeHours = Math.floor(previousIntakeMinutes/60);
                var previousIntakeMinutesMinutes = previousIntakeMinutes % 60;
                if (previousIntakeMinutesMinutes < 10) {
                    previousIntakeMinutesMinutes = '0'+ previousIntakeMinutesMinutes;
                    previousDoseTime.innerHTML = `${previousIntakeHours}:${previousIntakeMinutesMinutes}`;
                } else {
                    previousDoseTime.innerHTML = `${previousIntakeHours}:${previousIntakeMinutesMinutes}`;
                }
                previousDoseTimeAgo.innerHTML = `${previousIntakeRemainingHours} uur en ${previousIntakeRemainingMinutes}`
            }

            if (comingIntakes.length === 0) {
                nextDoseText.innerHTML = "Je hebt de laatste inname van de dag al gehad";
            } else {
                var nextIntakeMinutes = Math.min(...comingIntakes);
                nextIntakeMinutesAway = nextIntakeMinutes - currentTimeMinutes;
                var nextIntakeRemainingMinutes = nextIntakeMinutesAway % 60;
                var nextIntakeRemainingHours = Math.floor(nextIntakeMinutesAway/60);
                var nextIntakeHours = Math.floor(nextIntakeMinutes/60);
                var nextIntakeMinutesMinutes = nextIntakeMinutes % 60;
                if (nextIntakeMinutesMinutes < 10) {
                    nextIntakeMinutesMinutes = '0'+ nextIntakeMinutesMinutes;
                    nextDoseTime.innerHTML = `${nextIntakeHours}:${nextIntakeMinutesMinutes}`;
                } else {
                    nextDoseTime.innerHTML = `${nextIntakeHours}:${nextIntakeMinutesMinutes}`;
                }
                nextDoseTimeAway.innerHTML = `${nextIntakeRemainingHours} uur en ${nextIntakeRemainingMinutes}`
            }  

            console.log(previousIntakeMinutesAgo);
            console.log(nextIntakeMinutesAway);
            
            if (previousIntakeMinutesAgo > 60 && nextIntakeMinutesAway > 30) {
                settingsIcon.style.color = "rgb(53, 252, 116)";
            } else {
                settingsIcon.style.color = "rgb(252, 53, 99)";
            }

        } else {
            // If the user has no saved intakes, tell the user it has not saved any yet
            previousDoseText.innerHTML = "Je hebt nog geen innames opgeslagen";
            nextDoseText.innerHTML = "Je hebt nog geen innames opgeslagen";
        };

    });
}

// Eventlisteners for all clicking actions

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