import { useEffect, useRef, useState } from 'react';
import { Waveform } from './Waveform.jsx';
import { answer, course, greeting, suggestions } from '../data/tate.js';

const Recognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

/**
 * "Talk to Tate" — a browser-only demo of TateAI's interaction model: speak (live
 * transcription via the Web Speech API) or type, and get a streamed, spoken reply
 * scoped to a sample course. Replies are scripted; see data/tate.js.
 */
export function TalkDemo() {
  const [messages, setMessages] = useState([{ role: 'tate', text: greeting }]);
  const [interim, setInterim] = useState('');
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [draft, setDraft] = useState('');
  const [notice, setNotice] = useState('');
  const recognitionRef = useRef(null);
  const logRef = useRef(null);
  const timers = useRef([]);
  const voiceOnRef = useRef(voiceOn);
  voiceOnRef.current = voiceOn;

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, interim]);

  useEffect(
    () => () => {
      recognitionRef.current?.abort();
      window.speechSynthesis?.cancel();
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const ask = (question) => {
    const q = question.trim();
    if (!q || speaking) return;
    const reply = answer(q);
    const words = reply.split(' ');
    setMessages((m) => [...m, { role: 'you', text: q }, { role: 'tate', text: '', pending: true }]);
    setSpeaking(true);

    if (voiceOnRef.current && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    }

    // Stream the reply in word by word, the way a real response arrives.
    words.forEach((_, i) =>
      later(
        () =>
          setMessages((m) => {
            const next = [...m];
            next[next.length - 1] = { role: 'tate', text: words.slice(0, i + 1).join(' '), pending: i < words.length - 1 };
            return next;
          }),
        450 + i * 55,
      ),
    );
    later(() => setSpeaking(false), 450 + words.length * 55);
  };

  const listen = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    window.speechSynthesis?.cancel();
    setNotice('');
    const recognition = new Recognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
    let finalText = '';

    recognition.onresult = (e) => {
      let live = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript;
        else live += e.results[i][0].transcript;
      }
      setInterim((finalText + ' ' + live).trim());
    };
    recognition.onerror = (e) => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') setNotice('Microphone access was blocked — you can type instead.');
      else if (e.error === 'no-speech') setNotice("Didn't catch that — try again, or type below.");
    };
    recognition.onend = () => {
      setListening(false);
      setInterim('');
      if (finalText) ask(finalText);
    };

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const submit = (e) => {
    e.preventDefault();
    ask(draft);
    setDraft('');
  };

  return (
    <div className="talk">
      <div className="talk-window">
        <header className="talk-head">
          <span className="talk-brand">
            TATE <b>AI</b>
          </span>
          <span className="talk-course">{course} · sample course</span>
          <button
            className="talk-voice"
            onClick={() => {
              if (voiceOn) window.speechSynthesis?.cancel();
              setVoiceOn(!voiceOn);
            }}
            aria-pressed={voiceOn}
          >
            {voiceOn ? 'Voice on' : 'Voice off'}
          </button>
        </header>

        <div className="talk-log" ref={logRef} aria-live="polite">
          {messages.map((m, i) => (
            <p key={i} className={`talk-msg talk-${m.role}${m.pending ? ' is-pending' : ''}`}>
              {m.text || '…'}
            </p>
          ))}
          {listening && <p className="talk-msg talk-you is-live">{interim || 'Listening…'}</p>}
        </div>

        <div className="talk-controls">
          <Waveform className="talk-wave" bars={36} idle={0.08} active={listening || speaking} />
          {Recognition ? (
            <button className={`talk-mic${listening ? ' is-on' : ''}`} onClick={listen} disabled={speaking}>
              {listening ? '■ Stop' : '● Tap and speak'}
            </button>
          ) : (
            <p className="talk-note">Voice input needs Chrome or Edge — type or pick a question below.</p>
          )}
          {notice && <p className="talk-note">{notice}</p>}

          <div className="talk-chips">
            {suggestions.map((s) => (
              <button key={s} className="stack-tag talk-chip" onClick={() => ask(s)} disabled={speaking || listening}>
                {s}
              </button>
            ))}
          </div>

          <form className="talk-form" onSubmit={submit}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Or type a question…"
              aria-label="Ask Tate a question"
            />
            <button type="submit" disabled={!draft.trim() || speaking}>
              Ask
            </button>
          </form>
        </div>
      </div>
      <p className="site-frame-caption">
        Interactive demo · replies scripted from a sample course · voice is transcribed by your browser
      </p>
    </div>
  );
}
