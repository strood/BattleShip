import { testfunction } from '../src/context';

test('my test function is hooked up, and testing works', () => {
  expect(testfunction()).toBe(true);
});
