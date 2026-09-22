import { motion } from 'framer-motion';

/**
 * Closed face of a bento tile. Optional `media` covers most of the tile — the right
 * side by default, or the top with `mediaPlacement="top"` for tall, narrow tiles.
 * Its box is tagged so the expanded view can grow out of it.
 */
export function BentoTile({ id, onOpen, eyebrow, title, teaser, tags, media, mediaPlacement = 'side', className = '' }) {
  return (
    <motion.div
      layout="position"
      className={`tile${media ? ` tile-with-media tile-media-${mediaPlacement}` : ''} ${className}`}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(id);
        }
      }}
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    >
      {media && (
        <div className="tile-media" data-media-origin={id}>
          {media}
        </div>
      )}
      <p className="eyebrow tile-eyebrow">{eyebrow}</p>
      <h3 className="tile-title display">{title}</h3>
      {teaser && <p className="tile-teaser">{teaser}</p>}
      {tags && (
        <div className="stack tile-tags">
          {tags.map((tag) => (
            <span className="stack-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
