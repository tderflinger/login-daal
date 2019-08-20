 <template>
  <div>
    <div class="login-dialog">
      <b-container fluid v-on:keydown="keydown">
        <b-row id="login-button">
          <b-col sm="12">
            <div class="facebook-login">
              <facebook-login
                class="facebook-button"
                v-bind:appId="appId"
                loginLabel="Login with Facebook"
                @login="onLogin"
                @logout="onLogout"
                @sdk-loaded="sdkLoaded"
              ></facebook-login>
            </div>
          </b-col>
        </b-row>
        <b-row class="or-word">
          <p>&#x2014 or &#x2014</p>
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
                v-on:blur="passwordValidation"
                required
              ></b-form-input>
              <div class="error" v-if="passwordValidationError">Please provide your password.</div>
              <small class="forgot-password">
                Forgot your password?
                <router-link to="/reset">Reset password</router-link>
              </small>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row></b-row>
        <b-row id="login-button">
          <b-col sm="12">
            <b-btn
              ref="login-button"
              block
              variant="primary"
              size="lg"
              v-on:click="login"
              disabled
            >Login</b-btn>
          </b-col>
        </b-row>
        <b-row class="sign-up">
          <p>
            Don't have an account?
            <router-link to="/signup">Sign up! It's free</router-link>
          </p>
        </b-row>
      </b-container>
    </div>

    <b-modal ref="failureModal" title="Login" ok-only>
      <p>Unable to login. Wrong username or password.</p>
    </b-modal>
  </div>
</template>

<script>
import { userService, Credentials } from "../services/UserService";
import facebookLogin from "facebook-login-vuejs";
import { required } from "vuelidate/lib/validators";

export default {
  name: "LoginDialog",
  components: {
    facebookLogin
  },
  data: function() {
    return {
      isConnected: false,
      name: "",
      email: "",
      appId: process.env.VUE_APP_FACEBOOK_APP_ID,
      password: "",
      emailValidationError: false,
      passwordValidationError: false
    };
  },
  validations: {
    email: { required },
    password: { required }
  },
  methods: {
    getUserData() {
      FB.getLoginStatus(response => {
        if (response.status === "connected") {
          console.log("user connected", response);

          // authenticate with user service
          userService
            .loginFacebook(response.authResponse.accessToken)
            .then(() => {
              console.log("[LoginDialog] Logged in via facebook");
              window.location.assign("/success");
            })
            .catch(error => {
              this.$refs.failureModal.show();
            });
        } else if (response.status === "not_authorized") {
          console.log("[LoginDialog] Facebook not authorized!");
        } else {
          console.log("[LoginDialog] not logged in with Facebook");
        }
      }, true);
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      if (this.isConnected) this.getUserData();
    },
    // Facebook login
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },
    onLogout() {
      this.isConnected = false;
    },
    enableDisableLoginButton() {
      if (!(this.passwordValidationError || this.emailValidationError)) {
        this.$refs["login-button"].removeAttribute("disabled");
      } else {
        this.$refs["login-button"].setAttribute("disabled", "disabled");
      }
    },
    emailValidation() {
      const emailElement = this.$refs.email;
      if (emailElement.validity.valid) {
        if (this.$v.email.$anyError) {
          this.emailValidationError = true;
          return;
        } else {
          this.emailValidationError = false;
        }
      } else {
        this.emailValidationError = true;
      }
      this.enableDisableLoginButton();
    },
    passwordValidation() {
      const passwordElement = this.$refs.password;
      if (passwordElement.validity.valid) {
        if (this.$v.password.$anyError) {
          this.passwordValidationError = true;
          return;
        } else {
          this.passwordValidationError = false;
        }
      } else {
        this.passwordValidationError = true;
      }
      this.enableDisableLoginButton();
    },
    login() {
      const cred = new Credentials();
      cred.email = this.email;
      cred.password = this.password;

      userService
        .login(cred)
        .then(() => {
          this.$router.push("success");
        })
        .catch(error => {
          this.$refs.failureModal.show();
        });
    },
    keydown(evt) {
      if (evt.key === "Enter") {
        this.emailValidation();
        this.passwordValidation();
        if (!(this.emailValidationError || this.passwordValidationError)) {
          this.login();
        }
      }
    }
  }
};
</script>

<!-- not scoped -->
<style lang="scss">
body {
  color: #373a3c;
  background: #ebf1f6; /* Old browsers */
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    #ebf1f6 0%,
    #abd3ee 50%,
    #89c3eb 99%,
    #89c3eb 99%,
    #d5ebfb 100%
  ); /* FF3.6-15 */
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    #ebf1f6 0%,
    #abd3ee 50%,
    #89c3eb 99%,
    #89c3eb 99%,
    #d5ebfb 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(
    ellipse at center,
    #ebf1f6 0%,
    #abd3ee 50%,
    #89c3eb 99%,
    #89c3eb 99%,
    #d5ebfb 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ebf1f6', endColorstr='#d5ebfb',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
</style>
<style scoped lang="scss">
.error {
  color: red;
}

.facebook-login {
  margin-top: 0px;
  margin-bottom: 20px;
  text-align: center;
}

.forgot-password {
  font-size: 90%;
  font-weight: 500;
  margin-top: 0.3em;
  margin-bottom: 1em;
}

.login-dialog {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;
}

.or-word {
  width: 80px;
  margin-left: auto;
  margin-right: auto;
}

.password-input {
  margin-top: 10px;
}

.sign-up,
.or-word {
  font-size: 90%;
  font-weight: 500;
  padding-left: 15px;
}

.sign-up {
  margin-top: 0.3em;
}
</style>
