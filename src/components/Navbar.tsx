import Link from 'next/link';
import { FaChartBar, FaTools, FaClipboardList } from 'react-icons/fa';
import { auth } from '@/auth';
import LogoutButton from './LogoutButton';
import DarkModeToggle from './DarkModeToggle';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

export default async function Navbar() {
  const session = await auth();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader>
          <Link href="/dashboard" className="block">
            <h1 className="text-2xl font-bold">Maintenance Tracker</h1>
            {session?.user?.id && (
              <p className="text-sm text-muted-foreground mt-1">
                Employee ID: {session.user.id}
              </p>
            )}
          </Link>
        </SidebarHeader>
        <Separator />

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link href="/dashboard">
                  <FaChartBar className="h-5 w-5" />
                  <span className="text-base">Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link href="/equipment">
                  <FaTools className="h-5 w-5" />
                  <span className="text-base">Equipment</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link href="/maintenance-records">
                  <FaClipboardList className="h-5 w-5" />
                  <span className="text-base">Maintenance Records</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <DarkModeToggle />
            <LogoutButton />
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
} 