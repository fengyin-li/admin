function conversionTime(val) {
    const time = new Date(val);
    return time.getFullYear() + '-' + addZero(time.getMonth() + 1) + '-' + addZero(time.getDate()) + ' ' + addZero(time.getHours()) + ':' + addZero(time.getMinutes()) + ':' + addZero(time.getSeconds());
};
function addZero(val) {
    return Number(val) < 10 ? '0' + String(val) : val;
};
export {conversionTime,addZero}