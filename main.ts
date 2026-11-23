import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Six Words, One Story — candidate C (picked by the user, 2026-11-24).
// "He finally won the war. Alone."
// A victory emptied by its last word: the long struggle is won, and
// nobody is left to share it — the reader fills in who was lost.
const TEXT = "He finally won the war. Alone.";

// Sealed-gate guards: exactly six words, 1-60 UTF-8 characters, not blank.
const WORDS = TEXT.trim().split(/\s+/);
if (WORDS.length !== 6) throw new Error(`entry must be exactly 6 words, got ${WORDS.length}`);
const CHARS = [...TEXT].length;
if (CHARS < 1 || CHARS > 60) throw new Error(`entry must be 1-60 chars, got ${CHARS}`);
if (TEXT.trim().length === 0) throw new Error("entry must not be only whitespace");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = `${outDir}/entry.txt`;
writeFileSync(dst, TEXT, "utf8");
const written = readFileSync(dst, "utf8");
if (written !== TEXT) throw new Error("corrupt output: entry.txt bytes differ from the story");
console.log(`wrote ${CHARS} chars, ${WORDS.length} words: ${TEXT}`);
