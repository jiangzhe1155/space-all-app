export const getCurrentDevice = () => {
    let isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    return isMobile ? 'App' : 'PC';
};


export const SYSTEM_ID = '123123123';

export function sizeToStr(size: number) {
    var data = "";
    if (size < 0.1 * 1024) { //如果小于0.1KB转化成B
        data = size.toFixed(2) + " B";
    } else if (size < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB
        data = (size / 1024).toFixed(2) + " KB";
    } else if (size < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
        data = (size / (1024 * 1024)).toFixed(2) + " MB";
    } else { //其他转化成GB
        data = (size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    }
    var sizestr = data + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {//当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
}

export const getTimeState = () => {
    let timeNow = new Date();
    let hours = timeNow.getHours();
    let state = ``;
    if (hours >= 0 && hours <= 10) {
        state = `早上好!`;
    } else if (hours > 10 && hours <= 14) {
        state = `中午好!`;
    } else if (hours > 14 && hours <= 18) {
        state = `下午好!`;
    } else if (hours > 18 && hours <= 24) {
        state = `晚上好!`;
    }
    return state;
}


