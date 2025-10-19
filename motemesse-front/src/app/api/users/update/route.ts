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
    const {
      name, age, job, hobby, selfIntroduction,
      residence, workplace, bloodType, education, workType, holiday,
      marriageHistory, hasChildren, smoking, drinking, livingWith, marriageIntention
    } = body;

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name || null,
        age: age ? parseInt(age, 10) : null,
        job: job || null,
        hobby: hobby || null,
        selfIntroduction: selfIntroduction || null,
        residence: residence || null,
        workplace: workplace || null,
        bloodType: bloodType || null,
        education: education || null,
        workType: workType || null,
        holiday: holiday || null,
        marriageHistory: marriageHistory || null,
        hasChildren: hasChildren || null,
        smoking: smoking || null,
        drinking: drinking || null,
        livingWith: livingWith || null,
        marriageIntention: marriageIntention || null,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 