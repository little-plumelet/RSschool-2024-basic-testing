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
    const mockFetchBalance = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(500);
    const result = await account.fetchBalance();
    expect(result).toBe(500);
    mockFetchBalance.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockFetchBalance = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(300);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(300);
    mockFetchBalance.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockFetchBalance = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(null);
    expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    mockFetchBalance.mockRestore();
  });
});
