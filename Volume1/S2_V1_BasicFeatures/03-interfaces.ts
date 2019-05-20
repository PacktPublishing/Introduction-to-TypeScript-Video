namespace Interfaces {
    
    class EasingFunctions {

        public static Linear = (currentTime: number, startValue: number, 
            endValue: number, duration: number) => {

            endValue = (endValue - startValue);
            return endValue * currentTime / duration + startValue;
        }

        public static EaseInCubic = (currentTime: number, startValue: number, 
            endValue: number, duration: number) => {

            endValue = (endValue - startValue);
            currentTime /= duration;
            return endValue * currentTime * currentTime * currentTime + startValue;
        }
    }

    var x1 = 0;
    var x2 = 10;

    console.log(EasingFunctions.Linear(0, x1, x2, 1000));
    console.log(EasingFunctions.Linear(1000, x1, x2, 1000));

    console.log(EasingFunctions.EaseInCubic(0, x1, x2, 1000));
    console.log(EasingFunctions.EaseInCubic(1000, x1, x2, 1000));
}