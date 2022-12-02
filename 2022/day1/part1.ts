import * as fs from 'fs';
import * as path from 'path';

const inputFile:string = './day1/input.txt';

type Elf = {
    total: number;
    snacks: Array<number>;
}

function readInputFile(infile: string): Elf[] {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(infile), 'utf-8').split(/\n\n/);
    return inputBuffer.map((calorieList: string): Elf => {
        const snacks: number[] = calorieList.split('\n').map(value => Number(value));
        return {
            total: snacks.reduce((prev, cur) => prev + cur, 0),
            snacks: snacks
        };
    });
}

const elves:Elf[] = readInputFile(inputFile);

console.log('Part 1');
console.log(elves.reduce((maxElfSnacks, elf) => elf.total > maxElfSnacks ? elf.total : maxElfSnacks, 0));

console.log('Part 2');
const sortedElves = elves.sort((a, b) => b.total - a.total);
console.log(sortedElves[0].total + sortedElves[1].total + sortedElves[2].total);