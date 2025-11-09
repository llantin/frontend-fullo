import { Node, TreeNode } from './TreeNode';
import { Paper } from './Paper';
import { TreeDirection, TreeOptions } from '../settings/Options';
import { G } from '@svgdotjs/svg.js';

export declare class Graph extends Paper {
    element: HTMLElement;
    options: TreeOptions;
    rootNode: TreeNode<Node> | undefined;
    constructor(element: HTMLElement, options: TreeOptions);
    changeLayout(direction?: TreeDirection): void;
    collapse(nodeId: string): void;
    construct(data: Node): void;
    expand(nodeId: string): void;
    fitScreen(): void;
    render({ keepOldPosition }?: {
        keepOldPosition?: boolean;
    }): void;
    renderEdge(node: TreeNode<Node>, group: G): void;
    renderNode(node: TreeNode<Node>, mainGroup: G): void;
}
