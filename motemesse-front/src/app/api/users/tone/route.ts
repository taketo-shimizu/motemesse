import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/cookie-auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { tone } = body;

    if (tone === undefined || tone === null) {
      return NextResponse.json({ error: 'Tone is required' }, { status: 400 });
    }

    // Validate tone value (0-3)
    const toneValue = parseInt(tone, 10);
    if (isNaN(toneValue) || toneValue < 0 || toneValue > 3) {
      return NextResponse.json({ error: 'Tone must be a number between 0 and 3' }, { status: 400 });
    }

    // Update user tone
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        tone: toneValue,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user tone:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 