'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';
import { FiSave } from 'react-icons/fi';
import { useTargetsStore } from '@/store/targets';
import { useEffect } from 'react';
import { useSettingStore } from '@/store/setting';
import { useUserStore } from '@/store/user';
import ImageUploadForProfile from '@/components/ImageUploadForProfile';
import { ProfileData } from '@/types/profile';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { useChatStore } from '@/store/chat';

export default function FemaleSetting() {
    const { targets, selectedTargetId, selectTarget, isLoading: isLoadingTargets, newTargetInfo, clearNewTargetInfo, addTargetToList, updateTargetInList } = useTargetsStore(
        useShallow((s) => ({
            targets: s.targets,
            selectedTargetId: s.selectedTargetId,
            selectTarget: s.selectTarget,
            isLoading: s.isLoading,
            newTargetInfo: s.newTargetInfo,
            clearNewTargetInfo: s.clearNewTargetInfo,
            addTargetToList: s.addTargetToList,
            updateTargetInList: s.updateTargetInList,
        }))
    );
    const {
        femaleFormData,
        isSaving,
        isFemaleAnalyzing,
        setFemaleFormData,
        setIsSaving,
        updateFemaleField,
        resetFemaleForm,
        setIsFemaleAnalyzing,
    } = useSettingStore(
        useShallow((s) => ({
            femaleFormData: s.femaleFormData,
            isSaving: s.isSaving,
            isFemaleAnalyzing: s.isFemaleAnalyzing,
            setFemaleFormData: s.setFemaleFormData,
            setIsSaving: s.setIsSaving,
            updateFemaleField: s.updateFemaleField,
            resetFemaleForm: s.resetFemaleForm,
            setIsFemaleAnalyzing: s.setIsFemaleAnalyzing,
        }))
    );

    const setConversations = useChatStore(s => s.setConversations);
    const setEssentialChatUpdate = useChatStore(s => s.setEssentialChatUpdate);

    const syncUser = useUserStore(s => s.syncUser);
    const isLoadingUser = useUserStore(s => s.isLoading);

    const router = useRouter();

    // ストアから新規作成情報を取得
    const isNewMode = newTargetInfo?.isNewMode || false;
    const nameFromStore = newTargetInfo?.name || null;

    // 選択された女性のデータを取得
    const selectedTarget = targets.find(t => t.id === selectedTargetId);

    // 選択された女性のデータまたは新規作成モードが変更されたら、フォームを更新
    useEffect(() => {
        if (isNewMode && nameFromStore) {
            // 新規作成モードの場合
            setFemaleFormData({
                name: nameFromStore,
                age: '',
                hobby: '',
            });
        } else if (selectedTarget) {
            // 既存のターゲットを編集する場合
            setFemaleFormData({
                name: selectedTarget.name || '',
                age: selectedTarget.age?.toString() || '',
                hobby: selectedTarget.hobby || '',
            });
        } else {
            // 選択されていない場合はフォームをクリア
            resetFemaleForm();
        }
    }, [selectedTarget, isNewMode, nameFromStore, setFemaleFormData, resetFemaleForm]);

    // フォーム入力の処理
    const handleInputChange = (field: string, value: string) => {
        updateFemaleField(field, value);
    };

    // 保存処理
    const handleSave = async () => {
        // バリデーション
        if (!femaleFormData.name.trim()) {
            alert('お名前を入力してください');
            return;
        }
        if (!femaleFormData.age.trim()) {
            alert('年齢を入力してください');
            return;
        }

        setIsSaving(true);
        try {
            if (isNewMode) {
                // 新規作成の場合
                const response = await fetch('/api/targets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: femaleFormData.name,
                        age: femaleFormData.age,
                        hobby: femaleFormData.hobby,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create target');
                }

                const newTarget = await response.json();

                // ローカルの配列に追加
                addTargetToList(newTarget);
                selectTarget(newTarget.id);
                await syncUser(); // ユーザー情報も同期（recent_target_idを更新）

                setConversations([]);
                setEssentialChatUpdate(true);

                alert('保存しました');

                // URLからクエリパラメータを削除
                router.push('/female-setting');
            } else {
                // 既存のターゲットを更新する場合
                if (!selectedTarget) {
                    alert('女性を選択してください');
                    return;
                }

                const response = await fetch('/api/targets', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: selectedTarget.id,
                        name: femaleFormData.name,
                        age: femaleFormData.age,
                        hobby: femaleFormData.hobby,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update target');
                }

                const updatedTarget = await response.json();

                // ローカルの配列を更新
                updateTargetInList(updatedTarget);
                selectTarget(updatedTarget.id); // 更新されたターゲットを選択状態に
                alert('保存しました');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            alert('保存に失敗しました');
        } finally {
            clearNewTargetInfo();
            setIsSaving(false);
        }
    };

    // 保存ボタンの有効/無効を判定
    const isFormValid = femaleFormData.name.trim() && femaleFormData.age.trim();

    return (
        <DefaultLayout>
            <div id="profileScreen" className="w-full bg-gradient-to-b from-white to-tapple-pink-pale overflow-y-auto h-[calc(100dvh-100px)] sm:h-[calc(100dvh-70px)] relative">
                {(isSaving || isLoadingUser || isLoadingTargets || isFemaleAnalyzing) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-tapple-pink"></div>
                    </div>
                )}

                {/* ヘッダー部分 */}
                <div className="bg-gradient-to-r from-tapple-pink to-tapple-pink-light p-4 text-white">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                            <span className="text-lg">👩</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">
                                {isNewMode && nameFromStore
                                    ? `${nameFromStore}さんのプロフィール`
                                    : selectedTarget
                                        ? `${selectedTarget.name}さんのプロフィール`
                                        : '女性のプロフィール設定'}
                            </h2>
                            <p className="text-xs opacity-90">女性の情報を入力してください</p>
                        </div>
                    </div>
                </div>

                <div className="p-3">
                    {!selectedTarget && !isNewMode && (
                        <div className="mb-3 p-3 bg-tapple-pink-pale border border-tapple-pink-soft rounded-xl">
                            <p className="text-sm text-tapple-pink font-medium">サイドメニューから女性を選択してください</p>
                        </div>
                    )}

                    {/* 基本情報セクション */}
                    <div className="bg-white rounded-xl p-4 shadow-sm mb-3 border border-gray-100 space-y-3">
                        {/* 名前 */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                お名前 <span className="text-tapple-pink">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tapple-pink focus:border-transparent transition-all"
                                placeholder="例: 田中花子"
                                value={femaleFormData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                disabled={!selectedTarget && !isNewMode}
                                required
                            />
                        </div>

                        {/* 年齢・血液型 */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                年齢 <span className="text-tapple-pink">*</span>
                            </label>
                            <input
                                type="number"
                                className="w-full border border-gray-200 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tapple-pink focus:border-transparent transition-all"
                                placeholder="例: 25"
                                value={femaleFormData.age}
                                onChange={(e) => handleInputChange('age', e.target.value)}
                                disabled={!selectedTarget && !isNewMode}
                                required
                            />
                        </div>

                        {/* 趣味・性格セクション */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">趣味・関心事</label>
                            <textarea
                                rows={2}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tapple-pink focus:border-transparent transition-all resize-none"
                                placeholder="カフェ巡り、読書、ヨガ"
                                value={femaleFormData.hobby}
                                onChange={(e) => handleInputChange('hobby', e.target.value)}
                                disabled={!selectedTarget && !isNewMode}
                            ></textarea>
                        </div>
                    </div>

                    {/* 保存ボタン */}
                    <div className="pb-4 px-3">
                        <button
                            onClick={handleSave}
                            disabled={isSaving || (!selectedTarget && !isNewMode) || !isFormValid}
                            className={`w-full py-3 rounded-full text-sm font-bold text-white transition-all shadow-md flex items-center justify-center ${!isSaving && (selectedTarget || isNewMode) && isFormValid
                                ? 'bg-gradient-to-r from-tapple-pink to-tapple-pink-light active:from-tapple-pink-dark active:to-tapple-pink'
                                : 'bg-gray-300 cursor-not-allowed'
                                }`}
                        >
                            <FiSave className="w-4 h-4 mr-2" />
                            {isSaving ? '保存中...' : 'プロフィールを保存'}
                        </button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}