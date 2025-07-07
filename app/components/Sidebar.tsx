'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, FileText } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Profile / Your Info",
    url: "/base-resume",
    icon: User,
  },
  {
    title: "Edit & Export Resume",
    url: "/resume-editor",
    icon: FileText,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-6 mb-4">
            <Link href="/" className="flex items-center justify-center">
              <div className="text-2xl font-bold tracking-tight text-blue-700">
                Resume Builder
              </div>
            </Link>
          </div>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}