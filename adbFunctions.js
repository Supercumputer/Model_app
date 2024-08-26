const { exec, execSync } = require('child_process');
const fs = require('fs');
const { DOMParser } = require('xmldom');
const xpath = require('xpath');

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
    console.log(event);

    exec(`${adbPath} shell svc wifi enable`, (error, stdout, stderr) => {
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
        event.reply('service-toggle-reply', `Wi-Fi toggled successfully.`);
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
function transferFile(event, action, localFilePath, remoteFilePath) {
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    // Xác định lệnh dựa trên hành động
    let command;
    if (action === 'push') {
        command = `${adbPath} push "${localFilePath}" "${remoteFilePath}"`;
    } else if (action === 'pull') {
        command = `${adbPath} pull "${remoteFilePath}" "${localFilePath}"`;
    } else {
        event.reply('file-transfer-reply', `Unknown action: ${action}`);
        return;
    }

    // Thực thi lệnh
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            event.reply('file-transfer-reply', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            event.reply('file-transfer-reply', `Stderr: ${stderr}`);
            return;
        }
        event.reply('file-transfer-reply', `File transfer successful: ${action}`);
    });
}

function touch(event, xpathQuery, timeOut = 10, touchType = 'Normal', delay = 100) {

    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    try {
        // Bước 1: Trích xuất giao diện hiện tại và lưu vào tệp XML
        execSync(`${adbPath} shell uiautomator dump /sdcard/ui.xml`);
        execSync(`${adbPath} pull /sdcard/ui.xml .`);

        // Bước 2: Đọc và phân tích tệp XML để lấy tọa độ từ XPath
        const data = fs.readFileSync('ui.xml', 'utf8');
        const doc = new DOMParser().parseFromString(data);
        const nodes = xpath.select(xpathQuery, doc);

        if (nodes.length > 0) {
            const boundsAttr = nodes[0].getAttribute('bounds');
            const boundsRegex = /(\d+),(\d+)\]\[(\d+),(\d+)/;
            const match = boundsAttr.match(boundsRegex);

            if (match) {
                const [left, top, right, bottom] = match.slice(1).map(Number);
                const x = Math.floor((left + right) / 2);
                const y = Math.floor((top + bottom) / 2);

                const timeOutMilliseconds = timeOut * 1000;

                // Bước 3: Thực hiện lệnh chạm dựa trên loại chạm
                let touchCommand;
                switch (touchType) {
                    case 'Long':
                        // Chạm giữ lâu bằng cách sử dụng swipe với cùng tọa độ và thời gian giữ lâu
                        touchCommand = `${adbPath} shell input swipe ${x} ${y} ${x} ${y} ${timeOutMilliseconds}`;
                        break;
                    case 'Double':
                        // Chạm hai lần bằng cách sử dụng tap hai lần với khoảng cách ngắn
                        touchCommand = `${adbPath} shell input tap ${x} ${y} && ${adbPath} shell input tap ${x} ${y}`;
                        break;
                    default:
                        // Chạm bình thường
                        touchCommand = `${adbPath} shell input tap ${x} ${y}`;
                        break;
                }

                if (delay > 0) {
                    setTimeout(() => {
                        execSync(touchCommand);
                        event.reply('touch-reply', `Element touched at (${x}, ${y})`);
                    }, delay);
                } else {
                    execSync(touchCommand);
                    event.reply('touch-reply', `Element touched at (${x}, ${y})`);
                }

            } else {
                event.reply('touch-reply', 'No bounds attribute found for the element');
            }
        } else {
            event.reply('touch-reply', 'No element found for the XPath query');
        }
    } catch (error) {
        event.reply('touch-reply', `Error: ${error.message}`);
    }
}

function swipeSimple(event, direction) {
    console.log('Direction:', direction);

    // Đường dẫn đầy đủ tới adb
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    // Kiểm tra tham số
    if (!direction) {
        event.reply('swipe-reply', 'Lỗi: Thiếu tùy chọn Direction');
        return;
    }

    // Xác định tọa độ swipe dựa trên direction
    let startX, startY, endX, endY;

    switch (direction) {
        case 'Up':
            startX = 500;
            startY = 1000;
            endX = 500;
            endY = 200;
            break;
        case 'Down':
            startX = 500;
            startY = 300;
            endX = 500;
            endY = 800;
            break;
        case 'Left':
            startX = 600;
            startY = 500;
            endX = 300;
            endY = 500;
            break;
        case 'Right':
            startX = 200;
            startY = 500;
            endX = 1000;
            endY = 500;
            break;
        default:
            event.reply('swipe-reply', 'Lỗi: Direction không hợp lệ');
            return;
    }

    console.log(`Start: (${startX}, ${startY}), End: (${endX}, ${endY})`);

    // Xây dựng lệnh swipe
    const swipeCommand = `${adbPath} shell input swipe ${startX} ${startY} ${endX} ${endY}`;
    console.log(`Đang thực hiện lệnh: ${swipeCommand}`); // Dòng debug

    try {
        // Thực thi lệnh swipe
        const stdout = execSync(swipeCommand).toString();
        console.log(`Đầu ra của lệnh: ${stdout}`); // Dòng debug

        event.reply('swipe-reply', 'Swipe/Scroll đã được thực hiện thành công');
    } catch (error) {
        console.error(`Lỗi khi thực hiện lệnh: ${error.message}`);
        event.reply('swipe-reply', `Lỗi: ${error.message}`);
    }
}
function swipeCustom(event, startX, startY, endX, endY, duration) {

    console.log(startX, startY, endX, endY, duration);
    // Đường dẫn đầy đủ tới adb
    const adbPath = `"C:/Users/MY ASUS/AppData/Local/Android/Sdk/platform-tools/adb.exe"`; // Đường dẫn đầy đủ tới adb

    // Kiểm tra các tham số cần thiết
    if (startX === undefined || startY === undefined || endX === undefined || endY === undefined || duration === undefined) {
        event.reply('swipe-reply', 'Lỗi: Thiếu tham số cần thiết cho Custom Mode');
        return;
    }

    // Xây dựng lệnh swipe với các tham số custom
    const swipeCommand = `${adbPath} shell input swipe ${startX} ${startY} ${endX} ${endY} ${duration}`;

    console.log(`Đang thực hiện lệnh: ${swipeCommand}`); // Dòng debug

    try {
        // Thực thi lệnh swipe
        const stdout = execSync(swipeCommand).toString();
        console.log(`Đầu ra của lệnh: ${stdout}`); // Dòng debug

        event.reply('swipe-reply', 'Swipe/Scroll đã được thực hiện thành công');
    } catch (error) {
        console.error(`Lỗi khi thực hiện lệnh: ${error.message}`);
        event.reply('swipe-reply', `Lỗi: ${error.message}`);
    }
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
    transferFile,
    touch,
    swipeSimple,
    swipeCustom
}       