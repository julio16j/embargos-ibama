<template>
  <q-layout view="hHh LpR fff">
    <q-header class="bg-primary text-white">
      <q-toolbar class="basa-header">
        <slot name="left-menu-button">
          <q-btn v-if="showLeftDrawer" dense flat round icon="menu" @click="left = !left" />
        </slot>
        <img src="../../assets/letra_basa.png" style="height: 50px; max-width: 50px" />
        <q-toolbar-title>
          <div style="width: 50%">
            <router-link clickable to="/" tag="div" style="cursor: pointer;">
              <span class="desktop-only">{{ projectName }}</span>
              <span class="mobile-only">{{ projectNameMobile }}</span>
            </router-link>
          </div>
        </q-toolbar-title>
        <div class="q-pa-md">
          <slot name="header-top-right"></slot>
        </div>
        <div class="q-pa-md" v-if="authenticated()">
          <q-btn-dropdown dense unelevated round icon="fa fa-user">
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <slot name="user-menu" v-bind:userName="userName" />
              </div>
              <q-separator vertical inset class="q-mx-lg" v-if="hasUserMenuSlot" />
              <div class="column items-center">
                <q-avatar size="72px">
                  <q-icon name="fa fa-user" color="secondary" />
                </q-avatar>
                <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userName }}</div>
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
          <div class="text-center desktop-only">
            <div>
              <small>{{ footerMessage }}</small>
              <div class="text-caption float-right q-pt-sm">
                <small>
                  <slot
                    name="footer-right-text"
                    v-bind:appVersion="appVersion"
                  >Versão {{ appVersion }}</slot>
                </small>
              </div>
            </div>
          </div>
          <div class="text-center mobile-only">
            <small>{{ footerMessageMobile }}</small>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <slot name="left-menu">
      <q-drawer v-if="showLeftDrawer" v-model="left" side="left" bordered behavior="mobile">
        <router-view name="leftDrawer" />
      </q-drawer>
    </slot>

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
  computed: {
    hasUserMenuSlot () {
      return !!this.$slots['user-menu']
    },
    appVersion () {
      return process.env.VUE_APP_VERSION
    },
    userName () {
      return (this.$security === undefined || this.$security.name === undefined) ? this.defaultUsername : this.$security.name
    }
  },
  methods: {
    openURL,
    authenticated: function () {
      return this.$utils.isNotNull(this.$keycloak) && this.$keycloak.authenticated
    },
    logout: function () { this.$security.logout() }
  }
}
</script>
