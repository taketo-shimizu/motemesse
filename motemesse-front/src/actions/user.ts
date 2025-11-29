'use server';

import { prisma } from '@/lib/prisma';

export async function updateAgreements(userId: number) {
  try {
    if (!userId) {
      throw new Error('User ID not found');
    }

    // 同意フラグを更新
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        termsAgreed: true,
        privacyPolicyAgreed: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error('Error updating agreements:', error);
    throw error;
  }
}
