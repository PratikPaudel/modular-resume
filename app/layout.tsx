import './globals.css';
import type { Metadata } from 'next';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './components/Sidebar';

export const metadata: Metadata = {
  title: 'Modular Resume Builder',
  description: 'Build and export your resume with ease',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1 bg-gray-50 p-8">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
