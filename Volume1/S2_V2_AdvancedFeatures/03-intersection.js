var Intersection;
(function (Intersection) {
    class MixinA {
        constructor() {
            this.aMethod = () => { };
        }
    }
    class C {
        constructor() {
            this.cMethod = () => { };
        }
    }
    function extend(first, second) {
        return false;
    }
    var x = extend(new C(), new MixinA());
    x.aMethod();
    x.cMethod();
})(Intersection || (Intersection = {}));
