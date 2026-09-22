import { useEffect, useRef, useState } from 'react';

// The site is laid out at a fixed desktop width and scaled to fit, so it always sees
// its desktop breakpoint and never re-lays out while the frame grows open.
const VIRTUAL_WIDTH = 1280;

/** A live, interactive site embedded in a minimal browser window. */
export function SiteFrame({ url, title, poster }) {
  const viewRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [box, setBox] = useState(null);
  const host = new URL(url).host;

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return undefined;
    let settle;
    const measure = () => {
      const { width, height } = view.getBoundingClientRect();
      if (!width || !height) return;
      setBox((current) => ({ width, height, virtualHeight: current?.virtualHeight }));
      // Only commit a new page height once resizing stops (the grow-in, a window drag).
      clearTimeout(settle);
      settle = setTimeout(() => {
        setBox({ width, height, virtualHeight: Math.round((height * VIRTUAL_WIDTH) / width) });
      }, 250);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(view);
    return () => {
      clearTimeout(settle);
      observer.disconnect();
    };
  }, []);

  const scale = box ? box.width / VIRTUAL_WIDTH : 1;
  const virtualHeight = box?.virtualHeight;

  return (
    <div className="site-frame">
      <div className="site-frame-window">
        <div className="site-frame-bar">
          <span className="site-frame-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="site-frame-url">{host}</span>
          <a className="site-frame-open" href={url} target="_blank" rel="noopener">
            Open ↗
          </a>
        </div>
        <div className="site-frame-view" ref={viewRef} style={poster ? { backgroundImage: `url(${poster})` } : undefined}>
          {virtualHeight && (
            <iframe
              className={loaded ? 'is-loaded' : ''}
              src={url}
              title={title}
              onLoad={() => setLoaded(true)}
              style={{ width: VIRTUAL_WIDTH, height: virtualHeight, transform: `scale(${scale})` }}
            />
          )}
        </div>
      </div>
      <p className="site-frame-caption">Live site · scroll inside to explore</p>
    </div>
  );
}
