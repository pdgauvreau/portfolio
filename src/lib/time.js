import { TODAY } from '../data/resume.js';

/** 'YYYY-MM' -> absolute month count. */
function months(ym) {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function label(ym) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTH_NAMES[m - 1]} ${y}`;
}

/** Human range for a tile's meta line. */
export function formatRange(start, end) {
  if (end === null) return `${label(start)} — Present`;
  if (end === start) return label(start);
  return `${label(start)} — ${label(end)}`;
}

/** True when today falls inside the entry's range. */
export function isCurrent(start, end) {
  const now = months(TODAY);
  return months(start) <= now && (end === null || months(end) >= now);
}
