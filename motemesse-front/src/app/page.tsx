import { redirect } from 'next/navigation'
import { getSession } from '@auth0/nextjs-auth0'
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

export default async function Home() {
  const session = await getSession()

  if (session) {
    const auth0Id = session.user.sub;
    const user = await prisma.user.findUnique({ where: { auth0Id: auth0Id } });
    
    if (user && !user.anonymousId) {
      const anonId = randomUUID();
      
      // DBに保存
      await prisma.user.update({
        where: { id: user.id },
        data: { anonymousId: anonId },
      });
      
      // Route Handlerを経由してクッキーを設定し、/chatへリダイレクト
      redirect(`/api/set-cookie?userId=${anonId}&redirectTo=/chat`);
    }

    redirect('/chat')
  } else {
    redirect('/api/auth/login')
  }
}