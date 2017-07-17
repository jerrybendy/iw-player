/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

const path = require('path')
const fs = require('fs')
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
  console.log('[LOG] Insert a new sound: ' + data.id)
  db.get('list').push(data).write()
})

ipcMain.on('playListDb/update', function (e, id, data) {
  console.log('[LOG] Update sound: ' + id)
  db.get('list')
    .find({id: id})
    .assign(data)
    .write()
})

ipcMain.on('playListDb/get-all-data', function (e) {
  console.log('[LOG] Get all data from playList DB')
  e.sender.send('playListDb/get-all-data-reply', db.getState())
})

ipcMain.on('playListDb/save-current-state', function (e, state) {
  console.log('[LOG] Save current playing state to DB')
  db.get('current')
    .assign(state)
    .write()
})

ipcMain.on('playListDb/remove-sync', function (e, id) {
  console.log(`[LOG] Remove item from DB: ${id}`)

  const albumCover = db.get('list').find({id}).get('albumCover').value()

  // Remove album cover file
  if (albumCover && /^file:\/\//i.test(albumCover)) {
    let albumCoverPath = albumCover.substr(7)
    fs.unlink(albumCoverPath, function () {})
  }

  db.get('list')
    .remove({id})
    .write()

  e.returnValue = true
})
