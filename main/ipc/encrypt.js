/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

const {ipcMain} = require('electron')
const sha256 = require('js-sha256').sha256

ipcMain.on('encrypt/sync-sha256', function (e, content) {
  e.returnValue = sha256(content)
})
