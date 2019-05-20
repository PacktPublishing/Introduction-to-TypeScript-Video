var Interfaces;
(function (Interfaces) {
    class EasingFunctions {
    }
    EasingFunctions.Linear = (currentTime, startValue, endValue, duration) => {
        endValue = (endValue - startValue);
        return endValue * currentTime / duration + startValue;
    };
    EasingFunctions.EaseInCubic = (currentTime, startValue, endValue, duration) => {
        endValue = (endValue - startValue);
        currentTime /= duration;
        return endValue * currentTime * currentTime * currentTime + startValue;
    };
    var x1 = 0;
    var x2 = 10;
    console.log(EasingFunctions.Linear(0, x1, x2, 1000));
    console.log(EasingFunctions.Linear(1000, x1, x2, 1000));
    console.log(EasingFunctions.EaseInCubic(0, x1, x2, 1000));
    console.log(EasingFunctions.EaseInCubic(1000, x1, x2, 1000));
})(Interfaces || (Interfaces = {}));
