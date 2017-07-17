/**
 *
 * @author    Jerry Bendy
 * @since     7/14/2017
 */

const {app, ipcMain} = require('electron')

ipcMain.on('globalWindow/close-main-window', function () {
  app.quit()
})
