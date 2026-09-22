// Content for the TateAI demo: a tiny "uploaded course" the demo tutor answers from.
// Replies are scripted — the demo shows the interaction model (voice in, scoped answers,
// explain-it-back prompts), not the production model.

export const course = 'Learning Science 101';

export const greeting =
  "Hi! I've read your notes for Learning Science 101. Ask me about anything in them — or pick a topic and explain it to me.";

export const suggestions = [
  'What is the production effect?',
  'Why is rereading worse than recall?',
  'How should I space my reviews?',
  'Explain dual coding',
];

export const notes = [
  {
    id: 'production',
    keywords: ['production', 'aloud', 'out loud', 'speak', 'saying', 'talk'],
    reply:
      "From your notes: saying material out loud makes it more memorable than reading it silently — that's the production effect. Speaking adds a distinct motor and auditory trace, so the memory has more hooks. Try it: explain it back to me in one sentence.",
  },
  {
    id: 'recall',
    keywords: ['recall', 'retriev', 'reread', 'testing', 'quiz', 'flashcard'],
    reply:
      "Rereading feels productive because the material looks familiar, but familiarity isn't memory. Pulling an answer out of your head — active recall — is what strengthens it. So instead of rereading the chapter, what's one thing you remember from it right now?",
  },
  {
    id: 'spacing',
    keywords: ['space', 'spacing', 'spaced', 'repetition', 'review', 'cram', 'forget'],
    reply:
      "Your notes cover spaced repetition: review just as you're about to forget. A good starting rhythm is one day, three days, a week, then two weeks. Cramming works for tomorrow's test and fades fast. When's your next exam? I can sketch a schedule.",
  },
  {
    id: 'dual',
    keywords: ['dual', 'visual', 'verbal', 'diagram', 'image', 'picture', 'slide'],
    reply:
      "Dual coding means pairing words with visuals so the idea is stored two ways. Your slides already give you the visual half — talking through them adds the verbal half. Pick one diagram from lecture 3 and describe it to me without looking.",
  },
  {
    id: 'metacognition',
    keywords: ['metacog', 'know what', 'self-assess', 'confiden', 'illusion', 'understand'],
    reply:
      "Metacognition is knowing what you actually know. Explaining out loud exposes the gaps fast — the moment you stall mid-sentence is the spot to study. Want to test it? Explain active recall to me, and I'll point out where it gets fuzzy.",
  },
];

export const offTopic =
  "That one isn't in the material you uploaded, so I'd rather not guess. I can help with the production effect, active recall, spaced repetition, dual coding, or metacognition.";

/** Scoped retrieval, demo-sized: the first note whose keywords appear in the question. */
export function answer(question) {
  const q = question.toLowerCase();
  return notes.find((note) => note.keywords.some((k) => q.includes(k)))?.reply ?? offTopic;
}

/** Student lines the card's live-transcript caption cycles through. */
export const cardLines = [
  'so the production effect means saying it out loud helps…',
  'wait, why does rereading feel like it works?',
  'okay let me explain active recall back to you…',
];
