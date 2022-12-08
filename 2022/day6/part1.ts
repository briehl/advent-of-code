import * as fs from 'fs';
import * as path from 'path';
const inputFile: string = './day6/input.txt';

function loadInputFile() : string[] {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(inputFile), 'utf-8').split(/\r?\n/);
    return inputBuffer[0].split('');
}

function getFirstMarker(dataStream: string[], window: number) : number {
    for (let i:number=window; i<dataStream.length; i++) {
        const windowSet = new Set(dataStream.slice(i-window, i));
        if (windowSet.size === window) {
            return i;
        }
    }
    throw new Error('could not find marker');
}

const dataStream = loadInputFile();
// part 1
console.log(getFirstMarker(dataStream, 4));
// part 2
console.log(getFirstMarker(dataStream, 14));