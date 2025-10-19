import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/cookie-auth';
import { prisma } from '@/lib/prisma';

// 会話履歴を取得
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const searchParams = request.nextUrl.searchParams;
    const targetId = searchParams.get('targetId');

    if (!targetId) {
      return NextResponse.json({ error: 'targetId is required' }, { status: 400 });
    }

    // 会話履歴を取得
    const conversations = await prisma.conversation.findMany({
      where: {
        userId: user.id,
        targetId: parseInt(targetId)
      },
      orderBy: {
        createdAt: 'asc'
      },
      include: {
        target: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 新しい会話を保存
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { targetId, femaleMessage, maleReply } = body;

    if (!targetId || !maleReply) {
      return NextResponse.json({
        error: 'targetId and maleReply are required'
      }, { status: 400 });
    }

    // ターゲットが存在し、ユーザーのものであることを確認
    const target = await prisma.target.findFirst({
      where: {
        id: parseInt(targetId),
        userId: user.id
      }
    });

    if (!target) {
      return NextResponse.json({ error: 'Target not found' }, { status: 404 });
    }

    // 会話を保存
    const conversation = await prisma.conversation.create({
      data: {
        userId: user.id,
        targetId: parseInt(targetId),
        femaleMessage: femaleMessage ?? '',
        maleReply
      },
      include: {
        target: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 