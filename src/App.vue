<script setup lang="ts">
import SpellList from "./components/SpellList.vue";
import SpellInst from "./components/SpellInstruction.vue";
import SpellFilter from "./components/SpellFilter.vue";
import spells from "../tools/spells.json";
import { loadSetting, saveSetting } from "./lib/setting";
import { onBeforeMount, ref } from "vue";
import type { SpellType } from "./lib/spell";
import type {
  FilterTypes,
  SpellStatus,
  SpellStatusArray,
} from "./lib/interface";

const spellStatus = ref<SpellStatusArray>([]);
const filterTypes = ref<FilterTypes>({
  special: true,
  map: true,
  fate: true,
  dungeon: true,
  trail: true,
  raid: true,
});
const filterLevel = ref(70);
const orderByLevel = ref(false);

onBeforeMount(() => {
  let statusArr = loadSetting<SpellStatusArray>("spell-status") || [];
  if (!Array.isArray(statusArr)) {
    statusArr = [];
  }

  spellStatus.value = statusArr;
  filterTypes.value = {
    ...filterTypes.value,
    ...(loadSetting("filter-types") || {}),
  };
  filterLevel.value = loadSetting("filter-level") || 70;
  orderByLevel.value = loadSetting("order-by-level") || false;
});

const handleStatusChange = (index: number, learned: SpellStatus) => {
  const statusArr: SpellStatusArray = spells.map((_, i) =>
    i === index ? learned : spellStatus.value[i] || 0
  );
  saveSetting("spell-status", statusArr);
  spellStatus.value = statusArr;
};

const handleTypeChange = (type: SpellType, checked: boolean) => {
  filterTypes.value = {
    ...filterTypes.value,
    [type]: checked,
  };
  saveSetting("filter-types", filterTypes.value);
};

const handleLevelChange = (val: number) => {
  filterLevel.value = val;
  saveSetting("filter-level", val);
};

const handleOrderChange = (val: boolean) => {
  orderByLevel.value = val;
  saveSetting("order-by-level", val);
};
</script>

<template>
  <section>
    <aside>
      <SpellFilter
        :filterTypes="filterTypes"
        :filterLevel="filterLevel"
        :orderByLevel="orderByLevel"
        @typeChange="handleTypeChange"
        @levelChange="handleLevelChange"
        @orderChange="handleOrderChange"
      />
      <SpellList
        :spells="spells"
        :spellStatus="spellStatus"
        @change="handleStatusChange"
      />
    </aside>
    <SpellInst
      :filterTypes="filterTypes"
      :filterLevel="filterLevel"
      :spells="spells"
      :spellStatus="spellStatus"
      :orderByLevel="orderByLevel"
    />
  </section>
</template>

<style>
body {
  background: #2b2b2b;
  color: #fff;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  padding-top: 20px;
  padding-left: 20px;
}

#app aside {
  width: 320px;
}

@media (min-width: 1000px) {
  #app {
    padding-left: 360px;
  }

  #app aside {
    position: fixed;
    top: 20px;
    left: 20px;
  }
}

.inst-version-tag {
  background-color: rgba(144, 103, 173);
  font-size: 90%;
  color: black !important;
  font-weight: bold;
  padding: 2px;
  border-radius: 5px;
}

.inst-version-tag-4-5 {
  background-color: rgba(228, 101, 124);
}

.inst-version-tag-5-15 {
  background-color: rgba(127, 15, 170);
}

.inst-version-tag-5-45 {
  background-color: rgba(144, 103, 173);
}
</style>
