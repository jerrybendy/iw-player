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

    // about current play file
    id: null,  // current play file ID, no file will be play if it's null
    playbackTime: 0,
    duration: 0,  // total time length of current file
    title: '',
    artist: '',
    album: '',
    albumCover: '',
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
     * Play the audio
     */
    [types.PLAY] (state) {
      if (!state.id) {
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
     * Change play position
     */
    [types.SEEK] (state, time) {
      if (time > state.duration) {
        time = state.duration
      }
      audio.seek(time)
      state.playbackTime = time
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
      state.volume = volume
    },
    /**
     * Set is mute
     */
    [types.TOGGLE_MUTE] (state) {
      state.isMute = !state.isMute
    },
  },
}
