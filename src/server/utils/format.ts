export function bytesToSize(bytes: number, precision?: number) {
    var kilobyte = 1024;
    var megabyte = kilobyte * 1024;
    var gigabyte = megabyte * 1024;
    var terabyte = gigabyte * 1024;

    if (bytes >= 0 && bytes < kilobyte) {
        return bytes + ' bytes';
    } else if (bytes >= kilobyte && bytes < megabyte) {
        return (bytes / kilobyte).toFixed(precision) + ' kbytes';
    } else if (bytes >= megabyte && bytes < gigabyte) {
        return (bytes / megabyte).toFixed(precision) + ' mbytes';
    } else if (bytes >= gigabyte && bytes < terabyte) {
        return (bytes / gigabyte).toFixed(precision) + ' gbytes';
    } else if (bytes >= terabyte) {
        return (bytes / terabyte).toFixed(precision) + ' tbytes';
    } else {
        return bytes + ' bytes';
    }
}

export function timeSince(date: number) {
    var seconds = Math.floor((Date.now() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + ' yrs';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + ' months';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + ' days';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + ' hrs';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
};
