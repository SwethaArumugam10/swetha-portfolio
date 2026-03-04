import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   ALL STYLES (injected into <head>)
───────────────────────────────────────────── */
const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:      #080C10;
    --bg2:     #0D1117;
    --bg3:     #111820;
    --surface: #141C25;
    --border:  #1E2D3D;
    --gold:    #E8B84B;
    --gold2:   #F5CF7A;
    --teal:    #2DD4BF;
    --text:    #E8EDF2;
    --muted:   #7A8FA6;
    --font-head: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  ::selection { background: var(--gold); color: #000; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 20px 6%;
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(8,12,16,0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: padding 0.3s, box-shadow 0.3s;
  }
  .nav.scrolled {
    padding: 12px 6%;
    box-shadow: 0 4px 40px rgba(0,0,0,0.5);
  }
  .nav-logo {
    font-family: var(--font-head);
    font-size: 1.5rem; font-weight: 800;
    letter-spacing: -0.03em; color: var(--text);
    text-decoration: none;
  }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted); text-decoration: none;
    transition: color 0.2s; position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0;
    width: 0; height: 1px; background: var(--gold); transition: width 0.3s;
  }
  .nav-links a:hover { color: var(--gold); }
  .nav-links a:hover::after { width: 100%; }

  .nav-mobile-btn {
    display: none; flex-direction: column; gap: 5px;
    cursor: pointer; padding: 4px; background: none; border: none;
  }
  .nav-mobile-btn span {
    display: block; width: 22px; height: 2px;
    background: var(--text); transition: all 0.3s;
  }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 130px 6% 90px;
    position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background:
      radial-gradient(ellipse 70% 60% at 80% 50%, rgba(45,212,191,0.045) 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 20% 80%, rgba(232,184,75,0.055) 0%, transparent 50%),
      linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%);
  }
  .hero-grid {
    position: absolute; inset: 0; z-index: 0;
    background-image:
      linear-gradient(rgba(30,45,61,0.28) 1px, transparent 1px),
      linear-gradient(90deg, rgba(30,45,61,0.28) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%);
  }
  .hero-content { position: relative; z-index: 1; max-width: 860px; }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 9px;
    background: rgba(232,184,75,0.09);
    border: 1px solid rgba(232,184,75,0.28);
    border-radius: 100px; padding: 7px 18px;
    font-size: 0.72rem; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 30px;
    animation: fadeSlideDown 0.8s ease both;
  }
  .badge-dot {
    width: 7px; height: 7px; border-radius: 50%; background: var(--gold);
    animation: pulse 2.2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.45; transform:scale(0.75); }
  }
  @keyframes fadeSlideDown {
    from { opacity:0; transform:translateY(-14px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeSlideUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .hero-name {
    font-family: var(--font-head);
    font-size: clamp(3.2rem, 9vw, 6.8rem);
    font-weight: 800; line-height: 0.92;
    letter-spacing: -0.04em; margin-bottom: 6px;
    animation: fadeSlideUp 0.9s 0.1s ease both;
  }
  .hero-name-first { display: block; color: var(--text); }
  .hero-name-last  { display: block; color: var(--gold); }

  .hero-role {
    font-size: clamp(1rem, 2vw, 1.2rem); color: var(--muted);
    font-weight: 300; letter-spacing: 0.04em;
    margin: 22px 0 30px;
    animation: fadeSlideUp 0.9s 0.2s ease both;
  }
  .hero-role strong { color: var(--teal); font-weight: 500; }

  .hero-summary {
    max-width: 580px; line-height: 1.8;
    color: var(--muted); font-size: 0.97rem;
    margin-bottom: 46px;
    animation: fadeSlideUp 0.9s 0.3s ease both;
  }

  .hero-cta {
    display: flex; gap: 14px; flex-wrap: wrap;
    animation: fadeSlideUp 0.9s 0.4s ease both;
  }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--gold); color: #000;
    border: none; border-radius: 6px;
    padding: 14px 30px;
    font-family: var(--font-head); font-size: 0.82rem;
    font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    text-decoration: none; cursor: pointer; transition: all 0.22s;
    box-shadow: 0 0 28px rgba(232,184,75,0.22);
  }
  .btn-primary:hover {
    background: var(--gold2); transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(232,184,75,0.32);
  }

  .btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--text);
    border: 1px solid var(--border); border-radius: 6px;
    padding: 14px 30px;
    font-family: var(--font-head); font-size: 0.82rem;
    font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    text-decoration: none; cursor: pointer; transition: all 0.22s;
  }
  .btn-outline:hover {
    border-color: var(--gold); color: var(--gold);
    transform: translateY(-3px);
  }

  .hero-stats {
    display: flex; gap: 44px; margin-top: 60px;
    padding-top: 42px; border-top: 1px solid var(--border);
    flex-wrap: wrap;
    animation: fadeSlideUp 0.9s 0.5s ease both;
  }
  .stat-num {
    font-family: var(--font-head); font-size: 2.4rem;
    font-weight: 800; color: var(--gold); line-height: 1;
  }
  .stat-label {
    font-size: 0.72rem; color: var(--muted);
    letter-spacing: 0.1em; text-transform: uppercase; margin-top: 5px;
  }

  /* ── FLOATING ORBS ── */
  .orb {
    position: absolute; border-radius: 50%;
    background: var(--gold); opacity: 0.03;
    pointer-events: none;
    animation: orbFloat 10s ease-in-out infinite;
  }
  @keyframes orbFloat {
    0%,100% { transform: translateY(0) rotate(0deg); }
    50%      { transform: translateY(-22px) rotate(180deg); }
  }

  /* ── SECTION SHARED ── */
  .section      { padding: 100px 6%; }
  .section-alt  { background: var(--bg2); }

  .section-header { margin-bottom: 58px; }
  .section-tag {
    font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--teal); font-weight: 700; margin-bottom: 12px;
  }
  .section-title {
    font-family: var(--font-head);
    font-size: clamp(1.9rem, 4vw, 3rem);
    font-weight: 800; letter-spacing: -0.025em;
    line-height: 1.08; color: var(--text);
  }
  .section-title span { color: var(--gold); }
  .section-line {
    width: 56px; height: 3px;
    background: linear-gradient(90deg, var(--gold), transparent);
    margin-top: 18px; border-radius: 2px;
  }

  /* ── SKILLS ── */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(285px, 1fr));
    gap: 18px;
  }
  .skill-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px; padding: 28px;
    position: relative; overflow: hidden;
    transition: border-color 0.3s, transform 0.25s;
  }
  .skill-card::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--teal));
    opacity: 0; transition: opacity 0.3s;
  }
  .skill-card:hover { border-color: rgba(232,184,75,0.3); transform: translateY(-5px); }
  .skill-card:hover::before { opacity: 1; }
  .skill-cat {
    font-family: var(--font-head); font-size: 0.68rem;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 16px; font-weight: 700;
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-tag {
    background: rgba(255,255,255,0.045);
    border: 1px solid var(--border);
    border-radius: 100px; padding: 4px 13px;
    font-size: 0.77rem; color: var(--text); font-weight: 400;
    transition: border-color 0.2s;
  }
  .skill-card:hover .skill-tag { border-color: rgba(232,184,75,0.2); }

  /* ── EXPERIENCE ── */
  .exp-timeline { position: relative; }
  .exp-timeline::before {
    content: ''; position: absolute;
    left: 18px; top: 8px; bottom: 0; width: 1px;
    background: linear-gradient(180deg, var(--gold) 0%, var(--teal) 60%, transparent 100%);
  }
  .exp-item { padding-left: 62px; padding-bottom: 64px; position: relative; }
  .exp-item:last-child { padding-bottom: 0; }
  .exp-dot {
    position: absolute; left: 10px; top: 6px;
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--bg); border: 2px solid var(--gold);
    box-shadow: 0 0 14px rgba(232,184,75,0.45);
  }
  .exp-meta {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 6px; flex-wrap: wrap;
  }
  .exp-period {
    font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--teal); font-weight: 700;
    background: rgba(45,212,191,0.08);
    padding: 3px 11px; border-radius: 4px;
  }
  .exp-company { font-size: 0.8rem; color: var(--muted); }
  .exp-role {
    font-family: var(--font-head); font-size: 1.3rem; font-weight: 700;
    color: var(--text); margin-bottom: 26px; line-height: 1.2;
  }

  .project-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 10px; padding: 26px; margin-bottom: 16px;
    transition: border-color 0.25s, transform 0.25s;
  }
  .project-card:hover {
    border-color: rgba(45,212,191,0.3);
    transform: translateX(4px);
  }
  .project-name {
    font-family: var(--font-head); font-size: 0.95rem; font-weight: 700;
    color: var(--teal); margin-bottom: 14px;
  }
  .project-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
  .stack-tag {
    background: rgba(45,212,191,0.07);
    border: 1px solid rgba(45,212,191,0.2);
    border-radius: 4px; padding: 2px 10px;
    font-size: 0.68rem; color: var(--teal); letter-spacing: 0.06em;
    font-weight: 500;
  }
  .project-bullets { list-style: none; }
  .project-bullets li {
    padding: 5px 0 5px 22px; position: relative;
    font-size: 0.875rem; color: var(--muted); line-height: 1.65;
  }
  .project-bullets li::before {
    content: '▸'; position: absolute; left: 0;
    color: var(--gold); font-size: 0.72rem; top: 7px;
  }
  .project-bullets li strong { color: var(--text); font-weight: 500; }

  /* ── EDUCATION ── */
  .edu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 22px; margin-bottom: 50px;
  }
  .edu-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 32px;
    position: relative; overflow: hidden;
    transition: border-color 0.3s, transform 0.25s;
  }
  .edu-card::after {
    content: ''; position: absolute; bottom: -20px; right: -20px;
    width: 90px; height: 90px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,184,75,0.07) 0%, transparent 70%);
  }
  .edu-card:hover { border-color: rgba(232,184,75,0.3); transform: translateY(-4px); }
  .edu-year {
    font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold); font-weight: 700; margin-bottom: 12px;
  }
  .edu-degree {
    font-family: var(--font-head); font-size: 1.1rem; font-weight: 700;
    color: var(--text); margin-bottom: 8px; line-height: 1.3;
  }
  .edu-school { font-size: 0.84rem; color: var(--muted); }

  .certs-title {
    font-family: var(--font-head); font-size: 1rem; font-weight: 700;
    color: var(--text); margin-bottom: 18px; letter-spacing: 0.02em;
  }
  .cert-list { display: flex; flex-direction: column; gap: 12px; }
  .cert-item {
    display: flex; align-items: center; gap: 16px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; padding: 18px 22px;
    transition: border-color 0.22s, transform 0.22s;
  }
  .cert-item:hover { border-color: rgba(232,184,75,0.3); transform: translateX(4px); }
  .cert-icon {
    width: 38px; height: 38px; border-radius: 8px;
    background: rgba(232,184,75,0.1);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.15rem; flex-shrink: 0;
  }
  .cert-name { font-size: 0.9rem; color: var(--text); font-weight: 500; }
  .cert-org  { font-size: 0.74rem; color: var(--muted); margin-top: 2px; }

  /* ── CONTACT ── */
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 64px; align-items: start;
  }
  .contact-text {
    font-size: 1rem; color: var(--muted); line-height: 1.8; margin-bottom: 36px;
  }
  .contact-links { display: flex; flex-direction: column; gap: 10px; }
  .contact-link {
    display: flex; align-items: center; gap: 14px;
    padding: 16px 20px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; text-decoration: none; color: var(--text);
    transition: all 0.22s;
  }
  .contact-link:hover {
    border-color: var(--gold); color: var(--gold);
    transform: translateX(5px);
  }
  .contact-link-icon { font-size: 1.15rem; flex-shrink: 0; }
  .contact-link-label { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 2px; }
  .contact-link-text  { font-size: 0.86rem; }

  .contact-form  { display: flex; flex-direction: column; gap: 16px; }
  .form-group    { display: flex; flex-direction: column; gap: 7px; }
  .form-label    { font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
  .form-input, .form-textarea {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; padding: 13px 16px;
    color: var(--text); font-family: var(--font-body); font-size: 0.9rem;
    outline: none; transition: border-color 0.22s; resize: none;
    width: 100%;
  }
  .form-input:focus, .form-textarea:focus { border-color: var(--gold); }
  .form-textarea { height: 130px; }
  .form-success {
    padding: 14px 18px; background: rgba(45,212,191,0.08);
    border: 1px solid rgba(45,212,191,0.3); border-radius: 8px;
    color: var(--teal); font-size: 0.88rem; display: none;
  }
  .form-success.show { display: block; }

  /* ── FOOTER ── */
  .footer {
    text-align: center; padding: 36px 6%;
    border-top: 1px solid var(--border);
    font-size: 0.78rem; color: var(--muted);
  }
  .footer span { color: var(--gold); }

  /* ── FADE-IN (scroll-triggered) ── */
  .fade-in {
    opacity: 0; transform: translateY(26px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  /* ── MOBILE ── */
  @media (max-width: 900px) {
    .nav-links { display: none; }
    .nav-links.open {
      display: flex; flex-direction: column; gap: 0;
      position: absolute; top: 100%; left: 0; right: 0;
      background: var(--bg2); border-bottom: 1px solid var(--border);
      padding: 16px 6%;
    }
    .nav-links.open a { padding: 10px 0; }
    .nav-mobile-btn { display: flex; }
    .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .hero-stats { gap: 22px; }
    .exp-timeline::before { left: 12px; }
    .exp-item { padding-left: 40px; }
    .exp-dot { left: 4px; }
  }
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const skillsData = [
  { cat: "Frontend", tags: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Bootstrap", "React Hooks", "Functional Components", "Responsive Design"] },
  { cat: "State Management", tags: ["Redux", "Redux Toolkit", "Context API"] },
  { cat: "Security & Auth", tags: ["JWT Authentication", "Error Boundary Handling"] },
  { cat: "APIs & Backend", tags: ["RESTful APIs", "Axios", "ASP.NET C#", "SQL Server", "SSRS"] },
  { cat: "Testing", tags: ["Jest", "JMeter", "Unit Testing", "Integration Testing", "Performance Testing"] },
  { cat: "Tools & Practices", tags: ["Git", "Agile / Scrum", "SDLC", "Plane.io", "VS Code", "Justinmind", "Postman"] },
];

const experienceData = [
  {
    period: "05 / 2022 – Present",
    company: "Persyst Systems Private Limited · Chennai, Tamil Nadu",
    role: "Software Engineer – Frontend Developer",
    projects: [
      {
        name: "TRAXX Payments – Payment Gateway Admin Portal",
        stack: ["React.js", "Redux", "Axios", "RESTful APIs"],
        bullets: [
          "Architected modular React component library covering Transaction, Merchant, and Bank Management modules — improving scalability and code reusability.",
          "Implemented Redux-based state normalization to manage complex cross-module data relationships, <strong>eliminating redundant API calls</strong>.",
          "Reduced component re-renders by <strong>35%</strong> by applying React.memo, useMemo, and useCallback across high-frequency data-display components.",
          "Implemented error boundary handling to gracefully manage runtime failures, improving application reliability in production.",
          "Integrated RESTful APIs via Axios for real-time transaction data sync with full async loading / error / success state handling.",
          "Collaborated with backend developers to design API contracts ensuring accurate, seamless data flow across all modules.",
        ],
      },
      {
        name: "Booking & Operations Management Platform",
        stack: ["React.js", "React Hooks", "Axios", "RESTful APIs", "Agile"],
        bullets: [
          "Designed and developed an internal operations and booking management platform using React.js, resulting in a <strong>25% increase</strong> in operational efficiency.",
          "Architected reusable functional components with React Hooks (useState, useEffect, useContext), reducing feature development time by <strong>30%</strong>.",
          "Optimized page load performance by <strong>20%</strong> through lazy loading, code splitting, and eliminating unnecessary re-renders.",
          "Integrated RESTful APIs with Axios and implemented centralized error handling for failed API requests.",
          "Managed sprint delivery and issue tracking using Plane.io in an Agile / Scrum environment.",
        ],
      },
      {
        name: "E-commerce UI/UX Redesign – Thermae Bath Spa Website",
        stack: ["Justinmind", "UI/UX", "End-to-End Testing"],
        bullets: [
          "Led end-to-end UI/UX redesign — created detailed user workflows, resolved critical functional issues, and improved conversion-focused page layouts.",
          "Delivered high-fidelity prototypes using Justinmind and executed end-to-end testing to validate responsive design and cross-browser compatibility.",
        ],
      },
      {
        name: "Inventory Application & Automated Reporting",
        stack: ["ASP.NET C#", "SQL Server", "SSRS"],
        bullets: [
          "Enhanced inventory management application using ASP.NET C# and SQL Server with full SDLC execution.",
          "Automated monthly sales reporting with SSRS via dynamic report parameters for flexible, role-specific data filtering, <strong>significantly reducing manual reporting effort</strong>.",
        ],
      },
    ],
  },
];

const educationData = [
  { year: "2023 – 2025", degree: "Master of Science – Computer Science", school: "Anna University, Chennai, India" },
  { year: "2018 – 2021", degree: "Bachelor of Science – Computer Science", school: "Apollo Arts & Science College, Chennai, India" },
];

const certsData = [
  { icon: "🅰️", name: "Angular – Frontend Framework", org: "FITA Academy, T Nagar" },
  { icon: "⚡", name: "JMeter – Performance Testing", org: "FITA Academy, T Nagar" },
  { icon: "🐘", name: "PHP & MySQL – Back-End Development", org: "FITA Academy, T Nagar" },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`fade-in ${className}`}>{children}</div>;
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleFormChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setFormSent(false), 4000);
  };

  const navLinks = ["About", "Skills", "Experience", "Education", "Contact"];

  return (
    <>
      <style>{style}</style>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#about" className="nav-logo">SA<span>.</span></a>

        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {navLinks.map(n => (
            <li key={n}>
              <a href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{n}</a>
            </li>
          ))}
        </ul>

        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span style={menuOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: "rotate(-45deg) translate(5px,-5px)" } : {}} />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="about">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="orb" style={{ width: 320, height: 320, top: "8%", right: "10%", animationDelay: "0s" }} />
        <div className="orb" style={{ width: 160, height: 160, bottom: "18%", right: "28%", animationDelay: "4s" }} />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Open to Opportunities
          </div>

          <h1 className="hero-name">
            <span className="hero-name-first">Swetha</span>
            <span className="hero-name-last">Arumugam</span>
          </h1>

          <p className="hero-role">
            Frontend Developer &nbsp;·&nbsp; <strong>React.js</strong> &nbsp;·&nbsp; Software Engineer
          </p>

          <p className="hero-summary">
            3+ years building production-grade React applications in fintech &amp; payments.
            Passionate about clean architecture, scalable state management, and performant user interfaces.
          </p>

          <div className="hero-cta">
            <a href="#contact" className="btn-primary">Get In Touch ↗</a>
            <a
              href="https://www.linkedin.com/in/swetha-arumugam-504369238/"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              LinkedIn ↗
            </a>
          </div>

          <div className="hero-stats">
            {[
              { num: "3+", label: "Years Experience" },
              { num: "4", label: "Major Projects" },
              { num: "35%", label: "Re-render Reduction" },
              { num: "25%", label: "Efficiency Gained" },
            ].map(s => (
              <div key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="section section-alt" id="skills">
        <FadeIn>
          <div className="section-header">
            <div className="section-tag">What I Work With</div>
            <h2 className="section-title">Technical <span>Skills</span></h2>
            <div className="section-line" />
          </div>
        </FadeIn>
        <div className="skills-grid">
          {skillsData.map((s, i) => (
            <FadeIn key={s.cat} delay={i * 75}>
              <div className="skill-card">
                <div className="skill-cat">{s.cat}</div>
                <div className="skill-tags">
                  {s.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="section" id="experience">
        <FadeIn>
          <div className="section-header">
            <div className="section-tag">Career</div>
            <h2 className="section-title">Work <span>Experience</span></h2>
            <div className="section-line" />
          </div>
        </FadeIn>
        <div className="exp-timeline">
          {experienceData.map(exp => (
            <div className="exp-item" key={exp.role}>
              <div className="exp-dot" />
              <div className="exp-meta">
                <span className="exp-period">{exp.period}</span>
                <span className="exp-company">{exp.company}</span>
              </div>
              <div className="exp-role">{exp.role}</div>
              {exp.projects.map(proj => (
                <FadeIn key={proj.name}>
                  <div className="project-card">
                    <div className="project-name">{proj.name}</div>
                    <div className="project-stack">
                      {proj.stack.map(s => <span key={s} className="stack-tag">{s}</span>)}
                    </div>
                    <ul className="project-bullets">
                      {proj.bullets.map((b, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="section section-alt" id="education">
        <FadeIn>
          <div className="section-header">
            <div className="section-tag">Academic Background</div>
            <h2 className="section-title">Education &amp; <span>Certifications</span></h2>
            <div className="section-line" />
          </div>
        </FadeIn>

        <div className="edu-grid">
          {educationData.map((e, i) => (
            <FadeIn key={e.degree} delay={i * 120}>
              <div className="edu-card">
                <div className="edu-year">{e.year}</div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-school">{e.school}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="certs-title">Certifications</div>
          <div className="cert-list">
            {certsData.map(c => (
              <div className="cert-item" key={c.name}>
                <div className="cert-icon">{c.icon}</div>
                <div>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-org">{c.org}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── CONTACT ── */}
      <section className="section" id="contact">
        <FadeIn>
          <div className="section-header">
            <div className="section-tag">Let's Connect</div>
            <h2 className="section-title">Get In <span>Touch</span></h2>
            <div className="section-line" />
          </div>
        </FadeIn>

        <div className="contact-grid">
          <FadeIn>
            <p className="contact-text">
              I'm always open to discussing new opportunities, interesting projects,
              or just having a great conversation about frontend engineering and React.
            </p>
            <div className="contact-links">
              {[
                { icon: "✉", label: "Email", text: "swethaarumugam079@gmail.com", href: "mailto:swethaarumugam079@gmail.com" },
                { icon: "📞", label: "Phone", text: "+91 7305472632", href: "tel:+917305472632" },
                { icon: "💼", label: "LinkedIn", text: "swetha-arumugam-504369238", href: "https://www.linkedin.com/in/swetha-arumugam-504369238/" },
                { icon: "📍", label: "Location", text: "Chennai, Tamil Nadu, India", href: null },
              ].map(l => (
                l.href
                  ? <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="contact-link">
                    <span className="contact-link-icon">{l.icon}</span>
                    <div>
                      <div className="contact-link-label">{l.label}</div>
                      <div className="contact-link-text">{l.text}</div>
                    </div>
                  </a>
                  : <div key={l.label} className="contact-link">
                    <span className="contact-link-icon">{l.icon}</span>
                    <div>
                      <div className="contact-link-label">{l.label}</div>
                      <div className="contact-link-text">{l.text}</div>
                    </div>
                  </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input
                  id="name" name="name" className="form-input"
                  type="text" placeholder="Your name"
                  value={form.name} onChange={handleFormChange} required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  id="email" name="email" className="form-input"
                  type="email" placeholder="your@email.com"
                  value={form.email} onChange={handleFormChange} required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message" name="message" className="form-textarea"
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message} onChange={handleFormChange} required
                />
              </div>
              <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                Send Message →
              </button>
              <div className={`form-success${formSent ? " show" : ""}`}>
                ✓ Message received! I'll get back to you soon.
              </div>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <p>
          Designed &amp; built by <span>Swetha Arumugam</span> &nbsp;·&nbsp;
          Frontend Developer &nbsp;·&nbsp; Chennai &nbsp;©&nbsp; {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
