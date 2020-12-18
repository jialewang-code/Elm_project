import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/config/rem'

Vue.config.productionTip = false
if(process.env.NODE_ENV == 'development') require('@/api/mock')

//1/一般测试或者是开发环境下导入
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);

//2/按需导入


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
