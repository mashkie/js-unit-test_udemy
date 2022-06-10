import { it, expect, vi } from 'vitest';
import path from 'path';
import { promises as fs } from 'fs';

import writeData from './io';

vi.mock('fs');
vi.mock('path', () => {
  return {
    default: {
      join: (...args) => {
        return args[args.length - 1];
      },
    },
  };
});

it('should execute the writeFile method', () => {
  const testData = 'test';
  const testFilename = 'test.txt';

  writeData(testData, testFilename);

  // return expect(writeData(testData, testFilename)).resolves.toBeUndefined();
  // expect(fs.writeFile).toHaveBeenCalled();
  expect(fs.writeFile).toBeCalledWith(testFilename, testData);
});

it('should return a promise htat resolves to no value if called correctly', () => {
  const testData = 'test';
  const testFilename = 'test.txt';

  writeData(testData, testFilename);

  return expect(writeData(testData, testFilename)).resolves.toBeUndefined();
});
