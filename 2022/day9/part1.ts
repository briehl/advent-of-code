import * as fs from 'fs';
import * as path from 'path';
const inputFile: string = './day9/input.txt';

type Position = {
    x: number;
    y: number;
}

class Knot {
    pos: Position;
    visited = new Set<string>();

    constructor(initX: number, initY: number) {
        this.pos = {x: initX, y: initY};
        this.visitedPos();
    }

    private visitedPos() {
        this.visited.add(`${this.pos.x},${this.pos.y}`);
    }

    public isTouching(target: Knot): boolean {
        const tx = target.pos.x;
        const ty = target.pos.y;
        const x = this.pos.x;
        const y = this.pos.y;

        // compare 9 local points.
        // 3 above
        return ((tx === x-1 || tx === x || tx === x+1) && (ty === y-1 || ty === y || ty === y+1));
    }

    public moveToward(target: Knot) {
        if (this.isTouching(target)) {
            return;
        }
        const tx = target.pos.x;
        const ty = target.pos.y;
        const x = this.pos.x;
        const y = this.pos.y;
        let newX = x;
        let newY = y;
        if (tx === x) {
            newY = (ty-y)/Math.abs(ty-y) + y;
        }
        else if (ty === y) {
            newX = (tx-x)/Math.abs(tx-x) + x;
        }
        else {
            newX = (tx-x)/Math.abs(tx-x) + x;
            newY = (ty-y)/Math.abs(ty-y) + y;
        }
        this.pos.x = newX;
        this.pos.y = newY;
        this.visitedPos();
    }

    /**
     * Moves the position one step in the given direction.
     * U/D = Y+/-
     * R/L = X+/-
     * @param direction string one of U, D, L, R, UL, UR, DL, DR
     */
    public move(direction: string) {
        switch(direction) {
            case 'U':
                this.pos.y++;
                break;
            case 'D':
                this.pos.y--;
                break;
            case 'L':
                this.pos.x--;
                break;
            case 'R':
                this.pos.x++;
                break;
            case 'UL':
                this.pos.y++;
                this.pos.x--;
                break;
            case 'UR':
                this.pos.y++;
                this.pos.x++;
                break;
            case 'DL':
                this.pos.y--;
                this.pos.x--;
                break;
            case 'DR':
                this.pos.y--;
                this.pos.x++;
                break;
            default:
                throw new Error('Unknown direction ' + direction);
        }
        this.visitedPos();
    }
}

function loadInputFile(head: Knot, tail: Knot) {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(inputFile), 'utf-8').split(/\r?\n/);

    console.log(tail.pos);
    inputBuffer.forEach((line) => {
        const splitLine: string[] = line.split(' ');
        const dir: string = splitLine[0];
        const steps: number = Number(splitLine[1]);
        for (let i=0; i<steps; i++) {
            head.move(dir);
            tail.moveToward(head);
            // console.log(tail.pos);
        }
    });
}

const head = new Knot(0, 0);
const tail = new Knot(0, 0);
loadInputFile(head, tail);

// console.log(head.pos);
// console.log(tail.pos);
console.log(tail.visited.size);