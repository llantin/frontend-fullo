import { GraphPoint } from '../models/GraphPoint';
import { Node } from '../models/GraphNode';

export declare const curvedEdgesHorizontal: (s: GraphPoint, t: GraphPoint, m: GraphPoint) => string;
export declare const curvedEdgesVertical: (s: GraphPoint, t: GraphPoint, m: GraphPoint, offsets?: {
    sy: number;
}) => string;
export interface DirectionConfigProperties {
    readonly calculateEdge: (s: GraphPoint, t: GraphPoint, m: GraphPoint, offsets: {
        sy: number;
    }) => string;
    readonly edgeMidX: (params: ConfigParams) => number;
    readonly edgeMidY: (params: ConfigParams) => number;
    readonly edgeParentX: (params: ConfigParams) => number;
    readonly edgeParentY: (params: ConfigParams) => number;
    readonly edgeX: (params: ConfigParams) => number;
    readonly edgeY: (params: ConfigParams) => number;
    readonly leafGroupX: (params: ConfigParams) => number;
    readonly leafGroupY: (params: ConfigParams) => number;
    readonly leafHeight: (params: ConfigParams) => number;
    readonly leafWidth: (params: ConfigParams) => number;
    readonly leafX: (params: ConfigParams) => number;
    readonly leafY: (params: ConfigParams) => number;
}
export interface ConfigParams {
    readonly childLength: number;
    readonly childrenSpacing: number;
    readonly height: number;
    readonly index: number;
    readonly node: Node;
    readonly nodeHeight: number;
    readonly nodeWidth: number;
    readonly parent: Node;
    readonly siblingSpacing: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
}
export declare const DirectionConfig: Record<string, DirectionConfigProperties>;
