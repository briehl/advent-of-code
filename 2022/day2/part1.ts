import * as fs from 'fs';
import * as path from 'path';

type Round = {
    opponent: string;
    me: string;
    score: number;
};
const inputFile:string = './day2/input.txt';

type StringToNumber = { [key: string]: number; };
type StringToString = { [key: string]: string; };

const choiceScore: StringToNumber = {
    X: 1,
    Y: 2,
    Z: 3
};

const winCombo: StringToString = {
    A: 'Y',
    B: 'Z',
    C: 'X'
};

const tieCombo: StringToString = {
    A: 'X',
    B: 'Y',
    C: 'Z'
};

function readInputFile(infile: string): Round[] {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(infile), 'utf-8').split(/\r?\n/);
    return inputBuffer.map((line: string): Round => {
        const roundLine: string[] = line.split(' ');
        const opponent = roundLine[0];
        const me = roundLine[1];
        let score: number = choiceScore[me];
        if (winCombo[opponent] === me) {
            score += 6;
        } else if (tieCombo[opponent] === me) {
            score += 3;
        }
        return {
            opponent,
            me,
            score
        };
    });
}

const rounds: Round[] = readInputFile(inputFile);
console.log(rounds.reduce((acc, round) => acc += round.score, 0));