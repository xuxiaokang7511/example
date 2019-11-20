import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import VuexPersistence from 'vuex-persist/dist/umd/index.js'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// ie下vuex-persist的兼容问题
if (
  window.localStorage &&
  window.localStorage.constructor &&
  !window.localStorage.constructor.name
) {
  window.localStorage.constructor.name = ''
}
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  // modules: ['app', 'settings', 'tagsView']
  reducer: state => {
    return {
      app: {
        sidebar: state.app.sidebar,
        size: state.app.size
      },
      settings: state.settings,
      tagsView: {
        visitedViews: state.tagsView.visitedViews
      },
      user: {
        username: state.user.username,
        token: state.user.token
      }
    }
  }
})

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [vuexLocal.plugin]
})

export default store
