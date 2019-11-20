<template>
  <router-view />
</template>
<script>
export default {
  name: 'EmptyRouter',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
