<template>
  <div>
    <div class="home">
      <div class="confirm-dialog" v-bind:style="{ backgroundColor: 'white'}">
        <b-container fluid>
          <p class="discover-text">Your slogan.</p>
        </b-container>
        <b-container class="confirm-text" fluid>
          <b-row>
            <b-col sm="12">
              <p>Success</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">You have successfully logged in!</b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class SuccessLogin extends Vue {}
</script>
<style>
body {
  background-color: white;
  background: white;
}
</style>
<style scoped lang="scss">
.discover-text {
  color: lightskyblue;
}

.confirm-dialog {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5em;
}

.confirm-text {
  margin-top: 3em;
}
</style>
