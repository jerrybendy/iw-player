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

      // start a parser to parse this sound metadata
      soundParserClient.sendToParser(newSound.id, newSound.path)

      // add to db
      playListDbClient.insert(newSound)
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
  },
}
