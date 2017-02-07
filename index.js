var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var app = electron.app;

app.on('ready', function() {
  var mainWindow;
  mainWindow = new BrowserWindow();
  mainWindow.loadURL('www.google.ee');
});
