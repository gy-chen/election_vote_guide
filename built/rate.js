"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var CHOICE_NAME = {
    1: '★',
    2: '★★',
    3: '★★★',
    4: '★★★★',
    5: '★★★★★'
};
/**
 * Ask user to rate the politics.
 *
 * @param {list} politics
 * @return promise that resolve list of ratings that user anwsered
 */
exports.askRatings = function (politics) { return inquirer.prompt(politics.map(function (p, i) { return ({
    type: 'list',
    name: String(i),
    message: p.politics,
    default: 2,
    choices: [5, 4, 3, 2, 1].map(function (val) { return ({ name: CHOICE_NAME[val], value: val }); })
}); })).then(function (answers) {
    var ratings = [];
    for (var key in answers) {
        ratings.push({
            politics: politics[parseInt(key)],
            rating: answers[key]
        });
    }
    return ratings;
}); };
/**
 * Calculate higest rating candidate of given ratings.
 *
 * @param {list} ratings list of rating
 * @return object that contains keys candidate and score.
 */
exports.scoreRatings = function (ratings) {
    var counter = {};
    for (var _i = 0, ratings_1 = ratings; _i < ratings_1.length; _i++) {
        var rating = ratings_1[_i];
        counter[rating.politics.candidate] = counter[rating.politics.candidate] || { score: 0, count: 0 };
        counter[rating.politics.candidate].score += rating.rating;
        counter[rating.politics.candidate].count += 1;
    }
    var scores = [];
    for (var candidate in counter) {
        scores.push({ candidate: candidate, score: counter[candidate].score / counter[candidate].count });
    }
    return scores;
};
