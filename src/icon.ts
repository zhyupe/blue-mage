import type { Spell } from "./lib/spell";

export function spellIcon(s: Spell, book?: boolean) {
  return `icons/spells/${book ? s.icon_book : s.icon}`;
}

export function spellIconSrcset(s: Spell, book?: boolean) {
  return [
    `icons/spells/${book ? s.icon_book : s.icon} 1x`,
    `icons/spells/${book ? s.icon_book_hr1 : s.icon_hr1} 2x`,
  ].join(", ");
}
