// stores the variables we'll need to parse comic script formatting

export const SPREAD = 'spread';
export const PANEL = 'panel';
export const PARAGRAPH = 'paragraph';
export const CAPTION = 'caption';
export const DIALOGUE = 'dialogue';
export const SFX = 'sfx';
export const METADATA = 'metadata';
export const BLANK = 'blank';
export const TEXT = 'text';
export const BOLD_TEXT = 'bold-text';
export const URL_TEXT = 'url-text';
export type NonUrlText = typeof TEXT | typeof BOLD_TEXT;
export type COMIC_NODE =
  | typeof SPREAD
  | typeof PANEL
  | typeof PARAGRAPH
  | typeof CAPTION
  | typeof DIALOGUE
  | typeof SFX
  | typeof METADATA
  | typeof BLANK;
export function isLettering(type: COMIC_NODE): boolean {
  return type === DIALOGUE || type === CAPTION || type === SFX;
}