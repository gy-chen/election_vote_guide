#!/usr/bin/env node
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var yargs = require("yargs");
var chalk_1 = require("chalk");
var politicsStorage = require("./politicsStorage");
var rate = require("./rate");
var printHigestScore = function (score) {
    console.log(chalk_1.default.green("You should vote " + score.candidate + "!"));
};
var createPrintScore = function () {
    var alt = false;
    return function (score) {
        var strWrap = alt ? chalk_1.default.cyan : chalk_1.default.white;
        console.log(strWrap("Candidate: " + score.candidate));
        console.log(strWrap("Score: " + score.score));
        alt = !alt;
    };
};
var main = function () {
    var argv = yargs
        .usage('Usage: $0 --path [path]')
        .describe('path', 'path to the file that contains politics. expect in format [{ candidate: name, politics: description}, ...]')
        .demand(['path'])
        .argv;
    var printScore = createPrintScore();
    return politicsStorage.readPolitics(argv.path)
        .then(function (politics) { return _.shuffle(politics); })
        .then(function (shuffledPolitics) { return rate.askRatings(shuffledPolitics); })
        .then(function (ratings) { return rate.scoreRatings(ratings); })
        .then(function (scores) {
        scores = _.reverse(_.sortBy(scores, function (r) { return r.score; }));
        var higestScore = scores[0];
        printHigestScore(higestScore);
        console.log(chalk_1.default.bgMagenta(templateObject_1 || (templateObject_1 = __makeTemplateObject(["All Scores:"], ["All Scores:"]))));
        for (var _i = 0, scores_1 = scores; _i < scores_1.length; _i++) {
            var score = scores_1[_i];
            printScore(score);
        }
    });
};
if (require.main === module) {
    main();
}
var templateObject_1;
