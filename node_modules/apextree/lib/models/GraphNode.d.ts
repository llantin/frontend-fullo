import { FontOptions, NodeOptions, TooltipOptions } from '../settings/Options';
import { Node as DagreNode } from '@dagrejs/dagre';

export interface NestedNode<T = undefined> {
    readonly children: Array<NestedNode<T>>;
    readonly data: T;
    readonly id: string;
    readonly name: string;
    readonly options?: FontOptions & NodeOptions & TooltipOptions;
}
export interface Node<T = undefined> extends DagreNode {
    readonly children: Array<string>;
    readonly data: T;
    readonly hiddenChildren: Array<string> | undefined;
    readonly id: string;
    readonly name: string;
    readonly onlyLeafNodes?: boolean;
    readonly options?: FontOptions & NodeOptions & TooltipOptions;
    readonly parent?: string;
}
