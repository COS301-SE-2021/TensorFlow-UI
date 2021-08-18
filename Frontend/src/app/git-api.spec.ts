import { GitAPI } from './git-api';

describe('GitAPI', () => {
  it('should create an instance', () => {
    expect(new GitAPI()).toBeTruthy();
  });
});
