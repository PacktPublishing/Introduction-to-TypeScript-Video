function Test() { 
    this.x = 'foo';

    return {
        method: function () {
            return this.x;
        }
    };
}

var test = new Test(); 

console.log(test.method());