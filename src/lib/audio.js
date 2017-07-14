/**
 *
 * @author    Jerry Bendy
 * @since     7/8/2017
 */

import fs from 'fs'
import BufferAudio from './BufferAudio'
import store from '../stores'
import playStateTypes from '../stores/playState/types'

const $audioContext = new AudioContext()
const _bufferAudio = new BufferAudio({
  audioContext: $audioContext,
  onEndCallback () {
    // Commit a play-end message when playing completely
    store.commit(playStateTypes.PLAY_END)
    // Auto play the next sound
    const nextSound = store.getters.nextSound
    store.commit(playStateTypes.PLAY_FROM_LIST, nextSound)
  }
})

window.bufferAudio = _bufferAudio

export default {

  async playFile (filePath) {
    // get the ArrayBuffer object for current sound
    const buffer = await getBuffer(filePath)
      .catch(e => {
        alert(e.message)
      })

    _bufferAudio
      .initNewBuffer(buffer)
      .play()
  },

  play () {
    _bufferAudio.play()
  },

  pause () {
    _bufferAudio.pause()
  },

  stop () {
    _bufferAudio.stop()
  },

  seek (playbackTime) {
    _bufferAudio.seek(playbackTime)
  },

  get isPlaying () {
    return _bufferAudio._isPlaying
  },

  /**
   * Current playing time
   * @returns {number} time in second
   */
  get currentTime () {
    if (!_bufferAudio._isPlaying) {
      return _bufferAudio._playbackTime
    }
    return (Date.now() - _bufferAudio._startTimestamp)/1000 + _bufferAudio._playbackTime
  },

}



/**
 * Covert a Buffer object to ArrayBuffer
 *
 * @param buf
 * @returns {ArrayBuffer}
 */
function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}


function getBuffer(filePath) {
  return new Promise((resolve) => {
    fs.readFile(filePath, function(err, data) {
      if (err) {
        throw err
      }
      $audioContext.decodeAudioData(toArrayBuffer(data), function (res) {
        resolve(res)
      })
    })
  })
}
