'use client';

import { useMemo, useState } from 'react';
import { projects, type ProjectKind } from '../data/projects';
import { useLanguage } from './LanguageProvider';

const filters: { id: 'all' | ProjectKind; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'game', label: 'Games' },
  { id: 'client', label: 'Client work' },
  { id: 'experiment', label: 'Experiments' },
];

export default function WorkGrid() {
  const { locale } = useLanguage();
  const hi = locale === 'hi';
  const zh = locale === 'zh-CN';
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');
  const visibleProjects = useMemo(() => filter === 'all' ? projects : projects.filter((project) => project.kind === filter), [filter]);

  return <>
    <div className="filters" role="group" aria-label={zh ? '筛选项目' : hi ? 'प्रोजेक्ट छाँटें' : 'Filter projects'}>
      {filters.map((item) => <button key={item.id} className={`filter${filter === item.id ? ' active' : ''}`} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
        {zh ? ({ 'all': '全部作品', 'game': '游戏', 'client': '客户项目', 'experiment': '实验' }[item.id]) : hi ? ({ 'all': 'सभी काम', 'game': 'गेम', 'client': 'क्लाइंट काम', 'experiment': 'प्रयोग' }[item.id]) : item.label}<span>{item.id === 'all' ? String(projects.length).padStart(2, '0') : String(projects.filter((project) => project.kind === item.id).length).padStart(2, '0')}</span>
      </button>)}
    </div>
    <div className="project-grid" aria-live="polite">
      {visibleProjects.map((project, index) => {
        const content = <>
          <div className="project-image"><img src={project.image} alt={project.alt} loading={index > 2 ? 'lazy' : 'eager'} /><span className="project-number">{String(projects.indexOf(project) + 1).padStart(2, '0')} / {project.kind.toUpperCase()}</span><span className="project-arrow" aria-hidden="true">{project.href ? '↗' : '✳'}</span></div>
          <div className="project-info"><div><h3>{project.title}</h3><p>{project.summary}</p></div><span className="project-year">{project.label}</span></div>
        </>;
        return project.href
          ? <a className={`project-card${project.featured ? ' project-featured' : ''}`} data-kind={project.kind} href={project.href} key={project.title} target="_blank" rel="noreferrer">{content}</a>
          : <article className="project-card" data-kind={project.kind} key={project.title}>{content}</article>;
      })}
    </div>
  </>;
}
