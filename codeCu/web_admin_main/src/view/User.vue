<template>
  <router-view/>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class User extends Vue {
  constructor() {
    super()
  }
}
</script>

<style lang="scss" scoped type="text/css"></style>
