/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

const fs = require('fs')
const path = require('path')
const {app, ipcMain} = require('electron')
const musicMetadata = require('musicmetadata')

ipcMain.on('soundParser/parse-sound', (e, id, filePath) => {

  const readableStream = fs.createReadStream(filePath);
  musicMetadata(readableStream, {duration: true, fileSize: readableStream.length}, function (err, metadata) {
    if (err) {
      sendErrorReply(err.message)
      return
    }

    readableStream.close()

    const retData = {
      id: id,
      title: metadata.title,
      artist: metadata.artist.length > 0 ? metadata.artist[0] : '',
      album: metadata.album,
      year: metadata.year,
      genre: metadata.genre.length > 0 ? metadata.genre[0] : '',
      duration: metadata.duration,
    }

    // pre-send data that already got
    e.sender.send('soundParser/parse-sound-reply', retData)

    // save album cover to file
    if (metadata.picture.length > 0) {
      const {format = '', data = null} = metadata.picture[0]
      if (data && data.length > 0) {
        const albumCoverFolder = path.resolve(app.getPath('appData'), app.getName(), 'album-covers')
        if (!fs.existsSync(albumCoverFolder)) {
          fs.mkdirSync(albumCoverFolder)
        }

        const targetFilePath = path.resolve(albumCoverFolder, `${id}.${format}`)
        fs.writeFile(targetFilePath, data, function (err) {
          if (err) {
            sendErrorReply(err.message)
            return
          }

          e.sender.send('soundParser/parse-sound-reply', {
            id,
            albumCover: 'file://' + targetFilePath,
          })
        })
      }
    }
  })


  function sendErrorReply(message) {
    console.log(`[ERROR] Parse sound failed, ${message}`)
    e.sender.send('soundParser/parse-sound-reply', {
      id: id,
      error: message,
    })
  }
})
