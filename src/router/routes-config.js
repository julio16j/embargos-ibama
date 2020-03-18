import leftMenu from '@/views/Menus.vue'
import { mainLayout } from 'amazonia-framework-frontend'
import index from '@/views/Index.vue'

const routes = [
  {
    path: '',
    components: {
      default: mainLayout,
      leftDrawer: leftMenu
    },
    children: [
      { path: '/', name: 'home', component: index }
    ]
  }
]

export default routes
