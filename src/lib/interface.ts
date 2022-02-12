import type { SpellType } from "./spell";

export type SpellStatus = 0 | 1;
export type SpellStatusArray = SpellStatus[];

export type FilterTypes = Record<SpellType, boolean>;
