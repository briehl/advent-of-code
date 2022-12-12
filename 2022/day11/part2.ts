import * as fs from 'fs';
import * as path from 'path';
const inputFile: string = './day11/input.txt';

let monkeyMod = 1;

type WorryTest = {
    testDivision: number;
    trueTarget: number;
    falseTarget: number;
}

type ThrowTarget = {
    item: number;
    target: number;
}

class Monkey {
    id: number;
    items: number[];
    worryOperation: (old: number) => number;
    worryTest: WorryTest;
    totalInspections: number;

    constructor(id: number, startingItems: number[], worryTest: WorryTest, worryOperation: (old: number) => number) {
        this.id = id;
        this.items = startingItems;
        this.worryOperation = worryOperation;
        this.worryTest = worryTest;
        this.totalInspections = 0;
    }

    public inspect() {
        this.items = this.items.map((item) => {
            item = this.worryOperation(item);
            item = Math.ceil(item % monkeyMod);
            this.totalInspections++;
            return item;
        });
    }

    public throw(): ThrowTarget[] {
        const targets: ThrowTarget[] = this.items.map((item) => {
            return {
                item,
                target: item % this.worryTest.testDivision === Number(0) ? this.worryTest.trueTarget : this.worryTest.falseTarget
            }
        });
        this.items = [];
        return targets;
    }
}

function calcWorryOperation(fnStr: string): (old: number) => number {
    const ops = fnStr.split(' ');
    return (old: number) => {
        const firstVal = inputToValue(old, ops[0]);
        const secondVal = inputToValue(old, ops[2]);
        switch(ops[1]) {
            case '+':
                return firstVal + secondVal;
            case '-':
                return firstVal - secondVal;
            case '*':
                return firstVal * secondVal;
            default:
                return firstVal / secondVal;
        }
    }
}

function inputToValue(val: number, operand: string): number {
    if (operand === 'old') {
        return val;
    }
    else {
        return Number(operand);
    }
}

function loadInputFile(): Monkey[] {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(inputFile), 'utf-8').split(/\r?\n/);
    let monkeyId: number = -1;
    let items: number[] = [];
    let ops: string = '';
    let worryDiv: number = Number(-1);
    let worryTrue: number = -1;
    let worryFalse: number = -1;
    const monkeys: Monkey[] = [];
    inputBuffer.forEach((line) => {
        line = line.trim();
        if (line.startsWith('Monkey')) {
            monkeyId = Number(line.split(' ')[1].slice(0, 1));
        }
        else if (line.startsWith('Starting')) {
            const vals = line.split(': ')[1];
            items = vals.split(', ').map((item) => Number(item));
        }
        else if (line.startsWith('Operation')) {
            ops = line.split('new = ')[1];
        }
        else if (line.startsWith('Test')) {
            worryDiv = Number(line.split(' by ')[1]);
        }
        else if (line.startsWith('If true')) {
            worryTrue = Number(line.split('monkey ')[1]);
        }
        else if (line.startsWith('If false')) {
            worryFalse = Number(line.split('monkey ')[1]);
        }
        if (!line.length) {
            monkeys.push(new Monkey(
                monkeyId,
                items,
                {
                    testDivision: worryDiv,
                    trueTarget: worryTrue,
                    falseTarget: worryFalse
                },
                calcWorryOperation(ops)
            ));
            monkeyMod *= worryDiv;
            monkeyId = -1;
            items = [];
            ops = '';
            worryDiv = Number(-1);
            worryTrue = -1;
            worryFalse = -1;
        }
    });
    return monkeys;
}

const monkeys: Monkey[] = loadInputFile();


for (let i: number = 0; i < 10000; i++) {
    if (i === 1 || i === 20 || i % 1000 === 0) {
        monkeys.forEach((monkey) => {
            console.log(`${monkey.id}: ${monkey.totalInspections} -- ${monkey.items}`);
        });
        console.log('');
    }
    monkeys.forEach((monkey) => {
        monkey.inspect();
        const targets = monkey.throw();
        targets.forEach((item) => {
            monkeys[item.target].items.push(item.item);
        });
    });
}
monkeys.forEach((monkey) => {
    console.log(`${monkey.id}: ${monkey.totalInspections}`);
});
console.log('');

const inspections = monkeys.map((monkey) => monkey.totalInspections).sort((a, b) => b - a);
console.log(inspections[0] * inspections[1]);