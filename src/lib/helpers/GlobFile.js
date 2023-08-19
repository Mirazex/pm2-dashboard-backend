import {isArray, isString, unique} from "radash";
import glob from "glob";
import path from "node:path";

export default class GlobFile {

    static async load(fullPath) {
        const routerPath = path.resolve(fullPath);
        const globedFiles = GlobFile.resolve(routerPath);

        return await Promise.all(
            globedFiles.map(async (path) => {
                const file = await import(path);
                return file.default;
            })
        );
    }

    static resolve(patterns, remove) {
        const urlRegex = new RegExp('^(?:[a-z]+:)?\\/\\/', 'i');
        let output = [];

        if (isArray(patterns)) {
            patterns.forEach((pattern) => {
                const nonUniqueFiles = GlobFile.resolve(pattern, remove);
                output = unique(nonUniqueFiles);
            });
        } else if (isString(patterns)) {
            if (urlRegex.test(patterns)) {
                output.push(patterns);
            } else {
                let files = glob.sync(patterns);

                if (remove) {
                    files = files.map((file) => file.replace(remove, ''));
                }

                output = unique(files);
            }
        }

        return output;
    }

}
