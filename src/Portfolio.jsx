import { useState } from 'react'
import mePhoto from './assets/Me.png'

/* ───────────────────────────  DATA  ─────────────────────────── */

const skillLevels = [
  { label: 'Learning', value: 20 },
  { label: 'Familiar', value: 40 },
  { label: 'Comfortable', value: 60 },
  { label: 'Proficient', value: 80 },
  { label: 'Expert', value: 100 },
]

const codingLanguages = [
  { name: 'HTML', level: 5 },
  { name: 'CSS', level: 4 },
  { name: 'JavaScript', level: 4 },
  { name: 'Python', level: 3 },
  { name: 'Java', level: 2 },
  { name: 'C#', level: 3 },
  { name: 'SQL', level: 3 },
  { name: 'PHP', level: 2 },
]

const frontendFrameworks = [
  { name: 'React', level: 4 },
  { name: 'Vue.js', level: 3 },
  { name: 'Tailwind CSS', level: 3 },
]

const backendFrameworks = [
  { name: '.NET', level: 3 },
  { name: 'Django', level: 2 },
  { name: 'MariaDB', level: 2 },
]

const toolSkills = ['Git / GitHub', 'VS Code', 'Docker']

const softSkills = [
  { name: 'Problem-solving', icon: '🧩' },
  { name: 'Teamwork', icon: '🤝' },
  { name: 'Communication', icon: '💬' },
  { name: 'Time Management', icon: '⏱️' },
  { name: 'Adaptability', icon: '🔄' },
  { name: 'Critical Thinking', icon: '🧠' },
]

const languages = [
  { name: 'Nederlands', proficiency: 'Moedertaal' },
  { name: 'Engels', proficiency: 'Goed' },
  { name: 'Frans', proficiency: 'Beperkt' },
]

const projects = [
  {
    title: '[YOUR PROJECT TITLE 1]',
    description:
      '[SHORT DESCRIPTION] — e.g. A full-stack web application that allows users to track their daily habits and visualise their progress over time.',
    stack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: '[YOUR PROJECT TITLE 2]',
    description:
      '[SHORT DESCRIPTION] — e.g. A mobile-friendly weather dashboard that fetches live data from an external API and displays forecasts.',
    stack: ['Vue.js', 'Tailwind CSS', 'REST API'],
  },
  {
    title: '[YOUR PROJECT TITLE 3]',
    description:
      '[SHORT DESCRIPTION] — e.g. A command-line tool written in Python that automates file organisation on your desktop.',
    stack: ['Python', 'Click', 'OS module'],
  },
]

/* ──────────────────────  SMALL COMPONENTS  ──────────────────── */

function Navbar({ currentPage, setCurrentPage }) {
  const links = ['Home', 'About Me', 'Projects']
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm border-b border-lavender/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="text-xl font-bold text-primary tracking-tight">
          {'<'} Govart Peijnenborg {'/>'}
        </span>
        <ul className="flex gap-6 text-sm font-medium">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => setCurrentPage(link)}
                className={`transition-colors duration-200 hover:text-primary ${
                  currentPage === link ? 'text-primary font-semibold' : 'text-dark'
                }`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function PageWrapper({ visible, children }) {
  return (
    <div
      className={`transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 hidden'
      }`}
    >
      {children}
    </div>
  )
}

function Badge({ text }) {
  return (
    <span className="px-3 py-1 text-xs rounded-full bg-primary/15 text-primary font-medium">
      {text}
    </span>
  )
}

function SkillBar({ name, level }) {
  const info = skillLevels[level - 1] || skillLevels[0]
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-dark">{name}</span>
        <span className="text-muted">{info.label}</span>
      </div>
      <div className="w-full h-2.5 bg-lavender/60 rounded-full overflow-hidden relative">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
          style={{ width: `${info.value}%` }}
        />
        {/* tick marks for the 5 levels */}
        {skillLevels.map((sl, i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px bg-white/50"
            style={{ left: `${sl.value}%` }}
          />
        ))}
      </div>
    </div>
  )
}

function SkillCategory({ title, skills, accent }) {
  return (
    <div className={`rounded-2xl p-6 ${accent === 'mint' ? 'bg-cardMint' : 'bg-card'}`}>
      <h4 className="text-lg font-bold mb-4 text-dark">{title}</h4>
      <div className="space-y-3">
        {skills.map((s) => (
          <SkillBar key={s.name} name={s.name} level={s.level} />
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────────  PAGES  ────────────────────────── */

function HomePage({ setCurrentPage }) {
  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center text-center px-6 bg-gradient-to-br from-white via-lavender/20 to-cardMint/30">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight text-dark">
          Welcome to my <span className="text-primary">Portfolio</span>
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Hi there! I'm a student of{' '}
          <span className="text-secondary font-semibold">
            Applied Computer Science
          </span>
          , passionate about building things with code. I love turning ideas
          into real, working software — from sleek frontends to robust
          backends.
        </p>
        <button
          onClick={() => setCurrentPage('About Me')}
          className="mt-4 inline-block px-8 py-3 rounded-lg bg-primary text-white font-semibold
                     hover:bg-secondary transition-colors duration-200 shadow-lg shadow-primary/25"
        >
          Get to know me →
        </button>
      </div>
    </section>
  )
}

/* ───────── About Me ───────── */

function AboutPage({ setCurrentPage }) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      {/* ── Profile ── */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <img
          src={mePhoto}
          alt="Govart's photo"
          className="w-48 h-48 rounded-full object-cover ring-4 ring-primary/40"
        />
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-bold text-dark">GOVART PEIJNENBORG</h2>
          <p className="text-muted leading-relaxed max-w-lg">
            [YOUR BIO] — e.g. I'm a curious and driven student who enjoys
            solving real-world problems through technology. When I'm not
            coding, you'll probably find me exploring new places or on the
            handball court.
          </p>
        </div>
      </div>

      {/* ── Hobbies ── */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-dark">Hobbies & Interests</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '🤾', label: 'Handball' },
            { icon: '✈️', label: 'Travelling' },
            { icon: '👨‍👩‍👧‍👦', label: 'Time with Family & Friends' },
          ].map((h) => (
            <div
              key={h.label}
              className="bg-card rounded-xl p-6 text-center space-y-2 hover:ring-2 hover:ring-secondary/50 transition"
            >
              <span className="text-4xl">{h.icon}</span>
              <p className="font-medium text-dark">{h.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why Applied CS ── */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-dark">
          Why Applied Computer Science?
        </h3>
        <p className="text-muted leading-relaxed max-w-3xl">
          [YOUR MOTIVATION] — e.g. Ever since I wrote my first lines of HTML
          as a teenager, I've been fascinated by how software can shape the
          world around us. I chose Applied Computer Science because it
          combines the theory I crave with the hands-on building I love — from
          embedded systems to full-stack web development.
        </p>
      </div>

      {/* ── Dreams & Ambitions ── */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-dark">
          Future Dreams & Professional Ambitions
        </h3>
        <p className="text-muted leading-relaxed max-w-3xl">
          [YOUR DREAMS] — e.g. My dream is to work as a full-stack developer
          at a company that values innovation and positive impact. Long-term,
          I'd love to lead a small engineering team, mentor the next
          generation of developers, and maybe one day launch my own tech
          start-up.
        </p>
      </div>

      {/* ── Soft Skills ── */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-dark">Soft Skills</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {softSkills.map((skill) => (
            <div
              key={skill.name}
              className="bg-cardMint rounded-xl p-5 flex items-center gap-3 hover:ring-2 hover:ring-primary/50 transition"
            >
              <span className="text-2xl">{skill.icon}</span>
              <span className="font-medium text-dark">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Spoken Languages ── */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-dark">Languages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="bg-card rounded-xl p-5 text-center hover:ring-2 hover:ring-secondary/50 transition"
            >
              <p className="text-lg font-semibold text-dark">{lang.name}</p>
              <p className="text-sm text-muted mt-1">{lang.proficiency}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Technical Skills ── */}
      <div>
        <h3 className="text-2xl font-bold text-dark mb-8">Technical Skills</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SkillCategory title="Coding Languages" skills={codingLanguages} accent="mint" />
          <SkillCategory title="Frontend Frameworks" skills={frontendFrameworks} accent="lavender" />
          <SkillCategory title="Backend Frameworks" skills={backendFrameworks} accent="mint" />
        </div>
      </div>

      {/* ── Development Tools ── */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-dark">Development Tools</h3>
        <div className="flex flex-wrap gap-3">
          {toolSkills.map((skill) => (
            <span
              key={skill}
              className="px-5 py-2.5 rounded-lg bg-card text-secondary font-semibold text-sm hover:bg-secondary/20 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ── View CV link ── */}
      <div className="text-center">
        <button
          onClick={() => setCurrentPage('CV')}
          className="px-8 py-3 rounded-lg bg-primary text-white font-semibold
                     hover:bg-secondary transition-colors duration-200 shadow-lg shadow-primary/25"
        >
          View my CV →
        </button>
      </div>
    </section>
  )
}

/* ───────── CV Page ───────── */

function CVPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <div className="text-center mb-4">
        <h2 className="text-4xl font-extrabold text-dark">Curriculum Vitae</h2>
        <p className="text-muted mt-2">Education, experience & technical skills</p>
        <a
          href="/CV_YourName.pdf"
          download
          className="mt-4 inline-block px-6 py-2.5 rounded-lg border-2 border-primary text-primary font-semibold
                     hover:bg-primary hover:text-white transition-colors duration-200"
        >
          Download CV (PDF)
        </a>
      </div>

      {/* ── CV Card ── */}
      <div className="bg-white rounded-2xl shadow-xl border border-lavender/40 p-8 md:p-12 space-y-10">
        {/* Header */}
        <div className="border-b border-lavender pb-6">
          <h3 className="text-3xl font-bold text-dark">GOVART PEIJNENBORG</h3>
          <p className="text-muted mt-1">
            [YOUR ADDRESS] · [YOUR PHONE] · [YOUR EMAIL]
          </p>
        </div>

        {/* Education */}
        <div>
          <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-sm">🎓</span>
            Education
          </h4>
          <ul className="space-y-4 ml-10">
            <li>
              <span className="text-dark font-medium">Toegepaste informatica</span>
              <span className="text-muted"> — Thomas More (2024 – 2027)</span>
            </li>
            <li>
              <span className="text-dark font-medium">Graduaat programmeren</span>
              <span className="text-muted"> — PXL (2021 – 2024)</span>
            </li>
            <li>
              <span className="text-dark font-medium">Sportwetenschappen</span>
              <span className="text-muted"> — Sportschool Hasselt (2015 – 2021)</span>
            </li>
          </ul>
        </div>

        {/* Experience — most recent student job only */}
        <div>
          <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-sm">💼</span>
            Experience
          </h4>
          <ul className="space-y-4 ml-10">
            <li>
              <span className="text-dark font-medium">Parkmedewerker</span>
              <span className="text-muted"> — Sparx (2024 – Heden)</span>
              <br />
              <span className="text-sm text-muted">
                Begeleiden van bezoekers door de attracties in het park
              </span>
            </li>
          </ul>
        </div>

        {/* Skills */}
        <div>
          <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-sm">🛠️</span>
            Tools
          </h4>
          <div className="flex flex-wrap gap-2 ml-10">
            {toolSkills.map((s) => (
              <Badge key={s} text={s} />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-sm">💡</span>
            Soft Skills
          </h4>
          <div className="flex flex-wrap gap-2 ml-10">
            {softSkills.map((s) => (
              <Badge key={s.name} text={`${s.icon} ${s.name}`} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Skills with Progress Bars ── */}
      <div>
        <h3 className="text-2xl font-bold text-dark mb-8 text-center">Technical Skills</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SkillCategory title="Coding Languages" skills={codingLanguages} accent="mint" />
          <SkillCategory title="Frontend Frameworks" skills={frontendFrameworks} accent="lavender" />
          <SkillCategory title="Backend Frameworks" skills={backendFrameworks} accent="mint" />
        </div>
      </div>

      {/* ── Development Tools ── */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-dark text-center">Development Tools</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {toolSkills.map((skill) => (
            <span
              key={skill}
              className="px-5 py-2.5 rounded-lg bg-card text-secondary font-semibold text-sm hover:bg-secondary/20 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── Projects ───────── */

function ProjectsPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-10 text-center text-dark">My Projects</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-lavender/40
                       hover:ring-2 hover:ring-primary/50 transition shadow-lg"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-dark">{project.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} text={tech} />
                ))}
              </div>
            </div>
            <a
              href="#"
              className="mt-6 inline-block text-center px-5 py-2.5 rounded-lg bg-primary text-white font-semibold
                         hover:bg-secondary transition-colors duration-200"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ────────────────────  FOOTER  ──────────────────── */

function Footer() {
  return (
    <footer className="border-t border-lavender/50 mt-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted">
        <p>© {new Date().getFullYear()} Govart Peijnenborg. All rights reserved.</p>
        <div className="flex gap-4 mt-3 sm:mt-0">
          <a href="[YOUR GITHUB URL]" className="hover:text-primary transition">
            GitHub
          </a>
          <a href="[YOUR LINKEDIN URL]" className="hover:text-primary transition">
            LinkedIn
          </a>
          <a href="mailto:[YOUR EMAIL]" className="hover:text-primary transition">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────  APP  ──────────────────────── */

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState('Home')

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-lavender/10">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-1">
        <PageWrapper visible={currentPage === 'Home'}>
          <HomePage setCurrentPage={setCurrentPage} />
        </PageWrapper>
        <PageWrapper visible={currentPage === 'About Me'}>
          <AboutPage setCurrentPage={setCurrentPage} />
        </PageWrapper>
        <PageWrapper visible={currentPage === 'CV'}>
          <CVPage />
        </PageWrapper>
        <PageWrapper visible={currentPage === 'Projects'}>
          <ProjectsPage />
        </PageWrapper>
      </main>

      <Footer />
    </div>
  )
}
