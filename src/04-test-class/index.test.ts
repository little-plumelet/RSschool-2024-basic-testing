// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const account = getBankAccount(234);
  const account_2 = getBankAccount(12);

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(234);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(500)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(500)).toThrow(
      `Insufficient funds: cannot withdraw more than ${account.getBalance()}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(500, account_2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(500, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(12);

    expect(account.getBalance()).toBe(246);
  });

  test('should withdraw money', () => {
    account.withdraw(15);
    expect(account.getBalance()).toBe(231);
  });

  test('should transfer money', () => {
    account.transfer(200, account_2);
    expect(account_2.getBalance()).toBe(212);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await account.fetchBalance();
    console.log(result);
    if (result !== null) {
      expect(result).toEqual(expect.any(Number));
    } else {
      expect(result).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    while (true) {
      try {
        await account.synchronizeBalance();
        const balance = account.getBalance();
        expect(balance).toEqual(expect.any(Number));
        break;
      } catch (e) {
        if (e instanceof SynchronizationFailedError) {
          continue;
        } else {
          throw e;
        }
      }
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    while (true) {
      try {
        await account.synchronizeBalance();
      } catch (e) {
        if (e instanceof SynchronizationFailedError) {
          expect(e).toBeInstanceOf(SynchronizationFailedError);
          break;
        } else {
          throw e;
        }
      }
    }
  });
});
