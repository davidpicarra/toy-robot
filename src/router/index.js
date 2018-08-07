import Vue from 'vue'
import Router from 'vue-router'
import ToyRobot from '@/components/ToyRobot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ToyRobot',
      component: ToyRobot
    }
  ]
})
