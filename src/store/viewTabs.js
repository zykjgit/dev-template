export const state = {
  cacheRoutes: [],
  viewTabs: []
};

export const mutations = {
  ADD_CACHEROUTES: (state, name) => {
    state.cacheRoutes.push(name);
  },
  ADD_VIEWTABS: (state, route) => {
    state.viewTabs.push(route);
  },
  DEL_VIEWTABS: (state, index) => {
    state.viewTabs.splice(index, 1);
  },
  DEL_CACHEROUTE: (state, index) => {
    state.cacheRoutes.splice(index, 1);
  },
  CLEAR_VIEWTABS: state => {
    state.cacheRoutes = [];
    state.viewTabs = [];
  }
};

export const actions = {
  addViewTabs({ commit, state }, route) {
    let { name, path, fullPath } = route;
    if (state.viewTabs.length !== 0) {
      if (!state.viewTabs.some(item => item.name === name)) {
        commit('ADD_VIEWTABS', {
          name,
          path,
          fullPath,
          title: route.meta.name
        });
      }
    } else {
      commit('ADD_VIEWTABS', {
        name,
        path,
        fullPath,
        title: route.meta.name
      });
    }
  },
  addcacheRoute({ commit, state }, route) {
    let { name } = route;
    if (state.cacheRoutes.length !== 0) {
      if (!state.cacheRoutes.includes(name)) {
        commit('ADD_CACHEROUTES', name);
      }
    } else {
      commit('ADD_CACHEROUTES', name);
    }
  },
  delViewTabs({ commit, state }, route) {
    if (state.viewTabs.length !== 0) {
      const currentIndex = state.viewTabs.findIndex(item => item.name === route.name);
      if (currentIndex !== -1) {
        const priv = state.viewTabs[currentIndex - 1];
        const next = state.viewTabs[currentIndex + 1];
        commit('DEL_VIEWTABS', currentIndex);
        if (priv) {
          return priv;
        } else if (next) {
          return next;
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  },
  delCacheRoute({ commit, state }, view) {
    const index = state.cacheRoutes.findIndex(name => view.name === name);
    if (index !== -1) {
      commit('DEL_CACHEROUTE', index);
    }
  },
  addView({ dispatch }, router) {
    dispatch('addViewTabs', router);
    dispatch('addcacheRoute', router);
  },
  delView({ dispatch }, router) {
    dispatch('delCacheRoute', router);
    return dispatch('delViewTabs', router);
  }
};

export default {
  namespaced: true,
  actions,
  mutations,
  state
};
