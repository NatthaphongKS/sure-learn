const TRANSLATIONS = {
  th: {
    tag: "Make sure you understand",
    title: "Topic Checklist",
    subtitle: "ติดตามความเข้าใจแต่ละหัวข้อผ่าน 2–3 ระดับ",
    statTotal: "หัวข้อทั้งหมด",
    statDone: "ผ่านแล้ว",
    progressSuffix: "% เสร็จสิ้น",
    placeholder: "ชื่อหัวข้อ เช่น NestJS Module...",
    addBtn: "+ เพิ่ม",
    badgeDone: "ผ่านแล้ว ✓",
    legendTitle: "แนวทางการเรียนรู้แบบครบวงจร",
    legendSteps: [
      {
        num: "1",
        text: "<strong>รับรู้พื้นฐาน</strong> — ศึกษาเอกสาร บทความ วิดีโอ จนเข้าใจภาพรวมและหลักการทำงาน",
      },
      {
        num: "2",
        text: "<strong>อธิบายและสื่อสาร</strong> — สามารถบอกให้คนอื่นเข้าใจได้โดยไม่ต้องดูเอกสาร ทำให้แน่ใจว่าเข้าใจจริง",
      },
      {
        num: "3",
        text: "<strong>ประยุกต์ใช้จริง</strong> — นำความรู้ไปสร้างโปรเจค แก้ปัญหา หรือ implement จากศูนย์ได้ด้วยตนเอง",
      },
    ],
    legendConcept:
      "<span class='dot-concept'></span><strong>Concept</strong> — ความรู้ทฤษฎี (step 1-2)<br><small>เหมาะสำหรับเรียนรู้แนวคิด หลักการ ทฤษฎี และ concept ต่างๆ</small>",
    legendPractical:
      "<span class='dot-practical'></span><strong>Practical</strong> — ทักษะปฏิบัติ (step 1-3)<br><small>เหมาะสำหรับเรียนรู้เทคนิคการเขียนโค้ด เครื่องมือ และทักษะที่ต้องใช้จริง</small>",
    legendTips: [
      {
        icon: "💡",
        text: "<strong>เคล็ดลับการเรียนรู้:</strong> ผสมผสานหลายวิธี - อ่าน+ดูวิดีโอ+ลองทำ+สอนคนอื่น จะช่วยให้จดจำได้นานขึ้น",
      },
      {
        icon: "🎯",
        text: "<strong>การประเมินตนเอง:</strong> ถ้าทำ step ใดไม่ได้ ให้กลับไปศึกษาพื้นฐานเพิ่ม อย่าไปต่อ step ถ้ายังไม่มั่นใจ",
      },
    ],
    stepLabels: {
      concept: ["เรียนจนรู้", "อธิบายได้"],
      practical: ["เรียนจนรู้", "อธิบายได้", "build จาก 0"],
    },
    stepOf: (d, t) => `${d} / ${t} step`,
    emptyText: "ยังไม่มีหัวข้อ — เพิ่มได้เลยค่ะ",
  },
  en: {
    tag: "Make sure you understand",
    title: "Topic Checklist",
    subtitle: "Track understanding across 2–3 mastery levels",
    statTotal: "Total topics",
    statDone: "Completed",
    progressSuffix: "% done",
    placeholder: "Topic name e.g. NestJS Module...",
    addBtn: "+ Add",
    badgeDone: "Done ✓",
    legendTitle: "Holistic learning approach",
    legendSteps: [
      {
        num: "1",
        text: "<strong>Acquire basics</strong> — Read docs, articles, watch videos until you grasp the overview and core mechanics.",
      },
      {
        num: "2",
        text: "<strong>Explain & communicate</strong> — Describe it to someone else without referencing docs. This confirms real understanding.",
      },
      {
        num: "3",
        text: "<strong>Apply in practice</strong> — Use knowledge to build a project, solve problems, or implement from scratch on your own.",
      },
    ],
    legendConcept:
      "<span class='dot-concept'></span><strong>Concept</strong> — Theoretical knowledge (steps 1–2)<br><small>Best for learning ideas, principles, theory, and mental models.</small>",
    legendPractical:
      "<span class='dot-practical'></span><strong>Practical</strong> — Applied skills (steps 1–3)<br><small>Best for coding techniques, tools, and skills you'll use in real projects.</small>",
    legendTips: [
      {
        icon: "💡",
        text: "<strong>Learning tip:</strong> Mix methods — read + watch + try + teach someone else. Multi-modal practice leads to longer retention.",
      },
      {
        icon: "🎯",
        text: "<strong>Self-assessment:</strong> If you can't complete a step, go back and reinforce the basics. Don't move forward until you're confident.",
      },
    ],
    stepLabels: {
      concept: ["Learn it", "Explain it"],
      practical: ["Learn it", "Explain it", "Build from 0"],
    },
    stepOf: (d, t) => `${d} / ${t} steps`,
    emptyText: "No topics yet — add one above.",
  },
};

// step counts per type — language-independent key
const STEP_COUNT = { concept: 2, practical: 3 };

let lang = "th";
let selectedType = "concept";
// steps stores indices [0,1,2] instead of labels — safe across lang switch
let topics = JSON.parse(localStorage.getItem("tl_topics_v2") || "[]");

function setLang(l) {
  lang = l;
  document.getElementById("lang-th").className =
    "lang-btn" + (l === "th" ? " active" : "");
  document.getElementById("lang-en").className =
    "lang-btn" + (l === "en" ? " active" : "");
  applyLang();
  render();
}

function applyLang() {
  const T = TRANSLATIONS[lang];
  document.getElementById("txt-tag").textContent = T.tag;
  document.getElementById("txt-title").textContent = T.title;
  document.getElementById("txt-subtitle").textContent = T.subtitle;
  document.getElementById("txt-stat-total").textContent = T.statTotal;
  document.getElementById("txt-stat-done").textContent = T.statDone;
  document.getElementById("topic-input").placeholder = T.placeholder;
  document.getElementById("btn-add").textContent = T.addBtn;
  document.getElementById("txt-legend-title").textContent = T.legendTitle;
  document.getElementById("txt-legend-concept").innerHTML = T.legendConcept;
  document.getElementById("txt-legend-practical").innerHTML = T.legendPractical;
  document.getElementById("legend-steps").innerHTML = T.legendSteps
    .map(
      (s) =>
        `<div class="legend-row"><span class="legend-num">${s.num}</span><span>${s.text}</span></div>`,
    )
    .join("");
  document.getElementById("legend-tips").innerHTML = T.legendTips
    .map(
      (s) =>
        `<div class="legend-row" style="font-size:11px;line-height:1.4"><span style="color:var(--text-muted)">${s.icon}</span><span style="color:var(--text-muted)">${s.text}</span></div>`,
    )
    .join("");
}

function setType(t) {
  selectedType = t;
  document.getElementById("btn-concept").className =
    t === "concept" ? "active-concept" : "";
  document.getElementById("btn-practical").className =
    t === "practical" ? "active-practical" : "";
}

function save() {
  localStorage.setItem("tl_topics_v2", JSON.stringify(topics));
}

function addTopic() {
  const input = document.getElementById("topic-input");
  const name = input.value.trim();
  if (!name) return;
  topics.unshift({ id: Date.now(), name, type: selectedType, steps: [] });
  input.value = "";
  save();
  render();
}

function toggleStep(id, stepIndex) {
  const t = topics.find((x) => x.id === id);
  if (!t) return;
  const i = t.steps.indexOf(stepIndex);
  if (i === -1) t.steps.push(stepIndex);
  else t.steps.splice(i, 1);
  save();
  render();
}

function toggleType(id) {
  const t = topics.find((x) => x.id === id);
  if (!t) return;
  t.type = t.type === "concept" ? "practical" : "concept";
  const maxSteps = STEP_COUNT[t.type];
  t.steps = t.steps.filter((i) => i < maxSteps);
  save();
  render();
}

function deleteTopic(id) {
  topics = topics.filter((x) => x.id !== id);
  save();
  render();
}

function updateStats() {
  const T = TRANSLATIONS[lang];
  const total = topics.length;
  const done = topics.filter(
    (t) => t.steps.length === STEP_COUNT[t.type],
  ).length;
  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-done").textContent = done;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  document.getElementById("progress-fill").style.width = pct + "%";
  document.getElementById("progress-label").textContent =
    pct + T.progressSuffix;
}

function render() {
  const T = TRANSLATIONS[lang];
  const list = document.getElementById("topic-list");
  updateStats();

  if (!topics.length) {
    list.innerHTML = `<div class="empty"><div class="empty-icon">◻</div><p>${T.emptyText}</p></div>`;
    return;
  }

  list.innerHTML = topics
    .map((t) => {
      const labels = T.stepLabels[t.type];
      const total = STEP_COUNT[t.type];
      const doneCount = t.steps.length;
      const complete = doneCount === total;

      const stepsHtml = labels
        .map((label, i) => {
          const isDone = t.steps.includes(i);
          return `<button class="step-btn ${isDone ? "done" : ""}" onclick="toggleStep(${t.id}, ${i})">
              <span class="step-check">${isDone ? "✓" : i + 1}</span>
              <span class="step-label">${label}</span>
            </button>`;
        })
        .join("");

      const dotsHtml = labels
        .map(
          (_, i) =>
            `<div class="mini-dot ${t.steps.includes(i) ? "filled" : ""}"></div>`,
        )
        .join("");

      return `<div class="topic-card ${complete ? "complete" : ""}">
            <div class="card-header">
              <div class="card-left">
                <span class="topic-name">${escHtml(t.name)}</span>
                ${complete ? `<span class="badge-done">${T.badgeDone}</span>` : ""}
              </div>
              <div class="card-right">
                <button class="badge badge-${t.type}" onclick="toggleType(${t.id})">${t.type}</button>
                <button class="del-btn" onclick="deleteTopic(${t.id})" title="Delete">×</button>
              </div>
            </div>
            <div class="steps">${stepsHtml}</div>
            <div class="card-footer">
              <span class="step-count">${T.stepOf(doneCount, total)}</span>
              <div class="mini-bar">${dotsHtml}</div>
            </div>
          </div>`;
    })
    .join("");
}

function escHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.getElementById("topic-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTopic();
});

applyLang();
render();
