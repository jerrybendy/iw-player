/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

import Vue from 'vue'
import Vuex from 'vuex'

import playState from './playState'
import playList from './playList'
import playListUtils  from './playList/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    playState,
    playList,
  },

  getters: {
    /**
     * Prev sound object for playing
     */
    prevSound (state) {
      const list = state.playList.list
      let index = playListUtils.getItemIndex(list, state.playState.current.id)
      // next sound
      if (index === false || index === 0) {
        index = list.length - 1
      } else {
        index --
      }
      // get sound object
      return typeof list[index] === 'object' ? list[index] : {}
    },
    /**
     * Next sound object for playing
     */
    nextSound (state) {
      const list = state.playList.list
      let index = playListUtils.getItemIndex(list, state.playState.current.id)
      // next sound
      if (index === false || index === list.length - 1) {
        index = 0
      } else {
        index ++
      }
      // get sound object
      return typeof list[index] === 'object' ? list[index] : {}
    },
  }
})
