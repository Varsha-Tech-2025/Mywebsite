let currentLang = "en";

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

function logout() {
  localStorage.clear();
  location.reload();
}

function showLessons() {
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

function uploadAssignment() {
  const name = localStorage.getItem("userName");
  const file = prompt("Paste assignment text or summary:");
  if (!file) return;

  let assignments = JSON.parse(localStorage.getItem("assignments")) || {};
  if (!assignments[name]) assignments[name] = [];
  assignments[name].push(file);
  localStorage.setItem("assignments", JSON.stringify(assignments));

  alert("Assignment uploaded!");
}

function viewAssignments() {
  const name = localStorage.getItem("userName");
  let assignments = JSON.parse(localStorage.getItem("assignments")) || {};
  let html = `<h3>Assignments</h3>`;
  if (assignments[name]) {
    assignments[name].forEach((a, i) => {
      html += `<p><strong>Assignment ${i + 1}:</strong> ${a}</p>`;
    });
  } else {
    html += `<p>No assignments uploaded.</p>`;
  }
  document.getElementById("contentArea").innerHTML = html;
}

function showFeatures() {
  document.getElementById("contentArea").innerHTML = `
    <ul>
      <li>Interactive Lessons</li>
      <li>Offline Mode</li>
      <li>Assignment Upload</li>
      <li>Grade Tracking</li>
      <li>English ↔ Punjabi Translation</li>
    </ul>`;
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "pa" : "en";
  document.querySelectorAll("button").forEach(btn => {
    btn.innerText = translate(btn.innerText);
  });
}

function translate(text) {
  const dictionary = {
    "Lessons": "ਪਾਠ",
    "Grade Selection": "ਗਰੇਡ ਚੋਣ",
    "Upload Assignment":
