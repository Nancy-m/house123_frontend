import Vue from 'vue'
import 'normalize.css/normalize.css';

import ElementUI from 'element-ui';
// import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';


import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import '@/permission'

Vue.use(ElementUI);
// import ZjTable from 'vue-element-table'

// Vue.use(ZjTable)

Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
new Vue({
  el: '#app',
  router,
  data: {
    // 空的实例放到根组件下，所有的子组件都能调用
    Bus: new Vue()
  },
  // store,
  render: h => h(App)
});