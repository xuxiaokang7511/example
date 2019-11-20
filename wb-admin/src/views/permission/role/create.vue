<template>
  <role-detail :is-edit="false" />
</template>

<script>
import RoleDetail from './components/roleDetail'

export default {
  name: 'CreateRolePermission',
  components: { RoleDetail }
}
</script>

