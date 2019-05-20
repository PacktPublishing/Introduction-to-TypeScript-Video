namespace Discriminated {
    interface Square {
        kind: "square";
        size: number;
    }
    interface Rectangle {
        kind: "rectangle";
        width: number;
        height: number;
    }
    interface Circle {
        kind: "circle";
        radius: number;
    }
    interface Triangle {
        kind: "triangle";
        width: number;
        height: number;
    }

    type Shape = Square | Rectangle | Circle;

    function area(s: Shape) {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * s.radius ** 2;
            default: return assertNever(s);
        }
    }
    
    function assertNever(x: never): never {
        throw new Error("Unexpected object: " + x);
    }
}