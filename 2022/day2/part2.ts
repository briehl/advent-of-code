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
    A: 1,
    B: 2,
    C: 3
};

const comboChoice: StringToNumber = {
    X: 0,
    Y: 3,
    Z: 6
}

const winCombo: StringToString = {
    A: 'B',
    B: 'C',
    C: 'A'
};

const tieCombo: StringToString = {
    A: 'A',
    B: 'B',
    C: 'C'
};

const loseCombo: StringToString = {
    A: 'C',
    B: 'A',
    C: 'B'
};

function readInputFile(infile: string): Round[] {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(infile), 'utf-8').split(/\r?\n/);
    return inputBuffer.map((line: string): Round => {
        const roundLine: string[] = line.split(' ');
        const opponent = roundLine[0];
        const me = roundLine[1];
        let score = comboChoice[me];
        switch(me) {
            case 'X':
                score += choiceScore[loseCombo[opponent]];
                break;
            case 'Y':
                score += choiceScore[tieCombo[opponent]];
                break;
            case 'Z':
                score += choiceScore[winCombo[opponent]];
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