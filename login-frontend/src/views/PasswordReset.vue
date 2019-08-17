<template>
  <div class="home">
    <password-reset-dialog></password-reset-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PasswordResetDialog from "../components/PasswordResetDialog.vue";

@Component({
  components: {
    PasswordResetDialog
  }
})
export default class PasswordReset extends Vue {}
</script>
