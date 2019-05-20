namespace This {

    abstract class FluentBase {

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
}