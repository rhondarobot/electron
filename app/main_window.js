const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor(url){
        super({
            height: 500,
            width: 300,
            frame: false,
            resizable: false,
            show: false,
            webPreferences: { backgroundThrottling: false }, // so the timer won't show until the tray icon is pressed
        });
        
        this.loadURL(url); // extracting this from index js and instead of saying `mainWindow.loadURL()`,
                           // we are now able to put in `this.loadURL()` bc it references the MainWindow class
        this.on('blur', this.onBlur.bind(this));
    }

    onBlur() {
        this.hide(); // can say `this.hide()` instead of `mainWindow.hide()`because `this` refers to the mainWindow class now
    }
}

module.exports = MainWindow;
