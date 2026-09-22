/** Card face for the résumé: page one as a tilted sheet that squares up on hover. */
export function ResumePaper({ src }) {
  return (
    <div className="paper-stage">
      <img className="paper" src={src} alt="" draggable="false" />
    </div>
  );
}

/** Expanded view: the résumé pages as a scrollable stack, with download/open actions. */
export function ResumeViewer({ pages, pdf }) {
  return (
    <div className="resume-viewer">
      <div className="resume-toolbar">
        <span className="site-frame-caption">Résumé · {pages.length === 1 ? '1 page' : `${pages.length} pages`}</span>
        <a className="site-frame-open" href={pdf} target="_blank" rel="noopener">
          Open PDF ↗
        </a>
        <a className="site-frame-open" href={pdf} download>
          Download ↓
        </a>
      </div>
      <div className="resume-pages">
        {pages.map((src, i) => (
          <img key={src} className="resume-page" src={src} alt={`Résumé page ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
