/**
 *
 * @author    Jerry Bendy
 * @since     7/7/2017
 * @copyright MicroBenefits
 */

const {app, BrowserWindow} = require('electron')

let win = null;

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({
    title: 'Music Player',
    // frame: false,
    width: 320,
    height: 640,
    minWidth: 320,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    backgroundColor: '#383838',
  });

  // Specify entry point to default entry point of vue.js
  win.loadURL('http://localhost:9090');
  // win.loadURL('file://' + __dirname + '/dist/index.html');

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

});
//create the application window if the window variable is null
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
//quit the app once closed
app.on('window-all-closed', function () {
  app.quit();
});