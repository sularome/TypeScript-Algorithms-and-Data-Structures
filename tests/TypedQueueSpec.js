fdescribe('Queue', function () {
    describe('enqueue', function () {
        it('should add elements to the stack', function () {
            var q = new TypedQueue(new Uint8Array(2));
            q.enqueue(1);
            expect(q.size()).toEqual(1);
            q.enqueue(2);
            expect(q.size()).toEqual(2);
             /*q.dequeue();
            expect(q.size()).toEqual(1);*/
        });
    });
});