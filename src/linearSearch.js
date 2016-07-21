function linearSearch (array, value) {
    let index = null;
    let counter = 0;
    const arraySize = array.length;
    while (counter < arraySize && index === null) {
        if (value === array[counter]) {
            index = counter;
        }
        counter++;
    }
    return index;
}