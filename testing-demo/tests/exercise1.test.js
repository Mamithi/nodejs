const lib = require('../exercise1');

describe('fizzbuzz', () => {
    it('should throw an exception if input is not a number', () => {      
        expect(() => { lib.fizzBuzz('a') }).toThrow();
        expect(() => { lib.fizzBuzz(null) }).toThrow();
        expect(() => { lib.fizzBuzz(undefined) }).toThrow();
    })

    it('should return fizzbuzz if input is divisible by 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return fizz if input is only divisible by 3', () => {
        const result = lib.fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('should return fizz if input is only divisible by 5', () => {
        const result = lib.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it('should return input if its not divisible by 3 and 5', () => {
        const result = lib.fizzBuzz(1);
        expect(result).toBe(1);
    });
})