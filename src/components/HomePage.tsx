'use client';

import { useState } from 'react';
import WorkGrid from '@/src/components/WorkGrid';
import { archivePageCount } from '@/src/data/archive';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';
import { useLanguage } from './LanguageProvider';
import RevealObserver from '../../app/RevealObserver';
import HeroCharacter from './HeroCharacter.jsx';
import LoadingImage from './LoadingImage';
import ProjectHighlights from './ProjectHighlights';

const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: 'Murtaza Kanorwala — Unity Game Developer Portfolio',
  url: 'https://murtazakanorwala.vercel.app',
  mainEntity: {
    '@type': 'Person',
    name: 'Murtaza (MK) Kanorwala',
    url: 'https://murtazakanorwala.vercel.app',
    jobTitle: 'Unity Game Developer',
    description: 'Unity developer building interactive 2D and 3D games, gameplay systems, physics mechanics, and mobile experiences.',
    knowsAbout: ['Unity', 'C#', 'Game development', 'Gameplay programming', 'Physics simulation', 'Mobile game optimization', 'VR and AR'],
    sameAs: ['https://github.com/murkeh217', 'https://www.youtube.com/@murkeh217'],
  },
};

export default function HomePage() {
  const { locale } = useLanguage();
  const hi = locale === 'hi';
  const zh = locale === 'zh-CN';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd).replace(/</g, '\\u003c') }} />
<a className="skip-link" href="#main-content">{zh ? '跳至内容' : hi ? 'मुख्य सामग्री पर जाएँ' : 'Skip to content'}</a>
<header className="topbar">
    <a className="wordmark" href="#home" aria-label="MK home"><span>PORTFOLIO<span className="wordmark-year"> / 2026</span></span></a>
    <nav className="desktop-nav" aria-label={zh ? '主导航' : hi ? 'मुख्य नेविगेशन' : 'Main navigation'}><a href="#work">{zh ? '作品' : hi ? 'काम' : 'Work'}</a><a href="#about">{zh ? '关于' : hi ? 'परिचय' : 'About'}</a><a href="#personal">{zh ? '个人' : hi ? 'व्यक्तिगत' : 'Personal'}</a><a href="/library">{zh ? '档案' : hi ? 'संग्रह' : 'Archive'}</a><a href="#contact">{zh ? '联系' : hi ? 'संपर्क' : 'Contact'}</a></nav>
    <div className="mobile-menu-wrap">
      <button className="mobile-menu-toggle" type="button" aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen((open) => !open)}>{mobileMenuOpen ? (zh ? '关闭' : hi ? 'बंद करें' : 'Close') : (zh ? '菜单' : hi ? 'मेन्यू' : 'Menu')} <span aria-hidden="true">{mobileMenuOpen ? '−' : '+'}</span></button>
      {mobileMenuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label={zh ? '主导航' : hi ? 'मुख्य नेविगेशन' : 'Main navigation'}>{[
        ['#work', zh ? '作品' : hi ? 'काम' : 'Work'], ['#about', zh ? '关于' : hi ? 'परिचय' : 'About'], ['#personal', zh ? '个人' : hi ? 'व्यक्तिगत' : 'Personal'], ['/library', zh ? '档案' : hi ? 'संग्रह' : 'Archive'], ['#contact', zh ? '联系' : hi ? 'संपर्क' : 'Contact'],
      ].map(([href, label]) => <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}>{label}</a>)}</nav>}
    </div>
    <div className="topbar-tools"><a className="availability" href="#contact"><span></span> {zh ? '欢迎合作机会' : hi ? 'अवसरों के लिए उपलब्ध' : 'Open to opportunities'}</a><LanguageSwitcher /></div>
  </header>

  <main id="main-content" tabIndex={-1}>
    <section className="hero wrap" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line"></span> {zh ? 'Unity 开发者 · 创作者' : hi ? 'यूनिटी डेवलपर · निर्माता' : 'UNITY DEVELOPER · MAKER'}</p>
        <h1>{zh ? <>让想法<br /><em>鲜活起来。</em></> : hi ? <>विचारों को<br />जीवंत <em>बनाता हूँ।</em></> : <>Making ideas<br />feel <em>alive.</em></>}</h1>
        <p className="hero-intro">{zh ? <>你好，我是 <strong>Murtaza (MK) Kanorwala</strong>。我用 Unity 和 C# 打造响应灵敏、细节用心的互动游戏体验。</> : hi ? <>नमस्ते, मैं <strong>Murtaza (MK) Kanorwala</strong> हूँ। मैं Unity और C# से प्रतिक्रियाशील, बारीकी से बनाए गए interactive game experiences बनाता हूँ。</> : <>Hi, I’m <strong>Murtaza (MK) Kanorwala</strong>. I use Unity and C# to build responsive game experiences with thoughtful details.</>}</p>
        <div className="hero-actions"><a className="button button-lime" href="#work">{zh ? '查看我的作品' : hi ? 'मेरा काम देखें' : 'Explore my work'} <span>↘</span></a><a className="text-link" href="#about">{zh ? '关于我' : hi ? 'मेरे बारे में' : 'A little about me'} <span>↓</span></a></div>
        <div className="hero-meta"><span>{zh ? '位于印度' : hi ? 'भारत में स्थित' : 'BASED IN INDIA'}</span><span>{zh ? '独立创作者' : hi ? 'स्वतंत्र निर्माता' : 'INDEPENDENT CREATOR'}</span></div>
      </div>
      <div className="hero-monogram" aria-label="MK monogram" role="img"><span>MK</span><HeroCharacter /></div>
      <a className="scroll-cue" href="#work"><span>{zh ? '向下探索' : hi ? 'देखने के लिए नीचे जाएँ' : 'SCROLL TO EXPLORE'}</span><i>↓</i></a>
      <span className="hero-index" aria-hidden="true">01 — 06</span>
    </section>

    <section className="ticker" aria-label={zh ? '工作领域' : hi ? 'काम के क्षेत्र' : 'Areas of work'}><div className="ticker-track"><span>{zh ? '游戏开发' : hi ? 'गेम डेवलपमेंट' : 'GAME DEVELOPMENT'}</span><i>✳</i><span>UNITY & C#</span><i>✳</i><span>{zh ? '交互设计' : hi ? 'इंटरैक्टिव डिज़ाइन' : 'INTERACTIVE DESIGN'}</span><i>✳</i><span>{zh ? '保持好奇' : hi ? 'व्यक्तिगत जिज्ञासा' : 'PERSONAL CURIOSITY'}</span><i>✳</i><span>{zh ? '游戏开发' : hi ? 'गेम डेवलपमेंट' : 'GAME DEVELOPMENT'}</span><i>✳</i><span>UNITY & C#</span><i>✳</i><span>{zh ? '交互设计' : hi ? 'इंटरैक्टिव डिज़ाइन' : 'INTERACTIVE DESIGN'}</span><i>✳</i><span>{zh ? '保持好奇' : hi ? 'व्यक्तिगत जिज्ञासा' : 'PERSONAL CURIOSITY'}</span><i>✳</i></div></section>

    <ProjectHighlights />

    <section className="section wrap" id="work">
      <div className="section-head"><div><p className="eyebrow">01 — {zh ? '精选作品' : hi ? 'चुने हुए प्रोजेक्ट' : 'SELECTED WORK'}</p><h2>{zh ? <>为游玩而<br /><em>打造。</em></> : hi ? <>खेलने के लिए<br /><em>बनाए गए।</em></> : <>Built to be <em>played.</em></>}</h2></div><p className="section-note">{zh ? '游戏原型、项目、合作作品与实验的精选集。' : hi ? 'गेम प्रोटोटाइप, प्रोजेक्ट, सहयोग और प्रयोगों का संग्रह।' : 'A collection of prototypes, game projects, collaborations and experiments.'}</p></div>
      <WorkGrid />
      <div className="work-foot"><span>{zh ? '其他开发中的作品' : hi ? 'वर्कशॉप में अन्य प्रोजेक्ट' : 'ALSO IN THE WORKSHOP'}</span><p>Lineball · 3D ball · 2D platformer · 3D battle tank · Doodle Jump clone</p></div>
      <div className="workshop-banner" aria-label="Animated previews of works in progress">
        <div className="workshop-track">
          <div className="workshop-set">
            {[2, 3, 4, 5, 6].map((number) => <div className="workshop-frame" key={number}><LoadingImage src={`/unitydev/images/upcoming/post-${number}.gif`} alt={`Animated workshop preview ${number}`} loading="lazy" /></div>)}
          </div>
          <div className="workshop-set" aria-hidden="true">
            {[2, 3, 4, 5, 6].map((number) => <div className="workshop-frame" key={number}><LoadingImage src={`/unitydev/images/upcoming/post-${number}.gif`} alt="" loading="lazy" /></div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="collaboration-band"><div className="wrap collaboration-layout">
      <div><p className="eyebrow">{zh ? '合作与社区' : hi ? 'सहयोग और समुदाय' : 'COLLABORATION & COMMUNITY'}</p><h2>{zh ? <>बेहतर काम,<br /><em>साथ मिलकर。</em></> : hi ? <>बेहतर काम,<br /><em>मिलकर。</em></> : <>Good work<br /><em>takes teamwork.</em></>}</h2></div>
      <div className="collaboration-items">
        <article><span>01</span><div><h3>{zh ? 'लेखक合作' : hi ? 'लेखक के साथ सहयोग' : 'Writer collaboration'}</h3><p>{zh ? '与作者合作，将电子表格中的故事内容转化为 Ren’Py 对话树、转场和动画。' : hi ? 'एक लेखक की spreadsheet कहानी को Ren’Py dialogue trees, transitions और animation में बदला।' : 'Worked with a writer to turn story content in a spreadsheet into Ren’Py dialogue trees, transitions, and animation.'}</p></div></article>
        <article><span>02</span><div><h3>{zh ? '同伴评审与指导' : hi ? '同伴评审 और मार्गदर्शन' : 'Peer reviews & mentorship'}</h3><p>{zh ? '在 Outscal 游戏开发训练营中参与同伴代码评审、设计挑战和行业导师交流。' : hi ? 'Outscal गेम डेवलपमेंट बूटकैंप में peer code reviews, design challenges और industry mentorship में भाग लिया।' : 'At Outscal, took part in peer code reviews, design challenges, and sessions with industry mentors.'}</p></div></article>
      </div>
    </div></section>

    <section className="about-band" id="about"><div className="wrap about-layout"><div className="about-label"><p className="eyebrow">02 — {zh ? '作品背后的创作者' : hi ? 'काम के पीछे का व्यक्ति' : 'THE PERSON BEHIND THE WORK'}</p><span className="about-index">{zh ? '以好奇心创造' : hi ? 'जिज्ञासा से निर्मित' : 'BUILT WITH CURIOSITY'} <b>✳</b></span></div><div className="about-copy"><h2>{zh ? <>艺术让我表达。<br />代码赋予我<em>结构。</em></> : hi ? <>कला ने मुझे अभिव्यक्ति दी।<br />कोड ने दी <em>संरचना।</em></> : <>Art gave me expression.<br />Code gave me <em>structure.</em></>}</h2><p>{zh ? '我以自由职业者身份使用 Unity3D 制作互动式 2D/3D 游戏，专注于玩法系统、物理机制和移动端性能。' : hi ? 'मैं फ्रीलांसर के रूप में Unity3D में इंटरैक्टिव 2D/3D गेम बनाता हूँ। मेरा ध्यान गेमप्ले सिस्टम, भौतिकी और मोबाइल प्रदर्शन पर है।' : 'I’ve been working as a freelancer, building interactive 2D/3D games using Unity3D with a focus on gameplay systems, physics mechanics, and mobile performance.'}</p><p>{zh ? <>我希望成为全职 <strong>Unity 开发者</strong>，加入 AAA 游戏工作室，打造有意义、高品质的游戏体验。</> : hi ? <>अब मैं पूर्णकालिक <strong>Unity Developer</strong> की भूमिका में जाना चाहता हूँ। मेरा लक्ष्य AAA गेम स्टूडियो में शामिल होकर सार्थक और उच्च गुणवत्ता वाले गेम बनाना है।</> : <>Now, I’m looking to transition into a full-time role as a <strong>Unity Developer</strong>. I’m working toward joining a AAA game studio and building meaningful, high-quality game experiences.</>}</p></div></div></section>

    <section className="personality-note wrap" aria-labelledby="personality-note-title"><div><p className="eyebrow">{zh ? '多认识我一点' : hi ? 'मेरे बारे में थोड़ा और' : 'A LITTLE MORE ABOUT ME'}</p><h2 id="personality-note-title">{zh ? <>安静地观察，<em>始终好奇。</em></> : hi ? <>शांत स्वभाव,<br /><em>जिज्ञासु मन।</em></> : <>Quiet at first.<br /><em>Curious always.</em></>}</h2></div><p>{zh ? '我刚开始时或许有些安静，但总会认真倾听、深入思考并留意细节。善意与可靠对我很重要，我也把这份用心带进创作里。' : hi ? 'मैं शुरुआत में थोड़ा शांत रह सकता हूँ, लेकिन हमेशा ध्यान से सुनता, गहराई से सोचता और छोटी बातों पर गौर करता हूँ। मेरे लिए दयालु और भरोसेमंद होना मायने रखता है—और यही सोच मैं अपने काम में भी लाता हूँ।' : 'I can be a little quiet at first, but I’m always listening, thinking deeply, and noticing the details. I care about being kind and dependable, and bring that thoughtfulness into the things I make.'}</p></section>

    <section className="section wrap" id="journey"><div className="section-head"><div><p className="eyebrow">03 — {zh ? '经历与教育' : hi ? 'अनुभव और शिक्षा' : 'EXPERIENCE & EDUCATION'}</p><h2>{zh ? <>我的<em>经历。</em></> : hi ? <>मेरी <em>कहानी।</em></> : <>A little <em>backstory.</em></>}</h2></div><p className="section-note">{zh ? '从测试游戏到开发游戏：一段由好奇心与匠心塑造的旅程。' : hi ? 'गेम टेस्ट करने से लेकर बनाने तक: जिज्ञासा और कौशल से बनी राह।' : 'From testing games to building them: a path shaped by curiosity and craft.'}</p></div>
      <div className="timeline"><article><span className="timeline-year">FREELANCE</span><div><h3>Freelance & Various Roles</h3><p className="timeline-role">Unity Developer</p><p>Built interactive 2D/3D games in Unity3D with a focus on gameplay systems, physics mechanics, and mobile optimization.</p></div><span className="timeline-mark">01</span></article><article><span className="timeline-year">2021</span><div><h3>Outscal</h3><p className="timeline-role">FullStack Game Development</p><p>Completed an intensive game development bootcamp focusing on Unity, C#, game architecture, and version control. Built and published multiple game prototypes, and participated in peer code reviews, design challenges, and industry-led mentorship sessions.</p></div><span className="timeline-mark">02</span></article><article><span className="timeline-year">EDUCATION</span><div><h3>Thakur College of Science & Commerce</h3><p className="timeline-role">B.Sc. Computer Science</p><p>Studied data structures, algorithms, OOP, and databases. Built a patient prescription management system for a private clinic using ASP.NET.</p></div><span className="timeline-mark">03</span></article></div>
    </section>

    <section className="skills-section"><div className="wrap skills-layout"><div><p className="eyebrow">04 — {zh ? '专业技能' : hi ? 'मेरी खूबियाँ' : 'WHAT I BRING'}</p><h2>{zh ? <>匠心与<br /><em>好奇心。</em></> : hi ? <>कौशल और<br /><em>जिज्ञासा।</em></> : <>Craft meets<br /><em>curiosity.</em></>}</h2><p className="skills-intro">{zh ? '将游戏开发技术与协作、分析和沟通能力结合。' : hi ? 'तकनीकी गेम डेवलपमेंट के साथ सहयोग, विश्लेषण और संवाद कौशल।' : 'Game development skills, backed by collaboration, problem solving, and communication.'}</p></div><div className="skill-list"><p className="skill-group-label">{zh ? '技术技能' : hi ? 'तकनीकी कौशल' : 'TECHNICAL SKILLS'}</p><article><span>01</span><div><h3>{zh ? '游戏开发' : hi ? 'गेम डेवलपमेंट' : 'Game development'}</h3><p>{zh ? 'Unity（C#）、VR/AR、Ren’Py、玩法系统、物理模拟、程序化系统、快速原型开发、移动端优化、Cinemachine、Shader Graph、UI Toolkit、对象池。' : 'Unity (C#), VR/AR, Ren’Py, gameplay systems, physics simulation, procedural systems, rapid prototyping, mobile optimization, Cinemachine, Shader Graph, UI Toolkit, object pooling.'}</p></div></article><article><span>02</span><div><h3>{zh ? '编程与架构' : hi ? 'प्रोग्रामिंग और आर्किटेक्चर' : 'Programming & architecture'}</h3><p>{zh ? 'OOP、MVC 架构、单例模式、事件系统、接口、调试、性能分析与优化。' : 'OOP, MVC architecture, singletons, event systems, interfaces, debugging, profiling and optimization.'}</p></div></article><article><span>03</span><div><h3>{zh ? '协作与质量保障' : hi ? 'सहयोग और गुणवत्ता परीक्षण' : 'Collaboration & QA'}</h3><p>{zh ? 'GitHub Desktop、Plastic SCM、GitKraken、JIRA、开发者模式调试、多人压力测试、AI 与物理验证、测试用例设计。' : 'GitHub Desktop, Plastic SCM, GitKraken, JIRA, developer-mode debugging, multiplayer stress testing, AI & physics validation, test case design.'}</p></div></article><p className="skill-group-label durable-label">{zh ? '可迁移技能' : hi ? 'हर भूमिका में काम आने वाले कौशल' : 'DURABLE SKILLS'}</p><article><span>04</span><div><h3>{zh ? '设计与沟通' : hi ? 'डिज़ाइन और संवाद' : 'Design & communication'}</h3><p>{zh ? 'Canva、视觉构图、素材搜集、沟通与客户协作。' : 'Canva, visual composition, asset sourcing, client communication, and collaboration.'}</p></div></article><article><span>05</span><div><h3>{zh ? '问题解决与学习' : hi ? 'समस्या समाधान और सीखना' : 'Problem solving & learning'}</h3><p>{zh ? '通过原型、调试和迭代，将想法转化为可玩的系统；愿意学习适合项目的新工具。' : 'Turn ideas into playable systems through prototyping, debugging, and iteration; learn new tools to fit the project.'}</p></div></article><article><span>06</span><div><h3>{zh ? '语言' : hi ? 'भाषाएँ' : 'Languages'}</h3><p>{zh ? '精通英语和印地语，会话使用古吉拉特语、阿拉伯语和马拉地语，正在学习中文。' : hi ? 'अंग्रेज़ी और हिंदी में धाराप्रवाह; गुजराती, अरबी और मराठी का ज्ञान; चीनी सीख रहा हूँ।' : 'Fluent in English and Hindi; conversational in Gujarati, Arabic, and Marathi; learning Chinese.'}</p></div></article></div></div></section>

    <section className="personal-section" id="personal"><div className="wrap"><div className="section-head"><div><p className="eyebrow">05 — {zh ? '创作之外' : hi ? 'निर्माण से परे' : 'OUTSIDE THE BUILD'}</p><h2>{zh ? <>一个装着<br /><em>许多兴趣的脑袋。</em></> : hi ? <>कई दिशाओं में<br /><em>सोचता मन।</em></> : <>A mind in <em>many tabs.</em></>}</h2></div><p className="section-note">{zh ? 'Know MK 是我的个人档案：记录、整理、提炼与表达。欢迎浏览下面的原始分类。' : hi ? 'Know MK मेरा जीवंत संग्रह है: संजोना, व्यवस्थित करना, सार निकालना और अभिव्यक्त करना। नीचे मूल संग्रह देखें।' : 'Know MK is my living archive: capturing, organizing, distilling, expressing. Step into the original collections below.'}</p></div>
      <div className="personal-grid"><a className="personal-card personal-large" href="/library?collection=diary"><span className="personal-count">01 / {zh ? '随想' : hi ? 'चिंतन' : 'REFLECTIONS'}</span><div><span className="personal-icon">✳</span><h3>{zh ? '日记' : hi ? 'डायरी' : 'Diary'}</h3><p>{zh ? '身份、哲学、旅行、语言、个性等主题。' : hi ? 'पहचान, दर्शन, यात्रा, भाषाएँ, व्यक्तित्व और बहुत कुछ।' : 'Identity, philosophy, travel, languages, personality and more.'}</p><span className="personal-go">{zh ? '浏览分类 ↗' : hi ? 'संग्रह देखें ↗' : 'EXPLORE COLLECTION ↗'}</span></div><span className="personal-watermark">D</span></a><a className="personal-card" href="/library?collection=hobbies"><span className="personal-count">02 / {zh ? '兴趣' : hi ? 'रुचियाँ' : 'INTERESTS'}</span><div><span className="personal-icon">⌁</span><h3>{zh ? '爱好' : hi ? 'शौक' : 'Hobbies'}</h3><p>{zh ? '喜剧、动漫、艺术、电视、音乐、运动与电子游戏。' : hi ? 'कॉमेडी, एनीमे, कला, टीवी, संगीत, वाहन, खेल और वीडियो गेम।' : 'Comedy, anime, art, TV, music, rides, sports and video games.'}</p><span className="personal-go">{zh ? '浏览分类 ↗' : hi ? 'संग्रह देखें ↗' : 'EXPLORE COLLECTION ↗'}</span></div><span className="personal-watermark">H</span></a><a className="personal-card" href="/library?collection=journal"><span className="personal-count">03 / {zh ? '好奇心' : hi ? 'जिज्ञासाएँ' : 'CURIOSITIES'}</span><div><span className="personal-icon">✎</span><h3>{zh ? '随笔' : hi ? 'जर्नल' : 'Journal'}</h3><p>{zh ? '导演、数学与各种想法。' : hi ? 'निर्देशक, गणित और विचार।' : 'Directors, ghosts, Babes, mathematics and ideas.'}</p><span className="personal-go">{zh ? '浏览分类 ↗' : hi ? 'संग्रह देखें ↗' : 'EXPLORE COLLECTION ↗'}</span></div><span className="personal-watermark">J</span></a><a className="personal-card" href="/library?page=personal%2Fmental%20map%2Findex.html"><span className="personal-count">04 / {zh ? '方向' : hi ? 'दिशा' : 'DIRECTION'}</span><div><span className="personal-icon">◎</span><h3>{zh ? '思维地图' : hi ? 'मानसिक मानचित्र' : 'Mental Map'}</h3><p>{zh ? '塑造我视角的目标、日常习惯与联系。' : hi ? 'लक्ष्य, दिनचर्या और मेरे नज़रिए को आकार देने वाले संबंध।' : 'Goals, routines and the connections that shape my perspective.'}</p><span className="personal-go">{zh ? '浏览分类 ↗' : hi ? 'संग्रह देखें ↗' : 'EXPLORE COLLECTION ↗'}</span></div><span className="personal-watermark">M</span></a></div>
      <div className="archive-link"><span>{zh ? '个人档案' : hi ? 'निजी संग्रह' : 'THE PERSONAL ARCHIVE'}</span><a href="/library">{zh ? '浏览全部页面' : hi ? 'सभी पन्ने देखें' : 'Browse all pages'} <span>↗</span></a><p>{zh ? `${archivePageCount} 个个人页面，分为四个分类。` : hi ? `${archivePageCount} निजी पन्ने, चार संग्रहों में।` : `${archivePageCount} personal pages, grouped into four collections.`}</p></div>
    </div></section>

    <section className="contact-section" id="contact"><div className="wrap contact-layout"><div><p className="eyebrow">06 — {zh ? '一起创造' : hi ? 'कुछ नया बनाएँ' : 'LET’S MAKE SOMETHING'}</p><h2>{zh ? <>有个好<br /><em>想法？</em></> : hi ? <>कोई अच्छा<br /><em>विचार है?</em></> : <>Have a good<br /><em>idea?</em></>}</h2><p className="contact-copy">{zh ? '我希望与有想法的人合作，打造有意义、高品质的游戏体验。' : hi ? 'मैं रचनात्मक लोगों के साथ सार्थक और उच्च गुणवत्ता वाले गेम बनाना चाहता हूँ।' : 'I’m looking to create meaningful, high-quality game experiences with thoughtful people.'}</p><a className="button button-lime" href="mailto:kanorwalamurtaza217@gmail.com">{zh ? '开始交流' : hi ? 'बात शुरू करें' : 'Start a conversation'} <span>↗</span></a></div><div className="contact-details"><span>{zh ? '在网上找到我' : hi ? 'मुझे यहाँ पाएँ' : 'FIND ME AROUND THE WEB'}</span><a href="https://github.com/murkeh217" target="_blank" rel="noreferrer">GitHub <b>↗</b></a><a href="https://www.youtube.com/@murkeh217" target="_blank" rel="noreferrer">YouTube <b>↗</b></a><a href="https://discord.com/users/1487948908213567618" target="_blank" rel="noreferrer">Discord <b>↗</b></a><a href="mailto:kanorwalamurtaza217@gmail.com">kanorwalamurtaza217@gmail.com <b>↗</b></a><a href="tel:+919307565891">+91 9307565891 <b>↗</b></a></div></div></section>
  </main>

  <footer className="footer"><div className="wrap"><a className="wordmark" href="#home"><span>MURTAZA KANORWALA</span></a><span>© {new Date().getFullYear()} · {zh ? '好奇心创造' : hi ? 'जिज्ञासा से निर्मित' : 'BUILT WITH CURIOSITY'}</span><a href="#home">{zh ? '返回顶部 ↑' : hi ? 'ऊपर जाएँ ↑' : 'BACK TO TOP ↑'}</a></div></footer>
  <RevealObserver />
  </>;
}

