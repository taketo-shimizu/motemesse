import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/cookie-auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { recentTargetId } = await request.json();

    // recentTargetIdが数値でない場合はnullに設定
    const targetId = typeof recentTargetId === 'number' ? recentTargetId : null;

    // ユーザーのrecent_target_idを更新
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        recentTargetId: targetId,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating recent target:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
