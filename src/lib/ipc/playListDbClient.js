/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

import {ipcRenderer} from 'electron'
import store from '../../stores'
import playListTypes from '../../stores/playList/types'

ipcRenderer.on('playListDb/get-all-data-reply', function (e, data) {
  const {list, current} = data

  // Set data to list
  store.commit(playListTypes.SET_LIST, list)

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
