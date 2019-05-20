var Test = function () {
    this.x = 1;
    this.y = 2;
}

Test.prototype.method = function () {
    return this.x + this.y;
}

var test = new Test();

console.log(test.method());