<template>
  <div>
    <div class="refused-dialog" v-bind:style="{ backgroundColor: 'white'}">
      <b-container fluid>
        <p class="discover-text">Your slogan</p>
      </b-container>
      <b-container class="refused-text" fluid>
        <b-row>
          <b-col sm="12">
            <p>Registration Refused</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            Your registration has been refused because either the email
            is invalid or the user exists already.
            <br />
            <br />Forgot your password?
          </b-col>
        </b-row>
        <br />
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class RegisterRefusedDialog extends Vue {
  constructor() {
    super();
  }
}
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

.refused-dialog {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5em;
}

.refused-text {
  margin-top: 3em;
}
</style>

