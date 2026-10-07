import WorkGrid from '@/src/components/WorkGrid';
import { archivePageCount } from '@/src/data/archive';
import RevealObserver from './RevealObserver';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return <>
<header className="topbar">
    <a className="wordmark" href="#home" aria-label="MK home"><span>PORTFOLIO<span className="wordmark-year"> / 2026</span></span></a>
    <nav className="desktop-nav" aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#personal">Personal</a><a href="/library">Archive</a><a href="#contact">Contact</a></nav>
    <a className="availability" href="#contact"><span></span> Open to opportunities</a>
  </header>

  <main>
    <section className="hero wrap" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line"></span> UNITY DEVELOPER · MAKER</p>
        <h1>Making ideas<br />feel <em>alive.</em></h1>
        <p className="hero-intro">Hi, I’m <strong>Murtaza (MK) Kanorwala</strong>. I build interactive 2D/3D games in Unity and keep a personal archive of the things that inspire me.</p>
        <div className="hero-actions"><a className="button button-lime" href="#work">Explore my work <span>↘</span></a><a className="text-link" href="#about">A little about me <span>↓</span></a></div>
        <div className="hero-meta"><span>BASED IN INDIA</span><span>INDEPENDENT CREATOR</span></div>
      </div>
      <div className="hero-monogram" aria-label="MK monogram" role="img"><span>MK</span></div>
      <a className="scroll-cue" href="#work"><span>SCROLL TO EXPLORE</span><i>↓</i></a>
      <span className="hero-index" aria-hidden="true">01 — 06</span>
    </section>

    <section className="ticker" aria-label="Areas of work"><div className="ticker-track"><span>GAME DEVELOPMENT</span><i>✳</i><span>UNITY & C#</span><i>✳</i><span>INTERACTIVE DESIGN</span><i>✳</i><span>PERSONAL CURIOSITY</span><i>✳</i><span>GAME DEVELOPMENT</span><i>✳</i><span>UNITY & C#</span><i>✳</i><span>INTERACTIVE DESIGN</span><i>✳</i><span>PERSONAL CURIOSITY</span><i>✳</i></div></section>

    <section className="section wrap" id="work">
      <div className="section-head"><div><p className="eyebrow">01 — SELECTED WORK</p><h2>Built to be <em>played.</em></h2></div><p className="section-note">A collection of prototypes, game projects, collaborations and experiments.</p></div>
      <WorkGrid />
      <div className="work-foot"><span>ALSO IN THE WORKSHOP</span><p>Casino game · 2D multiplayer chess · Low-poly zombie FPS · Cheese Factory Myth · VR car simulator · Multiplayer magic game · Visual novel · RPSLS · JOJO Fight · Music prototype · Swinger</p></div>
      <div className="workshop-banner" aria-label="Animated previews of works in progress">
        <div className="workshop-track">
          <div className="workshop-set">
            {[2, 3, 4, 5, 6].map((number) => <div className="workshop-frame" key={number}><img src={`/unitydev/images/upcoming/post-${number}.gif`} alt={`Animated workshop preview ${number}`} loading="lazy" /></div>)}
          </div>
          <div className="workshop-set" aria-hidden="true">
            {[2, 3, 4, 5, 6].map((number) => <div className="workshop-frame" key={number}><img src={`/unitydev/images/upcoming/post-${number}.gif`} alt="" loading="lazy" /></div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="about-band" id="about"><div className="wrap about-layout"><div className="about-label"><p className="eyebrow">02 — THE PERSON BEHIND THE WORK</p><span className="about-index">BUILT WITH CURIOSITY <b>✳</b></span></div><div className="about-copy"><h2>Art gave me expression.<br />Code gave me <em>structure.</em></h2><p>I’ve been working as a freelancer, building interactive 2D/3D games using Unity3D with a focus on gameplay systems, physics mechanics, and mobile performance.</p><p>Now, I’m looking to transition into a full-time role as a <strong>Unity Developer</strong>. I’m working toward joining a AAA game studio and building meaningful, high-quality game experiences.</p><a className="text-link" href="/unitydev/index.html">View the original Unity portfolio <span>↗</span></a></div></div></section>

    <section className="section wrap" id="journey"><div className="section-head"><div><p className="eyebrow">03 — EXPERIENCE & EDUCATION</p><h2>A little <em>backstory.</em></h2></div><p className="section-note">From testing games to building them: a path shaped by curiosity and craft.</p></div>
      <div className="timeline"><article><span className="timeline-year">FREELANCE</span><div><h3>Freelance & Various Roles</h3><p className="timeline-role">Unity Developer</p><p>Built interactive 2D/3D games in Unity3D with a focus on gameplay systems, physics mechanics, and mobile optimization.</p></div><span className="timeline-mark">01</span></article><article><span className="timeline-year">2021</span><div><h3>Outscal</h3><p className="timeline-role">FullStack Game Development</p><p>Completed an intensive game development bootcamp focusing on Unity, C#, game architecture, and version control. Built and published multiple game prototypes, and participated in peer code reviews, design challenges, and industry-led mentorship sessions.</p></div><span className="timeline-mark">02</span></article><article><span className="timeline-year">EDUCATION</span><div><h3>Thakur College of Science & Commerce</h3><p className="timeline-role">B.Sc. Computer Science</p><p>Studied data structures, algorithms, OOP, and databases. Built a patient prescription management system for a private clinic using ASP.NET.</p></div><span className="timeline-mark">03</span></article></div>
    </section>

    <section className="skills-section"><div className="wrap skills-layout"><div><p className="eyebrow">04 — WHAT I BRING</p><h2>Craft meets<br /><em>curiosity.</em></h2><p className="skills-intro">A broad skill span across systems, art, testing and collaboration.</p></div><div className="skill-list"><article><span>01</span><div><h3>Game development</h3><p>Unity (C#), VR/AR, Ren’Py, gameplay systems, physics simulation, procedural systems, rapid prototyping, mobile optimization, Cinemachine, Shader Graph, UI Toolkit, object pooling.</p></div></article><article><span>02</span><div><h3>Programming & architecture</h3><p>OOP, MVC architecture, singletons, event systems, interfaces, debugging, profiling and optimization.</p></div></article><article><span>03</span><div><h3>Collaboration & QA</h3><p>GitHub Desktop, Plastic SCM, GitKraken, JIRA, developer-mode debugging, multiplayer stress testing, AI & physics validation, test case design.</p></div></article><article><span>04</span><div><h3>Design & people</h3><p>Canva, visual composition, asset sourcing, communication and client interaction. Fluent in English and Hindi; conversational in Gujarati, Arabic and Marathi; learning Chinese.</p></div></article></div></div></section>

    <section className="personal-section" id="personal"><div className="wrap"><div className="section-head"><div><p className="eyebrow">05 — OUTSIDE THE BUILD</p><h2>A mind in <em>many tabs.</em></h2></div><p className="section-note">Know MK is my living archive: capturing, organizing, distilling, expressing. Step into the original collections below.</p></div>
      <div className="personal-grid"><a className="personal-card personal-large" href="/library?collection=diary"><span className="personal-count">01 / REFLECTIONS</span><div><span className="personal-icon">✳</span><h3>Diary</h3><p>Identity, philosophy, travel, languages, ghosts, internet and more.</p><span className="personal-go">EXPLORE COLLECTION ↗</span></div><span className="personal-watermark">D</span></a><a className="personal-card" href="/library?collection=hobbies"><span className="personal-count">02 / INTERESTS</span><div><span className="personal-icon">⌁</span><h3>Hobbies</h3><p>Comedy, anime, art, dance, music, outdoors, rides, sports and video games.</p><span className="personal-go">EXPLORE COLLECTION ↗</span></div><span className="personal-watermark">H</span></a><a className="personal-card" href="/library?collection=journal"><span className="personal-count">03 / CURIOSITIES</span><div><span className="personal-icon">✎</span><h3>Journal</h3><p>Collections, directors, Babes, mathematics and ideas.</p><span className="personal-go">EXPLORE COLLECTION ↗</span></div><span className="personal-watermark">J</span></a><a className="personal-card" href="/personal/mental%20map/index.html"><span className="personal-count">04 / DIRECTION</span><div><span className="personal-icon">◎</span><h3>Mental Map</h3><p>Goals, routines and the connections that shape my perspective.</p><span className="personal-go">EXPLORE COLLECTION ↗</span></div><span className="personal-watermark">M</span></a></div>
      <div className="archive-link"><span>THE PERSONAL ARCHIVE</span><a href="/library">Browse all pages <span>↗</span></a><p>{archivePageCount} personal pages, grouped into four collections.</p></div>
    </div></section>

    <section className="contact-section" id="contact"><div className="wrap contact-layout"><div><p className="eyebrow">06 — LET’S MAKE SOMETHING</p><h2>Have a good<br /><em>idea?</em></h2><p className="contact-copy">I’m looking to create meaningful, high-quality game experiences with thoughtful people.</p><a className="button button-lime" href="mailto:kanorwalamurtaza217@gmail.com">Start a conversation <span>↗</span></a></div><div className="contact-details"><span>FIND ME AROUND THE WEB</span><a href="https://github.com/murkeh217" target="_blank" rel="noreferrer">GitHub <b>↗</b></a><a href="https://www.youtube.com/@murkeh217" target="_blank" rel="noreferrer">YouTube <b>↗</b></a><a href="https://discord.com/users/1487948908213567618" target="_blank" rel="noreferrer">Discord <b>↗</b></a><a href="mailto:kanorwalamurtaza217@gmail.com">kanorwalamurtaza217@gmail.com <b>↗</b></a><a href="tel:+919307565891">+91 9307565891 <b>↗</b></a></div></div></section>
  </main>

  <footer className="footer"><div className="wrap"><a className="wordmark" href="#home"><span>MURTAZA KANORWALA</span></a><span>© {new Date().getFullYear()} · BUILT WITH CURIOSITY · <a href="/unitydev/index.html">FULL UNITY PORTFOLIO</a></span><a href="#home">BACK TO TOP ↑</a></div></footer>
  <RevealObserver />
  </>;
}

