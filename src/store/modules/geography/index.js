import axios from 'axios';

const state = {
  // cartItems: [],
};

const mutations = {
  // UPDATE_CART_ITEMS(state, payload) {
  //   state.cartItems = payload;
  // },
};

const actions = {
  // getCartItems({ commit }) {
  //   axios.get('/api/cart').then((response) => {
  //     commit('UPDATE_CART_ITEMS', response.data);
  //   });
  // },
};

const getters = {
  // cartItems: state => state.cartItems,
};

const geographyModule = {
  state,
  mutations,
  actions,
  getters,
};

export default geographyModule;
