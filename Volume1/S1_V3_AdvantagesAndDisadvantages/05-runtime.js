function compare(x, y) {
    if (typeof x === "number") {
        return x === y ? 0 :
            x > y ? 1 : -1;
    } else if (typeof x === "string") {
        return x.localCompare(y);
    }
    throw "Unknown types";
}

console.log(compare(1, 2));