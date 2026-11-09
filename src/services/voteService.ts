/**
 * PRODUCTION BOUNDARY NOTE:
 * In this frontend-only phase, voting is simulated using client-side localStorage
 * to validate UI states, modals, and user flows.
 * 
 * For Production Backend:
 * 1. Replace this module's local storage calls with authenticated Django REST API endpoints:
 *    - POST /api/votes/
 *    - GET /api/votes/status/
 * 2. Authenticate the visitor via Google OAuth2 ID Token, verified server-side on Django.
 * 3. Enforce the one-account-one-vote rule using a database-level UNIQUE constraint
 *    in PostgreSQL (e.g. `user_id` or `google_sub` UNIQUE on the `Vote` model).
 * 4. Server-side validation must independently reject votes after 2026-11-21T22:00:00+06:00.
 */

import { VoteResult } from '../types';
import { DISTRICTS_SEED } from '../data';
import { APP_CONFIG } from '../utils/constants';

const VOTE_STORAGE_KEY = 'oitijjo64_demo_vote_v1';

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
   * Reset local demo vote (developer helper for interface testing)
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
