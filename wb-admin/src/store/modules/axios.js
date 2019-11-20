const state = {
  cancles: []
}

const mutations = {
  ADD_CANCLE: (state, cancle) => {
    state.cancles.push(cancle)
  },
  CLEAR_CANCLES: state => {
    state.cancles = []
  }
}

const actions = {
  addCancle({ commit }, cancle) {
    // console.log('cancle')
    commit('ADD_CANCLE', cancle)
  },
  clearCancles({ state, commit }) {
    // console.log('clearCancles')
    state.cancles.forEach(e => {
      e && e()
    })
    commit('CLEAR_CANCLES')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
