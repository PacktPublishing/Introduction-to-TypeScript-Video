function compare(x: string, y: string) {
    if (typeof x === "number") {
        return x === y ? 0 :
            x > y ? 1 : -1;
    } else if (typeof x === "string") {
        return x.localeCompare(y);
    }
    throw "Unknown types";
}

compare('x', 'y');
compare(1, 2);