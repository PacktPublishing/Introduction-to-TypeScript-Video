namespace Iterators {

    function first<T>(arr: T[], predicate: (x: T) => boolean) {
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];

            if (predicate(item) === true) {
                return item;
            }
        }

        return null;
    }

    var arr = [4, 16, 7, 21];

    var item = first(arr, x => !!(x % 2));

    console.log(`First odd number: ${item}`);
}