import DashboardSidebar from "@/components/Sidebar";
import SessionWrapper from "@/providers/session-provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionWrapper>
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SessionWrapper>
  );
}
