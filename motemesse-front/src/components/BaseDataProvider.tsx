'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTargetsStore } from '@/store/targets';
import { useUserStore } from '@/store/user';
import { useRouter, usePathname } from 'next/navigation';

export default function BaseDataProvider({ children }: { children: React.ReactNode }) {
  const setSelectedTargetFromRecentTarget = useTargetsStore((state) => state.setSelectedTargetFromRecentTarget);
  const syncUser = useUserStore((state) => state.syncUser);
  const fetchTargets = useTargetsStore((state) => state.fetchTargets);
  const router = useRouter();
  const pathname = usePathname();

  // 初期化済みかどうかを追跡
  const isInitialized = useRef(false);

  // 初期化処理を安定化
  const initializeApp = useCallback(async () => {
    if (isInitialized.current) return;

    isInitialized.current = true;

    try {
      await Promise.all([
        syncUser(),
        fetchTargets()
      ]);
      const currentUser = useUserStore.getState().user;

      // プロフィールが未完成、または利用規約・プライバシーポリシー未承諾の場合はuser-settingページにリダイレクト
      if (currentUser && (!currentUser.name || !currentUser.age || !currentUser.termsAgreed || !currentUser.privacyPolicyAgreed )) {
        // すでにuser-settingページ、利用規約ページ、プライバシーポリシーページにいる場合はリダイレクトしない
        if (pathname !== '/user-setting' && pathname !== '/terms' && pathname !== '/privacy') {
          router.push('/user-setting');
          return;
        }
      }

      if (currentUser?.recentTargetId) {
        setSelectedTargetFromRecentTarget(currentUser.recentTargetId);
      }
    } catch (error) {
      console.error('Error initializing app data:', error);
      isInitialized.current = false;
    }
  }, [syncUser, fetchTargets, pathname, router, setSelectedTargetFromRecentTarget]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return <>{children}</>;
}