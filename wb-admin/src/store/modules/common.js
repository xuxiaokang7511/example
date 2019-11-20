import { imgUpload } from '@/store/api/common'

const state = {}

const mutations = {}

const actions = {
  imgUpload({ commit }, file) {
    return new Promise((resolve, reject) => {
      // @RequestParam
      const data = new FormData()
      /**
       * 提交的是blob时：
       * 在服务器获取到的文件名一直都是blob，而不是设置的文件名，
       * 在提交表单append方法后跟文件名就可以了
       */
      data.append('file', file, file.name)
      imgUpload(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
