<template>
  <div class="home">
    <RegisterRefusedDialog></RegisterRefusedDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RegisterRefusedDialog from "../components/RegisterRefusedDialog.vue";

@Component({
  components: {
    RegisterRefusedDialog
  }
})
export default class RegRefused extends Vue {}
</script>
