<script setup lang="ts">
import type { SpellStatus, SpellStatusArray } from "@/lib/interface";
import { spells } from "@/lib/spell";
import { computed, ref } from "vue";
import { spellIcon, spellIconSrcset } from "../icon";

const props = defineProps<{
  spellStatus: SpellStatusArray;
}>();
const emit = defineEmits<{
  (e: "change", i: number, status: SpellStatus): void;
}>();

const pageSize = 16;
const pages = Math.ceil(spells.length / pageSize);

const page = ref(1);
const showSpells = computed(() =>
  spells.slice((page.value - 1) * pageSize, page.value * pageSize)
);

const countByPatch = (() => {
  const result: Record<string, number> = {};
  spells.forEach((i) => {
    result[i.patch] = (result[i.patch] || 0) + 1;
  });
  return result;
})();
const patches = Object.keys(countByPatch);

const progressByPatch = computed(() => {
  const result: Record<string, number> = {};
  spells.forEach((i, index) => {
    result[i.patch] =
      (result[i.patch] || 0) + (props.spellStatus[index] ? 1 : 0);
  });
  return result;
});

const progressAll = computed(() => {
  return props.spellStatus.filter((i) => i).length;
});

const handleClick = (i: number) => {
  setSpell(i, !props.spellStatus[i]);
};

const setSpell = (i: number, status: boolean) => {
  const val = status ? 1 : 0;
  if (props.spellStatus[i] === val) return;
  emit("change", i, val);
};

const batchSetSpell = (status: boolean, patch?: string) => {
  for (let i = 0; i < spells.length; i++) {
    if (patch && spells[i].patch !== patch) continue;
    setSpell(i, status);
  }
};
</script>

<template>
  <div class="spell-list">
    <h3>青魔法书</h3>
    <div class="spell-list-pager">
      <span
        v-for="p in pages"
        :key="p"
        @click="page = p"
        :class="{ active: page === p }"
        >{{ p }}</span
      >
    </div>
    <div
      v-for="(s, i) in showSpells"
      :key="s.no"
      class="spell"
      :class="{
        lighter: i % 2 === Math.floor(i / 4) % 2,
        learned: !!props.spellStatus[i],
      }"
      @click="handleClick(i)"
      :title="s.spell"
      :data-ck-action-id="s.action"
    >
      <img :src="spellIcon(s)" :srcset="spellIconSrcset(s)" />
      <span>{{ s.no }}</span>
    </div>
    <p class="spell-list-note">选中（已学习）的技能不会出现在获取方式中</p>
    <h3>进度</h3>
    <div class="spell-progress">
      <span>总体</span>
      <button @click="batchSetSpell(false)">清空</button>
      <progress :value="progressAll" :max="spells.length"></progress>
      <button @click="batchSetSpell(true)">全选</button>
    </div>
    <div v-for="patch in patches" :key="patch" class="spell-progress">
      <span>
        <span
          class="inst-version-tag"
          :class="{ ['inst-version-tag-' + patch.replace(/\./g, '-')]: true }"
          >{{ patch }}</span
        >
      </span>
      <button @click="batchSetSpell(false, patch)">清空</button>
      <progress
        :value="progressByPatch[patch]"
        :max="countByPatch[patch]"
      ></progress>
      <button @click="batchSetSpell(true, patch)">全选</button>
    </div>
  </div>
</template>

<style>
.spell-list {
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  width: 320px;
  margin-bottom: 20px;
  flex-shrink: 0;
  background: #2b2b2b;
}

.spell-list h3 {
  width: 100%;
  color: #fff;
}

.spell-progress {
  width: 100%;
  display: flex;
}

.spell-progress > span {
  width: 50px;
}

.spell-progress > progress {
  flex: 1;
}

.spell-list-pager {
  width: 100%;
  margin-bottom: 5px;
  color: #fff;
}

.spell-list-pager span {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  line-height: 16px;
  border: 1px solid transparent;
  border-radius: 2px;
  font-size: 14px;
  text-align: center;
}

.spell-list-pager span.active {
  text-shadow: 0 0 2px #ffbe31;
  border-color: #ffbe31;
}

.spell {
  position: relative;
  height: 64px;
  width: 80px;
  padding-top: 10px;
  padding-left: 24px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
}

.spell.lighter {
  background: #373737;
}

.spell img {
  display: block;
  margin: 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 3px;
  box-shadow: 0 2px 2px #070707;
  opacity: 0.4;
}

.spell.learned img {
  opacity: 1;
}

.spell span {
  color: #eee1c5;
  font-size: 12px;
  line-height: 16px;
}

.spell::before {
  position: absolute;
  top: 26px;
  left: 12px;
  display: block;
  width: 8px;
  height: 8px;
  content: "";
  background: #222;
  border: 2px solid #222;
}

.spell.learned::before {
  background: #ffbe31;
}

.spell-list-note {
  font-size: 14px;
}
</style>
