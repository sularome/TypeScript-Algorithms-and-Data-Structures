function binarySum(A, B) {
    var i = 0;
    var n = A.length;
    var C = [];
    while (i < n) {
        let carryOn = C[i];
        C[i] = A[i] ^ B[i] ^ carryOn;
        C[i + 1] = (A[i] & B[i]) | (A[i] & carryOn) | (B[i] & carryOn);
    }
    return C;
}