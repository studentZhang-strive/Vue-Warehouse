import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SwiperView from '@/components/SwiperView'
import Editor from '@/components/Editor'
import Demo1 from '@/components/Demo1'
import Marc from '@/views/Marc'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import kiContext from '@kiyoaki_w/vue-context'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import '../data.js'
import 'babel-polyfill'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)
Vue.use(kiContext)
Vue.use(ElementUI)
Vue.use(Router)
Vue.prototype.$axios = axios
Vue.use(axios)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/edit',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/',
      name: 'SwiperView',
      component: SwiperView
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/demo1',
      name: 'Demo1',
      component: Demo1
    },
    {
      path: '/marc',
      name: 'Marc',
      component: Marc
    }
  ]
})
