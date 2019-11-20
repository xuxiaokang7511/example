import store from '@/store'

/**
 * 宽松权限检查，一个满足就可以
 * @param {Array} permissionStr
 * @returns {Boolean}
 * @example see @/views/permissionTest/directive.vue
 */
export default function checkPermit(permissionStr) {
  if (permissionStr.indexOf(',') > -1) {
    return normalCheck(permissionStr)
  } else if (permissionStr.indexOf('+') > -1) {
    return strictCheck(permissionStr)
  } else {
    return singleCheck(permissionStr)
  }
}

function singleCheck(permission) {
  const myPermissions = store.getters.permissions
  return myPermissions.indexOf(permission) > -1
}

function normalCheck(permissionStr) {
  const myPermissions = store.getters.permissions
  const permissionArr = permissionStr.split(',')
  return permissionArr.some(permission => {
    return myPermissions.indexOf(permission) > -1
  })
}

function strictCheck(permissionStr) {
  const permissionArr = permissionStr.split('+')
  const myPermissions = store.getters.permissions
  return permissionArr.every(permission => {
    return myPermissions.indexOf(permission) > -1
  })
}
