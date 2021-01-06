import { message } from "antd";
import { RcFile } from "antd/lib/upload";

export function parseDate(timestamp: string) {
    const date = new Date(+timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + "-" + month + "-" + day;
}

export function carefulParseDate(timestamp: string) {
    const date = new Date(+timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return year + "年" + month + "月" + day + "日    " + hour + ":" + minute + ":" + second;
}


export const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传.png/.jpg格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
        message.error('图片大小必须小于1M');
    }
    return isJpgOrPng && isLt2M;
}