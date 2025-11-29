'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';
import { FiSave } from 'react-icons/fi';
import { useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { useSettingStore } from '@/store/setting';
import { useTargetsStore } from '@/store/targets';
import ImageUploadForProfile from '@/components/ImageUploadForProfile';
import { ProfileData } from '@/types/profile';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
export default function MaleSetting() {
    const router = useRouter();

    const {
        user,
        updateUser,
        updateAgreements,
        isLoading: isLoadingUser,
        showAgreementModal,
        termsOpened,
        privacyOpened,
        isAgreeing,
        setShowAgreementModal,
        setTermsOpened,
        setPrivacyOpened,
        setIsAgreeing,
    } = useUserStore(
        useShallow((s) => ({
            user: s.user,
            updateUser: s.updateUser,
            updateAgreements: s.updateAgreements,
            isLoading: s.isLoading,
            showAgreementModal: s.showAgreementModal,
            termsOpened: s.termsOpened,
            privacyOpened: s.privacyOpened,
            isAgreeing: s.isAgreeing,
            setShowAgreementModal: s.setShowAgreementModal,
            setTermsOpened: s.setTermsOpened,
            setPrivacyOpened: s.setPrivacyOpened,
            setIsAgreeing: s.setIsAgreeing,
        }))
    );
    const isLoadingTargets = useTargetsStore(s => s.isLoading);

    const {
        maleFormData,
        isSaving,
        isUserAnalyzing,
        setMaleFormData,
        setIsSaving,
        updateMaleField,
        setIsUserAnalyzing,
    } = useSettingStore(
        useShallow((s) => ({
            maleFormData: s.maleFormData,
            isSaving: s.isSaving,
            isUserAnalyzing: s.isUserAnalyzing,
            setMaleFormData: s.setMaleFormData,
            setIsSaving: s.setIsSaving,
            updateMaleField: s.updateMaleField,
            setIsUserAnalyzing: s.setIsUserAnalyzing,
        }))
    );

    // 初回プロフィール設定かどうかを判定
    const isFirstTimeSetup = user && (!user.name || !user.age);

    // 同意モーダルの表示チェック
    useEffect(() => {
        if (user && (!user.termsAgreed || !user.privacyPolicyAgreed)) {
            setShowAgreementModal(true);
        }
    }, [user]);

    // ユーザー（男性）のデータが変更されたら、フォームを更新
    useEffect(() => {
        if (user) {
            setMaleFormData({
                name: user.name || '',
                age: user.age?.toString() || '',
                hobby: user.hobby || '',
            });
        }
    }, [user, setMaleFormData]);

    // フォーム入力の処理
    const handleInputChange = (field: string, value: string) => {
        updateMaleField(field, value);
    };

    // 利用規約・プライバシーポリシーのリンクを開く
    const handleOpenTerms = () => {
        window.open('/terms', '_blank');
        setTermsOpened(true);
    };

    const handleOpenPrivacy = () => {
        window.open('/privacy', '_blank');
        setPrivacyOpened(true);
    };

    // 同意処理
    const handleAgree = async () => {
        setIsAgreeing(true);
        try {
            await updateAgreements();
            setShowAgreementModal(false);
        } catch (error) {
            console.error('Error updating agreements:', error);
            alert('同意の処理に失敗しました');
        } finally {
            setIsAgreeing(false);
        }
    };

    // 保存処理
    const handleSave = async () => {
        // バリデーション
        if (!maleFormData.name.trim()) {
            alert('お名前を入力してください');
            return;
        }
        if (!maleFormData.age.trim()) {
            alert('年齢を入力してください');
            return;
        }

        setIsSaving(true);
        try {
            if (user) {
                await updateUser({
                    name: maleFormData.name,
                    age: maleFormData.age,
                    hobby: maleFormData.hobby,
                });
                alert('保存しました');

                // 初回設定完了後はchat画面に遷移
                if (isFirstTimeSetup) {
                    router.push('/chat');
                }
            }
        } catch (error) {
            console.error('Error saving data:', error);
            alert('保存に失敗しました');
        } finally {
            setIsSaving(false);
        }
    };

    // 保存ボタンの有効/無効を判定
    const isFormValid = maleFormData.name.trim() && maleFormData.age.trim();

    return (
        <DefaultLayout>
            <div id="profileScreen" className="w-full bg-gradient-to-b from-white to-tapple-pink-pale overflow-y-auto relative h-[calc(100dvh-100px)] sm:h-[calc(100dvh-70px)]">
                {(isSaving || isLoadingUser || isLoadingTargets || isUserAnalyzing) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-tapple-pink"></div>
                    </div>
                )}

                {/* 同意モーダル */}
                {showAgreementModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                利用規約とプライバシーポリシーへの同意
                            </h2>
                            <p className="text-sm text-gray-600 mb-6">
                                本サービスをご利用いただくには、利用規約とプライバシーポリシーへの同意が必要です。
                                下記のリンクからご確認ください。
                            </p>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">利用規約</span>
                                    <button
                                        onClick={handleOpenTerms}
                                        className="px-4 py-2 text-sm font-medium text-tapple-pink hover:text-tapple-pink-dark transition-colors"
                                    >
                                        読む
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">プライバシーポリシー</span>
                                    <button
                                        onClick={handleOpenPrivacy}
                                        className="px-4 py-2 text-sm font-medium text-tapple-pink hover:text-tapple-pink-dark transition-colors"
                                    >
                                        読む
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleAgree}
                                disabled={!termsOpened || !privacyOpened || isAgreeing}
                                className={`w-full py-3 rounded-full text-sm font-bold text-white transition-all ${
                                    termsOpened && privacyOpened && !isAgreeing
                                        ? 'bg-gradient-to-r from-tapple-pink to-tapple-pink-light hover:from-tapple-pink-dark hover:to-tapple-pink'
                                        : 'bg-gray-300 cursor-not-allowed'
                                }`}
                            >
                                {isAgreeing ? '処理中...' : '同意する'}
                            </button>

                            {(!termsOpened || !privacyOpened) && (
                                <p className="text-xs text-gray-500 text-center mt-3">
                                    ※両方の文書を開いてから同意ボタンが有効になります
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* ヘッダー部分 */}
                <div className="bg-gradient-to-r from-tapple-pink to-tapple-pink-light p-4 text-white">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                            <span className="text-lg">👤</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">プロフィール設定</h2>
                            <p className="text-xs opacity-90">
                                {isFirstTimeSetup
                                    ? '初回設定です。必須項目を入力してください'
                                    : 'あなたの情報を入力してください'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-3">
                    {/* 初回設定の通知 */}
                    {isFirstTimeSetup && (
                        <div className="mb-4 p-3 bg-tapple-pink-pale border border-tapple-pink-soft rounded-xl">
                            <p className="text-sm text-tapple-pink font-medium">
                                ようこそ！まずはプロフィールを設定してください。
                                名前と年齢は必須項目です。
                            </p>
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
                                placeholder="例: 田中太郎"
                                value={maleFormData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
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
                                placeholder="例: 28"
                                value={maleFormData.age}
                                onChange={(e) => handleInputChange('age', e.target.value)}
                                required
                            />
                        </div>

                        {/* 趣味・性格セクション */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">趣味・関心事</label>
                            <textarea
                                rows={2}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tapple-pink focus:border-transparent transition-all resize-none"
                                placeholder="映画、料理、旅行"
                                value={maleFormData.hobby}
                                onChange={(e) => handleInputChange('hobby', e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    {/* 保存ボタン */}
                    <div className="pb-4 px-3">
                        <button
                            onClick={handleSave}
                            disabled={isSaving || !isFormValid}
                            className={`w-full py-3 rounded-full text-sm font-bold text-white transition-all shadow-md flex items-center justify-center ${
                                !isSaving && isFormValid
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