/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

import Vue from 'vue'
import types from './types'
import soundParserClient from '../../lib/ipc/soundParserClient'
import encryptClient from '../../lib/ipc/encryptClient'
import playListDbClient from '../../lib/ipc/playListDbClient'
import utils from './utils'
import playStateTypes from '../playState/types'

const DEFAULT_SOUND = {
  id: null,  // use the sha256 of path as id
  title: '',
  artist: '',
  album: '',
  albumCover: '',
  duration: 0,
  path: '',
}

export default {
  state: {
    list: [],
  },

  mutations: {
    /**
     * Add a new sound
     */
    [types.ADD] (state, sound) {
      if (!sound.path) {
        console.warn('[ERROR] sound path is not exists')
        return
      }

      const soundId = encryptClient.sha256(sound.path)

      // check if this sound is already exists
      if (utils.isIdExists(soundId)) {
        console.log('[INFO] Sound is already exist')
        return
      }

      const newSound = Object.assign({}, DEFAULT_SOUND, {
        id: soundId,
      }, sound)

      state.list.push(newSound)

      // add to db
      playListDbClient.insert(newSound)

      // start a parser to parse this sound metadata
      soundParserClient.sendToParser(newSound.id, newSound.path)
    },

    /**
     * Update sound info
     */
    [types.UPDATE] (state, info) {
      if (!info.id) {
        return
      }
      const index = utils.getItemIndex(info.id)
      if (index === false) {
        return
      }

      const soundData = Object.assign({}, state.list[index], info)
      Vue.set(state.list, index, soundData)

      // update to db
      playListDbClient.update(info.id, info)
    },

    /**
     * Set all data of list (use for init only)
     */
    [types.SET_LIST] (state, list) {
      state.list = list
    },

    /**
     * Remove an item from list
     */
    [types._REMOVE] (state, id) {
      const index = utils.getItemIndex(id)
      if (index === false)
        return
      state.list.splice(index, 1)
    },
  },

  actions: {
    /**
     * Remove an item from play list
     */
    [types.REMOVE] ({commit, dispatch, rootState, getters}, id) {
      // if the current playing sound id equals the id which will be removed, stop it first
      if (rootState.playState.current.id === id) {
        commit(playStateTypes.STOP)
        // load next sound, without playing
        dispatch(playStateTypes.LOAD_FROM_LIST_AND_SEEK, getters.nextSound)
      }

      // remove it from db
      if (playListDbClient.removeSync(id)) {
        commit(types._REMOVE, id)
      }
    },
  }
}
