import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // クッキーからuserIdを取得
  const userId = req.cookies.get('userId')?.value;
  
  // クッキーがない場合は新規作成
  if (!userId) {
    // Edge RuntimeではWeb Crypto APIを使用
    const newUserId = crypto.randomUUID();
    res.cookies.set('userId', newUserId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1年
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
  }
  
  return res;
}

export const config = {
  matcher: [
    // 全てのページに適用（API routeとstatic filesは除外）
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};