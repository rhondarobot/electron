const electron = require('electron');
const { Tray, BrowserWindow, Menu, app } = electron;

class TimerTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);
        this.mainWindow = mainWindow;
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
        this.setToolTip('Timer App');
    }

    onClick(event, bounds) {
        // click event bounds
        const { x, y } = bounds;

        // window width and height
        const { width, height } = this.mainWindow.getBounds();

        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            const yPosition = process.platform === 'darwin' ? y : y - height;
            this.mainWindow.setBounds({
                x: x - width / 2,
                y: yPosition,
                width,
                height
            });
            this.mainWindow.show();
        }
    }
    
    onRightClick() {
        const menuConfig = Menu.buildFromTemplate([
            { 
                label: 'Quit',
                click: () => app.quit()
            }
        ]);

        this.popUpContextMenu(menuConfig);
    }
}

module.exports = TimerTray;