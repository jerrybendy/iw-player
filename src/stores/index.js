/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

import Vue from 'vue'
import Vuex from 'vuex'

import playState from './playState'
import playList from './playList'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    playState,
    playList,
  }
})
