<template>
    <q-list>
        <q-item-label header class="basa-header-menu" :style="{'background': 'url(' + require('@/assets/header-profile.png') + ' ) center center / cover no-repeat'}">
            <div class="basa-header-text">
            Administração
            </div>
        </q-item-label>
        <q-item clickable tag="a" to="/proposta">
            <q-item-section avatar>
            <q-icon name="far fa-file" />
            </q-item-section>
            <q-item-section>
            <q-item-label>Proposta</q-item-label>
            <q-item-label caption>Gerência de Propostas</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/contrato">
            <q-item-section avatar>
            <q-icon name="far fa-handshake" />
            </q-item-section>
            <q-item-section>
            <q-item-label>Contrato</q-item-label>
            <q-item-label caption>Gerência de Contratos</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>
</template>
