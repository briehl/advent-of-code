import * as fs from 'fs';
import * as path from 'path';
const stackFile: string = './day5/initial_stacks.txt';
const moveFile: string = './day5/move_order.txt';

function updateStacks(stacks: string[][], moveCount: number, start: number, end: number): string[][] {
    if (stacks[start].length < moveCount) {
        throw new Error('Not enough moves available in stack!');
    }
    for (let i=0; i<moveCount; i++) {
        stacks[end].push(String(stacks[start].pop()));
    }
    return stacks;
}

function loadStackFile(): string[][] {
    // note - I completely reformatted the stack file because it was rude.
    const inputBuffer: string[] = fs.readFileSync(path.resolve(stackFile), 'utf-8').split(/\r?\n/);
    return inputBuffer.map((stack) => stack.split(''));
}

function loadAndProcessMoves(stacks: string[][]): string[][] {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(moveFile), 'utf-8').split(/\r?\n/);
    inputBuffer.forEach((line) => {
        const moveMatch = line.match(/move (\d+) from (\d+) to (\d+)/);
        if (moveMatch?.length && moveMatch?.length >= 3) {
            stacks = updateStacks(stacks, Number(moveMatch[1]), Number(moveMatch[2])-1, Number(moveMatch[3])-1);
        }
        else {
            console.error('bad instruction: ' + line);
        }
    });
    return stacks;
}

const stacks = loadAndProcessMoves(loadStackFile());
const finalString = stacks.map((stack) => {
    return stack[stack.length-1];
});
console.log(finalString);