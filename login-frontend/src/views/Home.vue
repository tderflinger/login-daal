<template>
  <div class="home">
    <LoginDialog></LoginDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginDialog from "@/components/LoginDialog.vue";

@Component({
  components: {
    LoginDialog
  }
})
export default class Home extends Vue {}
</script>
