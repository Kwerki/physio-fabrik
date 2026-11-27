import { marked } from 'marked';

/** Absätze und **fett** / *kursiv* / Links aus dem CMS in HTML. */
export function absaetze(markdown: string): string {
  return marked.parse(markdown, { async: false, breaks: false }) as string;
}

/** Wie absaetze(), aber ohne umschließendes <p> — für einzeilige Texte. */
export function zeile(markdown: string): string {
  return marked.parseInline(markdown, { async: false }) as string;
}
