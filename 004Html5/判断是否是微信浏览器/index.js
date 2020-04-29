function isWeixnBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

if (is_weixn()) {
    document.write("微信浏览器")
} else {
    document.write("其他浏览器")
}