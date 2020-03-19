import leftMenu from '@/views/Menus.vue'
import { mainLayout } from 'amazonia-framework-frontend'
import { cadastroEmbargo, consultaEmbargo } from '@/components/globals.js'
import page404 from 'amazonia-framework-frontend/src/layouts/Error404'
import index from '@/views/Index.vue'
const routes = [
  {
    path: '',
    components: {
      default: mainLayout,
      leftDrawer: leftMenu
    },
    children: [
      { path: '/', name: 'home', component: index },
      { path: '/consultar-embargo', component: consultaEmbargo, name: 'consulta-embargo' },
      { path: '/incluir-embargo', component: cadastroEmbargo, name: 'cadastro-embargo' },
      { path: '*', component: page404, name: 'notFound' }
    ]
  }
]

export default routes
