interface MoveVector {
    x: number;
    y: number;
}

declare interface UnidraggerConstructor {
    new (): Unidragger;
}

declare abstract class Unidragger {
    emitEvent(event: string, args: any[]): void;
    
    bindHandles(): void;
    unbindHandles(): void;
    protected _bindPostStartEvents(...event: Event[]): void;
    
    pointerDown(event: Event, pointer: Event|Touch): void;
    canPreventDefaultOnPointerDown(event: Event): boolean;
    protected _dragPointerDown(event: Event, pointer: Event|Touch): void;

    pointerMove(event: Event, pointer: Event|Touch): void;
    hasDragStarted(moveVector: MoveVector): boolean;
    protected _dragPointerMove(event: Event, pointer: Event|Touch): MoveVector;

    pointerUp(event: Event, pointer: Event|Touch): void;
    protected _dragPointerUp(event: Event, pointer: Event|Touch): void;

    dragStart(event: Event, pointer: Event|Touch): void;
    protected _dragStart(event: Event, pointer: Event|Touch): void;
    dragMove(event: Event, pointer: Event|Touch, moveVector: MoveVector): void;
    protected _dragMove(event: Event, pointer: Event|Touch, moveVector: MoveVector): void;    
    dragEnd(event: Event, pointer: Event|Touch): void;
    protected _dragEnd(event: Event, pointer: Event|Touch): void;

    onclick(event: Event): void;
    staticclick(event: Event): void;

    static getPointerPoint(): MoveVector;
}