document.getElementById("userType").addEventListener("change", function () {
  const type = this.value;
  document.getElementById("studentLogin").classList.add("hidden");
  document.getElementById("teacherLogin").classList.add("hidden");

  if (type === "student") {
    document.getElementById("studentLogin").classList.remove("hidden");
  } else if (type === "teacher") {
    document.getElementById("teacherLogin").classList.remove("hidden");
  }
});

function loginStudent() {
  const name = document.getElementById("studentName").value;
  if (!name) return alert("Enter your name");

  localStorage.setItem("userType", "student");
  localStorage.setItem("userName", name);
  showMainInterface(name);
}

function loginTeacher() {
  const name = document.getElementById("teacherName").value;
  const password = document.getElementById("teacherPassword").value;

  if (name !== "Deepak" || password !== "teacher123") {
    return alert("Invalid credentials");
  }

  localStorage.setItem("userType", "teacher");
  localStorage.setItem("userName", name);
  showMainInterface(name);
}

function showMainInterface(name) {
  document.querySelector(".login-section").classList.add("hidden");
  document.getElementById("mainInterface").classList.remove("hidden");
  document.getElementById("welcomeMsg").innerText = `Welcome, ${name}`;
}

function showLessons() {
  const userType = localStorage.getItem("userType");
  const name = localStorage.getItem("userName");
  let lessons = JSON.parse(localStorage.getItem("lessons")) || {};

  if (!lessons[name]) {
    lessons[name] = { Math: 40, Science: 60, English: 80 };
    localStorage.setItem("lessons", JSON.stringify(lessons));
  }

  const data = lessons[name];
  let html = `<h3>Lesson Completion</h3>`;
  for (let subject in data) {
    html += `<p>${subject}: ${data[subject]}% completed</p>`;
  }
  document.getElementById("contentArea").innerHTML = html;
}

function showGrades() {
  const name = localStorage.getItem("userName");
  let grades = JSON.parse(localStorage.getItem("grades")) || {};

  if (!grades[name]) {
    grades[name] = { Math: "B+", Science: "A", English: "A-" };
    localStorage.setItem("grades", JSON.stringify(grades));
  }

  const data = grades[name];
  let html = `<h3>Grades</h3>`;
  for (let subject in data) {
    html += `<p>${subject}: ${data[subject]}</p>`;
  }
  document.getElementById("contentArea").innerHTML = html;
}

function uploadContent() {
  document.getElementById("contentArea").innerHTML = `<p>Upload feature coming soon...</p>`;
}

function showFeatures() {
  document.getElementById("contentArea").innerHTML = `<p>Interactive lessons, offline mode, grade tracking, and more!</p>`;
}

function unlockScreen() {
  document.getElementById("contentArea").innerHTML = `<p>Screen unlocked. Welcome back!</p>`;
}
