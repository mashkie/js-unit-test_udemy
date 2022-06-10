import { it, expect, vi } from 'vitest';
import { HttpError } from './errors';

import { sendDataRequest } from './http';

const testResponseData = { testKey: 'testDAta' };

const fetchSpyFn = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    if (typeof options.body !== typeof 'string') {
      return reject('Not a string');
    }
    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(testResponse);
  });
});

// mocks global functions/objects like http fetch
vi.stubGlobal('fetch', fetchSpyFn);

it('should return any available response data', () => {
  const testData = { keay: 'test' };

  return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

it('should convert the provided data to JSON before sending the request', async () => {
  const testData = { keay: 'test' };
  let errorMessage;

  try {
    await sendDataRequest(testData);
  } catch (error) {
    errorMessage = error;
  }

  expect(errorMessage).not.toBe('Not a string');
});

it('should throw an HttpError in case of non-ok responses', () => {
  fetchSpyFn.mockImplementationOnce((url, options) => {
    return new Promise((resolve, reject) => {
      if (typeof options.body !== typeof 'string') {
        return reject('Not a string');
      }
      const testResponse = {
        ok: false,
        json() {
          return new Promise((resolve, reject) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testResponse);
    });
  });
  const testData = { keay: 'test' };

  return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
