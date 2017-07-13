/**
 *
 * @author    Jerry Bendy
 * @since     7/8/2017
 * @copyright MicroBenefits
 */

import fs from 'fs'
import BufferAudio from './BufferAudio'

const $audioContext = new AudioContext()
const _bufferAudio = new BufferAudio($audioContext)

window.bufferAudio = _bufferAudio


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


export default {

  playFile (filePath) {
    // get the ArrayBuffer object for current sound
    getBuffer(filePath)
      .then(buffer => {
        _bufferAudio
          .initNewBuffer(buffer)
          .play()
      })
      .catch(e => {
        alert(e.message)
      })
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
}
