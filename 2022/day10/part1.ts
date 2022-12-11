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
const cycleChecks: number[] = [20, 60, 100, 140, 180, 220];
let signalStrength = 0;
let nextCycleCheck = cycleChecks.shift();
while (instructionQueue.length && nextCycleCheck) {
    if (cycle === nextCycleCheck) {
        signalStrength += nextCycleCheck*X;
        nextCycleCheck = cycleChecks.shift();
    }
    runCycle();
}
console.log(signalStrength);
// while (cycle < 6) {
//     console.log(instructionQueue);
//     runCycle();
//     console.log(X);
// }
