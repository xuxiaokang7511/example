const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  onlyChild: false,
  device: 'desktop',
  size: 'medium',
  appTrans: 'rotate-fall'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
  },
  SET_APPTRANS: (state, appTrans) => {
    state.appTrans = appTrans
  },
  SET_ONLYCHILD: (state, onlyChild) => {
    state.onlyChild = onlyChild
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setOnlyChild({ commit }, onlyChild) {
    commit('SET_ONLYCHILD', onlyChild)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
