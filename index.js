const path = require('path');
const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;
const TimerTray = require('./app/timer_tray');

let mainWindow;
let tray;

app.on('ready', () => {
    app.dock.hide();
    mainWindow = new BrowserWindow({
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false // so the timer won't show until the tray icon is pressed
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    mainWindow.on('blur', () => {
        mainWindow.hide();
    });

    const iconName = process.platform === 'win32' ? 'windows-icon.png': 'iconTemplate.png';
    const iconPath = path.join(__dirname,`./src/assets/${iconName}`);
    tray = new TimerTray(iconPath, mainWindow);
    // tray.on('click', (event, bounds) => {
        // // click event bounds
        // const { x, y } = bounds;

        // // window width and height
        // const { width, height } = mainWindow.getBounds();

        // if (mainWindow.isVisible()) {
        //     mainWindow.hide();
        // } else {
        //     const yPosition = process.platform === 'darwin' ? y : y - height;
        //     mainWindow.setBounds({
        //         x: x - width / 2,
        //         y: yPosition,
        //         width,
        //         height
        //     });
        //     mainWindow.show();
        // }    
    // });  <--this section was moved over to timer_tray.js. (see the different syntax)
});
