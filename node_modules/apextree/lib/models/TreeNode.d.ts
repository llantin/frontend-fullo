import { FontOptions, NodeOptions, TooltipOptions } from '../settings/Options';
import { FlextreeNode } from 'd3-flextree';
import { Path } from '@svgdotjs/svg.js';

export interface Node {
    readonly children: Array<Node>;
    readonly expanded: boolean;
    readonly id: string;
    readonly name: string;
    readonly options?: FontOptions & NodeOptions & TooltipOptions;
}
export interface TreeNode<N> extends FlextreeNode<N> {
    edge?: Path;
    hiddenChildren: Array<TreeNode<N>> | undefined;
}
