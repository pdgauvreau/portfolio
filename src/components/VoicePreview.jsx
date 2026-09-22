import { useEffect, useRef, useState } from 'react';
import { Waveform } from './Waveform.jsx';
import { cardLines } from '../data/tate.js';

/**
 * TateAI card face: a waveform that wakes on hover, with a caption that fills in word
 * by word like live transcription, cycling through sample student lines.
 */
export function VoicePreview() {
  const rootRef = useRef(null);
  const [line, setLine] = useState(0);
  const [words, setWords] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const host = rootRef.current?.closest('.tile');
    if (!host) return undefined;
    const on = () => setLive(true);
    const off = () => setLive(false);
    host.addEventListener('mouseenter', on);
    host.addEventListener('mouseleave', off);
    host.addEventListener('focus', on);
    host.addEventListener('blur', off);
    return () => {
      host.removeEventListener('mouseenter', on);
      host.removeEventListener('mouseleave', off);
      host.removeEventListener('focus', on);
      host.removeEventListener('blur', off);
    };
  }, []);

  useEffect(() => {
    if (!live) return undefined;
    const total = cardLines[line].split(' ').length;
    // Words arrive at speaking pace; after a beat, move on to the next line.
    const timer = setTimeout(
      () => {
        if (words < total) setWords(words + 1);
        else {
          setWords(0);
          setLine((line + 1) % cardLines.length);
        }
      },
      words < total ? 170 + Math.random() * 120 : 1400,
    );
    return () => clearTimeout(timer);
  }, [live, line, words]);

  const text = cardLines[line].split(' ').slice(0, words).join(' ');

  return (
    <div className="voice-preview" ref={rootRef}>
      <Waveform />
      <p className={`voice-caption${live ? ' is-live' : ''}`}>
        <span className="voice-dot" aria-hidden="true" />
        {live && text ? `“${text}”` : 'Tap to talk'}
      </p>
    </div>
  );
}
