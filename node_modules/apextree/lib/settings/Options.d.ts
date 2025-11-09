export type TreeDirection = 'bottom' | 'left' | 'right' | 'top';
export declare const DirectionMap: {
    bottom: string;
    left: string;
    right: string;
    top: string;
};
export interface NodeOptions {
    readonly borderColor: string;
    readonly borderColorHover: string;
    readonly borderRadius: string;
    readonly borderStyle: string;
    readonly borderWidth: number;
    readonly enableExpandCollapse: boolean;
    readonly groupLeafNodesSpacing: number;
    readonly nodeBGColor: string;
    readonly nodeBGColorHover: string;
    readonly nodeClassName: string;
    readonly nodeHeight: number;
    readonly nodeStyle: string;
    readonly nodeTemplate: (content: string) => string;
    readonly nodeWidth: number;
}
export interface TooltipOptions {
    readonly enableTooltip: boolean;
    readonly tooltipBGColor: string;
    readonly tooltipBorderColor: string;
    readonly tooltipId: string;
    readonly tooltipMaxWidth: number;
    readonly tooltipTemplate?: (content: string) => string;
}
export interface FontOptions {
    readonly fontColor: string;
    readonly fontFamily: string;
    readonly fontSize: string;
    readonly fontWeight: string;
}
export interface EdgeOptions {
    readonly edgeColor: string;
    readonly edgeColorHover: string;
    readonly edgeWidth: number;
}
export interface CommonOptions {
    readonly canvasStyle: string;
    readonly childrenSpacing: number;
    readonly containerClassName: string;
    readonly contentKey: string;
    readonly direction: TreeDirection;
    readonly enableToolbar: boolean;
    readonly groupLeafNodes: boolean;
    readonly height: number | string;
    readonly highlightOnHover: boolean;
    readonly siblingSpacing: number;
    readonly viewPortHeight: number;
    readonly viewPortWidth: number;
    readonly width: number | string;
}
export type TreeOptions = CommonOptions & EdgeOptions & FontOptions & NodeOptions & TooltipOptions;
export declare const DefaultOptions: TreeOptions;
