/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

import Vue from 'vue'
import types from './types'
import soundParserClient from '../../lib/ipc/soundParserClient'
import encryptClient from '../../lib/ipc/encryptClient'

const DEFAULT_SOUND = {
  id: null,  // use the sha256 of path as id
  title: '',
  artist: '',
  album: '',
  albumCover: '',
  duration: 0,
  path: '',
}

const utils = {
  isIdExists (list, id) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return true
      }
    }
    return false
  },
  getItemIndex (list, id) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return i
      }
    }
    return false
  },
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
      if (utils.isIdExists(state.list, soundId)) {
        console.log('[INFO] Sound is already exist')
        return
      }

      const newSound = Object.assign({}, DEFAULT_SOUND, {
        id: soundId,
      }, sound)

      state.list.push(newSound)

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
      const index = utils.getItemIndex(state.list, info.id)
      if (index === false) {
        return
      }

      const soundData = Object.assign({}, state.list[index], info)
      Vue.set(state.list, index, soundData)
    },
  },
}
