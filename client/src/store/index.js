import Vue from 'vue';
import Vuex from 'vuex';

// import createPersistedState from 'vuex-persistedstate';

import todos from './todos';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todos
  },

  plugins: [
    // createPersistedState({
  //     key: "todos-state"
  //     // TODO: filter out modals and other ui state 
  //   } )
]
});
