import React from 'react';
import { RESUME_DATA } from './constants';

const { personal, education, experience, certifications, skills, security } = RESUME_DATA;

// BASE_URL is './' (see vite.config.ts), so this resolves correctly locally and on GitHub Pages.
const RESUME_URL = `${import.meta.env.BASE_URL}${personal.resume}`;

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'certs', label: 'Certifications' },
  { id: 'skills', label: 'Skills' },
  { id: 'security', label: 'Security' },
  { id: 'contact', label: 'Contact' },
];

const Ext: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({
  id,
  title,
  children,
}) => (
  <section id={id}>
    <h2>{title}</h2>
    {children}
    <p className="top">
      <a href="#top">↑ back to top</a>
    </p>
  </section>
);

function App() {
  return (
    <div className="page" id="top">
      <header>
        <h1>{personal.name}</h1>
        <p className="tagline">{personal.role}</p>
        <p className="small">
          {personal.location} · <a href={`mailto:${personal.email}`}>{personal.email}</a> ·{' '}
          <Ext href={personal.links.linkedin}>LinkedIn</Ext> ·{' '}
          <Ext href={personal.links.github}>GitHub</Ext>
        </p>
        <p>
          <a className="btn" href={RESUME_URL} download="Satnam_Singh_Resume.pdf">
            Download Resume (PDF)
          </a>{' '}
          <span className="small">
            or <Ext href={RESUME_URL}>view it in your browser</Ext>
          </span>
        </p>
      </header>

      <nav aria-label="Sections">
        [{' '}
        {SECTIONS.map((s, i) => (
          <React.Fragment key={s.id}>
            <a href={`#${s.id}`}>{s.label}</a>
            {i < SECTIONS.length - 1 && ' | '}
          </React.Fragment>
        ))}{' '}
        ]
      </nav>

      <hr />

      <main>
        <Section id="about" title="About Me">
          <p>{personal.summary}</p>
        </Section>

        <Section id="education" title="Education">
          <ul>
            {education.map((e, i) => (
              <li key={i}>
                <b>{e.degree}</b>, {e.school}
                <br />
                <span className="muted">
                  {e.year}
                  {e.note && ` · ${e.note}`}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="experience" title="Experience">
          {experience.map((job, i) => (
            <div key={i} className="job">
              <h3>
                {job.company} <span className="muted">({job.period})</span>
              </h3>
              <p className="role">{job.role}</p>
              <ul>
                {job.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section id="certs" title="Certifications">
          <ul>
            {certifications.map((c, i) => (
              <li key={i}>
                {c.url ? <Ext href={c.url}>{c.name}</Ext> : c.name}{' '}
                <span className="muted">by {c.issuer}</span>
                {c.url && <span className="muted"> (verified on Credly)</span>}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="skills" title="Skills">
          <dl>
            {skills.map((s, i) => (
              <React.Fragment key={i}>
                <dt>{s.category}</dt>
                <dd>{s.items.join(', ')}</dd>
              </React.Fragment>
            ))}
          </dl>
        </Section>

        <Section id="security" title="Security Research">
          <h3>Hall of Fame</h3>
          <ul>
            {security.hallOfFame.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
          <h3>Achievements</h3>
          <ul>
            {security.achievements.map((a, i) => (
              <li key={i}>
                <b>{a.title}:</b> {a.description}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" title="Contact">
          <p>The best way to reach me is by email. I usually reply within a day or two.</p>
          <ul>
            <li>
              Email: <a href={`mailto:${personal.email}`}>{personal.email}</a>
            </li>
            <li>
              LinkedIn: <Ext href={personal.links.linkedin}>linkedin.com/in/satnams</Ext>
            </li>
            <li>
              GitHub: <Ext href={personal.links.github}>github.com/ProbotisOP</Ext>
            </li>
          </ul>
        </Section>
      </main>

      <hr />

      <footer>
        <p>
          © {new Date().getFullYear()} {personal.name}. Last updated: {RESUME_DATA.lastUpdated}.
          <br />
          Hand-made in plain HTML style. No trackers, no cookies.
        </p>
      </footer>
    </div>
  );
}

export default App;