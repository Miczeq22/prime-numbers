export class PrimeNumbersProvider {
  public static fromRange(from: number, to: number) {
    const primes: number[] = [];

    for (let i = from; i < to; i++) {
      if (this.isPrime(i)) {
        primes.push(i);
      }
    }
    return primes;
  }

  private static isPrime(num: number) {
    if (num < 2) {
      return false;
    }

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
}
