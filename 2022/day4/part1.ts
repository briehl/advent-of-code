import * as fs from 'fs';
import * as path from 'path';
const inputFile: string = './day4/input.txt';

type SectionPair = {
    firstStart: number;
    secondStart: number;
    firstEnd: number;
    secondEnd: number;
    hasOverlap: boolean;
};

function splitSectionStr(sectionStr: string): number[] {
    const splitStr = sectionStr.split('-');
    return [Number(splitStr[0]), Number(splitStr[1])];
}

function makeSectionPair(section1: string, section2: string): SectionPair {
    const [firstStart, firstEnd] = splitSectionStr(section1);
    const [secondStart, secondEnd] = splitSectionStr(section2);

    let hasOverlap: boolean = false;
    // check if first contains second
    if (firstStart <= secondStart && firstEnd >= secondEnd) {
        hasOverlap = true;
    }
    // check if second contains first
    if (secondStart <= firstStart && secondEnd >= firstEnd) {
        hasOverlap = true;
    }
    return {
        firstStart,
        firstEnd,
        secondStart,
        secondEnd,
        hasOverlap
    };
}

function loadInputFile(infile: string): SectionPair[] {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(infile), 'utf-8').split(/\r?\n/);
    return inputBuffer.map((line) => {
        const [section1, section2] = line.split(',');
        return makeSectionPair(section1, section2);
    });
}

const sections = loadInputFile(inputFile);
console.log(sections.reduce((total, section) => {
    if (section.hasOverlap) {
        total++;
    }
    return total;
}, 0));