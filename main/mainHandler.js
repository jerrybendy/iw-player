/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

const fs = require('fs')
const path = require('path')
const {app, ipcMain} = require('electron')

require('./ipc/soundParser')
require('./ipc/encrypt')
require('./ipc/playListDb')
require('./ipc/globalWindow')

module.exports = function (win) {

  /*
   * Create `cache` folder
   */
  const cachePath = path.resolve(app.getPath('appData'), app.getName(), 'cache')
  fs.exists(cachePath, function (isExist) {
    if (!isExist) {
      fs.mkdir(cachePath, function (err) {
        if (err) {
          console.warn('[ERROR] Create cache path error')
        }
      })
    }
  })


  /**
   * Print console messages
   */
  ipcMain.on('console', function (e, message) {
    console.log(message)
  })
}
