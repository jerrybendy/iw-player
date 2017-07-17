/**
 *
 * @author    Jerry Bendy
 * @since     7/17/2017
 */

import {ipcRenderer} from 'electron'

export default {
  log (message) {
    ipcRenderer.send('console', 'LOG', message)
  },

  info (message) {
    ipcRenderer.send('console', 'INFO', message)
  },

  debug (message) {
    ipcRenderer.send('console', 'DEBUG', message)
  },

  warn (message) {
    ipcRenderer.send('console', 'WARN', message)
  },

  error (message) {
    ipcRenderer.send('console', 'ERROR', message)
  },
}
