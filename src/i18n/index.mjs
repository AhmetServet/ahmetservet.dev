import en from './en.json';
import tr from './tr.json';

export const copy = { en, tr };

export function rootFor(lang) {
  return lang === 'tr' ? '/tr/' : '/';
}
