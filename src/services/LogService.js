import AnsiConverter from 'ansi-to-html';
import {createReadStream, statSync} from 'node:fs';
import {toInt} from 'radash';
import dayjs from "dayjs";

class LogService {
    converter = new AnsiConverter();

    formatEntry(entry) {
        const logRegex = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2} [+-]\d{2}:\d{2}): (.+)$/;

        const match = entry.match(logRegex);

        if (!match) return entry;
        const timestamp = dayjs(match[1], 'YYYY-MM-DD HH:mm Z').toDate();
        const message = match[2];

        return ({ timestamp, message });
    }

    read(filePath, nextKey = null, linesPerRequest = 100) {
        const endBytes = toInt(nextKey);
        const lines = toInt(linesPerRequest);

        return new Promise((resolve) => {
            if (!filePath || lines < 1 || Number.isNaN(lines)) {
                console.error('Input params error : ', {filePath, lines});
                return resolve({lines: [], nextKey: -1, linesPerRequest: 100});
            }

            const fileSize = statSync(filePath).size;
            const end = endBytes && endBytes >= 0 ? endBytes : fileSize;
            const dataSize = lines * 200;
            const start = Math.max(0, end - dataSize);
            let data = '';

            const logFile = createReadStream(filePath, {start, end});
            logFile.on('data', function (chunk) {
                data += chunk.toString();
            });

            logFile.on('end', function () {
                data = data.split('\n');
                data = data.slice(-(lines + 1));
                const sentDateSize = Buffer.byteLength(data.join('\n'), 'utf-8');
                const nextKey = end - sentDateSize;
                data.pop();
                return resolve({lines: data, nextKey, linesPerRequest: lines});
            });
        });
    }
}

export default new LogService();
