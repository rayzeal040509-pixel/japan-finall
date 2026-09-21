const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const progress = $("#progress");
window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${(scrollY / h) * 100}%`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => observer.observe(el));

const themeBtn = $("#themeBtn");
themeBtn.addEventListener("click", () => {
  const next = document.body.dataset.theme === "light" ? "" : "light";
  document.body.dataset.theme = next;
  localStorage.setItem("japan-theme", next);
});
const savedTheme = localStorage.getItem("japan-theme");
if (savedTheme) document.body.dataset.theme = savedTheme;

const countryData = {
  germany: { flag:"🇩🇪", name:"Germany", text:"Japan drew on German models for military organization and elements of its legal and political system." },
  britain: { flag:"🇬🇧", name:"Britain", text:"Britain influenced Japan’s navy and provided examples of industrial and financial practices." },
  france: { flag:"🇫🇷", name:"France", text:"Japan studied French approaches to administration and aspects of military organization." },
  usa: { flag:"🇺🇸", name:"United States", text:"American education and industrial techniques were among the systems Japan examined and adapted." }
};
$$(".country").forEach(btn => btn.addEventListener("click", () => {
  $$(".country").forEach(x => x.classList.remove("active"));
  btn.classList.add("active");
  const d = countryData[btn.dataset.country];
  $("#countryDetail").innerHTML = `<div class="detail-orbit"></div><span class="detail-flag">${d.flag}</span><h3>${d.name}</h3><p>${d.text}</p>`;
}));

const timelineData = {
  "1853": ["THE FIRST SHOCK","Perry arrives in Japan.","Japan realized that remaining weak and isolated could leave it vulnerable to Western imperialism."],
  "1868": ["THE TURNING POINT","The Meiji Restoration.","The Tokugawa shogunate was overthrown and a centralized modernization project began."],
  "1894": ["THE FIRST MAJOR TEST","China defeated.","Japan won the First Sino-Japanese War, gaining Taiwan and greater influence over Korea."],
  "1902": ["DIPLOMATIC POWER","Alliance with Britain.","The Anglo-Japanese Alliance gave Japan diplomatic legitimacy, security and recognition."],
  "1905": ["THE GREAT POWER TEST","Russia defeated.","Victory over the Russian Empire transformed international perceptions of Japan."],
  "1910": ["THE CONTRADICTION","Korea annexed.","Japan formally annexed Korea, demonstrating its transformation from resisting imperialism to practicing it."]
};
$$(".event").forEach(btn => btn.addEventListener("click", () => {
  $$(".event").forEach(x => x.classList.remove("active"));
  btn.classList.add("active");
  const d = timelineData[btn.dataset.year];
  $("#timelineDetail").innerHTML = `<span class="big-year">${btn.dataset.year}</span><div><span class="eyebrow">${d[0]}</span><h3>${d[1]}</h3><p>${d[2]}</p></div>`;
}));

const quiz = [
  {q:"What was the main objective behind “Fukoku kyōhei”?", a:["Become a rich country with a strong army","Return to complete isolation","Abolish the emperor","End industrialization"], c:0, e:"The phrase means “Rich country, strong army.”"},
  {q:"Who arrived in Japan with modern warships in 1853?", a:["Matthew Perry","Emperor Meiji","Mitsubishi","Tsar Nicholas II"], c:0, e:"American Commodore Matthew Perry pressured Japan to open its ports."},
  {q:"Which war demonstrated Japan’s growing power against Qing China?", a:["First Sino-Japanese War","Crimean War","Franco-Prussian War","Russo-Turkish War"], c:0, e:"Japan defeated Qing China in 1894–1895."},
  {q:"Which country formed the Anglo-Japanese Alliance with Japan in 1902?", a:["Britain","France","Germany","United States"], c:0, e:"Britain became an important diplomatic and strategic partner."},
  {q:"What was especially significant about Japan’s 1905 victory over Russia?", a:["An Asian power defeated a major European imperial power","Japan became a democracy overnight","Russia became a Japanese colony","Europe ended imperialism"], c:0, e:"The victory challenged assumptions about European military superiority."},
  {q:"What major contradiction defined Japan’s rise?", a:["It escaped imperialism but later became an imperial power","It industrialized but rejected technology","It defeated China but never expanded","It formed no international alliances"], c:0, e:"Japan shifted from a potential victim of imperialism to an imperial power itself."}
];
let qIndex=0, answered=false;
function renderQuiz(){
  answered=false;
  const q=quiz[qIndex];
  $("#question").textContent=q.q;
  $("#quizCounter").textContent=`${qIndex+1} / ${quiz.length}`;
  $("#feedback").textContent="";
  $("#nextBtn").disabled=true;
  $("#nextBtn").textContent=qIndex===quiz.length-1?"Finish quiz →":"Next question →";
  $("#answers").innerHTML=q.a.map((x,i)=>`<button class="answer" data-i="${i}">${String.fromCharCode(65+i)}. ${x}</button>`).join("");
  $$(".answer").forEach(btn=>btn.addEventListener("click",()=>{
    if(answered)return;
    answered=true;
    const i=+btn.dataset.i;
    $$(".answer").forEach(b=>b.disabled=true);
    if(i===q.c){btn.classList.add("correct");$("#feedback").textContent="✓ Correct. "+q.e}
    else {btn.classList.add("wrong");$(".answer")[q.c].classList.add("correct");$("#feedback").textContent="Not quite. "+q.e}
    $("#nextBtn").disabled=false;
  }));
}
$("#nextBtn").addEventListener("click",()=>{
  if(qIndex<quiz.length-1){qIndex++;renderQuiz()}
  else {$("#question").textContent="You’ve reached the end.";$("#answers").innerHTML="";$("#feedback").textContent="The key idea: Japan’s rise transformed both its own society and the balance of power in Asia.";$("#nextBtn").textContent="Restart quiz ↻";qIndex=-1}
  if(qIndex===-1) $("#nextBtn").onclick=()=>{qIndex=0;renderQuiz()};
});
renderQuiz();

const bgAudio = $("#bgAudio");
bgAudio.volume = 0.35;
const soundBtn = $("#soundBtn");
soundBtn.addEventListener("click", () => {
  if (bgAudio.paused) {
    bgAudio.play().then(() => {
      soundBtn.textContent = "Sound: On";
    }).catch(() => {
      soundBtn.textContent = "Sound: blocked — tap again";
    });
  } else {
    bgAudio.pause();
    soundBtn.textContent = "Sound: Off";
  }
});
// If the tab is hidden for a long time some browsers pause playback;
// keep the button label in sync with the audio's actual state either way.
bgAudio.addEventListener("pause", () => { soundBtn.textContent = "Sound: Off"; });
bgAudio.addEventListener("play", () => { soundBtn.textContent = "Sound: On"; });
