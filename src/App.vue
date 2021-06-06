<template>
  <div id="app">
    <aside>
      <SpellFilter
        :filterTypes="filterTypes"
        :filterLevel="filterLevel"
        :orderByLevel="orderByLevel"
        @typeChange="handleTypeChange"
        @levelChange="handleLevelChange"
        @orderChange="handleOrderChange"
      />
      <SpellList :spells="spells" @change="handleStatusChange" />
    </aside>
    <SpellInst
      :filterTypes="filterTypes"
      :filterLevel="filterLevel"
      :spells="spells"
      :orderByLevel="orderByLevel"
    />
  </div>
</template>

<script>
import SpellList from './components/SpellList.vue'
import SpellInst from './components/SpellInstruction.vue'
import SpellFilter from './components/SpellFilter.vue'
import spells from '../tools/spells.json'

const loadSetting = function (key) {
  let text
  if (localStorage) {
    text = localStorage.getItem(key)
  } else {
    let cookie = document.cookie
    let pos = cookie.indexOf(key + '=')
    if (pos >= 0) {
      pos += key.length + 1
      let endPos = cookie.indexOf(';', pos)
      text = cookie.substr(pos, endPos === -1 ? undefined : (endPos - pos))
    }
  }

  if (!text) return

  try {
    return JSON.parse(text)
  } catch (e) {
    return
  }
}

const saveSetting = function (key, value) {
  value = JSON.stringify(value)

  if (localStorage) {
    localStorage.setItem(key, value)
  } else {
    let expire = new Date()
    expire.setFullYear(expire.getFullYear() + 10)
    document.cookie = `${key}=${value};expires=${expire.toUTCString()};path=/`
  }
}

const loadSpellStatus = function () {
  let statusArr = loadSetting('spell-status') || []

  if (!Array.isArray(statusArr)) {
    statusArr = []
  }

  spells.forEach((row, index) => {
    row.learned = !!statusArr[index]
  })
}

loadSpellStatus()

export default {
  name: 'app',
  data () {
    return {
      spells,
      filterTypes: Object.assign({
        special: true,
        map: true,
        fate: true,
        dungeon: true,
        trail: true,
        raid: true,
      }, loadSetting('filter-types') || {}),
      filterLevel: loadSetting('filter-level') || 70,
      orderByLevel: loadSetting('order-by-level') || false
    }
  },
  components: {
    SpellList,
    SpellInst,
    SpellFilter
  },
  methods: {
    handleStatusChange (index, learned) {
      spells[index].learned = learned
      let statusArr = spells.map(({ learned }) => learned ? 1 : 0)
      saveSetting('spell-status', statusArr)
    },
    handleTypeChange (type, checked) {
      this.$set(this.filterTypes, type, checked)
      saveSetting('filter-types', this.filterTypes)
    },
    handleLevelChange (val) {
      this.filterLevel = val
      saveSetting('filter-level', val)
    },
    handleOrderChange (val) {
      this.orderByLevel = val
      saveSetting('order-by-level', val)
    }
  }
}
</script>

<style>
body {
  background: #2b2b2b;
  color: #fff;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
</style>
