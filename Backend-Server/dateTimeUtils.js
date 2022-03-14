const zeroPad = num => num < 10 ? `0${num}`: `${num}`;

const getFormattedDate = (date = new Date()) => `${date.getFullYear()}/${zeroPad(date.getMonth() + 1)}/${zeroPad(date.getDate())} ${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}:${zeroPad(date.getSeconds())}`;

module.exports ={
	getFormattedDate
}