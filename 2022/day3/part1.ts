import * as fs from 'fs';
import * as path from 'path';
const inputFile: string = './day3/input.txt';

type Rucksack = {
    slot1: {[key: string]: number};
    slot2: {[key: string]: number};
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

function stringToMap(inputStr: string): {[key: string]: number} {
    return inputStr.split('').reduce((mapping: {[key: string]: number}, char) => {
        if (char in mapping) {
            mapping[char]++;
        }
        else {
            mapping[char] = 1;
        }
        return mapping;
    }, {});
}

function stringToRucksack(inputStr: string): Rucksack {
    if (inputStr.length % 2 !== 0) {
        throw new Error(inputStr + ' length is not divisible by 2');
    }
    const slots = [
        stringToMap(inputStr.slice(0, inputStr.length / 2)),
        stringToMap(inputStr.slice(inputStr.length / 2))
    ];
    const sharedItem = Object.keys(slots[0]).filter(item => item in slots[1])[0];
    return {
        slot1: slots[0],
        slot2: slots[1],
        sharedItem,
        sharedItemCode: charToPriority(sharedItem)
    };
}

function loadInputFile(infile: string): Rucksack[] {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(infile), 'utf-8').split(/\r?\n/);
    return inputBuffer.map(inputStr => stringToRucksack(inputStr));
}

const rucksacks = loadInputFile(inputFile);
console.log(rucksacks.reduce((total, rucksack) => total += rucksack.sharedItemCode, 0));