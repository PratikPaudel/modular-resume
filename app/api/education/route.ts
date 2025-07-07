import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/prisma';
import { getAuthenticatedUserId } from '../../../lib/auth';

const prisma = new PrismaClient();

// GET - Fetch all education entries for the current user
export async function GET(request: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const education = await prisma.education.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' }
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}

// POST - Create a new education entry
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
    const educationData = {
      institution: body.institution,
      degree: body.degree,
      gpa: body.gpa ? parseFloat(body.gpa) : null,
      startDate: new Date(body.startDate),
      endDate: body.endDate ? new Date(body.endDate) : null,
      userId
    };

    const education = await prisma.education.create({
      data: educationData
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error('Error creating education:', error);
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing education entry
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    // Transform the data to match Prisma schema
    const educationData = {
      institution: updateData.institution,
      degree: updateData.degree,
      gpa: updateData.gpa ? parseFloat(updateData.gpa) : null,
      startDate: new Date(updateData.startDate),
      endDate: updateData.endDate ? new Date(updateData.endDate) : null
    };

    const education = await prisma.education.update({
      where: { id },
      data: educationData
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error('Error updating education:', error);
    return NextResponse.json(
      { error: 'Failed to update education' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an education entry
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Education ID is required' },
        { status: 400 }
      );
    }

    await prisma.education.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error('Error deleting education:', error);
    return NextResponse.json(
      { error: 'Failed to delete education' },
      { status: 500 }
    );
  }
} 