/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

const path = require('path')
const {app, ipcMain} = require('electron')
const lowDb = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')

const db = lowDb(path.resolve(app.getPath('appData'), app.getName(), 'play-list.db'), {
  storage: fileAsync,
})

// set default
db.defaults({
  list: [],
  current: {
    id: '',
    playbackTime: 0,
    volume: 50,
  }
}).write()


ipcMain.on('playListDb/insert', function (e, data) {
  console.log('Insert')
  db.get('list').push(data).write()
})

ipcMain.on('playListDb/update', function (e, id, data) {
  db.get('list')
    .find({id: id})
    .assign(data)
    .write()
})

ipcMain.on('playListDb/get-all-data', function (e) {
  e.sender.send('playListDb/get-all-data-reply', db.getState())
})
