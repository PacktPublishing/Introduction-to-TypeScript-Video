namespace Types {
    
    function Linear(
        currentTime, startValue, endValue, duration) {

        endValue = (endValue - startValue);

        return endValue * currentTime / duration + startValue;
    }

    var x1 = 0;
    var x2 = 10;

    console.log(Linear(0, x1, x2, 1000));
    console.log(Linear(1000, x1, x2, 1000));

}