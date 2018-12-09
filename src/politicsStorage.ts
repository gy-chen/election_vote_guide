import * as fs from 'fs';


export interface Politics {
    candidate: string;
    politics: string;
}

/**
 * Read stored politics
 * 
 * Expect stored in JSON and in following format;
 *   [
 *      {
 *          "candidate": name of the candidate,
 *          "politics": description of the politics
 *      }, ...
 *   ]
 *   
 * @param {str} path
 * @return promise that resovle as list of politics
 */
export const readPolitics = (path: string): Promise<Politics[]> => {

    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    }).then((rawPolitics: string) => JSON.parse(rawPolitics));
};
