<template>
  <main class="spell-inst">
    <h3>可学习技能列表</h3>
    <p v-if="showSpells.length === 0">当前条件下暂无可学习的技能</p>
    <div v-for="s in showSpells" class="inst" :key="s.no">
      <img class="inst-spell-icon" :src="`icons/spells/${s.icon}`">
      <div class="inst-content">
        <h4>
          <span v-if="s.no > 80" class="inst-version-tag">5.45</span>{{" "}}
          <span>[{{s.no}}]</span>
          {{s.spell}}
          <small>(Lv.{{s.level}})</small>
        </h4>
        <ul>
          <li v-for="(m, mi) in s.method" :key="mi">
            <img class="inst-method-type" :src="`icons/type_${m.type}.png`">
            {{m | renderMethod}} <sup>Lv.{{m.level}}</sup>
            <p v-if="!!m.note">{{m.note}}</p>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    spells: Array,
    filterTypes: Object,
    filterLevel: Number,
    orderByLevel: Boolean
  },
  computed: {
    showSpells () {
      let spells = this.spells.filter(s => !s.learned && s.level <= this.filterLevel && s.method.some(m => this.filterTypes[m.type]))
      if (this.orderByLevel) {
        spells.sort((a, b) => a.level - b.level)
      }

      return spells
    }
  },
  filters: {
    renderMethod (method) {
      switch (method.type) {
        case 'map':
          {
            let pos = method.position
            return `${method.map} ${method.rank ? `[${method.rank}]` : ''}${pos && pos.length ? (typeof pos === 'string' ? `(${pos})` : `(x:${pos[0]}, y:${pos[1]}${pos[2] ? `, z:${pos[2]}` : ''})`) : ''} - ${method.mob}`
          }
        case 'raid':
        case 'dungeon':
        case 'trail':
          return `${method.name} - ${method.mob}`
        case 'fate':
          return `${method.map} - ${method.name} - ${method.mob}`
        case 'special':
          return `${method.text}`
      }
    }
  },
  methods: {
    handleClick (s, i) {
      s.learned = !s.learned
      this.$emit('change', i, s.learned)
    }
  }
}
</script>

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

.inst-content ul, .inst-content li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.inst-content li {
  margin: 0;
  line-height: 24px;
  font-size: 16px;
}

.inst-content p {
  margin: 0;
  line-height: 16px;
  font-size: 12px;
  opacity: 0.75;
  margin-left: 20px;
}

.inst-method-type {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.inst-version-tag {
  background-color: rgba(144, 103, 173);
  font-size: 90%;
  color: black !important;
  font-weight: bold;
  padding: 2px;
  border-radius: 5px;
}
</style>
