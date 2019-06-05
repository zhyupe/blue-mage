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
      <img :src="`icons/spells/${s.icon}`">
      <span>{{s.no}}</span>
    </div>
    <p class="spell-list-note">选中（已学习）的技能不会出现在获取方式中</p>
  </div>
</template>

<script>
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
  color: #fff;
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
</style>
