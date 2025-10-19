import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/cookie-auth';

/**
 * 現在のユーザー情報を取得
 * クッキーのanonymousIdを使用してユーザーを識別
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error getting current user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

