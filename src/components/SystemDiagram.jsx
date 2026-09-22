import { useEffect, useRef, useState } from 'react';
import { useHoverRamp } from '../lib/useHoverRamp.js';

// Illustrative only — a simplified picture of a risk-modeling platform, not Milliman's
// actual architecture. Coordinates are in the SVG's 420×240 viewBox.
const NODES = [
  {
    id: 'feed',
    label: 'Market data',
    x: 62,
    y: 58,
    about: 'Prices and positions stream in. Every calculation downstream starts from this data.',
  },
  {
    id: 'engine',
    label: 'Risk engine',
    tag: 'C# · .NET',
    x: 210,
    y: 120,
    about:
      'The core service. It breaks a risk run into scenarios, hands them out, and collects the results. Most of the internship was production C# in this kind of large, existing codebase.',
  },
  {
    id: 'workers',
    label: 'Scenario workers',
    x: 360,
    y: 120,
    stack: [45, 120, 195],
    about:
      'Workers run portfolios through stressed markets in parallel. The engine talks to them over .NET remoting on TCP: it calls methods on remote objects as if they were local, and the framework handles the network in between.',
  },
  {
    id: 'desk',
    label: 'Trading desk',
    x: 62,
    y: 182,
    about: 'Combined results go back to the people making trading and hedging decisions, so correctness and latency both matter.',
  },
];

// Quadratic curves: from → to with control point c. `back` sends packets both ways.
const EDGES = [
  { from: [62, 58], to: [210, 120], c: [150, 58], nodes: ['feed', 'engine'] },
  { from: [210, 120], to: [62, 182], c: [150, 182], nodes: ['engine', 'desk'] },
  { from: [210, 120], to: [360, 45], c: [300, 45], nodes: ['engine', 'workers'], back: true },
  { from: [210, 120], to: [360, 120], c: [285, 120], nodes: ['engine', 'workers'], back: true },
  { from: [210, 120], to: [360, 195], c: [300, 195], nodes: ['engine', 'workers'], back: true },
];

const PACKETS = EDGES.flatMap((edge, e) => [
  { edge: e, offset: 0, dir: 1 },
  { edge: e, offset: 0.5, dir: 1 },
  ...(edge.back ? [{ edge: e, offset: 0.25, dir: -1 }] : []),
]);

const pointAt = ({ from, to, c }, u) => [
  (1 - u) ** 2 * from[0] + 2 * (1 - u) * u * c[0] + u ** 2 * to[0],
  (1 - u) ** 2 * from[1] + 2 * (1 - u) * u * c[1] + u ** 2 * to[1],
];

/**
 * Animated service diagram: packets travel the TCP links between services. Compact mode
 * (card face) is label-free and speeds up while its tile is hovered; the full mode
 * labels every node and explains whichever one is selected.
 */
export function SystemDiagram({ compact = false, idleSpeed = 0.35, hoverSpeed = 1.2 }) {
  const rootRef = useRef(null);
  const packetRefs = useRef([]);
  const speed = useRef(compact ? idleSpeed : 1);
  const [selected, setSelected] = useState('engine');

  useHoverRamp(rootRef, {
    idle: compact ? idleSpeed : 1,
    hover: compact ? hoverSpeed : 1,
    apply: (rate) => {
      speed.current = rate;
    },
  });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let progress = 0;
    let last = performance.now();
    let frame;
    const tick = (now) => {
      progress += ((now - last) / 1000) * 0.45 * speed.current * (reduced ? 0.25 : 1);
      last = now;
      PACKETS.forEach((packet, i) => {
        const el = packetRefs.current[i];
        if (!el) return;
        const u = (progress + packet.offset) % 1;
        const [x, y] = pointAt(EDGES[packet.edge], packet.dir > 0 ? u : 1 - u);
        el.setAttribute('cx', x.toFixed(1));
        el.setAttribute('cy', y.toFixed(1));
        // Fade in and out at the ends so packets don't pop.
        el.setAttribute('opacity', Math.min(1, u * 6, (1 - u) * 6).toFixed(2));
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const active = (edge) => !compact && edge.nodes.includes(selected);
  const current = NODES.find((n) => n.id === selected);

  return (
    <div className={`system${compact ? ' system-compact' : ''}`} ref={rootRef}>
      <svg viewBox="0 0 420 240" role={compact ? undefined : 'group'} aria-hidden={compact || undefined}>
        {EDGES.map((edge, i) => (
          <path
            key={i}
            className={`system-edge${active(edge) ? ' is-active' : ''}`}
            d={`M${edge.from} Q${edge.c} ${edge.to}`}
          />
        ))}
        {!compact && (
          <text className="system-proto" x="285" y="113" textAnchor="middle">
            TCP
          </text>
        )}
        {PACKETS.map((packet, i) => (
          <circle
            key={i}
            className={`system-packet${packet.dir < 0 ? ' is-return' : ''}`}
            r={compact ? 3.2 : 2.6}
            ref={(el) => {
              packetRefs.current[i] = el;
            }}
          />
        ))}
        {NODES.map((node) =>
          (node.stack ?? [node.y]).map((y, k) => (
            <g
              key={`${node.id}-${k}`}
              className={`system-node system-node-${node.id}${!compact && selected === node.id ? ' is-selected' : ''}`}
              transform={`translate(${node.x} ${y})`}
              {...(!compact && {
                role: 'button',
                tabIndex: k === 0 ? 0 : -1,
                'aria-pressed': selected === node.id,
                'aria-label': node.label,
                onClick: () => setSelected(node.id),
                onKeyDown: (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected(node.id);
                  }
                },
              })}
            >
              {compact ? (
                <circle r={node.id === 'engine' ? 11 : 7.5} />
              ) : (
                <>
                  <rect x="-48" y="-15" width="96" height="30" rx="8" />
                  <text y={node.tag ? -2 : 4} textAnchor="middle">
                    {node.stack ? `Worker ${k + 1}` : node.label}
                  </text>
                  {node.tag && (
                    <text className="system-tag" y="10" textAnchor="middle">
                      {node.tag}
                    </text>
                  )}
                </>
              )}
            </g>
          )),
        )}
      </svg>

      {!compact && (
        <div className="system-about" aria-live="polite">
          <p className="eyebrow">{current.label}</p>
          <p>{current.about}</p>
        </div>
      )}
    </div>
  );
}
