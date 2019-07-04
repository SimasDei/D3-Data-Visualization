<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
@import '/assets/styles/_variables.scss';
.Cookie__button {
  background: color(robin-egg-blue) !important;
  @include hover-active-states() {
    background: darken(color(robin-egg-blue), 10%) !important;
  }
}
</style>
