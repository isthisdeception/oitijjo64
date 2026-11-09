import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, District, VoteResult } from '../types';
import { authService, voteService, districtService } from '../services';
import { APP_CONFIG } from '../utils/constants';

interface VoteContextType {
  currentUser: User | null;
  hasVoted: boolean;
  votedDistrictId: string | null;
  votedDistrictName: string | null;
  isDeadlinePassed: boolean;
  isVoteModalOpen: boolean;
  targetDistrict: District | null;
  openVoteModal: (district: District) => void;
  closeVoteModal: () => void;
  signInWithGoogleDemo: () => Promise<User>;
  signOutDemo: () => Promise<void>;
  submitVote: () => Promise<VoteResult>;
  resetDemoVoting: () => Promise<void>;
}

const VoteContext = createContext<VoteContextType | undefined>(undefined);

export const VoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedDistrictId, setVotedDistrictId] = useState<string | null>(null);
  const [votedDistrictName, setVotedDistrictName] = useState<string | null>(null);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [targetDistrict, setTargetDistrict] = useState<District | null>(null);

  // Check deadline
  const isDeadlinePassed = new Date().getTime() >= new Date(APP_CONFIG.votingDeadline).getTime();

  // Load initial demo auth & vote state
  const loadState = useCallback(async () => {
    const user = await authService.getCurrentUser();
    setCurrentUser(user);

    const voteInfo = await voteService.getDemoUserVote();
    setHasVoted(voteInfo.hasVoted);
    setVotedDistrictId(voteInfo.votedDistrictId);

    if (voteInfo.votedDistrictId) {
      const d = await districtService.getById(voteInfo.votedDistrictId);
      if (d) setVotedDistrictName(d.nameBn);
    } else {
      setVotedDistrictName(null);
    }
  }, []);

  useEffect(() => {
    loadState();
  }, [loadState]);

  const openVoteModal = (district: District) => {
    setTargetDistrict(district);
    setIsVoteModalOpen(true);
  };

  const closeVoteModal = () => {
    setIsVoteModalOpen(false);
  };

  const signInWithGoogleDemo = async (): Promise<User> => {
    const user = await authService.signInWithGoogle();
    setCurrentUser(user);
    return user;
  };

  const signOutDemo = async (): Promise<void> => {
    await authService.signOut();
    setCurrentUser(null);
  };

  const submitVote = async (): Promise<VoteResult> => {
    if (!targetDistrict) {
      return { success: false, messageBn: 'কোনো জেলা নির্বাচন করা হয়নি।' };
    }

    const res = await voteService.submitDemoVote(targetDistrict.id);
    if (res.success) {
      setHasVoted(true);
      setVotedDistrictId(targetDistrict.id);
      setVotedDistrictName(targetDistrict.nameBn);
    }
    return res;
  };

  const resetDemoVoting = async (): Promise<void> => {
    await voteService.resetDemoVote();
    await authService.signOut();
    setCurrentUser(null);
    setHasVoted(false);
    setVotedDistrictId(null);
    setVotedDistrictName(null);
  };

  return (
    <VoteContext.Provider
      value={{
        currentUser,
        hasVoted,
        votedDistrictId,
        votedDistrictName,
        isDeadlinePassed,
        isVoteModalOpen,
        targetDistrict,
        openVoteModal,
        closeVoteModal,
        signInWithGoogleDemo,
        signOutDemo,
        submitVote,
        resetDemoVoting,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};

export const useVoting = (): VoteContextType => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error('useVoting must be used within a VoteProvider');
  }
  return context;
};

