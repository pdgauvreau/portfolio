import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile, experience, projects, education, skills, about } from '../data/resume.js';
import { formatRange, isCurrent } from '../lib/time.js';
import { BentoTile } from './BentoTile.jsx';
import { TileExpanded } from './TileExpanded.jsx';
import { PhotoWall } from './PhotoWall.jsx';
import { VideoLoop } from './VideoLoop.jsx';
import { ScrubVideo } from './ScrubVideo.jsx';
import { SiteFrame } from './SiteFrame.jsx';
import { VoicePreview } from './VoicePreview.jsx';
import { TalkDemo } from './TalkDemo.jsx';
import { SystemDiagram } from './SystemDiagram.jsx';
import { ResumePaper, ResumeViewer } from './ResumePreview.jsx';

const EASE = [0.16, 1, 0.3, 1];

const milliman = experience.find((item) => item.id === 'milliman');
const highland = projects.find((item) => item.id === 'highlandllc');
const tateai = projects.find((item) => item.id === 'tateai');
const degreemap = projects.find((item) => item.id === 'degreemap');

const gridVariants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const tileVariant = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  shown: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function Stack({ tags }) {
  if (!tags?.length) return null;
  return (
    <div className="stack">
      {tags.map((tag) => (
        <span className="stack-tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function Points({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="entry-points">
      {items.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  );
}

function ProjectDetail({ item, extra }) {
  return (
    <>
      <p className="tile-expanded-role">{item.role}</p>
      {item.impact && <p className="tile-expanded-impact">{item.impact}</p>}
      <Points items={item.points} />
      <Stack tags={item.stack} />
      {item.url && (
        <div className="contact-actions">
          <a className="action-primary" href={item.url} target="_blank" rel="noopener">
            Visit the live site ↗
          </a>
        </div>
      )}
      {extra}
    </>
  );
}

/** One entry per tile: its grid area, closed-face copy, and expanded detail. */
const TILES = [
  {
    id: 'myself',
    area: 'myself',
    closed: { eyebrow: 'About', title: 'Myself', teaser: profile.intro, media: <PhotoWall className="wall-compact" idleSpeed={0.35} hoverSpeed={1} /> },
    expanded: {
      eyebrow: 'About',
      title: 'Myself',
      aside: <PhotoWall />,
      body: (
        <>
          <div className="about-copy">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="facts">
            <div className="fact">
              <p className="eyebrow">Education</p>
              <p className="fact-value">
                {education.school} — {education.degree}
              </p>
              <p className="fact-note">
                {education.when} · {education.coursework.join(' · ')}
              </p>
            </div>
            {skills.map((group) => (
              <div className="fact" key={group.label}>
                <p className="eyebrow">{group.label}</p>
                <p className="fact-value">{group.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </>
      ),
    },
  },
  {
    id: 'degreemap',
    area: 'degreemap',
    closed: {
      eyebrow: `Project · ${formatRange(degreemap.start, degreemap.end)}`,
      title: degreemap.org,
      teaser: degreemap.role,
      tags: degreemap.stack,
      mediaPlacement: 'top',
      media: <VideoLoop src="media/degreemap.mp4" poster="media/degreemap-poster.jpg" playback="hover" speed={1.5} pan />,
    },
    expanded: {
      eyebrow: `Project · ${formatRange(degreemap.start, degreemap.end)}${isCurrent(degreemap.start, degreemap.end) ? ' · Current' : ''}`,
      title: degreemap.org,
      hero: ({ ref, onEnded }) => (
        <VideoLoop
          ref={ref}
          src="media/degreemap.mp4"
          poster="media/degreemap-poster.jpg"
          speed={1.5}
          loop={false}
          onEnded={onEnded}
          className="hero-video"
        />
      ),
      body: <ProjectDetail item={degreemap} />,
    },
  },
  {
    id: 'tateai',
    area: 'tateai',
    closed: {
      eyebrow: 'Project',
      title: tateai.org,
      teaser: tateai.role,
      mediaPlacement: 'top',
      className: 'tile-short',
      media: <VoicePreview />,
    },
    expanded: {
      eyebrow: `Project · ${formatRange(tateai.start, tateai.end)}`,
      title: tateai.org,
      aside: <TalkDemo />,
      body: <ProjectDetail item={tateai} />,
    },
  },
  {
    id: 'workexp',
    area: 'workexp',
    closed: {
      eyebrow: 'Experience',
      title: milliman.org,
      teaser: milliman.role,
      mediaPlacement: 'top',
      className: 'tile-short',
      media: <SystemDiagram compact />,
    },
    expanded: {
      eyebrow: `Experience · ${formatRange(milliman.start, milliman.end)}${isCurrent(milliman.start, milliman.end) ? ' · Current' : ''}`,
      title: milliman.org,
      aside: (
        <div className="diagram-panel">
          <SystemDiagram />
          <p className="site-frame-caption">
            Illustrative · a simplified risk-modeling platform, not Milliman's actual architecture · select a service
          </p>
        </div>
      ),
      body: <ProjectDetail item={milliman} />,
    },
  },
  {
    id: 'highland',
    area: 'highland',
    closed: {
      eyebrow: 'Project',
      title: highland.org,
      teaser: highland.role,
      media: <ScrubVideo src="media/highland-scrub.mp4" poster="media/highland-poster.jpg" />,
    },
    expanded: {
      eyebrow: 'Project',
      title: highland.org,
      aside: <SiteFrame url={highland.url} title="Highland Investments live site" poster="media/highland-poster.jpg" />,
      body: <ProjectDetail item={highland} />,
    },
  },
  {
    id: 'resume',
    area: 'resume',
    closed: {
      eyebrow: 'Contact',
      title: 'Résumé',
      teaser: 'Get in touch, or grab the full résumé.',
      media: <ResumePaper src="media/resume-thumb-1.webp" />,
    },
    expanded: {
      eyebrow: 'Contact',
      title: "Let's talk.",
      aside: <ResumeViewer pages={['media/resume-page-1.webp']} pdf={profile.resume} />,
      body: (
        <>
          <p className="tile-expanded-role">
            Looking for a new grad software developer role. Reach out, or grab the résumé below.
          </p>
          <div className="contact-actions">
            <a className="action-primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="action-quiet" href={profile.resume} target="_blank" rel="noopener">
              Résumé
            </a>
            <a className="action-quiet" href={profile.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a className="action-quiet" href={profile.github} target="_blank" rel="noopener">
              GitHub
            </a>
          </div>
        </>
      ),
    },
  },
];

export function Screen() {
  const [openId, setOpenId] = useState(null);
  const [origin, setOrigin] = useState(null);
  const openTile = TILES.find((tile) => tile.id === openId);

  const open = (id) => {
    // Measure the tile's media box before it unmounts so the expanded aside can grow out of it.
    const media = document.querySelector(`[data-media-origin="${id}"]`);
    setOrigin(media ? media.getBoundingClientRect() : null);
    setOpenId(id);
  };

  return (
    <div className="screen">
      <header className="screen-header">
        <p className="screen-name">{profile.name}</p>
        <p className="eyebrow">{profile.location} · Graduating December 2026 · Open to new grad roles</p>
      </header>

      <motion.div className="bento-grid" variants={gridVariants} initial="hidden" animate="shown">
        {TILES.map((tile) => (
          <motion.div variants={tileVariant} style={{ gridArea: tile.area }} key={tile.id}>
            {openId !== tile.id && <BentoTile id={tile.id} onOpen={open} {...tile.closed} />}
          </motion.div>
        ))}
      </motion.div>

      {openTile && (
        <TileExpanded
          key={openTile.id}
          eyebrow={openTile.expanded.eyebrow}
          title={openTile.expanded.title}
          aside={openTile.expanded.aside}
          hero={openTile.expanded.hero}
          origin={origin}
          onClose={() => setOpenId(null)}
        >
          {openTile.expanded.body}
        </TileExpanded>
      )}
    </div>
  );
}
