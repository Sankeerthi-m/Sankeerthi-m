/* ------------------------------------------------------------------
   EDIT THIS BLOCK ONLY. Everything on the page is built from DATA.
   Projects, talks and role bullets are SAMPLES: replace with your own.
   Links use placeholders (YOUR_USERNAME etc.): replace before publishing.
------------------------------------------------------------------- */
const DATA = {
  person: {
    name: "Sankeerthi",
    role: "DevOps & AWS Cloud Engineer",
    location: "Hyderabad, India",
    company: "Trivy Technologies Private Limited",
    years: 4,
    tagline:
      "I design cloud platforms and delivery pipelines on AWS and Azure, so teams can ship often and sleep through the night.",
  },
  links: {
    github: "https://github.com/YOUR_USERNAME",
    linkedin: "https://www.linkedin.com/in/YOUR_HANDLE",
    youtube: "https://www.youtube.com/@YOUR_CHANNEL",
    email: "mailto:you@example.com",
  },
  lastRun: [
    ["build", "pass"],
    ["test", "pass"],
    ["scan", "pass"],
    ["deploy", "pass"],
  ],
  projects: [
    {
      title: "GitOps platform on EKS",
      kicker: "Kubernetes · ArgoCD · Helm",
      hue: 215,
      summary: "Sample: one-line result, e.g. cut deploy time from hours to minutes.",
      detail:
        "Sample text. Describe the problem, what you built and the result. Example: a multi-environment EKS platform where every change ships through Git and ArgoCD syncs it to the cluster.",
      stack: ["AWS EKS", "ArgoCD", "Helm", "Terraform"],
      links: [["Repository", "https://github.com/YOUR_USERNAME/REPO_ONE"]],
    },
    {
      title: "Terraform landing zone",
      kicker: "AWS · Terraform",
      hue: 160,
      summary: "Sample: reusable modules for accounts, networking and IAM.",
      detail:
        "Sample text. Explain the module layout, how state is stored and locked, and how teams request new environments.",
      stack: ["Terraform", "AWS Organizations", "IAM", "VPC"],
      links: [["Repository", "https://github.com/YOUR_USERNAME/REPO_TWO"]],
    },
    {
      title: "CI/CD with quality gates",
      kicker: "Jenkins · GitHub Actions",
      hue: 25,
      summary: "Sample: build, test, scan and deploy in one pipeline.",
      detail:
        "Sample text. Describe the stages, what blocks a release, and how you measured the improvement.",
      stack: ["Jenkins", "GitHub Actions", "Docker", "Trivy"],
      links: [["Repository", "https://github.com/YOUR_USERNAME/REPO_THREE"]],
    },
    {
      title: "Observability stack",
      kicker: "Prometheus · Grafana · Datadog",
      hue: 285,
      summary: "Sample: dashboards and alerts people actually trust.",
      detail:
        "Sample text. Cover what you monitor, how alerts are routed, and an incident this helped resolve faster.",
      stack: ["Prometheus", "Grafana", "Datadog", "Dynatrace"],
      links: [["Repository", "https://github.com/YOUR_USERNAME/REPO_FOUR"]],
    },
  ],
  stack: [
    { group: "Cloud", items: ["AWS", "Azure"] },
    { group: "Containers and delivery", items: ["Kubernetes", "Helm", "ArgoCD"] },
    { group: "Infrastructure and CI/CD", items: ["Terraform", "Jenkins", "GitHub Actions"] },
    { group: "Observability", items: ["Prometheus", "Grafana", "Dynatrace", "Datadog"] },
  ],
  talks: [
    {
      title: "Kubernetes networking, explained",
      kicker: "tech__.talks · episode",
      hue: 200,
      summary: "Sample: how a request reaches a pod.",
      detail: "Sample text. Say who this is for and what they will be able to do afterwards.",
      stack: ["Kubernetes", "Networking"],
      links: [["Watch", "https://www.youtube.com/@YOUR_CHANNEL"]],
    },
    {
      title: "Terraform state without the fear",
      kicker: "tech__.talks · episode",
      hue: 260,
      summary: "Sample: remote state, locking and safe refactors.",
      detail: "Sample text. Say who this is for and what they will be able to do afterwards.",
      stack: ["Terraform"],
      links: [["Watch", "https://www.youtube.com/@YOUR_CHANNEL"]],
    },
    {
      title: "DevOps interview scenarios",
      kicker: "tech__.talks · episode",
      hue: 30,
      summary: "Sample: real questions and how to structure answers.",
      detail: "Sample text. Say who this is for and what they will be able to do afterwards.",
      stack: ["Interview prep", "CI/CD", "AWS"],
      links: [["Watch", "https://www.youtube.com/@YOUR_CHANNEL"]],
    },
  ],
  experience: [
    {
      role: "DevOps & AWS Cloud Engineer",
      org: "Trivy Technologies Private Limited",
      when: "About 4 years of experience",
      bullets: [
        "Sample: run Kubernetes workloads with Helm and ArgoCD.",
        "Sample: manage AWS and Azure infrastructure as code with Terraform.",
        "Sample: build CI/CD in Jenkins and GitHub Actions.",
        "Sample: monitor with Prometheus, Grafana, Dynatrace and Datadog.",
      ],
    },
  ],
};

const PROFILES = {
  recruiter: { label: "Recruiter", note: "Experience and skills first", order: ["experience", "stack", "projects", "talks"] },
  engineer: { label: "Engineer", note: "Projects and tooling first", order: ["projects", "stack", "experience", "talks"] },
  learner: { label: "Learner", note: "tech__.talks first", order: ["talks", "projects", "stack", "experience"] },
};

const SHELVES = {
  projects: { title: "Projects", sub: "Things I built", nav: "Projects" },
  stack: { title: "Stack", sub: "What I work with", nav: "Stack" },
  talks: { title: "tech__.talks", sub: "Teaching DevOps and cloud", nav: "Talks" },
  experience: { title: "Experience", sub: DATA.person.company, nav: "Experience" },
};

/* ------------------------------ helpers ------------------------------ */
const $ = (s) => document.querySelector(s);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function h(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}
function store(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch (_) { return null; }
}

/* ------------------------------ opening ------------------------------ */
const LOG_LINES = [
  ["cmd", "$ git push origin main"],
  ["", "  checking out sources"],
  ["ok", "  build    passed"],
  ["ok", "  test     passed"],
  ["ok", "  scan     passed"],
  ["ok", "  deploy   production"],
];

function runOpening() {
  const log = $("#log");
  const wrap = $("#openTitleWrap");
  let i = 0, timer;

  function finish() {
    clearTimeout(timer);
    log.hidden = true;
    wrap.hidden = false;
    $("#skip").hidden = true;
    $("#play").focus();
  }
  function next() {
    if (i >= LOG_LINES.length) { timer = setTimeout(finish, 500); return; }
    const [cls, text] = LOG_LINES[i++];
    const line = h("span", cls, text + "\n");
    log.appendChild(line);
    timer = setTimeout(next, i === 1 ? 700 : 480);
  }

  $("#skip").addEventListener("click", showProfiles);
  $("#play").addEventListener("click", showProfiles);

  if (reduceMotion) finish(); else next();
}

/* ------------------------------ profiles ----------------------------- */
let currentProfile = store("profile") in PROFILES ? store("profile") : "recruiter";

function buildProfileGrid() {
  const grid = $("#profileGrid");
  grid.textContent = "";
  Object.entries(PROFILES).forEach(([key, p]) => {
    const b = h("button", "profile");
    b.type = "button";
    const face = h("span", "face", p.label[0]);
    const name = h("strong", "", p.label);
    const note = h("small", "", p.note);
    b.append(face, name, note);
    b.addEventListener("click", () => chooseProfile(key));
    grid.appendChild(b);
  });
}

function showProfiles() {
  $("#opening").hidden = true;
  $("#app").hidden = true;
  $("#profiles").hidden = false;
  const first = $("#profileGrid button");
  if (first) first.focus();
}

function chooseProfile(key) {
  currentProfile = key;
  store("profile", key);
  $("#profiles").hidden = true;
  $("#app").hidden = false;
  renderRows();
  window.scrollTo(0, 0);
}

/* ------------------------------ rows --------------------------------- */
function posterCard(item) {
  const card = h("button", "card");
  card.type = "button";
  const poster = h("span", "poster");
  poster.style.setProperty("--h", item.hue);
  poster.append(h("b", "", item.title), h("span", "", item.kicker));
  card.append(poster, h("span", "card-body", item.summary));
  card.addEventListener("click", () => openDetail(item));
  return card;
}

function stackCard(g) {
  const card = h("div", "card group");
  card.appendChild(h("h3", "", g.group));
  const tags = h("ul", "tags");
  g.items.forEach((t) => tags.appendChild(h("li", "", t)));
  card.appendChild(tags);
  return card;
}

function roleCard(r) {
  const card = h("div", "card role");
  card.append(h("p", "when", r.when), h("h3", "", r.role), h("p", "", r.org));
  const ul = h("ul");
  r.bullets.forEach((b) => ul.appendChild(h("li", "", b)));
  card.appendChild(ul);
  return card;
}

function shelf(id) {
  const meta = SHELVES[id];
  const sec = h("section", "row");
  sec.id = id;
  sec.setAttribute("aria-labelledby", id + "-h");

  const head = h("div", "row-head");
  const title = h("h2", "", meta.title);
  title.id = id + "-h";
  head.append(title, h("p", "", meta.sub));

  const track = h("div", "track");
  track.tabIndex = 0;
  track.setAttribute("aria-label", meta.title + " list, scroll sideways");

  if (id === "projects") DATA.projects.forEach((p) => track.appendChild(posterCard(p)));
  if (id === "talks") DATA.talks.forEach((t) => track.appendChild(posterCard(t)));
  if (id === "stack") DATA.stack.forEach((g) => track.appendChild(stackCard(g)));
  if (id === "experience") DATA.experience.forEach((r) => track.appendChild(roleCard(r)));

  const prev = h("button", "arrow prev", "‹");
  const nextB = h("button", "arrow next", "›");
  prev.type = nextB.type = "button";
  prev.setAttribute("aria-label", "Scroll " + meta.title + " back");
  nextB.setAttribute("aria-label", "Scroll " + meta.title + " forward");
  const scroll = (dir) =>
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduceMotion ? "auto" : "smooth" });
  prev.addEventListener("click", () => scroll(-1));
  nextB.addEventListener("click", () => scroll(1));

  sec.append(head, track, prev, nextB);
  return sec;
}

function renderRows() {
  const rows = $("#rows");
  rows.textContent = "";
  const order = PROFILES[currentProfile].order;
  order.forEach((id) => rows.appendChild(shelf(id)));

  const nav = $("#navLinks");
  nav.textContent = "";
  order.forEach((id) => {
    const a = h("a", "", SHELVES[id].nav);
    a.href = "#" + id;
    nav.appendChild(a);
  });
  const c = h("a", "", "Contact");
  c.href = "#contact";
  nav.appendChild(c);
}

/* ------------------------------ detail ------------------------------- */
function openDetail(item) {
  const d = $("#detail");
  $("#detailTitle").textContent = item.title;
  $("#detailMeta").textContent = item.kicker;
  $("#detailText").textContent = item.detail;
  const poster = $("#detailPoster");
  poster.style.setProperty("--h", item.hue);
  poster.textContent = item.title;

  const tags = $("#detailTags");
  tags.textContent = "";
  item.stack.forEach((t) => tags.appendChild(h("li", "", t)));

  const links = $("#detailLinks");
  links.textContent = "";
  item.links.forEach(([label, url]) => {
    const a = h("a", "btn primary", label);
    a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    links.appendChild(a);
  });
  d.showModal();
}

/* ------------------------------ static bits -------------------------- */
function fillStatic() {
  const p = DATA.person;
  document.title = p.name + " · " + p.role;
  $("#heroName").textContent = p.name;
  $("#heroRole").textContent = p.role;
  $("#heroTagline").textContent = p.tagline;
  $("#heroMeta").textContent = p.location + ", about " + p.years + " years in cloud and DevOps";

  const list = $("#statusList");
  DATA.lastRun.forEach(([name, state]) => {
    const li = h("li");
    li.append(h("span", "", name), h("span", state, state));
    list.appendChild(li);
  });

  const fl = $("#footerLinks");
  [["GitHub", DATA.links.github], ["LinkedIn", DATA.links.linkedin], ["YouTube", DATA.links.youtube], ["Email", DATA.links.email]].forEach(
    ([label, url]) => {
      const a = h("a", "btn ghost", label);
      a.href = url;
      if (!url.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      fl.appendChild(a);
    }
  );

  $("#heroPlay").addEventListener("click", () => openDetail(DATA.projects[0]));
  $("#switchView").addEventListener("click", showProfiles);
  $("#detailClose").addEventListener("click", () => $("#detail").close());
  $("#detail").addEventListener("click", (e) => { if (e.target === e.currentTarget) e.currentTarget.close(); });
}

/* ------------------------------ start -------------------------------- */
fillStatic();
buildProfileGrid();
runOpening();
