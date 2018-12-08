"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
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
exports.readPolitics = function (path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    }).then(function (rawPolitics) { return JSON.parse(rawPolitics); });
};
