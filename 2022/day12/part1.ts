import * as fs from 'fs';
import * as path from 'path';
const inputFile: string = './day12/input.txt';

class Node {
    label: string;
    height: number;
    edges: Set<Node>;
    visited: boolean = false;

    constructor(label: string, height: number) {
        this.label = label;
        this.height = height;
        this.edges = new Set<Node>();
    }

    addEdgeTo(node: Node) {
        this.edges.add(node);
    }
}

type HeightGraph = {
    nodes: Node[][];
    nodeMap: {[key: string]: Node};
    startNode: Node;
    endNode: Node;
}

function possiblyAddEdge(curNode: Node, nextNode: Node) {
    if (nextNode.height === curNode.height || nextNode.height === curNode.height + 1 || nextNode.height < curNode.height) {
        curNode.addEdgeTo(nextNode);
    }
}

function loadInputFile(): HeightGraph {
    const inputBuffer: string[] = fs.readFileSync(path.resolve(inputFile), 'utf-8').split(/\r?\n/);
    const nodes: Node[][] = [];
    const nodeMap: {[key: string]: Node} = {};
    let startNode: Node = new Node('none', 0);
    let endNode: Node = new Node('none', 0);
    const numRows: number = inputBuffer.length;
    const numCols: number = inputBuffer[0].length;

    inputBuffer.forEach((line, row) => {
        nodes.push([]);
        const heights: string[] = line.split('');
        heights.forEach((height, col) => {
            if (height === 'S') {
                startNode = new Node(`${row},${col}`, 'a'.charCodeAt(0));
                nodes[row].push(startNode);
            }
            else if (height === 'E') {
                endNode = new Node(`${row},${col}`, 'z'.charCodeAt(0));
                nodes[row].push(endNode);
            }
            else {
                nodes[row].push(new Node(`${row},${col}`, height.charCodeAt(0)));
            }
            const newNode = nodes[row][col];
            nodeMap[newNode.label] = newNode;
        });
    });

    for (let i=0; i<numRows; i++) {
        for (let j=0; j<numCols; j++) {
            const curNode = nodes[i][j];
            if (i > 0) {
                possiblyAddEdge(curNode, nodes[i-1][j]);
            }
            if (j > 0) {
                possiblyAddEdge(curNode, nodes[i][j-1]);
            }
            if (i < numRows-1) {
                possiblyAddEdge(curNode, nodes[i+1][j]);
            }
            if (j < numCols-1) {
                possiblyAddEdge(curNode, nodes[i][j+1]);
            }
        }
    }

    return {
        nodes,
        nodeMap,
        startNode,
        endNode
    };
}

function shortestPathTo(graph: HeightGraph, start: Node, end: Node): number {
    const nodeDist: {[key: string]: number} = {};
    const nodeQueue: {[key: string]: Node} = {};
    Object.keys(graph.nodeMap).forEach((label) => {
        nodeDist[label] = Infinity;
        nodeQueue[label] = graph.nodeMap[label];
    });
    nodeDist[start.label] = 0;
    while (Object.keys(nodeQueue).length) {
        const minLabel = Object.keys(nodeQueue).sort((a, b) => nodeDist[a] - nodeDist[b])[0];
        const minNode = nodeQueue[minLabel];
        const curDist = nodeDist[minLabel];
        delete nodeQueue[minLabel];

        minNode.edges.forEach((nextNode) => {
            const nextDist = curDist + 1;
            if (nextDist < nodeDist[nextNode.label]) {
                nodeDist[nextNode.label] = curDist + 1;
            }
        });
    }
    return nodeDist[end.label];
}

const graph: HeightGraph = loadInputFile();
console.log(shortestPathTo(graph, graph.startNode, graph.endNode));
