import { createApp } from 'vue'
import App from './App.vue'
import components from '@/Components/UI'
import directives from './directives'
import router from './router/index.js'
import store from './store'

const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})

directives.forEach(el => {
  app.directive(el.name, el)
})

app
  .use(router)
  .use(store)
  .mount('#app')
