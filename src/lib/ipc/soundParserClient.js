/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

import {ipcRenderer} from 'electron'
import store from '../../stores'
import playListTypes from '../../stores/playList/types'


ipcRenderer.on('soundParser/parse-sound-reply', function (e, arg) {
  console.log(arg)
  store.commit(playListTypes.UPDATE, arg)
})


export default {
  sendToParser (id, filePath) {
    ipcRenderer.send('soundParser/parse-sound', id, filePath)
  }
}
