'use client';

import { useLanguage } from './LanguageProvider';

const highlights = {
  en: [
    {
      name: 'JOJO Fighting Game',
      challenge: 'Make a 2.5D fighter feel responsive and give each hit a strong sense of impact.',
      role: 'Built the combat prototype, including finite-state-machine combo logic, buffered inputs, and hit-stop effects.',
      impact: 'A playable combat loop that brings together readable combos and deliberate hit feedback.',
      image: '/unitydev/images/jojo-fighting.webp',
      alt: 'JOJO Fighting Game match between Dio and Jotaro',
      href: 'https://murkeh217.github.io/2.5D-Fighting-Game',
      tags: 'UNITY · COMBAT SYSTEMS',
    },
    {
      name: 'Killer Wave',
      challenge: 'Create a one-tap arcade game that stays readable as its wave terrain becomes harder to navigate.',
      role: 'Built procedural 2.5D wave terrain with Perlin noise, tuned jumping with variable gravity and physics damping, and added URP post-processing.',
      impact: 'A playable arcade prototype with an increasing difficulty curve and a neon synthwave look.',
      image: '/unitydev/images/killerwave.webp',
      alt: 'Neon arcade scene from Killer Wave',
      href: 'https://murkeh217.github.io/Killer-Wave',
      tags: 'UNITY · PROCEDURAL TERRAIN',
    },
    {
      name: 'Fingers Crossed',
      challenge: 'Turn a writer’s spreadsheet of story content into a readable, interactive visual novel.',
      role: 'Collaborated with the writer and learned Ren’Py to implement dialogue trees, transitions, and minimal animation.',
      impact: 'A playable narrative experience that connects the supplied story content with branching dialogue.',
      image: '/unitydev/images/fingerscrossed.webp',
      alt: 'Fingers Crossed visual novel scene with a character and branching choices',
      href: 'https://murkeh217.github.io/fingers_crossed',
      tags: 'REN’PY · WRITER COLLABORATION',
    },
  ],
  hi: [
    {
      name: 'JOJO Fighting Game',
      challenge: '2.5D फाइटर को प्रतिक्रियाशील बनाना और हर प्रहार का असर महसूस कराना।',
      role: 'फाइटिंग प्रोटोटाइप में finite-state-machine कॉम्बो लॉजिक, buffered inputs और hit-stop effects बनाए।',
      impact: 'एक खेलने योग्य combat loop, जिसमें स्पष्ट कॉम्बो और असरदार hit feedback है।',
      image: '/unitydev/images/jojo-fighting.webp', alt: 'JOJO Fighting Game मैच', href: 'https://murkeh217.github.io/2.5D-Fighting-Game', tags: 'UNITY · COMBAT SYSTEMS',
    },
    {
      name: 'Killer Wave',
      challenge: 'एक one-tap arcade game बनाना, जो wave terrain कठिन होने पर भी स्पष्ट और खेलने योग्य रहे।',
      role: 'Perlin noise से procedural 2.5D wave terrain बनाया, variable gravity और physics damping से jump control को tune किया, और URP post-processing जोड़ा।',
      impact: 'बढ़ती difficulty और neon synthwave शैली वाला खेलने योग्य arcade prototype।',
      image: '/unitydev/images/killerwave.webp', alt: 'Killer Wave का neon arcade दृश्य', href: 'https://murkeh217.github.io/Killer-Wave', tags: 'UNITY · PROCEDURAL TERRAIN',
    },
    {
      name: 'Fingers Crossed',
      challenge: 'लेखक की spreadsheet वाली कहानी को पढ़ने योग्य, interactive visual novel में बदलना।',
      role: 'लेखक के साथ काम किया और Ren’Py सीखकर dialogue trees, transitions और minimal animation लागू किए।',
      impact: 'Branching dialogue के साथ खेलने योग्य narrative experience।',
      image: '/unitydev/images/fingerscrossed.webp', alt: 'Fingers Crossed visual novel दृश्य', href: 'https://murkeh217.github.io/fingers_crossed', tags: 'REN’PY · WRITER COLLABORATION',
    },
  ],
  zh: [
    {
      name: 'JOJO Fighting Game',
      challenge: '让 2.5D 格斗游戏操作灵敏，并让每次命中都更有力度感。',
      role: '构建战斗原型，包括有限状态机连招逻辑、输入缓冲和 hit-stop 效果。',
      impact: '形成可玩的战斗循环，将清晰连招与有力的命中反馈结合起来。',
      image: '/unitydev/images/jojo-fighting.webp', alt: 'JOJO Fighting Game 对战画面', href: 'https://murkeh217.github.io/2.5D-Fighting-Game', tags: 'UNITY · COMBAT SYSTEMS',
    },
    {
      name: 'Killer Wave',
      challenge: '打造一款单键街机游戏，让玩家在波浪地形逐渐变难时仍能清楚判断并操作。',
      role: '使用 Perlin 噪声构建程序化 2.5D 波浪地形，以可变重力和物理阻尼调校跳跃，并加入 URP 后期效果。',
      impact: '完成一款具有递增难度曲线和霓虹合成波风格的可玩街机原型。',
      image: '/unitydev/images/killerwave.webp', alt: 'Killer Wave 霓虹街机场景', href: 'https://murkeh217.github.io/Killer-Wave', tags: 'UNITY · PROCEDURAL TERRAIN',
    },
    {
      name: 'Fingers Crossed',
      challenge: '将作者以电子表格提供的故事内容转化为易读且可互动的视觉小说。',
      role: '与作者合作并学习 Ren’Py，实现对话树、转场和简洁动画。',
      impact: '完成一款结合原始故事与分支对话的可玩叙事体验。',
      image: '/unitydev/images/fingerscrossed.webp', alt: 'Fingers Crossed 视觉小说场景', href: 'https://murkeh217.github.io/fingers_crossed', tags: 'REN’PY · WRITER COLLABORATION',
    },
  ],
};

export default function ProjectHighlights() {
  const { locale } = useLanguage();
  const language = locale === 'hi' ? 'hi' : locale === 'zh-CN' ? 'zh' : 'en';
  const copy = language === 'hi'
    ? { eyebrow: 'SELECTED CASE STUDIES', title: <>चुनिंदा <em>प्रोजेक्ट।</em></>, intro: 'हर प्रोजेक्ट में चुनौती, मेरी भूमिका और उससे निकला परिणाम।', challenge: 'चुनौती', role: 'मेरी भूमिका', impact: 'परिणाम', open: 'प्रोजेक्ट खोलें' }
    : language === 'zh'
      ? { eyebrow: '精选案例', title: <>精选<em>项目。</em></>, intro: '每个项目都说明挑战、我的职责和最终成果。', challenge: '挑战', role: '我的职责', impact: '成果', open: '打开项目' }
      : { eyebrow: 'SELECTED CASE STUDIES', title: <>Selected <em>projects.</em></>, intro: 'The challenge, my role, and what each project made possible.', challenge: 'CHALLENGE', role: 'MY ROLE', impact: 'OUTCOME', open: 'Open project' };
  const items = highlights[language];

  return <section className="case-studies wrap" aria-labelledby="case-studies-title">
    <div className="section-head">
      <div><p className="eyebrow">{copy.eyebrow}</p><h2 id="case-studies-title">{copy.title}</h2></div>
      <p className="section-note">{copy.intro}</p>
    </div>
    <div className="case-study-list">
      {items.map((item, index) => <article className="case-study" key={item.name}>
        <a className="case-study-image" href={item.href} target="_blank" rel="noreferrer" aria-label={`${item.name}: ${copy.open}`}>
          <img src={item.image} alt={item.alt} loading="lazy" />
          <span>{String(index + 1).padStart(2, '0')} / {item.tags}</span><b aria-hidden="true">↗</b>
        </a>
        <div className="case-study-copy">
          <h3>{item.name}</h3>
          <dl>
            <div><dt>{copy.challenge}</dt><dd>{item.challenge}</dd></div>
            <div><dt>{copy.role}</dt><dd>{item.role}</dd></div>
            <div><dt>{copy.impact}</dt><dd>{item.impact}</dd></div>
          </dl>
          <a className="case-study-link" href={item.href} target="_blank" rel="noreferrer">{copy.open} <span>↗</span></a>
        </div>
      </article>)}
    </div>
  </section>;
}
