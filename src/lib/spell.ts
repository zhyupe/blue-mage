import rawSpells from "../../tools/spells.json";

export enum SpellType {
  Map = "map",
  Raid = "raid",
  Dungeon = "dungeon",
  Trail = "trail",
  FATE = "fate",
  Special = "special",
}

export interface SpellMethodBase {
  type: SpellType;
  level: number;
  note?: string;
}

export interface SpellMethodMap extends SpellMethodBase {
  type: SpellType.Map;
  map: string;
  rank: string | null;
  position: [number, number] | [number, number, number] | number[];
  mob: string;
}

export interface SpellMethodInstance extends SpellMethodBase {
  type: SpellType.Raid | SpellType.Dungeon | SpellType.Trail;
  name: string;
  mob: string;
}

export interface SpellMethodFate extends SpellMethodBase {
  type: SpellType.FATE;
  map: string;
  name: string;
  mob: string;
}

export interface SpellMethodSpecial extends SpellMethodBase {
  type: SpellType.Special;
  text: string;
}

export type SpellMethod =
  | SpellMethodMap
  | SpellMethodSpecial
  | SpellMethodFate
  | SpellMethodInstance;

export interface Spell {
  no: string;
  action: number;
  patch: string;
  spell: string;
  level: number;
  icon: string;
  icon_hr1: string;
  icon_book: string;
  icon_book_hr1: string;
  method: SpellMethod[];
}

export const spells = rawSpells as Spell[];

export function renderSpellMethod(method: SpellMethod) {
  switch (method.type) {
    case SpellType.Map: {
      const pos = method.position;
      return `${method.map} ${method.rank ? `[${method.rank}]` : ""}${
        pos && pos.length
          ? typeof pos === "string"
            ? `(${pos})`
            : `(x:${pos[0]}, y:${pos[1]}${pos[2] ? `, z:${pos[2]}` : ""})`
          : ""
      } - ${method.mob}`;
    }
    case SpellType.Raid:
    case SpellType.Dungeon:
    case SpellType.Trail:
      return `${method.name} - ${method.mob}`;
    case SpellType.FATE:
      return `${method.map} - ${method.name} - ${method.mob}`;
    case SpellType.Special:
      return `${method.text}`;
  }
}
