import { updateAgreements } from '@/actions/user';
import { create } from 'zustand';

interface User {
  id: number;
  name: string | null;
  age?: number | null;
  hobby?: string | null;
  tone: number;
  recentTargetId?: number | null;
  termsAgreed: boolean;
  privacyPolicyAgreed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  showAgreementModal: boolean;
  termsOpened: boolean;
  privacyOpened: boolean;
  isAgreeing: boolean;
  syncUser: () => Promise<void>;
  updateUser: (data: {
    name?: string;
    age?: string;
    hobby?: string;
  }) => Promise<void>;
  updateTone: (tone: number) => Promise<void>;
  updateRecentTargetId: (targetId: number | null) => Promise<void>;
  updateAgreements: () => Promise<void>;
  setUser: (user: User | null) => void;
  setShowAgreementModal: (show: boolean) => void;
  setTermsOpened: (opened: boolean) => void;
  setPrivacyOpened: (opened: boolean) => void;
  setIsAgreeing: (agreeing: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  showAgreementModal: false,
  termsOpened: false,
  privacyOpened: false,
  isAgreeing: false,

  syncUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/users/me', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to get user');
      }

      const data = await response.json();
      set({ user: data.user, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateUser: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      set({ user: updatedUser, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateTone: async (tone: number) => {
    const { user } = useUserStore.getState();
    if (!user) return;

    // 楽観的更新: 即座にUIを更新
    const previousTone = user.tone;
    set({
      user: { ...user, tone },
      error: null
    });

    try {
      const response = await fetch('/api/users/tone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tone }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update tone: ${response.status} ${errorData}`);
      }

      // サーバーからの正式な更新データで同期
      const updatedUser = await response.json();
      set({ user: updatedUser });
    } catch (error) {
      // エラー時は元の値に戻す
      set({
        user: { ...user, tone: previousTone },
        error: (error as Error).message
      });
    }
  },

  updateRecentTargetId: async (targetId: number | null) => {
    const { user } = useUserStore.getState();
    if (!user) return;

    // 楽観的更新: 即座にUIを更新
    const previousRecentTargetId = user.recentTargetId;
    set({
      user: { ...user, recentTargetId: targetId },
      error: null
    });

    try {
      const response = await fetch('/api/users/recent-target', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recentTargetId: targetId }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update recent target: ${response.status} ${errorData}`);
      }

      // サーバーからの正式な更新データで同期
      const updatedUser = await response.json();
      set({ user: updatedUser });
    } catch (error) {
      // エラー時は元の値に戻す
      set({
        user: { ...user, recentTargetId: previousRecentTargetId },
        error: (error as Error).message
      });
    }
  },

  updateAgreements: async () => {
    const { user } = useUserStore.getState();
    if (!user) return;

    set({ isLoading: true, error: null });

    try {
      const updatedUser = await updateAgreements(user.id);
      set({ user: updatedUser, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  setUser: (user) => {
    set({ user });
  },

  setShowAgreementModal: (show) => {
    set({ showAgreementModal: show });
  },

  setTermsOpened: (opened) => {
    set({ termsOpened: opened });
  },

  setPrivacyOpened: (opened) => {
    set({ privacyOpened: opened });
  },

  setIsAgreeing: (agreeing) => {
    set({ isAgreeing: agreeing });
  },
}));