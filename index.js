const path = require('path');
const electron = require('electron');
const { app, ipcMain } = electron;
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

let mainWindow;
let tray;

app.on('ready', () => {
    app.dock.hide();
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
    // mainWindow.loadURL(`file://${__dirname}/src/index.html`); // taking this out so you can pass it in as 
    // a parameter/argument for the MainWindow class in the main_window.js file
    // keep this code here (line 12 - `mainWindow.loadURL()` if you decide you want to not be so specific
    // about the URL and might change it later or add more later

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
   
ipcMain.on('update-timer', (event, timeLeft) => {
    tray.setTitle(timeLeft); // this is the magic using the method off the extended Tray class from `timer-tray.js`
});
