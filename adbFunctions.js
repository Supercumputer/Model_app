const { exec } = require('child_process');

function startApp(event, packageName) {
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    exec(`${adbPath} shell monkey -p ${packageName} -c android.intent.category.LAUNCHER 1`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            event.reply('open-app-reply', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            event.reply('open-app-reply', `Stderr: ${stderr}`);
            return;
        }
        event.reply('open-app-reply', `App opened: ${packageName}`);
    });
}
function closeApp(event, packageName) {
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    exec(`${adbPath} shell am force-stop ${packageName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            event.reply('close-app-reply', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            event.reply('close-app-reply', `Stderr: ${stderr}`);
            return;
        }
        event.reply('close-app-reply', `App closed: ${packageName}`);
    });
}
function pressBack() {

    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    // Gửi lệnh ADB để nhấn nút back
    exec(`${adbPath} shell input keyevent 4`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return `Error: ${error.message}`;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return `Stderr: ${stderr}`;
        }
        console.log(`Back button pressed`);
        return `Back button pressed`;
    });
}
function pressHome() {

    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    // Gửi lệnh ADB để nhấn nút back
    exec(`${adbPath} shell input keyevent 3`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return `Error: ${error.message}`;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return `Stderr: ${stderr}`;
        }
        console.log(`Back button pressed`);
        return `Home button pressed`;
    });
}
function pressMenu() {

    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    // Gửi lệnh ADB để nhấn nút back
    exec(`${adbPath} shell input keyevent 187`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return `Error: ${error.message}`;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return `Stderr: ${stderr}`;
        }
        console.log(`Menu button pressed`);
        return `Menu button pressed`;
    });
}

function inStallApp(event, apkPath) {
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    const safeApkPath = `"${apkPath}"`;

    exec(`${adbPath} install ${safeApkPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            event.reply('install-app-reply', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            event.reply('install-app-reply', `Stderr: ${stderr}`);
            return;
        }
        event.reply('install-app-reply', `App installed: ${apkPath}`);
    });
}

function unInStallApp(event, packageName) {
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    exec(`${adbPath} uninstall ${packageName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            event.reply('uninstall-app-reply', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            event.reply('uninstall-app-reply', `Stderr: ${stderr}`);
            return;
        }
        event.reply('uninstall-app-reply', `App uninstalled: ${packageName}`);
    });
}

function isInStallApp(event, packageName) {
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    exec(`${adbPath} shell pm list packages | findstr ${packageName}`, (error, stdout, stderr) => {

        if (stdout.includes(packageName)) {
            event.reply('check-app-reply', `App is installed: ${packageName}`);
            console.log(`App is installed: ${packageName}`);

        } else {
            event.reply('check-app-reply', `App is not installed: ${packageName}`);
            console.log(`App is not installed: ${packageName}`);
        }
    });
}

function lockPhone(event) {
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    exec(`${adbPath} shell input keyevent 26`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            event.reply('lock-phone-reply', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            event.reply('lock-phone-reply', `Stderr: ${stderr}`);
            return;
        }
        event.reply('lock-phone-reply', `Phone locked successfully.`);
    });
}

function unlockPhone(event) {
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    exec(`${adbPath} shell input keyevent 82`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            event.reply('unlock-phone-reply', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            event.reply('unlock-phone-reply', `Stderr: ${stderr}`);
            return;
        }
        event.reply('unlock-phone-reply', `Phone unlocked successfully.`);
    });
}

function deciceActions(event, action) {

    switch (action) {

        case 'unlock':
            unlockPhone(event);
            break;
        default:
            lockPhone(event);
            break;
    }

}

function toggleAirplaneMode(event) {
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`;

    exec(`${adbPath} shell settings put global airplane_mode_on 1`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            event.reply('service-toggle-reply', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            event.reply('service-toggle-reply', `Stderr: ${stderr}`);
            return;
        }
        event.reply('service-toggle-reply', `Airplane mode toggled successfully.`);
    });
}

function toggleWifi(event) {
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`;

    // Kiểm tra trạng thái Wi-Fi
    exec(`${adbPath} shell dumpsys wifi`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error(`Error: ${error ? error.message : stderr}`);
            event.reply('service-toggle-reply', `Error checking Wi-Fi state: ${error ? error.message : stderr}`);
            return;
        }

        // Kiểm tra nếu đầu ra chứa "Wi-Fi is enabled" hoặc "Wi-Fi is disabled"
        const currentState = stdout.includes('Wi-Fi is enabled');
        const newState = currentState ? 'disable' : 'enable';
        const toggleCommand = `${adbPath} shell svc wifi ${newState}`;

        exec(toggleCommand, (error, stdout, stderr) => {
            if (error || stderr) {
                console.error(`Error: ${error ? error.message : stderr}`);
                event.reply('service-toggle-reply', `Error toggling Wi-Fi: ${error ? error.message : stderr}`);
                return;
            }
            event.reply('service-toggle-reply', `Wi-Fi ${newState === 'enable' ? 'enabled' : 'disabled'} successfully.`);
        });
    });
}

function toggleData(event) {
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`;
    exec(`${adbPath} shell svc data enable`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            event.reply('service-toggle-reply', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            event.reply('service-toggle-reply', `Stderr: ${stderr}`);
            return;
        }
        event.reply('service-toggle-reply', `Mobile data toggled successfully.`);
    });
}

function toggleLocation(event) {
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`;
    exec(`${adbPath} shell settings put secure location_mode 3`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            event.reply('service-toggle-reply', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            event.reply('service-toggle-reply', `Stderr: ${stderr}`);
            return;
        }
        event.reply('service-toggle-reply', `Location mode toggled successfully.`);
    });
}

function toggleService(event, service) {
    console.log(service);

    switch (service) {
        case 'AirplaneMode':
            toggleAirplaneMode(event);
            break;
        case 'Wifi':
            toggleWifi(event);
            break;
        case '3g/4g':
            toggleData(event);
            break;
        case 'Location':
            toggleLocation(event);
            break;
        default:
            event.reply('service-toggle-reply', 'Unknown action');
            break;
    }

}


function transferFile(event, file) {

}

module.exports = {
    startApp,
    closeApp,
    pressBack,
    pressHome,
    pressMenu,
    inStallApp,
    unInStallApp,
    isInStallApp,
    deciceActions,
    toggleService,
    transferFile
}       