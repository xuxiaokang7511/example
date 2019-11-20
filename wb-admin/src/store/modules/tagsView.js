const state = {
  historyViews: [],
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  SET_VISITED_VIEW: (state, views) => {
    state.visitedViews = views
  },
  ADD_HISTORY_VIEW: (state, view) => {
    // console.log('ADD_HISTORY_VIEW')
    const length = state.historyViews.length
    if (length > 0 && state.historyViews[length - 1].path === view.path) return
    state.historyViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },

  DEL_HISTORY_VIEW: (state, view) => {
    for (const [i, v] of state.historyViews.entries()) {
      if (v.path === view.path) {
        state.historyViews.splice(i, 1)
      }
    }
  },
  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },

  DEL_OTHERS_HISTORY_VIEWS: (state, view) => {
    state.historyViews = state.historyViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },

  DEL_LEFT_VISITED_VIEWS: (state, index) => {
    state.visitedViews = state.visitedViews.filter((v, i) => {
      return v.meta.affix || i >= index
    })
  },
  DEL_RIGHT_VISITED_VIEWS: (state, index) => {
    state.visitedViews = state.visitedViews.filter((v, i) => {
      return v.meta.affix || i <= index
    })
  },
  SAME_HISTORY_VIEWS: state => {
    const names = state.visitedViews.map(v => v.name)
    state.historyViews = state.historyViews.filter(v => {
      return v.meta.affix || names.indexOf(v.name) >= 0
    })
  },
  SAME_CACHED_VIEWS: (state, view) => {
    const names = state.visitedViews.map(v => v.name)
    state.cachedViews = state.cachedViews.filter(c => {
      return names.indexOf(c) >= 0
    })
  },

  DEL_ALL_HISTORY_VIEWS: state => {
    // keep affix tags
    const affixTags = state.historyViews.filter(tag => tag.meta.affix)
    state.historyViews = affixTags
  },
  DEL_ALL_VISITED_VIEWS: state => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },

  UPDATE_VISITED_VIEW: (state, view) => {
    for (const v of state.visitedViews) {
      if (v.path === view.path) {
        const { name, fullPath, path, meta, query, title } = Object.assign(
          {},
          v,
          view
        )
        // console.log(title)

        v.fullPath = fullPath
        v.path = path
        v.name = name
        v.query = JSON.parse(JSON.stringify(query))
        v.meta = JSON.parse(JSON.stringify(meta))
        v.title = title || ''
        break
      }
    }
  }
}

const actions = {
  setVisitedView({ commit }, views) {
    commit('SET_VISITED_VIEW', views)
  },
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_HISTORY_VIEW', view)
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
    // if (view.meta.parent) {
    //   commit('ADD_CACHED_VIEW', { name: view.meta.parent, meta: {}})
    // }
  },

  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        historyViews: [...state.historyViews],
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_HISTORY_VIEW', view)
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },

  delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        historyViews: [...state.historyViews],
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_HISTORY_VIEWS', view)
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },

  delLeftViews({ commit, state }, index) {
    return new Promise(resolve => {
      commit('DEL_LEFT_VISITED_VIEWS', index)
      commit('SAME_HISTORY_VIEWS')
      commit('SAME_CACHED_VIEWS')
      resolve()
    })
  },
  delRightViews({ commit, state }, index) {
    return new Promise(resolve => {
      commit('DEL_RIGHT_VISITED_VIEWS', index)
      commit('SAME_HISTORY_VIEWS')
      commit('SAME_CACHED_VIEWS')
      resolve()
    })
  },

  delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        historyViews: [...state.historyViews],
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_HISTORY_VIEWS')
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
