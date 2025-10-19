import { cookies } from 'next/headers';
import { prisma } from './prisma';
import { randomUUID } from 'crypto';

/**
 * anonymousIdでユーザーを検索
 */
export async function findUserByAnonymousId(anonymousId: string) {
  try {
    return await prisma.user.findUnique({
      where: { anonymousId }
    });
  } catch (error) {
    console.error('Error finding user by anonymousId:', error);
    return null;
  }
}

/**
 * クッキーから現在のユーザーを取得（ない場合は新規作成）
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  console.log('cookieStore', cookieStore);
  let userId = cookieStore.get('userId')?.value;
  console.log('userId', userId);
  
  // クッキーがない場合は新規ユーザーを作成
  if (!userId) {
    userId = randomUUID();
    const newUser = await prisma.user.create({
      data: {
        anonymousId: userId,
      }
    });
    
    return newUser;
  }
  
  // クッキーからユーザーを取得
  let user = await findUserByAnonymousId(userId);
  
  // ユーザーが見つからない場合は新規作成
  if (!user) {
    user = await prisma.user.create({
      data: {
        anonymousId: userId,
      }
    });
  }
  
  return user;
}

/**
 * 新しいanonymousIdを設定
 */
export async function setAnonymousId(anonymousId: string) {
  const cookieStore = await cookies();
  cookieStore.set('userId', anonymousId, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1年
    sameSite: 'lax',
  });
}

