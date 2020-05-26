// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
// import * as Quill from 'quill'
// axios
import axios from 'axios'

// 使用element-ui
import ElementUI from 'element-ui'

import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
import 'swiper/css/swiper.css'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)

// 将axios注入到Vue的原型上
Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
