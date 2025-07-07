import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/prisma';
import { getAuthenticatedUserId } from '../../../lib/auth';

const prisma = new PrismaClient();

// GET - Fetch all projects for the current user
export async function GET(request: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received project data:', body); // Debug log
    
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Transform the data to match Prisma schema
    const projectData = {
      name: body.title,
      description: body.description,
      projectUrl: body.liveUrl || null,
      stack: body.technologies ? body.technologies.split(',').map((tech: string) => tech.trim()) : [],
      bullets: body.highlights || [],
      userId
    };

    console.log('Transformed project data:', projectData); // Debug log

    const project = await prisma.project.create({
      data: projectData
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing project
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('PUT request body:', body); // Debug log
    
    const { id, ...updateData } = body;
    console.log('PUT updateData:', updateData); // Debug log

    // Validate required fields
    if (!updateData.title || !updateData.description) {
      console.log('Validation failed - missing title or description'); // Debug log
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Transform the data to match Prisma schema
    const projectData = {
      name: updateData.title,
      description: updateData.description,
      projectUrl: updateData.liveUrl || null,
      stack: updateData.technologies ? updateData.technologies.split(',').map((tech: string) => tech.trim()) : [],
      bullets: updateData.highlights || []
    };

    const project = await prisma.project.update({
      where: { id },
      data: projectData
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
} 