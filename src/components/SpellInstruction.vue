<script setup lang="ts">
import { computed } from "vue";
import { spellIcon, spellIconSrcset } from "../icon";
import SpellMethod from "./Method.vue";
import { spells, SpellType } from "../lib/spell";

const props = defineProps<{
  filterTypes: Record<SpellType, boolean>;
  filterLevel: number;
  orderByLevel: boolean;
  spellStatus: Array<0 | 1>;
}>();

const showSpells = computed(() => {
  const filtered = spells.filter(
    (spell, index) =>
      !props.spellStatus[index] &&
      spell.level <= props.filterLevel &&
      spell.method.some((m) => props.filterTypes[m.type])
  );
  if (props.orderByLevel) {
    filtered.sort((a, b) => a.level - b.level);
  }

  return filtered;
});
</script>

<template>
  <main class="spell-inst">
    <h3>可学习技能列表</h3>
    <p v-if="showSpells.length === 0">当前条件下暂无可学习的技能</p>
    <div v-for="s in showSpells" class="inst" :key="s.no">
      <img
        class="inst-spell-icon"
        :src="spellIcon(s, true)"
        :srcset="spellIconSrcset(s, true)"
        :data-ck-action-id="s.action"
      />
      <div class="inst-content">
        <h4>
          <span
            class="inst-version-tag"
            :class="{
              ['inst-version-tag-' + s.patch.replace(/\./g, '-')]: true,
            }"
            >{{ s.patch }}</span
          >{{ " " }}
          <span>[{{ s.no }}]</span>
          {{ s.spell }}
          <small>(Lv.{{ s.level }})</small>
        </h4>
        <ul>
          <li v-for="(m, mi) in s.method" :key="mi">
            <spell-method :method="m" />
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style>
.spell-inst h3 {
  margin-top: 0;
}

.inst {
  min-height: 48px;
  padding: 10px;
}

.inst-spell-icon {
  float: left;
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 5px;
  box-shadow: 0 2px 2px #070707;
}

.inst-content {
  overflow: hidden;
  color: #fff;
}

.inst-content h4 {
  margin: 0;
  line-height: 24px;
  font-size: 16px;
  font-weight: normal;
}

.inst-content h4 span {
  color: #eee1c5;
}

.inst-content ul,
.inst-content li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
