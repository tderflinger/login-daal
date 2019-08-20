<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';

@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Montserrat", Helvetica, sans-serif;
  font-weight: 800;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
