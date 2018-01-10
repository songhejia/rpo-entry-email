import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import EntryConfirmation from '@/components/EntryConfirmation'
const EntryConfirmation = () => import('@/components/EntryConfirmation')
const Delivery = () => import('@/components/Delivery')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/delivery',
      name: 'delivery',
      meta: { title: "客户确认函交付明细" },
      component: Delivery
    },
    {
      path: '/',
      name: 'EntryConfirmation',
      meta: { title: "到岗候选人名单确认" },
      component: EntryConfirmation
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {//如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  next()
})

export default router