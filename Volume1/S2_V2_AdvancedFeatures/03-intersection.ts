namespace Intersection {

    interface A {
        aMethod: () => void;
    }

    class MixinA implements A {
        aMethod = () => {};
    }

    class C {
        cMethod = () => {};
    }

    function extend<T, U>(first: T, second: U): T & U {
        return <any>false;
    }

    var x = extend(new C(), new MixinA());

    x.aMethod();
    x.cMethod();
}