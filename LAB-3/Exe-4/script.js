// 2) Store activity in array of objects
let activityLog = [];

let clickCount = 0;
let keyCount = 0;
let focusCount = 0;

// DOM
const logList = document.getElementById("logList");
const emptyMsg = document.getElementById("emptyMsg");

const clickCountEl = document.getElementById("clickCount");
const keyCountEl = document.getElementById("keyCount");
const focusCountEl = document.getElementById("focusCount");

const warningBox = document.getElementById("warningBox");

const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");

// Suspicious thresholds
const CLICK_LIMIT = 8;       // too many clicks
const TIME_WINDOW = 3000;    // in 3 seconds

// helper time
function getTime() {
  return new Date().toLocaleTimeString();
}

// helper target name
function getTargetName(target) {
  const tag = target.tagName.toLowerCase();
  const id = target.id ? `#${target.id}` : "";
  const cls = target.className ? `.${target.className.toString().split(" ").join(".")}` : "";
  return tag + id + cls;
}

// 4) Display log dynamically
function renderLog() {
  logList.innerHTML = "";

  if (activityLog.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  // show newest on top
  const latest = [...activityLog].reverse();

  latest.forEach((item) => {
    const div = document.createElement("div");
    div.className = "log-item";

    div.innerHTML = `
      <span><span class="tag">${item.type}</span> | ${item.details}</span>
      <span class="time">${item.time}</span>
    `;

    logList.appendChild(div);
  });
}

// Add activity to array
function addActivity(type, details, phase) {
  activityLog.push({
    type,
    details: `${details} (${phase})`,
    time: getTime()
  });

  renderLog();
  updateStats();
  checkSuspicious();
}

// update stats
function updateStats() {
  clickCountEl.textContent = clickCount;
  keyCountEl.textContent = keyCount;
  focusCountEl.textContent = focusCount;
}

// 5) Suspicious click detection (too many clicks quickly)
function checkSuspicious() {
  const now = Date.now();

  // get clicks only within time window
  const recentClicks = activityLog.filter((a) => {
    if (a.type !== "CLICK") return false;

    // convert time string not reliable, so store timestamp instead
    return true;
  });

  // Better approach: count click timestamps in last 3 seconds
  // We'll store timestamps separately:
}

// Store click timestamps for suspicious check
let clickTimes = [];

function checkClickThreshold() {
  const now = Date.now();

  // keep only last 3 seconds clicks
  clickTimes = clickTimes.filter(t => now - t <= TIME_WINDOW);

  if (clickTimes.length >= CLICK_LIMIT) {
    warningBox.classList.add("show");
  } else {
    warningBox.classList.remove("show");
  }
}

// -----------------------------
// 1) Track clicks, keys, focus
// 3) Use capturing + bubbling
// -----------------------------

// CLICK (Capture)
document.addEventListener("click", (e) => {
  clickCount++;
  clickTimes.push(Date.now());
  addActivity("CLICK", `Target: ${getTargetName(e.target)}`, "CAPTURE");
  checkClickThreshold();
}, true);

// CLICK (Bubble)
document.addEventListener("click", (e) => {
  addActivity("CLICK", `Target: ${getTargetName(e.target)}`, "BUBBLE");
}, false);

// KEYDOWN (Capture)
document.addEventListener("keydown", (e) => {
  keyCount++;
  addActivity("KEY", `Key: "${e.key}" on ${getTargetName(e.target)}`, "CAPTURE");
}, true);

// KEYDOWN (Bubble)
document.addEventListener("keydown", (e) => {
  addActivity("KEY", `Key: "${e.key}" on ${getTargetName(e.target)}`, "BUBBLE");
}, false);

// FOCUS (Capture) - focus doesn't bubble normally, but works with capture
document.addEventListener("focus", (e) => {
  focusCount++;
  addActivity("FOCUS", `Focused: ${getTargetName(e.target)}`, "CAPTURE");
}, true);

// BLUR (Capture)
document.addEventListener("blur", (e) => {
  addActivity("BLUR", `Blurred: ${getTargetName(e.target)}`, "CAPTURE");
}, true);

// -----------------------------
// 6) Reset + Export
// -----------------------------
resetBtn.addEventListener("click", () => {
  activityLog = [];
  clickTimes = [];

  clickCount = 0;
  keyCount = 0;
  focusCount = 0;

  warningBox.classList.remove("show");
  updateStats();
  renderLog();
});

exportBtn.addEventListener("click", () => {
  if (activityLog.length === 0) {
    alert("No activity to export!");
    return;
  }

  const text = activityLog
    .map((a, i) => `${i + 1}. [${a.time}] ${a.type} - ${a.details}`)
    .join("\n");

  // Create downloadable text file
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "activity-log.txt";
  a.click();

  URL.revokeObjectURL(url);
});

// Start
renderLog();
updateStats();
