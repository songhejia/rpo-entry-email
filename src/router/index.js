import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import EntryConfirmation from '@/components/EntryConfirmation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EntryConfirmation',
      component: EntryConfirmation
    }
  ]
})
