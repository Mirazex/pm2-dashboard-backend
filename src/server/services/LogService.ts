import AnsiConverter from 'ansi-to-html';
import { createReadStream, statSync } from 'fs';
import { toInt } from 'radash';

class LogService {
    converter = new AnsiConverter();

    read(filePath: string, nextKey: number | null = null, linesPerRequest = 100): Promise<{ lines: string[] | string; nextKey: number; linesPerRequest: number }> {
        const endBytes = toInt(nextKey);
        const lines = toInt(linesPerRequest);

        return new Promise((resolve) => {
            if (!filePath || lines < 1 || Number.isNaN(lines)) {
                console.error('Input params error : ', { filePath, lines });
                return resolve({ lines: [], nextKey: -1, linesPerRequest: 100 });
            }

            const fileSize = statSync(filePath).size;
            const end = endBytes && endBytes >= 0 ? endBytes : fileSize;
            const dataSize = lines * 200;
            const start = Math.max(0, end - dataSize);
            let data = '';
            const logFile = createReadStream(filePath, { start: start, end });
            logFile.on('data', function (chunk) {
                data += chunk.toString();
            });
            logFile.on('end', function () {
                data = data.split('\n');
                data = data.slice(-(lines + 1));
                const sentDateSize = Buffer.byteLength(data.join('\n'), 'utf-8');
                const nextKey = end - sentDateSize;
                data.pop();
                return resolve({ lines: data, nextKey, linesPerRequest: lines });
            });
        });
    }
}

export default new LogService();
