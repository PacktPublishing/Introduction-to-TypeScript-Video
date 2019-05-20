interface Size {
    borderLeftWidth: number;
    borderRightWidth: number;
    borderTopWidth: number;
    borderBottomWidth: number;
    width: number;
    height: number;
}

declare interface getSizeFunction {
    (element: Node): Size;
}