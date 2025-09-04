// File: tests/unit/voteService.test.js
const { recordVote } = require('../../src/services/voteService');

describe('recordVote', () => {
  it('should record a vote successfully', async () => {
    const result = await recordVote('poll123', 'user456', 'option789');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Vote recorded');
  });

  it('should not allow a user to vote twice on the same poll', async () => {
    await recordVote('poll123', 'user456', 'option789'); // First vote
    const secondAttempt = await recordVote('poll123', 'user456', 'option789'); // Second vote
    expect(secondAttempt.success).toBe(false);
    expect(secondAttempt.message).toBe('User has already voted');
  });
});

