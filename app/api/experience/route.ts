import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/prisma';
import { getAuthenticatedUserId } from '../../../lib/auth';

const prisma = new PrismaClient();

// GET - Fetch all experiences for the current user
export async function GET(request: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const experiences = await prisma.experience.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' }
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

// POST - Create a new experience
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Transform the data to match Prisma schema
    const experienceData = {
      company: body.company,
      title: body.jobTitle || body.title,
      location: body.location || null,
      startDate: new Date(body.startDate),
      endDate: body.endDate ? new Date(body.endDate) : null,
      bullets: body.achievements || [],
      userId
    };

    const experience = await prisma.experience.create({
      data: experienceData
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing experience
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    // Transform the data to match Prisma schema
    const experienceData = {
      company: updateData.company,
      title: updateData.jobTitle || updateData.title,
      location: updateData.location || null,
      startDate: new Date(updateData.startDate),
      endDate: updateData.endDate ? new Date(updateData.endDate) : null,
      bullets: updateData.achievements || []
    };

    const experience = await prisma.experience.update({
      where: { id },
      data: experienceData
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an experience
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Experience ID is required' },
        { status: 400 }
      );
    }

    await prisma.experience.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    );
  }
} 