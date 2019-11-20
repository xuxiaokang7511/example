<template>
  <router-view />
</template>
<script>
export default {
  name: 'RoleRouter',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
