import { DISTRICTS_SEED } from '../data';
import { LeaderboardEntry, VoteSummary } from '../types';
import { APP_CONFIG } from '../utils/constants';

export const leaderboardService = {
  /**
   * Get sorted leaderboard derived from district dataset
   */
  async getLeaderboard(limit?: number): Promise<LeaderboardEntry[]> {
    const sorted = [...DISTRICTS_SEED].sort((a, b) => b.voteCount - a.voteCount);

    const entries: LeaderboardEntry[] = sorted.map((district, index) => ({
      rank: index + 1,
      districtId: district.id,
      districtSlug: district.slug,
      districtNameBn: district.nameBn,
      divisionBn: district.divisionBn,
      voteCount: district.voteCount,
    }));

    if (limit && limit > 0) {
      return Promise.resolve(entries.slice(0, limit));
    }

    return Promise.resolve(entries);
  },

  /**
   * Get top 3 podium entries
   */
  async getTopThree(): Promise<LeaderboardEntry[]> {
    return this.getLeaderboard(3);
  },

  /**
   * Get overall vote summary and campaign statistics
   */
  async getVoteSummary(): Promise<VoteSummary> {
    const totalDemoVotes = DISTRICTS_SEED.reduce(
      (acc, curr) => acc + curr.voteCount,
      0
    );

    const deadlineTime = new Date(APP_CONFIG.votingDeadline).getTime();
    const nowTime = new Date().getTime();
    const isClosed = nowTime >= deadlineTime;

    return Promise.resolve({
      totalDemoVotes,
      totalDistricts: DISTRICTS_SEED.length,
      votingDeadline: APP_CONFIG.votingDeadline,
      isClosed,
    });
  },
};
