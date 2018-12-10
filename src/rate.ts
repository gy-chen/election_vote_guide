import * as _ from 'lodash';
import * as inquirer from 'inquirer';
import { Politics } from './politicsStorage';

export interface Rating {
    politics: Politics;
    rating: number;
}

export interface Score {
    candidate: string;
    score: number;
}

interface ChoiceName {
    [propName: number]: string;
}

const CHOICE_NAME: ChoiceName = {
    1: '★',
    2: '★★',
    3: '★★★',
    4: '★★★★',
    5: '★★★★★'
}

/**
 * Ask user to rate the politics.
 * 
 * @param {list} politics 
 * @return promise that resolve list of ratings that user anwsered
 */
export const askRatings = (politics: Politics[]) => inquirer.prompt(politics.map((p, i): inquirer.Question => (
    {
        type: 'list',
        name: String(i),
        message: p.politics,
        default: 2,
        choices: [5, 4, 3, 2, 1].map(val => ({ name: CHOICE_NAME[val], value: val }))
    }
))).then(answers => {
    const ratings: Rating[] = [];
    for (const key in answers) {
        ratings.push({
            politics: politics[parseInt(key)],
            rating: answers[key]
        });
    }
    return ratings;
});

/**
 * Calculate higest rating candidate of given ratings.
 * 
 * @param {list} ratings list of rating
 * @return object that contains keys candidate and score.
 */
export const scoreRatings = (ratings: Rating[]) => {
    const counter: {
        [candidateName: string]: {
            score: number;
            count: number;
        }
    } = {};

    for (const rating of ratings) {
        counter[rating.politics.candidate] = counter[rating.politics.candidate] || { score: 0, count: 0 };
        counter[rating.politics.candidate].score += rating.rating;
        counter[rating.politics.candidate].count += 1;
    }

    const scores: Score[] = [];
    for (const candidate in counter) {
        scores.push({ candidate, score: counter[candidate].score / counter[candidate].count });
    }

    return scores;
}
