<template>
  <div class="home">
    <RegisterConfirmationDialog></RegisterConfirmationDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RegisterConfirmationDialog from "@/components/RegisterConfirmationDialog";

@Component({
  components: {
    RegisterConfirmationDialog
  }
})
export default class Confirmation extends Vue {}
</script>
