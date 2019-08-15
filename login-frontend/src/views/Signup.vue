<template>
  <div class="home">
    <SignupDialog></SignupDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SignupDialog from "../components/SignupDialog.vue";

@Component({
  components: {
    SignupDialog
  }
})
export default class Signup extends Vue {}
</script>
