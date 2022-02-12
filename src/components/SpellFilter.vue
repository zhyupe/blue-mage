<script setup lang="ts">
import type { FilterTypes } from "@/lib/interface";
import type { SpellType } from "@/lib/spell";

const props = defineProps<{
  filterTypes: FilterTypes;
  filterLevel: number;
  orderByLevel: boolean;
}>();

const emit = defineEmits<{
  (e: "levelChange", val: number): void;
  (e: "typeChange", val: SpellType, checked: boolean): void;
  (e: "orderChange", val: boolean): void;
}>();

const handleInput = (e: Event) => {
  let val = +(e?.target as any).value;
  if (isNaN(val)) val = 70;
  emit("levelChange", val);
};

const handleClick = (type: SpellType, checked: boolean) => {
  emit("typeChange", type, !checked);
};

const handleOrder = (order: boolean) => {
  emit("orderChange", !order);
};
</script>

<template>
  <div class="spell-filter">
    <h3>角色等级</h3>
    <div class="spell-level">
      <input
        type="number"
        max="70"
        min="1"
        :value="props.filterLevel"
        @input="handleInput"
      />
      <div
        class="spell-level-order"
        :class="{ checked: props.orderByLevel }"
        @click="handleOrder(props.orderByLevel)"
      >
        按等级排序
      </div>
    </div>

    <h3>学习途径过滤</h3>
    <ul>
      <li
        v-for="(checked, type, i) in filterTypes"
        :key="type"
        class="type"
        :class="{
          lighter: i % 2 === 0,
          checked: checked,
        }"
        @click="handleClick(type, checked)"
      >
        <img :src="`icons/type_${type}.png`" />
      </li>
    </ul>
  </div>
</template>

<style>
.spell-filter {
  user-select: none;
  margin-bottom: 20px;
}

.spell-filter input {
  padding: 0 10px;
  line-height: 32px;
  background: #333;
  color: #fff;
  border: 1px solid #333;
  border-radius: 16px;
}

.spell-filter h3:first-child {
  margin-top: 0;
}

.spell-level {
  display: flex;
}

.spell-level-order {
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
}

.spell-filter ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
  list-style: none;
}

.spell-filter .type {
  position: relative;
  padding: 10px 0 6px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.spell-filter img {
  width: 32px;
  height: 32px;
}

.spell-filter .type.lighter {
  background: #373737;
}

.spell-filter .type::after,
.spell-level-order::before {
  display: block;
  width: 8px;
  height: 8px;
  content: "";
  background: #222;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.spell-level-order::before {
  margin-right: 6px;
}

.spell-filter .type::after {
  margin-top: 6px;
}

.spell-filter .type.checked::after,
.spell-level-order.checked::before {
  background: #ffbe31;
}
</style>
