/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */
import types from './types'
import audio from '../../lib/audio'

window.audio = audio

export default {

  state: {
    isPlaying: false,
    volume: 100,
    isMute: false,

    current: {
      id: null,  // use the sha256 of path as id
      title: '',
      artist: '',
      album: '',
      albumCover: '',
      duration: 0,
      path: '',
    }
  },


  mutations: {
    /**
     * Only set current playing sound, without play it
     */
    [types.SET_CURRENT] (state, playListItem) {
      state.current = Object.assign({}, playListItem)
    },

    /**
     * Play the audio
     */
    [types.PLAY] (state) {
      if (!state.current.id) {
        alert('No file playing')
        return
      }
      audio.play()
      state.isPlaying = audio.isPlaying
    },
    /**
     * Pause the audio
     */
    [types.PAUSE] (state) {
      audio.pause()
      state.isPlaying = audio.isPlaying
    },

    /**
     * Stop playing
     */
    [types.STOP] (state) {
      audio.stop()
      state.isPlaying = audio.isPlaying
    },

    /**
     * Change play position
     */
    [types.SEEK] (state, time) {
      if (time > state.duration) {
        time = state.duration
      }
      audio.seek(time)
      state.isPlaying = audio.isPlaying
    },
    /**
     * End
     */
    [types.PLAY_END] (state) {
      state.isPlaying = audio.isPlaying
    },

    /**
     * Change volume
     */
    [types.CHANGE_GAIN] (state, volume) {
      audio.setVolume(volume)
      state.volume = volume
    },
    /**
     * Set is mute
     */
    [types.TOGGLE_MUTE] (state, isMute) {
      state.isMute = typeof isMute === 'boolean' ? isMute : !state.isMute
      audio.setVolume(state.isMute ? 0 : state.volume)
    },

    /**
     * Change is music is playing currently
     */
    [types.CHANGE_IS_PLAYING] (state, isPlaying) {
      state.isPlaying = isPlaying
    },
  },


  actions: {
    /**
     * Play a file which is in playList
     * Can set a callback function when play is started
     */
    [types.PLAY_FROM_LIST] (context, playListItem) {
      context.commit(types.SET_CURRENT, playListItem)

      audio.playFile(playListItem.path)
        .then(() => {
          context.commit(types.CHANGE_IS_PLAYING, audio.isPlaying)
        })
    },

    /**
     *
     * @param context
     * @param playListItem
     */
    [types.LOAD_FROM_LIST_AND_SEEK] (context, playListItem) {
      let seek = playListItem.seek || 0,
        volume

      if (seek) {
        delete playListItem.seek
      }
      if (playListItem.volume) {
        volume = playListItem.volume
        delete playListItem.volume
      }

      context.commit(types.SET_CURRENT, playListItem)

      audio.loadFile(playListItem.path, seek)
        .then(() => {
          context.commit(types.CHANGE_IS_PLAYING, audio.isPlaying)
          if (volume) {
            context.commit(types.CHANGE_GAIN, volume)
          }
        })
    },
  },
}
