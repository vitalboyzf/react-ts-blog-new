export function parseDate(timestamp?: string) {
    if (timestamp === undefined) return timestamp;
    const date = new Date(+timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + "-" + month + "-" + day;
}

export function carefulParseDate(timestamp?: string) {
    if (timestamp === undefined) return timestamp;
    const date = new Date(+timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return year + "年" + month + "月" + day + "日    " + hour + ":" + minute + ":" + second;
}

