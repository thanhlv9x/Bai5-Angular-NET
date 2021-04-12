import { ReturnStatement } from "@angular/compiler";
import { FormControl } from "@angular/forms";

export const isValidDate = (c: FormControl) => {
    const REGEX = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    let dt = '';
    try {
        dt = new Date(c.value).toLocaleDateString();
    } catch (error) {}
    return !REGEX.test(dt) || c.value === '' ? {
        isValidDate: true
    } : null;
}

export const isValidName = (c: FormControl) => {
    const REGEX = /[^A-Za-z0-9 ]/;
    let normalStr = removeAscent(c.value);
    return REGEX.test(normalStr) || c.value === '' ? {
        isValidName: true
    } : null;
}

export const isValidCode = (c: FormControl) => {
    const REGEX = /[^A-Za-z0-9]/;
    let normalStr = removeAscent(c.value);
    return REGEX.test(normalStr) || c.value === '' ? {
        isValidCode: true
    } : null;
}

export const isValidEmail = (c: FormControl) => {
    const REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !REGEX.test(c.value) || c.value === '' ? {
        isValidEmail: true
    } : null;
}

function removeAscent(str: string) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}