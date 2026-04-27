import { useState } from 'react'
import mePhoto from './assets/Me.png'
import codeBg from './assets/code.jpg'
import cvPdf from './assets/CV_Govart_Peijnenborg.pdf'

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
  { name: 'JavaScript', level: 5 },
  { name: 'CSS', level: 4 },
  { name: 'C#', level: 4 },
  { name: 'SQL', level: 4 },
  { name: 'Python', level: 3 },
  { name: 'PHP', level: 3 },
  { name: 'Java', level: 1 },
]

const frontendFrameworks = [
  { name: 'Tailwind CSS', level: 4 },
  { name: 'Laravel', level: 4 },
  { name: 'React', level: 3 },
  { name: 'Vue.js', level: 3 },
]

const backendFrameworks = [
  { name: '.NET', level: 4 },
  { name: 'Django', level: 2 },
  { name: 'MariaDB', level: 2 },
]

const softSkills = [
  { name: 'Problem-solving', icon: '🧩', description: 'I enjoy breaking down complex challenges into smaller, manageable steps to find effective solutions.' },
  { name: 'Teamwork', icon: '🤝', description: 'I thrive in collaborative environments and believe the best results come from working together.' },
  { name: 'Communication', icon: '💬', description: 'I express ideas clearly and listen actively, making sure everyone stays on the same page.' },
  { name: 'Time Management', icon: '⏱️', description: 'I prioritise tasks effectively and consistently meet deadlines, even under pressure.' },
  { name: 'Adaptability', icon: '🔄', description: 'I quickly adjust to new situations, tools, and technologies with an open mindset.' },
  { name: 'Critical Thinking', icon: '🧠', description: 'I analyse problems from multiple angles before making well-informed decisions.' },
]

const languages = [
  { name: 'Dutch', proficiency: 'Native' },
  { name: 'English', proficiency: 'Good' },
  { name: 'French', proficiency: 'Basic' },
]

const projects = [
  {
    id: 'di4d',
    title: 'DI4D Platform',
    description:
      'A web platform developed as part of my studies, built collaboratively in an agile team. Focused on delivering a full-stack solution with a clean UI and robust backend.',
    stack: ['React', 'C#', '.NET', 'SQL', 'Azure DevOps'],
    github: null,
    live: null,
    details: {
      overview:
        'The DI4D Platform is a full-stack web application developed as a team project during my studies at Thomas More. The project followed an agile workflow with sprints, code reviews, and continuous integration, mirroring real-world software engineering practices.',
      role:
        'Full-Stack Developer — responsible for designing and implementing both frontend components and backend API endpoints, as well as contributing to database design and sprint planning.',
      highlights: [
        'Built RESTful API endpoints with ASP.NET Core (C#)',
        'Developed interactive React components and page flows',
        'Managed relational data with SQL and Entity Framework',
        'Collaborated in an agile team tracked via Azure DevOps',
        'Participated in code reviews and pair programming sessions',
      ],
    },
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description:
      'This personal portfolio site — a single-page React app built with Vite and styled with Tailwind CSS, showcasing my skills, projects, and experience.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js'],
    github: 'https://github.com/GovartPeijnenborg/Portfolio',
    live: null,
    details: {
      overview:
        'A fully responsive personal portfolio website built from scratch. Designed and developed solo, it features smooth page transitions, skill progress bars, a downloadable CV, and detailed project pages. Built with Vite for fast development and optimised production builds.',
      role:
        'Solo Developer & Designer — designed the full layout, implemented all React components, and configured the Vite build pipeline.',
      highlights: [
        'Component-based architecture with functional React and hooks',
        'Entirely styled with Tailwind CSS utility classes and a custom theme',
        'CV auto-generation script written in Node.js (generate-cv.mjs)',
        'Responsive design that works seamlessly on mobile and desktop',
        'Hosted publicly via GitHub',
      ],
    },
  },
  {
    id: 'placeholder',
    title: 'Next Project — Coming Soon',
    description:
      'Something new is in the works. Check back later to see what I\'m building next.',
    stack: [],
    github: null,
    live: null,
    details: null,
  },
]

/* ──────────────────────  SMALL COMPONENTS  ──────────────────── */

function Navbar({ currentPage, setCurrentPage }) {
  const links = ['Home', 'About Me', 'Projects']
  const isActive = (link) => {
    if (link === 'Projects') return currentPage === 'Projects' || currentPage === 'ProjectDetail'
    return currentPage === link
  }
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
                  isActive(link) ? 'text-primary font-semibold' : 'text-dark'
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
  const colors = {
    1: 'from-gray-400 to-gray-500',
    2: 'from-blue-400 to-blue-500',
    3: 'from-primary to-secondary',
    4: 'from-secondary to-emerald-500',
    5: 'from-amber-400 to-amber-500',
  }
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-dark">{name}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          level >= 4 ? 'bg-secondary/15 text-secondary' : level >= 3 ? 'bg-primary/15 text-primary' : 'bg-lavender text-muted'
        }`}>{info.label}</span>
      </div>
      <div className="w-full h-2 bg-lavender/60 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colors[level] || colors[1]} transition-all duration-700`}
          style={{ width: `${info.value}%` }}
        />
      </div>
    </div>
  )
}

function SkillCategory({ title, skills, accent }) {
  return (
    <div className={`rounded-2xl p-6 shadow-lg border border-white/10 backdrop-blur ${accent === 'mint' ? 'bg-cardMint' : 'bg-card'}`}>
      <h4 className="text-lg font-bold mb-5 text-dark flex items-center gap-2">
        <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-primary to-secondary inline-block" />
        {title}
      </h4>
      <div className="space-y-4">
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
        <img
          src={mePhoto}
          alt="Govart's photo"
          className="w-36 h-36 rounded-full object-cover ring-4 ring-primary/40 mx-auto"
        />
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight text-dark">
          Welcome to my <span className="text-primary">Portfolio</span>
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Hi there! I'm Govart, a student of{' '}
          <span className="text-secondary font-semibold">
            Applied Computer Science
          </span>
          . I have a genuine love for learning new things and I'm passionate
          about every aspect of software development from designing intuitive
          frontends to building solid backends and everything in between.
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
    <>
      {/* ═══════════ PERSONAL INFO SECTION (white bg) ═══════════ */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
          {/* ── Profile + CV button ── */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <img
              src={mePhoto}
              alt="Govart's photo"
              className="w-48 h-48 rounded-full object-cover ring-4 ring-primary/40"
            />
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold text-dark">GOVART PEIJNENBORG</h2>
              <p className="text-muted leading-relaxed max-w-lg">
                I'm a curious and driven 23 year old student who loves learning new things,
                especially when it comes to backend development, but I won't shy away from design challenges. When I'm not
                coding, you'll probably find me exploring new places around the
                world or on the handball court.
              </p>
              <button
                onClick={() => setCurrentPage('CV')}
                className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold
                           hover:bg-secondary transition-colors duration-200 shadow-lg shadow-primary/25"
              >
                View my CV →
              </button>
            </div>
          </div>

          {/* ── Why Applied CS ── */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-dark">
              Why Applied Computer Science?
            </h3>
            <p className="text-muted leading-relaxed max-w-3xl">
              I've been interested in technology from a young age, and that
              fascination only grew once I started using computers. That passion
              for understanding how things work has driven me to learn how to
              build my own applications and Applied Computer Science is the
              perfect place to turn that curiosity into real skills.
            </p>
          </div>

          {/* ── Dreams & Ambitions ── */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-dark">
              Future Dreams & Professional Ambitions
            </h3>
            <p className="text-muted leading-relaxed max-w-3xl">
              <span className="font-semibold text-dark">Short-term:</span> I want
              to finish my degree, pursue a master's, and build towards a
              successful career in tech.
            </p>
            <p className="text-muted leading-relaxed max-w-3xl mt-3">
              <span className="font-semibold text-dark">Career:</span> I'd love to
              work at a company that aligns with my values and grow into a
              respected full-stack developer. More than just holding a title, I want
              to genuinely grow within that company, take on more responsibility,
              contribute to meaningful products, and build deep expertise over time.
              Ultimately, I dream of channelling everything I've learned into
              launching my own startup one day.
            </p>
            <p className="text-muted leading-relaxed max-w-3xl mt-3">
              <span className="font-semibold text-dark">Personal:</span> I want to
              keep exploring the world, not just as a tourist, but by truly
              immersing myself in different cultures. Learning about local
              traditions, food, languages, and the way people live gives me a
              broader perspective that I carry back into everything I do. I also
              want to keep improving at handball and keep rising through the
              divisions with my team.
            </p>
          </div>


        </div>
      </section>

      {/* ═══════════ SKILLS SECTION (dark bg + code image) ═══════════ */}
      <section className="relative bg-dark overflow-hidden">
        <img
          src={codeBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />
        <div className="relative max-w-5xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-extrabold text-white mb-4 text-center">Technical Skills</h3>


          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SkillCategory title="Coding Languages" skills={codingLanguages} accent="mint" />
            <SkillCategory title="Frontend Frameworks" skills={frontendFrameworks} accent="lavender" />
            <SkillCategory title="Backend Frameworks" skills={backendFrameworks} accent="mint" />
          </div>
        </div>
      </section>

      {/* ═══════════ SOFT SKILLS & LANGUAGES + HOBBIES (white bg) ═══════════ */}
      <section className="bg-gradient-to-b from-white to-lavender/10">
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
          {/* ── Soft Skills ── */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-dark text-center">Soft Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {softSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-white rounded-2xl p-6 space-y-3 border border-lavender/40 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{skill.icon}</span>
                    <span className="text-lg font-bold text-dark">{skill.name}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Hobbies ── */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-dark text-center">Hobbies & Interests</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { icon: '🤾', label: 'Handball', href: 'https://hv-arena.be' },
                { icon: '✈️', label: 'Travelling', href: null },
                { icon: '💻', label: 'Developing', href: null },
              ].map((h) => {
                const inner = (
                  <>
                    <span className="text-4xl">{h.icon}</span>
                    <p className="font-medium text-dark mt-2">{h.label}</p>
                  </>
                )
                return h.href ? (
                  <a
                    key={h.label}
                    href={h.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl p-6 text-center border border-lavender/40 shadow-md hover:shadow-lg hover:-translate-y-1 hover:ring-2 hover:ring-primary/40 transition-all duration-200 flex flex-col justify-center"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={h.label}
                    className="bg-white rounded-2xl p-6 text-center border border-lavender/40 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-center"
                  >
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
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
          href={cvPdf}
          download="CV_Govart_Peijnenborg.pdf"
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
            04 78 52 85 21 · Govart.peijnenborg@gmail.com
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
              <span className="text-dark font-medium">Applied Computer Science</span>
              <span className="text-muted"> — Thomas More (2024 – 2027)</span>
            </li>
            <li>
              <span className="text-dark font-medium">Associate Degree in Programming</span>
              <span className="text-muted"> — PXL (2021 – 2024)</span>
            </li>
            <li>
              <span className="text-dark font-medium">Sports Sciences</span>
              <span className="text-muted"> — Sportschool Hasselt (2015 – 2021)</span>
            </li>
          </ul>
        </div>

        {/* Experience — most recent student job only */}
        <div>
          <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-sm">💼</span>
            Currently working at
          </h4>
          <ul className="space-y-4 ml-10">
            <li>
              <span className="text-dark font-medium">Park Attendant</span>
              <span className="text-muted"> — Sparx (2024 – Present)</span>
              <br />
              <span className="text-sm text-muted">
                Guiding visitors through the park's attractions and troubleshooting any issues to ensure a fun and safe experience for everyone.
              </span>
            </li>
          </ul>
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

      {/* ── Dev Tools ── */}
      <div>
        <h3 className="text-2xl font-bold text-dark mb-8 text-center">Dev Tools</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: 'Git', icon: '🔀' },
            { name: 'GitHub', icon: '🐙' },
            { name: 'VS Code', icon: '💻' },
            { name: 'Visual Studio', icon: '🟣' },
            { name: 'Jira', icon: '📋' },
            { name: 'Figma', icon: '🎨' },
            { name: 'Docker', icon: '🐳' },
            { name: 'Postman', icon: '📬' },
            { name: 'npm', icon: '📦' },
            { name: 'Azure DevOps', icon: '☁️' },
          ].map((tool) => (
            <span
              key={tool.name}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-lavender/40 shadow-md text-sm font-medium text-dark hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>{tool.icon}</span>
              {tool.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Soft Skills (2 columns) ── */}
      <div>
        <h3 className="text-2xl font-bold text-dark mb-8 text-center">Soft Skills</h3>
        <div className="grid gap-5 md:grid-cols-2">
          {softSkills.map((s) => (
            <div key={s.name} className="bg-white rounded-2xl p-5 border border-lavender/40 shadow-md">
              <span className="font-medium text-dark">{s.icon} {s.name}</span>
              <p className="text-sm text-muted mt-1">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
       {/* Languages */}
        <div>
            <h3 className="text-2xl font-bold mb-8 text-dark text-center">Languages</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="bg-white rounded-2xl p-6 text-center border border-lavender/40 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex-1 flex flex-col justify-center"
                  >
                    <p className="text-lg font-bold text-dark">{lang.name}</p>
                    <p className="text-sm text-primary font-medium mt-1">{lang.proficiency}</p>
                  </div>
                ))}
            </div>
        </div>
    </div>
    </section>
  )
}

/* ───────── Projects ───────── */

function ProjectsPage({ setCurrentPage, setSelectedProject }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-10 text-center text-dark">My Projects</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-lavender/40
                       hover:ring-2 hover:ring-primary/50 transition shadow-lg"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-dark">{project.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} text={tech} />
                ))}
              </div>
            </div>
            {project.details ? (
              <button
                onClick={() => { setSelectedProject(project); setCurrentPage('ProjectDetail') }}
                className="mt-6 w-full text-center px-5 py-2.5 rounded-lg bg-primary text-white font-semibold
                           hover:bg-secondary transition-colors duration-200"
              >
                View Details →
              </button>
            ) : (
              <span className="mt-6 w-full inline-block text-center px-5 py-2.5 rounded-lg bg-lavender/40 text-muted font-semibold cursor-not-allowed">
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ───────── Project Detail ───────── */

function ProjectDetailPage({ project, setCurrentPage }) {
  if (!project) return null
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <button
        onClick={() => setCurrentPage('Projects')}
        className="mb-8 flex items-center gap-2 text-primary font-medium hover:underline"
      >
        ← Back to Projects
      </button>
      <div className="bg-white rounded-2xl shadow-xl border border-lavender/40 p-8 md:p-12 space-y-10">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-dark">{project.title}</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.stack.map((tech) => (
              <Badge key={tech} text={tech} />
            ))}
          </div>
        </div>

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-primary to-secondary inline-block" />
            Overview
          </h3>
          <p className="text-muted leading-relaxed">{project.details.overview}</p>
        </div>

        {/* Role */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-primary to-secondary inline-block" />
            My Role
          </h3>
          <p className="text-muted leading-relaxed">{project.details.role}</p>
        </div>

        {/* Highlights */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-primary to-secondary inline-block" />
            Key Highlights
          </h3>
          <ul className="space-y-3">
            {project.details.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center flex-shrink-0">✓</span>
                <span className="text-muted text-sm leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        {(project.github || project.live) && (
          <div className="flex flex-wrap gap-4 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-lg border-2 border-primary text-primary font-semibold
                           hover:bg-primary hover:text-white transition-colors duration-200"
              >
                View on GitHub →
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold
                           hover:bg-secondary transition-colors duration-200"
              >
                Live Demo →
              </a>
            )}
          </div>
        )}
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
          <a href="https://github.com/GovartPeijnenborg" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/govart-peijnenborg-0b4a97221/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
            LinkedIn
          </a>
          <a href="mailto:Govart.peijnenborg@gmail.com" className="hover:text-primary transition">
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
  const [selectedProject, setSelectedProject] = useState(null)

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
          <ProjectsPage setCurrentPage={setCurrentPage} setSelectedProject={setSelectedProject} />
        </PageWrapper>
        <PageWrapper visible={currentPage === 'ProjectDetail'}>
          <ProjectDetailPage project={selectedProject} setCurrentPage={setCurrentPage} />
        </PageWrapper>
      </main>

      <Footer />
    </div>
  )
}
