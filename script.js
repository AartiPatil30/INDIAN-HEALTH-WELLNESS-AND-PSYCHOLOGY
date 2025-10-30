// ===== FitBharat — script.js =====

const qs = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);

/* Navbar toggle (mobile) */
qs("#menuBtn").addEventListener("click", () => {
  qs("#navMenu").classList.toggle("show");
});

/* Yoga pose details */
qs("#poses").addEventListener("click", (e) => {
  const el = e.target.closest(".pose");
  if (!el) return;
  qs("#poseDetails").textContent = `${el.dataset.name} — ${el.dataset.desc}`;
});

/* Workout tracker */
const WORK_KEY = "fitbharat_workouts";
const workoutListEl = qs("#workoutList");

function loadWorkouts() {
  const arr = JSON.parse(localStorage.getItem(WORK_KEY) || "[]");
  workoutListEl.innerHTML = "";
  arr.forEach((t, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${t}</span><button class="btn" data-i="${i}">Remove</button>`;
    workoutListEl.appendChild(li);
  });
}

qs("#addWorkout").addEventListener("click", () => {
  const v = qs("#workoutInput").value.trim();
  if (!v) return;
  const arr = JSON.parse(localStorage.getItem(WORK_KEY) || "[]");
  arr.push(v);
  localStorage.setItem(WORK_KEY, JSON.stringify(arr));
  qs("#workoutInput").value = "";
  loadWorkouts();
});

workoutListEl.addEventListener("click", (e) => {
  if (e.target.dataset.i !== undefined) {
    const arr = JSON.parse(localStorage.getItem(WORK_KEY) || "[]");
    arr.splice(e.target.dataset.i, 1);
    localStorage.setItem(WORK_KEY, JSON.stringify(arr));
    loadWorkouts();
  }
});

loadWorkouts();

/* BMI calculator */
qs("#calcBMI").addEventListener("click", () => {
  const h = +qs("#height").value;
  const w = +qs("#weight").value;
  if (!h || !w) return (qs("#bmiResult").textContent = "Enter values");
  const bmi = +(w / (h / 100) ** 2).toFixed(1);
  let cat = "Normal";
  if (bmi < 18.5) cat = "Underweight";
  else if (bmi >= 25) cat = "Overweight";
  qs("#bmiResult").textContent = `${bmi} (${cat})`;
});

/* Checklist persistence */
qsa("#checklist input").forEach((cb) => {
  const key = "check_" + cb.dataset.key;
  cb.checked = localStorage.getItem(key) === "1";
  cb.addEventListener("change", () => {
    localStorage.setItem(key, cb.checked ? "1" : "0");
  });
});

/* Breathing animation */
let timer = null;
const breathPhases = [
  { name: "Inhale", secs: 4, scale: 1.4 },
  { name: "Hold", secs: 4, scale: 1.0 },
  { name: "Exhale", secs: 6, scale: 0.6 },
];

const circle = qs("#breathCircle");
const label = qs("#breathLabel");

function startBreath() {
  stopBreath();
  let phase = 0,
    time = breathPhases[0].secs;
  circle.style.transform = `scale(${breathPhases[0].scale})`;
  label.textContent = `${breathPhases[0].name} (${time}s)`;

  timer = setInterval(() => {
    time--;
    if (time <= 0) {
      phase = (phase + 1) % breathPhases.length;
      time = breathPhases[phase].secs;
      circle.style.transform = `scale(${breathPhases[phase].scale})`;
    }
    label.textContent = `${breathPhases[phase].name} (${time}s)`;
  }, 1000);
}

function stopBreath() {
  clearInterval(timer);
  label.textContent = "Ready";
  circle.style.transform = "scale(1)";
}

qs("#startBreath").addEventListener("click", startBreath);
qs("#stopBreath").addEventListener("click", stopBreath);

/* Affirmations */
const affirmations = [
  "I am calm, focused, and ready to take on today.",
  "My body is strong, my mind is clear, my spirit is peaceful.",
  "Every breath I take fills me with positive energy.",
  "I choose happiness and health every day.",
  "My thoughts are powerful and positive.",
  "I am grateful for my healthy body and peaceful mind.",
];

function randAff() {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
}

const modal = qs("#modalAffirm");
qs("#modalNew").addEventListener("click", () => {
  qs("#modalAffText").textContent = randAff();
});

qs("#modalClose").addEventListener("click", () => {
  modal.style.display = "none";
  const aff = qs("#modalAffText").textContent;
  localStorage.setItem("fitbharat_affirm", aff);
  qs("#affirmationBox").textContent = aff;
});

(function dailyAff() {
  const key = "fitbharat_affirm_shown";
  const today = new Date().toISOString().slice(0, 10);
  if (localStorage.getItem(key) !== today) {
    modal.style.display = "flex";
    qs("#modalAffText").textContent = randAff();
    localStorage.setItem(key, today);
  } else {
    qs("#affirmationBox").textContent =
      localStorage.getItem("fitbharat_affirm") || randAff();
  }
})();

qs("#newAffirm").addEventListener("click", () => {
  const a = randAff();
  qs("#affirmationBox").textContent = a;
  localStorage.setItem("fitbharat_affirm", a);
});

/* Mood Tracker */
const MOOD_KEY = "fitbharat_mood_history";

function loadMood() {
  const hist = JSON.parse(localStorage.getItem(MOOD_KEY) || "[]");
  if (hist.length)
    qs("#moodDisplay").textContent = `Last: ${hist[0].mood} • ${hist[0].date}`;
  const el = qs("#moodHistory");
  el.innerHTML = "";
  hist.slice(0, 7).forEach((h) => {
    const div = document.createElement("div");
    div.className = "mood-item";
    div.innerHTML = `<div>${h.mood}</div><div class="muted">${h.date}</div>`;
    el.appendChild(div);
  });
}

qs("#saveMood").addEventListener("click", () => {
  const m = qs("#moodSelect").value;
  const date = new Date().toLocaleString();
  const hist = JSON.parse(localStorage.getItem(MOOD_KEY) || "[]");
  hist.unshift({ mood: m, date });
  localStorage.setItem(MOOD_KEY, JSON.stringify(hist.slice(0, 20)));
  loadMood();
});

loadMood();

/* Back to top */
const topBtn = qs("#backToTop");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
topBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);
