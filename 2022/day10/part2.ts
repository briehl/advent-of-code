import * as fs from 'fs';
import * as path from 'path';
const inputFile: string = './day10/input.txt';

// init X register to be 1
let X: number = 1;
let cycle: number = 1;

type Instruction = {
    value: number;
    cycles: number;
}

const instructionQueue: Instruction[] = [];

function runCycle() {
    cycle++;
    if (!instructionQueue.length) {
        return;
    }
    instructionQueue[0].cycles--;
    if (instructionQueue[0].cycles === 0) {
        X += instructionQueue[0].value;
        instructionQueue.shift();
    }
}

function loadInputFile() {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(inputFile), 'utf-8').split(/\r?\n/);
    inputBuffer.forEach((step) => {
        if (step === 'noop') {
            instructionQueue.push({value: 0, cycles: 1});
        }
        else {
            instructionQueue.push({value: Number(step.split(' ')[1]), cycles: 2});
        }
    });
}

loadInputFile();
for (let rowCount=0; rowCount<6; rowCount++) {
    const row: string[] = [];
    const nextStop = cycle+40;
    while (cycle < nextStop) {
        // console.log('cycle ' + cycle);
        // const spritePos: string[] = [];
        // for (let i=0; i<40; i++) {
        //     if (i === X-1 || i === X || i === X+1) {
        //         spritePos.push('#');
        //     }
        //     else {
        //         spritePos.push('.');
        //     }
        // }
        // console.log('X = ' + X);
        // console.log('sprite: ' + spritePos.join(''));
        const pos = (cycle % 40) - 1;
        if (pos === X-1 || pos === X || pos === X+1) {
            row.push('#');
        }
        else {
            row.push('.');
        }
        // console.log('   row: ' + row.join(''));
        runCycle();
    }
    console.log(row.join(''));
}
