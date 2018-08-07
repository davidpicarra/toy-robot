import Vue from 'vue'
import ToyRobot from '@/components/ToyRobot'

describe('ToyRobot.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ToyRobot)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
