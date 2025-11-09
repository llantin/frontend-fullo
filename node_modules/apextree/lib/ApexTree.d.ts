import { TreeOptions } from './settings/Options';
import { Graph, NestedNode } from './models';

export declare class ApexTree {
    element: HTMLElement;
    graph: Graph;
    options: TreeOptions;
    constructor(element: HTMLElement, options: TreeOptions);
    render(data: NestedNode): Graph;
}
