import * as fs from 'fs';
import * as path from 'path';
const inputFile: string = './day3/input.txt';

type RucksackSet = {
    strings: string[];
    sharedItem: string;
    sharedItemCode: number;
};

/**
 * converts a-z => 1-26, A-Z => 27-52
 * assumes we're only getting those characters
 * @param char single character (at least, treated as such) to convert
 */
function charToPriority(char: string) {
    const charCode = char.charCodeAt(0);
    if (charCode <= 90) {
        return charCode - 38;
    }
    else {
        return charCode - 96;
    }
}

function stringsToRucksack(inputStrs: string[]): RucksackSet {
    const ruckSet: Set<string>[] = inputStrs.map((str) => new Set(str.split('')));
    const firstFilter = Array.from(ruckSet[0]).filter((item) => ruckSet[1].has(item));
    const sharedItem = firstFilter.filter((item) => ruckSet[2].has(item))[0];
    return {
        strings: inputStrs,
        sharedItem,
        sharedItemCode: charToPriority(sharedItem)
    };
}

function loadInputFile(infile: string): RucksackSet[] {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(infile), 'utf-8').split(/\r?\n/);
    // iterate over triplets
    const rucksacks: RucksackSet[] = [];
    for (let i: number = 0; i<inputBuffer.length; i+=3) {
        rucksacks.push(stringsToRucksack(inputBuffer.slice(i, i+3)));
    }
    return rucksacks;
}

const rucksacks = loadInputFile(inputFile);
console.log(rucksacks.reduce((total, rucksack) => total += rucksack.sharedItemCode, 0));