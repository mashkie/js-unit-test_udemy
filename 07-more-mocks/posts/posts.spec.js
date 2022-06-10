import { it, expect, describe, beforeEach } from 'vitest';
import { extractPostData } from './posts';

describe('extractPostData()', () => {
  const testTitle = 'Test title';
  const testContent = 'Test content';
  let testFormData;

  beforeEach(() => {
    testFormData = {
      title: testTitle,
      content: testContent,
      get(identifier) {
        return this[identifier];
      },
    };
  });

  it('should extract title and content from the provided form data', () => {
    const data = extractPostData(testFormData);

    expect(data.title).toBe(testTitle);
    expect(data.content).toBe(testContent);
  });
});
