/* ==========================================================
   EXAMVERSE AI v3.0
   app.js - Part 1
========================================================== */

/* ==========================
   IMPORT FIREBASE
========================== */

import {
  auth
} from "./firebase.js";

/* ==========================
   APP VARIABLES
========================== */

let currentUser = null;
let currentScreen = "homeScreen";
let darkMode = true;

/* ==========================
   ELEMENTS
========================== */

const splashScreen = document.getElementById("splashScreen");
const app = document.getElementById("app");

/* ==========================
   APP START
========================== */

window.addEventListener("load", () => {

  setTimeout(() => {

    if (splashScreen) {

      splashScreen.style.display = "none";

    }

    if (app) {

      app.style.display = "block";

    }

  }, 2500);

});

/* ==========================
   SCREEN NAVIGATION
========================== */

function hideAllScreens() {

  document.querySelectorAll(".screen").forEach(screen => {

    screen.style.display = "none";

  });

}

function showScreen(id) {

  hideAllScreens();

  const screen = document.getElementById(id);

  if (screen) {

    screen.style.display = "block";

    currentScreen = id;

  }

}

/* ==========================
   HOME
========================== */

window.goHome = function () {

  showScreen("homeScreen");

};

/* ==========================
   DASHBOARD BUTTONS
========================== */

window.openAIChat = function () {

  showScreen("aiChatScreen");

};

window.openMockTests = function () {

  showScreen("mockScreen");

};

window.openOCR = function () {

  showScreen("ocrScreen");

};

window.openVoiceAI = function () {

  showScreen("voiceScreen");

};

window.openWeather = function () {

  showScreen("weatherScreen");

};

window.openTrainStatus = function () {

  showScreen("trainScreen");

};

window.openCurrentAffairs = function () {

  showScreen("newsScreen");

};

window.openNotifications = function () {

  showScreen("notificationScreen");

};

window.openProfile = function () {

  showScreen("profileScreen");

};

window.openSettings = function () {

  showScreen("settingsScreen");

};

window.openLeaderboard = function () {

  showScreen("leaderboardScreen");

};

window.openPremium = function () {

  showScreen("premiumScreen");

};
/* ==========================================================
   FIREBASE AUTH
========================================================== */

import {

signInWithEmailAndPassword,
createUserWithEmailAndPassword,
signOut,
onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ==========================================================
   LOGIN
========================================================== */

window.loginUser = async function () {

const email =
document.getElementById("loginEmail").value.trim();

const password =
document.getElementById("loginPassword").value;

if (!email || !password) {

alert("Please enter email and password.");

return;

}

try {

await signInWithEmailAndPassword(
auth,
email,
password
);

showScreen("homeScreen");

} catch (err) {

alert(err.message);

}

};

/* ==========================================================
   REGISTER
========================================================== */

window.registerUser = async function () {

const email =
document.getElementById("registerEmail").value.trim();

const password =
document.getElementById("registerPassword").value;

if (!email || !password) {

alert("Please fill all fields.");

return;

}

try {

await createUserWithEmailAndPassword(
auth,
email,
password
);

alert("Registration Successful!");

showScreen("homeScreen");

} catch (err) {

alert(err.message);

}

};

/* ==========================================================
   LOGOUT
========================================================== */

window.logoutUser = async function () {

try {

await signOut(auth);

showScreen("authScreen");

} catch (err) {

alert(err.message);

}

};

/* ==========================================================
   AUTH LISTENER
========================================================== */

onAuthStateChanged(auth, (user) => {

if (user) {

currentUser = user;

const emailBox =
document.getElementById("profileEmail");

if (emailBox) {

emailBox.textContent = user.email;

}

} else {

currentUser = null;

}

});
/* ==========================================================
   APP.JS PART 3
   Theme + Toast + Loader + Network
========================================================== */

/* --------------------------
   Theme Switch
-------------------------- */

window.toggleTheme = function () {

    document.body.classList.toggle("light");

    const mode = document.body.classList.contains("light")
        ? "light"
        : "dark";

    localStorage.setItem("theme", mode);

    showToast("Theme Changed");

};

/* --------------------------
   Load Saved Theme
-------------------------- */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

}

/* --------------------------
   Toast Message
-------------------------- */

window.showToast = function (message) {

    const toast = document.getElementById("toastMessage");

    if (!toast) return;

    toast.innerText = message;

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 2500);

};

/* --------------------------
   Loading Screen
-------------------------- */

window.showLoader = function () {

    const loader = document.getElementById("loadingScreen");

    if (loader) {

        loader.style.display = "flex";

    }

};

window.hideLoader = function () {

    const loader = document.getElementById("loadingScreen");

    if (loader) {

        loader.style.display = "none";

    }

};

/* --------------------------
   Network Status
-------------------------- */

const networkStatus = document.getElementById("networkStatus");

function updateNetworkStatus() {

    if (!networkStatus) return;

    if (navigator.onLine) {

        networkStatus.innerHTML = "🟢 Online";
        networkStatus.style.background = "#22c55e";

    } else {

        networkStatus.innerHTML = "🔴 Offline";
        networkStatus.style.background = "#ef4444";

    }

}

window.addEventListener("online", updateNetworkStatus);

window.addEventListener("offline", updateNetworkStatus);

updateNetworkStatus();

/* --------------------------
   Bottom Navigation Active
-------------------------- */

document.querySelectorAll("#bottomNav button").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll("#bottomNav button")
            .forEach(x => x.classList.remove("active"));

        btn.classList.add("active");

    });

});

/* --------------------------
   Welcome Message
-------------------------- */

showToast("🚀 Welcome to ExamVerse AI v3.0");
/* ==========================================================
   APP.JS PART 4
   AI CHAT
========================================================== */

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userMsg");

/* --------------------------
   Send Message
-------------------------- */

window.sendMessage = async function () {

    if (!userInput) return;

    const message = userInput.value.trim();

    if (message === "") return;

    addUserMessage(message);

    userInput.value = "";

    addAIMessage("⏳ Thinking...");

    try {

        /* Backend API yahan connect hoga */

        const response = {
            answer: "AI backend connected hone ke baad yahan real answer aayega."
        };

        removeLastAIMessage();

        addAIMessage(response.answer);

    } catch (err) {

        removeLastAIMessage();

        addAIMessage("❌ Error: " + err.message);

    }

};

/* --------------------------
   User Bubble
-------------------------- */

function addUserMessage(text) {

    if (!chatBox) return;

    chatBox.innerHTML += `
        <div class="userBubble">
            ${text}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

}

/* --------------------------
   AI Bubble
-------------------------- */

function addAIMessage(text) {

    if (!chatBox) return;

    chatBox.innerHTML += `
        <div class="aiBubble">
            ${text}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

}

/* --------------------------
   Remove Thinking Bubble
-------------------------- */

function removeLastAIMessage() {

    if (!chatBox) return;

    const bubbles =
        chatBox.querySelectorAll(".aiBubble");

    if (bubbles.length > 0) {

        bubbles[bubbles.length - 1].remove();

    }

}

/* --------------------------
   Enter Key Support
-------------------------- */

if (userInput) {

    userInput.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            sendMessage();

        }

    });

}
/* ==========================================================
   APP.JS PART 5
   MOCK TEST ENGINE
========================================================== */

let questions = [
{
question:"भारत की राजधानी क्या है?",
options:["मुंबई","दिल्ली","कोलकाता","चेन्नई"],
answer:1
},
{
question:"2 + 2 = ?",
options:["3","4","5","6"],
answer:1
},
{
question:"HTML का पूरा नाम क्या है?",
options:[
"Hyper Text Markup Language",
"High Text Machine Language",
"Home Tool Markup Language",
"Hyper Transfer Markup Language"
],
answer:0
}
];

let currentQuestion = 0;
let score = 0;

/* --------------------------
   START MOCK TEST
-------------------------- */

window.startMockTest = function () {

currentQuestion = 0;
score = 0;

showScreen("mockScreen");

loadQuestion();

};

/* --------------------------
   LOAD QUESTION
-------------------------- */

function loadQuestion() {

const q = questions[currentQuestion];

document.getElementById("questionBox").innerHTML =
`<h3>${q.question}</h3>`;

const optionsBox =
document.getElementById("optionsBox");

optionsBox.innerHTML = "";

q.options.forEach((option,index)=>{

optionsBox.innerHTML += `
<button class="optionBtn"
onclick="checkAnswer(${index})">
${option}
</button>
`;

});

}

/* --------------------------
   CHECK ANSWER
-------------------------- */

window.checkAnswer = function(index){

if(index===questions[currentQuestion].answer){

score++;

showToast("✅ Correct");

}else{

showToast("❌ Wrong");

}

nextQuestion();

};

/* --------------------------
   NEXT QUESTION
-------------------------- */

window.nextQuestion = function(){

currentQuestion++;

if(currentQuestion<questions.length){

loadQuestion();

}else{

showResult();

}

};

/* --------------------------
   RESULT
-------------------------- */

function showResult(){

document.getElementById("questionBox").innerHTML="";

document.getElementById("optionsBox").innerHTML="";

document.getElementById("resultBox").innerHTML=`

<h2>🎉 Test Finished</h2>

<h3>Your Score</h3>

<h1>${score} / ${questions.length}</h1>

<button onclick="startMockTest()">

Restart Test

</button>

`;

                        }
/* ==========================================================
   APP.JS PART 6
   OCR + VOICE AI
========================================================== */

/* --------------------------
   OCR IMAGE PREVIEW
-------------------------- */

window.uploadImage = function () {

    const fileInput = document.getElementById("imageInput");
    const result = document.getElementById("ocrResult");

    if (!fileInput || !result) return;

    if (fileInput.files.length === 0) {

        result.innerHTML = "⚠️ Please select an image.";
        return;

    }

    const file = fileInput.files[0];

    result.innerHTML = `
        <p>📷 Image Selected:</p>
        <p><b>${file.name}</b></p>
        <p>🚀 OCR processing will be connected to the backend.</p>
    `;

};

/* --------------------------
   VOICE AI
-------------------------- */

let recognition = null;

if ("webkitSpeechRecognition" in window) {

    recognition = new webkitSpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function (event) {

        const text = event.results[0][0].transcript;

        const input = document.getElementById("userMsg");

        if (input) {

            input.value = text;

        }

        showToast("🎤 Voice Captured");

    };

    recognition.onerror = function () {

        showToast("Voice recognition error");

    };

}

/* --------------------------
   START VOICE
-------------------------- */

window.startVoice = function () {

    if (!recognition) {

        alert("Voice Recognition is not supported.");

        return;

    }

    recognition.start();

};

/* --------------------------
   STOP VOICE
-------------------------- */

window.stopVoice = function () {

    if (recognition) {

        recognition.stop();

    }

};

/* --------------------------
   OPEN CAMERA
-------------------------- */

window.openCamera = function () {

    document.getElementById("imageInput")?.click();

};

/* --------------------------
   QUICK ACTIONS
-------------------------- */

window.openWeather = () => showToast("🌦️ Weather module coming soon");
window.openTrainStatus = () => showToast("🚆 Train Status module coming soon");
window.openCurrentAffairs = () => showToast("📰 Current Affairs module coming soon");
window.openNotifications = () => showToast("🔔 Notifications module coming soon");
/* ==========================================================
   APP.JS PART 7
   PROFILE + STREAK + XP
========================================================== */

/* --------------------------
   USER DATA
-------------------------- */

let userProfile = JSON.parse(localStorage.getItem("examverseProfile")) || {
    name: "Guest",
    xp: 0,
    level: 1,
    streak: 0
};

/* --------------------------
   SAVE PROFILE
-------------------------- */

function saveProfile() {
    localStorage.setItem(
        "examverseProfile",
        JSON.stringify(userProfile)
    );
}

/* --------------------------
   UPDATE PROFILE UI
-------------------------- */

window.updateProfile = function () {

    const name = document.getElementById("profileName");
    const xp = document.getElementById("profileXP");
    const level = document.getElementById("profileLevel");
    const streak = document.getElementById("profileStreak");

    if (name) name.textContent = userProfile.name;
    if (xp) xp.textContent = userProfile.xp;
    if (level) level.textContent = userProfile.level;
    if (streak) streak.textContent = userProfile.streak;

};

/* --------------------------
   ADD XP
-------------------------- */

window.addXP = function (points) {

    userProfile.xp += points;

    if (userProfile.xp >= userProfile.level * 100) {

        userProfile.level++;

        showToast("🎉 Level Up!");

    }

    saveProfile();
    updateProfile();

};

/* --------------------------
   DAILY STREAK
-------------------------- */

window.updateDailyStreak = function () {

    const today = new Date().toDateString();

    const last = localStorage.getItem("lastLogin");

    if (last !== today) {

        userProfile.streak++;

        localStorage.setItem("lastLogin", today);

        saveProfile();

        showToast("🔥 Daily Streak +" + userProfile.streak);

    }

    updateProfile();

};

/* --------------------------
   CHANGE USER NAME
-------------------------- */

window.changeUserName = function () {

    const newName = prompt("Enter your name");

    if (!newName) return;

    userProfile.name = newName;

    saveProfile();

    updateProfile();

};

/* --------------------------
   INITIALIZE PROFILE
-------------------------- */

updateProfile();
updateDailyStreak();
