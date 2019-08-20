<template>
  <div>
    <div id="nav" class="flex-container">
      <div>Login Daal</div>
      <div class="burger-icon icon-menu">&#xf0c9;</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
@font-face {
  font-family: "fontello";
  src: url("../assets/font/fontello.woff?19642364") format("woff"),
    url("../assets/font/fontello.ttf?19642364") format("truetype");
  font-weight: normal;
  font-style: normal;
}

#nav {
  width: 100%;
  max-width: 100%;
  padding: 0.4em;
  padding-left: 30px;
  color: #089ceb;
  font-size: 30px;
  font-weight: 300;
}

.flex-container {
  display: flex;
}

.burger-icon {
  flex-grow: 1;
  padding: 0.2em;
  font-family: "fontello";
  font-style: normal;
  font-weight: normal;
  color: black;
  speak: none;

  display: inline-block;
  text-decoration: inherit;
  width: 50px;
  margin-right: 0.2em;
  text-align: right;
  /* opacity: .8; */

  /* For safety - reset parent styles, that can break glyph codes*/
  font-variant: normal;
  text-transform: none;

  /* fix buttons height, for twitter bootstrap */
  line-height: 1em;

  /* Animation center compensation - margins should be symmetric */
  /* remove if not needed */
  margin-left: 0.2em;

  /* You can be more comfortable with increased icons size */
  /* font-size: 120%; */

  /* Font smoothing. That was taken from TWBS */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Uncomment for 3D effect */
  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
}
</style>
