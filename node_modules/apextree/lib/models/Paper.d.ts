import { NodeOptions } from '../settings/Options';
import { Circle, CircleAttr, Element, ForeignObject, G, Path, Rect, Svg, Text, TextAttr } from '@svgdotjs/svg.js';

export declare class Paper {
    private readonly height;
    private readonly width;
    canvas: Svg;
    constructor(element: HTMLElement, width: number, height: number, canvasStyle: string);
    static drawCircle(attributes?: CircleAttr): Circle;
    static drawGroup(x?: number, y?: number, id?: string, parent?: string): G;
    static drawPath(pathString: string, { borderColor, id }?: {
        borderColor?: string;
        id?: string;
    }): Path;
    static drawRect({ color, height, opacity, radius, width, x1, y1, }?: {
        color?: string;
        height?: number;
        opacity?: number;
        radius?: number;
        width?: number;
        x1?: any;
        y1?: any;
    }): Rect;
    static drawTemplate(template: string, { nodeHeight, nodeWidth }?: Partial<NodeOptions>): ForeignObject;
    static drawText(text: string, { dx, dy, x, y }: Partial<TextAttr>): Text;
    add(element: Element): void;
    clear(): void;
    exportToSvg(): void;
    resetViewBox(): void;
    updateViewBox(x: number, y: number, width: number, height: number): void;
    zoom(zoomFactor: number): void;
}
