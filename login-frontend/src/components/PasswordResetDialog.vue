<template>
  <div>
    <div class="signup-dialog" v-bind:style="{ backgroundColor: 'white'}">
      <b-container fluid>
        <p class="discover-text">Your slogan.</p>
      </b-container>
      <b-container class="signup-form" fluid v-on:keypress="keypress">
        <b-row class="signup-slogan">
          <b-col sm="12">
            <p>Password Reset</p>
          </b-col>
        </b-row>
        <b-row class="signup-slogan">
          <b-col sm="12">
            <p>Enter your email address. We will send you an email with a link where you can reset your password.</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <b-form-group id="email-group">
              <b-form-input
                placeholder="Email"
                ref="email"
                v-model="email"
                type="email"
                name="email"
                required
                v-on:blur="emailValidation"
                v-on:input="emailValidation"
              ></b-form-input>
              <div class="error" v-if="emailValidationError">Please provide a valid email address.</div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row id="reset-button">
          <b-col sm="12">
            <b-btn ref="reset-button" block variant="primary" size="lg" v-on:click="reset">Reset</b-btn>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userService, Credentials } from '../services/UserService';
import { required } from 'vuelidate/lib/validators';

interface ValidityElement extends Element {
  validity: ValidityState;
}

@Component
export default class PasswordResetDialog extends Vue {
  public email: string = '';
  public emailValidationError: boolean = false;

  public validations: Object = {
    email: { required },
  };

  constructor() {
    super();

    document.body.style.backgroundColor = 'white';
  }

  public emailValidation() {
    const emailElement = <ValidityElement>this.$refs.email;
    if (emailElement.validity.valid) {
      this.emailValidationError = false; 
    } else {
      this.emailValidationError = true; 
    }

    return !this.emailValidationError;
  }

  keypress(evt: any) {
    if  (evt.key === "Enter") {
      this.reset(); 
    }
  }

  reset(): void {
    const cred = new Credentials();
    cred.email = this.email;

    if (this.emailValidation()) {
      userService
        .resetPassword(cred)
        .then(() => {
          // this.$router.push("confirm");
        })
        .catch((err) => {
          // this.$router.push("regrefused");
        }); 
    }
  }
}
;
</script>

<style>
body {
  background-color: white;
  background: white;
}
</style>

<style scoped lang="scss">
.error {
  color: red;
}

.check-me {
  background-color: lightgray;
}

.discover-text {
  color: lightskyblue;
}

.signup-dialog {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5em;
}

.signup-form {
  margin-top: 3em;
}

.signup-slogan {
  margin-bottom: 1.5em;
}
</style>
