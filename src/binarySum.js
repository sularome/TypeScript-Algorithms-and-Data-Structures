function binarySum(A, B) {
    var i = 0;
    var n = A.length;
    var C = [];
    A = A.slice(0).reverse();
    B = B.slice(0).reverse();
    while (i < n) {
        let carryOn = C[i];
        C[i] = A[i] ^ B[i] ^ carryOn;
        C[i + 1] = (A[i] & B[i]) | (A[i] & carryOn) | (B[i] & carryOn);
        i++;
    }
    return C.reverse();
}