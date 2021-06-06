<template>
  <div class="spell-list">
    <h3>青魔法书</h3>
    <div class="spell-list-pager">
      <span v-for="p in pages" :key="p" @click="page = p" :class="{ active: page === p }">{{p}}</span>
    </div>
    <div v-for="(s, i) in showSpells" :key="s.no" class="spell" :class="{
      lighter: (i % 2) === (Math.floor(i / 4) % 2),
      learned: !!s.learned
    }" @click="handleClick(s, s.no - 1)" :title="s.spell ">
      <img :src="spellIcon(s)" :srcset="spellIconSrcset(s)">
      <span>{{s.no}}</span>
    </div>
    <p class="spell-list-note">选中（已学习）的技能不会出现在获取方式中</p>
    <h3>进度</h3>
    <div class="spell-progress">
      <span>总体</span>
      <button @click="selectNone()">清空</button>
      <progress :value="progressAll" :max="spells.length"></progress>
      <button @click="selectAll()">全选</button>
    </div>
    <div v-for="(patch) in patches" :key="patch" class="spell-progress">
      <span>
        <span class="inst-version-tag" :class="{ ['inst-version-tag-' + patch.replace(/\./g, '-')]: true }">{{ patch }}</span>
      </span>
      <button @click="selectNone(patch)">清空</button>
      <progress :value="progressByPatch[patch]" :max="countByPatch[patch]"></progress>
      <button @click="selectAll(patch)">全选</button>
    </div>
  </div>
</template>

<script>
import { spellIcon, spellIconSrcset } from '../icon'

export default {
  props: {
    spells: Array
  },
  data () {
    return {
      page: 1
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.spells.length / 16)
    },
    showSpells () {
      return this.spells.slice((this.page - 1) * 16, this.page * 16)
    },
    patches () {
      return [...new Set(this.spells.map((i) => i.patch))]
    },
    countByPatch () {
      const result = {}
      this.spells.forEach((i) => {
        result[i.patch] = (result[i.patch] || 0) + 1
      })
      return result
    },
    progressByPatch () {
      const result = {}
      this.spells.forEach((i) => {
        result[i.patch] = (result[i.patch] || 0) + (i.learned ? 1 : 0)
      })
      return result
    },
    progressAll () {
      return this.spells.filter((i) => i.learned).length
    },
  },
  methods: {
    handleClick (s, i) {
      this.setSpell(i, !s.learned)
    },
    setSpell (i, status) {
      if (this.spells[i].learned == status) return
      this.spells[i].learned = status
      this.$emit('change', i, status)
    },
    selectNone (patch) {
      for(let i = 0; i < this.spells.length; i++) {
        if (patch && this.spells[i].patch !== patch) continue
        this.setSpell(i, false)
      }
    },
    selectAll (patch) {
      for(let i = 0; i < this.spells.length; i++) {
        if (patch && this.spells[i].patch !== patch) continue
        this.setSpell(i, true)
      }
    },
    spellIcon, spellIconSrcset
  }
}
</script>

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
  opacity: .4;
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
  content: '';
  background: #222;
  border: 2px solid #222;
}

.spell.learned::before {
  background: #ffbe31;
}

.spell-list-note {
  font-size: 14px;
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
