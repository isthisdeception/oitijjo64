import { VoteResult } from '../types';
import { DISTRICTS_SEED } from '../data';
import { APP_CONFIG } from '../utils/constants';

const VOTE_STORAGE_KEY = 'oitijjo64_demo_vote';

export const voteService = {
  /**
   * Check if current demo visitor has already cast a vote
   */
  async getDemoUserVote(): Promise<{
    hasVoted: boolean;
    votedDistrictId: string | null;
  }> {
    try {
      const stored = localStorage.getItem(VOTE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Promise.resolve({
          hasVoted: true,
          votedDistrictId: parsed.districtId || null,
        });
      }
    } catch {
      // Fallback if localStorage is inaccessible
    }

    return Promise.resolve({
      hasVoted: false,
      votedDistrictId: null,
    });
  },

  /**
   * Submit a demo vote for a district
   */
  async submitDemoVote(districtId: string): Promise<VoteResult> {
    // 1. Check if voting deadline has passed
    const deadlineTime = new Date(APP_CONFIG.votingDeadline).getTime();
    if (Date.now() >= deadlineTime) {
      return Promise.resolve({
        success: false,
        messageBn: 'ভোট গ্রহণের নির্ধারিত সময় শেষ হয়েছে।',
      });
    }

    // 2. Check if already voted
    const currentVote = await this.getDemoUserVote();
    if (currentVote.hasVoted) {
      return Promise.resolve({
        success: false,
        alreadyVoted: true,
        messageBn: 'আপনি ইতিমধ্যে ভোট দিয়েছেন। ধন্যবাদ!',
        districtId: currentVote.votedDistrictId || undefined,
      });
    }

    // 3. Find target district
    const district = DISTRICTS_SEED.find((d) => d.id === districtId);
    if (!district) {
      return Promise.resolve({
        success: false,
        messageBn: 'নির্বাচিত জেলাটি পাওয়া যায়নি।',
      });
    }

    // 4. Save demo vote to localStorage
    try {
      localStorage.setItem(
        VOTE_STORAGE_KEY,
        JSON.stringify({
          districtId,
          votedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Fallback
    }

    // 5. Increment local seed count for current session
    district.voteCount += 1;

    return Promise.resolve({
      success: true,
      messageBn: `${district.nameBn} জেলাকে সফলভাবে আপনার সমর্থন জানানো হয়েছে!`,
      districtId,
    });
  },

  /**
   * Reset local demo vote (useful for interface testing)
   */
  async resetDemoVote(): Promise<void> {
    try {
      localStorage.removeItem(VOTE_STORAGE_KEY);
    } catch {
      // Ignore
    }
    return Promise.resolve();
  },
};
