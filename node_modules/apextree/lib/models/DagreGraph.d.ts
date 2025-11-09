import { Paper } from './Paper';
import { NestedNode } from './GraphNode';
import { TreeDirection, TreeOptions } from '../settings/Options';
import { G } from '@svgdotjs/svg.js';
import { Edge } from '@dagrejs/dagre';

export declare class Graph extends Paper {
    private data;
    private graph;
    private nodeMap;
    element: HTMLElement;
    options: TreeOptions;
    constructor(element: HTMLElement, options: TreeOptions);
    private calculateLayout;
    private resetGraph;
    private setGraphNodesAndEdges;
    private setNodesRecursively;
    changeLayout(direction?: TreeDirection): void;
    collapse(nodeId: string): void;
    construct(data: NestedNode): void;
    expand(nodeId: string): void;
    fitScreen(): void;
    render({ keepOldPosition }?: {
        keepOldPosition?: boolean;
    }): void;
    renderEdge(edge: Edge, group: G): void;
    renderGroupedLeafNodes(nodeId: string, mainGroup: G): void;
    renderLeafNode(nodeId: string, mainGroup: G, index: number): void;
    renderNode(nodeId: string, mainGroup: G): void;
}
