const fs = require('fs');


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
const readPolitics = path => {

    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    }).then(rawPolitics => JSON.parse(rawPolitics));
};


module.exports.readPolitics = readPolitics;