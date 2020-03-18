<template>
  <q-layout view="hHh LpR fff">
    <q-header class="bg-primary text-white">
      <q-toolbar class="basa-header">
        <q-btn v-if="showLeftDrawer" dense flat round icon="menu" @click="left = !left" />
        <img src="../../assets/letra_basa.png" style="height: 50px; max-width: 50px" />
        <q-toolbar-title>
          <router-link clickable to="/" tag="div" style="cursor: pointer;">
            <span class="desktop-only">{{ projectName }} 23213</span>
            <span class="mobile-only">{{ projectNameMobile }}</span>
          </router-link>
        </q-toolbar-title>
        <div class="q-pa-md" v-if="authenticated()">
          <q-btn-dropdown dense unelevated round icon="fa fa-user">
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Opções</div>
              </div>
              <q-separator vertical inset class="q-mx-lg" />
              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
                <div class="text-subtitle1 q-mt-md q-mb-xs">{{ showName() }}</div>
                <q-btn color="primary" label="Sair" push size="sm" v-close-popup @click="logout" />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer class="basa-footer">
      <q-toolbar>
        <q-toolbar-title>
          <div>
            <div class="text-center desktop-only">
              <small>{{ footerMessage }}</small>
            </div>
            <div class="text-center mobile-only">
              <small>{{ footerMessageMobile }}</small>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-drawer v-if="showLeftDrawer" v-model="left" side="left" bordered behavior="mobile">
      <router-view name="leftDrawer" />
    </q-drawer>

    <div>
      <router-view name="leftDrawerRota2" />
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  data () {
    return {
      left: false,
      defaultUsername: 'Anônimo',
      showLeftDrawer: this.$route.matched.every(route => route.meta.showLeftDrawer === undefined || (route.meta.showLeftDrawer !== undefined && route.meta.showLeftDrawer !== false)),
      projectName: process.env.VUE_APP_PROJECT_NAME ? process.env.VUE_APP_PROJECT_NAME : 'Definir VUE_APP_PROJECT_NAME e VUE_APP_PROJECT_NAME_MOBILE no arquivo .env',
      projectNameMobile: process.env.VUE_APP_PROJECT_NAME_MOBILE ? process.env.VUE_APP_PROJECT_NAME_MOBILE : 'Definir VUE_APP_PROJECT_NAME e VUE_APP_PROJECT_NAME_MOBILE no arquivo .env',
      footerMessage: process.env.VUE_APP_FOOTER_MESSAGE ? process.env.VUE_APP_FOOTER_MESSAGE : 'Todos os diretos reservados ao Banco da Amazônia S/A',
      footerMessageMobile: process.env.VUE_APP_FOOTER_MESSAGE_MOBILE ? process.env.VUE_APP_FOOTER_MESSAGE_MOBILE : 'Banco da Amazônia S/A'
    }
  },
  methods: {
    openURL,
    showName: function () { return (this.$security === undefined || this.$security.name === undefined) ? this.defaultUsername : this.$security.name },
    authenticated: function () {
      return this.$utils.isNotNull(this.$keycloak) && this.$keycloak.authenticated
    },
    logout: function () { this.$security.logout() }
  }
}
</script>
