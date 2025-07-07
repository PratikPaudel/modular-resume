import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/prisma';
import { getAuthenticatedUserId } from '../../../lib/auth';

const prisma = new PrismaClient();

// GET - Fetch all skills for the current user
export async function GET(request: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const skills = await prisma.skill.findMany({
      where: { userId },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST - Create new skills
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

    // The form sends an array of skills, so we need to create multiple skill records
    const skillsToCreate = (body.skills || []).filter((skill: string) => skill.trim() !== '');
    
    if (skillsToCreate.length === 0) {
      return NextResponse.json(
        { error: 'At least one skill is required' },
        { status: 400 }
      );
    }

    // Create multiple skills for the same category
    const createdSkills = await Promise.all(
      skillsToCreate.map((skillName: string) =>
        prisma.skill.create({
          data: {
            name: skillName.trim(),
            category: body.category,
            userId
          }
        })
      )
    );

    return NextResponse.json(createdSkills);
  } catch (error) {
    console.error('Error creating skills:', error);
    return NextResponse.json(
      { error: 'Failed to create skills' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing skill
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    // Transform the data to match Prisma schema
    const skillData = {
      name: updateData.name,
      category: updateData.category
    };

    const skill = await prisma.skill.update({
      where: { id },
      data: skillData
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error('Error updating skill:', error);
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a skill
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Skill ID is required' },
        { status: 400 }
      );
    }

    await prisma.skill.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
} 