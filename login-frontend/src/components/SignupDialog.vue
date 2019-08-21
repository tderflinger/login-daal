<template>
  <div>
    <div class="signup-dialog">
      <b-container fluid>
        <p class="discover-text">Your slogan.</p>
      </b-container>
      <b-container class="signup-form" fluid v-on:keypress="keypress">
        <b-row class="signup-slogan">
          <b-col sm="12">
            <p>Sign Up! It's Free!</p>
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
        <b-row class="password-input">
          <b-col sm="12">
            <b-form-group id="password-group">
              <b-form-input
                placeholder="Password"
                v-model="password"
                type="password"
                ref="password"
                name="password"
                maxlength="30"
                required
              ></b-form-input>
              <div class="error" v-if="firstPasswordValidationError">Please provide your password.</div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="confirm-password-input">
          <b-col sm="12">
            <b-form-group id="password-group">
              <b-form-input
                placeholder="Confirm Password"
                v-model="passwordConfirm"
                type="password"
                ref="confirm-password"
                name="confirm-password"
                maxlength="30"
                required
              ></b-form-input>
              <div class="error" v-if="secondPasswordValidationError">Please confirm your password.</div>
              <div class="error" v-if="passwordNotSameError">The passwords are not the same.</div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row></b-row>
        <b-row class="confirm-password-input">
          <b-col sm="12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text check-me">
                  <input type="checkbox" v-model="agreeTerms"/>
                </div>
              </div>
              <p class="form-control">
                I agree to the
                <a href="#">terms.</a>
              </p>
              <div class="error" v-if="notAgreedTermsError">Please agree to the terms if you want to register.</div>
            </div>
          </b-col>
        </b-row>
        <b-row id="signup-button">
          <b-col sm="12">
            <b-btn ref="signup-button" block variant="primary" size="lg" v-on:click="signup">Sign Up</b-btn>
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

@Component( {
  watch: {
    // whenever the agree to terms checkbox is deselected, an error message is shown
    agreeTerms: function() {
        this.termsValidation();
    }
  }
})
export default class SignupDialog extends Vue {
  private email: string = '';
  private password: string = '';
  private passwordConfirm: string = '';
  private passwordNotSameError: boolean = false;
  private firstPasswordValidationError: boolean = false;
  private secondPasswordValidationError: boolean = false;
  private emailValidationError: boolean = false;
  private agreeTerms: boolean = false;
  private notAgreedTermsError: boolean = false;

  private validations: Object = {
    email: { required }
  };

  constructor() {
    super();
  }

  private emailValidation() {
    const emailElement = <ValidityElement>this.$refs.email;
    if (emailElement.validity.valid) {
      this.emailValidationError = false; 
    } else {
      this.emailValidationError = true; 
    }

    return !this.emailValidationError;
  }

  passwordValidation() {
    if  (this.password === "") {
      this.firstPasswordValidationError = true; 
      return false;
    } else {
      this.firstPasswordValidationError = false; 
    }

    if (this.passwordConfirm === "") {
      this.secondPasswordValidationError = true; 
      return false;
    } else {
      this.secondPasswordValidationError = false; 
    }

    if (this.password === this.passwordConfirm) {
      this.passwordNotSameError = false; 
      return true;
    } else {
      this.passwordNotSameError = true; 
    }

    if (
      this.firstPasswordValidationError ||
      this.secondPasswordValidationError ||
      this.passwordNotSameError
    ) {
      return false;
    }
  }

  // whenever the agree to terms checkbox is deselected, an error message is shown
  termsValidation() {
    if (this.agreeTerms) {
      this.notAgreedTermsError = false;
    } else {
      this.notAgreedTermsError = true;
    }
  }

  keypress(evt: any) {
    if  (evt.key === "Enter") {
      this.signup(); 
    }
  }

  signup(): void {
    const cred = new Credentials();
    cred.email = this.email;
    cred.password = this.password;

    this.termsValidation();

    if (
      this.agreeTerms &&
      this.passwordValidation() &&
      this.emailValidation()
    ) {
      userService
        .createUser(cred)
        .then(() => {
          this.$router.push('confirm');
        })
        .catch((err) => {
          this.$router.push('regrefused');
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
