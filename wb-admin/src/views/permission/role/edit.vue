<template>
  <role-detail ref="detail" :is-edit="true" />
</template>

<script>
import RoleDetail from './components/roleDetail'

export default {
  name: 'EditRolePermission',
  components: { RoleDetail }
}
</script>

