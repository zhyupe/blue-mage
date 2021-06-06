export function spellIcon(s, book) {
  return `icons/spells/${book ? s.icon_book : s.icon}`
}

export function spellIconSrcset(s, book) {
  return [
    `icons/spells/${book ? s.icon_book : s.icon} 1x`,
    `icons/spells/${book ? s.icon_book_hr1 : s.icon_hr1} 2x`,
  ].join(', ')
}