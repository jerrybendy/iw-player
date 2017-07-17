/**
 *
 * @author    Jerry Bendy
 * @since     7/14/2017
 */

import {ipcRenderer} from 'electron'

export default {

  /**
   * Close window and quit the application
   */
  closeMainWindow () {
    ipcRenderer.send('globalWindow/close-main-window')
  },
}
