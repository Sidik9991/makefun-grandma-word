// One Word From Grandma — make.fun bounty u-0xkianno-one-word-from-grandma-f04bed16
//
// The brief: exactly ONE word, the single word a grandma would text about AI.
// The judge weighs, in order: (1) reads as a grandma's text about AI, (2) warm
// and a little baffled, her own texting voice, (3) funny in one word with no
// caption, (4) tied to AI / robots / machines, (5) fresh, instantly readable.
//
// Every candidate below is scored on those five criteria, each 0-2, weighted
// 3 / 3 / 2 / 1 / 2 following the brief's own order (max 22). The program
// picks the highest score at runtime; ties break toward fewer bytes, which is
// also the judge's own tie-break (smaller text wins an exact tie).
//
// Why "Beep" leads: it is not a word ABOUT robots, it is a grandma DOING a
// robot — the baffled imitation she would thumb-type after her grandchild
// explains AI for the third time. Four letters, no explanation needed, and
// nobody else's grandma texts a paragraph when a sound will do.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Scores = [number, number, number, number, number]; // c1..c5, each 0-2

interface Candidate {
  word: string;
  scores: Scores;
  why: string;
}

const WEIGHTS: Scores = [3, 3, 2, 1, 2];

const CANDIDATES: Candidate[] = [
  {
    word: "Beep",
    scores: [2, 2, 2, 2, 2],
    why: "Grandma imitating the robot instead of describing it: warm, baffled, funny with zero context, unmistakably machine, and nobody's obvious pick. Four bytes.",
  },
  {
    word: "Roomba",
    scores: [2, 2, 1, 2, 2],
    why: "The one robot she actually owns and names like a pet. Warm and real, but the joke needs knowing what a Roomba is, so it lands softer on its own.",
  },
  {
    word: "Skynet",
    scores: [1, 1, 2, 2, 1],
    why: "The worried-grandma movie reference: funny as a fear, but it is a film title first and her voice second, and half the field will reach for it.",
  },
  {
    word: "Boop",
    scores: [1, 2, 1, 1, 1],
    why: "Cute robot noise, warm and playful, but it could be about a dog's nose as easily as AI, so the machine tie is thin.",
  },
  {
    word: "Alexa",
    scores: [2, 1, 1, 2, 0],
    why: "Believable — to her, AI literally IS Alexa — but it is the most obvious word in the field and carries no joke of its own.",
  },
  {
    word: "Terminator",
    scores: [1, 1, 1, 2, 0],
    why: "Same movie fear as Skynet, longer and even more expected; reads like a film poster, not a text from grandma.",
  },
  {
    word: "Robot",
    scores: [1, 1, 0, 2, 0],
    why: "Tied to machines and nothing else: the plainest possible answer, no warmth, no joke, no grandma in it.",
  },
  // --- Second pass: three new challengers, judged against the same brief. ---
  {
    word: "Robo",
    scores: [2, 2, 1, 2, 1],
    why: "Grandma shortening the word the way she shortens everything — believable thumb-typing, warm, clearly machine. But it is a label, not a joke: it describes the robot where Beep performs it.",
  },
  {
    word: "Beepboop",
    scores: [1, 2, 2, 2, 1],
    why: "The full robot imitation, funnier in isolation than Beep alone — but eight letters of sound effect starts to feel like a performance, less like the single startled word she would actually send.",
  },
  {
    word: "Prayers",
    scores: [1, 2, 1, 0, 1],
    why: "Pure grandma — her answer to everything, including AI. Warm and true to her voice, but it would fit any subject at all, so the AI tie the judge weighs is missing entirely.",
  },
];

function score(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(): Candidate {
  const ranked = [...CANDIDATES].sort((a, b) => {
    const byScore = score(b) - score(a);
    if (byScore !== 0) return byScore;
    return Buffer.byteLength(a.word, "utf8") - Buffer.byteLength(b.word, "utf8");
  });
  return ranked[0];
}

const winner = pickWinner();
const word = winner.word;

// Gate: /output/entry.txt must be UTF-8, 1-30 chars, non-blank, exactly one word.
if (!/^\S+$/.test(word)) throw new Error(`not exactly one word: ${JSON.stringify(word)}`);
if (word.length < 1 || word.length > 30) {
  throw new Error(`word must be 1-30 chars, got ${word.length}: ${word}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", word, "utf8");

// Re-read and validate what actually landed on disk; fail loudly otherwise.
const written = readFileSync("/output/entry.txt", "utf8");
const bytes = Buffer.byteLength(written, "utf8");
if (written !== word) throw new Error(`entry.txt mismatch: ${JSON.stringify(written)}`);
if (!/^\S+$/.test(written) || written.length < 1 || written.length > 30) {
  throw new Error(`entry.txt fails the gate: ${JSON.stringify(written)}`);
}

console.log(`winner: ${JSON.stringify(word)} (${score(winner)}/22, ${written.length} chars, ${bytes} bytes)`);
console.log(`why: ${winner.why}`);
