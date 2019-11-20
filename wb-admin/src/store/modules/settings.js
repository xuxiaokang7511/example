import defaultSettings from '@/settings'

const {
  color,
  style,
  tagsView,
  tagsIcon,
  breadcrumbIcon,
  footer,
  topMenu,
  fixedFooter,
  fixedHeader,
  sidebarLogo,
  oneChild,
  fullHeader
} = defaultSettings

const state = {
  theme: {
    color,
    style
  },
  tagsView: tagsView,
  tagsIcon: tagsIcon,
  breadcrumbIcon: breadcrumbIcon,
  footer: footer,
  topMenu: topMenu,
  fixedFooter: fixedFooter,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  oneChild: oneChild,
  fullHeader: fullHeader
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_THEME: (state, { key, value }) => {
    if (state.theme.hasOwnProperty(key)) {
      state.theme[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  setTheme({ commit }, data) {
    commit('SET_THEME', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
