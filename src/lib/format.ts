// Shared render-time text helpers for story blocks.

// Circled-number markers for the `numbered` block type: ① ② ③ …
// U+2460 is ①, and the range runs contiguously to ⑳ (U+2473). Past 20
// there's no clean contiguous run, so fall back to a plain "21." — a
// story list that long is a content smell anyway.
const CIRCLED_FIRST = 0x2460; // ①
const CIRCLED_MAX = 20;

export function circled(n: number): string {
  return n >= 1 && n <= CIRCLED_MAX
    ? String.fromCodePoint(CIRCLED_FIRST + n - 1)
    : `${n}.`;
}

// Minimal inline formatting for story block text (paragraph + list
// items). Deliberately NOT a Markdown parser: it HTML-escapes the
// string, then rewrites a small, fixed set of inline marks —
//   **bold**            → <strong>
//   [text](/url or http) → <a href>
// `*italic*` is intentionally left out: a lone "*" already appears in
// the copy as a footnote mark, so auto-italicising single stars would
// mangle real content. If the needs outgrow this, switch stories to
// MDX rather than growing this function.
// Output is fed through `set:html`, which is safe here because the
// only author is the site owner at build time.
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /\[(.+?)\]\((\/[^\s)]+|https?:\/\/[^\s)]+)\)/g,
      '<a href="$2">$1</a>',
    );
}
