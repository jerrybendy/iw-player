/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

import {ipcRenderer} from 'electron'

export default {
  /**
   * sha256 encryption
   *
   * @param content
   */
  sha256 (content) {
    return ipcRenderer.sendSync('encrypt/sync-sha256', content)
  }
}
