const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor(){
        super({
            height: 500,
            width: 300,
            frame: false,
            resizable: false,
            show: false // so the timer won't show until the tray icon is pressed
        });
        this.on('blur', this.onBlur.bind(this));
    }

    onBlur {
        this.hide();
    }
}

module.exports = MainWindow;
