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
    volume: 50,
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
     * Play a file
     */
    [types.PLAY_FILE] (state, filePath) {
      audio.playFile(filePath)
        .then((data) => {
          console.log(data)
          state.isPlaying = audio.isPlaying
        })
    },

    /**
     * Play a file which is in playList
     */
    [types.PLAY_FROM_LIST] (state, playListItem) {
      state.current = Object.assign({}, playListItem)
      audio.playFile(playListItem.path)
        .then(() => {
          // this is async op, will not effect on vue dev-tool
          state.isPlaying = audio.isPlaying
        })
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
    [types.TOGGLE_MUTE] (state) {
      state.isMute = !state.isMute
      audio.setVolume(state.isMute ? 0 : state.volume)
    },
  },


  getters: {

  },
}
