// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

jest.mock('path');
jest.mock('fs/promises', () => ({
  ...jest.requireActual('fs/promises'),
  readFile: jest.fn(),
}));
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 1000);

    expect(setTimeout).toHaveBeenCalledWith(callback, 1000);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 1000);

    jest.advanceTimersByTime(999);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
    setTimeoutSpy.mockRestore();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 1000);

    expect(setInterval).toHaveBeenCalledWith(callback, 1000);
    setIntervalSpy.mockRestore();
  });
  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(3);
    setIntervalSpy.mockRestore();
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('should call join with pathToFile', async () => {
    const mockPath = '/mocked_path/to/file.txt';
    jest.spyOn(path, 'join').mockReturnValue(mockPath);

    fsPromises.readFile = jest.fn().mockResolvedValue('hello world');
    await readFileAsynchronously('file.txt');

    expect(path.join).toHaveBeenCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    const mockPath = '/mocked_path/to/nonexistent.txt';
    jest.spyOn(path, 'join').mockReturnValue(mockPath);

    fsPromises.readFile = jest
      .fn()
      .mockRejectedValue(new Error('File not found'));
    const result = await readFileAsynchronously('nonexistent.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockPath = '/mocked_path/to/existing.txt';
    jest.spyOn(path, 'join').mockReturnValue(mockPath);
    const fileContent = 'hello world';

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    fsPromises.readFile = jest.fn().mockResolvedValue(fileContent);
    const result = await readFileAsynchronously('existing.txt');

    expect(result).toBe(fileContent);
  });
});
