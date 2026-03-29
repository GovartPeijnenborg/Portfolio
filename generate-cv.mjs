import PDFDocument from 'pdfkit'
import fs from 'fs'

const doc = new PDFDocument({ size: 'A4', margins: { top: 50, bottom: 50, left: 50, right: 50 } })
const stream = fs.createWriteStream('src/assets/CV_Govart_Peijnenborg.pdf')
doc.pipe(stream)

const primary = '#6366f1'
const dark = '#1e293b'
const muted = '#64748b'

function drawLine(y) {
  doc.moveTo(50, y).lineTo(545, y).strokeColor('#e2e8f0').lineWidth(1).stroke()
}

function sectionTitle(text) {
  doc.moveDown(0.8)
  doc.fontSize(13).fillColor(primary).font('Helvetica-Bold').text(text.toUpperCase(), 50, doc.y, { continued: false })
  drawLine(doc.y + 4)
  doc.moveDown(0.5)
}

/* ═══════ HEADER (photo top-left + name/contact right) ═══════ */
const photoSize = 82
doc.image('src/assets/Me.png', 50, 50, { width: photoSize, height: photoSize })

const hx = 50 + photoSize + 15  // 147
const hWidth = 545 - hx
doc.fontSize(22).fillColor(dark).font('Helvetica-Bold').text('GOVART PEIJNENBORG', hx, 55, { width: hWidth })
doc.fontSize(9).fillColor(muted).font('Helvetica')
  .text('04 78 52 85 21  |  Govart.peijnenborg@gmail.com', hx, doc.y + 6, { width: hWidth })
doc.text('linkedin.com/in/govart-peijnenborg-0b4a97221', hx, doc.y + 3, { width: hWidth })
doc.text('github.com/GovartPeijnenborg', hx, doc.y + 3, { width: hWidth })

// Move cursor below the photo + a small gap
doc.y = 50 + photoSize + 14
doc.x = 50
drawLine(doc.y)

/* ═══════ PROFILE ═══════ */
sectionTitle('Profile')
doc.fontSize(10).fillColor(dark).font('Helvetica')
  .text("Curious and driven 23-year-old student of Applied Computer Science with a genuine love for learning. Passionate about every aspect of software development — from designing intuitive frontends to building solid backends. Looking to grow into a respected full-stack developer.", { lineGap: 2 })

/* ═══════ EDUCATION ═══════ */
sectionTitle('Education')

const education = [
  { degree: 'Applied Computer Science', school: 'Thomas More', period: '2024 – 2027' },
  { degree: 'Associate Degree in Programming', school: 'PXL', period: '2021 – 2024' },
  { degree: 'Sports Sciences', school: 'Sportschool Hasselt', period: '2015 – 2021' },
]

education.forEach(e => {
  doc.fontSize(10).fillColor(dark).font('Helvetica-Bold').text(e.degree, { continued: true })
  doc.font('Helvetica').fillColor(muted).text(`  —  ${e.school}  (${e.period})`)
  doc.moveDown(0.3)
})

/* ═══════ EXPERIENCE ═══════ */
sectionTitle('Experience')
doc.fontSize(10).fillColor(dark).font('Helvetica-Bold').text('Park Attendant', { continued: true })
doc.font('Helvetica').fillColor(muted).text('  —  Sparx  (2024 – Present)')
doc.moveDown(0.2)
doc.fontSize(9).fillColor(dark).font('Helvetica')
  .text('Guiding visitors through the park\'s attractions and troubleshooting any issues to ensure a fun and safe experience for everyone.', { lineGap: 2 })

/* ═══════ TECHNICAL SKILLS (2 columns) ═══════ */
sectionTitle('Technical Skills')

const skillLabel = (level) => ['Learning', 'Familiar', 'Comfortable', 'Proficient', 'Expert'][level - 1]

const colGap = 14
const colWidth = (545 - 50 - colGap) / 2   // ≈ 240
const col1X = 50
const col2X = col1X + colWidth + colGap

function drawSkillGroupInCol(title, skills, colX, colW) {
  const nameW = 82
  const barX = colX + nameW + 5
  const barW = colW - nameW - 5 - 52
  doc.fontSize(10).fillColor(dark).font('Helvetica-Bold').text(title, colX, doc.y, { width: colW })
  doc.moveDown(0.25)
  skills.forEach(s => {
    const y = doc.y + 2
    doc.fontSize(9).fillColor(dark).font('Helvetica').text(s.name, colX, y, { width: nameW })
    doc.roundedRect(barX, y, barW, 8, 4).fillColor('#e2e8f0').fill()
    const pct = (s.level / 5) * barW
    doc.roundedRect(barX, y, pct, 8, 4).fillColor(primary).fill()
    doc.fontSize(8).fillColor(muted).font('Helvetica').text(skillLabel(s.level), barX + barW + 5, y - 1, { width: 50 })
    doc.y = y + 16
    doc.x = colX
  })
  doc.moveDown(0.4)
  return doc.y
}

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
  { name: 'React', level: 3 },
  { name: 'Vue.js', level: 3 },
]

const backendFrameworks = [
  { name: '.NET', level: 4 },
  { name: 'Django', level: 2 },
  { name: 'MariaDB', level: 2 },
]

// Draw left column: Coding Languages
const skillsStartY = doc.y
const leftEndY = drawSkillGroupInCol('Coding Languages', codingLanguages, col1X, colWidth)

// Reset to same start Y for right column
doc.y = skillsStartY
drawSkillGroupInCol('Frontend Frameworks', frontendFrameworks, col2X, colWidth)
const rightEndY = drawSkillGroupInCol('Backend Frameworks', backendFrameworks, col2X, colWidth)

// Continue below whichever column is taller
doc.y = Math.max(leftEndY, rightEndY)
doc.x = 50

/* ═══════ DEV TOOLS ═══════ */
sectionTitle('Dev Tools')
const tools = ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'Jira', 'Figma', 'Docker', 'Postman', 'npm', 'Azure DevOps']
doc.fontSize(10).fillColor(dark).font('Helvetica').text(tools.join('  •  '), { lineGap: 2 })

/* ═══════ SOFT SKILLS ═══════ */
sectionTitle('Soft Skills')
const softSkills = [
  { name: 'Problem-solving', description: 'Breaking down complex challenges into smaller, manageable steps.' },
  { name: 'Teamwork', description: 'Thriving in collaborative environments for the best results.' },
  { name: 'Communication', description: 'Expressing ideas clearly and listening actively.' },
  { name: 'Time Management', description: 'Prioritising tasks and consistently meeting deadlines.' },
  { name: 'Adaptability', description: 'Quickly adjusting to new situations, tools, and technologies.' },
  { name: 'Critical Thinking', description: 'Analysing problems from multiple angles before deciding.' },
]

softSkills.forEach(s => {
  doc.fontSize(10).fillColor(dark).font('Helvetica-Bold').text(s.name, { continued: true })
  doc.font('Helvetica').fillColor(muted).text(`  —  ${s.description}`)
  doc.moveDown(0.15)
})

/* ═══════ LANGUAGES ═══════ */
sectionTitle('Languages')
const languages = [
  { name: 'Dutch', proficiency: 'Native' },
  { name: 'English', proficiency: 'Good' },
  { name: 'French', proficiency: 'Basic' },
]
languages.forEach(l => {
  doc.fontSize(10).fillColor(dark).font('Helvetica-Bold').text(l.name, { continued: true })
  doc.font('Helvetica').fillColor(muted).text(`  —  ${l.proficiency}`)
  doc.moveDown(0.15)
})

/* ═══════ DONE ═══════ */
doc.end()
stream.on('finish', () => console.log('PDF created: src/assets/CV_Govart_Peijnenborg.pdf'))
