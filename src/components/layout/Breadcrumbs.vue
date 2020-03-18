<template>
  <div class="b-breadcrumbs-container">
    <div class="desktop-only q-pa-md q-gutter-sm b-breadcrumbs-container--desktop">
      <div class="">
        <q-breadcrumbs active-color="green-14">
          <q-breadcrumbs-el label="Home" icon="home" to="/" />
          <slot></slot>
        </q-breadcrumbs>
        <div class="b-breadcrumbs-title--desktop">{{ title }}</div>
      </div>
    </div>
    <div class="mobile-only b-breadcrumbs-container--mobile">
      <div class="b-breadcrumbs-title--mobile">{{ title }}</div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    title: String
  }
}
</script>
