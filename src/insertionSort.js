function insertionSort (array) {
    if (!array || array.length < 2) {
        return array;
    }

    for (let j = 1, length = array.length; j < length; j++) {
        let key = array[j];
        let index = j - 1;
        while (index > -1 && array[index] > key) {
            array[index + 1] = array[index];
            index--;
        }
        array[index + 1] = key;
    }

    return array;
}