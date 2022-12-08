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
    visibleFromLeft: Set<Tree> = new Set<Tree>();
    visibleFromTop: Set<Tree> = new Set<Tree>();
    visibleFromRight: Set<Tree> = new Set<Tree>();
    visibleFromBottom: Set<Tree> = new Set<Tree>();

    constructor(inputFile: string) {
        this.grid = this._loadInputFile(inputFile);
        this.numRows = this.grid.length;
        this.numCols = this.grid[0].length;
        this.countVisibleTrees();
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

    public countVisibleTrees() {
        this.visibleFromLeft = new Set<Tree>();
        this.visibleFromTop = new Set<Tree>();
        this.visibleFromRight = new Set<Tree>();
        this.visibleFromBottom = new Set<Tree>();
        for (let i=0; i<this.numRows; i++) {
            this.countVisibleFromLeft(i).forEach((tree) => this.visibleFromLeft.add(tree));
            this.countVisibleFromRight(i).forEach((tree) => this.visibleFromRight.add(tree));
        }
        for (let i=0; i<this.numCols; i++) {
            this.countVisibleFromTop(i).forEach((tree) => this.visibleFromTop.add(tree));
            this.countVisibleFromBottom(i).forEach((tree) => this.visibleFromBottom.add(tree));
        }
    }

    /**
     *
     * @param row index (from 0) of row to look from
     */
    public countVisibleFromLeft(row: number): Set<Tree> {
        let curHeight = -1;
        const visible = new Set<Tree>();
        for (let i=0; i<this.numCols; i++) {
            if (this.grid[row][i].height > curHeight) {
                visible.add(this.grid[row][i]);
                curHeight = this.grid[row][i].height;
            }
        }
        return visible;
    }

    public countVisibleFromRight(row: number): Set<Tree> {
        let curHeight = -1;
        const visible = new Set<Tree>();
        for (let i=this.numCols-1; i>=0; i--) {
            if (this.grid[row][i].height > curHeight) {
                visible.add(this.grid[row][i]);
                curHeight = this.grid[row][i].height;
            }
        }
        return visible;
    }

    public countVisibleFromTop(col: number) {
        const visible = new Set<Tree>();
        let curHeight = -1;
        for (let i=0; i<this.numRows; i++) {
            if (this.grid[i][col].height > curHeight) {
                visible.add(this.grid[i][col]);
                curHeight = this.grid[i][col].height;
            }
        }
        return visible;
    }

    public countVisibleFromBottom(col: number) {
        const visible = new Set<Tree>();
        let curHeight = -1;
        for (let i=this.numRows-1; i>=0; i--) {
            if (this.grid[i][col].height > curHeight) {
                visible.add(this.grid[i][col]);
                curHeight = this.grid[i][col].height;
            }
        }
        return visible;
    }
}

const grid = new TreeGrid(inputFile);
console.log('rows ' + grid.numRows + ' cols ' + grid.numCols);
const totalVisible = new Set<Tree>();
[grid.visibleFromBottom, grid.visibleFromLeft, grid.visibleFromRight, grid.visibleFromTop].forEach((visibleSet: Set<Tree>) => {
    visibleSet.forEach((tree) => totalVisible.add(tree));
});
console.log(totalVisible.size);
// console.log(totalVisible);
