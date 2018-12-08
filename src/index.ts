#!/usr/bin/env node

import * as _ from 'lodash';
import * as yargs from 'yargs';
import chalk from 'chalk';
import * as politicsStorage from './politicsStorage';
import * as rate from './rate';

const printHigestScore = score => {
    console.log(chalk.green(`You should vote ${score.candidate}!`));
};

const createPrintScore = () => {
    let alt = false;

    return score => {
        const strWrap = alt ? chalk.cyan : chalk.white;
        console.log(strWrap(`Candidate: ${score.candidate}`));
        console.log(strWrap(`Score: ${score.score}`));
        alt = !alt;
    };
}

const main = () => {
    const argv = yargs
        .usage('Usage: $0 --path [path]')
        .describe('path', 'path to the file that contains politics. expect in format [{ candidate: name, politics: description}, ...]')
        .demand(['path'])
        .argv;

    const printScore = createPrintScore();

    return politicsStorage.readPolitics(argv.path)
        .then(_.shuffle)
        .then(shuffledPolitics => rate.askRatings(shuffledPolitics))
        .then(ratings => rate.scoreRatings(ratings))
        .then(scores => {
            scores = _.reverse(_.sortBy(scores, r => r.score));
            const higestScore = scores[0];
            printHigestScore(higestScore);
            console.log(chalk.bgMagenta`All Scores:`)
            for (const score of scores) {
                printScore(score);
            }
        });
}

if (require.main === module) {
    main();
}