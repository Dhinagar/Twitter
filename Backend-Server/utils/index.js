const crypto = require('crypto');
const fs = require('fs');



const zeroPad = num => num < 10 ? `0${num}` : `${num}`;

/**
 * @description Gets a Local formatted date from Date object
 * @param {Date} date - A JavaScript Date object
 * @returns {string} A Local formatted date. DD/MM/YYYY
 */
const getLocalFormattedDate = (date = new Date()) => `${zeroPad(date.getDate())}/${zeroPad(date.getMonth() + 1)}/${date.getFullYear()} ${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}:${zeroPad(date.getSeconds())}`;

/**
 * @description Gets a UTC formatted date from Date object
 * @param {Date} date - A JavaScript Date object
 * @returns {string} A UTC formatted date. YYYY/MM/DD
 */
const getUTCFormattedDate = (date = new Date()) => `${date.getFullYear()}/${zeroPad(date.getMonth() + 1)}/${zeroPad(date.getDate())} ${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}:${zeroPad(date.getSeconds())}`;

/**
 * @description generated a unique hash
 * @returns {string}
 */
const generateID = () => {
    const timeNow = new Date().getTime();
    const randomHash = crypto.randomBytes(16).toString('hex');
    return `${timeNow}_${randomHash}`;
}


/**
 * @description Gets all the files in a directory
 * @param {string} dirPath - Directory path 
 * @returns {string[]}
 */
const getFiles = (dirPath) => new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
        if (err) reject(err);
        resolve(files);
    });
})


/**
 * Check if a file exists for a given path
 * @param {string} filepath Path of the file 
 * @returns {boolean}
 */
const fileExistsAsync = (filepath) => new Promise((resolve) => {
    fs.access(filepath, (err) => {
        if (err) resolve(false);
        resolve(true);
    })
});

const unlinkAsync = (filepath) => new Promise((resolve, reject) => {
    fs.unlink(filepath, (err) => {
        if (err) reject(err);
        resolve();
    });
});


module.exports = {
    getLocalFormattedDate,
    getUTCFormattedDate,
    generateID,
    getFiles,
    fileExistsAsync,
    unlinkAsync
}