import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import AmazoniaFramework from 'amazonia-framework-frontend'

import './quasar'

Vue.use(AmazoniaFramework, { router, store, App })
