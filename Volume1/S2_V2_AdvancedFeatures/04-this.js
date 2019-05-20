var This;
(function (This) {
    class FluentBase {
        x() {
            return this;
        }
    }
    class FluentExample extends FluentBase {
        y() {
            return true;
        }
    }
    new FluentExample().x().y();
})(This || (This = {}));
