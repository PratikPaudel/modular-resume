import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function ensureUserExists(supabaseUserId: string, email: string): Promise<string> {
  try {
    // Try to find existing user by Supabase ID
    let user = await prisma.user.findFirst({
      where: { id: supabaseUserId }
    });

    if (!user) {
      // Create new user if doesn't exist
      user = await prisma.user.create({
        data: {
          id: supabaseUserId,
          email: email,
          name: email.split('@')[0] // Use email prefix as default name
        }
      });
    }

    return user.id;
  } catch (error) {
    console.error('Error ensuring user exists:', error);
    throw error;
  }
}

export async function getAuthenticatedUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }

    // Ensure user exists in our database
    const dbUserId = await ensureUserExists(user.id, user.email || '');
    
    return dbUserId;
  } catch (error) {
    console.error('Error getting authenticated user:', error);
    return null;
  }
} 