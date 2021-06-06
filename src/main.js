import Vue from 'vue'
import App from './App.vue'
import { initTooltip } from '@thewakingsands/kit-tooltip'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')

initTooltip()