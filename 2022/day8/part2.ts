/**
 * I know for sure there's a simpler way to do this while loading.
 * It would look something like:
 * 1. calc L/R visible for each line.
 * 2. while iterating over each line (on the way down), can probably calculate the view from the top.
 * 3. Might be able to get the view from the bottom while loading with some clever positional tracking - this would need a fair amount of backtracking, though.
 *
 * However, I'm not doing any of that. I'm not even making a single clever function that makes use of (probably) 2 for loops.
 * I have a sick baby and have accumulated a total of ~9 hours of decent sleep in the past 3 nights.
 * Everything has halos right now.
 * I SUMMON THE BRUTEST OF FORCE. SMASH!
 */
import * as fs from 'fs';
import * as path from 'path';
const inputFile: string = './day8/input.txt';

type Tree = {
    height: number;
    row: number;
    col: number;
}

class TreeGrid {
    numRows: number;
    numCols: number;
    grid: Tree[][];
    visibility: number[][] = [];
    highScenicScore: number = 0;

    constructor(inputFile: string) {
        this.grid = this._loadInputFile(inputFile);
        this.numRows = this.grid.length;
        this.numCols = this.grid[0].length;
        for (let i=0; i<this.numRows; i++) {
            this.visibility.push([]);
            for (let j=0; j<this.numCols; j++) {
                const nextVisibility = this.calculateVisibility(i, j);
                this.visibility[i].push(nextVisibility);
                if (nextVisibility > this.highScenicScore) {
                    this.highScenicScore = nextVisibility;
                }
            }
        }
    }

    private _loadInputFile(inputFile: string): Tree[][] {
        const inputBuffer: string[] = fs.readFileSync(path.resolve(inputFile), 'utf-8').split(/\r?\n/);
        const grid = inputBuffer.map((row, rowIdx) => {
            return row.split('').map((col, colIdx) => ({
                height: Number(col),
                row: rowIdx,
                col: colIdx
            }));
        });
        return grid;
    }

    public calculateVisibility(row: number, col: number) {
        return this.countVisibleToLeft(row, col) *
            this.countVisibleToRight(row, col) *
            this.countVisibleToTop(row, col) *
            this.countVisibleToBottom(row, col);
    }

    /**
     *
     * @param row index (from 0) of row to look from
     */
    public countVisibleToLeft(row: number, col: number): number {
        if (col === 0) {
            return 0;
        }
        let count = 0;
        const height = this.grid[row][col].height;
        for (let i=col-1; i>=0; i--) {
            if (this.grid[row][i].height <= height) {
                count++;
            }
            if (this.grid[row][i].height === height) {
                return count;
            }
        }
        return count;
    }

    public countVisibleToRight(row: number, col: number): number {
        if (col === this.numCols-1) {
            return 0;
        }
        let count = 0;
        const height = this.grid[row][col].height;
        for (let i=col+1; i<this.numCols; i++) {
            if (this.grid[row][i].height <= height) {
                count++;
            }
            if (this.grid[row][i].height === height) {
                return count;
            }
        }
        return count;
    }

    public countVisibleToTop(row: number, col: number): number {
        if (row === 0) {
            return 0;
        }
        let count = 0;
        const height = this.grid[row][col].height;
        for (let i=row-1; i>=0; i--) {
            if (this.grid[i][col].height <= height) {
                count++;
            }
            if (this.grid[i][col].height === height) {
                return count;
            }
        }
        return count;
    }

    public countVisibleToBottom(row: number, col: number): number {
        if (row === this.numRows-1) {
            return 0;
        }
        let count = 0;
        const height = this.grid[row][col].height;
        for (let i=row+1; i<this.numRows; i++) {
            if (this.grid[i][col].height <= height) {
                count++;
            }
            if (this.grid[i][col].height === height) {
                return count;
            }
        }
        return count;
    }
}

const grid = new TreeGrid(inputFile);
console.log(grid.highScenicScore);