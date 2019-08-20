<template>
  <div>
    <div class="confirm-dialog" v-bind:style="{ backgroundColor: 'white'}">
      <b-container fluid>
        <p class="discover-text">Your slogan.</p>
      </b-container>
      <b-container class="confirm-text" fluid>
        <b-row>
          <b-col sm="12">
            <p>Confirmation</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            We have sent you a confirmation email.
            <br />
            <br />Please check your inbox and your spam folder.
            In order to confirm your user registration click on the link in the email.
          </b-col>
        </b-row>
        <br />
        <b-row id="signup-button">
          <b-col sm="12">
            <b-btn
              ref="login-button"
              block
              variant="primary"
              size="lg"
              v-on:click="login"
            >Go to Login</b-btn>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class RegisterConfirmationDialog extends Vue {
  constructor() {
    super();
  }

  public login() {
    this.$router.push('/');
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

