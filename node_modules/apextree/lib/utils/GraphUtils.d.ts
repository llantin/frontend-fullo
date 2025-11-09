import { TreeOptions } from '../settings/Options';

export declare const setAttributes: (element: Element | null, attrs?: Record<string, any>) => void;
export declare const ExpandCollapseButtonSize = 14;
export declare const highlightToPath: (selfNode: any, nodeMap: any, isHighlighted: boolean, options: TreeOptions) => void;
export declare function processNodes(data: any): Record<string, any>;
export declare function findParentsWithOnlyLeafNodes(tree: any): any[];
