import * as fs from 'fs';
import * as path from 'path';
const inputFile: string = './day7/input.txt';

type ElfFile = {
    path: string;
    name: string;
    size: number;
};

type ElfDir = {
    path: string;
    files: ElfFile[];
    totalSize: number;
    subDirPaths: string[]
};

type ElfTree = {
    [path: string]: ElfDir
};

function cd(curDir: string, nextDir: string): string {
    if (nextDir === '..' && curDir !== '/') {
        return curDir.split('/').slice(0, -2).join('/') + '/';
    }
    return curDir + nextDir + '/';
}

function parseFile(curDir: string, fileInfo: string[]): ElfFile {
    return {
        path: curDir + fileInfo[1],
        size: Number(fileInfo[0]),
        name: fileInfo[1]
    };
}

function ls(curDir: string, contents: string[]): ElfDir {
    const subDirPaths: string[] = [];
    const files: ElfFile[] = [];
    const newDir = {
        path: curDir,
        files,
        totalSize: 0,
        subDirPaths
    };
    contents.forEach((line) => {
        const lineInfo = line.split(' ');
        if (lineInfo[0] === 'dir') {
            newDir.subDirPaths.push(curDir + lineInfo[1] + '/');
        }
        else {
            const newFile = parseFile(curDir, lineInfo);
            newDir.files.push(newFile);
            newDir.totalSize += newFile.size;
        }
    });
    return newDir;
}

function parseInput(inputBuffer: string[]): ElfTree {
    let curDir: string = '/';
    const tree: ElfTree = {};
    while (inputBuffer.length) {
        const cmd = inputBuffer.shift();
        if (cmd?.startsWith('$')) {
            const commandParams = cmd.split(' ');
            if (commandParams[1] === 'cd') {
                curDir = cd(curDir, commandParams[2]);
            }
            else if (commandParams[1] === 'ls') {
                const contents: string[] = [];
                while(inputBuffer.length && !inputBuffer[0].startsWith('$')) {
                    const nextFile = inputBuffer.shift();
                    if (nextFile) {
                        contents.push(nextFile);
                    }
                }
                const newDir: ElfDir = ls(curDir, contents);
                tree[curDir] = newDir;
            }
        }
    }
    return tree;
}

function loadInputFile() : ElfTree {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(inputFile), 'utf-8').split(/\r?\n/);
    return parseInput(inputBuffer);
}

function getDirectorySize(fileTree: ElfTree, dir: string): number {
    let size = fileTree[dir].totalSize;
    fileTree[dir].subDirPaths.forEach((subDir) => {
        size += getDirectorySize(fileTree, subDir);
    });
    return size;
}


const fileTree = loadInputFile();
const dirToSize: {[key: string]: number} = {};

Object.keys(fileTree).forEach((dir) => dirToSize[dir] = getDirectorySize(fileTree, dir));

const freeSpace = 70000000 - dirToSize['/'];
const requiredSpace = 30000000 - freeSpace;

console.log('free space: ' + freeSpace);
console.log('required space: ' + requiredSpace);

const dirsOfMinSize = Object.keys(dirToSize).filter((dir) => dirToSize[dir] >= requiredSpace);

// part 2
console.log(dirToSize[
    dirsOfMinSize.sort((a, b) => dirToSize[a] - dirToSize[b])[0]
]);