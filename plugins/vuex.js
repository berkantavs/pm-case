import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as store from '~/store/index.js';

export default () => new Vuex.Store(store);