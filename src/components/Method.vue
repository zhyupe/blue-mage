<script setup lang="ts">
import { renderSpellMethod } from "../lib/spell";
import type { SpellMethod } from "../lib/spell";
import { computed } from "vue";

const props = defineProps<{
  method: SpellMethod;
}>();

const text = computed(() => renderSpellMethod(props.method));
</script>

<template>
  <div class="wrap">
    <img class="type" :src="`icons/type_${props.method.type}.png`" />
    {{ text }} <sup>Lv.{{ props.method.level }}</sup>
    <p v-if="!!props.method.note" class="note">{{ props.method.note }}</p>
  </div>
</template>

<style scoped>
.wrap {
  margin: 0;
  line-height: 24px;
  font-size: 16px;
}

.type {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.note {
  margin: 0;
  line-height: 16px;
  font-size: 12px;
  opacity: 0.75;
  margin-left: 20px;
}
</style>
