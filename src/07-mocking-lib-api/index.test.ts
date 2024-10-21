// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest
      .fn()
      .mockResolvedValue({ data: [{ id: 1, title: 'Test' }] });
    const mockAxios = { get: mockGet };
    axios.create = jest.fn().mockReturnValue(mockAxios);

    await throttledGetDataFromApi('/posts');

    jest.runAllTimers();

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/tests';
    const mockData = [{ id: 1, title: 'Test' }];
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    const mockAxiosInstance = { get: mockGet };
    axios.create = jest.fn().mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi(relativePath);

    jest.runAllTimers();

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = [{ id: 1, title: 'Test' }];
    const relativePath = '/blogs';

    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    const mockAxiosInstance = { get: mockGet };
    axios.create = jest.fn().mockReturnValue(mockAxiosInstance);
    const throttledRequest = throttledGetDataFromApi(relativePath);

    jest.runAllTimers();

    const data = await throttledRequest;
    expect(data).toEqual(mockData);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
  });
});
