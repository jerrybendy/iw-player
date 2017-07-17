/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

import {ipcRenderer} from 'electron'
import store from '../../stores'
import playListTypes from '../../stores/playList/types'
import playStateTypes from '../../stores/playState/types'
import audio from '../audio'

ipcRenderer.on('playListDb/get-all-data-reply', function (e, data) {
  const {list, current} = data

  // Set data to list
  store.commit(playListTypes.SET_LIST, list)

  // set current play sound
  const id = current.id
  let currentItem = list.filter(item => item.id === id)

  currentItem = currentItem.length > 0 ? currentItem[0] : false

  ipcRenderer.send('console', current)
  ipcRenderer.send('console', currentItem)

  if (id && currentItem) {
    currentItem.seek = current.playbackTime
    currentItem.volume = current.volume

    store.dispatch(playStateTypes.LOAD_FROM_LIST_AND_SEEK, currentItem)
  }
})


/**
 * Send current play state to main thread and save it to db
 */
window.addEventListener('beforeunload', function () {
  ipcRenderer.send('playListDb/save-current-state', {
    id: store.state.playState.current.id,
    volume: store.state.playState.volume,
    playbackTime: parseInt(audio.currentTime),
  })
})


export default {

  getAllData () {
    return ipcRenderer.send('playListDb/get-all-data')
  },

  insert (data) {
    ipcRenderer.send('playListDb/insert', data)
  },

  update (id, data) {
    ipcRenderer.send('playListDb/update', id, data)
  },

}
