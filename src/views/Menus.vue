<template>
    <q-list>
        <q-item-label header class="basa-header-menu" :style="{'background': 'url(' + require('@/assets/header-profile.png') + ' ) center center / cover no-repeat'}">
            <div class="basa-header-text">
            Administração
            </div>
        </q-item-label>
        <q-item clickable tag="a" to="/consultar-embargo">
            <q-item-section avatar>
            <q-icon name="far fa-file" />
            </q-item-section>
            <q-item-section>
            <q-item-label>Consultar</q-item-label>
            <q-item-label caption>Consultar Embargos</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/incluir-embargo">
            <q-item-section avatar>
            <q-icon name="far fa-handshake" />
            </q-item-section>
            <q-item-section>
            <q-item-label>Incluir</q-item-label>
            <q-item-label caption>Incluir Embargos</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>
</template>
